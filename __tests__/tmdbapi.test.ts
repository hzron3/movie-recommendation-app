process.env.NEXT_PUBLIC_TMDB_API_KEY = "test_key";
import { fetchMovies, fetchMovieDetails, getGenres } from "utils/tmdbapi";

global.fetch = jest.fn();

describe("tmdbapi", () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it("fetchMovies formats poster and backdrop paths", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        results: [{ id: 1, poster_path: "/a.jpg", backdrop_path: "/b.jpg" }],
      }),
    });

    const movies = await fetchMovies("popular", 1);
    expect(movies[0].poster_path).toContain("https://image.tmdb.org/t/p/w500");
    expect(movies[0].backdrop_path).toContain(
      "https://image.tmdb.org/t/p/w500"
    );
  });

  it("fetchMovieDetails appends credits and videos", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        id: 1,
        poster_path: "/a.jpg",
        backdrop_path: "/b.jpg",
        credits: {},
        videos: {},
      }),
    });

    const movie = await fetchMovieDetails(1);
    expect(movie.credits).toBeDefined();
    expect(movie.videos).toBeDefined();
  });

  it("getGenres returns list of genres", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ genres: [{ id: 1, name: "Action" }] }),
    });

    const genres = await getGenres();
    expect(genres[0].name).toBe("Action");
  });
});
