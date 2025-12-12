"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search, X, Loader2, Film, Tv, User } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { getPosterUrl, getProfileUrl } from "@/utils/imageUtils"

interface SearchResult {
  id: number
  title?: string
  name?: string
  poster_path?: string
  profile_path?: string
  type: 'movie' | 'show' | 'actor'
}

export default function GlobalSearch() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = React.useState("")
  const [isExpanded, setIsExpanded] = React.useState(false)
  const [suggestions, setSuggestions] = React.useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const containerRef = React.useRef<HTMLFormElement>(null)

  // Sync with URL param
  React.useEffect(() => {
    const q = searchParams.get("q")
    if (q) {
      setQuery(q)
      setIsExpanded(true)
    }
  }, [searchParams])

  // Debounce fetch
  React.useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.trim().length > 1) {
        setIsLoading(true)
        try {
          const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
          const data = await res.json()
          setSuggestions(data.results)
        } catch (error) {
          console.error("Failed to fetch suggestions", error)
        } finally {
          setIsLoading(false)
        }
      } else {
        setSuggestions([])
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  // Close suggestions on click outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setSuggestions([])
        if (!query) setIsExpanded(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [query])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      setSuggestions([])
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  const clearSearch = () => {
    setQuery("")
    setSuggestions([])
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const handleSuggestionClick = (result: SearchResult) => {
    setQuery("")
    setSuggestions([])
    setIsExpanded(false)
    if (result.type === 'movie') router.push(`/movies/${result.id}`)
    else if (result.type === 'show') router.push(`/shows/${result.id}`)
    else router.push(`/search?q=${encodeURIComponent(result.name || "")}`)
  }

  return (
    <form 
      ref={containerRef}
      onSubmit={handleSearch} 
      className={cn(
        "relative flex items-center transition-all duration-300 ease-in-out z-50",
        isExpanded ? "w-full md:w-80" : "w-10 md:w-80"
      )}
    >
      <div className={cn(
        "relative w-full flex items-center",
        !isExpanded && "md:flex hidden"
      )}>
        <Search className="absolute left-3 h-4 w-4 text-muted-foreground pointer-events-none" />
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search movies or shows..."
          className="pl-9 pr-9 h-10 w-full bg-background/50 backdrop-blur-md border-input focus-visible:ring-ring focus-visible:border-input transition-all rounded-full"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsExpanded(true)}
        />
        {isLoading ? (
          <Loader2 className="absolute right-3 h-4 w-4 animate-spin text-muted-foreground" />
        ) : query && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-1 h-8 w-8 text-muted-foreground hover:text-foreground rounded-full"
            onClick={clearSearch}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Clear search</span>
          </Button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {suggestions.length > 0 && isExpanded && (
        <div className="absolute top-12 left-0 w-full bg-popover/95 backdrop-blur-xl border border-border rounded-xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
          <div className="max-h-[60vh] overflow-y-auto py-2">
            {suggestions.map((result) => (
              <button
                key={`${result.type}-${result.id}`}
                type="button"
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-accent hover:text-accent-foreground transition-colors text-left group"
                onClick={() => handleSuggestionClick(result)}
              >
                <div className="relative h-12 w-8 shrink-0 rounded overflow-hidden bg-muted">
                  {(result.poster_path || result.profile_path) ? (
                    <Image
                      src={getPosterUrl(result.poster_path, 'w92') || getProfileUrl(result.profile_path, 'w45') || ""}
                      alt={result.title || result.name || ""}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-muted text-muted-foreground">
                      {result.type === 'actor' ? <User className="h-4 w-4" /> : <Film className="h-4 w-4" />}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {result.title || result.name}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    {result.type === 'movie' && <Film className="h-3 w-3" />}
                    {result.type === 'show' && <Tv className="h-3 w-3" />}
                    {result.type === 'actor' && <User className="h-3 w-3" />}
                    <span className="capitalize">{result.type}</span>
                  </div>
                </div>
              </button>
            ))}
            <button
              type="submit"
              className="w-full text-center py-3 text-sm text-primary hover:bg-accent transition-colors border-t border-border"
            >
              See all results for &quot;{query}&quot;
            </button>
          </div>
        </div>
      )}

      {/* Mobile Toggle Button */}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={cn(
          "md:hidden",
          isExpanded && "hidden"
        )}
        onClick={() => {
          setIsExpanded(true)
          setTimeout(() => inputRef.current?.focus(), 100)
        }}
      >
        <Search className="h-5 w-5" />
        <span className="sr-only">Search</span>
      </Button>
    </form>
  )
}
