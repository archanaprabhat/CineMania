"use client";

import { useWatchlist } from "@/context/WatchlistContext";
import MovieCard from "@/components/MovieCard";
import ShowCard from "@/components/ShowCard";
import { Movie, Show } from "@/types/movie";
import { motion } from "framer-motion";

export default function WatchlistPage() {
  const { watchlist } = useWatchlist();

  // Helper to reconstruct Movie/Show objects from WatchlistItem for the cards
  // Note: WatchlistItem has a subset of properties.
  // Ideally, cards should accept a subset or we should store more data.
  // For now, casting or mapping back. The cards mainly need title, poster_path, vote_average, release_date/first_air_date.

  const mapItemToProps = (item: any) => {
    // Create a compatible object for MovieCard/ShowCard
    // This is a bit of a hack since cards expect full Movie/Show objects,
    // but we only store essential data.
    // Ensuring optional fields don't crash the card.
    return {
      ...item,
      original_title: item.title,
      original_name: item.title,
      overview: "",
      genre_ids: [],
      vote_count: 0,
      popularity: 0,
    };
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">My Watchlist</h1>

      {watchlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="text-6xl mb-4">🍿</div>
          <h2 className="text-2xl font-semibold mb-2">
            Your watchlist is empty
          </h2>
          <p className="text-muted-foreground">
            Start adding movies and shows to track what you want to watch.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {watchlist.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {item.media_type === "movie" ? (
                <MovieCard movie={mapItemToProps(item) as Movie} />
              ) : (
                <ShowCard show={mapItemToProps(item) as Show} />
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
