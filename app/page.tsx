// app/page.tsx
import Hero from "./components/Hero";
import FeaturedMovies from "./components/FeaturedMovies";
import { fetchMovies } from "utils/tmdbapi";
import { Movie } from "@/types";

export default async function Home() {
  let popularMovies: Movie[] = [];
  let heroMovie: Movie | null = null;
  try {
    popularMovies = await fetchMovies("popular", 1);
    // heroMovie = await fetchHeroMovie();
  } catch (err) {
    console.error("Failed to fetch popular movies:", err);
  }

  const limitedFeatured = (popularMovies || []).slice(0, 6);

  return (
    <>
      <Hero heroMovie={heroMovie} />
      <FeaturedMovies movies={limitedFeatured} category="popular" />
    </>
  );
}
