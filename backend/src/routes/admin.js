const express = require('express');
const router = express.Router();
const { db, auth } = require('../config/firebase');
const { verifyAdmin } = require('../middleware/auth');

// Get all users
router.get('/users', verifyAdmin, async (req, res) => {
  try {
    const snapshot = await db.collection('users').limit(100).get();
    const users = [];
    snapshot.forEach(doc => users.push({ id: doc.id, ...doc.data() }));
    res.json({ users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add question
router.post('/questions', verifyAdmin, async (req, res) => {
  try {
    const questionData = {
      ...req.body,
      createdAt: new Date().toISOString(),
      createdBy: req.user.uid,
    };
    const docRef = await db.collection('questions').add(questionData);
    res.json({ id: docRef.id, ...questionData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update question
router.put('/questions/:id', verifyAdmin, async (req, res) => {
  try {
    await db.collection('questions').doc(req.params.id).update(req.body);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete question
router.delete('/questions/:id', verifyAdmin, async (req, res) => {
  try {
    await db.collection('questions').doc(req.params.id).delete();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add coding problem
router.post('/coding-problems', verifyAdmin, async (req, res) => {
  try {
    const problemData = {
      ...req.body,
      createdAt: new Date().toISOString(),
      createdBy: req.user.uid,
    };
    const docRef = await db.collection('codingProblems').add(problemData);
    res.json({ id: docRef.id, ...problemData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add mock test
router.post('/mock-tests', verifyAdmin, async (req, res) => {
  try {
    const testData = {
      ...req.body,
      createdAt: new Date().toISOString(),
      createdBy: req.user.uid,
      attempts: 0,
    };
    const docRef = await db.collection('mockTests').add(testData);
    res.json({ id: docRef.id, ...testData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get platform stats
router.get('/stats', verifyAdmin, async (req, res) => {
  try {
    const usersSnap = await db.collection('users').get();
    const questionsSnap = await db.collection('questions').get();
    const problemsSnap = await db.collection('codingProblems').get();
    const testsSnap = await db.collection('mockTests').get();
    const submissionsSnap = await db.collection('submissions').get();
    
    res.json({
      totalUsers: usersSnap.size,
      totalQuestions: questionsSnap.size,
      totalCodingProblems: problemsSnap.size,
      totalMockTests: testsSnap.size,
      totalSubmissions: submissionsSnap.size,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Make user admin
router.post('/make-admin', verifyAdmin, async (req, res) => {
  try {
    const { uid } = req.body;
    await auth.setCustomUserClaims(uid, { admin: true });
    await db.collection('users').doc(uid).update({ role: 'admin' });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
