"use client";
import React, { useEffect } from "react";
import { MdErrorOutline } from "react-icons/md";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const Error: React.FC<ErrorProps> = ({ error, reset }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center gap-6">
      <div className="w-20 h-20 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
        <MdErrorOutline size={36} className="text-red-400 dark:text-red-500" />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          Something went wrong
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm max-w-md">
          An unexpected error occurred. Our team has been notified. Please try
          again or return to the homepage.
        </p>
      </div>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="px-5 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold text-sm transition-colors"
        >
          Try again
        </button>
        <Link
          href="/"
          className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-dark-border text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-dark-card font-semibold text-sm transition-colors"
        >
          Go home
        </Link>
      </div>
    </div>
  );
};

export default Error;
