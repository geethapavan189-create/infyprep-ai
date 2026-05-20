'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

// Sample test questions
const testQuestions = [
  { question: 'If 30% of A = 40% of B, then A:B is:', options: ['3:4', '4:3', '2:3', '3:2'], correctAnswer: '4:3', topic: 'Ratio', section: 'Aptitude' },
  { question: 'A train 120m long passes a pole in 12 seconds. Speed in km/hr:', options: ['36', '40', '32', '28'], correctAnswer: '36', topic: 'Speed', section: 'Aptitude' },
  { question: 'If COMPUTER is coded as DPNQVUFS, MOBILE is coded as:', options: ['NPCJMF', 'NPCKNG', 'NPCJMG', 'NPCKME'], correctAnswer: 'NPCJMF', topic: 'Coding', section: 'Reasoning' },
  { question: 'Find next: 2, 6, 12, 20, 30, ?', options: ['40', '42', '44', '46'], correctAnswer: '42', topic: 'Series', section: 'Reasoning' },
  { question: 'SI on ₹5000 at 8% for 3 years:', options: ['₹1000', '₹1200', '₹1500', '₹800'], correctAnswer: '₹1200', topic: 'SI', section: 'Aptitude' },
  { question: 'Profit% when CP=800, SP=920:', options: ['12%', '15%', '18%', '20%'], correctAnswer: '15%', topic: 'Profit', section: 'Aptitude' },
  { question: 'Two dice thrown. P(sum=7):', options: ['1/6', '5/36', '7/36', '1/9'], correctAnswer: '1/6', topic: 'Probability', section: 'Aptitude' },
  { question: 'A can do work in 10 days, B in 15 days. Together:', options: ['5 days', '6 days', '7 days', '8 days'], correctAnswer: '6 days', topic: 'Work', section: 'Aptitude' },
  { question: 'Pointing to a man, woman said "His mother is only daughter of my mother". Relation:', options: ['Mother', 'Sister', 'Aunt', 'Grandmother'], correctAnswer: 'Mother', topic: 'Blood Relations', section: 'Reasoning' },
  { question: 'Population grows 10% annually. After 2 years from 10000:', options: ['12000', '12100', '11000', '11500'], correctAnswer: '12100', topic: 'Percentage', section: 'Aptitude' },
];

