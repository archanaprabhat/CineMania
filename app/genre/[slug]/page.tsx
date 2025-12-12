import { Suspense } from "react"
import { getMovies } from "@/utils/fetchData"
import { Movie } from "@/types/movie"
import MovieListing from "@/components/MovieListing"
import genres from "@/data/genres.json"

export async function generateStaticParams() {
  return genres.map((genre) => ({
    slug: genre.name.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-"),
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const genre = genres.find(
    (g) => g.name.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-") === params.slug
  )

  if (!genre) {
    return {
      title: "Genre Not Found",
    }
  }

  return {
    title: `${genre.name} Movies - Cinematic`,
    description: `Explore our collection of ${genre.name} movies.`,
  }
}

export default async function GenrePage({ params }: { params: { slug: string } }) {
  const movies: Movie[] = await getMovies()
  
  // Find genre ID from slug
  const genre = genres.find(
    (g) => g.name.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-") === params.slug
  )

  if (!genre) {
    return <div className="container mx-auto py-12 text-center">Genre not found</div>
  }

  const filteredMovies = movies.filter((movie) => movie.genre_ids.includes(genre.id))

  return (
    <div className="space-y-8">
      <div className="bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold tracking-tight">{genre.name} Movies</h1>
          <p className="text-muted-foreground mt-2">
            Explore our collection of {genre.name.toLowerCase()} movies.
          </p>
        </div>
      </div>
      <Suspense>
        <MovieListing initialMovies={filteredMovies} />
      </Suspense>
    </div>
  )
}
