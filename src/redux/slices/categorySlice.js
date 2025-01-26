// Import Redux Toolkit's createSlice to simplify state management
import { createSlice } from '@reduxjs/toolkit';

// Initial state for the category slice
const initialState = {
  categories: [],
  selectedCategory: null,
  isLoading: false,
  error: null,
};

// Create the category slice
const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    // Action to set the list of categories
    setCategories(state, action) {
      state.categories = action.payload;
    },
    // Action to set the currently selected category
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload;
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

export const { setCategories, setSelectedCategory, setLoading, setError } = categorySlice.actions;

export default categorySlice.reducer;
