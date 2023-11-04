import { createSlice } from '@reduxjs/toolkit';
import { 
  submitTutorRating, 
  fetchTutorRatings, 
  updateTutorRating, 
  deleteTutorRating, 
  calculateTutorAverageRating 
} from '../../redux/Thunks/ratingThunk';

const initialState = {
  tutorRatings: [],
  averageTutorRating: null,
  loading: false,
  error: null,
};

const ratingsSlice = createSlice({
  name: 'ratings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitTutorRating.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitTutorRating.fulfilled, (state, action) => {
        state.loading = false;
        // Handle success or update state as needed
      })
      .addCase(submitTutorRating.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchTutorRatings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTutorRatings.fulfilled, (state, action) => {
        state.loading = false;
        state.tutorRatings = action.payload;
      })
      .addCase(fetchTutorRatings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateTutorRating.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTutorRating.fulfilled, (state, action) => {
        state.loading = false;
        // Handle success or update state as needed
      })
      .addCase(updateTutorRating.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteTutorRating.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTutorRating.fulfilled, (state, action) => {
        state.loading = false;
        // Handle success or update state as needed
      })
      .addCase(deleteTutorRating.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(calculateTutorAverageRating.pending, (state) => {
        state.loading = true;
      })
      .addCase(calculateTutorAverageRating.fulfilled, (state, action) => {
        state.loading = false;
        state.averageTutorRating = action.payload;
      })
      .addCase(calculateTutorAverageRating.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default ratingsSlice.reducer;
