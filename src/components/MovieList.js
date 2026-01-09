import React from 'react';
import PropTypes from 'prop-types';
import MovieCard from './MovieCard';
import './MovieList.css';

const MovieList = ({ title, movies, loading, error }) => {
  // Loading state
  if (loading) {
    return (
      <div className="movie-list-section">
        <h2 className="movie-list-title">{title}</h2>
        <div className="loading">Loading movies...</div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="movie-list-section">
        <h2 className="movie-list-title">{title}</h2>
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  // Empty state
  if (!movies || movies.length === 0) {
    return (
      <div className="movie-list-section">
        <h2 className="movie-list-title">{title}</h2>
        <div className="no-movies">No movies found</div>
      </div>
    );
  }

  // Success state - render movie grid
  return (
    <div className="movie-list-section">
      <h2 className="movie-list-title">{title}</h2>
      <div className="movie-list-grid">
        {movies.map((movie, index) => (
          <MovieCard key={`${movie.Title}-${index}`} movie={movie} />
        ))}
      </div>
    </div>
  );
};

// PropTypes for type checking
MovieList.propTypes = {
  title: PropTypes.string.isRequired,
  movies: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  error: PropTypes.string,
};

// Default props
MovieList.defaultProps = {
  movies: [],
  loading: false,
  error: null,
};

export default MovieList;