import { TMDB_IMAGE_BASE_URL, POSTER_SIZES, BACKDROP_SIZES, PROFILE_SIZES, DEFAULT_POSTER } from './constants'

type PosterSize = keyof typeof POSTER_SIZES
type BackdropSize = keyof typeof BACKDROP_SIZES
type ProfileSize = keyof typeof PROFILE_SIZES

export const getPosterUrl = (path: string | null | undefined, size: PosterSize = 'w500'): string => {
  if (!path) return DEFAULT_POSTER
  return `${TMDB_IMAGE_BASE_URL}/${POSTER_SIZES[size]}${path}`
}

export const getBackdropUrl = (path: string | null | undefined, size: BackdropSize = 'original'): string | null => {
  if (!path) return null
  return `${TMDB_IMAGE_BASE_URL}/${BACKDROP_SIZES[size]}${path}`
}

export const getProfileUrl = (path: string | null | undefined, size: ProfileSize = 'w185'): string | null => {
  if (!path) return null
  return `${TMDB_IMAGE_BASE_URL}/${PROFILE_SIZES[size]}${path}`
}
