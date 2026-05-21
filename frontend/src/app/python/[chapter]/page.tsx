'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { codeAPI } from '@/lib/api';
import toast from 'react-hot-toast';
import { getChapterData } from '@/data/pythonData';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

export default function PythonChapterPage() {
  const params = useParams();
  const chapter = params.chapter as string;
  const data = getChapterData(chapter);

  const [activeTab, setActiveTab] = useState<'notes' | 'code' | 'mcq'>('notes');
  const [code, setCode] = useState(data.exercises?.[0]?.starterCode || '# Write your code here\nprint("Hello Python!")');
  const [output, setOutput] = useState('');
  const [running, setRunning] = useState(false);
  const [currentMCQ, setCurrentMCQ] = useState(0);
  const [selectedMCQ, setSelectedMCQ] = useState<string | null>(null);

  const handleRun = async () => {
    setRunning(true);
    try {
      const res = await codeAPI.run({ code, language: 'python', input: data.exercises?.[0]?.testInput || '' });
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
        <Link href="/python" className="hover:text-primary-600">Python</Link>
        <span>/</span>
        <span className="font-medium text-dark-800 dark:text-dark-200">{data.title || chapterName}</span>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold mb-6">{data.title || chapterName}</h1>

        {/* Tabs */}
        <div className="flex gap-1 bg-dark-100 dark:bg-dark-800 p-1 rounded-lg mb-6 w-fit">
          {[
            { id: 'notes' as const, label: '📖 Notes' },
            { id: 'code' as const, label: '💻 Practice' },
            { id: 'mcq' as const, label: '❓ MCQs' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id ? 'bg-white dark:bg-dark-700 shadow-sm' : 'text-dark-500'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Notes */}
        {activeTab === 'notes' && (
          <div className="card prose dark:prose-invert max-w-none">
            <div className="whitespace-pre-wrap text-sm leading-relaxed">{data.notes}</div>
          </div>
        )}

        {/* Code Practice */}
        {activeTab === 'code' && (
          <div className="grid lg:grid-cols-2 gap-4">
            <div className="card">
              <h3 className="font-semibold mb-2">{data.exercises?.[0]?.title || 'Practice'}</h3>
              <p className="text-sm text-dark-500 mb-4">{data.exercises?.[0]?.description || 'Write and run Python code'}</p>
              <div className="h-[300px] border border-dark-200 dark:border-dark-700 rounded-lg overflow-hidden">
                <MonacoEditor
                  height="100%"
                  language="python"
                  value={code}
                  onChange={(val) => setCode(val || '')}
                  theme="vs-dark"
                  options={{ fontSize: 14, minimap: { enabled: false } }}
                />
              </div>
              <button onClick={handleRun} disabled={running} className="btn-primary mt-3">
                {running ? 'Running...' : '▶ Run Code'}
              </button>
            </div>
            <div className="card">
              <h3 className="font-semibold mb-2">Output</h3>
              <pre className="bg-dark-900 text-green-400 p-4 rounded-lg h-[300px] overflow-auto font-mono text-sm">
                {output || 'Click "Run Code" to see output'}
              </pre>
              {data.exercises?.[0]?.expectedOutput && (
                <div className="mt-3 p-3 bg-dark-50 dark:bg-dark-800 rounded-lg text-sm">
                  <strong>Expected:</strong> {data.exercises[0].expectedOutput}
                </div>
              )}
            </div>
          </div>
        )}

        {/* MCQs */}
        {activeTab === 'mcq' && data.mcqs?.length > 0 && (
          <div className="card max-w-2xl">
            <div className="flex justify-between mb-4">
              <span className="text-sm text-dark-500">Question {currentMCQ + 1}/{data.mcqs.length}</span>
            </div>
            <p className="font-medium mb-4">{data.mcqs[currentMCQ].question}</p>
            <div className="space-y-2">
              {data.mcqs[currentMCQ].options.map((opt: string, i: number) => {
                let cls = 'border-dark-200 dark:border-dark-600';
                if (selectedMCQ) {
                  if (opt === data.mcqs[currentMCQ].correctAnswer) cls = 'border-green-500 bg-green-50 dark:bg-green-900/20';
                  else if (opt === selectedMCQ) cls = 'border-red-500 bg-red-50 dark:bg-red-900/20';
                }
                return (
                  <button key={i} onClick={() => { setSelectedMCQ(opt); opt === data.mcqs[currentMCQ].correctAnswer ? toast.success('Correct!') : toast.error('Wrong!'); }} disabled={!!selectedMCQ} className={`w-full text-left p-3 rounded-lg border-2 text-sm ${cls}`}>
                    {opt}
                  </button>
                );
              })}
            </div>
            {selectedMCQ && (
              <div className="mt-4">
                <p className="text-sm text-dark-500 p-3 bg-dark-50 dark:bg-dark-800 rounded">{data.mcqs[currentMCQ].explanation}</p>
                <button onClick={() => { setCurrentMCQ(q => Math.min(q + 1, data.mcqs.length - 1)); setSelectedMCQ(null); }} className="btn-primary mt-3 text-sm">Next →</button>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}
