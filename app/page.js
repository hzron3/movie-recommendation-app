import Hero from "./components/Hero";
import FeaturedMovies from "./components/FeaturedMovies";
import { fetchMovies } from "@/utils/tmdbapi";

export default async function Home() {
  const [featuredMovies] = await Promise.all([fetchMovies("popular", 1)]);

  const limitedFeatured = (featuredMovies || []).slice(0, 6);
  return (
    <>
      <Hero />
      <FeaturedMovies movies={limitedFeatured} />
    </>
  );
}
