"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { MdEmail, MdCheckCircle } from "react-icons/md";
import { TbWorld } from "react-icons/tb";

const NewsletterCTA = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 to-violet-700 dark:from-primary-900 dark:to-violet-900 py-16 md:py-20">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/3" />

      <div className="relative main-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20 mb-6">
            <TbWorld size={28} className="text-white" />
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Get Exclusive Travel Deals
          </h2>
          <p className="text-white/75 text-base md:text-lg mb-8 leading-relaxed">
            Join 500,000+ travellers who receive weekly curated deals, hidden
            gems, and early access to new destinations — straight to their inbox.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="flex-1 flex items-center gap-3 bg-white/15 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3">
                <MdEmail size={18} className="text-white/60 flex-shrink-0" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 bg-transparent text-white placeholder-white/50 text-sm outline-none font-medium"
                />
              </div>
              <button
                type="submit"
                className="bg-white text-primary-700 font-bold px-6 py-3 rounded-xl hover:bg-white/90 transition-colors duration-200 text-sm whitespace-nowrap shadow-lg"
              >
                Get Deals →
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-3 bg-white/15 backdrop-blur-sm border border-white/20 rounded-xl px-6 py-4 max-w-md mx-auto"
            >
              <MdCheckCircle size={22} className="text-emerald-300" />
              <p className="text-white font-semibold text-sm">
                You&apos;re in! Check your inbox for a welcome gift.
              </p>
            </motion.div>
          )}

          <p className="text-white/40 text-xs mt-4">
            No spam, ever. Unsubscribe in one click at any time.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterCTA;
