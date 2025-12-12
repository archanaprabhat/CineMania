"use client"

import Link from "next/link"
import { useTheme } from "next-themes"
import { Moon, Sun, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import GlobalSearch from "@/components/GlobalSearch"

import { useState, useEffect, Suspense } from "react"
import { useWatchlist } from "@/context/WatchlistContext"

export default function Header() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { watchlist } = useWatchlist()

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">


          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
            <span>Cinematic</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/home" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Home
            </Link>
            <Link href="/movies" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Movies
            </Link>
            <Link href="/shows" className="transition-colors hover:text-foreground/80 text-foreground/60">
              TV Shows
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Suspense fallback={<div className="w-10 md:w-80 h-10 bg-muted/50 rounded-full" />}>
            <GlobalSearch />
          </Suspense>

          <Link href="/watchlist">
            <Button variant="ghost" size="sm" className="gap-2 hidden md:flex">
                <Eye className="h-4 w-4" />
                <span>Watchlist</span>
                {mounted && watchlist.length > 0 && (
                    <span className="ml-1 rounded-full bg-primary px-1.5 py-0.5 text-[10px] text-primary-foreground min-w-5 text-center">
                        {watchlist.length}
                    </span>
                )}
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Watchlist">
                 <Eye className="h-5 w-5" />
            </Button>
          </Link>
          
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
