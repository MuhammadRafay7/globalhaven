"use client";
import React, { useMemo, useState, useTransition } from "react";
import dynamic from "next/dynamic";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { BiDollar } from "react-icons/bi";

import Modal from "./Modal";
import Button from "../Button";
import SpinnerMini from "../Loader";
import Heading from "../Heading";
import Counter from "../inputs/Counter";
import Input from "../inputs/Input";
import CategoryButton from "../inputs/CategoryButton";
import CountrySelect from "../inputs/CountrySelect";
import ImageUpload from "../ImageUpload";

import { categories } from "@/utils/constants";
import { createListing } from "@/services/listing";

const steps = {
  "0": "category",
  "1": "location",
  "2": "guestCount",
  "3": "image",
  "4": "title",
  "5": "price",
};

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const STEP_LABELS = ["Category", "Location", "Details", "Photos", "Description", "Pricing"];

const RentModal = ({ onCloseModal }: { onCloseModal?: () => void }) => {
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, startTransition] = useTransition();
  const queryClient = useQueryClient();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
    getValues,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "Beach",
      location: null,
      guestCount: 1,
      bathroomCount: 1,
      roomCount: 1,
      image: "",
      price: "",
      title: "",
      description: "",
    },
  });

  const location = watch("location");
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
    if (step !== STEPS.PRICE) return onNext();

    startTransition(async () => {
      try {
        const newListing = await createListing(data);
        toast.success(`${data.title} listed on GlobalHaven!`);
        queryClient.invalidateQueries({ queryKey: ["listings"] });
        reset();
        setStep(STEPS.CATEGORY);
        onCloseModal?.();
        router.refresh();
        router.push(`/listings/${newListing.id}`);
      } catch (error: any) {
        toast.error("Failed to create listing. Please try again.");
        console.log(error?.message);
      }
    });
  };

  const body = () => {
    switch (step) {
      case STEPS.LOCATION:
        return (
          <div className="flex flex-col gap-6">
            <Heading
              title="Where is your property located?"
              subtitle="Help global guests find your home!"
            />
            <CountrySelect value={location} onChange={setCustomValue} />
            <div className="h-[240px] rounded-xl overflow-hidden border border-slate-200 dark:border-dark-border">
              <Map center={location?.latlng} />
            </div>
          </div>
        );

      case STEPS.INFO:
        return (
          <div className="flex flex-col gap-6">
            <Heading
              title="Property basics"
              subtitle="How many guests can you accommodate?"
            />
            <Counter title="Guests" subtitle="How many guests do you allow?" watch={watch} onChange={setCustomValue} name="guestCount" />
            <hr className="border-slate-100 dark:border-dark-border" />
            <Counter onChange={setCustomValue} watch={watch} title="Bedrooms" subtitle="How many bedrooms?" name="roomCount" />
            <hr className="border-slate-100 dark:border-dark-border" />
            <Counter onChange={setCustomValue} watch={watch} title="Bathrooms" subtitle="How many bathrooms?" name="bathroomCount" />
          </div>
        );

      case STEPS.IMAGES:
        return (
          <div className="flex flex-col gap-6">
            <Heading
              title="Add photos of your place"
              subtitle="Great photos attract more guests!"
            />
            <ImageUpload onChange={setCustomValue} initialImage={getValues("image")} />
          </div>
        );

      case STEPS.DESCRIPTION:
        return (
          <div className="flex flex-col gap-6">
            <Heading
              title="Describe your place"
              subtitle="Short and sweet works best!"
            />
            <Input id="title" label="Property Title" disabled={isLoading} register={register} errors={errors} required watch={watch} autoFocus />
            <hr className="border-slate-100 dark:border-dark-border" />
            <Input id="description" label="Description" disabled={isLoading} register={register} errors={errors} required watch={watch} />
          </div>
        );

      case STEPS.PRICE:
        return (
          <div className="flex flex-col gap-6">
            <Heading
              title="Set your nightly price"
              subtitle="How much do you charge per night?"
            />
            <Input
              key="price"
              id="price"
              label="Price (USD)"
              icon={BiDollar}
              type="number"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              watch={watch}
              autoFocus
            />
          </div>
        );

      default:
        return (
          <div className="flex flex-col gap-3">
            <Heading
              title="What best describes your place?"
              subtitle="Choose a category"
            />
            <div className="flex-1 grid grid-cols-2 gap-2.5 max-h-[60vh] lg:max-h-[260px] overflow-y-auto scroll-smooth pr-1">
              {categories.map((item) => (
                <CategoryButton
                  onClick={setCustomValue}
                  watch={watch}
                  label={item.label}
                  icon={item.icon}
                  key={item.label}
                />
              ))}
            </div>
          </div>
        );
    }
  };

  const isFieldFilled = !!getValues(steps[step]);

  return (
    <div className="w-full h-full flex flex-col bg-white dark:bg-dark-card">
      <Modal.WindowHeader title="List your property" />
      <div className="px-6 pt-3">
        <div className="flex items-center gap-1 mb-1">
          {STEP_LABELS.map((label, index) => (
            <React.Fragment key={label}>
              <div
                className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                  index <= step
                    ? "bg-primary-600"
                    : "bg-slate-200 dark:bg-dark-border"
                }`}
              />
            </React.Fragment>
          ))}
        </div>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
          Step {step + 1} of {STEP_LABELS.length}: {STEP_LABELS[step]}
        </p>
      </div>
      <form
        className="flex-1 md:h-auto border-0 relative flex flex-col w-full outline-none focus:outline-none"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="relative p-6">{body()}</div>
        <div className="flex flex-col gap-2 px-6 pb-6 pt-3">
          <div className="flex flex-row items-center gap-3 w-full">
            {step !== STEPS.CATEGORY ? (
              <Button type="button" className="flex items-center gap-2 justify-center" onClick={onBack} outline>
                Back
              </Button>
            ) : null}
            <Button
              type="submit"
              className="flex items-center gap-2 justify-center"
              disabled={isLoading || !isFieldFilled}
            >
              {isLoading ? (
                <SpinnerMini />
              ) : step === STEPS.PRICE ? (
                "Publish Listing"
              ) : (
                "Next"
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RentModal;
