"use client";
import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import { differenceInDays } from "date-fns";
import { useSearchParams } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";

import Modal from "../modals/Modal";

const SearchModal = dynamic(() => import("@/components/modals/SearchModal"), {
  ssr: false,
});

const Search = () => {
  const searchParams = useSearchParams();

  const country = searchParams?.get("country");
  const startDate = searchParams?.get("startDate");
  const endDate = searchParams?.get("endDate");
  const guestCount = searchParams?.get("guestCount");

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      let diff = differenceInDays(end, start);
      if (diff === 0) diff = 1;
      return `${diff} Days`;
    }
    return "Any week";
  }, [endDate, startDate]);

  const guestLabel = guestCount ? `${guestCount} Guests` : "Add Guests";

  return (
    <Modal>
      <Modal.Trigger name="search">
        <button
          type="button"
          className="border border-slate-200 dark:border-dark-border w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer bg-white dark:bg-dark-card"
        >
          <div className="flex flex-row justify-between items-center">
            <div className="flex items-center gap-1.5 px-4">
              <MdLocationOn className="text-primary-600 dark:text-primary-400 text-sm hidden sm:block" />
              <small className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                {country ? country : "Anywhere"}
              </small>
            </div>

            <small className="hidden sm:block text-sm font-semibold px-4 border-x border-slate-200 dark:border-dark-border text-center text-slate-700 dark:text-slate-200">
              {durationLabel}
            </small>

            <div className="text-sm pl-4 pr-2 flex flex-row items-center gap-3">
              <small className="hidden sm:block font-normal text-sm text-slate-500 dark:text-slate-400">
                {guestLabel}
              </small>
              <div className="p-2 bg-primary-600 hover:bg-primary-700 rounded-full text-white transition-colors duration-200">
                <FaSearch className="text-[11px]" />
              </div>
            </div>
          </div>
        </button>
      </Modal.Trigger>
      <Modal.Window name="search">
        <SearchModal />
      </Modal.Window>
    </Modal>
  );
};

export default Search;
