"use client";
import React, { useRef, useEffect } from "react";
import { FieldValues, UseFormWatch } from "react-hook-form";
import { cn } from "@/utils/helper";
import { Category } from "@/types";

interface CategoryButtonProps extends Category {
  onClick: (fieldName: string, value: string) => void;
  watch: UseFormWatch<FieldValues>;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ icon: Icon, label, onClick, watch }) => {
  const isSelected = watch("category") === label;
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!buttonRef.current) return;
    const timer = setTimeout(() => {
      if (isSelected) buttonRef.current?.focus();
    }, 300);
    return () => clearTimeout(timer);
  }, [isSelected]);

  const handleChange = () => {
    if (isSelected) return;
    onClick("category", label);
  };

  return (
    <div className="col-span-1">
      <button
        ref={buttonRef}
        type="submit"
        onClick={handleChange}
        className={cn(
          "rounded-xl border-2 p-3 flex flex-col gap-2 hover:border-primary-500 dark:hover:border-primary-400 cursor-pointer transition-all duration-150 w-full",
          isSelected
            ? "border-primary-600 dark:border-primary-400 bg-primary-50 dark:bg-primary-900/20"
            : "border-slate-200 dark:border-dark-border bg-white dark:bg-dark-card hover:bg-slate-50 dark:hover:bg-dark-border/30"
        )}
        onFocus={handleChange}
      >
        <Icon
          size={22}
          className={isSelected ? "text-primary-600 dark:text-primary-400" : "text-slate-600 dark:text-slate-400"}
        />
        <span
          className={cn(
            "font-semibold text-sm select-none text-start",
            isSelected ? "text-primary-700 dark:text-primary-300" : "text-slate-700 dark:text-slate-300"
          )}
        >
          {label}
        </span>
      </button>
    </div>
  );
};

export default CategoryButton;
