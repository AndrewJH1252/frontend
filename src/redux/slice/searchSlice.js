import { createSlice } from '@reduxjs/toolkit';
import { fetchSuggestions, fetchSearchResults } from '../../redux/Thunks/searchThunk';

const initialState = {
  suggestions: [],
  searchResults: {
    courses: [], // Initialize with an empty array
    // Other properties related to search results
  },
  searchQuery: '', // Initialize with an empty string for search query
  loading: false,
  error: null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    updateSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuggestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSuggestions.fulfilled, (state, action) => {
        state.loading = false;
        state.suggestions = action.payload || []; // Use an empty array if payload is null
      })
      .addCase(fetchSuggestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchSearchResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { updateSearchQuery } = searchSlice.actions; // Export the action creator

export default searchSlice.reducer;
