'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { codeAPI } from '@/lib/api';
import toast from 'react-hot-toast';
import { getJavaChapterData } from '@/data/javaData';
import MarkdownRenderer from '@/components/MarkdownRenderer';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

export default function JavaChapterPage() {
  const params = useParams();
  const chapter = params.chapter as string;
  const data = getJavaChapterData(chapter);

  const [activeTab, setActiveTab] = useState<'notes' | 'code' | 'mcq'>('notes');
  const [code, setCode] = useState(data.exercises?.[0]?.starterCode || '// Write your Java code here\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello Java!");\n    }\n}');
  const [output, setOutput] = useState('');
  const [running, setRunning] = useState(false);
  const [currentMCQ, setCurrentMCQ] = useState(0);
  const [selectedMCQ, setSelectedMCQ] = useState<string | null>(null);
  const [exerciseIdx, setExerciseIdx] = useState(0);

  const handleRun = async () => {
    setRunning(true);
    try {
      const res = await codeAPI.run({ code, language: 'java', input: data.exercises?.[exerciseIdx]?.testInput || '' });
      setOutput(res.data.output || res.data.error || 'No output');
    } catch {
      setOutput('Connect Judge0 API for code execution, or run locally.');
    }
    setRunning(false);
  };

  const chapterName = chapter.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center gap-2 text-sm text-dark-500 mb-4">
        <Link href="/java" className="hover:text-primary-600 transition-colors">Java</Link>
        <span>/</span>
        <span className="font-medium text-dark-800 dark:text-dark-200">{data.title || chapterName}</span>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent mb-6">
          ☕ {data.title || chapterName}
        </h1>

        {/* Tabs */}
        <div className="flex gap-1 bg-dark-100 dark:bg-dark-800 p-1.5 rounded-xl mb-6 w-fit shadow-inner">
          {[
            { id: 'notes' as const, label: '📖 Notes' },
            { id: 'code' as const, label: '💻 Practice' },
            { id: 'mcq' as const, label: '❓ MCQs' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id ? 'bg-white dark:bg-dark-700 shadow-md text-primary-600 scale-[1.02]' : 'text-dark-500 hover:text-dark-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Notes Tab */}
        {activeTab === 'notes' && (
          <div className="card max-w-none">
            <MarkdownRenderer content={data.notes} />
          </div>
        )}

        {/* Code Practice Tab */}
        {activeTab === 'code' && (
          <div>
            {/* Exercise Selector */}
            {data.exercises.length > 1 && (
              <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                {data.exercises.map((ex, i) => (
                  <button
                    key={i}
                    onClick={() => { setExerciseIdx(i); setCode(ex.starterCode); setOutput(''); }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                      exerciseIdx === i ? 'bg-primary-600 text-white shadow-md' : 'bg-dark-100 dark:bg-dark-700 hover:bg-dark-200'
                    }`}
                  >
                    {ex.title}
                  </button>
                ))}
              </div>
            )}

            <div className="grid lg:grid-cols-2 gap-4">
              <div className="card">
                <h3 className="font-semibold mb-2">{data.exercises?.[exerciseIdx]?.title || 'Practice'}</h3>
                <p className="text-sm text-dark-500 mb-4">{data.exercises?.[exerciseIdx]?.description || 'Write and run Java code'}</p>
                <div className="h-[350px] border border-dark-200 dark:border-dark-700 rounded-xl overflow-hidden shadow-inner">
                  <MonacoEditor
                    height="100%"
                    language="java"
                    value={code}
                    onChange={(val) => setCode(val || '')}
                    theme="vs-dark"
                    options={{ fontSize: 14, minimap: { enabled: false }, padding: { top: 12 } }}
                  />
                </div>
                <button onClick={handleRun} disabled={running}
                  className="mt-3 px-6 py-2.5 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50">
                  {running ? '⏳ Running...' : '▶ Run Code'}
                </button>
              </div>
              <div className="card">
                <h3 className="font-semibold mb-2">Output</h3>
                <pre className="bg-dark-900 text-green-400 p-4 rounded-xl h-[350px] overflow-auto font-mono text-sm shadow-inner">
                  {output || '// Click "Run Code" to see output here'}
                </pre>
                {data.exercises?.[exerciseIdx]?.expectedOutput && (
                  <div className="mt-3 p-3 bg-accent-50 dark:bg-accent-900/20 rounded-xl text-sm border border-accent-200 dark:border-accent-800">
                    <strong className="text-accent-700 dark:text-accent-300">Expected Output:</strong>
                    <pre className="mt-1 font-mono text-xs">{data.exercises[exerciseIdx].expectedOutput}</pre>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* MCQs Tab */}
        {activeTab === 'mcq' && data.mcqs?.length > 0 && (
          <div className="max-w-2xl">
            {/* Progress */}
            <div className="mb-4">
              <div className="flex justify-between text-xs text-dark-500 mb-1">
                <span>Question {currentMCQ + 1} of {data.mcqs.length}</span>
              </div>
              <div className="h-2 bg-dark-100 dark:bg-dark-800 rounded-full overflow-hidden">
                <motion.div
                  animate={{ width: `${((currentMCQ + 1) / data.mcqs.length) * 100}%` }}
                  className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
                />
              </div>
            </div>

            <div className="card">
              <p className="text-lg font-medium mb-6 leading-relaxed">{data.mcqs[currentMCQ].question}</p>
              <div className="space-y-3">
                {data.mcqs[currentMCQ].options.map((opt: string, i: number) => {
                  let cls = 'border-dark-200 dark:border-dark-600 hover:border-primary-400 hover:bg-primary-50/50 dark:hover:bg-primary-900/10';
                  if (selectedMCQ) {
                    if (opt === data.mcqs[currentMCQ].correctAnswer) cls = 'border-green-500 bg-green-50 dark:bg-green-900/20 shadow-md';
                    else if (opt === selectedMCQ) cls = 'border-red-500 bg-red-50 dark:bg-red-900/20';
                    else cls = 'border-dark-100 dark:border-dark-700 opacity-60';
                  }
                  return (
                    <motion.button
                      key={i}
                      whileHover={!selectedMCQ ? { scale: 1.01, x: 4 } : {}}
                      whileTap={!selectedMCQ ? { scale: 0.98 } : {}}
                      onClick={() => {
                        if (selectedMCQ) return;
                        setSelectedMCQ(opt);
                        opt === data.mcqs[currentMCQ].correctAnswer ? toast.success('✅ Correct!') : toast.error('❌ Wrong!');
                      }}
                      disabled={!!selectedMCQ}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 ${cls}`}
                    >
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-dark-100 dark:bg-dark-700 text-sm font-bold mr-3">
                        {String.fromCharCode(65 + i)}
                      </span>
                      {opt}
                      {selectedMCQ && opt === data.mcqs[currentMCQ].correctAnswer && <span className="float-right text-green-500">✓</span>}
                      {selectedMCQ && opt === selectedMCQ && opt !== data.mcqs[currentMCQ].correctAnswer && <span className="float-right text-red-500">✗</span>}
                    </motion.button>
                  );
                })}
              </div>
              {selectedMCQ && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
                  <div className="p-4 bg-dark-50 dark:bg-dark-900 rounded-xl border border-dark-100 dark:border-dark-700 text-sm leading-relaxed">
                    💡 {data.mcqs[currentMCQ].explanation}
                  </div>
                  <button
                    onClick={() => { setCurrentMCQ(q => Math.min(q + 1, data.mcqs.length - 1)); setSelectedMCQ(null); }}
                    className="mt-4 px-6 py-2.5 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all"
                  >
                    {currentMCQ >= data.mcqs.length - 1 ? '🏆 Done!' : 'Next →'}
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
