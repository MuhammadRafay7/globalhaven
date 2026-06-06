"use client";
import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { FieldValues, UseFormWatch } from "react-hook-form";

interface CounterProps {
  title: string;
  subtitle: string;
  onChange: (name: string, value: number) => void;
  name: string;
  watch: UseFormWatch<FieldValues>;
}

const Counter: React.FC<CounterProps> = ({ title, subtitle, onChange, name, watch }) => {
  const value = watch(name);

  const onAdd = () => onChange(name, value + 1);
  const onReduce = () => {
    if (value === 1) return;
    onChange(name, value - 1);
  };

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col">
        <h3 className="font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
        <p className="font-light text-slate-500 dark:text-slate-400 text-[14.5px]">{subtitle}</p>
      </div>
      <div className="flex flex-row items-center gap-4">
        <button
          type="button"
          onClick={onReduce}
          className="w-8 h-8 rounded-full border border-slate-300 dark:border-dark-border flex items-center justify-center text-slate-600 dark:text-slate-300 cursor-pointer hover:border-slate-500 dark:hover:border-slate-400 hover:bg-slate-50 dark:hover:bg-dark-border transition-all duration-150"
        >
          <AiOutlineMinus size={14} />
        </button>
        <span className="font-semibold text-lg text-slate-700 dark:text-slate-200 select-none min-w-[1.5rem] text-center">
          {value}
        </span>
        <button
          type="button"
          onClick={onAdd}
          className="w-8 h-8 rounded-full border border-slate-300 dark:border-dark-border flex items-center justify-center text-slate-600 dark:text-slate-300 cursor-pointer hover:border-slate-500 dark:hover:border-slate-400 hover:bg-slate-50 dark:hover:bg-dark-border transition-all duration-150"
          autoFocus={title === "Guests"}
        >
          <AiOutlinePlus size={14} />
        </button>
      </div>
    </div>
  );
};

export default Counter;
