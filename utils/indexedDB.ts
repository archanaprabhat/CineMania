import { Movie, Show } from "@/types/movie";

const DB_NAME = "movieValutDB";
const DB_VERSION = 1;
const STORE_NAME = "watchlist";

export interface WatchlistItem {
  id: number;
  title: string; // 'title' for movie, 'name' for show
  poster_path: string | null;
  media_type: "movie" | "tv";
  vote_average: number;
  release_date?: string; // or first_air_date
}

export const initDB = async (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (event) => {
      console.error(
        "IndexedDB error:",
        (event.target as IDBOpenDBRequest).error,
      );
      reject("Error opening database");
    };

    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };
  });
};

export const addToWatchlist = async (item: WatchlistItem): Promise<void> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.put(item);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = (event) => {
      console.error(
        "Error adding to watchlist:",
        (event.target as IDBRequest).error,
      );
      reject("Error adding to watchlist");
    };
  });
};

export const removeFromWatchlist = async (id: number): Promise<void> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(id);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = (event) => {
      console.error(
        "Error removing from watchlist:",
        (event.target as IDBRequest).error,
      );
      reject("Error removing from watchlist");
    };
  });
};

export const getWatchlist = async (): Promise<WatchlistItem[]> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], "readonly");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = (event) => {
      resolve((event.target as IDBRequest).result as WatchlistItem[]);
    };

    request.onerror = (event) => {
      console.error(
        "Error getting watchlist:",
        (event.target as IDBRequest).error,
      );
      reject("Error getting watchlist");
    };
  });
};

export const checkWatchlistStatus = async (id: number): Promise<boolean> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], "readonly");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(id);

    request.onsuccess = (event) => {
      resolve(!!(event.target as IDBRequest).result);
    };

    request.onerror = (event) => {
      console.error(
        "Error checking watchlist status:",
        (event.target as IDBRequest).error,
      );
      resolve(false); // Default to false on error
    };
  });
};

// Helper to convert Movie/Show to WatchlistItem
export const mapToWatchlistItem = (item: Movie | Show): WatchlistItem => {
  const isMovie = "title" in item;
  return {
    id: item.id,
    title: isMovie ? (item as Movie).title : (item as Show).name,
    poster_path: item.poster_path,
    media_type: (item as any).media_type || (isMovie ? "movie" : "tv"),
    vote_average: item.vote_average,
    release_date: isMovie
      ? (item as Movie).release_date
      : (item as Show).first_air_date,
  };
};
