'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import toast from 'react-hot-toast';
import Link from 'next/link';

// Local question data for offline functionality
import { getTopicQuestions, getTopicContent } from '@/data/aptitudeData';

export default function TopicPage() {
  const params = useParams();
  const topic = params.topic as string;
  const { user } = useStore();

  const [activeTab, setActiveTab] = useState<'theory' | 'practice' | 'quiz'>('theory');
  const [difficulty, setDifficulty] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showSolution, setShowSolution] = useState(false);
  const [score, setScore] = useState({ correct: 0, attempted: 0 });
  const [timer, setTimer] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  const content = getTopicContent(topic);
  const allQuestions = getTopicQuestions(topic);
  const questions = difficulty === 'all' ? allQuestions : allQuestions.filter(q => q.difficulty === difficulty);

  // Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerActive) {
      interval = setInterval(() => setTimer(t => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive]);

  const handleAnswer = (answer: string) => {
    if (selectedAnswer) return;
    setSelectedAnswer(answer);
    setTimerActive(false);

    const isCorrect = answer === questions[currentQuestion]?.correctAnswer;
    setScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      attempted: prev.attempted + 1,
    }));

    if (isCorrect) {
      toast.success('Correct! +10 XP');
    } else {
      toast.error('Incorrect. Check the solution.');
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowSolution(false);
      setTimer(0);
      setTimerActive(true);
    }
  };

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;
  const topicName = topic.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-2 text-sm text-dark-500 mb-4">
        <Link href="/aptitude" className="hover:text-primary-600">Aptitude</Link>
        <span>/</span>
        <span className="text-dark-800 dark:text-dark-200 font-medium">{topicName}</span>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold mb-2">{topicName}</h1>
        <p className="text-dark-500 dark:text-dark-400 mb-6">{content.description}</p>

        {/* Tabs */}
        <div className="flex gap-1 bg-dark-100 dark:bg-dark-800 p-1 rounded-lg mb-6 w-fit">
          {(['theory', 'practice', 'quiz'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); if (tab === 'practice') setTimerActive(true); }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab ? 'bg-white dark:bg-dark-700 shadow-sm' : 'text-dark-500 hover:text-dark-700'
              }`}
            >
              {tab === 'theory' ? '📖 Theory' : tab === 'practice' ? '✏️ Practice' : '⏱️ Quiz'}
            </button>
          ))}
        </div>

        {/* Theory Tab */}
        {activeTab === 'theory' && (
          <div className="space-y-6">
            {/* Formulas */}
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">📋 Key Formulas</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {content.formulas.map((formula, i) => (
                  <div key={i} className="p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-100 dark:border-primary-800">
                    <code className="text-sm font-mono text-primary-800 dark:text-primary-200">{formula}</code>
                  </div>
                ))}
              </div>
            </div>

            {/* Shortcuts */}
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">⚡ Shortcut Tricks</h3>
              <div className="space-y-3">
                {content.shortcuts.map((shortcut, i) => (
                  <div key={i} className="flex gap-3 p-3 bg-accent-50 dark:bg-accent-900/20 rounded-lg">
                    <span className="text-accent-600 font-bold">#{i + 1}</span>
                    <p className="text-sm">{shortcut}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Solved Examples */}
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">✅ Solved Examples</h3>
              <div className="space-y-4">
                {content.examples.map((ex, i) => (
                  <div key={i} className="p-4 border border-dark-100 dark:border-dark-700 rounded-lg">
                    <p className="font-medium mb-2">Q{i + 1}: {ex.question}</p>
                    <div className="bg-dark-50 dark:bg-dark-800 p-3 rounded-lg text-sm">
                      <p className="text-accent-700 dark:text-accent-300 font-medium">Solution:</p>
                      <p className="mt-1">{ex.solution}</p>
                      <p className="mt-2 text-primary-600 font-medium">Answer: {ex.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Practice Tab */}
        {activeTab === 'practice' && questions.length > 0 && (
          <div>
            {/* Difficulty Filter */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex gap-2">
                {(['all', 'easy', 'medium', 'hard'] as const).map(d => (
                  <button
                    key={d}
                    onClick={() => { setDifficulty(d); setCurrentQuestion(0); setSelectedAnswer(null); }}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      difficulty === d ? 'bg-primary-600 text-white' : 'bg-dark-100 dark:bg-dark-700 text-dark-600 dark:text-dark-300'
                    }`}
                  >
                    {d.charAt(0).toUpperCase() + d.slice(1)}
                  </button>
                ))}
              </div>
              <div className="ml-auto flex items-center gap-4 text-sm">
                <span>⏱️ {formatTime(timer)}</span>
                <span>Score: {score.correct}/{score.attempted}</span>
              </div>
            </div>

            {/* Question Card */}
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-dark-500">Question {currentQuestion + 1} of {questions.length}</span>
                <span className={`badge-${questions[currentQuestion]?.difficulty}`}>
                  {questions[currentQuestion]?.difficulty}
                </span>
              </div>

              <p className="text-lg font-medium mb-6">{questions[currentQuestion]?.question}</p>

              <div className="space-y-3">
                {questions[currentQuestion]?.options.map((option, i) => {
                  const isSelected = selectedAnswer === option;
                  const isCorrect = option === questions[currentQuestion]?.correctAnswer;
                  let optionClass = 'border-dark-200 dark:border-dark-600 hover:border-primary-400';
                  if (selectedAnswer) {
                    if (isCorrect) optionClass = 'border-green-500 bg-green-50 dark:bg-green-900/20';
                    else if (isSelected) optionClass = 'border-red-500 bg-red-50 dark:bg-red-900/20';
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => handleAnswer(option)}
                      disabled={!!selectedAnswer}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${optionClass}`}
                    >
                      <span className="font-medium mr-3">{String.fromCharCode(65 + i)}.</span>
                      {option}
                    </button>
                  );
                })}
              </div>

              {/* Solution */}
              {selectedAnswer && (
                <div className="mt-6">
                  <button
                    onClick={() => setShowSolution(!showSolution)}
                    className="text-primary-600 font-medium text-sm hover:underline"
                  >
                    {showSolution ? 'Hide Solution' : 'View Solution'}
                  </button>
                  {showSolution && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      className="mt-3 p-4 bg-dark-50 dark:bg-dark-800 rounded-lg"
                    >
                      <p className="text-sm">{questions[currentQuestion]?.explanation}</p>
                      {questions[currentQuestion]?.shortcut && (
                        <p className="mt-2 text-sm text-primary-600">
                          <strong>Shortcut:</strong> {questions[currentQuestion].shortcut}
                        </p>
                      )}
                    </motion.div>
                  )}
                  <button onClick={nextQuestion} className="btn-primary mt-4">
                    Next Question →
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Quiz Tab */}
        {activeTab === 'quiz' && (
          <div className="card text-center py-12">
            <h3 className="text-xl font-bold mb-2">Timed Quiz Mode</h3>
            <p className="text-dark-500 mb-6">Answer 20 questions in 15 minutes. No going back!</p>
            <button
              onClick={() => { setActiveTab('practice'); setTimerActive(true); setCurrentQuestion(0); setScore({ correct: 0, attempted: 0 }); }}
              className="btn-primary"
            >
              Start Quiz ⏱️
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
