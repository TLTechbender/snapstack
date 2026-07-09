import React from "react";
import type { SharpnessLevel } from "../types/types";

interface SharpnessBorderProps {
  level: SharpnessLevel;
}

export const SharpnessBorder: React.FC<SharpnessBorderProps> = ({ level }) => {
  const borderColors = {
    red: "border-red-500/80 shadow-[inset_0_0_15px_rgba(239,68,68,0.08)]",
    yellow: "border-amber-500/80 shadow-[inset_0_0_15px_rgba(245,158,11,0.08)]",
    green: "border-emerald-500 shadow-[inset_0_0_20px_rgba(16,185,129,0.12)]",
  };

  const textColors = {
    red: "text-red-700 bg-white border-red-200/80",
    yellow: "text-amber-700 bg-white border-amber-200/80",
    green: "text-emerald-700 bg-white border-emerald-200/80",
  };

  const statusLabel = {
    red: "BLURRY - HOLD STILL",
    yellow: "STABILIZING...",
    green: "READY TO CAPTURE",
  };

  return (
    <div className="absolute inset-0 pointer-events-none transition-all duration-300 z-10">
      {/* Outer Border with soft colored border */}
      <div
        className={`absolute inset-4 border-2 rounded-2xl transition-all duration-300 ${borderColors[level]}`}>
        {/* Corner brackets */}
        <div
          className={`absolute top-0 left-0 w-3 h-3 border-t-3 border-l-3 rounded-tl-md transition-colors duration-300 ${
            level === "red"
              ? "border-red-500"
              : level === "yellow"
                ? "border-amber-500"
                : "border-emerald-500"
          }`}
        />
        <div
          className={`absolute top-0 right-0 w-5 h-5 border-t-3 border-r-3 rounded-tr-md transition-colors duration-300 ${
            level === "red"
              ? "border-red-500"
              : level === "yellow"
                ? "border-amber-500"
                : "border-emerald-500"
          }`}
        />
        <div
          className={`absolute bottom-0 left-0 w-5 h-5 border-b-3 border-l-3 rounded-bl-md transition-colors duration-300 ${
            level === "red"
              ? "border-red-500"
              : level === "yellow"
                ? "border-amber-500"
                : "border-emerald-500"
          }`}
        />
        <div
          className={`absolute bottom-0 right-0 w-5 h-5 border-b-3 border-r-3 rounded-br-md transition-colors duration-300 ${
            level === "red"
              ? "border-red-500"
              : level === "yellow"
                ? "border-amber-500"
                : "border-emerald-500"
          }`}
        />

        <div className="absolute top-4 left-1/2 -translate-x-1/2">
          <span
            className={`px-3 py-1.5 text-[9px] font-mono tracking-wider font-bold border rounded-full backdrop-blur-md transition-all duration-300 shadow-sm flex items-center gap-1.5 ${textColors[level]}`}>
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                level === "red"
                  ? "bg-red-500 animate-pulse"
                  : level === "yellow"
                    ? "bg-amber-500 animate-pulse"
                    : "bg-emerald-500 animate-pulse"
              }`}
            />
            <span className="font-bold text-zinc-700">
              {statusLabel[level]}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};
