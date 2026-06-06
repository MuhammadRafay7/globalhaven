import React from "react";
import Link from "next/link";
import { TbMoodEmpty } from "react-icons/tb";
import Heading from "./Heading";

interface EmptyProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const EmptyState: React.FC<EmptyProps> = ({
  title = "No exact matches",
  subtitle = "Try changing or removing some of your filters.",
  showReset,
}) => {
  return (
    <div className="h-[60vh] flex flex-col gap-3 justify-center items-center px-4">
      <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-dark-card flex items-center justify-center mb-2">
        <TbMoodEmpty size={32} className="text-slate-400 dark:text-slate-500" />
      </div>
      <Heading center title={title} subtitle={subtitle} />
      {showReset && (
        <div className="mt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-300 dark:border-dark-border text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-dark-card font-semibold transition-colors duration-200 text-sm"
          >
            Remove all filters
          </Link>
        </div>
      )}
    </div>
  );
};

export default EmptyState;
