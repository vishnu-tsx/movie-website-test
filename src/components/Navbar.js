import { useState } from "react";
import { useFavorites } from "../context/FavoritesContext";
import PropTypes from "prop-types";
import "./Navbar.css";

export const Navbar = ({ siteName }) => {
  const navLinks = ["Home", "Movies", "TV Shows", "My List"];
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { favoritesCount } = useFavorites();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <h2>{siteName || "MovieHub"}</h2>
        </div>

        <button
          className={`burger-menu ${isMobileMenuOpen ? "menu-open-state" : ""}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`navbar-links ${isMobileMenuOpen ? "active" : ""}`}>
          {navLinks.map((link) => (
            <li
              key={link}
              className="navbar-link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link}
              {link === "My List" && favoritesCount > 0 && (
                <span className="favorites-badge">{favoritesCount}</span>
              )}
            </li>
          ))}
        </ul>

        <div className="navbar-search">
          <input type="text" placeholder="Search movies..." />
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  siteName: PropTypes.string,
};

Navbar.defaultProps = {
  siteName: "MovieHub",
};
