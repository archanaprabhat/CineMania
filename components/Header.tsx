"use client"

import Link from "next/link"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import GlobalSearch from "@/components/GlobalSearch"

import { Suspense, useState, useEffect } from "react"

export default function Header() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

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
          <Suspense>
            <GlobalSearch />
          </Suspense>
          
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
