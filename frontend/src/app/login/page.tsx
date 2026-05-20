'use client';

import { useState } from 'react';
import { auth, googleProvider, isConfigured } from '@/lib/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
  updateProfile,
} from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConfigured || !auth) {
      toast.error('Firebase not configured. Add your API keys to .env.local');
      return;
    }
    setLoading(true);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success('Welcome back!');
      } else {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(cred.user, { displayName: name });
        toast.success('Account created successfully!');
      }
      router.push('/dashboard');
    } catch (error: any) {
      toast.error(error.message?.replace('Firebase: ', '') || 'Authentication failed');
    }
    setLoading(false);
  };

  const handleGoogle = async () => {
    if (!isConfigured || !auth || !googleProvider) {
      toast.error('Firebase not configured. Add your API keys to .env.local');
      return;
    }
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success('Logged in with Google!');
      router.push('/dashboard');
    } catch (error: any) {
      toast.error(error.message?.replace('Firebase: ', '') || 'Google login failed');
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      toast.error('Enter your email first');
      return;
    }
    if (!isConfigured || !auth) {
      toast.error('Firebase not configured');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('Password reset email sent!');
      setShowReset(false);
    } catch (error: any) {
      toast.error(error.message?.replace('Firebase: ', '') || 'Reset failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-gradient-to-br from-primary-50 via-white to-purple-50 dark:from-dark-950 dark:via-dark-900 dark:to-dark-950">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="card p-8">
          <div className="text-center mb-8">
            <Link href="/" className="inline-block">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold text-lg">IP</span>
              </div>
            </Link>
            <h1 className="text-2xl font-bold">{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
            <p className="text-dark-500 dark:text-dark-400 mt-1">
              {isLogin ? 'Login to continue your preparation' : 'Start your Infosys preparation journey'}
            </p>
          </div>

          {/* Google Login */}
          <button
            onClick={handleGoogle}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-dark-200 dark:border-dark-600 rounded-lg hover:bg-dark-50 dark:hover:bg-dark-700 transition-colors mb-6"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-dark-200 dark:border-dark-600" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-dark-800 text-dark-500">or</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-field"
                required
              />
            )}
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              required
              minLength={6}
            />

            {isLogin && (
              <button
                type="button"
                onClick={() => setShowReset(true)}
                className="text-sm text-primary-600 hover:text-primary-700"
              >
                Forgot password?
              </button>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full disabled:opacity-50"
            >
              {loading ? 'Please wait...' : isLogin ? 'Login' : 'Create Account'}
            </button>
          </form>

          <p className="text-center mt-6 text-sm text-dark-500">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary-600 font-medium hover:underline"
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>

        {/* Password Reset Modal */}
        {showReset && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white dark:bg-dark-800 rounded-xl p-6 w-full max-w-sm"
            >
              <h3 className="text-lg font-bold mb-2">Reset Password</h3>
              <p className="text-sm text-dark-500 mb-4">Enter your email to receive a reset link.</p>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field mb-4"
                placeholder="Email"
              />
              <div className="flex gap-3">
                <button onClick={() => setShowReset(false)} className="btn-secondary flex-1">Cancel</button>
                <button onClick={handleResetPassword} className="btn-primary flex-1">Send Link</button>
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
