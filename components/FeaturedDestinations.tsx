"use client";
import React from "react";
import Link from "next/link";
import NextImage from "next/image";
import { motion } from "framer-motion";
import { AiFillStar } from "react-icons/ai";
import { MdArrowForward } from "react-icons/md";
import { FEATURED_DESTINATIONS } from "@/utils/constants";

const FeaturedDestinations = () => {
  const [featured, ...rest] = FEATURED_DESTINATIONS;
  const secondary = rest.slice(0, 3);
  const grid = rest.slice(3, 7);

  return (
    <section className="main-container py-16 md:py-20">
      {/* Header */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400 mb-3">
            Worldwide
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100">
            Top Destinations
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-base mt-2 max-w-lg">
            Handpicked by our team — these are the world&apos;s most sought-after locations for unique stays.
          </p>
        </div>
        <Link
          href="/"
          className="hidden md:flex items-center gap-1.5 text-sm font-bold text-primary-600 dark:text-primary-400 hover:gap-3 transition-all duration-200 group"
        >
          View all
          <MdArrowForward size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Large featured layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        {/* Hero destination card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2"
        >
          <Link
            href={`/?country=${encodeURIComponent(featured.country)}`}
            className="group relative block overflow-hidden rounded-2xl aspect-[16/9] lg:aspect-[4/3] cursor-pointer"
          >
            <NextImage
              src={featured.image}
              alt={featured.country}
              fill
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Rating badge */}
            <div className="absolute top-4 right-4">
              <div className="flex items-center gap-1 bg-white/90 dark:bg-dark-card/90 backdrop-blur-md rounded-full px-3 py-1.5 shadow-lg">
                <AiFillStar size={13} className="text-amber-400" />
                <span className="text-[12px] font-bold text-slate-800 dark:text-slate-200">4.9</span>
              </div>
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{featured.flag}</span>
                <span className="text-white/70 text-xs font-semibold uppercase tracking-widest">
                  {featured.listings} properties
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-1 drop-shadow-lg">
                {featured.country}
              </h3>
              <p className="text-white/80 text-sm">{featured.description}</p>
              <div className="mt-3 inline-flex items-center gap-2 text-xs font-bold text-white bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-3 py-1.5 group-hover:bg-white/30 transition-colors">
                Explore →
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Three stacked right cards */}
        <div className="flex flex-col gap-4">
          {secondary.map((dest, i) => (
            <motion.div
              key={dest.country}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
            >
              <Link
                href={`/?country=${encodeURIComponent(dest.country)}`}
                className="group relative flex items-center gap-4 rounded-xl overflow-hidden bg-white dark:bg-dark-card border border-slate-100 dark:border-dark-border hover:shadow-card-hover transition-all duration-200 p-3 cursor-pointer"
              >
                <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <NextImage
                    src={dest.image}
                    alt={dest.country}
                    fill
                    sizes="80px"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    unoptimized
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-base">{dest.flag}</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100 text-sm truncate">
                      {dest.country}
                    </span>
                  </div>
                  <p className="text-slate-400 dark:text-slate-500 text-xs truncate">{dest.description}</p>
                  <p className="text-primary-600 dark:text-primary-400 text-xs font-bold mt-1">
                    {dest.listings} stays
                  </p>
                </div>
                <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/20 rounded-lg px-2 py-1 flex-shrink-0">
                  <AiFillStar size={11} className="text-amber-400" />
                  <span className="text-[11px] font-bold text-amber-700 dark:text-amber-300">
                    4.{8 - (i % 3)}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom 4-column grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {grid.map((dest, i) => (
          <motion.div
            key={dest.country}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <Link
              href={`/?country=${encodeURIComponent(dest.country)}`}
              className="group relative block overflow-hidden rounded-xl aspect-[3/2] cursor-pointer"
            >
              <NextImage
                src={dest.image}
                alt={dest.country}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-3">
                <div className="flex items-center gap-1.5">
                  <span className="text-base">{dest.flag}</span>
                  <span className="font-bold text-white text-sm">{dest.country}</span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedDestinations;
