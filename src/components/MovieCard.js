import PropTypes from 'prop-types';
import { getImageUrl } from '../services/movieService';
import { useDispatch, useSelector } from 'react-redux';
import {
  addFavorite,
  removeFavorite,
  selectIsFavorite,
} from '../redux/favoritesSlice';
import './MovieCard.css';

export const MovieCard = ({ movie }) => {
  const { Title: title, Year: year, Runtime: runtime, Poster: poster } = movie;
  const dispatch = useDispatch();
  const movieKey = `${title}::${year}`;
  const isMovieFavorite = useSelector((state) =>
    selectIsFavorite(state, movieKey)
  );

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (isMovieFavorite) {
      dispatch(removeFavorite(movieKey));
    } else {
      dispatch(addFavorite(movie));
    }
  };
  const imageUrl = getImageUrl(poster);

  return (
    <div className="movie-card">
      <div className="movie-card-image">
        <img src={imageUrl} alt={title} />
        <button
          className="favorite-button"
          onClick={handleFavoriteClick}
          aria-label={
            isMovieFavorite ? 'Remove from favorites' : 'Add to favorites'
          }
        >
          {isMovieFavorite ? '❤️' : '🤍'}
        </button>
        <div className="movie-card-overlay">
          <div className="movie-overlay-content">
            <h3>{title}</h3>
            <p className="movie-runtime">
              {runtime ?? 'Runtime not available'}
            </p>
          </div>
        </div>
      </div>
      <div className="movie-card-info">
        <h3 className="movie-title">{title}</h3>
        <div className="movie-details">
          <span className="movie-year">📅 {year}</span>
          <span className="movie-duration">⏱️ {runtime ?? 'N/A'}</span>
        </div>
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Year: PropTypes.string.isRequired,
    Runtime: PropTypes.string,
    Poster: PropTypes.string,
  }).isRequired,
};
