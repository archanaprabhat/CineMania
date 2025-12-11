import { getShows } from "@/utils/fetchData"
import { Show } from "@/types/movie"
import Image from "next/image"
import { Star, Calendar } from "lucide-react"
import ShowCard from "@/components/ShowCard"
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
    title: `${show.name} - Netflix Clone`,
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

  return (
    <div className="min-h-screen bg-background pb-12">
      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[70vh] w-full">
        {backdropUrl && (
          <Image
            src={backdropUrl}
            alt={show.name}
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
                alt={show.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-4 max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
                {show.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-gray-300">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(show.first_air_date).getFullYear()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  <span>{show.vote_average.toFixed(1)}</span>
                </div>
              </div>
              <p className="text-lg text-gray-200 leading-relaxed drop-shadow-md">
                {show.overview}
              </p>
              <div className="flex gap-2 pt-2">
                {show.genre_ids.map((id) => (
                  <span key={id} className="px-3 py-1 rounded-full bg-white/10 text-xs md:text-sm backdrop-blur-sm border border-white/20">
                    {getGenreName(id)}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Shows */}
      {similarShows.length > 0 && (
        <div className="container mx-auto px-4 mt-12 space-y-6">
          <h2 className="text-2xl font-bold">Similar TV Shows</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {similarShows.map((s) => (
              <ShowCard key={s.id} show={s} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
