export interface Genre {
  id: number;
  name: string;
}

export interface Cast {
  id: number;
  name: string;
  original_name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface Crew {
  id: number;
  name: string;
  original_name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

export interface Credits {
  cast: Cast[];
  crew: Crew[];
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
}

export interface Movie {
  id: number;
  title: string;
  original_title: string;
  original_language: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
  genres?: Genre[];
  credits?: Credits;
  videos?: {
    results: Video[];
  };
  video?: boolean;
  media_type?: 'movie';
  tagline?: string;
  runtime?: number;
  status?: string;
  budget?: number;
  revenue?: number;
}

export interface Show {
  id: number;
  name: string;
  original_name: string;
  original_language: string;
  origin_country?: string[];
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
  genres?: Genre[];
  credits?: Credits;
  videos?: {
    results: Video[];
  };
  media_type?: 'tv';
  tagline?: string;
  status?: string;
  type?: string;
  number_of_seasons?: number;
  number_of_episodes?: number;
  episode_run_time?: number[];
}

export interface ApiResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}
