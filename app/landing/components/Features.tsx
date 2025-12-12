"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import {
  Search,
  Filter,
  MonitorPlay,
  Zap,
  Moon,
  LayoutGrid,
  MousePointer2,
} from "lucide-react";
import { MouseEvent } from "react";

const features = [
  {
    icon: Search,
    title: "Instant Search",
    description:
      "Lightning-fast search across movies, TV shows, and actors with real-time results.",
    className: "md:col-span-2",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    icon: Filter,
    title: "Smart Filtering",
    description:
      "Deep dive into our catalog with filters for genre, year, rating, and more.",
    className: "md:col-span-1",
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    icon: MonitorPlay,
    title: "Trailer Support",
    description: "Watch official trailers and teasers directly within the app.",
    className: "md:col-span-1",
    gradient: "from-red-500/20 to-orange-500/20",
  },
  {
    icon: Zap,
    title: "Static & Fast",
    description:
      "Built with Next.js SSG/ISR for instant page loads and SEO optimization.",
    className: "md:col-span-2",
    gradient: "from-yellow-500/20 to-amber-500/20",
  },
  {
    icon: Moon,
    title: "Dark Mode",
    description: "Easy on the eyes with a fully integrated dark mode support.",
    className: "md:col-span-1",
    gradient: "from-zinc-500/20 to-slate-500/20",
  },
  {
    icon: LayoutGrid,
    title: "Responsive Design",
    description:
      "A seamless experience across all devices, from mobile to desktop.",
    className: "md:col-span-1",
    gradient: "from-green-500/20 to-emerald-500/20",
  },
  {
    icon: MousePointer2,
    title: "Interactive UI",
    description:
      "Engaging micro-interactions and smooth animations powered by Framer Motion.",
    className: "md:col-span-1",
    gradient: "from-indigo-500/20 to-violet-500/20",
  },
];

function FeatureCard({ feature }: { feature: (typeof features)[0] }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onMouseMove={handleMouseMove}
      className={`group relative rounded-3xl border border-border bg-card/50 px-8 py-10 overflow-hidden ${feature.className}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.1),
              transparent 80%
            )
          `,
        }}
      />

      {/* Glow Effect */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl`}
      />

      <div className="relative z-10">
        <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-background/80 shadow-sm ring-1 ring-border group-hover:scale-110 transition-transform duration-300">
          <feature.icon className="h-6 w-6 text-foreground" />
        </div>
        <h3 className="mb-3 text-2xl font-bold text-foreground tracking-tight">
          {feature.title}
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function Features() {
  return (
    <section className="py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
            Crafted for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Cinema Lovers
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            A complete toolkit for movie enthusiasts, built with modern web
            technologies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
