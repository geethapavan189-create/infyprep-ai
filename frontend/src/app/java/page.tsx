'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const chapters = [
  { id: 'basics', title: 'Java Basics', desc: 'JDK, JRE, JVM, Hello World, compilation', icon: '☕', level: 'beginner' },
  { id: 'data-types', title: 'Data Types & Variables', desc: 'Primitive types, wrapper classes, type casting', icon: '📦', level: 'beginner' },
  { id: 'control-flow', title: 'Control Flow', desc: 'if-else, switch, loops, break, continue', icon: '🔀', level: 'beginner' },
  { id: 'arrays', title: 'Arrays & Strings', desc: 'Array operations, String class, StringBuilder', icon: '📋', level: 'beginner' },
  { id: 'oop', title: 'OOP in Java', desc: 'Classes, objects, constructors, this keyword', icon: '🏗️', level: 'intermediate' },
  { id: 'inheritance', title: 'Inheritance', desc: 'extends, super, method overriding, abstract', icon: '🌳', level: 'intermediate' },
  { id: 'polymorphism', title: 'Polymorphism', desc: 'Overloading, overriding, dynamic dispatch', icon: '🎭', level: 'intermediate' },
  { id: 'interfaces', title: 'Interfaces & Abstract', desc: 'Interface, abstract class, default methods', icon: '📐', level: 'intermediate' },
  { id: 'exceptions', title: 'Exception Handling', desc: 'try-catch, throws, custom exceptions', icon: '⚠️', level: 'intermediate' },
  { id: 'collections', title: 'Collections Framework', desc: 'List, Set, Map, Queue, Iterator', icon: '📚', level: 'advanced' },
  { id: 'multithreading', title: 'Multithreading', desc: 'Thread, Runnable, synchronization', icon: '🧵', level: 'advanced' },
  { id: 'java-dsa', title: 'DSA in Java', desc: 'Implement DS using Java collections', icon: '🌲', level: 'advanced' },
];

export default function JavaPage() {
  const levels = ['beginner', 'intermediate', 'advanced'];
  const levelLabels: Record<string, string> = { beginner: '🌱 Beginner', intermediate: '⚡ Intermediate', advanced: '🚀 Advanced' };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">☕ Java Learning Path</h1>
          <p className="text-dark-500 dark:text-dark-400">Complete Java course for Infosys placements — from basics to collections and DSA</p>
        </div>

        {levels.map(level => (
          <div key={level} className="mb-8">
            <h2 className="text-xl font-bold mb-4">{levelLabels[level]}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {chapters.filter(ch => ch.level === level).map((ch, i) => (
                <motion.div key={ch.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                  <Link href={`/java/${ch.id}`} className="card block group hover:scale-[1.02] transition-transform">
                    <span className="text-2xl">{ch.icon}</span>
                    <h3 className="font-semibold mt-2 group-hover:text-primary-600">{ch.title}</h3>
                    <p className="text-xs text-dark-500 mt-1">{ch.desc}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
