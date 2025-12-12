"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X } from "lucide-react";
import { useState, useEffect } from "react";
import genres from "@/data/genres.json";

interface SearchAndFilterBarProps {
  onSearch: (query: string) => void;
  onFilter: (genreId: string) => void;
  onSort: (sort: string) => void;
  onYearChange: (year: string) => void;
  onRatingChange: (rating: string) => void;
}

export default function SearchAndFilterBar({
  onSearch,
  onFilter,
  onSort,
  onYearChange,
  onRatingChange,
}: SearchAndFilterBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string | undefined>(
    undefined,
  );
  const [selectedSort, setSelectedSort] = useState<string | undefined>(
    undefined,
  );
  const [selectedYear, setSelectedYear] = useState<string | undefined>(
    undefined,
  );
  const [minRating, setMinRating] = useState<string | undefined>(undefined);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery, onSearch]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedGenre(undefined);
    setSelectedSort(undefined);
    setSelectedYear(undefined);
    setMinRating(undefined);
    onSearch("");
    onFilter("all");
    onSort("popular");
    onYearChange("all");
    onRatingChange("0");
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

  return (
    <div className="flex flex-col gap-4 bg-background/50 p-4 rounded-lg backdrop-blur-sm border">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search titles or actors..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2 md:gap-4 flex-1">
          <Select
            value={selectedGenre}
            onValueChange={(value) => {
              setSelectedGenre(value);
              onFilter(value);
            }}
          >
            <SelectTrigger className="w-[140px]">
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
            value={selectedYear}
            onValueChange={(value) => {
              setSelectedYear(value);
              onYearChange(value);
            }}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={minRating}
            onValueChange={(value) => {
              setMinRating(value);
              onRatingChange(value);
            }}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Min Rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Any Rating</SelectItem>
              {[9, 8, 7, 6, 5, 4, 3].map((rating) => (
                <SelectItem key={rating} value={rating.toString()}>
                  {rating}+ Stars
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={selectedSort}
            onValueChange={(value) => {
              setSelectedSort(value);
              onSort(value);
            }}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="rating">Top Rated</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="az">A - Z</SelectItem>
            </SelectContent>
          </Select>

          {(searchQuery ||
            selectedGenre ||
            selectedSort ||
            selectedYear ||
            minRating) && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClearFilters}
              aria-label="Clear filters"
              className="text-muted-foreground hover:text-foreground ml-auto md:ml-0"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
