"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import {
  WatchlistItem,
  addToWatchlist,
  removeFromWatchlist,
  getWatchlist,
  mapToWatchlistItem,
} from "@/utils/indexedDB";
import { Movie, Show } from "@/types/movie";

interface WatchlistContextType {
  watchlist: WatchlistItem[];
  addToWatchlist: (item: Movie | Show) => Promise<void>;
  removeFromWatchlist: (id: number) => Promise<void>;
  isInWatchlist: (id: number) => boolean;
  refreshWatchlist: () => Promise<void>;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(
  undefined,
);

export function WatchlistProvider({ children }: { children: React.ReactNode }) {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);

  const refreshWatchlist = useCallback(async () => {
    try {
      const list = await getWatchlist();
      setWatchlist(list);
    } catch (error) {
      console.error("Failed to load watchlist:", error);
    }
  }, []);

  useEffect(() => {
    refreshWatchlist();
  }, [refreshWatchlist]);

  const add = async (item: Movie | Show) => {
    const watchlistItem = mapToWatchlistItem(item);
    // Ensure media_type is set correctly if not present in the object
    if (!watchlistItem.media_type) {
      // Best guess fallback if needed, or rely on mapper handling specific props
      if ("title" in item) watchlistItem.media_type = "movie";
      if ("name" in item) watchlistItem.media_type = "tv";
    }

    await addToWatchlist(watchlistItem);
    await refreshWatchlist();
  };

  const remove = async (id: number) => {
    await removeFromWatchlist(id);
    await refreshWatchlist();
  };

  const isInWatchlist = (id: number) => {
    return watchlist.some((item) => item.id === id);
  };

  return (
    <WatchlistContext.Provider
      value={{
        watchlist,
        addToWatchlist: add,
        removeFromWatchlist: remove,
        isInWatchlist,
        refreshWatchlist,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  const context = useContext(WatchlistContext);
  if (context === undefined) {
    throw new Error("useWatchlist must be used within a WatchlistProvider");
  }
  return context;
}
