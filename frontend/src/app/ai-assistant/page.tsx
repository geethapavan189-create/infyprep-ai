'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { aiAPI } from '@/lib/api';
import { useStore } from '@/store/useStore';
import Link from 'next/link';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const quickPrompts = [
  'Explain percentage shortcuts',
  'How to solve time and work using LCM?',
  'Tips for HackWithInfy Round 1',
  'Explain Kadane\'s algorithm',
  'Infosys interview preparation tips',
  'Explain OOP concepts simply',
];

export default function AIAssistantPage() {
  const { user } = useStore();
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hi! I\'m InfyPrep AI Assistant 🤖\n\nI can help you with:\n• Aptitude shortcuts & formulas\n• Reasoning problem solving\n• Coding explanations & hints\n• Interview preparation\n• Resume review & ATS scoring\n\nAsk me anything about your Infosys preparation!' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text?: string) => {
    const message = text || input;
    if (!message.trim()) return;

    const userMsg: Message = { role: 'user', content: message };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const context = messages.slice(-6).map(m => ({ role: m.role, content: m.content }));
      const res = await aiAPI.chat(message, context);
      setMessages(prev => [...prev, { role: 'assistant', content: res.data.reply }]);
    } catch {
      // Fallback local response
      const reply = getLocalResponse(message);
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    }
    setLoading(false);
  };

  const getLocalResponse = (msg: string): string => {
    const lower = msg.toLowerCase();
    if (lower.includes('percentage') || lower.includes('percent')) {
      return `**Percentage Shortcuts:**\n\n• X% of Y = Y% of X (e.g., 8% of 50 = 50% of 8 = 4)\n• Successive change: a + b + ab/100\n• If price ↑ by x%, to restore: decrease by x/(100+x) × 100%\n• Fraction shortcuts: 1/4=25%, 1/5=20%, 1/8=12.5%, 1/3=33.33%\n\n**Quick Calculation:**\n• 10% → divide by 10\n• 5% → half of 10%\n• 15% → 10% + 5%\n• 20% → divide by 5`;
    }
    if (lower.includes('time') && lower.includes('work')) {
      return `**Time & Work - LCM Method:**\n\n1. Take LCM of all given days as "Total Work"\n2. Per day work = Total Work / Individual days\n3. Combined work = Sum of per day works\n4. Time = Total Work / Combined rate\n\n**Example:** A=10 days, B=15 days\n• LCM(10,15) = 30 units (total work)\n• A = 30/10 = 3 units/day\n• B = 30/15 = 2 units/day\n• Together = 5 units/day\n• Time = 30/5 = **6 days**`;
    }
    if (lower.includes('kadane')) {
      return `**Kadane's Algorithm (Maximum Subarray Sum):**\n\n\`\`\`python\ndef maxSubArray(nums):\n    max_sum = current_sum = nums[0]\n    for num in nums[1:]:\n        current_sum = max(num, current_sum + num)\n        max_sum = max(max_sum, current_sum)\n    return max_sum\n\`\`\`\n\n**Logic:** At each element, decide whether to:\n- Start a new subarray (take current element)\n- Extend existing subarray (add to running sum)\n\n**Time:** O(n), **Space:** O(1)`;
    }
    if (lower.includes('interview') || lower.includes('tips')) {
      return `**Infosys Interview Tips:**\n\n1. **Technical Round:**\n   • Strong OOP concepts (Java/Python)\n   • Basic DSA (arrays, strings, sorting)\n   • DBMS fundamentals (SQL queries, normalization)\n   • OS basics (process, threads, deadlock)\n\n2. **HR Round:**\n   • "Tell me about yourself" - prepare 2-min pitch\n   • Why Infosys? Research their values\n   • Strengths/weaknesses with examples\n   • Be honest and confident\n\n3. **General Tips:**\n   • Dress formally\n   • Reach 30 min early\n   • Carry extra copies of resume\n   • Ask questions at the end`;
    }
    if (lower.includes('oop')) {
      return `**OOP Concepts Simply Explained:**\n\n1. **Encapsulation** 📦 - Wrapping data + methods together. Like a capsule containing medicine.\n\n2. **Inheritance** 🌳 - Child class gets properties of parent. Like children inheriting traits from parents.\n\n3. **Polymorphism** 🎭 - Same method, different behavior. Like "draw" means different things for circle vs square.\n\n4. **Abstraction** 🎨 - Hiding complexity, showing only essentials. Like driving a car without knowing engine internals.\n\n**Java Example:**\n\`\`\`java\nclass Animal { void sound() {} }\nclass Dog extends Animal { void sound() { System.out.println("Bark"); } }\nclass Cat extends Animal { void sound() { System.out.println("Meow"); } }\n\`\`\``;
    }
    return `I can help you with:\n• **Aptitude:** Formulas, shortcuts, problem solving\n• **Reasoning:** Patterns, tricks, step-by-step solutions\n• **Coding:** Algorithm explanations, code review, hints\n• **Interview:** Tips, common questions, preparation strategy\n\nTry asking something specific like "Explain profit and loss shortcuts" or "How to solve seating arrangement problems?"`;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 h-[calc(100vh-4rem)] flex flex-col">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">🤖 AI Assistant</h1>
        <p className="text-sm text-dark-500">Your personal Infosys preparation tutor</p>
      </div>

      {/* Quick Prompts */}
      <div className="flex flex-wrap gap-2 mb-4">
        {quickPrompts.map(prompt => (
          <button
            key={prompt}
            onClick={() => sendMessage(prompt)}
            className="text-xs px-3 py-1.5 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-full hover:bg-primary-100 transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] p-4 rounded-2xl text-sm whitespace-pre-wrap ${
              msg.role === 'user'
                ? 'bg-primary-600 text-white rounded-br-md'
                : 'bg-dark-100 dark:bg-dark-800 rounded-bl-md'
            }`}>
              {msg.content}
            </div>
          </motion.div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-dark-100 dark:bg-dark-800 p-4 rounded-2xl rounded-bl-md">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-dark-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-dark-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 bg-dark-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Ask anything about your preparation..."
          className="input-field flex-1"
          disabled={loading}
        />
        <button
          onClick={() => sendMessage()}
          disabled={loading || !input.trim()}
          className="btn-primary px-6 disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
}
