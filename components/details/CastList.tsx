import Image from "next/image"
import { getProfileUrl } from "@/utils/imageUtils"
import { Cast } from "@/types/movie"

interface CastListProps {
  cast: Cast[]
}

export function CastList({ cast }: CastListProps) {
  if (!cast || cast.length === 0) return null

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-foreground dark:text-white tracking-tight">Top Cast</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {cast.slice(0, 8).map((person) => (
          <div key={person.id} className="group space-y-3">
            <div className="relative aspect-2/3 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 shadow-lg transition-transform duration-300 group-hover:scale-105">
              {person.profile_path ? (
                <Image
                  src={getProfileUrl(person.profile_path) || ""}
                  alt={person.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-zinc-400 dark:text-zinc-500">
                  No Image
                </div>
              )}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div>
              <p className="font-semibold text-foreground dark:text-white text-lg leading-tight">{person.name}</p>
              <p className="text-sm text-muted-foreground dark:text-gray-400">{person.character}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
