import { getShows } from "@/utils/fetchData";
import { Show } from "@/types/movie";
import { Star, Calendar, Clock, Layers } from "lucide-react";
import DetailWatchlistButton from "@/components/DetailWatchlistButton";
import Link from "next/link";
import genres from "@/data/genres.json";
import { DetailHero } from "@/components/details/DetailHero";
import { CastList } from "@/components/details/CastList";
import { GlassBadge } from "@/components/ui/glass-badge";
import { GlassContainer } from "@/components/ui/glass-container";
import ShowCard from "@/components/ShowCard";

export const dynamicParams = false;

export async function generateStaticParams() {
  const shows: Show[] = await getShows();
  return shows.map((show) => ({
    id: show.id.toString(),
  }));
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const shows: Show[] = await getShows();
  const show = shows.find((s) => s.id.toString() === params.id);

  if (!show) {
    return {
      title: "Show Not Found",
    };
  }

  return {
    title: `${show.name} - Cinematic`,
    description: show.overview,
  };
}

export default async function ShowDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const shows: Show[] = await getShows();
  const show = shows.find((s) => s.id.toString() === params.id);

  if (!show) {
    return <div>Show not found</div>;
  }

  const similarShows = shows
    .filter(
      (s) =>
        s.id !== show.id && s.genre_ids.some((g) => show.genre_ids.includes(g)),
    )
    .slice(0, 6);

  const getGenreName = (id: number) => {
    return genres.find((g) => g.id === id)?.name || "Unknown";
  };

  const formatRuntime = (runtimes?: number[]) => {
    if (!runtimes || runtimes.length === 0) return "N/A";
    const minutes = runtimes[0];
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}m`;
  };

  return (
    <div className="min-h-screen bg-background pb-12">
      <DetailHero
        title={show.name}
        tagline={show.tagline}
        backdropPath={show.backdrop_path}
        posterPath={show.poster_path}
        actions={<DetailWatchlistButton item={show} />}
      >
        <GlassBadge icon={Calendar}>
          {new Date(show.first_air_date).getFullYear()}
        </GlassBadge>
        {show.episode_run_time && show.episode_run_time.length > 0 && (
          <GlassBadge icon={Clock}>
            {formatRuntime(show.episode_run_time)}
          </GlassBadge>
        )}
        <GlassBadge icon={Star} variant="yellow">
          {show.vote_average.toFixed(1)}
        </GlassBadge>
        {(show.number_of_seasons || 0) > 0 && (
          <GlassBadge icon={Layers}>
            {show.number_of_seasons} Seasons
          </GlassBadge>
        )}

        <div className="flex flex-wrap gap-2">
          {show.genre_ids.map((id) => (
            <Link key={id} href={`/shows?genre=${id}`}>
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
                {show.overview}
              </p>
            </section>

            {show.credits?.cast && <CastList cast={show.credits.cast} />}
          </div>

          {/* Sidebar (Right 4/12) */}
          <div className="lg:col-span-4 space-y-8">
            <GlassContainer className="space-y-8">
              <div>
                <h3 className="text-muted-foreground text-sm font-medium uppercase tracking-wider mb-2">
                  Status
                </h3>
                <p className="text-xl text-foreground dark:text-white font-semibold">
                  {show.status || "Returning Series"}
                </p>
              </div>

              <div>
                <h3 className="text-muted-foreground text-sm font-medium uppercase tracking-wider mb-2">
                  Original Language
                </h3>
                <p className="text-xl text-foreground dark:text-white font-semibold uppercase">
                  {show.original_language}
                </p>
              </div>

              <div>
                <h3 className="text-muted-foreground text-sm font-medium uppercase tracking-wider mb-2">
                  Type
                </h3>
                <p className="text-xl text-foreground dark:text-white font-semibold">
                  {show.type || "Scripted"}
                </p>
              </div>

              {(show.number_of_seasons || 0) > 0 && (
                <div>
                  <h3 className="text-muted-foreground text-sm font-medium uppercase tracking-wider mb-2">
                    Seasons
                  </h3>
                  <p className="text-xl text-foreground dark:text-white font-semibold">
                    {show.number_of_seasons}
                  </p>
                </div>
              )}

              {(show.number_of_episodes || 0) > 0 && (
                <div>
                  <h3 className="text-muted-foreground text-sm font-medium uppercase tracking-wider mb-2">
                    Episodes
                  </h3>
                  <p className="text-xl text-foreground dark:text-white font-semibold">
                    {show.number_of_episodes}
                  </p>
                </div>
              )}
            </GlassContainer>

            {/* Crew */}
            {show.credits?.crew &&
              show.credits.crew.filter((c) =>
                ["Executive Producer", "Creator", "Writer"].includes(c.job),
              ).length > 0 && (
                <GlassContainer className="space-y-6">
                  <h3 className="text-xl font-bold text-foreground dark:text-white">
                    Key Crew
                  </h3>
                  <div className="space-y-4">
                    {show.credits.crew
                      .filter((c) =>
                        ["Executive Producer", "Creator", "Writer"].includes(
                          c.job,
                        ),
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

      {/* Similar Shows */}
      {similarShows.length > 0 && (
        <div className="container mx-auto px-4 mt-8 space-y-8 border-t border-zinc-200 dark:border-white/5 pt-16">
          <h2 className="text-3xl font-bold text-foreground dark:text-white tracking-tight">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {similarShows.map((s) => (
              <ShowCard key={s.id} show={s} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
