import React from "react";
import { IoMdClose } from "react-icons/io";
import { MdWarningAmber } from "react-icons/md";
import Button from "./Button";
import SpinnerMini from "./Loader";

interface ConfirmDeleteProps {
  title: string;
  onConfirm: (fn?: () => void) => void;
  onCloseModal?: () => void;
  isLoading?: boolean;
}

const ConfirmDelete: React.FC<ConfirmDeleteProps> = ({
  title,
  onConfirm,
  onCloseModal,
  isLoading = false,
}) => {
  const onAction = () => {
    onConfirm(onCloseModal);
  };

  return (
    <div className="flex flex-col gap-4 px-6 py-7 relative bg-white dark:bg-dark-card">
      <button
        type="button"
        className="p-1.5 border-0 hover:bg-slate-100 dark:hover:bg-dark-border rounded-full transition-colors duration-150 absolute right-3 top-3"
        onClick={() => onCloseModal?.()}
      >
        <IoMdClose size={18} className="text-slate-600 dark:text-slate-400" />
      </button>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center flex-shrink-0">
          <MdWarningAmber size={20} className="text-rose-500" />
        </div>
        <h1 className="text-[20px] font-bold text-slate-900 dark:text-slate-100">{title}</h1>
      </div>
      <p className="text-slate-600 dark:text-slate-400 text-[15px] leading-[1.6]">
        Are you sure you want to proceed? This action cannot be undone.
      </p>

      <div className="flex items-center gap-3 mt-1 h-[42px]">
        <Button onClick={() => onCloseModal?.()} className="h-full" outline>
          Cancel
        </Button>
        <button
          onClick={onAction}
          className="h-full flex-1 flex items-center justify-center bg-rose-500 hover:bg-rose-600 text-white rounded-lg font-semibold transition-colors duration-200 disabled:opacity-70"
          disabled={isLoading}
        >
          {isLoading ? <SpinnerMini /> : "Confirm"}
        </button>
      </div>
    </div>
  );
};

export default ConfirmDelete;
