import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';
import dotenv from 'dotenv';
import { Movie, Show, Genre, ApiResponse } from '../types/movie';

dotenv.config({ path: '.env.local' });

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

if (!TMDB_API_KEY) {
  console.error('Error: TMDB_API_KEY is not defined in .env.local');
  process.exit(1);
}

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
    language: 'en-US',
  },
});

async function fetchGenres(type: 'movie' | 'tv'): Promise<Genre[]> {
  try {
    const response = await api.get<{ genres: Genre[] }>(`/genre/${type}/list`);
    return response.data.genres;
  } catch (error) {
    console.error(`Error fetching ${type} genres:`, error);
    return [];
  }
}

async function fetchMovies(endpoint: string, page = 1): Promise<Movie[]> {
  try {
    const response = await api.get<ApiResponse<Movie>>(`/movie/${endpoint}`, {
      params: { page },
    });
    return response.data.results.map((movie) => ({ ...movie, media_type: 'movie' }));
  } catch (error) {
    console.error(`Error fetching movies from ${endpoint}:`, error);
    return [];
  }
}

async function fetchShows(endpoint: string, page = 1): Promise<Show[]> {
  try {
    const response = await api.get<ApiResponse<Show>>(`/tv/${endpoint}`, {
      params: { page },
    });
    return response.data.results.map((show) => ({ ...show, media_type: 'tv' }));
  } catch (error) {
    console.error(`Error fetching shows from ${endpoint}:`, error);
    return [];
  }
}

async function fetchPopularActors(page = 1) {
  try {
    const response = await api.get(`/person/popular`, { params: { page } });
    const actors = response.data.results;
    
    // Fetch credits for each actor
    const actorsWithCredits = await Promise.all(
      actors.map(async (actor: any) => {
        const creditsResponse = await api.get(`/person/${actor.id}/combined_credits`);
        return { ...actor, credits: creditsResponse.data };
      })
    );
    
    return actorsWithCredits;
  } catch (error) {
    console.error('Error fetching popular actors:', error);
    return [];
  }
}

async function main() {
  console.log('Fetching data from TMDB...');

  // Fetch Genres
  const movieGenres = await fetchGenres('movie');
  const tvGenres = await fetchGenres('tv');
  const allGenres = [...movieGenres, ...tvGenres.filter(g => !movieGenres.find(mg => mg.id === g.id))];

  // Fetch Movies
  const trendingMovies = await fetchMovies('popular');
  const topRatedMovies = await fetchMovies('top_rated');
  const nowPlayingMovies = await fetchMovies('now_playing');
  const upcomingMovies = await fetchMovies('upcoming');

  // Fetch Shows
  const trendingShows = await fetchShows('popular');
  const topRatedShows = await fetchShows('top_rated');
  const onTheAirShows = await fetchShows('on_the_air');

  // Fetch Actors
  const actors = await fetchPopularActors();

  // Combine and deduplicate
  const allMovies = Array.from(new Map([...trendingMovies, ...topRatedMovies, ...nowPlayingMovies, ...upcomingMovies].map(m => [m.id, m])).values());
  const allShows = Array.from(new Map([...trendingShows, ...topRatedShows, ...onTheAirShows].map(s => [s.id, s])).values());

  // Save to files
  const dataDir = path.join(process.cwd(), 'data');
  await fs.mkdir(dataDir, { recursive: true });

  await fs.writeFile(path.join(dataDir, 'genres.json'), JSON.stringify(allGenres, null, 2));
  await fs.writeFile(path.join(dataDir, 'movies.json'), JSON.stringify(allMovies, null, 2));
  await fs.writeFile(path.join(dataDir, 'shows.json'), JSON.stringify(allShows, null, 2));
  await fs.writeFile(path.join(dataDir, 'actors.json'), JSON.stringify(actors, null, 2));

  console.log(`Saved ${allGenres.length} genres, ${allMovies.length} movies, ${allShows.length} shows, and ${actors.length} actors to ${dataDir}`);
}

main();
