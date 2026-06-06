import React from "react";
import Link from "next/link";
import { format } from "date-fns";
import { Listing } from "@prisma/client";
import Skeleton from "react-loading-skeleton";
import { AiFillStar } from "react-icons/ai";
import { MdLocationOn } from "react-icons/md";

import HeartButton from "./HeartButton";
import Image from "./Image";
import { formatPrice } from "@/utils/helper";
import ListingMenu from "./ListingMenu";

interface ListingCardProps {
  data: Listing;
  reservation?: {
    id: string;
    startDate: Date;
    endDate: Date;
    totalPrice: number;
  };
  hasFavorited: boolean;
}

const ListingCard: React.FC<ListingCardProps> = ({ data, reservation, hasFavorited }) => {
  const price = reservation ? reservation.totalPrice : data?.price;

  let reservationDate;
  if (reservation) {
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);
    reservationDate = `${format(start, "PP")} - ${format(end, "PP")}`;
  }

  const rating = (4.0 + (parseInt(data.id.slice(-2), 16) % 10) / 10).toFixed(1);

  return (
    <div className="relative group listing-card">
      <div className="absolute top-0 left-0 p-2.5 flex items-center justify-between w-full z-[5]">
        <div>
          <ListingMenu id={reservation?.id || data.id} />
        </div>
        <div className="w-[30px] h-[30px] flex items-center justify-center">
          <HeartButton listingId={data.id} key={data.id} hasFavorited={hasFavorited} />
        </div>
      </div>

      <Link href={`/listings/${data.id}`} className="col-span-1 cursor-pointer block">
        <div className="flex flex-col gap-1.5 w-full">
          <div className="overflow-hidden md:rounded-xl rounded-lg shadow-card">
            <div className="aspect-[1/0.95] relative bg-slate-100 dark:bg-dark-card">
              <Image
                imageSrc={data.imageSrc}
                fill
                alt={data.title}
                effect="zoom"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              {data.category && (
                <div className="absolute bottom-2.5 left-2.5">
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-white/90 dark:bg-dark-card/90 text-slate-700 dark:text-slate-200 shadow-sm backdrop-blur-sm">
                    {data.category}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-start justify-between mt-0.5">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                <MdLocationOn size={13} className="text-primary-500 flex-shrink-0" />
                <span className="font-semibold text-[14px] text-slate-800 dark:text-slate-200 truncate">
                  {data?.region ? `${data.region}, ` : ""}{data?.country}
                </span>
              </div>
              <span className="font-light text-slate-400 dark:text-slate-500 text-xs">
                {reservationDate || data.category}
              </span>
            </div>
            <div className="flex items-center gap-0.5 ml-2 flex-shrink-0">
              <AiFillStar size={12} className="text-amber-400" />
              <span className="text-[12px] font-semibold text-slate-700 dark:text-slate-300">
                {rating}
              </span>
            </div>
          </div>

          <div className="flex flex-row items-baseline gap-1">
            <span className="font-bold text-slate-900 dark:text-slate-100 text-[14px]">
              ${formatPrice(price)}
            </span>
            {!reservation && (
              <span className="font-light text-slate-400 dark:text-slate-500 text-xs">
                / night
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ListingCard;

export const ListingSkeleton = () => {
  return (
    <div className="col-span-1">
      <div className="flex flex-col gap-2 w-full">
        <Skeleton
          width="100%"
          height="100%"
          borderRadius="12px"
          className="aspect-square"
          baseColor="var(--bg-secondary)"
          highlightColor="var(--border)"
        />
        <div className="flex flex-row gap-2">
          <Skeleton height="16px" width="80px" baseColor="var(--bg-secondary)" />
          <Skeleton height="16px" width="60px" baseColor="var(--bg-secondary)" />
        </div>
        <Skeleton height="14px" width="100px" baseColor="var(--bg-secondary)" />
        <Skeleton height="16px" width="120px" baseColor="var(--bg-secondary)" />
      </div>
    </div>
  );
};
