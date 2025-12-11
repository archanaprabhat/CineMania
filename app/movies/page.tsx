import { getMovies } from "@/utils/fetchData"
import MovieListing from "@/components/MovieListing"

export default async function MoviesPage() {
  const movies = await getMovies()
  return <MovieListing initialMovies={movies} />
}
