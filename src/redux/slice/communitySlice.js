// redux/slices/communitySlice.js
import { createSlice } from '@reduxjs/toolkit';
import {
  fetchThreads,
  filterThreadsByCategory,
  searchThreads,
  sortThreads,
} from '../Thunks/communityThunk';

const initialState = {
  threads: [],
  threadResults: [],
  status: 'idle',
  error: null,
};

const communitySlice = createSlice({
  name: 'community',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchThreads.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchThreads.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.threads = action.payload;
      })
      .addCase(fetchThreads.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(filterThreadsByCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(filterThreadsByCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.threads = action.payload;
      })
      .addCase(filterThreadsByCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(searchThreads.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchThreads.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.threadResults = action.payload;
      })
      .addCase(searchThreads.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(sortThreads.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(sortThreads.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.threads = action.payload;
      })
      .addCase(sortThreads.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default communitySlice.reducer;
