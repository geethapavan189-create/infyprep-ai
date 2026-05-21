'use client';
import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import toast from 'react-hot-toast';
import Link from 'next/link';

const ConfettiBurst = () => (
  <div className="fixed inset-0 pointer-events-none z-50">
    {Array.from({ length: 16 }).map((_, i) => (
      <motion.span key={i} initial={{ opacity: 1, y: '50vh', x: '50vw', scale: 0 }}
        animate={{ opacity: 0, scale: [0, 1.5, 0], y: `${Math.random() * 100}vh`, x: `${Math.random() * 100}vw` }}
        transition={{ duration: 1.2, delay: i * 0.04 }} className="absolute text-2xl">
        {['🎉','⭐','🔥','💯','✨','🏆','💎','🚀'][i % 8]}
      </motion.span>
    ))}
  </div>
);

const CircularTimer = ({ time, max }: { time: number; max: number }) => {
  const p = Math.min(time / max, 1), r = 20, c = 2 * Math.PI * r;
  const color = p < 0.5 ? '#22c55e' : p < 0.8 ? '#eab308' : '#ef4444';
  return (
    <div className="relative w-14 h-14 flex items-center justify-center">
      <svg className="absolute w-full h-full -rotate-90">
        <circle cx="28" cy="28" r={r} fill="none" stroke="currentColor" className="text-dark-200 dark:text-dark-700" strokeWidth="3" />
        <circle cx="28" cy="28" r={r} fill="none" stroke={color} strokeWidth="3" strokeDasharray={c} strokeDashoffset={c*(1-p)} strokeLinecap="round" />
      </svg>
      <span className="text-xs font-bold" style={{color}}>{Math.floor(time/60)}:{(time%60).toString().padStart(2,'0')}</span>
    </div>
  );
};

