import React from "react";
import { IconType } from "react-icons";

interface ListingCategoryProps {
  icon: IconType;
  label: string;
  description: string;
}

const ListingCategory: React.FC<ListingCategoryProps> = ({ icon: Icon, label, description }) => {
  return (
    <div className="flex flex-row items-center gap-4">
      <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center flex-shrink-0">
        <Icon size={24} className="text-primary-600 dark:text-primary-400" />
      </div>
      <div className="flex flex-col">
        <span className="text-base font-semibold text-slate-900 dark:text-slate-100">{label}</span>
        <p className="text-slate-500 dark:text-slate-400 font-light text-sm">{description}</p>
      </div>
    </div>
  );
};

export default ListingCategory;
