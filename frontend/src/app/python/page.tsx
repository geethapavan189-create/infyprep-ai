'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const chapters = {
  beginner: [
    { id: 'variables', title: 'Variables & Data Types', desc: 'int, float, str, bool, type casting', icon: '📦' },
    { id: 'operators', title: 'Operators', desc: 'Arithmetic, comparison, logical, bitwise', icon: '➕' },
    { id: 'strings', title: 'Strings', desc: 'Slicing, methods, formatting, regex basics', icon: '📝' },
    { id: 'conditionals', title: 'Conditionals', desc: 'if, elif, else, ternary operator', icon: '🔀' },
    { id: 'loops', title: 'Loops', desc: 'for, while, break, continue, nested loops', icon: '🔄' },
    { id: 'functions', title: 'Functions', desc: 'def, return, args, kwargs, scope', icon: '⚙️' },
    { id: 'lists', title: 'Lists', desc: 'CRUD, slicing, comprehension, methods', icon: '📋' },
    { id: 'tuples', title: 'Tuples & Sets', desc: 'Immutability, set operations, frozenset', icon: '🔗' },
    { id: 'dictionaries', title: 'Dictionaries', desc: 'Key-value, methods, nested dicts', icon: '📖' },
  ],
  intermediate: [
    { id: 'oop', title: 'OOP Concepts', desc: 'Classes, objects, inheritance, polymorphism', icon: '🏗️' },
    { id: 'file-handling', title: 'File Handling', desc: 'Read, write, CSV, JSON, context managers', icon: '📁' },
    { id: 'exceptions', title: 'Exception Handling', desc: 'try, except, finally, custom exceptions', icon: '⚠️' },
    { id: 'lambda', title: 'Lambda & Functional', desc: 'Lambda, map, filter, reduce', icon: '🎯' },
    { id: 'modules', title: 'Modules & Packages', desc: 'import, pip, virtual environments', icon: '📦' },
    { id: 'decorators', title: 'Decorators', desc: 'Function decorators, class decorators', icon: '🎨' },
    { id: 'generators', title: 'Generators & Iterators', desc: 'yield, iter, next, lazy evaluation', icon: '🔄' },
  ],
  advanced: [
    { id: 'dsa-python', title: 'DSA in Python', desc: 'Implement data structures from scratch', icon: '🌳' },
    { id: 'multithreading', title: 'Multithreading', desc: 'Threading, multiprocessing, async/await', icon: '🧵' },
    { id: 'apis', title: 'REST APIs', desc: 'requests, Flask basics, API consumption', icon: '🌐' },
    { id: 'numpy-pandas', title: 'NumPy & Pandas', desc: 'Arrays, DataFrames, data manipulation', icon: '📊' },
  ],
};

export default function PythonPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">🐍 Python Learning Path</h1>
          <p className="text-dark-500 dark:text-dark-400">Complete Python course from basics to advanced — designed for InfyTQ and coding interviews</p>
        </div>

        {/* Progress Overview */}
        <div className="card mb-8 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/10 dark:to-orange-900/10">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Your Progress</h3>
              <p className="text-sm text-dark-500">Complete all chapters to master Python</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-orange-600">0/{Object.values(chapters).flat().length}</div>
              <p className="text-xs text-dark-500">Chapters completed</p>
            </div>
          </div>
          <div className="mt-3 h-2 bg-dark-200 dark:bg-dark-700 rounded-full overflow-hidden">
            <div className="h-full bg-orange-500 rounded-full" style={{ width: '0%' }} />
          </div>
        </div>

        {/* Beginner */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center text-sm">🌱</span>
            Beginner
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {chapters.beginner.map((ch, i) => (
              <motion.div key={ch.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                <Link href={`/python/${ch.id}`} className="card block group hover:scale-[1.02] transition-transform">
                  <span className="text-2xl">{ch.icon}</span>
                  <h3 className="font-semibold mt-2 group-hover:text-primary-600">{ch.title}</h3>
                  <p className="text-xs text-dark-500 mt-1">{ch.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Intermediate */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center text-sm">⚡</span>
            Intermediate
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {chapters.intermediate.map((ch, i) => (
              <motion.div key={ch.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                <Link href={`/python/${ch.id}`} className="card block group hover:scale-[1.02] transition-transform">
                  <span className="text-2xl">{ch.icon}</span>
                  <h3 className="font-semibold mt-2 group-hover:text-primary-600">{ch.title}</h3>
                  <p className="text-xs text-dark-500 mt-1">{ch.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Advanced */}
        <div>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center text-sm">🚀</span>
            Advanced
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {chapters.advanced.map((ch, i) => (
              <motion.div key={ch.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                <Link href={`/python/${ch.id}`} className="card block group hover:scale-[1.02] transition-transform">
                  <span className="text-2xl">{ch.icon}</span>
                  <h3 className="font-semibold mt-2 group-hover:text-primary-600">{ch.title}</h3>
                  <p className="text-xs text-dark-500 mt-1">{ch.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