const reasoningData: Record<string, { description: string; tips: string[]; questions: { id: string; question: string; options: string[]; correctAnswer: string; explanation: string; difficulty: string }[] }> = {
  'coding-decoding': {
    description: 'Learn to decode patterns in letter/number coding problems.',
    tips: ['Check if each letter shifts by a constant (e.g., +1, +2)', 'Look for reverse alphabet coding (A↔Z, B↔Y)', 'Check positional values (A=1, B=2... Z=26)', 'Look for alternate letter patterns'],
    questions: [
      { id: 'cd1', question: 'If COMPUTER is coded as DPNQVUFS, how is MOBILE coded?', options: ['NPCJMF', 'NPCKNG', 'NPCJMG', 'NPCKME'], correctAnswer: 'NPCJMF', explanation: 'Each letter +1: M→N, O→P, B→C, I→J, L→M, E→F', difficulty: 'easy' },
      { id: 'cd2', question: 'If CAT = 24, DOG = 26, then FOX = ?', options: ['42', '45', '39', '41'], correctAnswer: '45', explanation: 'Sum of positions: F(6)+O(15)+X(24) = 45', difficulty: 'easy' },
      { id: 'cd3', question: 'If ROSE is coded as 6821, CHAIR is coded as 73456, then SEARCH is coded as:', options: ['214673', '214763', '214637', '216473'], correctAnswer: '214673', explanation: 'R=6,O=8,S=2,E=1,C=7,H=3,A=4,I=5. S=2,E=1,A=4,R=6,C=7,H=3 → 214673', difficulty: 'medium' },
      { id: 'cd4', question: 'In a code, TIGER is written as UJHFS. How is HORSE written?', options: ['IPSRF', 'IPSTF', 'IQSTF', 'IPSTH'], correctAnswer: 'IPSTF', explanation: 'Each letter +1: H→I, O→P, R→S, S→T, E→F = IPSTF', difficulty: 'medium' },
    ],
  },
  'blood-relations': {
    description: 'Solve family relationship problems using tree diagrams.',
    tips: ['"Only daughter of my mother" = myself (if female) or my sister', 'Draw family tree from the information given', 'Mark gender clearly (M/F)', 'Use symbols: + for male, - for female, = for married'],
    questions: [
      { id: 'br1', question: 'Pointing to a man, a woman said "His mother is the only daughter of my mother." How is the woman related to the man?', options: ['Mother', 'Grandmother', 'Sister', 'Aunt'], correctAnswer: 'Mother', explanation: '"Only daughter of my mother" = the woman herself. So she is his mother.', difficulty: 'easy' },
      { id: 'br2', question: "A is B's sister. C is B's mother. D is C's father. How is A related to D?", options: ['Grandmother', 'Granddaughter', 'Daughter', 'Sister'], correctAnswer: 'Granddaughter', explanation: "D→C(daughter)→B(son/daughter)→A(sister of B). A is D's granddaughter.", difficulty: 'medium' },
      { id: 'br3', question: 'Introducing a boy, a girl said "He is the son of the only sister of my father." How is the boy related to the girl?', options: ['Brother', 'Cousin', 'Uncle', 'Nephew'], correctAnswer: 'Cousin', explanation: "Father's only sister = aunt. Son of aunt = cousin.", difficulty: 'easy' },
    ],
  },
  'number-series': {
    description: 'Identify patterns in number sequences.',
    tips: ['First check differences between consecutive terms', "If differences form a pattern, it's a second-order series", 'Check for multiplication/division patterns', 'Look for n², n³, n²+1, n(n+1) patterns', 'Check alternate position patterns (odd/even positions)'],
    questions: [
      { id: 'ns1', question: 'Find next: 2, 6, 12, 20, 30, ?', options: ['40', '42', '44', '46'], correctAnswer: '42', explanation: 'Pattern: n(n+1). 1×2=2, 2×3=6, 3×4=12, 4×5=20, 5×6=30, 6×7=42', difficulty: 'easy' },
      { id: 'ns2', question: 'Find next: 1, 1, 2, 3, 5, 8, 13, ?', options: ['18', '20', '21', '23'], correctAnswer: '21', explanation: 'Fibonacci: each = sum of previous two. 8+13=21', difficulty: 'easy' },
      { id: 'ns3', question: 'Find next: 2, 5, 10, 17, 26, ?', options: ['35', '37', '39', '41'], correctAnswer: '37', explanation: 'Pattern: n²+1. 1²+1=2, 2²+1=5, 3²+1=10, 4²+1=17, 5²+1=26, 6²+1=37', difficulty: 'medium' },
      { id: 'ns4', question: 'Find the wrong number: 2, 3, 6, 18, 109, 1944', options: ['3', '6', '18', '109'], correctAnswer: '109', explanation: 'Pattern: ×1, ×2, ×3, ×6 (should be ×6=108, not 109), ×18. 109 should be 108.', difficulty: 'hard' },
    ],
  },
  'direction-sense': {
    description: 'Solve problems involving directions and distances.',
    tips: ['Always draw the path on paper', 'Mark N/S/E/W clearly', 'Right turn from North = East, Left turn from North = West', 'Use Pythagoras for diagonal distances'],
    questions: [
      { id: 'ds1', question: 'A walks 5km North, turns right walks 3km, turns right walks 5km. Distance from start?', options: ['3 km', '5 km', '8 km', '2 km'], correctAnswer: '3 km', explanation: 'N5→E3→S5. Net: 3km East of start.', difficulty: 'easy' },
      { id: 'ds2', question: 'Facing south, turn left, walk 20m, turn left, walk 30m. Direction now?', options: ['North', 'South', 'East', 'West'], correctAnswer: 'North', explanation: 'South→left=East→left=North. Facing North.', difficulty: 'easy' },
      { id: 'ds3', question: 'A man walks 3km North, 4km East. How far is he from start?', options: ['5 km', '7 km', '4 km', '6 km'], correctAnswer: '5 km', explanation: 'Pythagoras: √(3²+4²) = √25 = 5 km', difficulty: 'medium' },
    ],
  },
  'syllogisms': {
    description: 'Solve logical deduction problems using Venn diagrams.',
    tips: ['All A are B: A circle inside B circle', 'Some A are B: Overlapping circles', 'No A are B: Separate circles', 'Draw all possible Venn diagrams', 'A conclusion follows only if true in ALL possible diagrams'],
    questions: [
      { id: 'sy1', question: 'All dogs are animals. All animals are living beings. Conclusions: I. All dogs are living beings. II. All living beings are dogs.', options: ['Only I', 'Only II', 'Both', 'Neither'], correctAnswer: 'Only I', explanation: 'Dogs ⊂ Animals ⊂ Living beings. So all dogs are living beings (I✓). Not all living beings are dogs (II✗).', difficulty: 'easy' },
      { id: 'sy2', question: 'Some cats are dogs. All dogs are birds. Conclusions: I. Some cats are birds. II. All birds are cats.', options: ['Only I', 'Only II', 'Both', 'Neither'], correctAnswer: 'Only I', explanation: 'Some cats = dogs, all dogs = birds → those cats that are dogs are also birds → Some cats are birds (I✓). Not all birds are cats (II✗).', difficulty: 'medium' },
    ],
  },
  'seating-arrangement': {
    description: 'Solve linear and circular seating arrangement puzzles.',
    tips: ['For circular: fix one person and arrange others relative', 'For linear: identify who is at the ends first', 'Use elimination method for complex arrangements', 'Mark left/right clearly based on facing direction'],
    questions: [
      { id: 'sa1', question: 'A, B, C, D, E sit in a row. B is to the right of A. D is between A and B. Who is at the extreme left?', options: ['A', 'C', 'E', 'D'], correctAnswer: 'C', explanation: 'Arrangement: C/E, A, D, B, E/C. C or E at extreme left.', difficulty: 'medium' },
      { id: 'sa2', question: '6 people sit in a circle. A is opposite D. B is to the left of A. C is between D and E. Who is to the right of A?', options: ['F', 'E', 'C', 'B'], correctAnswer: 'F', explanation: 'Circle: A opposite D, B left of A, so F right of A.', difficulty: 'hard' },
    ],
  },
};

