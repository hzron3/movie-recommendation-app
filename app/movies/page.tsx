// app/movies/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Movie, Genre, SearchParams } from "@/types";
import MovieCard from "@/components/MovieCard";
import { fetchMovies, getGenres } from "utils/tmdbapi";
import MovieGrid from "@/components/MovieGrid"; // Now using the extracted component

const CATEGORIES = ["popular", "now_playing", "upcoming", "top_rated"] as const;
const MOVIES_PER_PAGE = 16;
const LOAD_MORE_COUNT = 8;

interface MoviesPageProps {
  searchParams: SearchParams;
}

export default function MoviesPage({ searchParams }: MoviesPageProps) {
  const initialCategory = searchParams?.category || "popular";
  const initialGenre = searchParams?.genre || "";
  const initialQuery = searchParams?.query || "";
  const initialPage = parseInt(searchParams?.page || "1");

  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [category, setCategory] = useState<string>(initialCategory);
  const [genreId, setGenreId] = useState<string>(initialGenre);
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadedCount, setLoadedCount] = useState<number>(MOVIES_PER_PAGE);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [totalPages, setTotalPages] = useState<number>(1);

  // Fetch genres once
  useEffect(() => {
    getGenres().then(setGenres).catch(console.error);
  }, []);

  // Fetch movies whenever filters/search change
  useEffect(() => {
    async function loadMovies(): Promise<void> {
      setLoading(true);
      try {
        const data: Movie[] = await fetchMovies(
          category as (typeof CATEGORIES)[number],
          1,
          genreId ? parseInt(genreId) : undefined,
          searchQuery || undefined
        );

        setMovies(data || []);
        setLoadedCount(Math.min(MOVIES_PER_PAGE, data.length));
        setCurrentPage(1);
        setTotalPages(Math.ceil((data?.length || 0) / MOVIES_PER_PAGE));
      } catch (err) {
        console.error(err);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    }
    loadMovies();
  }, [category, genreId, searchQuery]);

  const handleLoadMore = (): void => {
    setLoadedCount((prev) => Math.min(prev + LOAD_MORE_COUNT, movies.length));
  };

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
    setLoadedCount(MOVIES_PER_PAGE);
  };

  // Compute visible movies for current page
  const startIndex = (currentPage - 1) * MOVIES_PER_PAGE;
  const visibleMovies = movies.slice(startIndex, startIndex + loadedCount);

  return (
    <div className="max-w-7xl mx-auto sm:p-4 space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap gap-4 my-12 items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {/* Category */}
          <select
            value={category}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setCategory(e.target.value)
            }
            className="p-2 border rounded"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase())}
              </option>
            ))}
          </select>

          {/* Genre */}
          <select
            value={genreId}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setGenreId(e.target.value)
            }
            className="p-2 border rounded"
          >
            <option value="">All Genres</option>
            {genres.map((g) => (
              <option key={g.id} value={g.id.toString()}>
                {g.name}
              </option>
            ))}
          </select>
        </div>

        {/* Search */}
        <div className="flex rounded-md border-2 border-sky-400 overflow-hidden max-w-xs">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchQuery(e.target.value)
            }
            className="w-full outline-none bg-white text-gray-600 text-sm px-4 py-2"
          />
          <button
            type="button"
            className="flex items-center justify-center bg-sky-400 px-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Loading spinner */}
      {loading && (
        <div className="flex justify-center my-8">
          <div className="w-12 h-12 border-4 border-sky-300 border-t-sky-500 rounded-full animate-spin"></div>
        </div>
      )}

      {/* Movie grid */}
      {!loading && visibleMovies.length === 0 && (
        <p className="text-center text-gray-500">No movies found.</p>
      )}

      {!loading && visibleMovies.length > 0 && (
        <>
          <MovieGrid
            movies={visibleMovies}
            genres={genres}
            category={category}
            query={searchQuery}
            page={currentPage}
            genreId={genreId}
          />

          {/* Load More */}
          {loadedCount < movies.length && (
            <div className="flex justify-center mt-6">
              <button
                onClick={handleLoadMore}
                className="px-6 py-2 bg-[#25a1d6] text-white font-semibold rounded hover:bg-[#25a1d6]/80 transition"
              >
                Load More
              </button>
            </div>
          )}

          {/* Pagination */}
          <ul className="flex space-x-3 justify-center mt-6">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNum) => (
                <li
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`flex items-center justify-center cursor-pointer w-9 h-9 rounded-md border ${
                    pageNum === currentPage
                      ? "bg-sky-500 text-white border-sky-500"
                      : "bg-gray-100 text-gray-700 border-gray-200 hover:border-sky-500"
                  }`}
                >
                  {pageNum}
                </li>
              )
            )}
          </ul>
        </>
      )}
    </div>
  );
}
