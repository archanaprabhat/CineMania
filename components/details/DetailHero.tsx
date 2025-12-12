import Image from "next/image";
import { getBackdropUrl, getPosterUrl } from "@/utils/imageUtils";
import DetailWatchlistButton from "@/components/DetailWatchlistButton";
// Need slightly different interface or just pass item and let button handle it.
// DetailWatchlistButton (which I haven't refactored yet) takes `item: any`.

interface DetailHeroProps {
  title: string;
  tagline?: string;
  backdropPath?: string | null;
  posterPath?: string | null;
  children?: React.ReactNode; // For badges
  actions?: React.ReactNode; // For buttons
}

export function DetailHero({
  title,
  tagline,
  backdropPath,
  posterPath,
  children,
  actions,
}: DetailHeroProps) {
  const backdropUrl = getBackdropUrl(backdropPath);
  const posterUrl = getPosterUrl(posterPath);

  return (
    <div className="relative h-[70vh] w-full">
      {backdropUrl && (
        <Image
          src={backdropUrl}
          alt={title}
          fill
          className="object-cover brightness-[0.3]"
          priority
        />
      )}
      <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent" />

      <div className="container mx-auto px-4 h-full flex items-end pb-12 relative z-10">
        <div className="flex flex-col md:flex-row gap-8 items-end w-full">
          <div className="hidden md:block relative w-72 aspect-2/3 rounded-xl overflow-hidden shadow-2xl border border-white/10 shrink-0 transform hover:scale-105 transition-transform duration-500">
            <Image src={posterUrl} alt={title} fill className="object-cover" />
          </div>
          <div className="space-y-6 max-w-4xl flex-1">
            <div className="space-y-2">
              <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight drop-shadow-xl">
                {title}
              </h1>
              {tagline && (
                <p className="text-xl md:text-2xl text-gray-300 italic font-light tracking-wide">
                  {tagline}
                </p>
              )}
            </div>

            {children && (
              <div className="flex flex-wrap items-center gap-6 text-sm md:text-base text-gray-300">
                {children}
              </div>
            )}

            {actions && <div className="flex gap-4 pt-4">{actions}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
