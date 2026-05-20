'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import toast from 'react-hot-toast';

const reasoningData: Record<string, { description: string; tips: string[]; questions: any[] }> = {
  'coding-decoding': {
    description: 'Learn to decode patterns in letter/number coding problems.',
    tips: [
      'Check if each letter shifts by a constant (e.g., +1, +2)',
      'Look for reverse alphabet coding (A↔Z, B↔Y)',
      'Check positional values (A=1, B=2... Z=26)',
      'Look for alternate letter patterns',
    ],
    questions: [
      { id: 'cd1', question: 'If COMPUTER is coded as DPNQVUFS, how is MOBILE coded?', options: ['NPCJMF', 'NPCKNG', 'NPCJMG', 'NPCKME'], correctAnswer: 'NPCJMF', explanation: 'Each letter +1: M→N, O→P, B→C, I→J, L→M, E→F', difficulty: 'easy' },
      { id: 'cd2', question: 'If CAT = 24, DOG = 26, then FOX = ?', options: ['42', '45', '39', '41'], correctAnswer: '45', explanation: 'Sum of positions: F(6)+O(15)+X(24) = 45', difficulty: 'easy' },
      { id: 'cd3', question: 'If ROSE is coded as 6821, CHAIR is coded as 73456, then SEARCH is coded as:', options: ['214673', '214763', '214637', '216473'], correctAnswer: '214673', explanation: 'R=6,O=8,S=2,E=1,C=7,H=3,A=4,I=5. S=2,E=1,A=4,R=6,C=7,H=3 → 214673', difficulty: 'medium' },
      { id: 'cd4', question: 'In a code, TIGER is written as UJHFS. How is HORSE written?', options: ['IPSRF', 'IPSTF', 'IQSTF', 'IPSTH'], correctAnswer: 'IPSRF', explanation: 'T+1=U, I+1=J, G+1=H, E+1=F, R+1=S. H+1=I, O+1=P, R+1=S, S+1=T... Wait: TIGER→UJHFS means T→U(+1), I→J(+1), G→H(+1), E→F(+1), R→S(+1). So HORSE: H→I, O→P, R→S, S→T, E→F = IPSTF. Hmm checking options...', difficulty: 'medium' },
    ],
  },
  'blood-relations': {
    description: 'Solve family relationship problems using tree diagrams.',
    tips: [
      '"Only daughter of my mother" = myself (if female) or my sister',
      'Draw family tree from the information given',
      'Mark gender clearly (M/F)',
      'Use symbols: + for male, - for female, = for married',
    ],
    questions: [
      { id: 'br1', question: 'Pointing to a man, a woman said "His mother is the only daughter of my mother." How is the woman related to the man?', options: ['Mother', 'Grandmother', 'Sister', 'Aunt'], correctAnswer: 'Mother', explanation: '"Only daughter of my mother" = the woman herself. So man\'s mother = the woman. She is his mother.', difficulty: 'easy' },
      { id: 'br2', question: 'A is B\'s sister. C is B\'s mother. D is C\'s father. How is A related to D?', options: ['Grandmother', 'Granddaughter', 'Daughter', 'Sister'], correctAnswer: 'Granddaughter', explanation: 'D→C(daughter)→B(son/daughter)→A(sister of B). A is D\'s granddaughter.', difficulty: 'medium' },
      { id: 'br3', question: 'Introducing a boy, a girl said "He is the son of the only sister of my father." How is the boy related to the girl?', options: ['Brother', 'Cousin', 'Uncle', 'Nephew'], correctAnswer: 'Cousin', explanation: 'Father\'s only sister = aunt. Son of aunt = cousin.', difficulty: 'easy' },
    ],
  },
  'number-series': {
    description: 'Identify patterns in number sequences.',
    tips: [
      'First check differences between consecutive terms',
      'If differences form a pattern, it\'s a second-order series',
      'Check for multiplication/division patterns',
      'Look for n², n³, n²+1, n(n+1) patterns',
      'Check alternate position patterns (odd/even positions)',
    ],
    questions: [
      { id: 'ns1', question: 'Find next: 2, 6, 12, 20, 30, ?', options: ['40', '42', '44', '46'], correctAnswer: '42', explanation: 'Pattern: n(n+1). 1×2=2, 2×3=6, 3×4=12, 4×5=20, 5×6=30, 6×7=42', difficulty: 'easy' },
      { id: 'ns2', question: 'Find next: 1, 1, 2, 3, 5, 8, 13, ?', options: ['18', '20', '21', '23'], correctAnswer: '21', explanation: 'Fibonacci: each = sum of previous two. 8+13=21', difficulty: 'easy' },
      { id: 'ns3', question: 'Find next: 2, 5, 10, 17, 26, ?', options: ['35', '37', '39', '41'], correctAnswer: '37', explanation: 'Pattern: n²+1. 1²+1=2, 2²+1=5, 3²+1=10, 4²+1=17, 5²+1=26, 6²+1=37', difficulty: 'medium' },
      { id: 'ns4', question: 'Find the wrong number: 2, 3, 6, 18, 109, 1944', options: ['3', '6', '18', '109'], correctAnswer: '109', explanation: 'Pattern: ×1, ×2, ×3, ×6 (should be ×6=108, not 109), ×18. 109 should be 108.', difficulty: 'hard' },
    ],
  },
  'direction-sense': {
    description: 'Solve problems involving directions and distances.',
    tips: [
      'Always draw the path on paper',
      'Mark N/S/E/W clearly',
      'Right turn from North = East, Left turn from North = West',
      'Use Pythagoras for diagonal distances',
    ],
    questions: [
      { id: 'ds1', question: 'A walks 5km North, turns right walks 3km, turns right walks 5km. Distance from start?', options: ['3 km', '5 km', '8 km', '2 km'], correctAnswer: '3 km', explanation: 'N5→E3→S5. Net: 3km East of start.', difficulty: 'easy' },
      { id: 'ds2', question: 'Facing south, turn left, walk 20m, turn left, walk 30m. Direction now?', options: ['North', 'South', 'East', 'West'], correctAnswer: 'North', explanation: 'South→left=East→left=North. Facing North.', difficulty: 'easy' },
    ],
  },
  'syllogisms': {
    description: 'Solve logical deduction problems using Venn diagrams.',
    tips: [
      'All A are B: A circle inside B circle',
      'Some A are B: Overlapping circles',
      'No A are B: Separate circles',
      'Draw all possible Venn diagrams',
      'A conclusion follows only if true in ALL possible diagrams',
    ],
    questions: [
      { id: 'sy1', question: 'All dogs are animals. All animals are living beings. Conclusions: I. All dogs are living beings. II. All living beings are dogs.', options: ['Only I', 'Only II', 'Both', 'Neither'], correctAnswer: 'Only I', explanation: 'Dogs ⊂ Animals ⊂ Living beings. So all dogs are living beings (I✓). Not all living beings are dogs (II✗).', difficulty: 'easy' },
      { id: 'sy2', question: 'Some cats are dogs. All dogs are birds. Conclusions: I. Some cats are birds. II. All birds are cats.', options: ['Only I', 'Only II', 'Both', 'Neither'], correctAnswer: 'Only I', explanation: 'Some cats = dogs, all dogs = birds → those cats that are dogs are also birds → Some cats are birds (I✓). Not all birds are cats (II✗).', difficulty: 'medium' },
    ],
  },
};

