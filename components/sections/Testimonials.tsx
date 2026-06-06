"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AiFillStar } from "react-icons/ai";
import { MdFormatQuote, MdChevronLeft, MdChevronRight } from "react-icons/md";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah Mitchell",
    location: "New York, USA",
    avatar: "SM",
    avatarBg: "bg-rose-500",
    rating: 5,
    date: "December 2024",
    stay: "Tuscany Villa, Italy",
    text: "Absolutely breathtaking experience. The villa was exactly as described — surrounded by vineyards with a stunning view of rolling hills. GlobalHaven's verification process gave us full confidence, and our host Marco was incredibly welcoming. This is the only way I'll travel from now on.",
  },
  {
    id: 2,
    name: "James & Rachel Thornton",
    location: "London, UK",
    avatar: "JR",
    avatarBg: "bg-primary-600",
    rating: 5,
    date: "November 2024",
    stay: "Penthouse, Tokyo, Japan",
    text: "We chose GlobalHaven for our 10th anniversary trip to Tokyo and it was the best decision. The penthouse had floor-to-ceiling views of the cityscape and the host left us a personalised guide to local hidden gems. The booking process was seamless and the 24/7 support team resolved a minor issue in minutes.",
  },
  {
    id: 3,
    name: "Luisa Fernandez",
    location: "Barcelona, Spain",
    avatar: "LF",
    avatarBg: "bg-emerald-600",
    rating: 5,
    date: "October 2024",
    stay: "Castle Suite, Bavaria, Germany",
    text: "I never imagined I'd spend a weekend in a real medieval castle! GlobalHaven had over 12 options for castle stays in Germany alone. The listing photos were accurate, the amenities were modern but the character was pure history. Our friends couldn't believe it when we showed them the photos.",
  },
  {
    id: 4,
    name: "David Park",
    location: "Seoul, South Korea",
    avatar: "DP",
    avatarBg: "bg-violet-600",
    rating: 5,
    date: "September 2024",
    stay: "Beach Cottage, Amalfi Coast, Italy",
    text: "Booked a last-minute stay on the Amalfi Coast and GlobalHaven delivered a gem — a stone cottage literally steps from the water with the most incredible terrace. The price was competitive and the host communications were prompt. I've recommended GlobalHaven to everyone in my office.",
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? TESTIMONIALS.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === TESTIMONIALS.length - 1 ? 0 : c + 1));

  return (
    <section className="bg-slate-50 dark:bg-dark-card/50 py-16 md:py-20">
      <div className="main-container">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400 mb-3">
            Guest Reviews
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-4">
            Loved by Travellers Everywhere
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-base">
            Don't take our word for it — here's what real guests say about their
            GlobalHaven experiences.
          </p>
        </div>

        {/* Desktop: 2 visible cards */}
        <div className="hidden md:grid md:grid-cols-2 gap-6 mb-8">
          {TESTIMONIALS.slice(0, 2).map((t, i) => (
            <TestimonialCard key={t.id} testimonial={t} delay={i * 0.1} />
          ))}
        </div>
        <div className="hidden md:grid md:grid-cols-2 gap-6">
          {TESTIMONIALS.slice(2, 4).map((t, i) => (
            <TestimonialCard key={t.id} testimonial={t} delay={i * 0.1 + 0.2} />
          ))}
        </div>

        {/* Mobile: carousel */}
        <div className="md:hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
            >
              <TestimonialCard testimonial={TESTIMONIALS[current]} delay={0} />
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-between mt-4">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-slate-200 dark:border-dark-border flex items-center justify-center hover:bg-slate-100 dark:hover:bg-dark-border transition-colors"
            >
              <MdChevronLeft size={20} className="text-slate-600 dark:text-slate-400" />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all duration-200 ${
                    i === current
                      ? "w-6 bg-primary-600"
                      : "w-1.5 bg-slate-300 dark:bg-dark-border"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-slate-200 dark:border-dark-border flex items-center justify-center hover:bg-slate-100 dark:hover:bg-dark-border transition-colors"
            >
              <MdChevronRight size={20} className="text-slate-600 dark:text-slate-400" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({
  testimonial,
  delay,
}: {
  testimonial: (typeof TESTIMONIALS)[0];
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="bg-white dark:bg-dark-card rounded-2xl p-6 border border-slate-100 dark:border-dark-border shadow-card hover:shadow-card-hover transition-shadow duration-300 flex flex-col gap-4"
  >
    {/* Quote icon */}
    <MdFormatQuote size={32} className="text-primary-200 dark:text-primary-800 -mb-2" />

    {/* Stars */}
    <div className="flex gap-0.5">
      {Array.from({ length: testimonial.rating }).map((_, i) => (
        <AiFillStar key={i} size={14} className="text-amber-400" />
      ))}
    </div>

    {/* Text */}
    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed flex-1">
      &ldquo;{testimonial.text}&rdquo;
    </p>

    {/* Stay tag */}
    <div className="inline-flex items-center gap-1.5 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-xs font-semibold px-3 py-1 rounded-full self-start">
      <span>Stayed at:</span>
      <span>{testimonial.stay}</span>
    </div>

    {/* Author */}
    <div className="flex items-center gap-3 pt-2 border-t border-slate-100 dark:border-dark-border">
      <div
        className={`w-10 h-10 rounded-full ${testimonial.avatarBg} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}
      >
        {testimonial.avatar}
      </div>
      <div>
        <p className="font-bold text-slate-900 dark:text-slate-100 text-sm">
          {testimonial.name}
        </p>
        <p className="text-slate-400 dark:text-slate-500 text-xs">
          {testimonial.location} · {testimonial.date}
        </p>
      </div>
    </div>
  </motion.div>
);

export default Testimonials;
