import { getMovies, getShows, getActors } from "@/utils/fetchData";
import MovieCard from "@/components/MovieCard";
import ShowCard from "@/components/ShowCard";
import Image from "next/image";
import Link from "next/link";

interface SearchPageProps {
  searchParams: { q?: string };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q?.toLowerCase() || "";

  const [movies, shows, actors] = await Promise.all([
    getMovies(),
    getShows(),
    getActors(),
  ]);

  const filteredMovies = query
    ? movies.filter(
        (movie: any) =>
          movie.title.toLowerCase().includes(query) ||
          movie.credits?.cast?.some((actor: any) =>
            actor.name.toLowerCase().includes(query),
          ),
      )
    : [];

  const filteredShows = query
    ? shows.filter(
        (show: any) =>
          show.name.toLowerCase().includes(query) ||
          show.credits?.cast?.some((actor: any) =>
            actor.name.toLowerCase().includes(query),
          ),
      )
    : [];

  const filteredActors = query
    ? actors.filter((actor: any) => actor.name.toLowerCase().includes(query))
    : [];

  const hasResults =
    filteredMovies.length > 0 ||
    filteredShows.length > 0 ||
    filteredActors.length > 0;

  const queryRaw = searchParams.q || "";
  const displayQuery = decodeURIComponent(queryRaw)
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&#039;/g, "'");

  return (
    <main className="min-h-screen bg-background pt-24 pb-12 px-4 md:px-8">
      <div className="container mx-auto space-y-12">
        <h1 className="text-3xl font-bold text-foreground">
          {queryRaw ? `Search Results for "${displayQuery}"` : "Search"}
        </h1>

        {!query && (
          <p className="text-muted-foreground">Type something to search...</p>
        )}

        {query && !hasResults && (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">
              No results found for {'"'}
              {searchParams.q}
              {'"'}
            </p>
          </div>
        )}

        {/* Movies Section */}
        {filteredMovies.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground">Movies</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {filteredMovies.map((movie: any) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </section>
        )}

        {/* TV Shows Section */}
        {filteredShows.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground">TV Shows</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {filteredShows.map((show: any) => (
                <ShowCard key={show.id} show={show} />
              ))}
            </div>
          </section>
        )}

        {/* Actors Section */}
        {filteredActors.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground">Actors</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {filteredActors.map((actor: any) => (
                <div
                  key={actor.id}
                  className="group relative aspect-[2/3] overflow-hidden rounded-md bg-muted"
                >
                  {actor.profile_path ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                      alt={actor.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-muted text-muted-foreground">
                      No Image
                    </div>
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-white font-medium text-center w-full">
                      {actor.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
