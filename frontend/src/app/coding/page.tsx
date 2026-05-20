'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const problems = [
  { id: 'two-sum', title: 'Two Sum', difficulty: 'easy', topic: 'Arrays', acceptance: 78, tags: ['array', 'hash-map'] },
  { id: 'reverse-string', title: 'Reverse a String', difficulty: 'easy', topic: 'Strings', acceptance: 92, tags: ['string'] },
  { id: 'fibonacci', title: 'Fibonacci Number', difficulty: 'easy', topic: 'Recursion', acceptance: 85, tags: ['recursion', 'dp'] },
  { id: 'palindrome', title: 'Palindrome Check', difficulty: 'easy', topic: 'Strings', acceptance: 80, tags: ['string', 'two-pointer'] },
  { id: 'max-subarray', title: 'Maximum Subarray Sum', difficulty: 'medium', topic: 'Arrays', acceptance: 65, tags: ['array', 'dp'] },
  { id: 'sort-array', title: 'Sort an Array', difficulty: 'easy', topic: 'Sorting', acceptance: 75, tags: ['sorting'] },
  { id: 'binary-search', title: 'Binary Search', difficulty: 'easy', topic: 'Searching', acceptance: 82, tags: ['binary-search'] },
  { id: 'linked-list-reverse', title: 'Reverse Linked List', difficulty: 'medium', topic: 'Linked List', acceptance: 70, tags: ['linked-list'] },
  { id: 'valid-parentheses', title: 'Valid Parentheses', difficulty: 'easy', topic: 'Stack', acceptance: 77, tags: ['stack'] },
  { id: 'merge-sorted', title: 'Merge Two Sorted Arrays', difficulty: 'easy', topic: 'Arrays', acceptance: 80, tags: ['array', 'two-pointer'] },
  { id: 'longest-substring', title: 'Longest Substring Without Repeating', difficulty: 'medium', topic: 'Strings', acceptance: 55, tags: ['sliding-window', 'hash-map'] },
  { id: 'climbing-stairs', title: 'Climbing Stairs', difficulty: 'easy', topic: 'DP', acceptance: 83, tags: ['dp'] },
  { id: 'matrix-rotation', title: 'Rotate Matrix 90°', difficulty: 'medium', topic: 'Arrays', acceptance: 60, tags: ['matrix'] },
  { id: 'lca-bst', title: 'LCA of BST', difficulty: 'medium', topic: 'Trees', acceptance: 62, tags: ['tree', 'bst'] },
  { id: 'coin-change', title: 'Coin Change Problem', difficulty: 'hard', topic: 'DP', acceptance: 45, tags: ['dp', 'greedy'] },
];

export default function CodingPage() {
  const [filter, setFilter] = useState({ difficulty: 'all', topic: 'all' });
  const [search, setSearch] = useState('');

  const filtered = problems.filter(p => {
    if (filter.difficulty !== 'all' && p.difficulty !== filter.difficulty) return false;
    if (filter.topic !== 'all' && p.topic !== filter.topic) return false;
    if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const topics = [...new Set(problems.map(p => p.topic))];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Coding Platform</h1>
            <p className="text-dark-500 dark:text-dark-400">Practice coding problems asked in Infosys, HackWithInfy, and InfyTQ</p>
          </div>
          <Link href="/coding/playground" className="btn-primary hidden sm:block">
            Open Playground 🚀
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <input
            type="text"
            placeholder="Search problems..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field max-w-xs"
          />
          <select
            value={filter.difficulty}
            onChange={(e) => setFilter(f => ({ ...f, difficulty: e.target.value }))}
            className="input-field w-auto"
          >
            <option value="all">All Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <select
            value={filter.topic}
            onChange={(e) => setFilter(f => ({ ...f, topic: e.target.value }))}
            className="input-field w-auto"
          >
            <option value="all">All Topics</option>
            {topics.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        {/* Problems Table */}
        <div className="card overflow-hidden p-0">
          <table className="w-full">
            <thead className="bg-dark-50 dark:bg-dark-800">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-dark-500 uppercase">#</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-dark-500 uppercase">Title</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-dark-500 uppercase hidden sm:table-cell">Topic</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-dark-500 uppercase">Difficulty</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-dark-500 uppercase hidden md:table-cell">Acceptance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-100 dark:divide-dark-700">
              {filtered.map((problem, i) => (
                <tr key={problem.id} className="hover:bg-dark-50 dark:hover:bg-dark-800/50 transition-colors">
                  <td className="px-6 py-4 text-sm text-dark-500">{i + 1}</td>
                  <td className="px-6 py-4">
                    <Link href={`/coding/${problem.id}`} className="font-medium text-primary-600 hover:text-primary-700 hover:underline">
                      {problem.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-sm text-dark-500 hidden sm:table-cell">{problem.topic}</td>
                  <td className="px-6 py-4">
                    <span className={`badge-${problem.difficulty}`}>{problem.difficulty}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-dark-500 hidden md:table-cell">{problem.acceptance}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
