import React from "react";
import Link from "next/link";
import { TbWorld } from "react-icons/tb";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center group-hover:bg-primary-700 transition-colors duration-200 flex-shrink-0">
        <TbWorld className="text-white" size={18} />
      </div>
      <span className="hidden md:block font-bold text-xl text-slate-900 dark:text-white tracking-tight">
        Global<span className="text-primary-600 dark:text-primary-400">Haven</span>
      </span>
    </Link>
  );
};

export default Logo;
