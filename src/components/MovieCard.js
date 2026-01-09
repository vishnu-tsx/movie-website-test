import React from 'react';
import PropTypes from 'prop-types';
import { getImageUrl } from '../services/movieService';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  // Destructure movie object
  const { Title, Year, Runtime, Poster } = movie;
  
  // Get image URL with fallback
  const imageUrl = getImageUrl(Poster);

  return (
    <div className="movie-card">
      <div className="movie-card-image">
        <img src={imageUrl} alt={Title} />
        <div className="movie-card-overlay">
          <div className="movie-overlay-content">
            <h3>{Title}</h3>
            <p className="movie-runtime">{Runtime || 'Runtime not available'}</p>
          </div>
        </div>
      </div>
      <div className="movie-card-info">
        <h3 className="movie-title">{Title}</h3>
        <div className="movie-details">
          <span className="movie-year">📅 {Year}</span>
          <span className="movie-duration">⏱️ {Runtime || 'N/A'}</span>
        </div>
      </div>
    </div>
  );
};

// PropTypes for type checking
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Year: PropTypes.string.isRequired,
    Runtime: PropTypes.string,
    Poster: PropTypes.string,
  }).isRequired,
};

export default MovieCard;