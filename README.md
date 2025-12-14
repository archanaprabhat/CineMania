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

## Dataset Used

This project uses static data generated from **TMDB (The Movie Database)**.
Source: [https://www.themoviedb.org/](https://www.themoviedb.org/)

**Extracted data includes:**

* Popular & top-rated movies
* Popular & trending TV shows
* Actor / cast data
* Official TMDB genre lists

Only UI-relevant fields were used:
`title`, `poster_path`, `backdrop_path`, `overview`, `vote_average`, `popularity`, `genres`, `release_date`.

---

## How the Dataset Was Generated

Since the assignment required **no backend**, the dataset was created using a simple **Node.js script**.

**Process followed:**

1. Called TMDB API endpoints such as:
   `/movie/popular`, `/movie/top_rated`, `/tv/popular`, `/tv/trending`, `/genre/movie/list`, etc.
2. Selected only the fields needed for UI rendering.
3. Cleaned and normalized the objects.
4. Saved all results as static JSON inside the `/data` folder:

```
data/
  movies.json
  shows.json
  actors.json
```

5. Loaded these JSON files during **SSG** using `fs.readFileSync` inside `utils/fetchData.ts`.

---

## AI Prompts Used

### 1. Project Setup Prompt

“Scaffold a full project setup using Next.js 14 App Router, TypeScript, Tailwind CSS, ESLint + Prettier, Lucide React, and Framer Motion.
All data should come from static JSON files via SSG.
Create folders: `app/`, `components/`, `data/`, `types/`, `utils/`.”

### 2. SEO Setup Prompt

“Generate sitemap, robots.txt, metadata config, and a dynamic OG image setup for a Next.js App Router project.
Make sure the paths, slugs, and data types are correct.”

### 3. Node Script Prompt

“Write a simple Node.js script to fetch movies, shows, genres, and actors from TMDB, normalize the fields, and save them into JSON inside a `/data` folder.”

---

## What I Would Improve With Two More Days

* Add **GSAP animations** and light **Three.js** effects for richer interactivity and motion.
* Add more refined **micro-interactions** on cards and buttons.


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
   Missed mentioning this in the video: a simple custom error page: https://cinmatic.vercel.app/idk
