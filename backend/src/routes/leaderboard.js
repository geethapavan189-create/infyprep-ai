const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase');
const { verifyToken } = require('../middleware/auth');

// Get global leaderboard
router.get('/', async (req, res) => {
  try {
    const { type = 'xp', limit = 50 } = req.query;
    
    let query = db.collection('users').orderBy('xp', 'desc').limit(parseInt(limit));
    
    const snapshot = await query.get();
    const leaderboard = [];
    let rank = 1;
    
    snapshot.forEach(doc => {
      const data = doc.data();
      leaderboard.push({
        rank: rank++,
        uid: doc.id,
        displayName: data.displayName,
        photoURL: data.photoURL,
        xp: data.xp || 0,
        streak: data.streak || 0,
        solvedCount: (data.solvedQuestions || []).length,
        codingSolved: (data.codingSubmissions || []).length,
        badges: (data.badges || []).length,
      });
    });
    
    res.json({ leaderboard });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user rank
router.get('/rank', verifyToken, async (req, res) => {
  try {
    const userId = req.user.uid;
    const userDoc = await db.collection('users').doc(userId).get();
    const userXp = userDoc.data()?.xp || 0;
    
    const higherSnap = await db.collection('users')
      .where('xp', '>', userXp)
      .get();
    
    const rank = higherSnap.size + 1;
    const totalSnap = await db.collection('users').get();
    
    res.json({ rank, total: totalSnap.size, percentile: Math.round(((totalSnap.size - rank) / totalSnap.size) * 100) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
