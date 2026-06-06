import React from "react";
import { AiFillHeart } from "react-icons/ai";

import EmptyState from "@/components/EmptyState";
import ListingCard from "@/components/ListingCard";
import Heading from "@/components/Heading";

import { getCurrentUser } from "@/services/user";
import { getFavoriteListings } from "@/services/favorite";

const FavoritesPage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <EmptyState
        title="Sign in required"
        subtitle="Please log in to view your saved favourites."
      />
    );
  }

  const favorites = await getFavoriteListings();

  if (favorites.length === 0) {
    return (
      <div className="main-container py-12">
        <Heading
          title="Saved Favourites"
          subtitle="Properties you've hearted will appear here."
          backBtn
        />
        <div className="mt-16 flex flex-col items-center justify-center gap-4 text-center">
          <div className="w-20 h-20 rounded-full bg-rose-50 dark:bg-rose-900/20 flex items-center justify-center">
            <AiFillHeart size={36} className="text-rose-300" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">
            No favourites yet
          </h3>
          <p className="text-slate-500 dark:text-slate-400 max-w-sm text-sm leading-relaxed">
            Start exploring and tap the heart icon on any property to save it
            here for later. Your travel wishlist starts here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="main-container py-8">
      <div className="mb-8">
        <Heading
          title={`Saved Favourites (${favorites.length})`}
          subtitle="Your personal collection of dream stays."
          backBtn
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
        {favorites.map((listing) => (
          <ListingCard key={listing.id} data={listing} hasFavorited />
        ))}
      </div>
    </section>
  );
};

export default FavoritesPage;
