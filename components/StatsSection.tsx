"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Film, Tv, Users, Layers } from "lucide-react";

interface StatsSectionProps {
  movieCount: number;
  showCount: number;
  actorCount: number;
  genreCount: number;
}

export default function StatsSection({
  movieCount,
  showCount,
  actorCount,
  genreCount,
}: StatsSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { label: "Movies", value: movieCount, icon: Film, color: "text-blue-400" },
    { label: "TV Shows", value: showCount, icon: Tv, color: "text-purple-400" },
    {
      label: "Actors",
      value: actorCount,
      icon: Users,
      color: "text-green-400",
    },
    {
      label: "Genres",
      value: genreCount,
      icon: Layers,
      color: "text-yellow-400",
    },
  ];

  return (
    <section className="py-24 bg-zinc-950 border-y border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-50" />

      <div ref={ref} className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center space-y-2 group"
            >
              <div
                className={`p-4 rounded-2xl bg-white/5 border border-white/5 mb-4 group-hover:scale-110 transition-transform duration-300 ${stat.color}`}
              >
                <stat.icon className="h-8 w-8" />
              </div>
              <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                {stat.value}
              </h3>
              <p className="text-sm md:text-base text-gray-400 font-medium uppercase tracking-wider">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
