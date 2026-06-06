import React, { InputHTMLAttributes } from "react";
import { IconType } from "react-icons";
import {
  UseFormRegister,
  FieldValues,
  FieldErrors,
  UseFormWatch,
} from "react-hook-form";
import { cn } from "@/utils/helper";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  icon?: IconType;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  watch: UseFormWatch<FieldValues>;
  autoFocus?: boolean;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  icon: Icon,
  register,
  errors,
  watch,
  autoFocus = false,
  type = "text",
  disabled,
  ...props
}) => {
  const value = watch(id);

  return (
    <div className="w-full relative">
      {Icon && (
        <Icon
          size={18}
          className="absolute top-[14px] left-3 text-slate-400 dark:text-slate-500"
        />
      )}
      <input
        id={id}
        type={type}
        disabled={disabled}
        {...register(id, { required: true })}
        className={cn(
          "text-[15px] peer w-full px-3 py-3 font-light bg-white dark:bg-dark-card border rounded-lg outline-none transition-all duration-150 disabled:opacity-70 disabled:cursor-not-allowed text-slate-900 dark:text-slate-100 placeholder-transparent",
          errors[id]
            ? "border-rose-400 dark:border-rose-500 focus:border-rose-500"
            : "border-slate-300 dark:border-dark-border focus:border-primary-500 dark:focus:border-primary-400",
          Icon ? "pl-9" : "pl-4"
        )}
        autoFocus={autoFocus}
        {...props}
      />
      <label
        className={cn(
          "absolute text-[13px] duration-150 transform top-[28px] scale-90 -translate-y-4 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-[40px] peer-focus:bg-white dark:peer-focus:bg-dark-card z-[20] px-1 pointer-events-none",
          errors[id]
            ? "text-rose-500 dark:text-rose-400"
            : "text-slate-400 dark:text-slate-500",
          value && "-translate-y-[40px] bg-white dark:bg-dark-card",
          Icon ? "left-9" : "left-4"
        )}
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
