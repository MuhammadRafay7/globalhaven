import React, { ReactNode } from "react";
import { cn } from "@/utils/helper";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "small" | "large";
  className?: string;
  children?: ReactNode;
  outline?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  size = "small",
  outline = false,
  ...props
}) => {
  return (
    <button
      className={cn(
        "disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-85 transition-all duration-200 w-full",
        size === "small"
          ? "text-[15px] font-semibold border border-transparent py-[9px]"
          : "text-[17px] font-semibold border-2 py-[10px]",
        outline
          ? "bg-white dark:bg-dark-card border border-slate-300 dark:border-dark-border text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700"
          : "bg-primary-600 hover:bg-primary-700 border-primary-600 text-white",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
