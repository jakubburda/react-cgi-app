// Import Redux Toolkit's createSlice to simplify state management
import { createSlice } from '@reduxjs/toolkit';

// Initial state for the joke search slice
const initialState = {
  query: '',
  result: '',
  isLoading: false,
  error: null,
};

// Create the joke search slice
const jokeSearchSlice = createSlice({
  name: 'jokeSearch',
  initialState,
  reducers: {
    // Action to set the search query
    setSearchQuery(state, action) {
      state.query = action.payload;
    },
    // Action to set the search result
    setSearchResult(state, action) {
      state.result = action.payload;
    },
    // Action to set the loading state
    setSearchLoading(state, action) {
      state.isLoading = action.payload;
    },
    // Action to set any error in searching
    setSearchError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setSearchQuery, setSearchResult, setSearchLoading, setSearchError } = jokeSearchSlice.actions;

export default jokeSearchSlice.reducer;
