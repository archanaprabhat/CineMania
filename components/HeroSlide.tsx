"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Play, Info, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Movie } from "@/types/movie"

interface HeroSlideProps {
  movie: Movie
  isActive: boolean
}

export default function HeroSlide({ movie, isActive }: HeroSlideProps) {
  const [trailerKey, setTrailerKey] = useState<string | null>(null)
  const [isMuted, setIsMuted] = useState(true)
  const [showVideo, setShowVideo] = useState(false)

  useEffect(() => {
    if (movie.videos?.results) {
      const trailer = movie.videos.results.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      )
      if (trailer) {
        setTrailerKey(trailer.key)
      }
    }
  }, [movie])

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (isActive && trailerKey) {
      // Delay showing video slightly to allow transition to finish
      timer = setTimeout(() => setShowVideo(true), 1000)
    } else {
      setShowVideo(false)
    }

    return () => clearTimeout(timer)
  }, [isActive, trailerKey])

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
    : null

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Background Image */}
      {backdropUrl && (
        <div className={`absolute inset-0 transition-opacity duration-1000 ${showVideo ? 'opacity-0' : 'opacity-100'}`}>
          <Image
            src={backdropUrl}
            alt={movie.title}
            fill
            className="object-cover"
            priority={isActive} // Prioritize loading if active
          />
        </div>
      )}

      {/* YouTube Background */}
      {showVideo && trailerKey && (
        <div className="absolute inset-0 w-full h-full pointer-events-none scale-[1.5]">
          <iframe
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=${isMuted ? 1 : 0}&controls=0&showinfo=0&rel=0&loop=1&playlist=${trailerKey}&modestbranding=1`}
            className="w-full h-full object-cover"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4 pt-20">
          <div className="max-w-2xl space-y-6 animate-in fade-in slide-in-from-bottom-10 duration-1000 fill-mode-both" style={{ animationDelay: '500ms' }}>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white drop-shadow-2xl">
              {movie.title}
            </h1>
            
            <p className="text-lg md:text-xl text-gray-200 line-clamp-3 drop-shadow-md max-w-xl">
              {movie.overview}
            </p>

            <div className="flex items-center gap-4 pt-4">
              <Button size="lg" className="bg-white text-black hover:bg-white/90 gap-2 text-lg px-8 h-14">
                <Play className="h-6 w-6 fill-black" />
                Play
              </Button>
              <Link href={`/movies/${movie.id}`}>
                <Button size="lg" variant="secondary" className="bg-gray-500/50 text-white hover:bg-gray-500/40 gap-2 text-lg px-8 h-14 backdrop-blur-sm">
                  <Info className="h-6 w-6" />
                  More Info
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mute Toggle */}
      {showVideo && trailerKey && (
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="absolute bottom-32 right-12 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors border border-white/20 backdrop-blur-sm z-20 pointer-events-auto"
        >
          {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
        </button>
      )}
    </div>
  )
}
