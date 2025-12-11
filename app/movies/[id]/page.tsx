import { getMovies } from "@/utils/fetchData"
import { Movie } from "@/types/movie"
import Image from "next/image"
import { Star, Calendar, Clock, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import MovieCard from "@/components/MovieCard"
import Link from "next/link"
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

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)
  }

  // Format runtime
  const formatRuntime = (minutes: number) => {
    const h = Math.floor(minutes / 60)
    const m = minutes % 60
    return `${h}h ${m}m`
  }

  return (
    <div className="min-h-screen bg-background pb-12">
      {/* Hero Section */}
      <div className="relative h-[70vh] w-full">
        {backdropUrl && (
          <Image
            src={backdropUrl}
            alt={movie.title}
            fill
            className="object-cover brightness-[0.3]"
            priority
          />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent" />
        
        <div className="container mx-auto px-4 h-full flex items-end pb-12 relative z-10">
          <div className="flex flex-col md:flex-row gap-8 items-end w-full">
            <div className="hidden md:block relative w-72 aspect-2/3 rounded-xl overflow-hidden shadow-2xl border border-white/10 shrink-0 transform hover:scale-105 transition-transform duration-500">
              <Image
                src={posterUrl}
                alt={movie.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-6 max-w-4xl flex-1">
              <div className="space-y-2">
                <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight drop-shadow-xl">
                  {movie.title}
                </h1>
                {movie.tagline && (
                  <p className="text-xl md:text-2xl text-gray-300 italic font-light tracking-wide">{movie.tagline}</p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-6 text-sm md:text-base text-gray-300">
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/10">
                  <Calendar className="h-4 w-4" />
                  <span className="font-medium">{new Date(movie.release_date).getFullYear()}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/10">
                  <Clock className="h-4 w-4" />
                  <span className="font-medium">{movie.runtime ? formatRuntime(movie.runtime) : 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2 bg-yellow-500/20 text-yellow-500 px-4 py-2 rounded-full backdrop-blur-md border border-yellow-500/20">
                  <Star className="h-4 w-4 fill-yellow-500" />
                  <span className="font-bold">{movie.vote_average.toFixed(1)}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {movie.genre_ids.map((id) => (
                  <Link key={id} href={`/movies?genre=${id}`}>
                    <span className="px-4 py-1.5 rounded-full bg-white/5 text-xs md:text-sm backdrop-blur-sm border border-white/10 hover:bg-white/20 hover:border-white/30 transition-all cursor-pointer text-gray-200 font-medium">
                      {getGenreName(id)}
                    </span>
                  </Link>
                ))}
              </div>

              <div className="flex gap-4 pt-4">
                <Button size="lg" className="bg-white text-black hover:bg-gray-200 font-bold px-8 rounded-full h-12 gap-2 transition-all transform hover:scale-105">
                  <Plus className="h-5 w-5" />
                  Add to Watchlist
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content (Left 8/12) */}
          <div className="lg:col-span-8 space-y-16">
            {/* Overview */}
            <section className="space-y-6">
              <h2 className="text-3xl font-bold text-white tracking-tight">Storyline</h2>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light">
                {movie.overview}
              </p>
            </section>

            {/* Top Cast */}
            {movie.credits?.cast && movie.credits.cast.length > 0 && (
              <section className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-bold text-white tracking-tight">Top Cast</h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                  {movie.credits.cast.slice(0, 8).map((person) => (
                    <div key={person.id} className="group space-y-3">
                      <div className="relative aspect-2/3 rounded-xl overflow-hidden bg-zinc-800 shadow-lg transition-transform duration-300 group-hover:scale-105">
                        {person.profile_path ? (
                          <Image
                            src={`https://image.tmdb.org/t/p/w300${person.profile_path}`}
                            alt={person.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-zinc-500">
                            No Image
                          </div>
                        )}
                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div>
                        <p className="font-semibold text-white text-lg leading-tight">{person.name}</p>
                        <p className="text-sm text-gray-400">{person.character}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar (Right 4/12) */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-zinc-900/50 rounded-2xl border border-white/5 p-8 space-y-8 backdrop-blur-sm">
              <div>
                <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">Status</h3>
                <p className="text-xl text-white font-semibold">{movie.status || 'Released'}</p>
              </div>
              
              <div>
                <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">Original Language</h3>
                <p className="text-xl text-white font-semibold uppercase">{movie.original_language}</p>
              </div>

              <div>
                <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">Budget</h3>
                <p className="text-xl text-white font-semibold">{movie.budget ? formatCurrency(movie.budget) : '-'}</p>
              </div>

              <div>
                <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">Revenue</h3>
                <p className="text-xl text-white font-semibold">{movie.revenue ? formatCurrency(movie.revenue) : '-'}</p>
              </div>
            </div>

            {/* Crew */}
            {movie.credits?.crew && (
              <div className="bg-zinc-900/50 rounded-2xl border border-white/5 p-8 space-y-6 backdrop-blur-sm">
                 <h3 className="text-xl font-bold text-white">Key Crew</h3>
                 <div className="space-y-4">
                   {movie.credits.crew
                     .filter(c => ['Director', 'Screenplay', 'Writer'].includes(c.job))
                     .slice(0, 5)
                     .map((person, i) => (
                       <div key={`${person.id}-${i}`} className="flex justify-between items-center border-b border-white/5 pb-3 last:border-0 last:pb-0">
                         <span className="font-medium text-white">{person.name}</span>
                         <span className="text-sm text-gray-400">{person.job}</span>
                       </div>
                     ))}
                 </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Similar Movies */}
      {similarMovies.length > 0 && (
        <div className="container mx-auto px-4 mt-8 space-y-8 border-t border-white/5 pt-16">
          <h2 className="text-3xl font-bold text-white tracking-tight">You Might Also Like</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {similarMovies.map((m) => (
              <MovieCard key={m.id} movie={m} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
