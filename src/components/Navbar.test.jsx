import { render, screen, fireEvent } from "@testing-library/react";
import { Navbar } from "./Navbar";
import { FavoritesProvider } from "../context/FavoritesContext";

const renderWithProvider = (ui) => {
  return render(<FavoritesProvider>{ui}</FavoritesProvider>);
};

describe("Navbar Component Tests", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should render navbar with custom site name", () => {
    renderWithProvider(<Navbar siteName="My Movies" />);

    const siteName = screen.getByText("My Movies");
    expect(siteName).toBeInTheDocument();
  });

  it("should render all navigation links", () => {
    renderWithProvider(<Navbar />);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Movies")).toBeInTheDocument();
    expect(screen.getByText("TV Shows")).toBeInTheDocument();
    expect(screen.getByText("My List")).toBeInTheDocument();
  });

  it("should render search input", () => {
    renderWithProvider(<Navbar />);

    const searchInput = screen.getByPlaceholderText("Search movies...");
    expect(searchInput).toBeInTheDocument();
  });

  it("should toggle mobile menu on burger click", () => {
    renderWithProvider(<Navbar />);

    const burgerMenu = screen.getByRole("button", { name: /toggle menu/i });
    const navLinks = screen.getByRole("list");

    // Initially, mobile menu should not have 'active' class
    expect(navLinks).not.toHaveClass("active");

    // Click burger menu
    fireEvent.click(burgerMenu);

    // Mobile menu should have 'active' class
    expect(navLinks).toHaveClass("active");

    // Click again to close
    fireEvent.click(burgerMenu);

    // Mobile menu should not have 'active' class
    expect(navLinks).not.toHaveClass("active");
  });
});
