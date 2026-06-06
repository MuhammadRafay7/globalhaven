"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  TbBeach, TbMountain, TbPool,
} from "react-icons/tb";
import {
  GiCastle, GiIsland, GiForestCamp,
} from "react-icons/gi";
import { FaSkiing } from "react-icons/fa";
import { IoDiamond } from "react-icons/io5";
import { MdOutlineVilla, MdOutlineCabin, MdOutlineLocationCity } from "react-icons/md";
import { BsSnow } from "react-icons/bs";

const CATEGORIES = [
  {
    label: "Beach",
    icon: TbBeach,
    gradient: "from-cyan-400 to-blue-500",
    bg: "bg-cyan-50 dark:bg-cyan-900/20",
    description: "Oceanfront escapes",
  },
  {
    label: "City",
    icon: MdOutlineLocationCity,
    gradient: "from-slate-400 to-slate-600",
    bg: "bg-slate-50 dark:bg-slate-800/30",
    description: "Urban apartments",
  },
  {
    label: "Countryside",
    icon: TbMountain,
    gradient: "from-emerald-400 to-green-600",
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
    description: "Rural retreats",
  },
  {
    label: "Castles",
    icon: GiCastle,
    gradient: "from-amber-400 to-orange-500",
    bg: "bg-amber-50 dark:bg-amber-900/20",
    description: "Historic estates",
  },
  {
    label: "Islands",
    icon: GiIsland,
    gradient: "from-teal-400 to-cyan-600",
    bg: "bg-teal-50 dark:bg-teal-900/20",
    description: "Private islands",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    gradient: "from-primary-400 to-violet-500",
    bg: "bg-primary-50 dark:bg-primary-900/20",
    description: "Designer homes",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    gradient: "from-blue-300 to-indigo-500",
    bg: "bg-blue-50 dark:bg-blue-900/20",
    description: "Slope-side lodges",
  },
  {
    label: "Lux",
    icon: IoDiamond,
    gradient: "from-rose-400 to-pink-600",
    bg: "bg-rose-50 dark:bg-rose-900/20",
    description: "Luxury villas",
  },
  {
    label: "Cabins",
    icon: MdOutlineCabin,
    gradient: "from-orange-400 to-red-500",
    bg: "bg-orange-50 dark:bg-orange-900/20",
    description: "Cozy woodland",
  },
  {
    label: "Pools",
    icon: TbPool,
    gradient: "from-sky-400 to-blue-600",
    bg: "bg-sky-50 dark:bg-sky-900/20",
    description: "Pool paradises",
  },
  {
    label: "Arctic",
    icon: BsSnow,
    gradient: "from-slate-300 to-blue-400",
    bg: "bg-slate-50 dark:bg-slate-800/30",
    description: "Northern lights stays",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    gradient: "from-lime-400 to-green-600",
    bg: "bg-lime-50 dark:bg-lime-900/20",
    description: "Wild & remote",
  },
];

const CategoryShowcase = () => {
  return (
    <section className="main-container py-16 md:py-20">
      <div className="text-center mb-12">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400 mb-3">
          Browse by Type
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-4">
          Every Kind of Stay, Covered
        </h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-base">
          Whether you crave a castle in Bavaria or a beachfront villa in Bali —
          we have the perfect property category waiting for you.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
        {CATEGORIES.map((cat, index) => (
          <motion.div
            key={cat.label}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: index * 0.04 }}
          >
            <Link
              href={`/?category=${encodeURIComponent(cat.label)}`}
              className={`group flex flex-col items-center gap-3 p-4 rounded-2xl border border-slate-100 dark:border-dark-border ${cat.bg} hover:shadow-card-hover hover:scale-[1.02] transition-all duration-200 cursor-pointer`}
            >
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center shadow-sm`}>
                <cat.icon size={22} className="text-white" />
              </div>
              <div className="text-center">
                <p className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                  {cat.label}
                </p>
                <p className="text-slate-400 dark:text-slate-500 text-xs mt-0.5 leading-tight">
                  {cat.description}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CategoryShowcase;
