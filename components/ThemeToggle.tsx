"use client";
import React from "react";
import { BsSun, BsMoon } from "react-icons/bs";
import { useTheme } from "./ThemeProvider";
import { cn } from "@/utils/helper";

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "relative w-12 h-6 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1",
        isDark
          ? "bg-primary-600"
          : "bg-slate-200",
        className
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 left-0.5 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm",
          isDark
            ? "translate-x-6 bg-dark-bg text-amber-300"
            : "translate-x-0 bg-white text-amber-500"
        )}
      >
        {isDark ? <BsMoon size={11} /> : <BsSun size={11} />}
      </span>
    </button>
  );
};

export default ThemeToggle;
