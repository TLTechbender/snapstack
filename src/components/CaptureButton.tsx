import React from "react";

interface CaptureButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export const CaptureButton: React.FC<CaptureButtonProps> = ({
  onClick,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative group flex items-center justify-center rounded-full transition-all duration-300 w-20 h-20 outline-none cursor-pointer ${
        disabled
          ? "bg-zinc-200 border-4 border-zinc-300 opacity-40 cursor-not-allowed scale-95"
          : "bg-zinc-50 border-4 border-zinc-300 active:scale-90 hover:scale-105 shadow-sm hover:shadow-md"
      }`}
      aria-label="Capture Page">
      {/* Inner solid circle */}
      <span
        className={`w-14 h-14 rounded-full transition-all duration-300 ${
          disabled ? "bg-zinc-400" : "bg-zinc-900 group-hover:bg-zinc-800"
        }`}
      />
    </button>
  );
};
