import PropTypes from "prop-types";
import { getImageUrl } from "../services/movieService";
import { useFavorites } from "../context/FavoritesContext";
import "./MovieCard.css";

export const MovieCard = ({ movie }) => {
  const { Title: title, Year: year, Runtime: runtime, Poster: poster } = movie;
  const imageUrl = getImageUrl(poster);
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const movieKey = movie.imdbID ?? title;
  const isMovieFavorite = isFavorite(movieKey);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (isMovieFavorite) {
      removeFavorite(movieKey);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <div className="movie-card">
      <div className="movie-card-image">
        <button
          type="button"
          className="favorite-button"
          onClick={handleFavoriteClick}
          aria-label={
            isMovieFavorite ? "Remove from favorites" : "Add to favorites"
          }
        >
          {isMovieFavorite ? "❤️" : "🤍"}
        </button>
        <img src={imageUrl} alt={title} />
        <div className="movie-card-overlay">
          <div className="movie-overlay-content">
            <h3>{title}</h3>
            <p className="movie-runtime">
              {runtime ?? "Runtime not available"}
            </p>
          </div>
        </div>
      </div>
      <div className="movie-card-info">
        <h3 className="movie-title">{title}</h3>
        <div className="movie-details">
          <span className="movie-year">📅 {year}</span>
          <span className="movie-duration">⏱️ {runtime ?? "N/A"}</span>
        </div>
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    imdbID: PropTypes.string,
    Title: PropTypes.string.isRequired,
    Year: PropTypes.string.isRequired,
    Runtime: PropTypes.string,
    Poster: PropTypes.string,
  }).isRequired,
};
