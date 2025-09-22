// app/movies/[id]/page.tsx
import { auth } from "Auth";
import { fetchMovieDetails } from "utils/tmdbapi";
import { redirect, notFound } from "next/navigation";
import { StarIcon } from "@heroicons/react/24/solid";
import { Movie } from "@/types";

interface MoviePageProps {
  params: { id: string | string[] };
}

export default async function MoviePage({ params }: MoviePageProps) {
  const session = await auth();
  const resolvedParams = await params;
  const id = Array.isArray(resolvedParams.id)
    ? resolvedParams.id[0]
    : resolvedParams.id;

  const movieId = parseInt(id);
  if (!session) redirect("/login");

  let movie: Movie | null = null;
  try {
    movie = await fetchMovieDetails(movieId);
  } catch (error) {
    console.error("Fetch movie error:", error);
    notFound();
  }

  if (!movie) notFound();

  // ✅ Placeholder fallbacks
  const PLACEHOLDER_BACKDROP =
    "https://placehold.co/1200x600/png?text=No+Backdrop";
  const PLACEHOLDER_POSTER = "https://placehold.co/600x900/png?text=No+Poster";

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path.replace(
        "https://image.tmdb.org/t/p/w500",
        ""
      )}`
    : PLACEHOLDER_BACKDROP;

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : PLACEHOLDER_POSTER;

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-8">
      {/* Hero / Banner */}
      <div className="relative h-[50vh] md:h-[50vh] rounded-xl overflow-hidden shadow-lg">
        <img
          src={backdropUrl}
          alt={movie.title || "Movie"}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6 md:p-12">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg">
            {movie.title || "Untitled"}
          </h1>
          {movie.tagline && (
            <p className="mt-2 text-gray-200 italic text-lg md:text-xl drop-shadow">
              {movie.tagline}
            </p>
          )}
        </div>
      </div>

      {/* Movie Details */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Poster */}
        <div className="hidden md:block rounded-xl overflow-hidden shadow-lg">
          <img
            src={posterUrl}
            alt={movie.title || "Movie Poster"}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Info */}
        <div className="md:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="flex flex-wrap items-center gap-4">
            {movie.release_date && (
              <span className="px-3 py-1 bg-[#25a1d6]/20 text-[#25a1d6] font-semibold rounded-full">
                Release: {movie.release_date}
              </span>
            )}
            {movie.runtime && (
              <span className="px-3 py-1 bg-[#25a1d6]/20 text-[#25a1d6] font-semibold rounded-full">
                Runtime: {movie.runtime} min
              </span>
            )}
            {movie.vote_average !== undefined && (
              <span className="flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 font-semibold rounded-full">
                <StarIcon className="w-4 h-4" />
                {movie.vote_average}/10
              </span>
            )}
          </div>

          {/* Overview */}
          {movie.overview && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Overview
              </h2>
              <p className="text-gray-700 leading-relaxed">{movie.overview}</p>
            </div>
          )}

          {/* Genres */}
          {movie.genres?.length ? (
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Genres
              </h3>
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((g) => (
                  <span
                    key={g.id}
                    className="px-3 py-1 bg-[#25a1d6]/20 text-[#25a1d6] rounded-full font-medium"
                  >
                    {g.name}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          {/* Cast */}
          {movie.credits?.cast?.length ? (
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Top Cast
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {movie.credits.cast.slice(0, 6).map((actor) => (
                  <div
                    key={actor.id}
                    className="bg-gray-100 rounded-lg p-2 text-center shadow-sm hover:shadow-md transition-shadow"
                  >
                    <p className="font-medium text-gray-800">{actor.name}</p>
                    <p className="text-gray-500 text-sm">
                      as {actor.character}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {/* Trailer */}
          {movie.videos?.results?.length ? (
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Trailer
              </h3>
              <div
                className="w-full rounded-xl overflow-hidden shadow-lg"
                style={{ aspectRatio: "16/7" }}
              >
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${movie.videos.results[0]?.key}`}
                  title="Trailer"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
