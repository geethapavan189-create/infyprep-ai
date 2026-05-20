'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { adminAPI } from '@/lib/api';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function AdminPage() {
  const { user } = useStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'questions' | 'tests' | 'users'>('overview');
  const [questionForm, setQuestionForm] = useState({
    question: '', options: ['', '', '', ''], correctAnswer: '', explanation: '',
    category: 'aptitude', topic: '', difficulty: 'easy',
  });

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Admin Access Required</h2>
          <p className="text-dark-500 mb-4">You need admin privileges to access this page.</p>
          <Link href="/dashboard" className="btn-primary">Go to Dashboard</Link>
        </div>
      </div>
    );
  }

  const handleAddQuestion = async () => {
    try {
      await adminAPI.addQuestion(questionForm);
      toast.success('Question added successfully!');
      setQuestionForm({ question: '', options: ['', '', '', ''], correctAnswer: '', explanation: '', category: 'aptitude', topic: '', difficulty: 'easy' });
    } catch (err) {
      toast.error('Failed to add question');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold mb-6">⚙️ Admin Panel</h1>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {[
            { id: 'overview' as const, label: '📊 Overview' },
            { id: 'questions' as const, label: '❓ Questions' },
            { id: 'tests' as const, label: '📝 Mock Tests' },
            { id: 'users' as const, label: '👥 Users' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                activeTab === tab.id ? 'bg-primary-600 text-white' : 'bg-dark-100 dark:bg-dark-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview */}
        {activeTab === 'overview' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Total Users', value: '1,234', icon: '👥' },
              { label: 'Total Questions', value: '5,000+', icon: '❓' },
              { label: 'Coding Problems', value: '200+', icon: '💻' },
              { label: 'Mock Tests', value: '50+', icon: '📝' },
            ].map(stat => (
              <div key={stat.label} className="card text-center">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-dark-500">{stat.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Add Questions */}
        {activeTab === 'questions' && (
          <div className="card max-w-2xl">
            <h3 className="font-semibold text-lg mb-4">Add New Question</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <select value={questionForm.category} onChange={e => setQuestionForm(f => ({ ...f, category: e.target.value }))} className="input-field">
                  <option value="aptitude">Aptitude</option>
                  <option value="reasoning">Reasoning</option>
                </select>
                <input type="text" placeholder="Topic (e.g., percentages)" value={questionForm.topic} onChange={e => setQuestionForm(f => ({ ...f, topic: e.target.value }))} className="input-field" />
                <select value={questionForm.difficulty} onChange={e => setQuestionForm(f => ({ ...f, difficulty: e.target.value }))} className="input-field">
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
              <textarea placeholder="Question text..." value={questionForm.question} onChange={e => setQuestionForm(f => ({ ...f, question: e.target.value }))} className="input-field h-24" />
              <div className="grid grid-cols-2 gap-3">
                {questionForm.options.map((opt, i) => (
                  <input
                    key={i}
                    type="text"
                    placeholder={`Option ${String.fromCharCode(65 + i)}`}
                    value={opt}
                    onChange={e => {
                      const opts = [...questionForm.options];
                      opts[i] = e.target.value;
                      setQuestionForm(f => ({ ...f, options: opts }));
                    }}
                    className="input-field"
                  />
                ))}
              </div>
              <input type="text" placeholder="Correct Answer (must match one option exactly)" value={questionForm.correctAnswer} onChange={e => setQuestionForm(f => ({ ...f, correctAnswer: e.target.value }))} className="input-field" />
              <textarea placeholder="Explanation / Solution..." value={questionForm.explanation} onChange={e => setQuestionForm(f => ({ ...f, explanation: e.target.value }))} className="input-field h-20" />
              <button onClick={handleAddQuestion} className="btn-primary">Add Question</button>
            </div>
          </div>
        )}

        {/* Mock Tests */}
        {activeTab === 'tests' && (
          <div className="card">
            <h3 className="font-semibold text-lg mb-4">Manage Mock Tests</h3>
            <p className="text-dark-500 text-sm">Create and manage mock tests. Each test can have multiple sections with timed questions.</p>
            <button className="btn-primary mt-4">+ Create New Test</button>
          </div>
        )}

        {/* Users */}
        {activeTab === 'users' && (
          <div className="card">
            <h3 className="font-semibold text-lg mb-4">User Management</h3>
            <p className="text-dark-500 text-sm mb-4">View and manage registered users.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-dark-50 dark:bg-dark-800">
                  <tr>
                    <th className="text-left px-4 py-2">Name</th>
                    <th className="text-left px-4 py-2">Email</th>
                    <th className="text-left px-4 py-2">XP</th>
                    <th className="text-left px-4 py-2">Role</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-dark-100 dark:border-dark-700">
                    <td className="px-4 py-3">{user.displayName}</td>
                    <td className="px-4 py-3">{user.email}</td>
                    <td className="px-4 py-3">{user.xp}</td>
                    <td className="px-4 py-3"><span className="badge-hard">admin</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
