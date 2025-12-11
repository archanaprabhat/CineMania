import { getMovies, getShows } from "@/utils/fetchData"
import MovieCard from "@/components/MovieCard"
import ShowCard from "@/components/ShowCard"
import HeroCarousel from "@/components/HeroCarousel"

export default async function Home() {
  const movies = await getMovies()
  const shows = await getShows()

  const heroMovies = movies.slice(0, 3)
  const trendingMovies = movies.slice(0, 6)
  const topRatedMovies = movies.slice(6, 12)
  const trendingShows = shows.slice(0, 6)

  return (
    <main className="min-h-screen bg-background pb-12">
      {heroMovies.length > 0 && <HeroCarousel movies={heroMovies} />}

      <div className="space-y-12 pb-8 -mt-20 relative z-10 pl-4 md:pl-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4 px-4">Trending Movies</h2>
          <div className="flex gap-4 overflow-x-auto pb-4 px-4 scrollbar-hide">
            {trendingMovies.map((movie) => (
              <div key={movie.id} className="w-[160px] md:w-[200px] flex-shrink-0">
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 px-4">Top Rated Movies</h2>
          <div className="flex gap-4 overflow-x-auto pb-4 px-4 scrollbar-hide">
            {topRatedMovies.map((movie) => (
              <div key={movie.id} className="w-[160px] md:w-[200px] flex-shrink-0">
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 px-4">Trending TV Shows</h2>
          <div className="flex gap-4 overflow-x-auto pb-4 px-4 scrollbar-hide">
            {trendingShows.map((show) => (
              <div key={show.id} className="w-[160px] md:w-[200px] flex-shrink-0">
                <ShowCard show={show} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
