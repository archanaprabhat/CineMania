"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import Fade from "embla-carousel-fade"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { Movie } from "@/types/movie"
import HeroSlide from "@/components/HeroSlide"
import { cn } from "@/lib/utils"

interface HeroCarouselProps {
  movies: Movie[]
}

export default function HeroCarousel({ movies }: HeroCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  const plugin = React.useRef(
    Autoplay({ delay: 7000, stopOnInteraction: false })
  )

  const fadePlugin = React.useRef(
    Fade()
  )

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <div className="relative group">
      <Carousel
        setApi={setApi}
        plugins={[plugin.current, fadePlugin.current]}
        className="w-full h-[80vh]"
        opts={{
          loop: true,
          duration: 20, // Smooth sliding duration (though fade overrides this mostly)
        }}
      >
        <CarouselContent>
          {movies.map((movie, index) => (
            <CarouselItem key={movie.id} className="relative h-[80vh] w-full">
              <HeroSlide movie={movie} isActive={current === index} />
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {/* Navigation Arrows (Hidden by default, shown on hover) */}
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-20 bg-black/30 border-white/20 text-white hover:bg-black/50 h-12 w-12" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-20 bg-black/30 border-white/20 text-white hover:bg-black/50 h-12 w-12" />
        
        {/* Pagination Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              className={cn(
                "h-2 w-2 rounded-full transition-all duration-300",
                current === index ? "bg-white w-6" : "bg-white/50 hover:bg-white/80"
              )}
              onClick={() => api?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </div>
  )
}
