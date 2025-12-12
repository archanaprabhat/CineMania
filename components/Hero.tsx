"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Telescope, Plus, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Movie } from "@/types/movie"
import { getBackdropUrl } from "@/utils/imageUtils"

interface HeroProps {
  movie: Movie
}

export default function Hero({ movie }: HeroProps) {
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
        // Delay showing video to allow backdrop to load first and avoid ugly iframe loading
        const timer = setTimeout(() => setShowVideo(true), 2000)
        return () => clearTimeout(timer)
      }
    }
  }, [movie])

  const backdropUrl = getBackdropUrl(movie.backdrop_path)

  return (
    <div className="relative h-[80vh] w-full overflow-hidden">
      {/* Background Image (Fallback/Initial) */}
      {backdropUrl && (
        <div className={`absolute inset-0 transition-opacity duration-1000 ${showVideo ? 'opacity-0' : 'opacity-100'}`}>
          <Image
            src={backdropUrl}
            alt={movie.title}
            fill
            className="object-cover"
            priority
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
      <div className="absolute inset-0 bg-linear-to-r from-background/90 via-background/40 to-transparent" />
      <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4 pt-20">
          <div className="max-w-2xl space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white drop-shadow-2xl">
              {movie.title}
            </h1>
            
            <p className="text-lg md:text-xl text-gray-200 line-clamp-3 drop-shadow-md max-w-xl">
              {movie.overview}
            </p>

            <div className="flex items-center gap-4 pt-4">
              <Link href={`/movies/${movie.id}`}>
                <Button size="lg" className="bg-white text-black hover:bg-white/90 gap-2 text-lg px-8 h-14">
                  <Telescope className="h-6 w-6 fill-black" />
                  Explore
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
