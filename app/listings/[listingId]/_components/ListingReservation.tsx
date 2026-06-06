import React from "react";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";

import Button from "@/components/Button";
import SpinnerMini from "@/components/Loader";
import { formatPrice } from "@/utils/helper";

interface ListingReservationProps {
  price: number;
  dateRange: Range;
  totalPrice: number;
  onChangeDate: (name: string, value: Range) => void;
  onSubmit: () => void;
  isLoading?: boolean;
  disabledDates: Date[];
}

const Calendar = dynamic(() => import("@/components/Calender"), { ssr: false });

const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabledDates,
  isLoading,
}) => {
  return (
    <div className="bg-white dark:bg-dark-card rounded-2xl border border-slate-200 dark:border-dark-border overflow-hidden shadow-card">
      <div className="flex flex-row items-baseline gap-1.5 p-5">
        <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          ${formatPrice(price)}
        </span>
        <span className="font-light text-slate-500 dark:text-slate-400 text-sm">/ night</span>
      </div>
      <hr className="border-slate-100 dark:border-dark-border" />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={onChangeDate}
      />
      <hr className="border-slate-100 dark:border-dark-border" />
      <div className="p-4">
        <Button
          disabled={isLoading}
          onClick={onSubmit}
          className="flex flex-row items-center justify-center h-[48px]"
          size="large"
        >
          {isLoading ? <SpinnerMini /> : "Reserve Now"}
        </Button>
      </div>
      <hr className="border-slate-100 dark:border-dark-border" />
      <div className="p-5 flex flex-row items-center justify-between">
        <span className="font-bold text-slate-900 dark:text-slate-100">Total</span>
        <span className="font-bold text-lg text-slate-900 dark:text-slate-100">
          ${formatPrice(totalPrice)}
        </span>
      </div>
    </div>
  );
};

export default ListingReservation;
