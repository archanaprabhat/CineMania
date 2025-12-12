# Cinematic - Movie & TV Discovery App

A modern, responsive web application built with Next.js 14 for browsing movies and TV shows to create a premium streaming platform experience.

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Local Database**: [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) (via raw API)

## Architecture & Data

### Data Source

The application uses a **simulated backend** approach:

- **Static Data**: Core content resides in local JSON files (`data/movies.json`, `data/shows.json`, `data/actors.json`).
- **Data Access**: `utils/fetchData.ts` acts as the data access layer, reading files server-side to simulate database queries.

### API Integration

- **Internal API**: `app/api/search/route.ts` provides an endpoint for real-time search suggestions by filtering the local JSON data.
- **External Assets**: While metadata is local, image assets are sourced directly from [TMDB](https://www.themoviedb.org/) (The Movie Database) CDN.
- **Image Utilities**: `utils/imageUtils.ts` handles logic for generating optimized TMDB image URLs (posters, backdrops, profiles).

### State Management

- **WatchlistContext**: Manages the application-wide state for the user's watchlist.
- **IndexedDB**: Used directly (via `utils/indexedDB.ts`) to persist watchlist data across sessions without a backend database.

## Getting Started

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Run the development server**:

   ```bash
   npm run dev
   ```

3. **Open the app**:
   Navigate to [https://cinmatic.vercel.app/](https://cinmatic.vercel.app/).
