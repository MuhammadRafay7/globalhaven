import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";

import "./globals.css";
import "react-loading-skeleton/dist/skeleton.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Provider";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GlobalHaven — World's Finest Vacation Rentals",
  description:
    "Discover extraordinary homes across the globe. From cozy Italian villas to modern NYC lofts, Russian dachas to German castles — find your perfect stay worldwide on GlobalHaven.",
  keywords: "vacation rentals, global travel, airbnb alternative, worldwide homes, holiday rentals",
  openGraph: {
    title: "GlobalHaven — World's Finest Vacation Rentals",
    description: "Discover extraordinary homes across the globe.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${nunito.className} bg-white dark:bg-dark-bg text-slate-900 dark:text-slate-100 transition-colors duration-300`}>
        <Providers>
          <Navbar />
          <main className="pb-0 md:pt-28 pt-24 min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
      <GoogleAnalytics gaId={process.env.GA_MEASUREMENT_ID || ""} />
    </html>
  );
}
