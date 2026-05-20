const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase');
const { verifyToken } = require('../middleware/auth');

// Get user progress/analytics
router.get('/analytics', verifyToken, async (req, res) => {
  try {
    const userId = req.user.uid;
    
    // Get user data
    const userDoc = await db.collection('users').doc(userId).get();
    const userData = userDoc.data();
    
    // Get submissions stats
    const submissionsSnap = await db.collection('submissions')
      .where('userId', '==', userId)
      .get();
    
    const submissions = [];
    submissionsSnap.forEach(doc => submissions.push(doc.data()));
    
    // Calculate analytics
    const totalAttempted = submissions.length;
    const totalCorrect = submissions.filter(s => s.isCorrect).length;
    const accuracy = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;
    
    // Topic-wise breakdown
    const topicStats = {};
    submissions.forEach(s => {
      const key = `${s.category}_${s.topic}`;
      if (!topicStats[key]) {
        topicStats[key] = { category: s.category, topic: s.topic, attempted: 0, correct: 0 };
      }
      topicStats[key].attempted++;
      if (s.isCorrect) topicStats[key].correct++;
    });
    
    // Difficulty breakdown
    const difficultyStats = { easy: { attempted: 0, correct: 0 }, medium: { attempted: 0, correct: 0 }, hard: { attempted: 0, correct: 0 } };
    submissions.forEach(s => {
      if (difficultyStats[s.difficulty]) {
        difficultyStats[s.difficulty].attempted++;
        if (s.isCorrect) difficultyStats[s.difficulty].correct++;
      }
    });
    
    // Daily activity (last 30 days)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 86400000);
    const dailyActivity = {};
    submissions
      .filter(s => new Date(s.submittedAt) > thirtyDaysAgo)
      .forEach(s => {
        const date = new Date(s.submittedAt).toISOString().split('T')[0];
        if (!dailyActivity[date]) dailyActivity[date] = { attempted: 0, correct: 0 };
        dailyActivity[date].attempted++;
        if (s.isCorrect) dailyActivity[date].correct++;
      });
    
    // Weak topics (accuracy < 50%)
    const weakTopics = Object.values(topicStats)
      .filter(t => t.attempted >= 3 && (t.correct / t.attempted) < 0.5)
      .map(t => ({ ...t, accuracy: Math.round((t.correct / t.attempted) * 100) }));
    
    // Strong topics (accuracy > 80%)
    const strongTopics = Object.values(topicStats)
      .filter(t => t.attempted >= 3 && (t.correct / t.attempted) > 0.8)
      .map(t => ({ ...t, accuracy: Math.round((t.correct / t.attempted) * 100) }));
    
    res.json({
      overview: {
        totalAttempted,
        totalCorrect,
        accuracy,
        xp: userData.xp || 0,
        streak: userData.streak || 0,
        codingSolved: (userData.codingSubmissions || []).length,
        mockTestsTaken: (userData.mockTestScores || []).length,
      },
      topicStats: Object.values(topicStats),
      difficultyStats,
      dailyActivity,
      weakTopics,
      strongTopics,
      mockTestScores: userData.mockTestScores || [],
      badges: userData.badges || [],
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get coding progress
router.get('/coding', verifyToken, async (req, res) => {
  try {
    const userId = req.user.uid;
    
    const snapshot = await db.collection('codeSubmissions')
      .where('userId', '==', userId)
      .orderBy('submittedAt', 'desc')
      .limit(50)
      .get();
    
    const submissions = [];
    snapshot.forEach(doc => submissions.push({ id: doc.id, ...doc.data() }));
    
    const solved = submissions.filter(s => s.allPassed).length;
    const languages = {};
    submissions.forEach(s => {
      languages[s.language] = (languages[s.language] || 0) + 1;
    });
    
    res.json({ submissions, solved, total: submissions.length, languages });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
