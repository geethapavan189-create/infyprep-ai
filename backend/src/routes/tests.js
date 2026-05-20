const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase');
const { verifyToken } = require('../middleware/auth');

// Get available mock tests
router.get('/', async (req, res) => {
  try {
    const { category, type } = req.query;
    let query = db.collection('mockTests');
    if (category) query = query.where('category', '==', category);
    if (type) query = query.where('type', '==', type);
    
    const snapshot = await query.get();
    const tests = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      tests.push({
        id: doc.id,
        title: data.title,
        category: data.category,
        type: data.type,
        duration: data.duration,
        totalQuestions: data.questions?.length || 0,
        difficulty: data.difficulty,
        attempts: data.attempts || 0,
      });
    });
    
    res.json({ tests });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get test by ID (for taking the test)
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const doc = await db.collection('mockTests').doc(req.params.id).get();
    if (!doc.exists) {
      return res.status(404).json({ error: 'Test not found' });
    }
    
    const data = doc.data();
    // Remove correct answers for test-taking
    const questions = (data.questions || []).map(q => ({
      ...q,
      correctAnswer: undefined,
      explanation: undefined,
    }));
    
    res.json({
      test: {
        id: doc.id,
        title: data.title,
        duration: data.duration,
        questions,
        totalQuestions: questions.length,
        instructions: data.instructions,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Submit test
router.post('/:id/submit', verifyToken, async (req, res) => {
  try {
    const { answers, timeTaken } = req.body;
    const userId = req.user.uid;
    const testId = req.params.id;
    
    const testDoc = await db.collection('mockTests').doc(testId).get();
    if (!testDoc.exists) {
      return res.status(404).json({ error: 'Test not found' });
    }
    
    const test = testDoc.data();
    const questions = test.questions || [];
    
    let correct = 0;
    let incorrect = 0;
    let unanswered = 0;
    const sectionWise = {};
    const topicWise = {};
    
    const detailedResults = questions.map((q, index) => {
      const userAnswer = answers[index];
      const isCorrect = userAnswer === q.correctAnswer;
      
      if (!userAnswer) {
        unanswered++;
      } else if (isCorrect) {
        correct++;
      } else {
        incorrect++;
      }
      
      // Track section-wise
      const section = q.section || 'General';
      if (!sectionWise[section]) sectionWise[section] = { correct: 0, total: 0 };
      sectionWise[section].total++;
      if (isCorrect) sectionWise[section].correct++;
      
      // Track topic-wise
      const topic = q.topic || 'General';
      if (!topicWise[topic]) topicWise[topic] = { correct: 0, total: 0 };
      topicWise[topic].total++;
      if (isCorrect) topicWise[topic].correct++;
      
      return {
        questionIndex: index,
        question: q.question,
        options: q.options,
        userAnswer,
        correctAnswer: q.correctAnswer,
        isCorrect,
        explanation: q.explanation,
        topic: q.topic,
      };
    });
    
    const score = Math.round((correct / questions.length) * 100);
    
    // Save result
    const resultData = {
      userId,
      testId,
      testTitle: test.title,
      score,
      correct,
      incorrect,
      unanswered,
      total: questions.length,
      timeTaken,
      sectionWise,
      topicWise,
      submittedAt: new Date().toISOString(),
    };
    
    await db.collection('testResults').add(resultData);
    
    // Update user mock test scores
    const userRef = db.collection('users').doc(userId);
    const userData = (await userRef.get()).data();
    const mockTestScores = userData.mockTestScores || [];
    mockTestScores.push({ testId, score, date: new Date().toISOString() });
    
    const xpGain = Math.round(score / 10) * 5;
    await userRef.update({
      mockTestScores,
      xp: (userData.xp || 0) + xpGain,
    });
    
    // Update test attempts
    await db.collection('mockTests').doc(testId).update({
      attempts: (test.attempts || 0) + 1,
    });
    
    res.json({
      score,
      correct,
      incorrect,
      unanswered,
      total: questions.length,
      timeTaken,
      sectionWise,
      topicWise,
      detailedResults,
      xpGain,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user's test history
router.get('/history/me', verifyToken, async (req, res) => {
  try {
    const snapshot = await db.collection('testResults')
      .where('userId', '==', req.user.uid)
      .orderBy('submittedAt', 'desc')
      .limit(20)
      .get();
    
    const results = [];
    snapshot.forEach(doc => results.push({ id: doc.id, ...doc.data() }));
    
    res.json({ results });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
