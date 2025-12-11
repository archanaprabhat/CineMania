"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Film, Tv, Users } from "lucide-react"

interface StatsProps {
  movieCount: number
  showCount: number
  actorCount: number
}

export default function Stats({ movieCount, showCount, actorCount }: StatsProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const stats = [
    { label: "Movies", value: movieCount, icon: Film, color: "text-blue-400" },
    { label: "TV Shows", value: showCount, icon: Tv, color: "text-purple-400" },
    { label: "Actors", value: actorCount, icon: Users, color: "text-green-400" },
  ]

  return (
    <section className="py-12 md:py-24 bg-card border-y border-border relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-50" />
      
      <div ref={ref} className="container mx-auto px-4 relative z-10">
        <div className="flex flex-nowrap overflow-x-auto snap-x snap-mandatory gap-4 pb-4 md:grid md:grid-cols-3 md:gap-12 md:pb-0 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex-none w-[40vw] md:w-auto snap-center flex flex-col items-center text-center space-y-2 group first:pl-4 last:pr-4 md:first:pl-0 md:last:pr-0"
            >
              <div className={`p-4 rounded-2xl bg-accent border border-border mb-4 group-hover:scale-110 transition-transform duration-300 ${stat.color}`}>
                <stat.icon className="h-6 w-6 md:h-8 md:w-8" />
              </div>
              <h3 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">
                {stat.value}
              </h3>
              <p className="text-xs md:text-base text-muted-foreground font-medium uppercase tracking-wider">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
