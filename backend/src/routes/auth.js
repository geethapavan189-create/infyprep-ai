const express = require('express');
const router = express.Router();
const { db, auth } = require('../config/firebase');
const { verifyToken } = require('../middleware/auth');

// Register user profile
router.post('/register', async (req, res) => {
  try {
    const { uid, email, displayName, photoURL } = req.body;
    
    const userRef = db.collection('users').doc(uid);
    const userDoc = await userRef.get();
    
    if (!userDoc.exists) {
      await userRef.set({
        uid,
        email,
        displayName: displayName || email.split('@')[0],
        photoURL: photoURL || null,
        role: 'student',
        xp: 0,
        streak: 0,
        lastActive: new Date().toISOString(),
        badges: [],
        solvedQuestions: [],
        bookmarks: [],
        mockTestScores: [],
        codingSubmissions: [],
        joinedAt: new Date().toISOString(),
        settings: { darkMode: false, notifications: true },
      });
    }
    
    const user = (await userRef.get()).data();
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user profile
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const userRef = db.collection('users').doc(req.user.uid);
    const userDoc = await userRef.get();
    
    if (!userDoc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ user: userDoc.data() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user profile
router.put('/profile', verifyToken, async (req, res) => {
  try {
    const userRef = db.collection('users').doc(req.user.uid);
    await userRef.update(req.body);
    const updated = (await userRef.get()).data();
    res.json({ user: updated });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update streak
router.post('/streak', verifyToken, async (req, res) => {
  try {
    const userRef = db.collection('users').doc(req.user.uid);
    const userDoc = await userRef.get();
    const userData = userDoc.data();
    
    const today = new Date().toDateString();
    const lastActive = new Date(userData.lastActive).toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    
    let newStreak = userData.streak;
    if (lastActive === yesterday) {
      newStreak += 1;
    } else if (lastActive !== today) {
      newStreak = 1;
    }
    
    await userRef.update({
      streak: newStreak,
      lastActive: new Date().toISOString(),
    });
    
    res.json({ streak: newStreak });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
