"use client";
import React from "react";
import { motion } from "framer-motion";
import { MdSearch, MdBookOnline, MdLuggage } from "react-icons/md";
import { TbArrowRight } from "react-icons/tb";

const STEPS = [
  {
    step: "01",
    icon: MdSearch,
    title: "Search & Discover",
    description:
      "Browse thousands of verified properties across 150+ countries. Filter by category, dates, price, and amenities to find your ideal stay.",
    color: "bg-primary-50 dark:bg-primary-900/20",
    iconColor: "text-primary-600 dark:text-primary-400",
    borderColor: "border-primary-200 dark:border-primary-800",
  },
  {
    step: "02",
    icon: MdBookOnline,
    title: "Book Securely",
    description:
      "Reserve instantly with our secure payment system. Your payment is only released to the host after check-in, so you're always protected.",
    color: "bg-violet-50 dark:bg-violet-900/20",
    iconColor: "text-violet-600 dark:text-violet-400",
    borderColor: "border-violet-200 dark:border-violet-800",
  },
  {
    step: "03",
    icon: MdLuggage,
    title: "Pack & Enjoy",
    description:
      "Check in seamlessly with your host, settle into your unique home, and enjoy a personalised travel experience you won't find in any hotel.",
    color: "bg-emerald-50 dark:bg-emerald-900/20",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    borderColor: "border-emerald-200 dark:border-emerald-800",
  },
];

const HowItWorks = () => {
  return (
    <section className="main-container py-16 md:py-20">
      {/* Section header */}
      <div className="text-center mb-12">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400 mb-3">
          Simple Process
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-4">
          How GlobalHaven Works
        </h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-base">
          From search to stay, we've made the whole process simple, secure, and
          stress-free — so you can focus on the adventure.
        </p>
      </div>

      {/* Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        {/* Connector lines (desktop only) */}
        <div className="hidden md:block absolute top-[52px] left-[calc(16.67%+40px)] right-[calc(16.67%+40px)] h-px border-t-2 border-dashed border-slate-200 dark:border-dark-border z-0" />

        {STEPS.map((step, index) => (
          <motion.div
            key={step.step}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="relative z-10"
          >
            <div className={`rounded-2xl border ${step.borderColor} ${step.color} p-6 h-full flex flex-col items-start gap-4`}>
              {/* Step number + icon */}
              <div className="flex items-center gap-3 w-full">
                <div className={`w-14 h-14 rounded-2xl bg-white dark:bg-dark-card shadow-sm flex items-center justify-center flex-shrink-0 border ${step.borderColor}`}>
                  <step.icon size={26} className={step.iconColor} />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                    Step {step.step}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
                  {step.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>

            {/* Mobile arrow connector */}
            {index < STEPS.length - 1 && (
              <div className="flex justify-center my-3 md:hidden">
                <TbArrowRight
                  size={20}
                  className="text-slate-300 dark:text-slate-600 rotate-90"
                />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
