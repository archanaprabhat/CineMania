"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, X } from "lucide-react"
import { useState, useEffect } from "react"
import genres from "@/data/genres.json"

interface SearchAndFilterBarProps {
  onSearch: (query: string) => void
  onFilter: (genreId: string) => void
  onSort: (sort: string) => void
}

export default function SearchAndFilterBar({
  onSearch,
  onFilter,
  onSort,
}: SearchAndFilterBarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGenre, setSelectedGenre] = useState<string | undefined>(undefined)
  const [selectedSort, setSelectedSort] = useState<string | undefined>(undefined)

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchQuery)
    }, 500)

    return () => clearTimeout(timer)
  }, [searchQuery, onSearch])

  const handleClearFilters = () => {
    setSearchQuery("")
    setSelectedGenre(undefined)
    setSelectedSort(undefined)
    onSearch("")
    onFilter("all")
    onSort("popular")
  }

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-background/50 p-4 rounded-lg backdrop-blur-sm border">
      <div className="relative w-full md:w-1/3">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search movies..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="flex flex-wrap gap-2 md:gap-4">
        <Select 
          value={selectedGenre} 
          onValueChange={(value) => {
            setSelectedGenre(value)
            onFilter(value)
          }}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Genre" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Genres</SelectItem>
            {genres.map((genre) => (
              <SelectItem key={genre.id} value={genre.id.toString()}>
                {genre.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select 
          value={selectedSort} 
          onValueChange={(value) => {
            setSelectedSort(value)
            onSort(value)
          }}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popular">Most Popular</SelectItem>
            <SelectItem value="rating">Top Rated</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
          </SelectContent>
        </Select>

        {(searchQuery || selectedGenre || selectedSort) && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleClearFilters}
            aria-label="Clear filters"
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
