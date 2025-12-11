"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface PosterMarqueeProps {
  posters: string[]
}

export default function PosterMarquee({ posters }: PosterMarqueeProps) {
  // Split posters into two rows
  const row1 = posters.slice(0, Math.ceil(posters.length / 2))
  const row2 = posters.slice(Math.ceil(posters.length / 2))

  return (
    <section className="py-24 bg-zinc-950 overflow-hidden space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
          Trending Now
        </h2>
        <p className="text-gray-400">
          See what the world is watching
        </p>
      </div>

      {/* Row 1 - Left to Right */}
      <div className="flex overflow-hidden relative">
        <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-zinc-950 to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-zinc-950 to-transparent z-10" />
        
        <motion.div
          className="flex gap-6 min-w-max"
          animate={{ x: [0, -1000] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {[...row1, ...row1, ...row1].map((poster, i) => (
            <div key={i} className="relative w-48 aspect-2/3 rounded-xl overflow-hidden shadow-2xl border border-white/10 opacity-80 hover:opacity-100 transition-opacity duration-300">
              <Image
                src={`https://image.tmdb.org/t/p/w300${poster}`}
                alt="Movie Poster"
                fill
                className="object-cover"
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Row 2 - Right to Left */}
      <div className="flex overflow-hidden relative">
        <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-zinc-950 to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-zinc-950 to-transparent z-10" />

        <motion.div
          className="flex gap-6 min-w-max"
          animate={{ x: [-1000, 0] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 35,
              ease: "linear",
            },
          }}
        >
          {[...row2, ...row2, ...row2].map((poster, i) => (
            <div key={i} className="relative w-48 aspect-2/3 rounded-xl overflow-hidden shadow-2xl border border-white/10 opacity-80 hover:opacity-100 transition-opacity duration-300">
              <Image
                src={`https://image.tmdb.org/t/p/w300${poster}`}
                alt="Movie Poster"
                fill
                className="object-cover"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
