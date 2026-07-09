import React from 'react';

interface PageCounterProps {
  count: number;
}

export const PageCounter: React.FC<PageCounterProps> = ({ count }) => {
  return (
    <div className="flex items-center gap-2 bg-white border border-zinc-200 px-4 py-2 rounded-full shadow-sm">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2} className="text-purple-600 w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <span className="text-zinc-500 text-xs font-mono uppercase tracking-wider font-bold">Pages</span>
      <span className="text-zinc-800 font-mono font-bold text-xs bg-zinc-100 px-2 py-0.5 rounded border border-zinc-200 min-w-[24px] text-center transition-all duration-300">
        {count}
      </span>
    </div>
  );
};
