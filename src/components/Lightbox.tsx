import React, { useEffect } from "react";
import type { Page } from "../types/types";

interface LightboxProps {
  pages: Page[];
  activeIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  pages,
  activeIndex,
  onClose,
  onNavigate,
}) => {
  // Disable body scroll when lightbox is open
  useEffect(() => {
    if (activeIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeIndex]);

  // Handle keyboard events
  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight" && activeIndex < pages.length - 1) {
        onNavigate(activeIndex + 1);
      } else if (e.key === "ArrowLeft" && activeIndex > 0) {
        onNavigate(activeIndex - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, pages.length, onNavigate, onClose]);

  if (activeIndex === null || pages.length === 0) return null;

  const currentPage = pages[activeIndex];

  return (
    <div className="fixed inset-0 bg-zinc-950/95 backdrop-blur-sm z-50 flex flex-col justify-between p-4 md:p-6 select-none animate-fade-in">
      <div className="flex items-center justify-between text-white w-full max-w-5xl mx-auto z-10">
        <div className="flex flex-col text-left">
          <span className="text-sm font-bold tracking-wide">
            {currentPage.name}
          </span>
          <span className="text-xs text-zinc-400">
            Captured at {currentPage.timestamp}
          </span>
        </div>

        <button
          onClick={onClose}
          className="p-2 hover:bg-zinc-800 rounded-full transition-colors duration-200 cursor-pointer text-zinc-400 hover:text-white"
          aria-label="Close Lightbox">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-6 h-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center relative w-full max-w-5xl mx-auto my-4 gap-4">
        <button
          onClick={() => activeIndex > 0 && onNavigate(activeIndex - 1)}
          disabled={activeIndex === 0}
          className={`absolute left-0 p-3 rounded-full bg-zinc-900/60 border border-zinc-800 text-white transition-all z-10 cursor-pointer hover:bg-zinc-800 ${
            activeIndex === 0
              ? "opacity-20 cursor-not-allowed"
              : "opacity-100 active:scale-95"
          }`}
          aria-label="Previous Page">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-5 h-5">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>

        {/* Scaled Scanned Page Sheet Mockup */}
        <div className="w-full max-w-[320px] sm:max-w-[420px] aspect-[1/1.414] bg-white rounded-xl shadow-2xl p-6 border border-zinc-200/50 flex flex-col justify-between animate-scale-up">
          {/* Header */}
          <div className="space-y-2">
            <div className="h-3 bg-zinc-200 rounded-full w-3/4" />
            <div className="h-2 bg-zinc-150 rounded-full w-full" />
            <div className="h-2 bg-zinc-150 rounded-full w-5/6" />
          </div>

          <div
            className={`w-full flex-1 my-6 rounded-lg border border-black/5 shadow-inner transition-all duration-300 flex items-center justify-center ${currentPage.imageUrl}`}>
            <img
              className="object-cover h-full w-full"
              src={pages[activeIndex].imageUrl}
              alt={pages[activeIndex].name}
            />
          </div>

          <div className="flex justify-between items-center border-t border-zinc-100 pt-3">
            <span className="text-[10px] text-zinc-400 font-mono tracking-wider">
              {currentPage.timestamp}
            </span>
            <span className="text-xs bg-zinc-100 text-zinc-800 font-bold font-mono px-2 py-0.5 rounded border border-zinc-200">
              P{activeIndex + 1}
            </span>
          </div>
        </div>

        <button
          onClick={() =>
            activeIndex < pages.length - 1 && onNavigate(activeIndex + 1)
          }
          disabled={activeIndex === pages.length - 1}
          className={`absolute right-0 p-3 rounded-full bg-zinc-900/60 border border-zinc-800 text-white transition-all z-10 cursor-pointer hover:bg-zinc-800 ${
            activeIndex === pages.length - 1
              ? "opacity-20 cursor-not-allowed"
              : "opacity-100 active:scale-95"
          }`}
          aria-label="Next Page">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-5 h-5">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>

      {/* Bottom Counter & Nav Slider */}
      <div className="w-full text-center py-2 text-zinc-400 font-mono text-xs flex flex-col items-center gap-2">
        <span>
          Page {activeIndex + 1} of {pages.length}
        </span>
        <div className="flex gap-1.5 mt-1">
          {pages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => onNavigate(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === activeIndex
                  ? "bg-purple-500 w-5"
                  : "bg-zinc-700 w-2 hover:bg-zinc-650"
              }`}
              aria-label={`Go to page ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
