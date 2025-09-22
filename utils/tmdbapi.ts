// app/utils/tmdbapi.ts
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

// Categories mapping (TMDb endpoints)
export const CATEGORIES = {
  popular: "popular",
  top_rated: "top_rated",
  now_playing: "now_playing",
  upcoming: "upcoming",
} as const;

// Fetch all genres
export async function getGenres(): Promise<import("@/types").Genre[]> {
  if (!API_KEY)
    throw new Error("TMDb API key not configured. Check .env.local");

  const res = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
  const data = await res.json();

  // console.log("Genres API response:", { resultsCount: data.genres?.length });

  if (!data.genres) throw new Error("Failed to fetch genres");

  return data.genres;
}

// Fetch movies with optional category, genre, search, and pagination
export async function fetchMovies(
  category: import("@/types").Category = "popular",
  page: number = 1,
  genreId?: number,
  query?: string
): Promise<import("@/types").Movie[]> {
  if (!API_KEY)
    throw new Error("TMDb API key not configured. Check .env.local");

  // Determine endpoint
  const endpoint = query
    ? "/search/movie"
    : `/movie/${CATEGORIES[category] || "popular"}`;

  // Build query params
  let params = `api_key=${API_KEY}&page=${page}`;
  if (genreId) params += `&with_genres=${genreId}`;
  if (query) params += `&query=${encodeURIComponent(query)}`;

  const res = await fetch(`${BASE_URL}${endpoint}?${params}`, {
    cache: "force-cache",
  });
  const data = await res.json();

  if (!data.results) throw new Error(`Failed to fetch movies for ${category}`);

  return data.results.map((movie: any) => ({
    ...movie,
    poster_path: movie.poster_path ? `${IMAGE_BASE}${movie.poster_path}` : null,
    backdrop_path: movie.backdrop_path
      ? `${IMAGE_BASE}${movie.backdrop_path}`
      : null,
  }));
}

// Fetch details of a single movie
export async function fetchMovieDetails(
  id: number
): Promise<import("@/types").Movie> {
  if (!API_KEY)
    throw new Error("TMDb API key not configured. Check .env.local");

  const res = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=credits,videos`
  );
  const data = await res.json();

  // Handle null paths
  data.poster_path = data.poster_path
    ? `${IMAGE_BASE}${data.poster_path}`
    : null;
  data.backdrop_path = data.backdrop_path
    ? `${IMAGE_BASE}${data.backdrop_path}`
    : null;

  return data;
}
