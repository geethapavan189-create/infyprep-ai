'use client';

import { useStore } from '@/store/useStore';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ProfilePage() {
  const { user } = useStore();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please login</h2>
          <Link href="/login" className="btn-primary">Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="card text-center mb-6">
          <div className="w-20 h-20 rounded-full bg-primary-500 flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
            {user.displayName?.[0]?.toUpperCase() || 'U'}
          </div>
          <h1 className="text-2xl font-bold">{user.displayName}</h1>
          <p className="text-dark-500">{user.email}</p>
          <div className="flex justify-center gap-6 mt-4">
            <div className="text-center">
              <div className="text-xl font-bold text-primary-600">{user.xp}</div>
              <div className="text-xs text-dark-500">XP Points</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-orange-600">{user.streak}</div>
              <div className="text-xs text-dark-500">Day Streak</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-green-600">{user.solvedQuestions?.length || 0}</div>
              <div className="text-xs text-dark-500">Solved</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-purple-600">{user.badges?.length || 0}</div>
              <div className="text-xs text-dark-500">Badges</div>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="card">
            <h3 className="font-semibold mb-3">🏆 Badges</h3>
            {user.badges?.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {user.badges.map((badge, i) => (
                  <span key={i} className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 rounded-full text-xs">{badge}</span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-dark-500">Complete challenges to earn badges!</p>
            )}
          </div>
          <div className="card">
            <h3 className="font-semibold mb-3">📊 Quick Stats</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span>Mock Tests Taken</span><span className="font-medium">{user.mockTestScores?.length || 0}</span></div>
              <div className="flex justify-between"><span>Coding Problems Solved</span><span className="font-medium">{user.codingSubmissions?.length || 0}</span></div>
              <div className="flex justify-between"><span>Bookmarked Questions</span><span className="font-medium">{user.bookmarks?.length || 0}</span></div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
