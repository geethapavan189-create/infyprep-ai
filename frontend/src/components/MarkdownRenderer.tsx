'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h2: ({ children }) => (
          <h2 className="text-2xl font-bold mt-8 mb-4 text-dark-900 dark:text-dark-100 border-b border-dark-200 dark:border-dark-700 pb-2">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-lg font-semibold mt-6 mb-3 text-dark-800 dark:text-dark-200">
            {children}
          </h3>
        ),
        h4: ({ children }) => (
          <h4 className="text-base font-semibold mt-4 mb-2 text-dark-700 dark:text-dark-300">
            {children}
          </h4>
        ),
        p: ({ children }) => (
          <p className="text-dark-700 dark:text-dark-300 leading-relaxed mb-4">
            {children}
          </p>
        ),
        ul: ({ children }) => (
          <ul className="list-disc list-inside space-y-2 mb-4 text-dark-700 dark:text-dark-300 ml-4">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal list-inside space-y-2 mb-4 text-dark-700 dark:text-dark-300 ml-4">
            {children}
          </ol>
        ),
        li: ({ children }) => (
          <li className="leading-relaxed">{children}</li>
        ),
        strong: ({ children }) => (
          <strong className="font-semibold text-dark-900 dark:text-dark-100">{children}</strong>
        ),
        code: ({ className, children }) => {
          const isBlock = className?.includes('language-');
          if (isBlock) {
            return (
              <div className="my-4 rounded-xl overflow-hidden shadow-lg border border-dark-700">
                <div className="flex items-center justify-between px-4 py-2 bg-dark-800 border-b border-dark-700">
                  <span className="text-xs text-dark-400 font-mono">
                    {className?.replace('language-', '') || 'code'}
                  </span>
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                </div>
                <pre className="bg-dark-900 p-4 overflow-x-auto">
                  <code className="text-sm font-mono text-green-400 leading-relaxed">
                    {children}
                  </code>
                </pre>
              </div>
            );
          }
          return (
            <code className="px-1.5 py-0.5 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded text-sm font-mono border border-primary-100 dark:border-primary-800">
              {children}
            </code>
          );
        },
        pre: ({ children }) => <>{children}</>,
        table: ({ children }) => (
          <div className="my-4 overflow-x-auto rounded-xl border border-dark-200 dark:border-dark-700 shadow-sm">
            <table className="w-full text-sm">{children}</table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className="bg-primary-50 dark:bg-primary-900/20 border-b border-dark-200 dark:border-dark-700">
            {children}
          </thead>
        ),
        th: ({ children }) => (
          <th className="px-4 py-3 text-left font-semibold text-dark-800 dark:text-dark-200">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="px-4 py-3 border-t border-dark-100 dark:border-dark-700 text-dark-700 dark:text-dark-300">
            {children}
          </td>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-primary-500 pl-4 py-2 my-4 bg-primary-50/50 dark:bg-primary-900/10 rounded-r-lg italic text-dark-600 dark:text-dark-400">
            {children}
          </blockquote>
        ),
        hr: () => (
          <hr className="my-6 border-dark-200 dark:border-dark-700" />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
