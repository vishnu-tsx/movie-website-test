import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }
  return context;
};

const getMovieKey = (movie) => movie?.imdbID ?? movie?.Title;

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem("favorites");
      return saved ? JSON.parse(saved) : [];
    } catch {
      localStorage.removeItem("favorites");
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (movie) => {
    const key = getMovieKey(movie);
    if (!key) return;
    setFavorites((prev) =>
      prev.some((fav) => getMovieKey(fav) === key) ? prev : [...prev, movie]
    );
  };

  const removeFavorite = (movieKey) => {
    setFavorites((prev) => prev.filter((fav) => getMovieKey(fav) !== movieKey));
  };

  const isFavorite = (movieKey) => {
    return favorites.some((fav) => getMovieKey(fav) === movieKey);
  };

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    favoritesCount: favorites.length,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

FavoritesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
