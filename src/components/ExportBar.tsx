import React, { useState } from "react";
import jsPDF from "jspdf";
import type { Page } from "../types/types";
interface ExportBarProps {
  pageCount: number;
  pages: Page[];
}

export const ExportBar: React.FC<ExportBarProps> = ({ pageCount, pages }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [success, setSuccess] = useState(false);

  if (pageCount === 0) return null;

  const handleGeneratePdf = async () => {
    setIsGenerating(true);
    setSuccess(false);
    const pdf = new jsPDF({ unit: "px", format: "a4" });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    for (let i = 0; i < pages.length; i++) {
      const imageUrl = pages[i].imageUrl;

      // Step 1: load the blob URL into an actual <img>, so we have real pixel data
      const img = await loadImage(imageUrl);

      // Step 2: figure out size so the image fits the page without distortion
      const ratio = Math.min(pageWidth / img.width, pageHeight / img.height);
      const width = img.width * ratio;
      const height = img.height * ratio;

      if (i > 0) pdf.addPage();
      pdf.addImage(img, "JPEG", 0, 0, width, height);
    }

    pdf.save("scanned-document.pdf");

    setIsGenerating(false);
    setSuccess(true);
  };

  
  function loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = url;
    });
  }
  return (
    <div className="bg-white border border-zinc-200 p-5 rounded-2xl shadow-sm flex flex-col items-center justify-between gap-4 sm:flex-row backdrop-blur-md transition-all duration-300">
      <div className="flex flex-col text-left">
        <span className="text-sm font-bold text-zinc-900 tracking-wide">
          Export Stack
        </span>
        <span className="text-xs text-zinc-500">
          Compile {pageCount} {pageCount === 1 ? "page" : "pages"} into a single
          PDF document
        </span>
      </div>

      <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-3 justify-end">
        {success && (
          <div className="flex items-center gap-2 text-emerald-700 text-xs font-mono font-bold bg-emerald-50 border border-emerald-200/60 px-3.5 py-2.5 rounded-full animate-bounce">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-4 h-4 text-emerald-600">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            PDF Ready!
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                alert(
                  "Mock Download: snapstack_export.pdf successfully triggered!",
                );
              }}
              className="underline hover:text-emerald-800 transition-colors ml-1 cursor-pointer">
              Download
            </a>
          </div>
        )}

        <button
          onClick={handleGeneratePdf}
          disabled={isGenerating}
          className={`w-full sm:w-auto px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
            isGenerating
              ? "bg-zinc-100 text-zinc-400 border border-zinc-200 cursor-not-allowed"
              : "bg-zinc-900 text-white hover:bg-zinc-800 active:scale-95 shadow-sm shadow-zinc-900/10"
          }`}>
          {isGenerating ? (
            <>
              <svg
                className="animate-spin h-3.5 w-3.5 text-zinc-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating PDF...
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.2}
                stroke="currentColor"
                className="w-3.5 h-3.5">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                />
              </svg>
              Generate PDF
            </>
          )}
        </button>
      </div>
    </div>
  );
};
