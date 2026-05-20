'use client';

import { useStore } from '@/store/useStore';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function BookmarksPage() {
  const { user } = useStore();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Link href="/login" className="btn-primary">Login to view bookmarks</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold mb-2">🔖 Bookmarks</h1>
        <p className="text-dark-500 mb-6">Your saved questions for quick revision</p>

        {user.bookmarks?.length > 0 ? (
          <div className="space-y-3">
            {user.bookmarks.map((id, i) => (
              <div key={id} className="card flex items-center justify-between">
                <span className="text-sm font-medium">Question #{id}</span>
                <Link href={`/aptitude`} className="text-primary-600 text-sm">View →</Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="card text-center py-12">
            <div className="text-4xl mb-4">🔖</div>
            <h3 className="font-semibold mb-2">No bookmarks yet</h3>
            <p className="text-sm text-dark-500 mb-4">Bookmark questions while practicing to review them later</p>
            <Link href="/aptitude" className="btn-primary">Start Practicing</Link>
          </div>
        )}
      </motion.div>
    </div>
  );
}
