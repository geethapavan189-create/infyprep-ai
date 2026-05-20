// Database Seed Script
// Run: node src/data/seed.js
require('dotenv').config();
const { db } = require('../config/firebase');
const aptitudeQuestions = require('./aptitude-questions');
const reasoningQuestions = require('./reasoning-questions');
const codingProblems = require('./coding-problems');

async function seed() {
  console.log('Starting database seed...');

  // Seed aptitude questions
  for (const [topic, questions] of Object.entries(aptitudeQuestions)) {
    for (const q of questions) {
      await db.collection('questions').doc(q.id).set(q);
    }
    console.log(`Seeded ${questions.length} questions for ${topic}`);
  }

  // Seed reasoning questions
  for (const [topic, questions] of Object.entries(reasoningQuestions)) {
    for (const q of questions) {
      await db.collection('questions').doc(q.id).set(q);
    }
    console.log(`Seeded ${questions.length} questions for ${topic}`);
  }

  // Seed coding problems
  for (const problem of codingProblems) {
    await db.collection('codingProblems').doc(problem.id).set(problem);
  }
  console.log(`Seeded ${codingProblems.length} coding problems`);

  // Seed metadata
  await db.collection('metadata').doc('aptitude_topics').set({
    list: [
      { id: 'number-system', name: 'Number System', icon: '🔢', questionCount: 8 },
      { id: 'percentages', name: 'Percentages', icon: '%', questionCount: 5 },
      { id: 'profit-and-loss', name: 'Profit & Loss', icon: '💰', questionCount: 4 },
      { id: 'time-and-work', name: 'Time & Work', icon: '⏰', questionCount: 4 },
      { id: 'ratio-proportion', name: 'Ratio & Proportion', icon: '⚖️', questionCount: 3 },
      { id: 'probability', name: 'Probability', icon: '🎲', questionCount: 3 },
      { id: 'simple-interest', name: 'Simple Interest', icon: '🏦', questionCount: 2 },
      { id: 'compound-interest', name: 'Compound Interest', icon: '📈', questionCount: 2 },
    ],
  });

  await db.collection('metadata').doc('reasoning_topics').set({
    list: [
      { id: 'coding-decoding', name: 'Coding Decoding', icon: '🔐', questionCount: 3 },
      { id: 'blood-relations', name: 'Blood Relations', icon: '👨‍👩‍👧', questionCount: 3 },
      { id: 'seating-arrangement', name: 'Seating Arrangement', icon: '💺', questionCount: 1 },
      { id: 'number-series', name: 'Number Series', icon: '🔢', questionCount: 4 },
      { id: 'syllogisms', name: 'Syllogisms', icon: '🧠', questionCount: 2 },
      { id: 'direction-sense', name: 'Direction Sense', icon: '🧭', questionCount: 2 },
    ],
  });

  console.log('Seed complete!');
  process.exit(0);
}

seed().catch(console.error);
