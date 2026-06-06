import React, { FC, Suspense } from "react";

import ListingCard, { ListingSkeleton } from "@/components/ListingCard";
import LoadMore from "@/components/LoadMore";
import EmptyState from "@/components/EmptyState";
import FeaturedDestinations from "@/components/FeaturedDestinations";
import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import CategoryShowcase from "@/components/sections/CategoryShowcase";
import Testimonials from "@/components/sections/Testimonials";
import NewsletterCTA from "@/components/sections/NewsletterCTA";

import { getListings } from "@/services/listing";
import { getFavorites } from "@/services/favorite";

export const dynamic = "force-dynamic";

interface HomeProps {
  searchParams?: { [key: string]: string | undefined };
}

const Home: FC<HomeProps> = async ({ searchParams }) => {
  const { listings, nextCursor } = await getListings(searchParams);
  const favorites = await getFavorites();
  const hasFilters = searchParams && Object.keys(searchParams).length > 0;

  /* ─── Search / filtered view ─── */
  if (hasFilters) {
    return (
      <section className="main-container py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
            Search Results
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            {listings.length > 0
              ? `${listings.length} properties found${searchParams?.country ? ` in ${searchParams.country}` : ""}`
              : "No properties match your search"}
          </p>
        </div>

        {listings.length === 0 ? (
          <EmptyState
            title="No listings match your search"
            subtitle="Try adjusting your filters or search a different location."
            showReset
          />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {listings.map((listing) => (
              <ListingCard
                key={listing.id}
                data={listing}
                hasFavorited={favorites.includes(listing.id)}
              />
            ))}
            {nextCursor && (
              <Suspense fallback={<ListingSkeleton />}>
                <LoadMore
                  nextCursor={nextCursor}
                  fnArgs={searchParams}
                  queryFn={getListings}
                  queryKey={["listings", searchParams]}
                  favorites={favorites}
                />
              </Suspense>
            )}
          </div>
        )}
      </section>
    );
  }

  /* ─── Full home page (no filters) ─── */
  return (
    <>
      {/* 1. Hero — always visible */}
      <Hero />

      {/* 2. Featured Destinations — always visible */}
      <FeaturedDestinations />

      {/* 3. How It Works — always visible */}
      <HowItWorks />

      {/* 4. Category Showcase — always visible */}
      <CategoryShowcase />

      {/* 5. Live listings grid (if any exist) */}
      {listings.length > 0 && (
        <section className="main-container py-12">
          <div className="flex items-end justify-between mb-6">
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400 mb-2">
                Live Properties
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">
                Available Now
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                {listings.length}+ verified stays ready to book
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {listings.map((listing) => (
              <ListingCard
                key={listing.id}
                data={listing}
                hasFavorited={favorites.includes(listing.id)}
              />
            ))}
            {nextCursor && (
              <Suspense fallback={<ListingSkeleton />}>
                <LoadMore
                  nextCursor={nextCursor}
                  fnArgs={searchParams}
                  queryFn={getListings}
                  queryKey={["listings", searchParams]}
                  favorites={favorites}
                />
              </Suspense>
            )}
          </div>
        </section>
      )}

      {/* 6. Testimonials — always visible */}
      <Testimonials />

      {/* 7. Newsletter CTA — always visible */}
      <NewsletterCTA />
    </>
  );
};

export default Home;
