import { getMovies, getShows } from "@/utils/fetchData";
import MovieCard from "@/components/MovieCard";
import ShowCard from "@/components/ShowCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Play, Info } from "lucide-react";
import Image from "next/image";
import { Movie, Show } from "@/types/movie";

export default async function Home() {
  const movies: Movie[] = await getMovies();
  const shows: Show[] = await getShows();

  // Featured Movie (Random or first)
  const featuredMovie = movies[0];
  const featuredBackdrop = featuredMovie?.backdrop_path 
    ? `https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path}`
    : null;

  // Sections
  const trendingMovies = movies.slice(0, 6);
  const topRatedMovies = [...movies].sort((a, b) => b.vote_average - a.vote_average).slice(0, 6);
  const trendingShows = shows.slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      {featuredMovie && (
        <div className="relative h-[80vh] w-full">
          {featuredBackdrop && (
            <Image
              src={featuredBackdrop}
              alt={featuredMovie.title}
              fill
              className="object-cover brightness-[0.6]"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white max-w-2xl drop-shadow-lg">
              {featuredMovie.title}
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-xl line-clamp-3 drop-shadow-md">
              {featuredMovie.overview}
            </p>
            <div className="flex gap-4 pt-4">
              <Button size="lg" className="gap-2 text-lg px-8">
                <Play className="fill-current h-5 w-5" /> Play
              </Button>
              <Button size="lg" variant="secondary" className="gap-2 text-lg px-8" asChild>
                <Link href={`/movies/${featuredMovie.id}`}>
                  <Info className="h-5 w-5" /> More Info
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-12 space-y-16 -mt-20 relative z-10">
        {/* Trending Movies */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Trending Movies</h2>
            <Button variant="ghost" className="text-primary hover:text-primary/80" asChild>
              <Link href="/movies">View All</Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {trendingMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>

        {/* Top Rated Movies */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Top Rated Movies</h2>
            <Button variant="ghost" className="text-primary hover:text-primary/80" asChild>
              <Link href="/movies?sort=rating">View All</Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {topRatedMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>

        {/* Trending TV Shows */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Trending TV Shows</h2>
            <Button variant="ghost" className="text-primary hover:text-primary/80" asChild>
              <Link href="/shows">View All</Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {trendingShows.map((show) => (
              <ShowCard key={show.id} show={show} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
