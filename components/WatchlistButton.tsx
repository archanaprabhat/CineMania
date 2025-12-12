"use client";

import React, { useState, useEffect } from "react";
import { Bookmark, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useWatchlist } from "@/context/WatchlistContext";
import { useToast } from "@/components/ui/toast";
import { Movie, Show } from "@/types/movie";
import { cn } from "@/lib/utils";

interface WatchlistButtonProps {
  item: Movie | Show;
  className?: string;
}

export default function WatchlistButton({ item, className }: WatchlistButtonProps) {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const { addToast } = useToast();
  const [inWatchlist, setInWatchlist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Sync local state with context
  useEffect(() => {
    setInWatchlist(isInWatchlist(item.id));
  }, [isInWatchlist, item.id]);

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent Link navigation if inside a card
    e.stopPropagation();
    
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
    <button
      onClick={handleToggle}
      className={cn(
        "relative flex h-8 w-8 items-center justify-center rounded-full bg-background/60 backdrop-blur-sm transition-transform hover:scale-110 active:scale-95 disabled:opacity-50",
        inWatchlist ? "text-primary" : "text-muted-foreground hover:text-primary",
        className
      )}
      disabled={isLoading}
      aria-label={inWatchlist ? "Remove from watchlist" : "Add to watchlist"}
    >
      <AnimatePresence mode="wait">
        {inWatchlist ? (
          <motion.div
            key="check"
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 45 }}
            transition={{ duration: 0.2 }}
          >
            <Check className="h-5 w-5" />
          </motion.div>
        ) : (
          <motion.div
            key="bookmark"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Bookmark className="h-5 w-5" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
