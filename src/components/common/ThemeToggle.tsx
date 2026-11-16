"use client";

import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export function ThemeToggle({ className = "", showLabel = false }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`p-1.5 rounded-lg border transition-colors flex items-center gap-1.5 select-none ${
        theme === "dark"
          ? "bg-[#181a20] border-[#2b2f3a] text-amber-400 hover:bg-[#20242e] hover:text-amber-300"
          : "bg-white border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900"
      } ${className}`}
      title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
      aria-label="Toggle theme mode"
    >
      {theme === "light" ? (
        <Moon className="w-4 h-4 text-slate-700" />
      ) : (
        <Sun className="w-4 h-4 text-amber-400" />
      )}
      {showLabel && (
        <span className="text-xs font-medium">
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </span>
      )}
    </button>
  );
}
