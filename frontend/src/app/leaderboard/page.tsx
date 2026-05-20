'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';

const mockLeaderboard = [
  { rank: 1, name: 'Priya Sharma', xp: 4520, streak: 45, solved: 320, badges: 12 },
  { rank: 2, name: 'Rahul Kumar', xp: 4100, streak: 38, solved: 290, badges: 10 },
  { rank: 3, name: 'Ananya Patel', xp: 3850, streak: 32, solved: 275, badges: 9 },
  { rank: 4, name: 'Vikram Singh', xp: 3600, streak: 28, solved: 250, badges: 8 },
  { rank: 5, name: 'Sneha Reddy', xp: 3400, streak: 25, solved: 230, badges: 7 },
  { rank: 6, name: 'Arjun Nair', xp: 3200, streak: 22, solved: 210, badges: 7 },
  { rank: 7, name: 'Kavya Iyer', xp: 3000, streak: 20, solved: 195, badges: 6 },
  { rank: 8, name: 'Rohit Gupta', xp: 2800, streak: 18, solved: 180, badges: 5 },
  { rank: 9, name: 'Divya Menon', xp: 2650, streak: 15, solved: 165, badges: 5 },
  { rank: 10, name: 'Aditya Joshi', xp: 2500, streak: 14, solved: 150, badges: 4 },
];

export default function LeaderboardPage() {
  const { user } = useStore();
  const [tab, setTab] = useState<'xp' | 'streak' | 'solved'>('xp');

  const sorted = [...mockLeaderboard].sort((a, b) => {
    if (tab === 'streak') return b.streak - a.streak;
    if (tab === 'solved') return b.solved - a.solved;
    return b.xp - a.xp;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold mb-2">🏆 Leaderboard</h1>
        <p className="text-dark-500 dark:text-dark-400 mb-6">Top performers on InfyPrep AI</p>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {[
            { id: 'xp' as const, label: '⚡ XP Points' },
            { id: 'streak' as const, label: '🔥 Streak' },
            { id: 'solved' as const, label: '✅ Questions Solved' },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                tab === t.id ? 'bg-primary-600 text-white' : 'bg-dark-100 dark:bg-dark-800'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Top 3 */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {sorted.slice(0, 3).map((user, i) => (
            <motion.div
              key={user.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`card text-center ${i === 0 ? 'ring-2 ring-yellow-400' : ''}`}
            >
              <div className="text-3xl mb-2">{i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}</div>
              <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mx-auto mb-2 text-lg font-bold text-primary-600">
                {user.name[0]}
              </div>
              <h3 className="font-semibold text-sm">{user.name}</h3>
              <p className="text-lg font-bold gradient-text mt-1">
                {tab === 'xp' ? `${user.xp} XP` : tab === 'streak' ? `${user.streak} days` : `${user.solved} solved`}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Full List */}
        <div className="card p-0 overflow-hidden">
          <table className="w-full">
            <thead className="bg-dark-50 dark:bg-dark-800">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-dark-500">Rank</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-dark-500">Name</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-dark-500">XP</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-dark-500 hidden sm:table-cell">Streak</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-dark-500 hidden sm:table-cell">Solved</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-100 dark:divide-dark-700">
              {sorted.map((entry, i) => (
                <tr key={entry.name} className="hover:bg-dark-50 dark:hover:bg-dark-800/50">
                  <td className="px-6 py-4 font-bold">{i + 1}</td>
                  <td className="px-6 py-4 font-medium">{entry.name}</td>
                  <td className="px-6 py-4 text-primary-600 font-semibold">{entry.xp}</td>
                  <td className="px-6 py-4 hidden sm:table-cell">🔥 {entry.streak}</td>
                  <td className="px-6 py-4 hidden sm:table-cell">{entry.solved}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
