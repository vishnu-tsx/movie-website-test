import { render, screen } from "@testing-library/react";
import { MovieCard } from "./MovieCard";
import { FavoritesProvider } from "../context/FavoritesContext";

const renderWithProvider = (ui) => {
  return render(<FavoritesProvider>{ui}</FavoritesProvider>);
};

describe("MovieCard", () => {
  const mockMovie = {
    imdbID: "tt1234567",
    Title: "The Lion King",
    Year: "2019",
    Runtime: "118 min",
    Poster: "https://example.com/poster.jpg",
  };

  beforeEach(() => {
    localStorage.clear();
  });

  it("should render movie card with movie title", () => {
    renderWithProvider(<MovieCard movie={mockMovie} />);

    const title = screen.getAllByText("The Lion King")[0];
    expect(title).toBeInTheDocument();
  });

  it("should render movie year", () => {
    renderWithProvider(<MovieCard movie={mockMovie} />);

    const year = screen.getByText(/2019/);
    expect(year).toBeInTheDocument();
  });

  it("should render movie runtime", () => {
    renderWithProvider(<MovieCard movie={mockMovie} />);

    const runtime = screen.getAllByText(/118 min/)[0];
    expect(runtime).toBeInTheDocument();
  });

  it("should render placeholder when runtime is missing", () => {
    const movieWithoutRuntime = { ...mockMovie, Runtime: undefined };
    renderWithProvider(<MovieCard movie={movieWithoutRuntime} />);

    expect(screen.getByText(/Runtime not available/)).toBeInTheDocument();
  });

  it("should render movie poster image", () => {
    renderWithProvider(<MovieCard movie={mockMovie} />);

    const image = screen.getByAltText("The Lion King");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "https://example.com/poster.jpg");
  });
});
