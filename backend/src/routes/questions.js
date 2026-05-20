const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase');
const { verifyToken } = require('../middleware/auth');

// Get questions by category and topic
router.get('/:category/:topic', async (req, res) => {
  try {
    const { category, topic } = req.params;
    const { difficulty, page = 1, limit = 20 } = req.query;
    
    let query = db.collection('questions')
      .where('category', '==', category)
      .where('topic', '==', topic);
    
    if (difficulty) {
      query = query.where('difficulty', '==', difficulty);
    }
    
    const snapshot = await query
      .offset((page - 1) * limit)
      .limit(parseInt(limit))
      .get();
    
    const questions = [];
    snapshot.forEach(doc => {
      questions.push({ id: doc.id, ...doc.data() });
    });
    
    // Get total count
    const countSnapshot = await query.get();
    
    res.json({
      questions,
      total: countSnapshot.size,
      page: parseInt(page),
      totalPages: Math.ceil(countSnapshot.size / limit),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single question
router.get('/single/:id', async (req, res) => {
  try {
    const doc = await db.collection('questions').doc(req.params.id).get();
    if (!doc.exists) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.json({ question: { id: doc.id, ...doc.data() } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Submit answer
router.post('/submit', verifyToken, async (req, res) => {
  try {
    const { questionId, answer, timeTaken } = req.body;
    const userId = req.user.uid;
    
    const questionDoc = await db.collection('questions').doc(questionId).get();
    if (!questionDoc.exists) {
      return res.status(404).json({ error: 'Question not found' });
    }
    
    const question = questionDoc.data();
    const isCorrect = answer === question.correctAnswer;
    
    // Save submission
    await db.collection('submissions').add({
      userId,
      questionId,
      answer,
      isCorrect,
      timeTaken,
      submittedAt: new Date().toISOString(),
      category: question.category,
      topic: question.topic,
      difficulty: question.difficulty,
    });
    
    // Update user stats
    const userRef = db.collection('users').doc(userId);
    const userData = (await userRef.get()).data();
    
    let xpGain = 0;
    if (isCorrect) {
      xpGain = question.difficulty === 'easy' ? 5 : question.difficulty === 'medium' ? 10 : 20;
      const solvedQuestions = [...(userData.solvedQuestions || [])];
      if (!solvedQuestions.includes(questionId)) {
        solvedQuestions.push(questionId);
      }
      await userRef.update({
        xp: (userData.xp || 0) + xpGain,
        solvedQuestions,
      });
    }
    
    res.json({
      isCorrect,
      correctAnswer: question.correctAnswer,
      explanation: question.explanation,
      xpGain,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Bookmark question
router.post('/bookmark', verifyToken, async (req, res) => {
  try {
    const { questionId } = req.body;
    const userId = req.user.uid;
    
    const userRef = db.collection('users').doc(userId);
    const userData = (await userRef.get()).data();
    const bookmarks = userData.bookmarks || [];
    
    const index = bookmarks.indexOf(questionId);
    if (index > -1) {
      bookmarks.splice(index, 1);
    } else {
      bookmarks.push(questionId);
    }
    
    await userRef.update({ bookmarks });
    res.json({ bookmarks, isBookmarked: index === -1 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get topics list
router.get('/topics/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const topicsDoc = await db.collection('metadata').doc(`${category}_topics`).get();
    
    if (!topicsDoc.exists) {
      return res.json({ topics: [] });
    }
    
    res.json({ topics: topicsDoc.data().list });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