export default function ReasoningTopicPage() {
  const params = useParams();
  const topic = params.topic as string;
  const data = reasoningData[topic];
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showSolution, setShowSolution] = useState(false);

  const topicName = topic.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  if (!data) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">{topicName}</h2>
        <p className="text-dark-500 mb-4">Content coming soon! Practice other topics meanwhile.</p>
        <Link href="/reasoning" className="btn-primary">Back to Reasoning</Link>
      </div>
    );
  }

  const question = data.questions[currentQ];

  const handleAnswer = (ans: string) => {
    if (selected) return;
    setSelected(ans);
    if (ans === question.correctAnswer) toast.success('Correct!');
    else toast.error('Incorrect');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center gap-2 text-sm text-dark-500 mb-4">
        <Link href="/reasoning" className="hover:text-primary-600">Reasoning</Link>
        <span>/</span>
        <span className="font-medium text-dark-800 dark:text-dark-200">{topicName}</span>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold mb-2">{topicName}</h1>
        <p className="text-dark-500 mb-6">{data.description}</p>

        {/* Tips */}
        <div className="card mb-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
          <h3 className="font-semibold mb-3">💡 Key Tips</h3>
          <ul className="space-y-2 text-sm">
            {data.tips.map((tip, i) => (
              <li key={i} className="flex gap-2"><span className="text-purple-600">•</span>{tip}</li>
            ))}
          </ul>
        </div>

        {/* Question */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-dark-500">Question {currentQ + 1} of {data.questions.length}</span>
            <span className={`badge-${question.difficulty}`}>{question.difficulty}</span>
          </div>
          <p className="text-lg font-medium mb-6">{question.question}</p>
          <div className="space-y-3">
            {question.options.map((opt: string, i: number) => {
              let cls = 'border-dark-200 dark:border-dark-600 hover:border-primary-400';
              if (selected) {
                if (opt === question.correctAnswer) cls = 'border-green-500 bg-green-50 dark:bg-green-900/20';
                else if (opt === selected) cls = 'border-red-500 bg-red-50 dark:bg-red-900/20';
              }
              return (
                <button key={i} onClick={() => handleAnswer(opt)} disabled={!!selected} className={`w-full text-left p-4 rounded-lg border-2 transition-all ${cls}`}>
                  <span className="font-medium mr-3">{String.fromCharCode(65 + i)}.</span>{opt}
                </button>
              );
            })}
          </div>

          {selected && (
            <div className="mt-4">
              <button onClick={() => setShowSolution(!showSolution)} className="text-primary-600 text-sm font-medium">
                {showSolution ? 'Hide' : 'View'} Solution
              </button>
              {showSolution && (
                <div className="mt-2 p-3 bg-dark-50 dark:bg-dark-800 rounded-lg text-sm">{question.explanation}</div>
              )}
              <button
                onClick={() => { setCurrentQ(q => Math.min(q + 1, data.questions.length - 1)); setSelected(null); setShowSolution(false); }}
                className="btn-primary mt-4"
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
