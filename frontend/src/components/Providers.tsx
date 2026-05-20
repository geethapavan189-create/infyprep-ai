'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { useStore } from '@/store/useStore';
import { isConfigured } from '@/lib/firebase';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 5 * 60 * 1000, retry: 1 },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  const { darkMode } = useStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    if (isConfigured) {
      // Dynamic import to avoid SSR issues
      import('firebase/auth').then(({ onAuthStateChanged }) => {
        import('@/lib/firebase').then(({ auth }) => {
          if (auth) {
            const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
              if (firebaseUser) {
                try {
                  const { authAPI } = await import('@/lib/api');
                  const res = await authAPI.register({
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    displayName: firebaseUser.displayName,
                    photoURL: firebaseUser.photoURL,
                  });
                  useStore.getState().setUser(res.data.user);
                } catch {
                  useStore.getState().setUser(null);
                }
              } else {
                useStore.getState().setUser(null);
              }
              setLoading(false);
            });
            return () => unsubscribe();
          } else {
            setLoading(false);
          }
        });
      });
    } else {
      // No Firebase config - run in demo mode
      setLoading(false);
    }
  }, []);

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
