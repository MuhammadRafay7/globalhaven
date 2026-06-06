"use client";
import React, { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { formatISO } from "date-fns";

import Modal from "./Modal";
import Button from "../Button";
import Heading from "../Heading";
import Counter from "../inputs/Counter";
import CountrySelect from "../inputs/CountrySelect";

const Calendar = dynamic(() => import("@/components/Calender"), { ssr: false });

const steps = {
  "0": "location",
  "1": "dateRange",
  "2": "guestCount",
};

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const POPULAR_DESTINATIONS = [
  { label: "United States", flag: "🇺🇸" },
  { label: "Italy", flag: "🇮🇹" },
  { label: "Germany", flag: "🇩🇪" },
  { label: "France", flag: "🇫🇷" },
  { label: "Japan", flag: "🇯🇵" },
  { label: "Spain", flag: "🇪🇸" },
];

const SearchModal = ({ onCloseModal }: { onCloseModal?: () => void }) => {
  const [step, setStep] = useState(STEPS.LOCATION);
  const router = useRouter();
  const searchParams = useSearchParams();

  const { handleSubmit, setValue, watch, getValues } = useForm<FieldValues>({
    defaultValues: {
      location: null,
      guestCount: 1,
      bathroomCount: 1,
      roomCount: 1,
      dateRange: {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      },
    },
  });

  const location = watch("location");
  const dateRange = watch("dateRange");
  const country = location?.label;

  const Map = useMemo(
    () => dynamic(() => import("../Map"), { ssr: false }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [country]
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
  };

  const onBack = () => setStep((value) => value - 1);
  const onNext = () => setStep((value) => value + 1);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.INFO) return onNext();

    const { guestCount, roomCount, bathroomCount, dateRange } = data;
    let currentQuery = {};
    if (searchParams) currentQuery = queryString.parse(searchParams.toString());

    const updatedQuery: any = {
      ...currentQuery,
      country: location?.label,
      guestCount,
      roomCount,
      bathroomCount,
    };

    if (dateRange.startDate) updatedQuery.startDate = formatISO(dateRange.startDate);
    if (dateRange.endDate) updatedQuery.endDate = formatISO(dateRange.endDate);

    const url = queryString.stringifyUrl(
      { url: "/", query: updatedQuery },
      { skipNull: true }
    );
    onCloseModal?.();
    router.push(url);
  };

  const body = () => {
    switch (step) {
      case STEPS.DATE:
        return (
          <div className="flex flex-col gap-3">
            <Heading title="When do you plan to go?" subtitle="Make sure everyone is free!" />
            <div className="h-[348px] w-full">
              <Calendar onChange={setCustomValue} value={dateRange} />
            </div>
          </div>
        );

      case STEPS.INFO:
        return (
          <div className="flex flex-col gap-6">
            <Heading title="Your travel group" subtitle="Find the perfect space for everyone!" />
            <Counter title="Guests" subtitle="How many guests?" watch={watch} onChange={setCustomValue} name="guestCount" />
            <hr className="border-slate-100 dark:border-dark-border" />
            <Counter onChange={setCustomValue} watch={watch} title="Rooms" subtitle="How many rooms?" name="roomCount" />
            <hr className="border-slate-100 dark:border-dark-border" />
            <Counter onChange={setCustomValue} watch={watch} title="Bathrooms" subtitle="How many bathrooms?" name="bathroomCount" />
          </div>
        );

      default:
        return (
          <div className="flex flex-col gap-4">
            <Heading title="Where in the world?" subtitle="Search by country or region" />
            <div>
              <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-2">
                Popular Destinations
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {POPULAR_DESTINATIONS.map((dest) => (
                  <button
                    key={dest.label}
                    type="button"
                    onClick={() => {
                      setCustomValue("location", { label: dest.label, value: dest.label });
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-150 ${
                      location?.label === dest.label
                        ? "bg-primary-600 text-white border-primary-600"
                        : "bg-slate-50 dark:bg-dark-border text-slate-600 dark:text-slate-300 border-slate-200 dark:border-dark-border hover:border-primary-400"
                    }`}
                  >
                    <span>{dest.flag}</span>
                    {dest.label}
                  </button>
                ))}
              </div>
            </div>
            <CountrySelect value={location} onChange={setCustomValue} />
            <div className="h-[200px] rounded-xl overflow-hidden border border-slate-200 dark:border-dark-border">
              <Map center={location?.latlng} />
            </div>
          </div>
        );
    }
  };

  const isFieldFilled = !!getValues(steps[step]);

  return (
    <div className="h-full w-full bg-white dark:bg-dark-card flex flex-col">
      <Modal.WindowHeader title="Search Globally" />
      <form
        className="h-auto flex-1 relative flex flex-col w-full outline-none focus:outline-none"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="relative p-6">{body()}</div>
        <div className="flex flex-col gap-2 px-6 pb-6 pt-3">
          <div className="flex flex-row items-center gap-3 w-full">
            {step !== STEPS.LOCATION ? (
              <Button type="button" className="flex items-center gap-2 justify-center" onClick={onBack} outline>
                Back
              </Button>
            ) : null}
            <Button
              type="submit"
              className="flex items-center gap-2 justify-center"
              disabled={!isFieldFilled}
            >
              {step === STEPS.INFO ? "Search" : "Next"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchModal;
