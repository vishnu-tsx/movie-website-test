import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './favoritesSlice';

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
});

store.subscribe(() => {
  const favorites = store.getState().favorites.favorites;
  localStorage.setItem('favorites', JSON.stringify(favorites));
});
