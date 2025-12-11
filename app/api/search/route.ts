import { NextResponse } from "next/server"
import { getMovies, getShows, getActors } from "@/utils/fetchData"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q")?.toLowerCase()

  if (!query) {
    return NextResponse.json({ results: [] })
  }

  const [movies, shows, actors] = await Promise.all([
    getMovies(),
    getShows(),
    getActors()
  ])

  const filteredMovies = movies
    .filter((movie: any) => movie.title.toLowerCase().includes(query))
    .slice(0, 3)
    .map((movie: any) => ({ ...movie, type: 'movie' }))

  const filteredShows = shows
    .filter((show: any) => show.name.toLowerCase().includes(query))
    .slice(0, 3)
    .map((show: any) => ({ ...show, type: 'show' }))

  const filteredActors = actors
    .filter((actor: any) => actor.name.toLowerCase().includes(query))
    .slice(0, 3)
    .map((actor: any) => ({ ...actor, type: 'actor' }))

  const results = [...filteredMovies, ...filteredShows, ...filteredActors]

  return NextResponse.json({ results })
}
