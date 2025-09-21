"use client";
import Link from "next/link";
import { StarIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";

export default function MovieCard({ movie, category }) {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://placehold.co/600x900";
  const releaseYear = movie.release_date?.split("-")[0];

  const displayCategory = category
    ? category.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
    : "Featured";

  return (
    <Link
      href={`/movies/${movie.id}`}
      className="group block bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden relative"
    >
      <div className="relative">
        <img
          src={imageUrl}
          alt={movie.title}
          className="w-full h-72 sm:h-80 md:h-96 object-cover rounded-t-xl transition-transform duration-500 group-hover:scale-105"
        />

        {/* Clickable icon overlay */}
        <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/60 px-2 py-1 rounded text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ArrowTopRightOnSquareIcon className="w-4 h-4" />
          Open
        </div>

        {/* Top overlay with category + rating */}
        <div className="absolute top-2 left-2 flex flex-wrap gap-2 px-1 py-1">
          <span className="font-medium text-xs bg-[#25a1d6]/80 px-2 py-0.5 rounded text-white">
            {displayCategory}
          </span>
          <span className="flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded text-white text-xs">
            <StarIcon className="w-4 h-4 text-yellow-400" />
            {movie.vote_average.toFixed(1)}
          </span>
        </div>
      </div>

      <div className="p-4 flex flex-col justify-between h-auto">
        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 group-hover:text-[#25a1d6] transition-colors duration-300">
            {movie.title}
          </h3>
          <p className="text-sm sm:text-base text-gray-500 mt-1">
            {releaseYear}
          </p>
          <p className="text-sm sm:text-base text-gray-700 mt-2 line-clamp-4">
            {movie.overview?.length > 120
              ? movie.overview.substring(0, 117) + "..."
              : movie.overview || "No description available."}
          </p>
        </div>
      </div>
    </Link>
  );
}
