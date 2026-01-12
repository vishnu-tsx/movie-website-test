import { createSlice } from '@reduxjs/toolkit';

const getMovieKey = (movie) => `${movie.Title}::${movie.Year}`;

const loadFavoritesFromStorage = () => {
  try {
    const saved = localStorage.getItem('favorites');
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
};

const initialState = {
  favorites: loadFavoritesFromStorage(),
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      const movie = action.payload;
      const key = getMovieKey(movie);
      const exists = state.favorites.find((fav) => getMovieKey(fav) === key);

      if (!exists) {
        state.favorites.push(movie);
      }
    },
    removeFavorite: (state, action) => {
      const movieKey = action.payload; // "Title::Year"
      state.favorites = state.favorites.filter(
        (fav) => getMovieKey(fav) !== movieKey
      );
    },
    clearAllFavorites: (state) => {
      state.favorites = [];
    },
  },
});

export const { addFavorite, removeFavorite, clearAllFavorites } =
  favoritesSlice.actions;

export const selectFavorites = (state) => state.favorites.favorites;
export const selectFavoritesCount = (state) => state.favorites.favorites.length;
export const selectIsFavorite = (state, movieKey) => {
  return state.favorites.favorites.some((fav) => getMovieKey(fav) === movieKey);
};

export default favoritesSlice.reducer;
