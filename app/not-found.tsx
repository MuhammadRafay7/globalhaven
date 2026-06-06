import React from "react";
import { MdTravelExplore } from "react-icons/md";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center gap-6">
      <div className="w-24 h-24 rounded-full bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center">
        <MdTravelExplore size={44} className="text-primary-400 dark:text-primary-500" />
      </div>
      <div>
        <p className="text-7xl font-black text-primary-600 dark:text-primary-400 mb-4 leading-none">
          404
        </p>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          Page not found
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm max-w-sm">
          Looks like this destination is off the map. Let&apos;s get you back on
          track.
        </p>
      </div>
      <Link
        href="/"
        className="px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold text-sm transition-colors"
      >
        Explore destinations
      </Link>
    </div>
  );
};

export default NotFound;
