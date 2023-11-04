// reviewsThunk.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setReviews, setCourseReviews } from '../slice/reviewSlice'; // Correctly import the setNotifications action

const API_BASE_URL = 'http://localhost:5000'; // Replace with your API base URL

export const submitReview = createAsyncThunk(
  'reviews/submitReview',
  async ({ courseId, review, rating }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const response = await axios.post(
        `${API_BASE_URL}/courses/${courseId}/reviews`,
        { courseId, review, rating },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to submit review.');
    }
  }
);

// Async Thunk for updating a review
export const updateReview = createAsyncThunk(
  'reviews/updateReview',
  async ({ reviewId, updatedReview }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const response = await axios.patch(
        `${API_BASE_URL}/reviews/${reviewId}`,
        { updatedReview },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to update review.');
    }
  }
);

// Async Thunk for deleting a review
export const deleteReview = createAsyncThunk(
  'reviews/deleteReview',
  async ({ reviewId }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const response = await axios.delete(
        `${API_BASE_URL}/reviews/${reviewId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to delete review.');
    }
  }
);

// Async Thunk for marking a review as helpful
const isReviewLikedByGuest = (reviewId) => {
  const likedReviews = JSON.parse(localStorage.getItem('likedReviews')) || [];
  return likedReviews.includes(reviewId);
};

// Action to mark a review as helpful (including guest liking)
export const markReviewAsHelpful = createAsyncThunk(
  'reviews/markReviewAsHelpful',
  async ({ reviewId }) => {
    try {
      if (!isReviewLikedByGuest(reviewId)) {
        // Send the request to mark the review as helpful
        const response = await axios.post(
          `${API_BASE_URL}/reviews/${reviewId}/mark`,
          { reviewId }
        );
        // Update the guest's liked reviews in local storage
        const likedReviews = JSON.parse(localStorage.getItem('likedReviews')) || [];
        likedReviews.push(reviewId);
        localStorage.setItem('likedReviews', JSON.stringify(likedReviews));
        return response.data;
      } else {
        throw new Error('Review is already liked by the guest.');
      }
    } catch (error) {
      throw new Error('Failed to mark review as helpful.');
    }
  }
);

  export const fetchCourseReviews = createAsyncThunk(
    'reviews/fetchCourseReviews',
    async (courseId, thunkAPI) => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/courses/${courseId}/reviews`,
          {courseId},
        );
        const reviews = response.data;
        thunkAPI.dispatch(setReviews(reviews));
        return reviews.data;
      } catch (error) {
        throw new Error('Failed to fetch reviews.');
      }
    }
  );

  export const fetchReviewsForCourses = createAsyncThunk(
    'reviews/fetchReviewsForCourses',
    async (courseIds, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.token; // Get the token from the Redux store
        const response = await axios.get(
          `${API_BASE_URL}/fetchReviewsForCourses`,
          {
            params: { courseIds }, // Pass courseIds as query parameters
            headers: {
              Authorization: `Bearer ${token}`, // Attach the token to the Authorization header
            },
          }
        );
        const reviews = response.data;
        thunkAPI.dispatch(setCourseReviews(reviews));
        return reviews.data;
      } catch (error) {
        throw new Error('Failed to fetch reviews.');
      }
    }
  );
  

export default {
    submitReview,
    fetchCourseReviews,
    updateReview,
    deleteReview,
    markReviewAsHelpful,
    fetchReviewsForCourses,
  };
