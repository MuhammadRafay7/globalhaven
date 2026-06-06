"use client";
import React, { useLayoutEffect } from "react";
import Skeleton from "react-loading-skeleton";

const Loading = () => {
  useLayoutEffect(() => {
    if (typeof window === undefined) return;
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="main-container">
      <div className="flex flex-col gap-6">
        <div className="text-start">
          <Skeleton width="124px" height="22px" className="mb-2" baseColor="var(--bg-secondary)" />
          <Skeleton width="148px" height="18px" baseColor="var(--bg-secondary)" />
        </div>
        <Skeleton
          className="!w-full md:!h-[480px] sm:!h-[320px] !h-[260px]"
          borderRadius="16px"
          baseColor="var(--bg-secondary)"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
        <div className="col-span-4 flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <div className="flex flex-row items-center gap-2">
              <Skeleton width="28px" height="28px" circle baseColor="var(--bg-secondary)" />
              <Skeleton width="120px" height="18px" baseColor="var(--bg-secondary)" />
            </div>
            <div className="flex flex-row items-center gap-4">
              <Skeleton width="64px" height="16px" baseColor="var(--bg-secondary)" />
              <Skeleton width="64px" height="16px" baseColor="var(--bg-secondary)" />
              <Skeleton width="64px" height="16px" baseColor="var(--bg-secondary)" />
            </div>
          </div>
          <Skeleton width="100%" height="120px" borderRadius="12px" baseColor="var(--bg-secondary)" />
        </div>

        <div className="order-first mb-10 md:order-last md:col-span-3">
          <Skeleton width="100%" height="380px" borderRadius="16px" baseColor="var(--bg-secondary)" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
