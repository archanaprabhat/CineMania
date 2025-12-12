"use client";

import React, { useState, useEffect } from "react";
import { Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWatchlist } from "@/context/WatchlistContext";
import { useToast } from "@/components/ui/toast";
import { Movie, Show } from "@/types/movie";
import { cn } from "@/lib/utils";

interface DetailWatchlistButtonProps {
  item: Movie | Show;
  className?: string;
}

export default function DetailWatchlistButton({
  item,
  className,
}: DetailWatchlistButtonProps) {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const { addToast } = useToast();
  const [inWatchlist, setInWatchlist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setInWatchlist(isInWatchlist(item.id));
  }, [isInWatchlist, item.id]);

  const handleToggle = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      if (inWatchlist) {
        await removeFromWatchlist(item.id);
        addToast("Removed from Watchlist", "info");
      } else {
        await addToWatchlist(item);
        addToast("Added to Watchlist", "success");
      }
      setInWatchlist(!inWatchlist);
    } catch (error) {
      console.error("Watchlist toggle error", error);
      addToast("Failed to update watchlist", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      size="lg"
      className={cn(
        "bg-white text-black hover:bg-gray-200 font-bold px-8 rounded-full h-12 gap-2 transition-all transform hover:scale-105",
        inWatchlist && "bg-green-500 hover:bg-green-600 text-white", // Optional active state styling
        className,
      )}
      onClick={handleToggle}
      disabled={isLoading}
    >
      {inWatchlist ? (
        <>
          <Check className="h-5 w-5" />
          In Watchlist
        </>
      ) : (
        <>
          <Plus className="h-5 w-5" />
          Add to Watchlist
        </>
      )}
    </Button>
  );
}
