"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import throttle from "lodash.throttle";
import "swiper/css";

import CategoryBox from "./CategoryBox";
import { categories } from "@/utils/constants";
import { Category } from "@/types";

const Categories = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const params = useSearchParams();
  const pathname = usePathname();
  const category = params?.get("category");
  const isMainPage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    const throttledHandleScroll = throttle(handleScroll, 150);
    window.addEventListener("scroll", throttledHandleScroll);
    return () => window.removeEventListener("scroll", throttledHandleScroll);
  }, []);

  if (!isMainPage) return null;

  return (
    <div
      className={`transition-all duration-200 ${
        isScrolled
          ? "shadow-sm border-b border-slate-100 dark:border-dark-border bg-white/95 dark:bg-dark-bg/95"
          : "bg-white dark:bg-dark-bg"
      }`}
    >
      <Swiper
        slidesPerView="auto"
        pagination={{ clickable: true }}
        className="main-container mt-1 lg:!px-3 !px-2"
      >
        {categories.map((item: Category) => (
          <SwiperSlide className="max-w-fit" key={item.label}>
            <CategoryBox
              label={item.label}
              icon={item.icon}
              selected={category === item.label}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Categories;
