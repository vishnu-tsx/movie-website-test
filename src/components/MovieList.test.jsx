import { render, screen } from "@testing-library/react";
import { MovieList } from "./MovieList";
import { FavoritesProvider } from "../context/FavoritesContext";

const renderWithProvider = (ui) => {
  return render(<FavoritesProvider>{ui}</FavoritesProvider>);
};

describe("MovieList Component Tests", () => {
  const mockMovies = [
    {
      imdbID: "tt1234567",
      Title: "The Lion King",
      Year: "2019",
      Runtime: "118 min",
      Poster: "https://example.com/poster1.jpg",
    },
    {
      imdbID: "tt7654321",
      Title: "John Wick",
      Year: "2014",
      Runtime: "101 min",
      Poster: "https://example.com/poster2.jpg",
    },
  ];

  beforeEach(() => {
    localStorage.clear();
  });

  it("should render loading state", () => {
    render(<MovieList title="Test Movies" loading={true} />);

    expect(screen.getByText("Loading movies...")).toBeInTheDocument();
  });

  it("should render error state", () => {
    render(<MovieList title="Test Movies" error="Failed to fetch" />);

    expect(screen.getByText("Error: Failed to fetch")).toBeInTheDocument();
  });

  it("should render empty state", () => {
    render(<MovieList title="Test Movies" movies={[]} />);

    expect(screen.getByText("No movies found")).toBeInTheDocument();
  });

  it("should render movie list with title", () => {
    renderWithProvider(<MovieList title="All Movies" movies={mockMovies} />);

    expect(screen.getByText("All Movies")).toBeInTheDocument();
  });

  it("should render all movies in the list", () => {
    renderWithProvider(<MovieList title="Test Movies" movies={mockMovies} />);

    expect(screen.getAllByText("The Lion King").length).toBeGreaterThan(0);
    expect(screen.getAllByText("John Wick").length).toBeGreaterThan(0);
  });
});
