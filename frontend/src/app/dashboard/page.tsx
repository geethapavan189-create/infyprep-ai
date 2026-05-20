'use client';

import { useEffect, useState } from 'react';
import { useStore } from '@/store/useStore';
import { progressAPI } from '@/lib/api';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement,
  Title, Tooltip, Legend, ArcElement, BarElement,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, BarElement);

export default function DashboardPage() {
  const { user } = useStore();
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const res = await progressAPI.getAnalytics();
        setAnalytics(res.data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    }
    if (user) fetchAnalytics();
    else setLoading(false);
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please login to view your dashboard</h2>
          <Link href="/login" className="btn-primary">Login</Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const overview = analytics?.overview || { totalAttempted: 0, totalCorrect: 0, accuracy: 0, xp: user.xp, streak: user.streak, codingSolved: 0, mockTestsTaken: 0 };

  const activityData = {
    labels: Object.keys(analytics?.dailyActivity || {}).slice(-14),
    datasets: [{
      label: 'Questions Solved',
      data: Object.values(analytics?.dailyActivity || {}).slice(-14).map((d: any) => d.correct),
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59,130,246,0.1)',
      fill: true,
      tension: 0.4,
    }],
  };

  const diffData = {
    labels: ['Easy', 'Medium', 'Hard'],
    datasets: [{
      data: [
        analytics?.difficultyStats?.easy?.correct || 0,
        analytics?.difficultyStats?.medium?.correct || 0,
        analytics?.difficultyStats?.hard?.correct || 0,
      ],
      backgroundColor: ['#22c55e', '#eab308', '#ef4444'],
    }],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Welcome */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold">Welcome back, {user.displayName}! 👋</h1>
        <p className="text-dark-500 dark:text-dark-400 mt-1">Here&apos;s your preparation progress</p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'XP Points', value: overview.xp, icon: '⚡', color: 'from-yellow-400 to-orange-500' },
          { label: 'Day Streak', value: overview.streak, icon: '🔥', color: 'from-red-400 to-pink-500' },
          { label: 'Accuracy', value: `${overview.accuracy}%`, icon: '🎯', color: 'from-green-400 to-emerald-500' },
          { label: 'Questions Solved', value: overview.totalCorrect, icon: '✅', color: 'from-blue-400 to-indigo-500' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="card text-center"
          >
            <div className="text-3xl mb-2">{stat.icon}</div>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-sm text-dark-500 dark:text-dark-400">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="card">
          <h3 className="font-semibold mb-4">Activity (Last 14 Days)</h3>
          <Line data={activityData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
        </div>
        <div className="card">
          <h3 className="font-semibold mb-4">Difficulty Breakdown</h3>
          <div className="max-w-[250px] mx-auto">
            <Doughnut data={diffData} />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card mb-8">
        <h3 className="font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Practice Aptitude', href: '/aptitude', icon: '🧮' },
            { label: 'Solve Coding', href: '/coding', icon: '💻' },
            { label: 'Take Mock Test', href: '/mock-tests', icon: '📝' },
            { label: 'AI Assistant', href: '/ai-assistant', icon: '🤖' },
          ].map((action) => (
            <Link key={action.label} href={action.href} className="flex items-center gap-3 p-3 rounded-lg border border-dark-100 dark:border-dark-700 hover:bg-dark-50 dark:hover:bg-dark-800 transition-colors">
              <span className="text-2xl">{action.icon}</span>
              <span className="text-sm font-medium">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Weak Topics */}
      {analytics?.weakTopics?.length > 0 && (
        <div className="card">
          <h3 className="font-semibold mb-4 text-red-600">⚠️ Topics to Improve</h3>
          <div className="space-y-3">
            {analytics.weakTopics.map((topic: any) => (
              <div key={topic.topic} className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <span className="font-medium">{topic.topic}</span>
                <span className="text-sm text-red-600">{topic.accuracy}% accuracy</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
