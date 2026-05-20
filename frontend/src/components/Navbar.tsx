'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '/aptitude', label: 'Aptitude' },
  { href: '/reasoning', label: 'Reasoning' },
  { href: '/coding', label: 'Coding' },
  { href: '/python', label: 'Python' },
  { href: '/java', label: 'Java' },
  { href: '/dsa', label: 'DSA' },
  { href: '/mock-tests', label: 'Mock Tests' },
  { href: '/pyq', label: 'PYQs' },
];

export default function Navbar() {
  const { user, darkMode, toggleDarkMode } = useStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      if (auth) {
        const { signOut } = await import('firebase/auth');
        await signOut(auth);
      }
    } catch {}
    useStore.getState().setUser(null);
    router.push('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-dark-900/80 backdrop-blur-lg border-b border-dark-100 dark:border-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">IP</span>
            </div>
            <span className="font-bold text-xl gradient-text hidden sm:block">InfyPrep AI</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-dark-600 dark:text-dark-300 hover:text-primary-600 dark:hover:text-primary-400 rounded-lg hover:bg-dark-50 dark:hover:bg-dark-800 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-800"
                >
                  <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white text-sm font-bold">
                    {user.displayName?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <span className="hidden sm:block text-sm font-medium">{user.displayName}</span>
                  <span className="text-xs bg-accent-100 dark:bg-accent-900 text-accent-700 dark:text-accent-300 px-2 py-0.5 rounded-full">
                    {user.xp} XP
                  </span>
                </button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-56 bg-white dark:bg-dark-800 rounded-xl shadow-xl border border-dark-100 dark:border-dark-700 py-2"
                    >
                      <Link href="/dashboard" className="block px-4 py-2 text-sm hover:bg-dark-50 dark:hover:bg-dark-700" onClick={() => setProfileOpen(false)}>
                        📊 Dashboard
                      </Link>
                      <Link href="/profile" className="block px-4 py-2 text-sm hover:bg-dark-50 dark:hover:bg-dark-700" onClick={() => setProfileOpen(false)}>
                        👤 Profile
                      </Link>
                      <Link href="/bookmarks" className="block px-4 py-2 text-sm hover:bg-dark-50 dark:hover:bg-dark-700" onClick={() => setProfileOpen(false)}>
                        🔖 Bookmarks
                      </Link>
                      <Link href="/leaderboard" className="block px-4 py-2 text-sm hover:bg-dark-50 dark:hover:bg-dark-700" onClick={() => setProfileOpen(false)}>
                        🏆 Leaderboard
                      </Link>
                      {user.role === 'admin' && (
                        <Link href="/admin" className="block px-4 py-2 text-sm hover:bg-dark-50 dark:hover:bg-dark-700" onClick={() => setProfileOpen(false)}>
                          ⚙️ Admin Panel
                        </Link>
                      )}
                      <hr className="my-2 border-dark-100 dark:border-dark-700" />
                      <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                        🚪 Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link href="/login" className="btn-primary text-sm">
                Login
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-800"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden border-t border-dark-100 dark:border-dark-800 bg-white dark:bg-dark-900"
          >
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-3 py-2 text-sm font-medium rounded-lg hover:bg-dark-50 dark:hover:bg-dark-800"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
