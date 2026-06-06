"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  MdLocationOn,
  MdCalendarToday,
  MdPeople,
  MdSearch,
  MdVerified,
  MdStar,
} from "react-icons/md";
import { TbShieldCheck, TbHeadset } from "react-icons/tb";

const POPULAR_SEARCHES = [
  { label: "🇮🇹 Tuscany", country: "Italy" },
  { label: "🇺🇸 New York", country: "United States" },
  { label: "🇯🇵 Tokyo", country: "Japan" },
  { label: "🇫🇷 Paris", country: "France" },
  { label: "🇩🇪 Bavaria", country: "Germany" },
  { label: "🇪🇸 Barcelona", country: "Spain" },
];

const STATS = [
  { value: "2M+", label: "Happy Guests" },
  { value: "150+", label: "Countries" },
  { value: "100K+", label: "Properties" },
  { value: "4.9★", label: "Avg. Rating" },
];

const Hero = () => {
  const router = useRouter();
  const [location, setLocation] = useState("");

  const handleSearch = (country?: string) => {
    const q = country || location;
    if (q.trim()) {
      router.push(`/?country=${encodeURIComponent(q.trim())}`);
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-700 via-primary-600 to-violet-600 dark:from-slate-900 dark:via-primary-900 dark:to-violet-900">
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Floating decorative blobs */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-violet-400/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl" />

      <div className="relative main-container py-20 md:py-28">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-6"
          >
            <MdVerified className="text-amber-300" size={14} />
            Trusted by 2 million travellers worldwide
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight mb-5"
          >
            Discover Your{" "}
            <span className="relative inline-block">
              <span className="text-amber-300">Perfect Stay</span>
              <svg
                className="absolute -bottom-1 left-0 w-full"
                viewBox="0 0 200 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 5.5C47 2 100.5 1 199 5.5"
                  stroke="#fbbf24"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <br />
            Anywhere in the World
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/80 text-lg md:text-xl mb-8 leading-relaxed"
          >
            From Italian villas to Tokyo penthouses — rent unique homes from
            local hosts in 150+ countries. Every stay is verified and every
            host is trusted.
          </motion.p>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white dark:bg-dark-card rounded-2xl shadow-2xl p-2 flex flex-col sm:flex-row gap-2 mb-5"
          >
            <div className="flex-1 flex items-center gap-3 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-dark-bg">
              <MdLocationOn size={20} className="text-primary-600 flex-shrink-0" />
              <input
                type="text"
                placeholder="Where do you want to go?"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="flex-1 bg-transparent text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 text-sm font-medium outline-none"
              />
            </div>
            <div className="hidden sm:flex items-center gap-3 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-dark-bg">
              <MdCalendarToday size={18} className="text-primary-600 flex-shrink-0" />
              <span className="text-slate-400 dark:text-slate-500 text-sm">Any week</span>
            </div>
            <div className="hidden sm:flex items-center gap-3 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-dark-bg">
              <MdPeople size={18} className="text-primary-600 flex-shrink-0" />
              <span className="text-slate-400 dark:text-slate-500 text-sm">Add guests</span>
            </div>
            <button
              onClick={() => handleSearch()}
              className="flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors duration-200 text-sm whitespace-nowrap"
            >
              <MdSearch size={18} />
              <span>Search</span>
            </button>
          </motion.div>

          {/* Popular searches */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap items-center justify-center gap-2 mb-10"
          >
            <span className="text-white/60 text-xs font-medium">Popular:</span>
            {POPULAR_SEARCHES.map((item) => (
              <button
                key={item.label}
                onClick={() => handleSearch(item.country)}
                className="text-xs font-semibold text-white/90 hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-full px-3 py-1 transition-all duration-150"
              >
                {item.label}
              </button>
            ))}
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-4 gap-4 pt-8 border-t border-white/20"
          >
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl md:text-3xl font-extrabold text-white">{stat.value}</p>
                <p className="text-white/60 text-xs font-medium mt-0.5">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom trust bar */}
      <div className="relative bg-white/10 backdrop-blur-sm border-t border-white/10">
        <div className="main-container py-3 flex flex-wrap items-center justify-center gap-6 text-white/80">
          <div className="flex items-center gap-2 text-xs font-semibold">
            <TbShieldCheck size={16} className="text-emerald-300" />
            Secure & verified bookings
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold">
            <MdStar size={16} className="text-amber-300" />
            4.9 average guest rating
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold">
            <TbHeadset size={16} className="text-blue-300" />
            24/7 customer support
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold">
            <MdVerified size={16} className="text-primary-300" />
            Host verification program
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
