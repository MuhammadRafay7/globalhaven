"use client";
import React, { useEffect, useRef } from "react";
import Select from "react-select";
import countries from "@/data/countries.json";
import { useTheme } from "@/components/ThemeProvider";

export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
};

const CountrySelect = ({
  value,
  onChange,
}: {
  value?: CountrySelectValue;
  onChange: (name: string, val: CountrySelectValue) => void;
}) => {
  const ref = useRef<any>(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      ref.current?.focus();
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (value: CountrySelectValue) => {
    onChange("location", value);
  };

  return (
    <Select
      ref={ref}
      placeholder="Search any country..."
      isClearable
      options={countries}
      value={value}
      onChange={handleChange}
      formatOptionLabel={(option: any) => (
        <div className="flex flex-row items-center gap-3">
          <span className="text-lg">{option.flag}</span>
          <div>
            <span className="font-medium text-slate-800 dark:text-slate-200">{option.label}</span>
            <span className="text-slate-400 dark:text-slate-500 ml-1.5 text-sm">{option.region}</span>
          </div>
        </div>
      )}
      classNames={{
        control: () => "!border-slate-300 dark:!border-dark-border !shadow-none !rounded-lg",
        input: () => "text-[14px] dark:!text-slate-200",
        option: () => "text-[14px]",
        placeholder: () => "text-slate-400 dark:text-slate-500 text-[14px]",
        singleValue: () => "dark:text-slate-200",
        menu: () => "dark:!bg-dark-card dark:!border dark:!border-dark-border",
        menuList: () => "dark:!bg-dark-card",
      }}
      styles={{
        control: (base) => ({
          ...base,
          padding: "4px 2px",
          backgroundColor: isDark ? "#1e293b" : "#ffffff",
          borderColor: isDark ? "#334155" : "#cbd5e1",
          "&:hover": { borderColor: isDark ? "#6366f1" : "#6366f1" },
        }),
        option: (base, state) => ({
          ...base,
          backgroundColor: state.isFocused
            ? isDark ? "#334155" : "#eef2ff"
            : isDark ? "#1e293b" : "#ffffff",
          color: isDark ? "#f1f5f9" : "#0f172a",
          cursor: "pointer",
        }),
        menu: (base) => ({
          ...base,
          backgroundColor: isDark ? "#1e293b" : "#ffffff",
          border: `1px solid ${isDark ? "#334155" : "#e2e8f0"}`,
          boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
        }),
        singleValue: (base) => ({
          ...base,
          color: isDark ? "#f1f5f9" : "#0f172a",
        }),
        placeholder: (base) => ({
          ...base,
          color: isDark ? "#94a3b8" : "#94a3b8",
        }),
        input: (base) => ({
          ...base,
          color: isDark ? "#f1f5f9" : "#0f172a",
        }),
      }}
    />
  );
};

export default CountrySelect;
