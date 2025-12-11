"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Play, Info } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function LandingHero() {
  return (
    <div className="relative h-screen w-full overflow-hidden flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/landingpage.png"
          alt="Hero Background"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient overlay to ensure text readability on the "darker side" (assuming left) */}
        <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/50 to-transparent" />
      </div>

      {/* Content - Aligned to the left (darker side) */}
      <div className="relative z-10 container mx-auto px-4 md:px-8">
        <div className="max-w-2xl space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white drop-shadow-2xl leading-tight">
              Discover Movies <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-purple-400">
                & TV Shows
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light max-w-xl">
              A fast, static directory built with Next.js. Explore a curated collection of cinematic masterpieces and binge-worthy series.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex items-center gap-4 pt-4"
          >
            <Link href="/home">
              <Button size="lg" className="h-14 px-8 rounded-full text-lg font-semibold bg-white text-black hover:bg-gray-200 gap-2 transition-transform hover:scale-105">
                <Play className="h-5 w-5 fill-black" />
                Start Browsing
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-px h-16 bg-linear-to-b from-transparent via-white/50 to-transparent" />
      </motion.div>
    </div>
  )
}
