export const dynamic = "force-dynamic";

import React, { Suspense } from "react";
import { MdCalendarToday } from "react-icons/md";

import EmptyState from "@/components/EmptyState";
import Heading from "@/components/Heading";
import ListingCard, { ListingSkeleton } from "@/components/ListingCard";
import LoadMore from "@/components/LoadMore";

import { getCurrentUser } from "@/services/user";
import { getReservations } from "@/services/reservation";
import { getFavorites } from "@/services/favorite";

const ReservationPage = async () => {
  const user = await getCurrentUser();
  const favorites = await getFavorites();

  if (!user) {
    return (
      <EmptyState
        title="Sign in required"
        subtitle="Please log in to view reservations on your properties."
      />
    );
  }

  const { listings, nextCursor } = await getReservations({ userId: user.id });

  if (listings.length === 0) {
    return (
      <div className="main-container py-12">
        <Heading
          title="Reservations"
          subtitle="Guest bookings across your properties."
          backBtn
        />
        <div className="mt-16 flex flex-col items-center justify-center gap-4 text-center">
          <div className="w-20 h-20 rounded-full bg-violet-50 dark:bg-violet-900/20 flex items-center justify-center">
            <MdCalendarToday size={34} className="text-violet-300 dark:text-violet-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">
            No reservations yet
          </h3>
          <p className="text-slate-500 dark:text-slate-400 max-w-sm text-sm leading-relaxed">
            Once guests book one of your properties, their reservations will
            appear here. List your first property to get started.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="main-container py-8">
      <div className="mb-8">
        <Heading
          title={`Reservations (${listings.length})`}
          subtitle="Upcoming guest bookings on your properties."
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
              fnArgs={{ authorId: user.id }}
              queryFn={getReservations}
              queryKey={["reservations", user.id]}
              favorites={favorites}
            />
          </Suspense>
        )}
      </div>
    </section>
  );
};

export default ReservationPage;
