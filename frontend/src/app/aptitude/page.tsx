'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const topics = [
  { id: 'number-system', name: 'Number System', icon: '🔢', desc: 'HCF, LCM, divisibility, remainders, unit digits', questions: 100, color: 'from-blue-500 to-cyan-500' },
  { id: 'percentages', name: 'Percentages', icon: '📊', desc: 'Successive changes, population, elections', questions: 80, color: 'from-green-500 to-emerald-500' },
  { id: 'profit-and-loss', name: 'Profit & Loss', icon: '💰', desc: 'Markup, discount, successive discounts, dishonest dealers', questions: 90, color: 'from-yellow-500 to-amber-500' },
  { id: 'ratio-proportion', name: 'Ratio & Proportion', icon: '⚖️', desc: 'Compound ratio, variation, partnership', questions: 70, color: 'from-purple-500 to-violet-500' },
  { id: 'time-and-work', name: 'Time & Work', icon: '⏰', desc: 'LCM method, pipes, efficiency, alternate days', questions: 85, color: 'from-red-500 to-rose-500' },
  { id: 'time-speed-distance', name: 'Time Speed Distance', icon: '🚗', desc: 'Relative speed, trains, boats, circular tracks', questions: 75, color: 'from-indigo-500 to-blue-500' },
  { id: 'probability', name: 'Probability', icon: '🎲', desc: 'Cards, dice, balls, conditional probability', questions: 60, color: 'from-pink-500 to-rose-500' },
  { id: 'permutation-combination', name: 'P & C', icon: '🔄', desc: 'Arrangements, selections, circular permutations', questions: 70, color: 'from-teal-500 to-cyan-500' },
  { id: 'simple-interest', name: 'Simple Interest', icon: '🏦', desc: 'SI formulas, doubling time, mixed problems', questions: 50, color: 'from-orange-500 to-amber-500' },
  { id: 'compound-interest', name: 'Compound Interest', icon: '📈', desc: 'CI vs SI, half-yearly, quarterly compounding', questions: 55, color: 'from-lime-500 to-green-500' },
  { id: 'averages', name: 'Averages', icon: '📐', desc: 'Weighted average, cricket averages, age problems', questions: 60, color: 'from-sky-500 to-blue-500' },
  { id: 'algebra', name: 'Algebra', icon: '🔣', desc: 'Equations, inequalities, quadratics, progressions', questions: 80, color: 'from-violet-500 to-purple-500' },
  { id: 'geometry', name: 'Geometry', icon: '📐', desc: 'Triangles, circles, quadrilaterals, coordinate geometry', questions: 65, color: 'from-emerald-500 to-teal-500' },
  { id: 'data-interpretation', name: 'Data Interpretation', icon: '📉', desc: 'Bar graphs, pie charts, tables, line graphs', questions: 70, color: 'from-cyan-500 to-sky-500' },
  { id: 'clocks', name: 'Clocks', icon: '🕐', desc: 'Angle between hands, meeting times, mirror images', questions: 40, color: 'from-amber-500 to-yellow-500' },
  { id: 'calendars', name: 'Calendars', icon: '📅', desc: 'Odd days, leap years, day finding', questions: 35, color: 'from-rose-500 to-pink-500' },
];

export default function AptitudePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Aptitude Preparation</h1>
          <p className="text-dark-500 dark:text-dark-400">Master quantitative aptitude for Infosys placements with formulas, shortcuts, and 1000+ practice questions.</p>
        </div>

        {/* Formula Quick Reference */}
        <div className="card mb-8 bg-gradient-to-r from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20 border-primary-200 dark:border-primary-800">
          <h3 className="font-semibold text-lg mb-3">📋 Quick Formula Reference</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
            <div className="p-3 bg-white/70 dark:bg-dark-800/70 rounded-lg">
              <strong>Profit%</strong> = (Profit/CP) × 100
            </div>
            <div className="p-3 bg-white/70 dark:bg-dark-800/70 rounded-lg">
              <strong>SI</strong> = P × R × T / 100
            </div>
            <div className="p-3 bg-white/70 dark:bg-dark-800/70 rounded-lg">
              <strong>CI</strong> = P(1 + R/100)ⁿ - P
            </div>
            <div className="p-3 bg-white/70 dark:bg-dark-800/70 rounded-lg">
              <strong>Speed</strong> = Distance / Time
            </div>
            <div className="p-3 bg-white/70 dark:bg-dark-800/70 rounded-lg">
              <strong>Work</strong> = 1/A + 1/B (combined rate)
            </div>
            <div className="p-3 bg-white/70 dark:bg-dark-800/70 rounded-lg">
              <strong>nPr</strong> = n! / (n-r)!
            </div>
          </div>
        </div>

        {/* Topics Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {topics.map((topic, i) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
            >
              <Link
                href={`/aptitude/${topic.id}`}
                className="card block group hover:scale-[1.02] transition-transform h-full"
              >
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${topic.color} flex items-center justify-center text-xl mb-3`}>
                  {topic.icon}
                </div>
                <h3 className="font-semibold group-hover:text-primary-600 transition-colors">{topic.name}</h3>
                <p className="text-xs text-dark-500 dark:text-dark-400 mt-1 mb-3">{topic.desc}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-primary-600 font-medium">{topic.questions}+ questions</span>
                  <span className="text-dark-400">→</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
