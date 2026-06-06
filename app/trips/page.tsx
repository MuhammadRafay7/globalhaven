export const dynamic = "force-dynamic";

import React, { Suspense } from "react";
import { MdLuggage } from "react-icons/md";

import EmptyState from "@/components/EmptyState";
import Heading from "@/components/Heading";
import ListingCard, { ListingSkeleton } from "@/components/ListingCard";
import LoadMore from "@/components/LoadMore";

import { getCurrentUser } from "@/services/user";
import { getReservations } from "@/services/reservation";
import { getFavorites } from "@/services/favorite";

const TripsPage = async () => {
  const user = await getCurrentUser();
  const favorites = await getFavorites();

  if (!user) {
    return (
      <EmptyState
        title="Sign in required"
        subtitle="Please log in to view your trips."
      />
    );
  }

  const { listings, nextCursor } = await getReservations({ userId: user.id });

  if (listings.length === 0) {
    return (
      <div className="main-container py-12">
        <Heading
          title="My Trips"
          subtitle="Your upcoming and past bookings."
          backBtn
        />
        <div className="mt-16 flex flex-col items-center justify-center gap-4 text-center">
          <div className="w-20 h-20 rounded-full bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center">
            <MdLuggage size={36} className="text-primary-300 dark:text-primary-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">
            No trips yet
          </h3>
          <p className="text-slate-500 dark:text-slate-400 max-w-sm text-sm leading-relaxed">
            You haven&apos;t booked any stays yet. Browse thousands of unique homes
            across the world and plan your next adventure.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="main-container py-8">
      <div className="mb-8">
        <Heading
          title={`My Trips (${listings.length})`}
          subtitle="Where you've been and where you're going."
          backBtn
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
        {listings.map((listing) => {
          const { reservation, ...data } = listing;
          const hasFavorited = favorites.includes(listing.id);
          return (
            <ListingCard
              key={listing.id}
              data={data}
              reservation={reservation}
              hasFavorited={hasFavorited}
            />
          );
        })}
        {nextCursor && (
          <Suspense fallback={<ListingSkeleton />}>
            <LoadMore
              nextCursor={nextCursor}
              fnArgs={{ userId: user.id }}
              queryFn={getReservations}
              queryKey={["trips", user.id]}
              favorites={favorites}
            />
          </Suspense>
        )}
      </div>
    </section>
  );
};

export default TripsPage;
