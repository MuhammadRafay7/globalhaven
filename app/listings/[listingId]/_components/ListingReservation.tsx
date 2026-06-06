"use client";
import React from "react";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import { format, differenceInCalendarDays } from "date-fns";
import { MdCalendarToday, MdArrowForward, MdLock } from "react-icons/md";

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

const SERVICE_FEE_RATE = 0.09;

const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabledDates,
  isLoading,
}) => {
  const start = dateRange.startDate;
  const end = dateRange.endDate;

  const nightCount =
    start && end ? Math.max(differenceInCalendarDays(end, start), 0) : 0;

  const hasRange = nightCount > 0;
  const nightsTotal = hasRange ? nightCount * price : price;
  const serviceFee = Math.round(nightsTotal * SERVICE_FEE_RATE);
  const grandTotal = nightsTotal + serviceFee;

  const fmtDate = (d: Date | undefined) =>
    d ? format(d, "MMM d, yyyy") : "—";

  return (
    <div className="bg-white dark:bg-dark-card rounded-2xl border border-slate-200 dark:border-dark-border shadow-[0_8px_40px_rgba(0,0,0,0.10)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.4)] overflow-hidden">

      {/* Price header */}
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            ${formatPrice(price)}
          </span>
          <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">
            / night
          </span>
        </div>
      </div>

      {/* Date selector pills */}
      <div className="px-6 pb-4">
        <div className="grid grid-cols-2 rounded-xl border border-slate-200 dark:border-dark-border overflow-hidden text-sm">
          <div className="px-4 py-3 border-r border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-slate-800/50">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-0.5">
              Check-in
            </p>
            <p className="font-semibold text-slate-800 dark:text-slate-100 text-sm">
              {fmtDate(start)}
            </p>
          </div>
          <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800/50">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-0.5">
              Check-out
            </p>
            <p className="font-semibold text-slate-800 dark:text-slate-100 text-sm">
              {fmtDate(end)}
            </p>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="booking-calendar">
        <Calendar
          value={dateRange}
          disabledDates={disabledDates}
          onChange={onChangeDate}
        />
      </div>

      {/* Reserve button */}
      <div className="px-6 pb-4 pt-2">
        <button
          onClick={onSubmit}
          disabled={isLoading}
          className="w-full h-[52px] rounded-xl font-bold text-white text-base bg-gradient-to-r from-primary-600 to-violet-600 hover:from-primary-700 hover:to-violet-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.99] flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <SpinnerMini />
          ) : (
            <>
              Reserve Now
              <MdArrowForward size={18} />
            </>
          )}
        </button>
        <p className="flex items-center justify-center gap-1.5 mt-2.5 text-xs text-slate-400 dark:text-slate-500">
          <MdLock size={12} />
          You won&apos;t be charged yet
        </p>
      </div>

      {/* Price breakdown */}
      <div className="px-6 pb-6 pt-2 border-t border-slate-100 dark:border-dark-border space-y-3">
        <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
          <span>
            ${formatPrice(price)} × {hasRange ? nightCount : 1}{" "}
            {(hasRange ? nightCount : 1) === 1 ? "night" : "nights"}
          </span>
          <span className="font-medium text-slate-800 dark:text-slate-200">
            ${formatPrice(nightsTotal)}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
          <span className="underline underline-offset-2 cursor-help decoration-dotted">
            Service fee
          </span>
          <span className="font-medium text-slate-800 dark:text-slate-200">
            ${formatPrice(serviceFee)}
          </span>
        </div>
        <div className="pt-3 border-t border-slate-100 dark:border-dark-border flex items-center justify-between">
          <span className="font-bold text-slate-900 dark:text-slate-100">Total</span>
          <span className="font-extrabold text-xl text-slate-900 dark:text-slate-100">
            ${formatPrice(grandTotal)}
          </span>
        </div>
      </div>

      {/* Trust badges */}
      <div className="mx-6 mb-6 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-dark-border px-4 py-3">
        <div className="flex items-start gap-2.5">
          <MdCalendarToday size={14} className="text-primary-500 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Free cancellation before check-in. Review the host&apos;s full
            cancellation policy for details.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ListingReservation;
