// app/components/FeaturedMovies.tsx
"use client";
import Link from "next/link";
import { Movie, Category } from "@/types";
import MovieCard from "./MovieCard";

interface FeaturedMoviesProps {
  movies: Movie[];
  category: Category;
}

export default function FeaturedMovies({
  movies,
  category,
}: FeaturedMoviesProps) {
  if (!movies || movies.length === 0) return null;

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-start text-[#25a1d6] mb-8 sm:mb-12">
          Featured Movies
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
