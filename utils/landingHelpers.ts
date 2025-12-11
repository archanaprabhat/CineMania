export function getLandingData({ movies, shows }: any) {
  const moviePosters = movies
    .map((m: any) => m.poster_path)
    .filter(Boolean)
    .map((p: string) => `https://image.tmdb.org/t/p/w342${p}`);

  const showPosters = shows
    .map((s: any) => s.poster_path)
    .filter(Boolean)
    .map((p: string) => `https://image.tmdb.org/t/p/w342${p}`);

  const posters = [...moviePosters, ...showPosters].slice(0, 50);

  return { posters };
}
