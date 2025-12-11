import { getMovies } from "@/utils/fetchData"
import { Movie } from "@/types/movie"
import Image from "next/image"
import { Star, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import MovieCard from "@/components/MovieCard"
import genres from "@/data/genres.json"

export async function generateStaticParams() {
  const movies: Movie[] = await getMovies()
  return movies.map((movie) => ({
    id: movie.id.toString(),
  }))
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const movies: Movie[] = await getMovies()
  const movie = movies.find((m) => m.id.toString() === params.id)
  
  if (!movie) {
    return {
      title: "Movie Not Found",
    }
  }

  return {
    title: `${movie.title} - Netflix Clone`,
    description: movie.overview,
  }
}

export default async function MovieDetailPage({ params }: { params: { id: string } }) {
  const movies: Movie[] = await getMovies()
  const movie = movies.find((m) => m.id.toString() === params.id)

  if (!movie) {
    return <div>Movie not found</div>
  }

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null
  
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/placeholder-poster.png"

  // Get similar movies (same genre)
  const similarMovies = movies
    .filter((m) => m.id !== movie.id && m.genre_ids.some((g) => movie.genre_ids.includes(g)))
    .slice(0, 6)
  
  const getGenreName = (id: number) => {
    return genres.find((g) => g.id === id)?.name || "Unknown"
  }

  return (
    <div className="min-h-screen bg-background pb-12">
      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[70vh] w-full">
        {backdropUrl && (
          <Image
            src={backdropUrl}
            alt={movie.title}
            fill
            className="object-cover brightness-[0.4]"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        
        <div className="container mx-auto px-4 h-full flex items-end pb-12 relative z-10">
          <div className="flex flex-col md:flex-row gap-8 items-end">
            <div className="hidden md:block relative w-64 aspect-[2/3] rounded-lg overflow-hidden shadow-2xl border border-white/10">
              <Image
                src={posterUrl}
                alt={movie.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-4 max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
                {movie.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-gray-300">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(movie.release_date).getFullYear()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  <span>{movie.vote_average.toFixed(1)}</span>
                </div>
              </div>
              <p className="text-lg text-gray-200 leading-relaxed drop-shadow-md">
                {movie.overview}
              </p>
              <div className="flex gap-2 pt-2">
                {movie.genre_ids.map((id) => (
                  <span key={id} className="px-3 py-1 rounded-full bg-white/10 text-xs md:text-sm backdrop-blur-sm border border-white/20">
                    {getGenreName(id)}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Movies */}
      {similarMovies.length > 0 && (
        <div className="container mx-auto px-4 mt-12 space-y-6">
          <h2 className="text-2xl font-bold">Similar Movies</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {similarMovies.map((m) => (
              <MovieCard key={m.id} movie={m} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
