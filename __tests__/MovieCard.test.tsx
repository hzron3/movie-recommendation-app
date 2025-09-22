import { render, screen } from "@testing-library/react";
import MovieCard from "@/components/MovieCard";
import { Movie } from "@/types";

const movie: Movie = {
  id: 1,
  title: "Test Movie",
  poster_path: "https://image.tmdb.org/t/p/w500/test.jpg",
};

describe("MovieCard", () => {
  it("renders movie title", () => {
    render(<MovieCard movie={movie} category="popular" />);
    expect(screen.getByText("Test Movie")).toBeInTheDocument();
  });

  it("uses placeholder if no poster", () => {
    const noPoster = { ...movie, poster_path: null };
    render(<MovieCard movie={noPoster} category="popular" />);
    const img = screen.getByRole("img") as HTMLImageElement;
    expect(img.src).toContain("placehold.co");
  });
});
