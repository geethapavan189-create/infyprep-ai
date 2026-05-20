'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useStore } from '@/store/useStore';
import { isConfigured, getFirebaseAuth } from '@/lib/firebase';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 5 * 60 * 1000, retry: 1 },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  const { darkMode, setUser } = useStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    if (!isConfigured) {
      setLoading(false);
      return;
    }

    const firebaseAuth = getFirebaseAuth();
    if (!firebaseAuth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(firebaseAuth, async (firebaseUser) => {
      if (firebaseUser) {
        // Set basic user info from Firebase Auth directly
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email || '',
          displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
          photoURL: firebaseUser.photoURL,
          role: 'student',
          xp: 0,
          streak: 0,
          badges: [],
          solvedQuestions: [],
          bookmarks: [],
          mockTestScores: [],
          codingSubmissions: [],
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUser]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-dark-950">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-dark-600 dark:text-dark-300 text-lg">Loading InfyPrep AI...</p>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
