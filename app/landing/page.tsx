import { getMovies, getShows, getActors } from "@/utils/fetchData";
import { getLandingData } from "@/utils/landingHelpers";

import LandingHero from "./components/LandingHero";
import Stats from "./components/Stats";
import PosterMarquee from "./components/PosterMarquee";
import Features from "./components/Features";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export const revalidate = 86400; // 24 hrs (ISR)

export const metadata = {
  title: "CineVault – Discover Movies & TV Shows",
  description:
    "A beautifully designed movie & TV show directory built with Next.js, featuring search, filters, dark mode, and dynamic pages.",
  openGraph: {
    title: "CineVault",
    description: "Discover Movies & TV Shows",
    images: ["/og-image.png"],
  },
};

export default async function LandingPage() {
  const [movies, shows, actors] = await Promise.all([
    getMovies(),
    getShows(),
    getActors(),
  ]);

  const { posters } = getLandingData({ movies, shows });

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white">

      <Stats
        movieCount={movies.length}
        showCount={shows.length}
        actorCount={actors.length}
      />

      <PosterMarquee posters={posters} />

      <Features />

      <CTA />

      <Footer />
    </main>
  );
}
