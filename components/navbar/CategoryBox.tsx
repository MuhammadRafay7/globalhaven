"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { Category } from "@/types";
import { cn } from "@/utils/helper";

interface CategoryBoxProps extends Category {
  selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({ icon: Icon, label, selected }) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = () => {
    let currentQuery = {};
    if (params) {
      currentQuery = queryString.parse(params.toString());
    }

    const updatedQuery: any = { ...currentQuery, category: label };

    if (params?.get("category") === label) {
      delete updatedQuery.category;
    }

    const url = queryString.stringifyUrl(
      { url: "/", query: updatedQuery },
      { skipNull: true }
    );
    router.push(url);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "flex flex-col max-w-fit items-center justify-center gap-1.5 p-2 border-b-2 transition-all duration-200 cursor-pointer text-[20px] md:text-[22px] hover:text-primary-600 dark:hover:text-primary-400",
        selected
          ? "border-b-primary-600 dark:border-b-primary-400 text-primary-600 dark:text-primary-400"
          : "border-transparent text-slate-500 dark:text-slate-400 hover:border-b-slate-300 dark:hover:border-b-slate-600"
      )}
    >
      <Icon />
      <small className="font-semibold md:text-[12.5px] text-[11.5px] select-none whitespace-nowrap">
        {label}
      </small>
    </button>
  );
};

export default CategoryBox;
