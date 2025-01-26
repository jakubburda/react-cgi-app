// Import Redux Toolkit's createSlice to simplify state management
import { createSlice } from '@reduxjs/toolkit';

// Initial state for the joke slice
const initialState = {
  joke: '', 
  isLoading: false,
  error: null,
};

// Create the joke slice
const jokeSlice = createSlice({
  name: 'joke',
  initialState,
  reducers: {
    // Action to set a new joke
    setJoke(state, action) {
      state.joke = action.payload;
    },
    // Action to toggle the loading state
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    // Action to set an error message
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setJoke, setLoading, setError } = jokeSlice.actions;

export default jokeSlice.reducer;
