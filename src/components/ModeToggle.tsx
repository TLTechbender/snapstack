import React from "react";
import type { Mode } from "../types/types";

interface ModeToggleProps {
  mode: Mode;
  onChange: (mode: Mode) => void;
}

export const ModeToggle: React.FC<ModeToggleProps> = ({ mode, onChange }) => {
  return (
    <div className="flex bg-zinc-200/50 border border-zinc-300/40 p-1 rounded-full shadow-inner w-full max-w-[280px] mx-auto select-none">
      <button
        onClick={() => onChange("manual")}
        className={`flex-1 py-2 px-4 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 z-10 flex items-center justify-center gap-1.5 cursor-pointer ${
          mode === "manual"
            ? "bg-white text-zinc-900 shadow-sm border border-zinc-200"
            : "text-zinc-500 hover:text-zinc-700 border border-transparent"
        }`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
          className="w-3.5 h-3.5">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
        Manual
      </button>
      <button
        onClick={() => onChange("continuous")}
        className={`flex-1 py-2 px-4 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 z-10 flex items-center justify-center gap-1.5 cursor-pointer ${
          mode === "continuous"
            ? "bg-purple-600 text-white shadow-sm border border-purple-500/30"
            : "text-zinc-500 hover:text-zinc-700 border border-transparent"
        }`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
          className="w-3.5 h-3.5">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89M9 11l3 3L22 4"
          />
        </svg>
        Continuous
      </button>
    </div>
  );
};
