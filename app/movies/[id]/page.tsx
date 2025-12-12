import { getMovies } from "@/utils/fetchData";
import { Movie } from "@/types/movie";
import { Star, Calendar, Clock } from "lucide-react";
import DetailWatchlistButton from "@/components/DetailWatchlistButton";
import Link from "next/link";
import genres from "@/data/genres.json";
import { DetailHero } from "@/components/details/DetailHero";
import { CastList } from "@/components/details/CastList";
import { GlassBadge } from "@/components/ui/glass-badge";
import { GlassContainer } from "@/components/ui/glass-container";
import MovieCard from "@/components/MovieCard";

export const dynamicParams = false;

export async function generateStaticParams() {
  const movies: Movie[] = await getMovies();
  return movies.map((movie) => ({
    id: movie.id.toString(),
  }));
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const movies: Movie[] = await getMovies();
  const movie = movies.find((m) => m.id.toString() === params.id);

  if (!movie) {
    return {
      title: "Movie Not Found",
    };
  }

  return {
    title: `${movie.title} - Cinematic`,
    description: movie.overview,
  };
}

export default async function MovieDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const movies: Movie[] = await getMovies();
  const movie = movies.find((m) => m.id.toString() === params.id);

  if (!movie) {
    return <div>Movie not found</div>;
  }

  const similarMovies = movies
    .filter(
      (m) =>
        m.id !== movie.id &&
        m.genre_ids.some((g) => movie.genre_ids.includes(g)),
    )
    .slice(0, 6);

  const getGenreName = (id: number) => {
    return genres.find((g) => g.id === id)?.name || "Unknown";
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatRuntime = (minutes: number) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}m`;
  };

  return (
    <div className="min-h-screen bg-background pb-12">
      <DetailHero
        title={movie.title}
        tagline={movie.tagline}
        backdropPath={movie.backdrop_path}
        posterPath={movie.poster_path}
        actions={<DetailWatchlistButton item={movie} />}
      >
        <GlassBadge icon={Calendar}>
          {new Date(movie.release_date).getFullYear()}
        </GlassBadge>
        {(movie.runtime || 0) > 0 && (
          <GlassBadge icon={Clock}>{formatRuntime(movie.runtime!)}</GlassBadge>
        )}
        <GlassBadge icon={Star} variant="yellow">
          {movie.vote_average.toFixed(1)}
        </GlassBadge>

        <div className="flex flex-wrap gap-2">
          {movie.genre_ids.map((id) => (
            <Link key={id} href={`/movies?genre=${id}`}>
              <span className="px-4 py-1.5 rounded-full bg-white/5 text-xs md:text-sm backdrop-blur-sm border border-white/10 hover:bg-white/20 hover:border-white/30 transition-all cursor-pointer text-gray-200 font-medium">
                {getGenreName(id)}
              </span>
            </Link>
          ))}
        </div>
      </DetailHero>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content (Left 8/12) */}
          <div className="lg:col-span-8 space-y-16">
            <section className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tight">Storyline</h2>
              <p className="text-lg md:text-xl leading-relaxed font-light">
                {movie.overview}
              </p>
            </section>

            {movie.credits?.cast && <CastList cast={movie.credits.cast} />}
          </div>

          {/* Sidebar (Right 4/12) */}
          <div className="lg:col-span-4 space-y-8">
            <GlassContainer className="space-y-8">
              <div>
                <h3 className="text-muted-foreground text-sm font-medium uppercase tracking-wider mb-2">
                  Status
                </h3>
                <p className="text-xl text-foreground dark:text-white font-semibold">
                  {movie.status || "Released"}
                </p>
              </div>

              <div>
                <h3 className="text-muted-foreground text-sm font-medium uppercase tracking-wider mb-2">
                  Original Language
                </h3>
                <p className="text-xl text-foreground dark:text-white font-semibold uppercase">
                  {movie.original_language}
                </p>
              </div>

              {(movie.budget || 0) > 0 && (
                <div>
                  <h3 className="text-muted-foreground text-sm font-medium uppercase tracking-wider mb-2">
                    Budget
                  </h3>
                  <p className="text-xl text-foreground dark:text-white font-semibold">
                    {formatCurrency(movie.budget || 0)}
                  </p>
                </div>
              )}

              {(movie.revenue || 0) > 0 && (
                <div>
                  <h3 className="text-muted-foreground text-sm font-medium uppercase tracking-wider mb-2">
                    Revenue
                  </h3>
                  <p className="text-xl text-foreground dark:text-white font-semibold">
                    {formatCurrency(movie.revenue || 0)}
                  </p>
                </div>
              )}
            </GlassContainer>

            {/* Crew */}
            {movie.credits?.crew &&
              movie.credits.crew.filter((c) =>
                ["Director", "Screenplay", "Writer"].includes(c.job),
              ).length > 0 && (
                <GlassContainer className="space-y-6">
                  <h3 className="text-xl font-bold text-foreground dark:text-white">
                    Key Crew
                  </h3>
                  <div className="space-y-4">
                    {movie.credits.crew
                      .filter((c) =>
                        ["Director", "Screenplay", "Writer"].includes(c.job),
                      )
                      .slice(0, 5)
                      .map((person, i) => (
                        <div
                          key={`${person.id}-${i}`}
                          className="flex justify-between items-center border-b border-zinc-200/50 dark:border-white/5 pb-3 last:border-0 last:pb-0"
                        >
                          <span className="font-medium text-foreground dark:text-white">
                            {person.name}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {person.job}
                          </span>
                        </div>
                      ))}
                  </div>
                </GlassContainer>
              )}
          </div>
        </div>
      </div>

      {/* Similar Movies */}
      {similarMovies.length > 0 && (
        <div className="container mx-auto px-4 mt-8 space-y-8 border-t border-zinc-200 dark:border-white/5 pt-16">
          <h2 className="text-3xl font-bold text-foreground dark:text-white tracking-tight">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {similarMovies.map((m) => (
              <MovieCard key={m.id} movie={m} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