export default function TakeTestPage() {
  const params = useParams();
  const router = useRouter();
  const [started, setStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>(new Array(testQuestions.length).fill(null));
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<any>(null);

  // Timer
  useEffect(() => {
    if (!started || submitted) return;
    const interval = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(interval);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, submitted]);

  // Auto-submit when time runs out
  useEffect(() => {
    if (timeLeft === 0 && started && !submitted) {
      handleSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQ] = answer;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    let correct = 0, incorrect = 0, unanswered = 0;
    const topicWise: Record<string, { correct: number; total: number }> = {};

    testQuestions.forEach((q, i) => {
      const topic = q.topic;
      if (!topicWise[topic]) topicWise[topic] = { correct: 0, total: 0 };
      topicWise[topic].total++;

      if (!answers[i]) unanswered++;
      else if (answers[i] === q.correctAnswer) { correct++; topicWise[topic].correct++; }
      else incorrect++;
    });

    const score = Math.round((correct / testQuestions.length) * 100);
    setResults({ score, correct, incorrect, unanswered, total: testQuestions.length, topicWise });
    setSubmitted(true);
    toast.success(`Test submitted! Score: ${score}%`);
  };

  const formatTime = (s: number) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

  if (!started) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card">
          <h1 className="text-2xl font-bold mb-4">📝 Mock Test</h1>
          <div className="space-y-3 text-left mb-8 text-sm">
            <p>• Total Questions: {testQuestions.length}</p>
            <p>• Duration: 30 minutes</p>
            <p>• No negative marking</p>
            <p>• Timer will auto-submit when time runs out</p>
            <p>• You can navigate between questions</p>
          </div>
          <button onClick={() => setStarted(true)} className="btn-primary text-lg px-8">
            Start Test →
          </button>
        </motion.div>
      </div>
    );
  }

  if (submitted && results) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="card text-center mb-6">
            <h1 className="text-3xl font-bold mb-2">Test Results</h1>
            <div className="text-6xl font-bold gradient-text my-4">{results.score}%</div>
            <div className="flex justify-center gap-6 text-sm">
              <span className="text-green-600">✅ {results.correct} Correct</span>
              <span className="text-red-600">❌ {results.incorrect} Wrong</span>
              <span className="text-dark-500">⏭️ {results.unanswered} Skipped</span>
            </div>
          </div>

          {/* Topic-wise Analysis */}
          <div className="card mb-6">
            <h3 className="font-semibold mb-4">Topic-wise Analysis</h3>
            <div className="space-y-3">
              {Object.entries(results.topicWise).map(([topic, data]: [string, any]) => (
                <div key={topic} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{topic}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 h-2 bg-dark-200 dark:bg-dark-700 rounded-full overflow-hidden">
                      <div className="h-full bg-primary-500 rounded-full" style={{ width: `${(data.correct / data.total) * 100}%` }} />
                    </div>
                    <span className="text-sm text-dark-500">{data.correct}/{data.total}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Review */}
          <div className="card">
            <h3 className="font-semibold mb-4">Question Review</h3>
            <div className="space-y-4">
              {testQuestions.map((q, i) => (
                <div key={i} className={`p-4 rounded-lg border ${answers[i] === q.correctAnswer ? 'border-green-200 bg-green-50 dark:bg-green-900/10' : 'border-red-200 bg-red-50 dark:bg-red-900/10'}`}>
                  <p className="font-medium text-sm mb-2">Q{i + 1}: {q.question}</p>
                  <p className="text-xs text-dark-500">Your answer: {answers[i] || 'Not answered'}</p>
                  <p className="text-xs text-green-600">Correct: {q.correctAnswer}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-6">
            <button onClick={() => router.push('/mock-tests')} className="btn-primary">Back to Tests</button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="sticky top-16 z-40 bg-white dark:bg-dark-950 py-3 border-b border-dark-200 dark:border-dark-700 mb-6">
        <div className="flex items-center justify-between">
          <span className="font-medium">Q {currentQ + 1}/{testQuestions.length}</span>
          <span className={`font-mono font-bold text-lg ${timeLeft < 300 ? 'text-red-600' : ''}`}>
            ⏱️ {formatTime(timeLeft)}
          </span>
          <button onClick={handleSubmit} className="btn-primary text-sm py-1.5">Submit Test</button>
        </div>
        {/* Question navigation */}
        <div className="flex flex-wrap gap-1 mt-3">
          {testQuestions.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentQ(i)}
              className={`w-8 h-8 rounded text-xs font-medium ${
                i === currentQ ? 'bg-primary-600 text-white' :
                answers[i] ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                'bg-dark-100 dark:bg-dark-700'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Question */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs bg-dark-100 dark:bg-dark-700 px-2 py-1 rounded">{testQuestions[currentQ].section}</span>
          <span className="text-xs text-dark-500">{testQuestions[currentQ].topic}</span>
        </div>
        <p className="text-lg font-medium mb-6">{testQuestions[currentQ].question}</p>
        <div className="space-y-3">
          {testQuestions[currentQ].options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(opt)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                answers[currentQ] === opt ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-dark-200 dark:border-dark-600 hover:border-primary-300'
              }`}
            >
              <span className="font-medium mr-3">{String.fromCharCode(65 + i)}.</span>{opt}
            </button>
          ))}
        </div>
        <div className="flex justify-between mt-6">
          <button onClick={() => setCurrentQ(Math.max(0, currentQ - 1))} disabled={currentQ === 0} className="btn-secondary disabled:opacity-50">
            ← Previous
          </button>
          <button onClick={() => setCurrentQ(Math.min(testQuestions.length - 1, currentQ + 1))} disabled={currentQ === testQuestions.length - 1} className="btn-primary">
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
