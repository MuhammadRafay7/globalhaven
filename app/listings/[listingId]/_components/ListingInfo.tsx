import React from "react";
import dynamic from "next/dynamic";
import { MdPerson, MdBed, MdBathtub } from "react-icons/md";

import Avatar from "@/components/Avatar";
import ListingCategory from "./ListingCategory";
import { Category } from "@/types";

interface ListingInfoProps {
  user: {
    image: string | null;
    name: string | null;
  };
  description: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  category: Category | undefined;
  latlng: number[];
}

const Map = dynamic(() => import("@/components/Map"), { ssr: false });

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  description,
  guestCount,
  roomCount,
  bathroomCount,
  category,
  latlng,
}) => {
  return (
    <div className="col-span-4 flex flex-col gap-7">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <Avatar src={user?.image} />
          <div>
            <p className="text-[15px] font-semibold text-slate-900 dark:text-slate-100">
              Hosted by {user?.name}
            </p>
          </div>
        </div>

        <div className="flex flex-row items-center gap-5">
          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
            <MdPerson size={17} className="text-primary-500" />
            <span className="text-sm">{guestCount} guest{guestCount !== 1 ? "s" : ""}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
            <MdBed size={17} className="text-primary-500" />
            <span className="text-sm">{roomCount} room{roomCount !== 1 ? "s" : ""}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
            <MdBathtub size={17} className="text-primary-500" />
            <span className="text-sm">{bathroomCount} bathroom{bathroomCount !== 1 ? "s" : ""}</span>
          </div>
        </div>
      </div>

      <hr className="border-slate-100 dark:border-dark-border" />

      {category && (
        <>
          <ListingCategory
            icon={category.icon}
            label={category.label}
            description={category.description || ""}
          />
          <hr className="border-slate-100 dark:border-dark-border" />
        </>
      )}

      <div>
        <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">About this place</h3>
        <p className="font-light text-slate-600 dark:text-slate-400 text-[15px] leading-relaxed">
          {description}
        </p>
      </div>

      <hr className="border-slate-100 dark:border-dark-border" />

      <div>
        <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">Location</h3>
        <div className="h-[240px] rounded-xl overflow-hidden border border-slate-200 dark:border-dark-border">
          <Map center={latlng} />
        </div>
      </div>
    </div>
  );
};

export default ListingInfo;
