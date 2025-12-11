import { Movie, Show } from "@/types/movie"
import Image from "next/image"
import MovieCard from "@/components/MovieCard"
import ShowCard from "@/components/ShowCard"
import actors from "@/data/actors.json"

export async function generateStaticParams() {
  return actors.map((actor) => ({
    id: actor.id.toString(),
  }))
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const actor = actors.find((a) => a.id.toString() === params.id)

  if (!actor) {
    return {
      title: "Actor Not Found",
    }
  }

  return {
    title: `${actor.name} - Cinematic`,
    description: `Movies and TV shows featuring ${actor.name}.`,
  }
}

export default function ActorPage({ params }: { params: { id: string } }) {
  const actor = actors.find((a) => a.id.toString() === params.id)

  if (!actor) {
    return <div className="container mx-auto py-12 text-center">Actor not found</div>
  }

  const profileUrl = actor.profile_path
    ? `https://image.tmdb.org/t/p/original${actor.profile_path}`
    : "/placeholder-user.png"

  // Filter and sort credits
  const credits = actor.credits.cast
    .filter((credit: any) => credit.poster_path && (credit.media_type === "movie" || credit.media_type === "tv"))
    .sort((a: any, b: any) => b.popularity - a.popularity)
    .slice(0, 12)

  return (
    <div className="min-h-screen bg-background pb-12">
      <div className="bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-background shadow-xl shrink-0">
              <Image
                src={profileUrl}
                alt={actor.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-4 text-center md:text-left">
              <h1 className="text-4xl font-bold tracking-tight">{actor.name}</h1>
              <p className="text-muted-foreground max-w-2xl">
                Known for their work in {actor.known_for_department}.
              </p>
              {/* Bio is not available in the popular list response, would need detail fetch */}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12 space-y-8">
        <h2 className="text-2xl font-bold">Known For</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {credits.map((credit: any) => {
            if (credit.media_type === "movie") {
              const movie: Movie = {
                id: credit.id,
                title: credit.title,
                poster_path: credit.poster_path,
                backdrop_path: credit.backdrop_path,
                vote_average: credit.vote_average,
                release_date: credit.release_date,
                overview: credit.overview,
                genre_ids: credit.genre_ids,
                popularity: credit.popularity,
                vote_count: credit.vote_count,
                original_language: credit.original_language,
                original_title: credit.original_title,
                video: credit.video,
                media_type: "movie"
              }
              return <MovieCard key={`movie-${credit.id}`} movie={movie} />
            } else {
              const show: Show = {
                id: credit.id,
                name: credit.name,
                poster_path: credit.poster_path,
                backdrop_path: credit.backdrop_path,
                vote_average: credit.vote_average,
                first_air_date: credit.first_air_date,
                overview: credit.overview,
                genre_ids: credit.genre_ids,
                popularity: credit.popularity,
                vote_count: credit.vote_count,
                original_language: credit.original_language,
                original_name: credit.original_name,
                origin_country: credit.origin_country,
                media_type: "tv"
              }
              return <ShowCard key={`show-${credit.id}`} show={show} />
            }
          })}
        </div>
      </div>
    </div>
  )
}
