"use client";

import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { fetchMovies, getGenres } from "@/utils/tmdbapi";

const CATEGORIES = ["popular", "now_playing", "upcoming", "top_rated"];
const MOVIES_PER_PAGE = 16;
const LOAD_MORE_COUNT = 8;

export default function MoviesPage({ searchParams }) {
  const initialCategory = searchParams?.category || "popular";
  const initialGenre = searchParams?.genre || "";
  const initialQuery = searchParams?.query || "";

  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [category, setCategory] = useState(initialCategory);
  const [genreId, setGenreId] = useState(initialGenre);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const [loadedCount, setLoadedCount] = useState(MOVIES_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    getGenres().then(setGenres).catch(console.error);
  }, []);

  useEffect(() => {
    async function loadMovies() {
      setLoading(true);
      try {
        const data = await fetchMovies(
          category,
          1,
          genreId || null,
          searchQuery || null
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

  const handleLoadMore = () => {
    setLoadedCount((prev) => Math.min(prev + LOAD_MORE_COUNT, movies.length));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setLoadedCount(MOVIES_PER_PAGE);
  };

  const startIndex = (currentPage - 1) * MOVIES_PER_PAGE;
  const visibleMovies = movies.slice(startIndex, startIndex + loadedCount);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 my-8">
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          {/* Category */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 border rounded w-full sm:w-auto"
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
            onChange={(e) => setGenreId(e.target.value)}
            className="p-2 border rounded w-full sm:w-auto"
          >
            <option value="">All Genres</option>
            {genres.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
        </div>

        {/* Search */}
        <div className="flex rounded-md border-2 border-sky-400 overflow-hidden w-full sm:max-w-xs">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
              className="w-5 h-5 text-white"
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

      {/* Loading */}
      {loading && (
        <div className="flex justify-center my-8">
          <div className="w-12 h-12 border-4 border-sky-300 border-t-sky-500 rounded-full animate-spin"></div>
        </div>
      )}

      {/* Movies */}
      {!loading && visibleMovies.length === 0 && (
        <p className="text-center text-gray-500">No movies found.</p>
      )}

      {!loading && visibleMovies.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {visibleMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} category={category} />
            ))}
          </div>

          {/* Load More */}
          {loadedCount < movies.length && (
            <div className="flex justify-center mt-6">
              <button
                onClick={handleLoadMore}
                className="px-6 py-2 bg-sky-500 text-white font-semibold rounded hover:bg-sky-500/80 transition"
              >
                Load More
              </button>
            </div>
          )}

          {/* Pagination */}
          <ul className="flex flex-wrap justify-center mt-6 gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <li
                key={page}
                onClick={() => handlePageChange(page)}
                className={`flex items-center justify-center cursor-pointer w-9 h-9 rounded-md border ${
                  page === currentPage
                    ? "bg-sky-500 text-white border-sky-500"
                    : "bg-gray-100 text-gray-700 border-gray-200 hover:border-sky-500"
                }`}
              >
                {page}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
