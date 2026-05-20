'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { codeAPI } from '@/lib/api';
import toast from 'react-hot-toast';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

const LANGUAGES = [
  { id: 'python', name: 'Python', defaultCode: '# Write your Python code here\n\ndef solution():\n    n = int(input())\n    print(f"Hello, you entered {n}")\n\nsolution()' },
  { id: 'java', name: 'Java', defaultCode: 'import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        System.out.println("Hello, you entered " + n);\n    }\n}' },
  { id: 'cpp', name: 'C++', defaultCode: '#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    cout << "Hello, you entered " << n << endl;\n    return 0;\n}' },
  { id: 'javascript', name: 'JavaScript', defaultCode: '// Write your JavaScript code here\nconst readline = require("readline");\nconst rl = readline.createInterface({ input: process.stdin });\n\nrl.on("line", (line) => {\n    console.log(`Hello, you entered ${line}`);\n    rl.close();\n});' },
];

export default function PlaygroundPage() {
  const [language, setLanguage] = useState(LANGUAGES[0]);
  const [code, setCode] = useState(LANGUAGES[0].defaultCode);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [running, setRunning] = useState(false);
  const [activeTab, setActiveTab] = useState<'input' | 'output'>('input');

  const handleRun = async () => {
    setRunning(true);
    setActiveTab('output');
    try {
      const res = await codeAPI.run({ code, language: language.id, input });
      if (res.data.error) {
        setOutput(`Error:\n${res.data.error}`);
      } else {
        setOutput(res.data.output || 'No output');
      }
    } catch (err: any) {
      setOutput(`Execution failed: ${err.message}`);
      toast.error('Code execution failed');
    }
    setRunning(false);
  };

  const handleLanguageChange = (langId: string) => {
    const lang = LANGUAGES.find(l => l.id === langId)!;
    setLanguage(lang);
    setCode(lang.defaultCode);
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-dark-50 dark:bg-dark-900 border-b border-dark-200 dark:border-dark-700">
        <div className="flex items-center gap-3">
          <h2 className="font-semibold text-sm">Code Playground</h2>
          <select
            value={language.id}
            onChange={(e) => handleLanguageChange(e.target.value)}
            className="text-sm px-3 py-1.5 rounded-lg border border-dark-200 dark:border-dark-600 bg-white dark:bg-dark-800"
          >
            {LANGUAGES.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
          </select>
        </div>
        <button
          onClick={handleRun}
          disabled={running}
          className="btn-primary text-sm py-1.5 px-4 flex items-center gap-2"
        >
          {running ? (
            <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Running...</>
          ) : (
            <>▶ Run Code</>
          )}
        </button>
      </div>

      {/* Editor + IO */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Editor */}
        <div className="flex-1 min-h-[300px]">
          <MonacoEditor
            height="100%"
            language={language.id === 'cpp' ? 'cpp' : language.id}
            value={code}
            onChange={(val) => setCode(val || '')}
            theme="vs-dark"
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              padding: { top: 16 },
              scrollBeyondLastLine: false,
              automaticLayout: true,
            }}
          />
        </div>

        {/* Input/Output Panel */}
        <div className="lg:w-[400px] border-t lg:border-t-0 lg:border-l border-dark-200 dark:border-dark-700 flex flex-col">
          <div className="flex border-b border-dark-200 dark:border-dark-700">
            <button
              onClick={() => setActiveTab('input')}
              className={`flex-1 px-4 py-2 text-sm font-medium ${activeTab === 'input' ? 'bg-white dark:bg-dark-800 border-b-2 border-primary-500' : 'text-dark-500'}`}
            >
              Input
            </button>
            <button
              onClick={() => setActiveTab('output')}
              className={`flex-1 px-4 py-2 text-sm font-medium ${activeTab === 'output' ? 'bg-white dark:bg-dark-800 border-b-2 border-primary-500' : 'text-dark-500'}`}
            >
              Output
            </button>
          </div>
          <div className="flex-1 p-4">
            {activeTab === 'input' ? (
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter input here (stdin)..."
                className="w-full h-full resize-none font-mono text-sm bg-transparent outline-none"
              />
            ) : (
              <pre className="w-full h-full overflow-auto font-mono text-sm whitespace-pre-wrap">
                {running ? 'Running...' : output || 'Output will appear here after running code.'}
              </pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
