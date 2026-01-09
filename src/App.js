import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import MovieList from './components/MovieList';
import { fetchMovies } from './services/movieService';
import './App.css';

function App() {
  // State variables using useState hook
  const [allMovies, setAllMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect hook for side effects (API call)
  useEffect(() => {
    loadMovies();
  }, []); // Empty dependency array - runs once on mount

  // Async function to load movies
  const loadMovies = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch movies from API using async/await
      const movies = await fetchMovies();
      setAllMovies(movies);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      {/* Props drilling: passing siteName to Navbar */}
      <Navbar siteName="MovieHub" />
      
      <main className="main-content">
        {/* Props drilling: passing title, movies, loading, error to MovieList */}
        <MovieList
          title="All Movies"
          movies={allMovies}
          loading={loading}
          error={error}
        />
      </main>
    </div>
  );
}

export default App;