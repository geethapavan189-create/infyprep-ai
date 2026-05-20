'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { codeAPI } from '@/lib/api';
import toast from 'react-hot-toast';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

const chapterData: Record<string, any> = {
  variables: {
    title: 'Variables & Data Types',
    notes: `## Variables in Python

A variable is a name that refers to a value stored in memory.

### Rules for Variable Names:
- Must start with a letter or underscore
- Can contain letters, numbers, underscores
- Case-sensitive (age ≠ Age)
- Cannot use Python keywords

### Data Types:
| Type | Example | Description |
|------|---------|-------------|
| int | 42 | Whole numbers |
| float | 3.14 | Decimal numbers |
| str | "hello" | Text |
| bool | True/False | Boolean |
| list | [1,2,3] | Ordered collection |
| tuple | (1,2,3) | Immutable collection |
| dict | {"a":1} | Key-value pairs |

### Type Casting:
\`\`\`python
x = int("5")      # str to int
y = float("3.14") # str to float
z = str(42)       # int to str
\`\`\``,
    exercises: [
      { title: 'Swap Two Variables', description: 'Given two variables a and b, swap their values without using a third variable.', starterCode: 'a = int(input())\nb = int(input())\n# Swap a and b without temp variable\n\nprint(a, b)', testInput: '5\n10', expectedOutput: '10 5' },
      { title: 'Type Checker', description: 'Read a value and print its type.', starterCode: 'x = input()\n# Print the type of x\nprint(type(x).__name__)', testInput: 'hello', expectedOutput: 'str' },
    ],
    mcqs: [
      { question: 'Which is NOT a valid variable name?', options: ['_name', '2name', 'name2', 'Name'], correctAnswer: '2name', explanation: 'Variable names cannot start with a number.' },
      { question: 'What is type(3.14)?', options: ['int', 'float', 'str', 'double'], correctAnswer: 'float', explanation: 'Decimal numbers are float type in Python.' },
      { question: 'x = "5"; y = int(x); print(type(y)) outputs:', options: ["<class 'int'>", "<class 'str'>", "<class 'float'>", 'Error'], correctAnswer: "<class 'int'>", explanation: 'int() converts string "5" to integer 5.' },
    ],
  },
  loops: {
    title: 'Loops',
    notes: `## Loops in Python

### For Loop:
\`\`\`python
for i in range(5):    # 0 to 4
    print(i)

for item in [1,2,3]:  # iterate list
    print(item)
\`\`\`

### While Loop:
\`\`\`python
count = 0
while count < 5:
    print(count)
    count += 1
\`\`\`

### Control Statements:
- **break** - exit loop immediately
- **continue** - skip current iteration
- **pass** - do nothing (placeholder)

### range() Function:
\`\`\`python
range(5)        # 0,1,2,3,4
range(2, 8)     # 2,3,4,5,6,7
range(0, 10, 2) # 0,2,4,6,8
\`\`\`

### Nested Loops:
\`\`\`python
for i in range(3):
    for j in range(3):
        print(i, j)
\`\`\``,
    exercises: [
      { title: 'Sum of N Numbers', description: 'Find sum of first N natural numbers using a loop.', starterCode: 'n = int(input())\n# Find sum of 1 to n\nsum = 0\nfor i in range(1, n+1):\n    sum += i\nprint(sum)', testInput: '10', expectedOutput: '55' },
      { title: 'Factorial', description: 'Calculate factorial of N.', starterCode: 'n = int(input())\n# Calculate n!\nresult = 1\nfor i in range(1, n+1):\n    result *= i\nprint(result)', testInput: '5', expectedOutput: '120' },
    ],
    mcqs: [
      { question: 'What does range(2, 8, 2) produce?', options: ['2,4,6', '2,4,6,8', '2,3,4,5,6,7', '2,4,6,8,10'], correctAnswer: '2,4,6', explanation: 'range(start, stop, step) - stop is exclusive. 2,4,6 (8 excluded).' },
      { question: 'What does "break" do?', options: ['Exits the loop', 'Skips iteration', 'Pauses loop', 'Restarts loop'], correctAnswer: 'Exits the loop', explanation: 'break immediately terminates the innermost loop.' },
    ],
  },
  functions: {
    title: 'Functions',
    notes: `## Functions in Python

### Defining Functions:
\`\`\`python
def greet(name):
    return f"Hello, {name}!"

# Call
print(greet("World"))
\`\`\`

### Parameters:
\`\`\`python
# Default parameters
def power(base, exp=2):
    return base ** exp

# *args - variable positional args
def add(*args):
    return sum(args)

# **kwargs - variable keyword args
def info(**kwargs):
    for key, val in kwargs.items():
        print(f"{key}: {val}")
\`\`\`

### Lambda Functions:
\`\`\`python
square = lambda x: x ** 2
add = lambda a, b: a + b
\`\`\`

### Scope:
- Local: inside function
- Global: outside all functions
- Use \`global\` keyword to modify global variable inside function`,
    exercises: [
      { title: 'Palindrome Check', description: 'Write a function to check if a string is palindrome.', starterCode: 'def is_palindrome(s):\n    # Your code here\n    return s == s[::-1]\n\ns = input()\nprint(is_palindrome(s))', testInput: 'racecar', expectedOutput: 'True' },
    ],
    mcqs: [
      { question: 'What is output of: def f(a, b=2): return a*b; print(f(3))', options: ['6', '5', '32', 'Error'], correctAnswer: '6', explanation: 'b defaults to 2, so 3*2=6.' },
    ],
  },
};

const defaultChapter = {
  title: 'Chapter',
  notes: '## Content coming soon\n\nThis chapter is being prepared with detailed notes, examples, and exercises.',
  exercises: [],
  mcqs: [],
};

export default function PythonChapterPage() {
  const params = useParams();
  const chapter = params.chapter as string;
  const data = chapterData[chapter] || defaultChapter;

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
      setOutput('Run code locally or connect Judge0 API for execution.');
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
            <div className="whitespace-pre-wrap text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: data.notes.replace(/```python\n([\s\S]*?)```/g, '<pre class="bg-dark-900 text-green-400 p-4 rounded-lg overflow-x-auto"><code>$1</code></pre>').replace(/\n/g, '<br/>') }} />
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