export default function ReasoningTopicPage() {
  const { topic } = useParams() as { topic: string };
  const { user, toggleBookmark } = useStore();
  const data = reasoningData[topic];
  const [difficulty, setDifficulty] = useState<'all'|'easy'|'medium'|'hard'>('all');
  const [cur, setCur] = useState(0);
  const [selected, setSelected] = useState<string|null>(null);
  const [showSol, setShowSol] = useState(false);
  const [score, setScore] = useState({correct:0, attempted:0});
  const [timer, setTimer] = useState(0);
  const [timerOn, setTimerOn] = useState(true);
  const [streak, setStreak] = useState(0);
  const [confetti, setConfetti] = useState(false);
  const [tipsOpen, setTipsOpen] = useState(false);
  const [quizMode, setQuizMode] = useState(false);
  const [quizTime, setQuizTime] = useState(300);
  const [done, setDone] = useState(false);
  const [aiExp, setAiExp] = useState(false);

  const topicName = topic.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ');
  const allQ = data?.questions ?? [];
  const questions = difficulty === 'all' ? allQ : allQ.filter(q => q.difficulty === difficulty);
  const bookmarked = (id: string) => user?.bookmarks?.includes(id) ?? false;
  const progress = questions.length ? (score.attempted / questions.length) * 100 : 0;

  useEffect(() => { let i: NodeJS.Timeout; if (timerOn) i = setInterval(() => setTimer(t=>t+1), 1000); return () => clearInterval(i); }, [timerOn]);
  useEffect(() => {
    let i: NodeJS.Timeout;
    if (quizMode && quizTime > 0) i = setInterval(() => setQuizTime(t=>t-1), 1000);
    else if (quizMode && quizTime === 0) { setDone(true); setQuizMode(false); }
    return () => clearInterval(i);
  }, [quizMode, quizTime]);

  const answer = useCallback((opt: string) => {
    if (selected) return;
    setSelected(opt); setTimerOn(false);
    const ok = opt === questions[cur]?.correctAnswer;
    setScore(s => ({correct: s.correct+(ok?1:0), attempted: s.attempted+1}));
    if (ok) { setStreak(s=>s+1); setConfetti(true); setTimeout(()=>setConfetti(false),1400); toast.success(`🔥 Correct! Streak: ${streak+1}`); }
    else { setStreak(0); toast.error('❌ Incorrect'); }
  }, [selected, questions, cur, streak]);

  const next = () => {
    if (cur >= questions.length - 1) { setDone(true); return; }
    setCur(c=>c+1); setSelected(null); setShowSol(false); setAiExp(false); setTimer(0); setTimerOn(true);
  };
  const reset = () => { setDone(false); setCur(0); setScore({correct:0,attempted:0}); setStreak(0); setTimer(0); setSelected(null); setQuizTime(300); };
  const slide = { enter: {x:300,opacity:0}, center: {x:0,opacity:1}, exit: {x:-300,opacity:0} };

  if (!data) return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-center">
      <h2 className="text-2xl font-bold mb-4">{topicName}</h2>
      <p className="text-dark-500 mb-4">Content coming soon!</p>
      <Link href="/reasoning" className="px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:scale-105 transition-transform">Back to Reasoning</Link>
    </div>
  );

  if (done) {
    const acc = score.attempted ? Math.round((score.correct/score.attempted)*100) : 0;
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <motion.div initial={{scale:0.8,opacity:0}} animate={{scale:1,opacity:1}}
          className="bg-gradient-to-br from-primary-500 to-accent-600 rounded-3xl p-8 text-white shadow-2xl">
          <h2 className="text-3xl font-bold text-center mb-2">🏆 Session Complete!</h2>
          <p className="text-center text-white/80 mb-8">{topicName}</p>
          <div className="grid grid-cols-2 gap-4 mb-8">
            {[{l:'Score',v:`${score.correct}/${score.attempted}`,i:'🎯'},{l:'Accuracy',v:`${acc}%`,i:'📊'},{l:'Best Streak',v:`${streak}`,i:'🔥'},{l:'Time',v:`${Math.floor(timer/60)}m ${timer%60}s`,i:'⏱️'}].map(s=>(
              <div key={s.l} className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
                <span className="text-2xl">{s.i}</span><p className="text-2xl font-bold mt-1">{s.v}</p><p className="text-sm text-white/70">{s.l}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-3 justify-center">
            <button onClick={reset} className="px-6 py-3 bg-white text-primary-600 font-semibold rounded-xl hover:scale-105 transition-transform">Try Again</button>
            <Link href="/reasoning" className="px-6 py-3 bg-white/20 backdrop-blur font-semibold rounded-xl hover:bg-white/30 transition-colors">All Topics</Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {confetti && <ConfettiBurst />}
      <div className="flex items-center gap-2 text-sm text-dark-500 mb-4">
        <Link href="/reasoning" className="hover:text-primary-600 transition-colors">Reasoning</Link><span>/</span>
        <span className="text-dark-800 dark:text-dark-200 font-medium">{topicName}</span>
      </div>
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent mb-2">{topicName}</h1>
        <p className="text-dark-500 dark:text-dark-400 mb-6">{data.description}</p>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-dark-500 mb-1"><span>{score.attempted}/{questions.length} answered</span><span>{Math.round(progress)}%</span></div>
          <div className="h-2 bg-dark-100 dark:bg-dark-800 rounded-full overflow-hidden">
            <motion.div animate={{width:`${progress}%`}} transition={{type:'spring',stiffness:50}} className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"/>
          </div>
        </div>

        {/* Controls Row */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="flex gap-2">
            {(['all','easy','medium','hard'] as const).map(d=>(
              <button key={d} onClick={()=>{setDifficulty(d);setCur(0);setSelected(null);setScore({correct:0,attempted:0});setStreak(0);}}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${difficulty===d?'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/30 scale-105':'bg-dark-100 dark:bg-dark-700 text-dark-600 dark:text-dark-300 hover:scale-105 hover:shadow-md'}`}>
                {d==='easy'?'🟢':d==='medium'?'🟡':d==='hard'?'🔴':'🎯'} {d[0].toUpperCase()+d.slice(1)}
              </button>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-4">
            {streak>0 && <motion.div initial={{scale:0}} animate={{scale:1}} className="flex items-center gap-1 px-3 py-1.5 bg-orange-100 dark:bg-orange-900/30 text-orange-600 rounded-full text-sm font-bold">🔥 {streak}</motion.div>}
            <CircularTimer time={timer} max={120}/>
          </div>
        </div>

        {/* Tips Accordion */}
        <div className="mb-6 rounded-2xl border border-dark-100 dark:border-dark-700 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <button onClick={()=>setTipsOpen(!tipsOpen)} className="w-full flex items-center justify-between p-5 bg-white dark:bg-dark-800 hover:bg-dark-50 dark:hover:bg-dark-750 transition-colors">
            <h3 className="text-lg font-semibold">💡 Key Tips & Tricks</h3>
            <motion.span animate={{rotate:tipsOpen?180:0}} className="text-xl">▼</motion.span>
          </button>
          <AnimatePresence>{tipsOpen && <motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} className="overflow-hidden">
            <div className="p-5 pt-2 space-y-2">
              {data.tips.map((tip,i)=>(
                <div key={i} className="flex gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
                  <span className="text-purple-600 font-bold shrink-0">#{i+1}</span><p className="text-sm">{tip}</p>
                </div>
              ))}
            </div>
          </motion.div>}</AnimatePresence>
        </div>

        {/* Quick Quiz Toggle */}
        {!quizMode && <div className="mb-6 flex gap-3">
          <button onClick={()=>{setQuizMode(true);setQuizTime(300);reset();setTimerOn(true);}}
            className="px-5 py-2.5 bg-gradient-to-r from-accent-500 to-primary-500 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all text-sm">⏱️ Quick Quiz (5 min)</button>
        </div>}

        {/* Quiz Timer Bar */}
        {quizMode && <div className="flex items-center gap-4 mb-6 p-4 bg-white dark:bg-dark-800 rounded-xl shadow-md">
          <div className="flex-1 h-3 bg-dark-100 dark:bg-dark-700 rounded-full overflow-hidden">
            <motion.div animate={{width:`${(quizTime/300)*100}%`}} className={`h-full rounded-full ${quizTime>60?'bg-green-500':quizTime>30?'bg-yellow-500':'bg-red-500 animate-pulse'}`}/>
          </div>
          <span className={`font-mono font-bold text-lg ${quizTime<=30?'text-red-500 animate-pulse':''}`}>{Math.floor(quizTime/60)}:{(quizTime%60).toString().padStart(2,'0')}</span>
        </div>}

        {/* Question Card */}
        {questions.length > 0 && <AnimatePresence mode="wait">
          <motion.div key={cur} variants={slide} initial="enter" animate="center" exit="exit" transition={{type:'spring',stiffness:300,damping:30}}
            className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-lg border border-dark-100 dark:border-dark-700 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-dark-500 font-medium">Q{cur+1}/{questions.length}</span>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${questions[cur]?.difficulty==='easy'?'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400':questions[cur]?.difficulty==='medium'?'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400':'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>{questions[cur]?.difficulty}</span>
                <motion.button whileTap={{scale:1.4}} onClick={()=>toggleBookmark(questions[cur]?.id)} className="text-xl">
                  <motion.span animate={bookmarked(questions[cur]?.id)?{scale:[1,1.3,1]}:{}}>{bookmarked(questions[cur]?.id)?'❤️':'🤍'}</motion.span>
                </motion.button>
              </div>
            </div>
            <p className="text-lg font-medium mb-6 leading-relaxed">{questions[cur]?.question}</p>
            <div className="space-y-3">
              {questions[cur]?.options.map((opt,i)=>{
                const isSel=selected===opt, isCor=opt===questions[cur]?.correctAnswer, ans=!!selected;
                return (
                  <motion.button key={i} whileHover={!ans?{scale:1.01,x:4}:{}} whileTap={!ans?{scale:0.98}:{}}
                    animate={ans&&isSel&&!isCor?{x:[0,-8,8,-4,4,0]}:ans&&isCor?{scale:[1,1.02,1]}:{}}
                    onClick={()=>{ answer(opt); if(quizMode) setTimeout(next,800); }} disabled={ans}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 ${!ans?'border-dark-200 dark:border-dark-600 hover:border-primary-400 hover:bg-primary-50/50 dark:hover:bg-primary-900/10 hover:shadow-md':isCor?'border-green-500 bg-green-50 dark:bg-green-900/20 shadow-md':isSel?'border-red-500 bg-red-50 dark:bg-red-900/20':'border-dark-100 dark:border-dark-700 opacity-60'}`}>
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-dark-100 dark:bg-dark-700 text-sm font-bold mr-3">{String.fromCharCode(65+i)}</span>
                    {opt}{ans&&isCor&&<span className="float-right text-green-500">✓</span>}{ans&&isSel&&!isCor&&<span className="float-right text-red-500">✗</span>}
                  </motion.button>
                );
              })}
            </div>

            {selected && !quizMode && <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} className="mt-6 space-y-4">
              <div className="flex flex-wrap gap-3">
                <button onClick={()=>setShowSol(!showSol)} className="px-4 py-2 text-sm font-medium text-primary-600 bg-primary-50 dark:bg-primary-900/20 rounded-xl hover:bg-primary-100 transition-colors">{showSol?'🙈 Hide':'👁️ Solution'}</button>
                <button onClick={()=>setAiExp(!aiExp)} className="px-4 py-2 text-sm font-medium text-accent-600 bg-accent-50 dark:bg-accent-900/20 rounded-xl hover:bg-accent-100 transition-colors">🤖 Explain with AI</button>
                <button onClick={next} className="ml-auto px-6 py-2.5 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all">{cur>=questions.length-1?'Results 🏆':'Next →'}</button>
              </div>
              <AnimatePresence>
                {showSol && <motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} className="p-4 bg-dark-50 dark:bg-dark-900 rounded-xl border border-dark-100 dark:border-dark-700 overflow-hidden">
                  <p className="text-sm leading-relaxed">{questions[cur]?.explanation}</p>
                </motion.div>}
              </AnimatePresence>
              <AnimatePresence>
                {aiExp && <motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}}
                  className="p-5 bg-gradient-to-br from-accent-50 to-primary-50 dark:from-accent-900/20 dark:to-primary-900/20 rounded-xl border border-accent-200 dark:border-accent-800 overflow-hidden">
                  <div className="flex items-center gap-2 mb-3"><span className="text-lg">🤖</span><h4 className="font-semibold text-accent-700 dark:text-accent-300">AI Step-by-Step</h4></div>
                  <div className="space-y-2 text-sm">
                    <p><strong>Step 1:</strong> Identify the pattern — {questions[cur]?.question.slice(0,50)}...</p>
                    <p><strong>Step 2:</strong> Apply the relevant logic or rule.</p>
                    <p><strong>Step 3:</strong> {questions[cur]?.explanation}</p>
                    <p><strong>Answer:</strong> <span className="text-primary-600 font-bold">{questions[cur]?.correctAnswer}</span></p>
                  </div>
                </motion.div>}
              </AnimatePresence>
            </motion.div>}
          </motion.div>
        </AnimatePresence>}

        {questions.length === 0 && <div className="text-center py-12 text-dark-500">No questions for this difficulty. Try another filter.</div>}
      </motion.div>
    </div>
  );
}
