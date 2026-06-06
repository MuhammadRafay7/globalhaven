import React from "react";
import Image from "@/components/Image";
import Heading from "@/components/Heading";
import HeartButton from "@/components/HeartButton";
import { getFavorites } from "@/services/favorite";

interface ListingHeadProps {
  title: string;
  country: string | null;
  region: string | null;
  image: string;
  id: string;
}

const ListingHead: React.FC<ListingHeadProps> = async ({
  title,
  country = "",
  region = "",
  image,
  id,
}) => {
  const favorites = await getFavorites();
  const hasFavorited = favorites.includes(id);

  return (
    <>
      <Heading
        title={title}
        subtitle={[region, country].filter(Boolean).join(", ")}
        backBtn
      />
      <div className="w-full md:h-[480px] sm:h-[320px] h-[260px] overflow-hidden rounded-2xl relative bg-slate-100 dark:bg-dark-card shadow-card">
        <Image
          imageSrc={image}
          fill
          className="object-cover"
          alt={title}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
        <div className="absolute top-4 right-4">
          <div className="bg-white/90 dark:bg-dark-card/90 backdrop-blur-sm rounded-full p-1.5 shadow-sm">
            <HeartButton listingId={id} hasFavorited={hasFavorited} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ListingHead;
