'use client';
import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { getTopicQuestions, getTopicContent } from '@/data/aptitudeData';

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

export default function TopicPage() {
  const { topic } = useParams() as { topic: string };
  const { user, toggleBookmark } = useStore();
  const [activeTab, setActiveTab] = useState<'theory'|'practice'|'quiz'>('theory');
  const [difficulty, setDifficulty] = useState<'all'|'easy'|'medium'|'hard'>('all');
  const [cur, setCur] = useState(0);
  const [selected, setSelected] = useState<string|null>(null);
  const [showSol, setShowSol] = useState(false);
  const [score, setScore] = useState({correct:0, attempted:0});
  const [timer, setTimer] = useState(0);
  const [timerOn, setTimerOn] = useState(false);
  const [streak, setStreak] = useState(0);
  const [confetti, setConfetti] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [sections, setSections] = useState<Record<string,boolean>>({formulas:true});
  const [quizMode, setQuizMode] = useState(false);
  const [quizTime, setQuizTime] = useState(300);
  const [done, setDone] = useState(false);
  const [aiExp, setAiExp] = useState(false);

  const content = getTopicContent(topic);
  const allQ = getTopicQuestions(topic);
  const questions = difficulty === 'all' ? allQ : allQ.filter(q => q.difficulty === difficulty);
  const topicName = topic.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ');
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

  const reset = () => { setDone(false); setCur(0); setScore({correct:0,attempted:0}); setStreak(0); setTimer(0); setSelected(null); };
  const slide = { enter: {x:300,opacity:0}, center: {x:0,opacity:1}, exit: {x:-300,opacity:0} };

  if (done) {
    const acc = score.attempted ? Math.round((score.correct/score.attempted)*100) : 0;
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <motion.div initial={{scale:0.8,opacity:0}} animate={{scale:1,opacity:1}}
          className="bg-gradient-to-br from-primary-500 to-accent-600 rounded-3xl p-8 text-white shadow-2xl">
          <h2 className="text-3xl font-bold text-center mb-2">🏆 Session Complete!</h2>
          <p className="text-center text-white/80 mb-8">{topicName}</p>
          <div className="grid grid-cols-2 gap-4 mb-8">
            {[{l:'Score',v:`${score.correct}/${score.attempted}`,i:'🎯'},{l:'Accuracy',v:`${acc}%`,i:'📊'},{l:'Streak',v:`${streak}`,i:'🔥'},{l:'Time',v:`${Math.floor(timer/60)}m ${timer%60}s`,i:'⏱️'}].map(s=>(
              <div key={s.l} className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
                <span className="text-2xl">{s.i}</span><p className="text-2xl font-bold mt-1">{s.v}</p><p className="text-sm text-white/70">{s.l}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-3 justify-center">
            <button onClick={reset} className="px-6 py-3 bg-white text-primary-600 font-semibold rounded-xl hover:scale-105 transition-transform">Try Again</button>
            <Link href="/aptitude" className="px-6 py-3 bg-white/20 backdrop-blur font-semibold rounded-xl hover:bg-white/30 transition-colors">All Topics</Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {confetti && <ConfettiBurst />}
      <div className="flex items-center gap-2 text-sm text-dark-500 mb-4">
        <Link href="/aptitude" className="hover:text-primary-600 transition-colors">Aptitude</Link><span>/</span>
        <span className="text-dark-800 dark:text-dark-200 font-medium">{topicName}</span>
      </div>
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent mb-2">{topicName}</h1>
        <p className="text-dark-500 dark:text-dark-400 mb-6">{content.description}</p>

        {/* Progress Bar */}
        {(activeTab==='practice'||quizMode) && <div className="mb-6">
          <div className="flex justify-between text-xs text-dark-500 mb-1"><span>{score.attempted}/{questions.length}</span><span>{Math.round(progress)}%</span></div>
          <div className="h-2 bg-dark-100 dark:bg-dark-800 rounded-full overflow-hidden">
            <motion.div animate={{width:`${progress}%`}} transition={{type:'spring',stiffness:50}} className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"/>
          </div>
        </div>}

        {/* Tabs */}
        <div className="flex gap-1 bg-dark-100 dark:bg-dark-800 p-1.5 rounded-xl mb-6 w-fit shadow-inner">
          {(['theory','practice','quiz'] as const).map(tab=>(
            <button key={tab} onClick={()=>{setActiveTab(tab); if(tab==='practice'){setTimerOn(true);setQuizMode(false);}}}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab===tab?'bg-white dark:bg-dark-700 shadow-md text-primary-600 scale-[1.02]':'text-dark-500 hover:text-dark-700 hover:bg-white/50 dark:hover:bg-dark-700/50'}`}>
              {tab==='theory'?'📖 Theory':tab==='practice'?'✏️ Practice':'⏱️ Quick Quiz'}
            </button>
          ))}
        </div>

        {/* THEORY */}
        {activeTab==='theory' && <div className="space-y-4">
          {/* Flashcard */}
          <div className="cursor-pointer mb-6" style={{perspective:'1000px'}} onClick={()=>setFlipped(!flipped)}>
            <motion.div animate={{rotateY:flipped?180:0}} transition={{duration:0.6}} style={{transformStyle:'preserve-3d'}}
              className="relative w-full h-48 rounded-2xl shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl p-6 flex flex-col justify-center items-center text-white" style={{backfaceVisibility:'hidden'}}>
                <span className="text-sm opacity-70 mb-2">Tap to flip</span>
                <h3 className="text-xl font-bold">📝 Key Formula Card</h3>
                <p className="text-sm mt-2 opacity-80 text-center">{content.formulas[0]}</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-accent-500 to-accent-700 rounded-2xl p-6 flex flex-col justify-center items-center text-white" style={{backfaceVisibility:'hidden',transform:'rotateY(180deg)'}}>
                <h3 className="text-lg font-bold mb-2">All Formulas</h3>
                <div className="text-xs space-y-1 text-center max-h-28 overflow-y-auto">
                  {content.formulas.slice(0,5).map((f,i)=><p key={i} className="opacity-90">{f}</p>)}
                </div>
              </div>
            </motion.div>
          </div>
          {/* Accordion */}
          {[{k:'formulas',t:'📋 Key Formulas',d:content.formulas,tp:'f'},{k:'shortcuts',t:'⚡ Shortcuts',d:content.shortcuts,tp:'s'},{k:'examples',t:'✅ Solved Examples',d:content.examples,tp:'e'}].map(sec=>(
            <div key={sec.k} className="rounded-2xl border border-dark-100 dark:border-dark-700 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <button onClick={()=>setSections(p=>({...p,[sec.k]:!p[sec.k]}))}
                className="w-full flex items-center justify-between p-5 bg-white dark:bg-dark-800 hover:bg-dark-50 dark:hover:bg-dark-750 transition-colors">
                <h3 className="text-lg font-semibold">{sec.t}</h3>
                <motion.span animate={{rotate:sections[sec.k]?180:0}} className="text-xl">▼</motion.span>
              </button>
              <AnimatePresence>{sections[sec.k] && <motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} className="overflow-hidden">
                <div className="p-5 pt-2 space-y-3">
                  {sec.tp==='f' && (sec.d as string[]).map((f,i)=><div key={i} className="p-3 bg-gradient-to-r from-primary-50 to-primary-100/50 dark:from-primary-900/20 dark:to-primary-800/10 rounded-xl border border-primary-100 dark:border-primary-800"><code className="text-sm font-mono text-primary-800 dark:text-primary-200">{f}</code></div>)}
                  {sec.tp==='s' && (sec.d as string[]).map((s,i)=><div key={i} className="flex gap-3 p-3 bg-accent-50 dark:bg-accent-900/20 rounded-xl"><span className="text-accent-600 font-bold shrink-0">#{i+1}</span><p className="text-sm">{s}</p></div>)}
                  {sec.tp==='e' && (sec.d as any[]).map((ex,i)=><div key={i} className="p-4 border border-dark-100 dark:border-dark-700 rounded-xl hover:border-primary-300 transition-colors"><p className="font-medium mb-2">Q{i+1}: {ex.question}</p><div className="bg-dark-50 dark:bg-dark-800 p-3 rounded-lg text-sm"><p className="text-accent-700 dark:text-accent-300 font-medium">Solution:</p><p className="mt-1">{ex.solution}</p><p className="mt-2 text-primary-600 font-semibold">Answer: {ex.answer}</p></div></div>)}
                </div>
              </motion.div>}</AnimatePresence>
            </div>
          ))}
        </div>}

        {/* PRACTICE */}
        {activeTab==='practice' && questions.length>0 && <div>
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="flex gap-2">
              {(['all','easy','medium','hard'] as const).map(d=>(
                <button key={d} onClick={()=>{setDifficulty(d);setCur(0);setSelected(null);setScore({correct:0,attempted:0});setStreak(0);}}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${difficulty===d?'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/30 scale-105 animate-pulse':'bg-dark-100 dark:bg-dark-700 text-dark-600 dark:text-dark-300 hover:scale-105 hover:shadow-md'}`}>
                  {d==='easy'?'🟢':d==='medium'?'🟡':d==='hard'?'🔴':'🎯'} {d[0].toUpperCase()+d.slice(1)}
                </button>
              ))}
            </div>
            <div className="ml-auto flex items-center gap-4">
              {streak>0 && <motion.div initial={{scale:0}} animate={{scale:1}} className="flex items-center gap-1 px-3 py-1.5 bg-orange-100 dark:bg-orange-900/30 text-orange-600 rounded-full text-sm font-bold">🔥 {streak}</motion.div>}
              <CircularTimer time={timer} max={120}/>
            </div>
          </div>

          <AnimatePresence mode="wait">
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
                      onClick={()=>answer(opt)} disabled={ans}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 ${!ans?'border-dark-200 dark:border-dark-600 hover:border-primary-400 hover:bg-primary-50/50 dark:hover:bg-primary-900/10 hover:shadow-md':isCor?'border-green-500 bg-green-50 dark:bg-green-900/20 shadow-md':isSel?'border-red-500 bg-red-50 dark:bg-red-900/20':'border-dark-100 dark:border-dark-700 opacity-60'}`}>
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-dark-100 dark:bg-dark-700 text-sm font-bold mr-3">{String.fromCharCode(65+i)}</span>
                      {opt}{ans&&isCor&&<span className="float-right text-green-500">✓</span>}{ans&&isSel&&!isCor&&<span className="float-right text-red-500">✗</span>}
                    </motion.button>
                  );
                })}
              </div>

              {selected && <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} className="mt-6 space-y-4">
                <div className="flex flex-wrap gap-3">
                  <button onClick={()=>setShowSol(!showSol)} className="px-4 py-2 text-sm font-medium text-primary-600 bg-primary-50 dark:bg-primary-900/20 rounded-xl hover:bg-primary-100 transition-colors">{showSol?'🙈 Hide':'👁️ Solution'}</button>
                  <button onClick={()=>setAiExp(!aiExp)} className="px-4 py-2 text-sm font-medium text-accent-600 bg-accent-50 dark:bg-accent-900/20 rounded-xl hover:bg-accent-100 transition-colors">🤖 Explain with AI</button>
                  <button onClick={next} className="ml-auto px-6 py-2.5 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all">{cur>=questions.length-1?'Results 🏆':'Next →'}</button>
                </div>
                <AnimatePresence>
                  {showSol && <motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} className="p-4 bg-dark-50 dark:bg-dark-900 rounded-xl border border-dark-100 dark:border-dark-700 overflow-hidden">
                    <p className="text-sm leading-relaxed">{questions[cur]?.explanation}</p>
                    {questions[cur]?.shortcut && <p className="mt-2 text-sm text-primary-600 font-medium">⚡ <strong>Shortcut:</strong> {questions[cur].shortcut}</p>}
                  </motion.div>}
                </AnimatePresence>
                <AnimatePresence>
                  {aiExp && <motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}}
                    className="p-5 bg-gradient-to-br from-accent-50 to-primary-50 dark:from-accent-900/20 dark:to-primary-900/20 rounded-xl border border-accent-200 dark:border-accent-800 overflow-hidden">
                    <div className="flex items-center gap-2 mb-3"><span className="text-lg">🤖</span><h4 className="font-semibold text-accent-700 dark:text-accent-300">AI Step-by-Step</h4></div>
                    <div className="space-y-2 text-sm">
                      <p><strong>Step 1:</strong> Identify — {questions[cur]?.question.slice(0,60)}...</p>
                      <p><strong>Step 2:</strong> Apply the relevant formula or concept.</p>
                      <p><strong>Step 3:</strong> {questions[cur]?.explanation}</p>
                      {questions[cur]?.shortcut && <p><strong>💡 Pro Tip:</strong> {questions[cur].shortcut}</p>}
                      <p><strong>Answer:</strong> <span className="text-primary-600 font-bold">{questions[cur]?.correctAnswer}</span></p>
                    </div>
                  </motion.div>}
                </AnimatePresence>
              </motion.div>}
            </motion.div>
          </AnimatePresence>
        </div>}

        {/* QUIZ */}
        {activeTab==='quiz' && !quizMode && <motion.div initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}}
          className="bg-gradient-to-br from-primary-500 via-accent-500 to-primary-600 rounded-3xl p-10 text-white text-center shadow-2xl">
          <motion.span animate={{y:[0,-8,0]}} transition={{repeat:Infinity,duration:2}} className="text-5xl block">⏱️</motion.span>
          <h3 className="text-2xl font-bold mt-4 mb-2">Quick Quiz Mode</h3>
          <p className="text-white/80 mb-8">Answer {Math.min(questions.length,10)} questions in 5 minutes!</p>
          <button onClick={()=>{setQuizMode(true);setQuizTime(300);reset();setTimerOn(true);}}
            className="px-8 py-4 bg-white text-primary-600 font-bold rounded-xl text-lg hover:scale-105 hover:shadow-xl transition-all">🚀 Start Quiz</button>
        </motion.div>}

        {activeTab==='quiz' && quizMode && questions.length>0 && <div>
          <div className="flex items-center gap-4 mb-6 p-4 bg-white dark:bg-dark-800 rounded-xl shadow-md">
            <div className="flex-1 h-3 bg-dark-100 dark:bg-dark-700 rounded-full overflow-hidden">
              <motion.div animate={{width:`${(quizTime/300)*100}%`}} className={`h-full rounded-full ${quizTime>60?'bg-green-500':quizTime>30?'bg-yellow-500':'bg-red-500 animate-pulse'}`}/>
            </div>
            <span className={`font-mono font-bold text-lg ${quizTime<=30?'text-red-500 animate-pulse':''}`}>{Math.floor(quizTime/60)}:{(quizTime%60).toString().padStart(2,'0')}</span>
          </div>
          <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-lg border border-dark-100 dark:border-dark-700">
            <div className="flex justify-between mb-4"><span className="text-sm text-dark-500">Q{cur+1}/{Math.min(questions.length,10)}</span><span className="text-sm font-bold text-primary-600">Score: {score.correct}</span></div>
            <p className="text-lg font-medium mb-6">{questions[cur]?.question}</p>
            <div className="space-y-3">
              {questions[cur]?.options.map((opt,i)=>{
                const ans=!!selected, isCor=opt===questions[cur]?.correctAnswer, isSel=selected===opt;
                return <motion.button key={i} whileHover={!ans?{scale:1.01}:{}} whileTap={!ans?{scale:0.98}:{}}
                  onClick={()=>{answer(opt);setTimeout(next,800);}} disabled={ans}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${!ans?'border-dark-200 dark:border-dark-600 hover:border-primary-400':isCor?'border-green-500 bg-green-50 dark:bg-green-900/20':isSel?'border-red-500 bg-red-50 dark:bg-red-900/20':'opacity-60 border-dark-100 dark:border-dark-700'}`}>
                  <span className="font-bold mr-3">{String.fromCharCode(65+i)}.</span>{opt}
                </motion.button>;
              })}
            </div>
          </div>
        </div>}
      </motion.div>
    </div>
  );
}
