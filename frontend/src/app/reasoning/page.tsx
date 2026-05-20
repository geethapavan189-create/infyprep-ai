'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const topics = [
  { id: 'coding-decoding', name: 'Coding Decoding', icon: '🔐', desc: 'Letter shifting, number coding, symbol substitution', questions: 80, color: 'from-blue-500 to-indigo-500' },
  { id: 'blood-relations', name: 'Blood Relations', icon: '👨‍👩‍👧', desc: 'Family tree, coded relations, generation problems', questions: 60, color: 'from-red-500 to-pink-500' },
  { id: 'seating-arrangement', name: 'Seating Arrangement', icon: '💺', desc: 'Linear, circular, rectangular arrangements', questions: 70, color: 'from-purple-500 to-violet-500' },
  { id: 'direction-sense', name: 'Direction Sense', icon: '🧭', desc: 'Distance, direction, shadow-based problems', questions: 50, color: 'from-green-500 to-teal-500' },
  { id: 'syllogisms', name: 'Syllogisms', icon: '🧠', desc: 'All, some, no - Venn diagram method', questions: 60, color: 'from-yellow-500 to-amber-500' },
  { id: 'number-series', name: 'Number Series', icon: '🔢', desc: 'AP, GP, Fibonacci, mixed patterns', questions: 80, color: 'from-cyan-500 to-blue-500' },
  { id: 'puzzles', name: 'Logical Puzzles', icon: '🧩', desc: 'Floor, scheduling, comparison puzzles', questions: 50, color: 'from-orange-500 to-red-500' },
  { id: 'data-sufficiency', name: 'Data Sufficiency', icon: '📋', desc: 'Statement analysis, sufficient/insufficient data', questions: 40, color: 'from-teal-500 to-emerald-500' },
  { id: 'ranking', name: 'Ranking & Order', icon: '🏅', desc: 'Position from top/bottom, between positions', questions: 45, color: 'from-indigo-500 to-purple-500' },
  { id: 'alphabet-series', name: 'Alphabet Series', icon: '🔤', desc: 'Letter positions, opposite letters, patterns', questions: 55, color: 'from-pink-500 to-rose-500' },
];

export default function ReasoningPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Logical Reasoning</h1>
          <p className="text-dark-500 dark:text-dark-400">Sharpen your logical thinking with pattern recognition, puzzles, and analytical reasoning for Infosys.</p>
        </div>

        {/* Tips Card */}
        <div className="card mb-8 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
          <h3 className="font-semibold text-lg mb-3">💡 Reasoning Tips for Infosys</h3>
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            <div className="flex gap-2"><span>✓</span> Always draw diagrams for seating arrangements</div>
            <div className="flex gap-2"><span>✓</span> Use Venn diagrams for syllogisms</div>
            <div className="flex gap-2"><span>✓</span> Check differences and ratios in number series</div>
            <div className="flex gap-2"><span>✓</span> Build family trees for blood relations</div>
            <div className="flex gap-2"><span>✓</span> Mark directions on paper for direction problems</div>
            <div className="flex gap-2"><span>✓</span> Practice elimination method for puzzles</div>
          </div>
        </div>

        {/* Topics Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {topics.map((topic, i) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link href={`/reasoning/${topic.id}`} className="card block group hover:scale-[1.02] transition-transform h-full">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${topic.color} flex items-center justify-center text-xl mb-3`}>
                  {topic.icon}
                </div>
                <h3 className="font-semibold group-hover:text-primary-600 transition-colors">{topic.name}</h3>
                <p className="text-xs text-dark-500 dark:text-dark-400 mt-1 mb-3">{topic.desc}</p>
                <span className="text-xs text-primary-600 font-medium">{topic.questions}+ questions →</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
