'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const papers = [
  { id: 'infosys-2024-set1', title: 'Infosys SP 2024 - Set 1', year: 2024, type: 'Aptitude + Reasoning', questions: 65, difficulty: 'medium' },
  { id: 'infosys-2024-set2', title: 'Infosys SP 2024 - Set 2', year: 2024, type: 'Aptitude + Reasoning', questions: 65, difficulty: 'medium' },
  { id: 'infosys-2023-set1', title: 'Infosys SP 2023 - Set 1', year: 2023, type: 'Aptitude + Reasoning', questions: 65, difficulty: 'medium' },
  { id: 'hackwithinfy-2024', title: 'HackWithInfy 2024 Round 1', year: 2024, type: 'Coding', questions: 3, difficulty: 'hard' },
  { id: 'hackwithinfy-2023', title: 'HackWithInfy 2023 Round 1', year: 2023, type: 'Coding', questions: 3, difficulty: 'hard' },
  { id: 'infytq-2024', title: 'InfyTQ 2024 Certification', year: 2024, type: 'Python + Aptitude', questions: 40, difficulty: 'medium' },
  { id: 'infytq-2023', title: 'InfyTQ 2023 Certification', year: 2023, type: 'Python + Aptitude', questions: 40, difficulty: 'medium' },
];

const memoryQuestions = [
  { topic: 'Aptitude', question: 'A train 200m long crosses a bridge 300m long in 25 seconds. Speed of train?', answer: '72 km/hr', year: 2024 },
  { topic: 'Aptitude', question: 'If the ratio of ages of A and B is 3:5 and sum is 48, find A\'s age.', answer: '18 years', year: 2024 },
  { topic: 'Reasoning', question: 'If CLOUD is coded as DMPVE, how is RAIN coded?', answer: 'SBJO (+1 shift)', year: 2024 },
  { topic: 'Coding', question: 'Find the second largest element in an array without sorting.', answer: 'Single pass O(n) solution', year: 2024 },
  { topic: 'Coding', question: 'Check if a string is a valid palindrome ignoring spaces and special characters.', answer: 'Two pointer approach', year: 2023 },
  { topic: 'Aptitude', question: 'A shopkeeper gives 20% discount on MP and still makes 25% profit. Ratio of CP to MP?', answer: '4:5', year: 2023 },
];

export default function PYQPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">📚 Previous Year Questions</h1>
          <p className="text-dark-500 dark:text-dark-400">Memory-based questions from Infosys, HackWithInfy, and InfyTQ exams</p>
        </div>

        {/* Papers */}
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-4">📄 Full Papers</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {papers.map((paper, i) => (
              <motion.div key={paper.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <div className="card h-full">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium px-2 py-1 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded">{paper.year}</span>
                    <span className={`badge-${paper.difficulty}`}>{paper.difficulty}</span>
                  </div>
                  <h3 className="font-semibold mb-1">{paper.title}</h3>
                  <p className="text-xs text-dark-500 mb-3">{paper.type} • {paper.questions} questions</p>
                  <Link href={`/mock-tests/${paper.id}`} className="text-sm text-primary-600 font-medium hover:underline">
                    Attempt Paper →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Memory-based Questions */}
        <div>
          <h2 className="text-xl font-bold mb-4">🧠 Memory-Based Questions</h2>
          <div className="space-y-4">
            {memoryQuestions.map((q, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <div className="card">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs px-2 py-0.5 bg-dark-100 dark:bg-dark-700 rounded">{q.topic}</span>
                    <span className="text-xs text-dark-500">{q.year}</span>
                  </div>
                  <p className="font-medium text-sm mb-2">{q.question}</p>
                  <details className="text-sm">
                    <summary className="text-primary-600 cursor-pointer font-medium">View Answer</summary>
                    <p className="mt-2 p-2 bg-green-50 dark:bg-green-900/20 rounded text-green-800 dark:text-green-200">{q.answer}</p>
                  </details>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
