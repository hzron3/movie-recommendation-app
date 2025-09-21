"use client";
import Link from "next/link";
import MovieCard from "./MovieCard";

export default function FeaturedMovies({ movies, category }) {
  if (!movies || movies.length === 0) return null;

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-start text-[#25a1d6] mb-12">
          Featured Movies
        </h2>

        <div className="flex overflow-x-auto space-x-6 pb-6 scrollbar-hide md:grid md:grid-cols-3 md:gap-8 md:overflow-x-visible">
          {movies.map((movie) => (
            <Link
              key={movie.id}
              href={`/movies/${movie.id}`}
              className="flex-shrink-0 md:flex-1"
            >
              <MovieCard movie={movie} category={category} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
