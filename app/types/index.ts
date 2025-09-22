// app/types/index.ts
export type Category = "popular" | "top_rated" | "now_playing" | "upcoming";

export interface Movie {
  id: number;
  title: string;
  overview?: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  release_date?: string;
  vote_average?: number;
  runtime?: number;
  genres?: { id: number; name: string }[] | undefined;
  tagline?: string;
  credits?: {
    cast?: { id: number; name: string; character: string }[] | undefined;
  };
  videos?: {
    results?: { key: string }[] | undefined;
  };
}

export interface Genre {
  id: number;
  name: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface SearchParams {
  category?: Category;
  genre?: string;
  query?: string;
  page?: string;
}
