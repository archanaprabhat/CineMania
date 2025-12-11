"use client"

import { useState, useEffect } from "react"
import MovieCard from "@/components/MovieCard"
import SearchAndFilterBar from "@/components/SearchAndFilterBar"
import { Movie } from "@/types/movie"
import { motion } from "framer-motion"

interface MovieListingProps {
  initialMovies: Movie[]
}

export default function MovieListing({ initialMovies }: MovieListingProps) {
  const [movies] = useState<Movie[]>(initialMovies)
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>(initialMovies)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("all")
  const [sortOption, setSortOption] = useState("popular")

  useEffect(() => {
    let result = [...movies]

    // Search
    if (searchQuery) {
      result = result.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Genre Filter
    if (selectedGenre && selectedGenre !== "all") {
      result = result.filter((movie) => 
        movie.genre_ids.includes(parseInt(selectedGenre))
      )
    }

    // Sort
    if (sortOption === "popular") {
      result.sort((a, b) => b.popularity - a.popularity)
    } else if (sortOption === "rating") {
      result.sort((a, b) => b.vote_average - a.vote_average)
    } else if (sortOption === "newest") {
      result.sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime())
    }

    setFilteredMovies(result)
  }, [movies, searchQuery, selectedGenre, sortOption])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Movies</h1>
        <SearchAndFilterBar
          onSearch={setSearchQuery}
          onFilter={setSelectedGenre}
          onSort={setSortOption}
        />
      </div>

      <motion.div 
        className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 lg:gap-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {filteredMovies.map((movie) => (
          <motion.div key={movie.id} variants={item}>
            <MovieCard movie={movie} />
          </motion.div>
        ))}
      </motion.div>
      
      {filteredMovies.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No movies found matching your criteria.
        </div>
      )}
    </div>
  )
}
