import React from "react";
import Link from "next/link";
import { TbWorld } from "react-icons/tb";
import { FaTwitter, FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 dark:bg-dark-card border-t border-slate-200 dark:border-dark-border mt-auto">
      <div className="main-container py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <TbWorld className="text-white" size={18} />
              </div>
              <span className="font-bold text-xl text-slate-900 dark:text-white">
                Global<span className="text-primary-600 dark:text-primary-400">Haven</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
              Discover extraordinary homes across the globe. Your perfect stay, anywhere in the world.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-8 h-8 rounded-full bg-slate-200 dark:bg-dark-border flex items-center justify-center hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors duration-200">
                <FaTwitter size={14} className="text-slate-600 dark:text-slate-400" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-200 dark:bg-dark-border flex items-center justify-center hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors duration-200">
                <FaInstagram size={14} className="text-slate-600 dark:text-slate-400" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-200 dark:bg-dark-border flex items-center justify-center hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors duration-200">
                <FaFacebook size={14} className="text-slate-600 dark:text-slate-400" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-200 dark:bg-dark-border flex items-center justify-center hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors duration-200">
                <FaYoutube size={14} className="text-slate-600 dark:text-slate-400" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-3 text-sm uppercase tracking-wide">
              Explore
            </h4>
            <ul className="space-y-2">
              {["Beach Homes", "Mountain Cabins", "City Apartments", "Luxury Villas", "Countryside Retreats"].map((item) => (
                <li key={item}>
                  <Link href="/" className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-150">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-3 text-sm uppercase tracking-wide">
              Destinations
            </h4>
            <ul className="space-y-2">
              {[
                { label: "🇺🇸 United States", href: "/?country=United+States" },
                { label: "🇮🇹 Italy", href: "/?country=Italy" },
                { label: "🇩🇪 Germany", href: "/?country=Germany" },
                { label: "🇷🇺 Russia", href: "/?country=Russia" },
                { label: "🇫🇷 France", href: "/?country=France" },
                { label: "🇯🇵 Japan", href: "/?country=Japan" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-150">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-3 text-sm uppercase tracking-wide">
              Support
            </h4>
            <ul className="space-y-2">
              {["Help Center", "Safety Information", "Cancellation Options", "Report a Concern", "Accessibility", "Terms of Service"].map((item) => (
                <li key={item}>
                  <Link href="/" className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-150">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-dark-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-400 dark:text-slate-500">
            © {currentYear} GlobalHaven, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xs text-slate-400 dark:text-slate-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/" className="text-xs text-slate-400 dark:text-slate-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              Terms of Service
            </Link>
            <Link href="/" className="text-xs text-slate-400 dark:text-slate-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              Cookie Settings
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
