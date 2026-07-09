import React, { useState } from "react";
import type { Page } from "../types/types";
import { PageThumbnail } from "./PageThumbnail";

interface PageStackProps {
  pages: Page[];
  onDeletePage: (id: string) => void;
  onRetakePage: (id: string) => void;
  onOpenPage?: (index: number) => void;
  onDeleteAll?: () => void;
}

export const PageStack: React.FC<PageStackProps> = ({
  pages,
  onDeletePage,
  onRetakePage,
  onOpenPage,
  onDeleteAll,
}) => {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="bg-white border border-zinc-200 rounded-2xl p-5 min-h-[190px] flex flex-col justify-center shadow-sm">
      {pages.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-6 text-zinc-400 space-y-2.5 select-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10 text-zinc-300">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
            />
          </svg>
          <span className="text-sm font-bold tracking-wide text-zinc-500">
            No pages captured yet
          </span>
          <span className="text-xs text-zinc-400 text-center max-w-[260px] leading-relaxed">
            Align your frame and trigger capture in Manual mode, or stabilize
            for Auto-capture in Continuous mode.
          </span>
        </div>
      ) : (
        <div className="flex flex-col space-y-3">
          <div className="flex items-center justify-between text-zinc-450 text-xs font-bold uppercase tracking-wider px-1">
            <div className="flex items-center gap-2">
              <span className="text-zinc-500">Captured Queue</span>
              <span className="bg-zinc-100 border border-zinc-200 text-zinc-650 px-2.5 py-0.5 rounded-full font-mono text-[10px]">
                {pages.length} {pages.length === 1 ? "Page" : "Pages"}
              </span>
            </div>

            {/* Delete All Button with inline confirmation */}
            {onDeleteAll && (
              <div className="relative">
                {showConfirm ? (
                  <div className="flex items-center gap-1.5 bg-red-50 border border-red-200 px-2.5 py-1 rounded-lg animate-fade-in normal-case font-medium">
                    <span className="text-[10px] text-red-800 font-semibold">
                      Delete all?
                    </span>
                    <button
                      onClick={() => {
                        onDeleteAll();
                        setShowConfirm(false);
                      }}
                      className="px-2 py-0.5 bg-red-600 hover:bg-red-700 text-white rounded text-[9px] font-bold cursor-pointer transition-colors">
                      Yes
                    </button>
                    <button
                      onClick={() => setShowConfirm(false)}
                      className="px-2 py-0.5 bg-zinc-200 hover:bg-zinc-300 text-zinc-700 rounded text-[9px] font-bold cursor-pointer transition-colors">
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowConfirm(true)}
                    className="text-[9px] font-bold uppercase tracking-wider text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer transition-colors bg-red-50 hover:bg-red-100/70 border border-red-200 px-2 py-1 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.2}
                      stroke="currentColor"
                      className="w-3 h-3">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                    Delete All
                  </button>
                )}
              </div>
            )}
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 pt-1 custom-scrollbar snap-x snap-mandatory scroll-smooth">
            {pages.map((page, index) => (
              <div key={page.id} className="snap-start">
                <PageThumbnail
                  page={page}
                  index={index}
                  onDelete={onDeletePage}
                  onRetake={onRetakePage}
                  onOpen={onOpenPage}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
