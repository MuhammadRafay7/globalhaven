"use client";
import React from "react";
import { MdKeyboardBackspace } from "react-icons/md";
import { useMoveBack } from "@/hooks/useMoveBack";

const BackButton = () => {
  const back = useMoveBack();
  return (
    <button
      type="button"
      className="flex flex-row gap-1.5 items-center text-[14px] font-semibold py-2 px-3 rounded-full hover:bg-slate-100 dark:hover:bg-dark-card transition-colors duration-150 cursor-pointer text-slate-600 dark:text-slate-400"
      onClick={back}
    >
      <MdKeyboardBackspace size={18} />
      <span>Back</span>
    </button>
  );
};

export default BackButton;
