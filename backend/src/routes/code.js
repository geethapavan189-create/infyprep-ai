const express = require('express');
const router = express.Router();
const axios = require('axios');
const { db } = require('../config/firebase');
const { verifyToken } = require('../middleware/auth');

const JUDGE0_URL = process.env.JUDGE0_API_URL || 'https://judge0-ce.p.rapidapi.com';
const JUDGE0_KEY = process.env.JUDGE0_API_KEY;

const LANGUAGE_IDS = {
  python: 71,
  java: 62,
  cpp: 54,
  javascript: 63,
  c: 50,
};

// Run code
router.post('/run', async (req, res) => {
  try {
    const { code, language, input = '' } = req.body;
    
    const languageId = LANGUAGE_IDS[language];
    if (!languageId) {
      return res.status(400).json({ error: 'Unsupported language' });
    }

    const response = await axios.post(
      `${JUDGE0_URL}/submissions?base64_encoded=false&wait=true`,
      {
        source_code: code,
        language_id: languageId,
        stdin: input,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': JUDGE0_KEY,
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
        },
      }
    );

    const result = response.data;
    res.json({
      output: result.stdout || '',
      error: result.stderr || result.compile_output || '',
      status: result.status?.description || 'Unknown',
      time: result.time,
      memory: result.memory,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Submit code with test cases
router.post('/submit', verifyToken, async (req, res) => {
  try {
    const { code, language, problemId } = req.body;
    const userId = req.user.uid;

    // Get problem test cases
    const problemDoc = await db.collection('codingProblems').doc(problemId).get();
    if (!problemDoc.exists) {
      return res.status(404).json({ error: 'Problem not found' });
    }

    const problem = problemDoc.data();
    const testCases = problem.testCases || [];
    const languageId = LANGUAGE_IDS[language];

    const results = [];
    let allPassed = true;

    for (const testCase of testCases) {
      try {
        const response = await axios.post(
          `${JUDGE0_URL}/submissions?base64_encoded=false&wait=true`,
          {
            source_code: code,
            language_id: languageId,
            stdin: testCase.input,
            expected_output: testCase.expectedOutput,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'X-RapidAPI-Key': JUDGE0_KEY,
              'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
            },
          }
        );

        const result = response.data;
        const passed = result.status?.id === 3; // Accepted
        if (!passed) allPassed = false;

        results.push({
          input: testCase.input,
          expectedOutput: testCase.expectedOutput,
          actualOutput: result.stdout?.trim() || '',
          passed,
          time: result.time,
          memory: result.memory,
          hidden: testCase.hidden || false,
        });
      } catch (err) {
        allPassed = false;
        results.push({
          input: testCase.input,
          expectedOutput: testCase.expectedOutput,
          actualOutput: 'Error',
          passed: false,
          error: err.message,
          hidden: testCase.hidden || false,
        });
      }
    }

    // Save submission
    await db.collection('codeSubmissions').add({
      userId,
      problemId,
      code,
      language,
      allPassed,
      results: results.map(r => ({ ...r, input: r.hidden ? 'Hidden' : r.input })),
      submittedAt: new Date().toISOString(),
    });

    // Update user XP if all passed
    if (allPassed) {
      const userRef = db.collection('users').doc(userId);
      const userData = (await userRef.get()).data();
      const submissions = userData.codingSubmissions || [];
      if (!submissions.includes(problemId)) {
        submissions.push(problemId);
        const xpGain = problem.difficulty === 'easy' ? 10 : problem.difficulty === 'medium' ? 25 : 50;
        await userRef.update({
          codingSubmissions: submissions,
          xp: (userData.xp || 0) + xpGain,
        });
      }
    }

    res.json({
      allPassed,
      results: results.map(r => ({
        ...r,
        input: r.hidden ? 'Hidden' : r.input,
        expectedOutput: r.hidden ? 'Hidden' : r.expectedOutput,
      })),
      totalPassed: results.filter(r => r.passed).length,
      totalTests: results.length,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get coding problems
router.get('/problems', async (req, res) => {
  try {
    const { topic, difficulty, page = 1, limit = 20 } = req.query;
    
    let query = db.collection('codingProblems');
    if (topic) query = query.where('topic', '==', topic);
    if (difficulty) query = query.where('difficulty', '==', difficulty);
    
    const snapshot = await query.limit(parseInt(limit)).get();
    const problems = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      problems.push({
        id: doc.id,
        title: data.title,
        difficulty: data.difficulty,
        topic: data.topic,
        tags: data.tags,
        acceptance: data.acceptance,
      });
    });
    
    res.json({ problems });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single problem
router.get('/problems/:id', async (req, res) => {
  try {
    const doc = await db.collection('codingProblems').doc(req.params.id).get();
    if (!doc.exists) {
      return res.status(404).json({ error: 'Problem not found' });
    }
    const data = doc.data();
    // Hide test case answers for hidden ones
    const testCases = (data.testCases || []).map(tc => ({
      input: tc.hidden ? undefined : tc.input,
      expectedOutput: tc.hidden ? undefined : tc.expectedOutput,
      hidden: tc.hidden,
    }));
    
    res.json({ problem: { id: doc.id, ...data, testCases } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
