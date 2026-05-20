'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const topics = [
  { id: 'arrays', title: 'Arrays', desc: 'Traversal, searching, sorting, two pointers, sliding window', icon: '📊', problems: 30, color: 'from-blue-500 to-cyan-500' },
  { id: 'strings', title: 'Strings', desc: 'Pattern matching, palindromes, anagrams, KMP', icon: '📝', problems: 25, color: 'from-green-500 to-emerald-500' },
  { id: 'linked-list', title: 'Linked List', desc: 'Singly, doubly, circular, reversal, cycle detection', icon: '🔗', problems: 20, color: 'from-purple-500 to-violet-500' },
  { id: 'stack', title: 'Stack', desc: 'LIFO, infix/postfix, balanced parentheses, NGE', icon: '📚', problems: 15, color: 'from-red-500 to-rose-500' },
  { id: 'queue', title: 'Queue', desc: 'FIFO, circular queue, deque, priority queue', icon: '🚶', problems: 12, color: 'from-yellow-500 to-amber-500' },
  { id: 'trees', title: 'Trees', desc: 'Binary tree, traversals, height, diameter, LCA', icon: '🌳', problems: 25, color: 'from-emerald-500 to-teal-500' },
  { id: 'bst', title: 'BST', desc: 'Insert, delete, search, validate, floor/ceil', icon: '🌲', problems: 15, color: 'from-teal-500 to-cyan-500' },
  { id: 'graphs', title: 'Graphs', desc: 'BFS, DFS, shortest path, topological sort, MST', icon: '🕸️', problems: 20, color: 'from-indigo-500 to-blue-500' },
  { id: 'heap', title: 'Heap', desc: 'Min/max heap, heapify, kth largest, merge k sorted', icon: '⛰️', problems: 12, color: 'from-orange-500 to-red-500' },
  { id: 'recursion', title: 'Recursion & Backtracking', desc: 'Base case, N-Queens, permutations, subsets', icon: '🔄', problems: 20, color: 'from-pink-500 to-rose-500' },
  { id: 'dp', title: 'Dynamic Programming', desc: 'Memoization, tabulation, LCS, knapsack, LIS', icon: '🧩', problems: 30, color: 'from-violet-500 to-purple-500' },
  { id: 'greedy', title: 'Greedy', desc: 'Activity selection, Huffman, fractional knapsack', icon: '🎯', problems: 15, color: 'from-lime-500 to-green-500' },
];

export default function DSAPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">📊 Data Structures & Algorithms</h1>
          <p className="text-dark-500 dark:text-dark-400">Master DSA from zero to advanced for HackWithInfy and coding interviews</p>
        </div>

        {/* Roadmap */}
        <div className="card mb-8 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
          <h3 className="font-semibold mb-3">🗺️ Recommended Learning Order</h3>
          <div className="flex flex-wrap gap-2 text-xs">
            {['Arrays', '→', 'Strings', '→', 'Linked List', '→', 'Stack/Queue', '→', 'Trees', '→', 'Graphs', '→', 'Recursion', '→', 'DP'].map((item, i) => (
              <span key={i} className={item === '→' ? 'text-dark-400' : 'px-2 py-1 bg-white dark:bg-dark-800 rounded font-medium'}>
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Topics Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {topics.map((topic, i) => (
            <motion.div key={topic.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
              <Link href={`/dsa/${topic.id}`} className="card block group hover:scale-[1.02] transition-transform h-full">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${topic.color} flex items-center justify-center text-xl mb-3`}>
                  {topic.icon}
                </div>
                <h3 className="font-semibold group-hover:text-primary-600">{topic.title}</h3>
                <p className="text-xs text-dark-500 mt-1 mb-3">{topic.desc}</p>
                <span className="text-xs text-primary-600 font-medium">{topic.problems} problems →</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
