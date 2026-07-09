import React from "react";
import type { Mode, SharpnessLevel } from "../types/types";
import { SharpnessBorder } from "./SharpnessBorder";

interface ScannerViewProps {
  mode: Mode;
  stream: MediaStream | null;
  sharpness: SharpnessLevel;
  isFlashing: boolean;
  videoRef?: React.RefObject<HTMLVideoElement | null>;
  permissionError: DOMException | null;
}

export const ScannerView: React.FC<ScannerViewProps> = ({
  mode,
  sharpness,
  isFlashing,
  videoRef,
  permissionError,
}) => {
  return (
    <div className="relative w-full aspect-3/4 max-w-md mx-auto bg-zinc-200 rounded-3xl overflow-hidden border border-zinc-300/60 shadow-sm flex flex-col justify-between p-4 group select-none">
      <div className="absolute inset-0 bg-zinc-100 flex items-center justify-center">
        {permissionError?.name === "blocked" ? (
          <div className="absolute inset-0 bg-zinc-50 flex flex-col items-center justify-center p-6 z-20">
            <div className="bg-red-50/70 border border-red-200/80 p-5 rounded-2xl shadow-sm max-w-[92%] flex flex-col gap-4 text-left">
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-red-100/60 rounded-xl text-red-650 shrink-0 shadow-inner">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5">
                    <path
                      fillRule="evenodd"
                      d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-red-800 uppercase tracking-wider">
                    Camera Access Blocked
                  </h4>
                  <p className="text-[10px] text-zinc-500 mt-1 leading-relaxed">
                    You've denied camera access for this site. Open your
                    browser's settings and allow camera access for this site to
                    continue.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : permissionError?.name === "granted" ? (
          <video
            ref={videoRef}
            style={{
              transform: "scaleX(-1)",
            }}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-zinc-100 flex items-center justify-center p-4 z-20">
            <div className="bg-red-50 border border-red-200 px-4 py-3.5 rounded-2xl flex items-center justify-between gap-3 shadow-sm max-w-[90%]">
              <span className="text-[11px] font-semibold text-red-800 leading-snug">
                camera access is required to use this app
              </span>
            </div>
          </div>
        )}
      </div>

      <SharpnessBorder level={sharpness} />

      {isFlashing && (
        <div className="absolute inset-0 bg-white z-50 animate-flash pointer-events-none" />
      )}

      <div className="mt-auto w-full z-10 text-center pb-2">
        <span className="text-[9px] font-mono tracking-widest text-zinc-400 font-bold bg-white/90 border border-zinc-200 px-3 py-1.5 rounded-full shadow-sm">
          {mode === "continuous" ? "AUTO-CAPTURE ACTIVE" : "MANUAL SHUTTER"}
        </span>
      </div>
    </div>
  );
};
