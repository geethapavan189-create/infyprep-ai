'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';

const features = [
  { icon: '🧮', title: 'Aptitude', desc: 'Number system, percentages, profit & loss, time & work with shortcuts', href: '/aptitude', color: 'from-blue-500 to-cyan-500' },
  { icon: '🧠', title: 'Reasoning', desc: 'Coding-decoding, blood relations, puzzles, syllogisms', href: '/reasoning', color: 'from-purple-500 to-pink-500' },
  { icon: '💻', title: 'Coding Platform', desc: 'Practice with Monaco editor, Judge0 execution, 100+ problems', href: '/coding', color: 'from-green-500 to-emerald-500' },
  { icon: '🐍', title: 'Python', desc: 'Beginner to advanced Python with interactive exercises', href: '/python', color: 'from-yellow-500 to-orange-500' },
  { icon: '☕', title: 'Java', desc: 'Complete Java learning path with OOP, collections, DSA', href: '/java', color: 'from-red-500 to-rose-500' },
  { icon: '📊', title: 'DSA', desc: 'Arrays, trees, graphs, DP with visual explanations', href: '/dsa', color: 'from-indigo-500 to-violet-500' },
  { icon: '📝', title: 'Mock Tests', desc: 'Full-length timed tests with analytics and leaderboard', href: '/mock-tests', color: 'from-teal-500 to-cyan-500' },
  { icon: '📚', title: 'PYQ Hub', desc: 'Previous year papers, memory-based questions, solutions', href: '/pyq', color: 'from-amber-500 to-yellow-500' },
  { icon: '🤖', title: 'AI Assistant', desc: 'Get instant explanations, shortcuts, and interview tips', href: '/ai-assistant', color: 'from-fuchsia-500 to-purple-500' },
];

const stats = [
  { value: '5000+', label: 'Practice Questions' },
  { value: '200+', label: 'Coding Problems' },
  { value: '50+', label: 'Mock Tests' },
  { value: '10K+', label: 'Students' },
];

export default function HomePage() {
  const { user } = useStore();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-purple-50 dark:from-dark-950 dark:via-dark-900 dark:to-purple-950/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              🚀 AI-Powered Preparation Platform
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6">
              Crack <span className="gradient-text">Infosys</span> Placements
              <br />with AI-Powered Prep
            </h1>
            <p className="text-lg sm:text-xl text-dark-600 dark:text-dark-300 max-w-3xl mx-auto mb-8">
              Complete preparation for HackWithInfy, InfyTQ, and Infosys recruitment.
              Aptitude, reasoning, coding, mock tests, and AI assistance — all in one platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <Link href="/dashboard" className="btn-primary text-lg px-8 py-3">
                  Go to Dashboard →
                </Link>
              ) : (
                <>
                  <Link href="/login" className="btn-primary text-lg px-8 py-3">
                    Start Preparing Free →
                  </Link>
                  <Link href="/aptitude" className="btn-secondary text-lg px-8 py-3">
                    Explore Topics
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-dark-50 dark:bg-dark-900/50">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl sm:text-4xl font-bold gradient-text">{stat.value}</div>
              <div className="text-dark-500 dark:text-dark-400 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Everything You Need to Crack Infosys</h2>
          <p className="text-dark-500 dark:text-dark-400 text-lg">Comprehensive preparation modules designed for Infosys recruitment process</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link href={feature.href} className="card block group hover:scale-[1.02] transition-transform">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-2xl mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary-600 transition-colors">{feature.title}</h3>
                <p className="text-dark-500 dark:text-dark-400 text-sm">{feature.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Start Your Preparation?</h2>
          <p className="text-primary-100 text-lg mb-8">Join thousands of students preparing for Infosys placements with AI-powered tools.</p>
          <Link href={user ? '/dashboard' : '/login'} className="inline-block bg-white text-primary-700 font-bold px-8 py-3 rounded-lg hover:bg-primary-50 transition-colors">
            {user ? 'Continue Learning' : 'Get Started Free'}
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-dark-50 dark:bg-dark-900 border-t border-dark-100 dark:border-dark-800">
        <div className="max-w-7xl mx-auto px-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-3 gradient-text">InfyPrep AI</h3>
            <p className="text-dark-500 dark:text-dark-400 text-sm">AI-powered placement preparation platform for Infosys recruitment.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Preparation</h4>
            <div className="space-y-2 text-sm text-dark-500 dark:text-dark-400">
              <Link href="/aptitude" className="block hover:text-primary-600">Aptitude</Link>
              <Link href="/reasoning" className="block hover:text-primary-600">Reasoning</Link>
              <Link href="/coding" className="block hover:text-primary-600">Coding</Link>
              <Link href="/mock-tests" className="block hover:text-primary-600">Mock Tests</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Learning</h4>
            <div className="space-y-2 text-sm text-dark-500 dark:text-dark-400">
              <Link href="/python" className="block hover:text-primary-600">Python</Link>
              <Link href="/java" className="block hover:text-primary-600">Java</Link>
              <Link href="/dsa" className="block hover:text-primary-600">DSA</Link>
              <Link href="/pyq" className="block hover:text-primary-600">Previous Papers</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Platform</h4>
            <div className="space-y-2 text-sm text-dark-500 dark:text-dark-400">
              <Link href="/ai-assistant" className="block hover:text-primary-600">AI Assistant</Link>
              <Link href="/leaderboard" className="block hover:text-primary-600">Leaderboard</Link>
              <Link href="/dashboard" className="block hover:text-primary-600">Dashboard</Link>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-dark-200 dark:border-dark-700 text-center text-sm text-dark-500">
          © 2024 InfyPrep AI. Built for Infosys placement preparation.
        </div>
      </footer>
    </div>
  );
}
