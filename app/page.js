import Hero from "./components/Hero";
import FeaturedMovies from "./components/FeaturedMovies";
import { fetchMovies } from "@/utils/tmdbapi";

export default async function Home() {
  let popularMovies = [];
  try {
    popularMovies = await fetchMovies("popular", 1);
  } catch (err) {
    console.error("Failed to fetch popular movies:", err);
  }

  const limitedFeatured = (popularMovies || []).slice(0, 6);

  return (
    <>
      <Hero />
      <FeaturedMovies movies={limitedFeatured} category="popular" />
    </>
  );
}
