import { createSlice } from '@reduxjs/toolkit';
import {
  submitReview,
  fetchCourseReviews,
  updateReview,
  deleteReview,
  markReviewAsHelpful,
  // ... (other review-related thunks)
} from '../Thunks/reviewThunk';

const initialState = {
  reviews: [], // Holds all the reviews for a specific course
  courseReviews: [],
  loading: false,
  error: null,
};

const reviewSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    setReviews: (state, action) => {
      state.reviews = action.payload;
    },
    setCourseReviews: (state, action) => {
      state.courseReviews = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitReview.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(submitReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(updateReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateReview.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteReview.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(markReviewAsHelpful.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(markReviewAsHelpful.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(markReviewAsHelpful.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
      // ... (similar pattern for other review-related actions)
  },
});

export const {
  setReviews,
  setCourseReviews,

} = reviewSlice.actions;

export default reviewSlice.reducer;
