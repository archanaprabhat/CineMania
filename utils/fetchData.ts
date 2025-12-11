import fs from "fs";
import path from "path";

export async function getMovies() {
  const filePath = path.join(process.cwd(), "data", "movies.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  return JSON.parse(fileContents);
}

export async function getShows() {
  const filePath = path.join(process.cwd(), "data", "shows.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  return JSON.parse(fileContents);
}

export async function getMovieBySlug(slug: string) {
  // In a real app, slug would be unique. Here we assume ID or title slug.
  // For simplicity, let's assume the slug is the ID for now, or we can generate a slug from title.
  // The user asked for /movies/[slug]. Let's assume we find by ID if slug is ID, or title.
  // Let's modify this to find by ID for simplicity as the JSON has IDs.
  // But the URL is [slug]. Let's assume the slug is the ID.
  const movies = await getMovies();
  return movies.find((movie: any) => movie.id === slug);
}

export async function getShowBySlug(slug: string) {
  const shows = await getShows();
  return shows.find((show: any) => show.id === slug);
}

export async function getActors() {
  const filePath = path.join(process.cwd(), "data", "actors.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  return JSON.parse(fileContents);
}
