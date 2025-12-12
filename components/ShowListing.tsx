"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ShowCard from "@/components/ShowCard";
import SearchAndFilterBar from "@/components/SearchAndFilterBar";
import { Show } from "@/types/movie";
import { motion } from "framer-motion";

interface ShowListingProps {
  initialShows: Show[];
}

export default function ShowListing({ initialShows }: ShowListingProps) {
  const searchParams = useSearchParams();
  const initialGenre = searchParams.get("genre") || "all";
  const initialQuery = searchParams.get("q") || "";

  const [shows] = useState<Show[]>(initialShows);
  const [filteredShows, setFilteredShows] = useState<Show[]>(initialShows);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedGenre, setSelectedGenre] = useState(initialGenre);
  const [sortOption, setSortOption] = useState("popular");
  const [selectedYear, setSelectedYear] = useState("all");
  const [minRating, setMinRating] = useState("0");

  useEffect(() => {
    let result = [...shows];

    // Search (Name or Actor)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (show) =>
          show.name.toLowerCase().includes(query) ||
          show.credits?.cast?.some((actor) =>
            actor.name.toLowerCase().includes(query),
          ),
      );
    }

    // Genre Filter
    if (selectedGenre && selectedGenre !== "all") {
      result = result.filter((show) =>
        show.genre_ids.includes(parseInt(selectedGenre)),
      );
    }

    // Year Filter
    if (selectedYear && selectedYear !== "all") {
      result = result.filter(
        (show) =>
          new Date(show.first_air_date).getFullYear().toString() ===
          selectedYear,
      );
    }

    // Min Rating Filter
    if (minRating && minRating !== "0") {
      result = result.filter(
        (show) => show.vote_average >= parseInt(minRating),
      );
    }

    // Sort
    if (sortOption === "popular") {
      result.sort((a, b) => b.popularity - a.popularity);
    } else if (sortOption === "rating") {
      result.sort((a, b) => b.vote_average - a.vote_average);
    } else if (sortOption === "newest") {
      result.sort(
        (a, b) =>
          new Date(b.first_air_date).getTime() -
          new Date(a.first_air_date).getTime(),
      );
    } else if (sortOption === "az") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredShows(result);
  }, [shows, searchQuery, selectedGenre, sortOption, selectedYear, minRating]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">TV Shows</h1>
        <SearchAndFilterBar
          onSearch={setSearchQuery}
          onFilter={setSelectedGenre}
          onSort={setSortOption}
          onYearChange={setSelectedYear}
          onRatingChange={setMinRating}
        />
      </div>

      <motion.div
        className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 lg:gap-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {filteredShows.map((show) => (
          <motion.div key={show.id} variants={item}>
            <ShowCard show={show} />
          </motion.div>
        ))}
      </motion.div>

      {filteredShows.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No shows found matching your criteria.
        </div>
      )}
    </div>
  );
}
