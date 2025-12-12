import fs from "fs";
import path from "path";

let moviesCache: any = null;
let showsCache: any = null;
let actorsCache: any = null;

export async function getMovies() {
  if (moviesCache) return moviesCache;

  const filePath = path.join(process.cwd(), "data", "movies.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  moviesCache = JSON.parse(fileContents);
  return moviesCache;
}

export async function getShows() {
  if (showsCache) return showsCache;

  const filePath = path.join(process.cwd(), "data", "shows.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  showsCache = JSON.parse(fileContents);
  return showsCache;
}

export async function getActors() {
  if (actorsCache) return actorsCache;

  const filePath = path.join(process.cwd(), "data", "actors.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  actorsCache = JSON.parse(fileContents);
  return actorsCache;
}

export async function getMovieBySlug(slug: string) {
  const movies = await getMovies();
  // Ensure we compare strings to strings or numbers to numbers
  return movies.find((movie: any) => movie.id.toString() === slug.toString());
}

export async function getShowBySlug(slug: string) {
  const shows = await getShows();
  return shows.find((show: any) => show.id.toString() === slug.toString());
}

export async function getActorBySlug(slug: string) {
  const actors = await getActors();
  return actors.find((actor: any) => actor.id.toString() === slug.toString());
}
