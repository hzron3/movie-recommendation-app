"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { getGenres, CATEGORIES } from "@/utils/tmdbapi";

export default function Hero({ heroMovie }) {
  const [category, setCategory] = useState("popular");
  const [genre, setGenre] = useState("");
  const [query, setQuery] = useState("");
  const [genres, setGenres] = useState([]);
  const router = useRouter();

  // Fetch genres on mount
  useEffect(() => {
    async function fetchGenres() {
      try {
        const data = await getGenres();
        setGenres(data);
      } catch (error) {
        console.error("Failed to load genres:", error);
      }
    }
    fetchGenres();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    // Build query string
    const params = new URLSearchParams();
    params.set("category", category);
    if (genre) params.set("genre", genre);
    if (query.trim()) params.set("query", query.trim());
    router.push(`/movies?${params.toString()}`);
  };

  const backgroundUrl = heroMovie?.backdrop_path || "/hero-section-image.jpg";

  return (
    <section
      className="relative h-[85vh] flex items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/80" />

      <div className="relative z-10 text-center text-white max-w-[50rem] mx-auto px-4">
        <div className="w-full hidden sm:flex flex-col gap-6 z-50">
          <h1 className="text-lg sm:text-6xl font-bold tracking-wider">
            Discover Amazing Movies.
          </h1>

          <form
            className="w-full flex flex-col sm:flex-row rounded-lg bg-white overflow-hidden"
            onSubmit={handleSearch}
          >
            {/* Category select */}
            <div className="w-full sm:w-1/3 relative border-r border-slate-200 flex items-center">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="appearance-none w-full p-2 text-slate-800 bg-white pr-10 hover:cursor-pointer"
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
            <div className="w-full sm:w-1/3 relative border-r border-slate-200 flex items-center">
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="appearance-none w-full p-2 text-slate-800 bg-white pr-10 hover:cursor-pointer"
              >
                <option value="">All Genres</option>
                {genres.map((g) => (
                  <option key={g.id} value={g.id}>
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
                onChange={(e) => setQuery(e.target.value)}
                className="w-full outline-none text-base text-[#25a1d6] bg-white py-3 px-4"
              />
              <button
                type="submit"
                className="m-2 sm:min-w-[120px] bg-[#25a1d6] hover:bg-[#25a1d6]/80 text-white rounded-lg px-4 py-3 font-medium transition-colors"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
