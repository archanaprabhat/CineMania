import { getShows } from "@/utils/fetchData"
import { Show } from "@/types/movie"
import Image from "next/image"
import { Star, Calendar, Clock, Plus, Layers } from "lucide-react"
import { Button } from "@/components/ui/button"
import ShowCard from "@/components/ShowCard"
import DetailWatchlistButton from "@/components/DetailWatchlistButton"
import Link from "next/link"
import genres from "@/data/genres.json"

export async function generateStaticParams() {
  const shows: Show[] = await getShows()
  return shows.map((show) => ({
    id: show.id.toString(),
  }))
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const shows: Show[] = await getShows()
  const show = shows.find((s) => s.id.toString() === params.id)
  
  if (!show) {
    return {
      title: "Show Not Found",
    }
  }

  return {
    title: `${show.name} - Cinematic`,
    description: show.overview,
  }
}

export default async function ShowDetailPage({ params }: { params: { id: string } }) {
  const shows: Show[] = await getShows()
  const show = shows.find((s) => s.id.toString() === params.id)

  if (!show) {
    return <div>Show not found</div>
  }

  const backdropUrl = show.backdrop_path
    ? `https://image.tmdb.org/t/p/original${show.backdrop_path}`
    : null
  
  const posterUrl = show.poster_path
    ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
    : "/placeholder-poster.png"

  // Get similar shows (same genre)
  const similarShows = shows
    .filter((s) => s.id !== show.id && s.genre_ids.some((g) => show.genre_ids.includes(g)))
    .slice(0, 6)
  
  const getGenreName = (id: number) => {
    return genres.find((g) => g.id === id)?.name || "Unknown"
  }

  // Format runtime (average or first value)
  const formatRuntime = (runtimes?: number[]) => {
    if (!runtimes || runtimes.length === 0) return 'N/A'
    const minutes = runtimes[0]
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
            alt={show.name}
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
                alt={show.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-6 max-w-4xl flex-1">
              <div className="space-y-2">
                <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight drop-shadow-xl">
                  {show.name}
                </h1>
                {show.tagline && (
                  <p className="text-xl md:text-2xl text-gray-300 italic font-light tracking-wide">{show.tagline}</p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-6 text-sm md:text-base text-gray-300">
                <div className="flex items-center gap-2 bg-black/40 dark:bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/10 shadow-sm">
                  <Calendar className="h-4 w-4 text-white" />
                  <span className="font-medium text-white">{new Date(show.first_air_date).getFullYear()}</span>
                </div>
                {show.episode_run_time && show.episode_run_time.length > 0 && (
                  <div className="flex items-center gap-2 bg-black/40 dark:bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/10 shadow-sm">
                    <Clock className="h-4 w-4 text-white" />
                    <span className="font-medium text-white">{formatRuntime(show.episode_run_time)}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 bg-yellow-500/20 text-yellow-500 px-4 py-2 rounded-full backdrop-blur-md border border-yellow-500/20 shadow-sm">
                  <Star className="h-4 w-4 fill-yellow-500" />
                  <span className="font-bold">{show.vote_average.toFixed(1)}</span>
                </div>
                {(show.number_of_seasons || 0) > 0 && (
                  <div className="flex items-center gap-2 bg-black/40 dark:bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/10 shadow-sm">
                    <Layers className="h-4 w-4 text-white" />
                    <span className="font-medium text-white">{show.number_of_seasons} Seasons</span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {show.genre_ids.map((id) => (
                  <Link key={id} href={`/shows?genre=${id}`}>
                    <span className="px-4 py-1.5 rounded-full bg-white/5 text-xs md:text-sm backdrop-blur-sm border border-white/10 hover:bg-white/20 hover:border-white/30 transition-all cursor-pointer text-gray-200 font-medium">
                      {getGenreName(id)}
                    </span>
                  </Link>
                ))}
              </div>

              <div className="flex gap-4 pt-4">
                <DetailWatchlistButton item={show} />
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
              <h2 className="text-3xl font-bold tracking-tight">Storyline</h2>
              <p className="text-lg md:text-xl leading-relaxed font-light">
                {show.overview}
              </p>
            </section>

            {/* Top Cast */}
            {show.credits?.cast && show.credits.cast.length > 0 && (
              <section className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-bold text-foreground dark:text-white tracking-tight">Top Cast</h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                  {show.credits.cast.slice(0, 8).map((person) => (
                    <div key={person.id} className="group space-y-3">
                      <div className="relative aspect-2/3 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 shadow-lg transition-transform duration-300 group-hover:scale-105">
                        {person.profile_path ? (
                          <Image
                            src={`https://image.tmdb.org/t/p/w300${person.profile_path}`}
                            alt={person.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-zinc-400 dark:text-zinc-500">
                            No Image
                          </div>
                        )}
                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground dark:text-white text-lg leading-tight">{person.name}</p>
                        <p className="text-sm text-muted-foreground dark:text-gray-400">{person.character}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar (Right 4/12) */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white/80 dark:bg-zinc-900/50 rounded-2xl border border-zinc-200/50 dark:border-white/10 p-8 space-y-8 backdrop-blur-xl shadow-lg">
              <div>
                <h3 className="text-muted-foreground text-sm font-medium uppercase tracking-wider mb-2">Status</h3>
                <p className="text-xl text-foreground dark:text-white font-semibold">{show.status || 'Returning Series'}</p>
              </div>
              
              <div>
                <h3 className="text-muted-foreground text-sm font-medium uppercase tracking-wider mb-2">Original Language</h3>
                <p className="text-xl text-foreground dark:text-white font-semibold uppercase">{show.original_language}</p>
              </div>

              <div>
                <h3 className="text-muted-foreground text-sm font-medium uppercase tracking-wider mb-2">Type</h3>
                <p className="text-xl text-foreground dark:text-white font-semibold">{show.type || 'Scripted'}</p>
              </div>

              {(show.number_of_seasons || 0) > 0 && (
                <div>
                  <h3 className="text-muted-foreground text-sm font-medium uppercase tracking-wider mb-2">Seasons</h3>
                  <p className="text-xl text-foreground dark:text-white font-semibold">{show.number_of_seasons}</p>
                </div>
              )}

              {(show.number_of_episodes || 0) > 0 && (
                <div>
                  <h3 className="text-muted-foreground text-sm font-medium uppercase tracking-wider mb-2">Episodes</h3>
                  <p className="text-xl text-foreground dark:text-white font-semibold">{show.number_of_episodes}</p>
                </div>
              )}
            </div>

            {/* Crew */}
            {show.credits?.crew && show.credits.crew.filter(c => ['Executive Producer', 'Creator', 'Writer'].includes(c.job)).length > 0 && (
              <div className="bg-white/80 dark:bg-zinc-900/50 rounded-2xl border border-zinc-200/50 dark:border-white/10 p-8 space-y-6 backdrop-blur-xl shadow-lg">
                 <h3 className="text-xl font-bold text-foreground dark:text-white">Key Crew</h3>
                 <div className="space-y-4">
                   {show.credits.crew
                     .filter(c => ['Executive Producer', 'Creator', 'Writer'].includes(c.job))
                     .slice(0, 5)
                     .map((person, i) => (
                       <div key={`${person.id}-${i}`} className="flex justify-between items-center border-b border-zinc-200/50 dark:border-white/5 pb-3 last:border-0 last:pb-0">
                         <span className="font-medium text-foreground dark:text-white">{person.name}</span>
                         <span className="text-sm text-muted-foreground">{person.job}</span>
                       </div>
                     ))}
                 </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Similar Shows */}
      {similarShows.length > 0 && (
        <div className="container mx-auto px-4 mt-8 space-y-8 border-t border-zinc-200 dark:border-white/5 pt-16">
          <h2 className="text-3xl font-bold text-foreground dark:text-white tracking-tight">You Might Also Like</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {similarShows.map((s) => (
              <ShowCard key={s.id} show={s} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
