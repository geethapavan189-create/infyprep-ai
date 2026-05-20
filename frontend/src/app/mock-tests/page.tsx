'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const mockTests = [
  { id: 'infosys-full-1', title: 'Infosys Full Mock Test 1', category: 'Full Length', duration: 90, questions: 65, difficulty: 'medium', type: 'mixed' },
  { id: 'infosys-full-2', title: 'Infosys Full Mock Test 2', category: 'Full Length', duration: 90, questions: 65, difficulty: 'medium', type: 'mixed' },
  { id: 'hackwithinfy-1', title: 'HackWithInfy Round 1 Mock', category: 'HackWithInfy', duration: 180, questions: 3, difficulty: 'hard', type: 'coding' },
  { id: 'infytq-1', title: 'InfyTQ Certification Mock 1', category: 'InfyTQ', duration: 120, questions: 40, difficulty: 'medium', type: 'mixed' },
  { id: 'aptitude-1', title: 'Aptitude Speed Test', category: 'Aptitude', duration: 30, questions: 30, difficulty: 'easy', type: 'aptitude' },
  { id: 'aptitude-2', title: 'Aptitude Advanced Test', category: 'Aptitude', duration: 45, questions: 30, difficulty: 'hard', type: 'aptitude' },
  { id: 'reasoning-1', title: 'Reasoning Practice Test', category: 'Reasoning', duration: 30, questions: 25, difficulty: 'medium', type: 'reasoning' },
  { id: 'coding-1', title: 'Coding Assessment Mock', category: 'Coding', duration: 60, questions: 5, difficulty: 'medium', type: 'coding' },
];

export default function MockTestsPage() {
  const [filter, setFilter] = useState('all');
  const categories = ['all', ...new Set(mockTests.map(t => t.category))];
  const filtered = filter === 'all' ? mockTests : mockTests.filter(t => t.category === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Mock Tests</h1>
          <p className="text-dark-500 dark:text-dark-400">Practice with timed mock tests simulating actual Infosys exam patterns</p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === cat ? 'bg-primary-600 text-white' : 'bg-dark-100 dark:bg-dark-800 text-dark-600 dark:text-dark-300 hover:bg-dark-200'
              }`}
            >
              {cat === 'all' ? 'All Tests' : cat}
            </button>
          ))}
        </div>

        {/* Tests Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((test, i) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <div className="card h-full flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs font-medium px-2 py-1 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded">
                    {test.category}
                  </span>
                  <span className={`badge-${test.difficulty}`}>{test.difficulty}</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">{test.title}</h3>
                <div className="flex items-center gap-4 text-sm text-dark-500 mb-4">
                  <span>⏱️ {test.duration} min</span>
                  <span>📝 {test.questions} Q</span>
                </div>
                <div className="mt-auto">
                  <Link
                    href={`/mock-tests/${test.id}`}
                    className="btn-primary w-full text-center block text-sm"
                  >
                    Start Test →
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
