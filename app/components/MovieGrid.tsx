// app/components/MovieGrid.tsx
"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Movie, Genre, SearchParams } from "@/types";
import MovieCard from "./MovieCard";

interface MovieGridProps {
  movies: Movie[];
  genres: Genre[];
  category: string;
  query?: string;
  page: number;
  genreId?: string;
}

export default function MovieGrid({
  movies,
  genres,
  category,
  query = "",
  page,
  genreId = "",
}: MovieGridProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [localQuery, setLocalQuery] = useState<string>(query);
  const [localGenre, setLocalGenre] = useState<string>(genreId);

  // Update URL automatically whenever filter changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (localQuery) params.set("query", localQuery);
    else params.delete("query");

    if (localGenre) params.set("genre", localGenre);
    else params.delete("genre");

    params.set("category", category);
    params.set("page", "1");
    router.push(`/movies?${params.toString()}`);
  }, [localQuery, localGenre, category, searchParams, router]);

  const changePage = (newPage: number): void => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`/movies?${params.toString()}`);
  };

  return (
    <>
      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-4 items-center bg-white rounded-lg p-4 shadow-md max-w-4xl mx-auto">
        <input
          type="text"
          value={localQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setLocalQuery(e.target.value)
          }
          placeholder="Search within category..."
          className="flex-1 min-w-[200px] p-3 rounded border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
        />
        <select
          value={localGenre}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setLocalGenre(e.target.value)
          }
          className="p-3 rounded border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
        >
          <option value="">All Genres</option>
          {genres.map((g) => (
            <option key={g.id} value={g.id.toString()}>
              {g.name}
            </option>
          ))}
        </select>
      </div>

      {/* Movie grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
        {movies.map((movie) => (
          <Link key={movie.id} href={`/movies/${movie.id}`}>
            <MovieCard movie={movie} category={category} />
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center space-x-3 mt-4">
        {page > 1 && (
          <button
            onClick={() => changePage(page - 1)}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded transition-colors duration-200"
          >
            Prev
          </button>
        )}
        <span className="px-4 py-2 font-medium">Page {page}</span>
        <button
          onClick={() => changePage(page + 1)}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded transition-colors duration-200"
        >
          Next
        </button>
      </div>
    </>
  );
}
