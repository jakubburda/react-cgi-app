// Importi Redux Toolkit to simplify the Redux store configuration
import { configureStore } from '@reduxjs/toolkit';

// Import reducers to manage different parts of the application state
import jokeReducer from './slices/jokeSlices';
import categoryReducer from './slices/categorySlice';
import jokeSearchReducer from './slices/jokeSearchSlice';

/**
 * Configures the Redux store with the specified reducer logic.
 * Uses Redux Toolkit's `configureStore` to automatically set up the store with useful defaults.
 * @returns {Object} The configured Redux store.
 */
const store = configureStore({
    reducer: {
        joke: jokeReducer,
        category: categoryReducer,
        jokeSearch: jokeSearchReducer
      },
});

export default store;