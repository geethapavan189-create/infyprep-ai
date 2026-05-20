'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { codeAPI } from '@/lib/api';
import toast from 'react-hot-toast';
import Link from 'next/link';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

// Problem data (in production, fetch from API)
const problemsData: Record<string, any> = {
  'two-sum': {
    title: 'Two Sum',
    difficulty: 'easy',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.',
    examples: [
      { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].' },
      { input: 'nums = [3,2,4], target = 6', output: '[1,2]', explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].' },
    ],
    constraints: ['2 <= nums.length <= 10^4', '-10^9 <= nums[i] <= 10^9', 'Only one valid answer exists.'],
    hints: ['Try using a hash map to store complements.', 'For each number, check if target - number exists in the map.'],
    starterCode: {
      python: 'def two_sum(nums, target):\n    # Use hash map for O(n) solution\n    seen = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in seen:\n            return [seen[complement], i]\n        seen[num] = i\n\n# Read input\nn = int(input())\nnums = list(map(int, input().split()))\ntarget = int(input())\nresult = two_sum(nums, target)\nprint(*result)',
      java: 'import java.util.*;\npublic class Main {\n    public static int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> map = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int complement = target - nums[i];\n            if (map.containsKey(complement)) {\n                return new int[]{map.get(complement), i};\n            }\n            map.put(nums[i], i);\n        }\n        return new int[]{};\n    }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] nums = new int[n];\n        for(int i=0;i<n;i++) nums[i]=sc.nextInt();\n        int target = sc.nextInt();\n        int[] res = twoSum(nums, target);\n        System.out.println(res[0] + " " + res[1]);\n    }\n}',
      cpp: '#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    int n, target;\n    cin >> n;\n    vector<int> nums(n);\n    for(int i=0;i<n;i++) cin >> nums[i];\n    cin >> target;\n    \n    unordered_map<int,int> mp;\n    for(int i=0;i<n;i++){\n        if(mp.count(target-nums[i])){\n            cout << mp[target-nums[i]] << " " << i;\n            return 0;\n        }\n        mp[nums[i]] = i;\n    }\n    return 0;\n}',
    },
    testCases: [
      { input: '4\n2 7 11 15\n9', expected: '0 1' },
      { input: '3\n3 2 4\n6', expected: '1 2' },
    ],
  },
  'fibonacci': {
    title: 'Fibonacci Number',
    difficulty: 'easy',
    description: 'Given n, calculate F(n), the nth Fibonacci number.\n\nThe Fibonacci sequence is: F(0) = 0, F(1) = 1, F(n) = F(n-1) + F(n-2) for n > 1.',
    examples: [
      { input: 'n = 5', output: '5', explanation: 'F(5) = F(4) + F(3) = 3 + 2 = 5' },
      { input: 'n = 10', output: '55', explanation: 'F(10) = 55' },
    ],
    constraints: ['0 <= n <= 30'],
    hints: ['Use iterative approach to avoid stack overflow.', 'Keep track of only the last two values.'],
    starterCode: {
      python: 'def fibonacci(n):\n    if n <= 1:\n        return n\n    a, b = 0, 1\n    for _ in range(2, n + 1):\n        a, b = b, a + b\n    return b\n\nn = int(input())\nprint(fibonacci(n))',
      java: 'import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        if (n <= 1) { System.out.println(n); return; }\n        int a = 0, b = 1;\n        for (int i = 2; i <= n; i++) {\n            int temp = a + b;\n            a = b;\n            b = temp;\n        }\n        System.out.println(b);\n    }\n}',
    },
    testCases: [
      { input: '5', expected: '5' },
      { input: '10', expected: '55' },
      { input: '0', expected: '0' },
    ],
  },
};

