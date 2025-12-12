"use client";

import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-24 relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-primary/5" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background" />

      <div className="container mx-auto px-4 relative z-10 text-center space-y-8">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
          Ready to start watching?
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Dive into our extensive collection of movies and TV shows. No
          subscription required.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/home"
            className="inline-flex h-14 items-center justify-center rounded-full bg-primary px-8 text-lg font-semibold text-primary-foreground transition-transform hover:scale-105 hover:bg-primary/90"
          >
            Enter CineVault
          </Link>
        </div>
      </div>
    </section>
  );
}
