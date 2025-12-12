"use client";

import { motion } from "framer-motion";
import {
  Search,
  Filter,
  MonitorPlay,
  Zap,
  Moon,
  LayoutGrid,
} from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Instant Search",
    description:
      "Lightning-fast search across movies, TV shows, and actors with real-time results.",
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    icon: Filter,
    title: "Smart Filtering",
    description:
      "Deep dive into our catalog with filters for genre, year, rating, and more.",
    color: "bg-purple-500/10 text-purple-500",
  },
  {
    icon: MonitorPlay,
    title: "Trailer Support",
    description: "Watch official trailers and teasers directly within the app.",
    color: "bg-red-500/10 text-red-500",
  },
  {
    icon: Zap,
    title: "Static & Fast",
    description:
      "Built with Next.js SSG/ISR for instant page loads and SEO optimization.",
    color: "bg-yellow-500/10 text-yellow-500",
  },
  {
    icon: Moon,
    title: "Dark Mode",
    description: "Easy on the eyes with a fully integrated dark mode support.",
    color: "bg-zinc-500/10 text-zinc-500",
  },
  {
    icon: LayoutGrid,
    title: "Responsive Design",
    description:
      "A seamless experience across all devices, from mobile to desktop.",
    color: "bg-green-500/10 text-green-500",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Everything you need to <br />
            <span className="text-primary">explore cinema</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            A complete toolkit for movie lovers, built with modern web
            technologies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-8 rounded-3xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5"
            >
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${feature.color} group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
