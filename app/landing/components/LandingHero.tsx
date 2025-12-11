"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LandingHero() {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center">
      {/* BG Image */}
      <Image
        src="/landingpage.png"
        alt="Featured Movie"
        fill
        className="object-cover object-center scale-105"
        priority
      />

      {/* Dark Overlay for Contrast */}
      <div className="absolute inset-0 bg-black/60" />
      
      {/* Gradient Overlays for Depth and Legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-black/40 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 md:px-12 flex flex-col justify-center h-full">
        <div className="max-w-4xl space-y-8">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-6xl md:text-8xl font-black tracking-tighter text-white drop-shadow-2xl leading-[1.1]"
          >
            Discover Movies <br />
            <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              & TV Shows
            </span>
          </motion.h1>

          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl font-medium leading-relaxed drop-shadow-lg">
            Explore popular titles, trending charts, and deep details powered by
            curated datasets.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="pt-6"
          >
            <Link
              href="/home"
              className="group relative inline-flex h-16 items-center justify-center rounded-full bg-primary px-12 text-xl font-bold text-white transition-all hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(93,162,255,0.6)]"
            >
              <span className="mr-2">Start Browsing</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
