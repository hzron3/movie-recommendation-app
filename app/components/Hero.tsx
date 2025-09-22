// app/components/Hero.tsx
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { getGenres, CATEGORIES } from "utils/tmdbapi";
import { Movie, Genre, SearchParams } from "@/types";

interface HeroProps {
  heroMovie: Movie | null;
}

export default function Hero({ heroMovie }: HeroProps) {
  const [category, setCategory] = useState<keyof typeof CATEGORIES>("popular");
  const [genre, setGenre] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const [genres, setGenres] = useState<Genre[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchGenres(): Promise<void> {
      try {
        const data: Genre[] = await getGenres();
        setGenres(data);
      } catch (error) {
        console.error("Failed to load genres:", error);
      }
    }
    fetchGenres();
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set("category", category);
    if (genre) params.set("genre", genre);
    if (query.trim()) params.set("query", query.trim());
    router.push(`/movies?${params.toString()}`);
  };

  const backgroundUrl = heroMovie?.backdrop_path || "/hero-section-image.jpg";

  return (
    <section
      className="relative h-[85vh] sm:h-[90vh] flex items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 sm:bg-black/80" />

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-[48rem] mx-auto px-4 sm:px-6 lg:px-0">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-wide mb-6 sm:mb-10">
          Discover Amazing Movies
        </h1>

        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row gap-3 sm:gap-0 bg-white rounded-lg overflow-hidden shadow-md"
        >
          {/* Category select */}
          <div className="w-full sm:w-1/3 relative border-b sm:border-b-0 sm:border-r border-gray-200 flex items-center">
            <select
              value={category}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setCategory(e.target.value as keyof typeof CATEGORIES)
              }
              className="appearance-none w-full p-3 sm:p-2 text-gray-800 bg-white pr-10"
            >
              {Object.keys(CATEGORIES).map((cat) => (
                <option key={cat} value={cat}>
                  {cat
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                </option>
              ))}
            </select>
            <ChevronDownIcon className="w-5 h-5 absolute right-3 pointer-events-none text-[#25a1d6]" />
          </div>

          {/* Genre select */}
          <div className="w-full sm:w-1/3 relative border-b sm:border-b-0 sm:border-r border-gray-200 flex items-center">
            <select
              value={genre}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setGenre(e.target.value)
              }
              className="appearance-none w-full p-3 sm:p-2 text-gray-800 bg-white pr-10"
            >
              <option value="">All Genres</option>
              {genres.map((g) => (
                <option key={g.id} value={g.id.toString()}>
                  {g.name}
                </option>
              ))}
            </select>
            <ChevronDownIcon className="w-5 h-5 absolute right-3 pointer-events-none text-[#25a1d6]" />
          </div>

          {/* Search input */}
          <div className="w-full sm:w-1/3 flex items-center">
            <input
              type="text"
              placeholder="Search movies..."
              value={query}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setQuery(e.target.value)
              }
              className="w-full outline-none text-gray-800 p-3 sm:p-2"
            />
            <button
              type="submit"
              className="bg-[#25a1d6] hover:bg-[#1d88b3] text-white rounded-r-lg sm:rounded-none px-4 py-3 sm:min-w-[100px] transition-colors hover:cursor-pointer"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
