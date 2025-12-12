export const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

export const POSTER_SIZES = {
  w92: "w92",
  w154: "w154",
  w185: "w185",
  w342: "w342",
  w500: "w500",
  w780: "w780",
  original: "original",
} as const;

export const BACKDROP_SIZES = {
  w300: "w300",
  w780: "w780",
  w1280: "w1280",
  original: "original",
} as const;

export const PROFILE_SIZES = {
  w45: "w45",
  w185: "w185",
  h632: "h632",
  original: "original",
} as const;

export const DEFAULT_POSTER = "/placeholder-poster.png";
export const DEFAULT_PROFILE = "/placeholder-profile.png"; // Assuming we have or will treat no image as a div
