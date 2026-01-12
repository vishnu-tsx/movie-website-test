import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './favoritesSlice';

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
});

store.subscribe(() => {
  try {
    if (typeof localStorage === 'undefined') return;
    const favorites = store.getState().favorites.favorites;
    localStorage.setItem('favorites', JSON.stringify(favorites));
  } catch {
    // ignore persistence failures
  }
});