export default function ProblemPage() {
  const params = useParams();
  const id = params.id as string;
  const problem = problemsData[id];

  const [language, setLanguage] = useState<'python' | 'java' | 'cpp'>('python');
  const [code, setCode] = useState(problem?.starterCode?.python || '');
  const [output, setOutput] = useState('');
  const [running, setRunning] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [testResults, setTestResults] = useState<any[]>([]);

  if (!problem) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Problem not found</h2>
          <Link href="/coding" className="btn-primary">Back to Problems</Link>
        </div>
      </div>
    );
  }

  const handleLanguageChange = (lang: 'python' | 'java' | 'cpp') => {
    setLanguage(lang);
    setCode(problem.starterCode[lang] || '');
  };

  const handleRun = async () => {
    setRunning(true);
    const results: any[] = [];
    for (const tc of problem.testCases) {
      try {
        const res = await codeAPI.run({ code, language, input: tc.input });
        const actual = (res.data.output || '').trim();
        results.push({
          input: tc.input,
          expected: tc.expected,
          actual,
          passed: actual === tc.expected,
          error: res.data.error,
        });
      } catch {
        results.push({ input: tc.input, expected: tc.expected, actual: 'Error', passed: false });
      }
    }
    setTestResults(results);
    const allPassed = results.every(r => r.passed);
    if (allPassed) toast.success('All test cases passed! 🎉');
    else toast.error(`${results.filter(r => r.passed).length}/${results.length} test cases passed`);
    setRunning(false);
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col lg:flex-row">
      {/* Problem Description */}
      <div className="lg:w-[45%] overflow-y-auto border-b lg:border-b-0 lg:border-r border-dark-200 dark:border-dark-700 p-6">
        <div className="flex items-center gap-2 text-sm text-dark-500 mb-4">
          <Link href="/coding" className="hover:text-primary-600">← Problems</Link>
        </div>
        <h1 className="text-2xl font-bold mb-2">{problem.title}</h1>
        <span className={`badge-${problem.difficulty}`}>{problem.difficulty}</span>

        <div className="mt-6 space-y-6">
          <div>
            <p className="whitespace-pre-line text-sm">{problem.description}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Examples:</h3>
            {problem.examples.map((ex: any, i: number) => (
              <div key={i} className="mb-3 p-3 bg-dark-50 dark:bg-dark-800 rounded-lg text-sm font-mono">
                <div><strong>Input:</strong> {ex.input}</div>
                <div><strong>Output:</strong> {ex.output}</div>
                {ex.explanation && <div className="text-dark-500 mt-1">{ex.explanation}</div>}
              </div>
            ))}
          </div>

          <div>
            <h3 className="font-semibold mb-2">Constraints:</h3>
            <ul className="list-disc list-inside text-sm text-dark-600 dark:text-dark-400 space-y-1">
              {problem.constraints.map((c: string, i: number) => <li key={i}>{c}</li>)}
            </ul>
          </div>

          {problem.hints && (
            <div>
              <button onClick={() => setShowHints(!showHints)} className="text-primary-600 text-sm font-medium">
                {showHints ? 'Hide Hints' : 'Show Hints 💡'}
              </button>
              {showHints && (
                <div className="mt-2 space-y-2">
                  {problem.hints.map((h: string, i: number) => (
                    <div key={i} className="p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded text-sm">💡 {h}</div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Test Results */}
          {testResults.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3">Test Results:</h3>
              {testResults.map((r, i) => (
                <div key={i} className={`p-3 mb-2 rounded-lg text-sm ${r.passed ? 'bg-green-50 dark:bg-green-900/20 border border-green-200' : 'bg-red-50 dark:bg-red-900/20 border border-red-200'}`}>
                  <div className="font-medium">{r.passed ? '✅' : '❌'} Test Case {i + 1}</div>
                  <div className="font-mono text-xs mt-1">Expected: {r.expected}</div>
                  <div className="font-mono text-xs">Got: {r.actual}</div>
                  {r.error && <div className="text-red-600 text-xs mt-1">{r.error}</div>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Code Editor */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between px-4 py-2 bg-dark-50 dark:bg-dark-900 border-b border-dark-200 dark:border-dark-700">
          <div className="flex gap-2">
            {(['python', 'java', 'cpp'] as const).map(l => (
              <button
                key={l}
                onClick={() => handleLanguageChange(l)}
                className={`px-3 py-1 rounded text-xs font-medium ${language === l ? 'bg-primary-600 text-white' : 'bg-dark-200 dark:bg-dark-700'}`}
              >
                {l === 'cpp' ? 'C++' : l.charAt(0).toUpperCase() + l.slice(1)}
              </button>
            ))}
          </div>
          <button onClick={handleRun} disabled={running} className="btn-primary text-sm py-1.5 px-4">
            {running ? 'Running...' : '▶ Run'}
          </button>
        </div>
        <div className="flex-1">
          <MonacoEditor
            height="100%"
            language={language === 'cpp' ? 'cpp' : language}
            value={code}
            onChange={(val) => setCode(val || '')}
            theme="vs-dark"
            options={{ fontSize: 14, minimap: { enabled: false }, padding: { top: 16 }, scrollBeyondLastLine: false }}
          />
        </div>
      </div>
    </div>
  );
}
