import React, { Suspense } from "react";
import { MdHome } from "react-icons/md";

import EmptyState from "@/components/EmptyState";
import Heading from "@/components/Heading";
import ListingCard, { ListingSkeleton } from "@/components/ListingCard";
import LoadMore from "@/components/LoadMore";
import AddPropertyButton from "@/components/AddPropertyButton";

import { getCurrentUser } from "@/services/user";
import { getProperties } from "@/services/properties";
import { getFavorites } from "@/services/favorite";

const PropertiesPage = async () => {
  const user = await getCurrentUser();
  const favorites = await getFavorites();

  if (!user) {
    return (
      <EmptyState
        title="Sign in required"
        subtitle="Please log in to manage your properties."
      />
    );
  }

  const { listings, nextCursor } = await getProperties({ userId: user.id });

  if (!listings || listings.length === 0) {
    return (
      <div className="main-container py-12">
        <Heading
          title="My Properties"
          subtitle="Properties you host on GlobalHaven."
          backBtn
        />
        <div className="mt-16 flex flex-col items-center justify-center gap-4 text-center">
          <div className="w-20 h-20 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center">
            <MdHome size={36} className="text-emerald-300 dark:text-emerald-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">
            No properties listed yet
          </h3>
          <p className="text-slate-500 dark:text-slate-400 max-w-sm text-sm leading-relaxed">
            Turn your home into income. List your space and start welcoming
            guests from around the world.
          </p>
          <AddPropertyButton />
        </div>
      </div>
    );
  }

  return (
    <section className="main-container py-8">
      <div className="mb-8">
        <Heading
          title={`My Properties (${listings.length})`}
          subtitle="Manage your hosted listings on GlobalHaven."
          backBtn
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
        {listings.map((listing) => {
          const hasFavorited = favorites.includes(listing.id);
          return (
            <ListingCard
              key={listing.id}
              data={listing}
              hasFavorited={hasFavorited}
            />
          );
        })}
        {nextCursor && (
          <Suspense fallback={<ListingSkeleton />}>
            <LoadMore
              nextCursor={nextCursor}
              fnArgs={{ userId: user.id }}
              queryFn={getProperties}
              queryKey={["properties", user.id]}
              favorites={favorites}
            />
          </Suspense>
        )}
      </div>
    </section>
  );
};

export default PropertiesPage;
