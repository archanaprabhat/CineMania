"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Show } from "@/types/movie"
import WatchlistButton from "./WatchlistButton"

interface ShowCardProps {
  show: Show
}

export default function ShowCard({ show }: ShowCardProps) {
  const posterUrl = show.poster_path
    ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
    : "/placeholder-poster.png"

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="overflow-hidden border-0 bg-transparent shadow-none group relative">
        <div className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
          <WatchlistButton item={show} />
        </div>
        <Link href={`/shows/${show.id}`}>
          <CardContent className="p-0">
            <div className="relative aspect-2/3 w-full overflow-hidden rounded-md bg-muted">
              {show.poster_path ? (
                <Image
                  src={posterUrl}
                  alt={show.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-muted text-muted-foreground">
                  No Image
                </div>
              )}
            </div>
            <div className="pt-2">
              <h3 className="line-clamp-1 font-medium text-sm group-hover:text-primary transition-colors">
                {show.name}
              </h3>
              <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
                <span>{show.first_air_date ? new Date(show.first_air_date).getFullYear() : 'N/A'}</span>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                  <span>{show.vote_average.toFixed(1)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Link>
      </Card>
    </motion.div>
  )
}
