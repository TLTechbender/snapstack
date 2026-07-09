import React from "react";
import type { Page } from "../types/types";

interface PageThumbnailProps {
  page: Page;
  index: number;
  onDelete: (id: string) => void;
  onRetake: (id: string) => void;
  onOpen?: (index: number) => void;
}

export const PageThumbnail: React.FC<PageThumbnailProps> = ({
  page,
  index,
  onDelete,
  onRetake,
  onOpen,
}) => {
  return (
    <div className="relative flex-shrink-0 group w-28 h-36 bg-zinc-50 border border-zinc-200 rounded-lg p-1.5 shadow-sm hover:shadow hover:border-zinc-300 transition-all duration-300 flex flex-col justify-between">
      {/* Document Sheet representation */}
      <div
        onClick={() => onOpen?.(index)}
        className="relative flex-1 rounded bg-white overflow-hidden border border-zinc-100 shadow-inner flex flex-col p-1.5 justify-between select-none cursor-pointer hover:bg-zinc-50/50 transition-colors">
        {/* Mock Scanned Document Header Lines */}
        <div className="space-y-1">
          <div className="h-1 bg-zinc-200 rounded-full w-4/5" />
          <div className="h-1 bg-zinc-150 rounded-full w-full" />
          <div className="h-1 bg-zinc-150 rounded-full w-2/3" />
        </div>

        {/* Mock Scanned Image/Gradients */}
        <div
          className={`w-full relative h-12 md:h-16 rounded border border-black/5 shadow-inner transition-all duration-500 flex items-center justify-center text-[10px] font-mono font-black text-white/95 ${page.imageUrl}`}>
          {page.imageUrl.startsWith("bg-") ? (
            "DOC"
          ) : (
            <img
              src={page.imageUrl}
              className="w-full h-full object-cover"
              alt={page.name}
            />
          )}
        </div>

        {/* Bottom sheet detail */}
        <div className="flex justify-between items-center mt-1">
          <span className="text-[7.5px] text-zinc-400 font-mono">
            {page.timestamp}
          </span>
          <span className="text-[8.5px] bg-zinc-100 text-zinc-700 font-mono px-1 rounded-sm border border-zinc-200">
            P{index + 1}
          </span>
        </div>
      </div>

      {/* Control overlay visible on hover */}
      <div className="absolute inset-0 bg-white/95 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center gap-1.5 p-1.5 shadow-inner">
        {/* View / Open Lightbox */}
        <button
          onClick={() => onOpen?.(index)}
          className="p-1.5 bg-zinc-100 border border-zinc-200 hover:bg-zinc-200 text-zinc-700 rounded-md transition-colors cursor-pointer"
          title="Open Lightbox">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-3.5 h-3.5 text-blue-650">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>

        {/* Retake */}
        <button
          onClick={() => onRetake(page.id)}
          className="p-1.5 bg-zinc-100 border border-zinc-200 hover:bg-zinc-200 text-zinc-700 rounded-md transition-colors cursor-pointer"
          title="Swap/Retake Image">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-3.5 h-3.5 text-purple-600">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        </button>

        {/* Delete */}
        <button
          onClick={() => onDelete(page.id)}
          className="p-1.5 bg-red-50 border border-red-200 hover:bg-red-100 text-red-655 rounded-md transition-colors cursor-pointer"
          title="Delete Page">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-3.5 h-3.5 text-red-600">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
