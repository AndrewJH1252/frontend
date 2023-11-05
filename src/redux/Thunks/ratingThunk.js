import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'https://tutorium-api.onrender.com'; // Replace with your API base URL


export const submitTutorRating = createAsyncThunk(
  'ratings/submitTutorRating',
  async ({ tutorId, tutorRating }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const response = await axios.post(
        `${API_BASE_URL}/tutors/${tutorId}/ratings`,
        { rating: tutorRating },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to submit tutor rating.');
    }
  }
);

export const updateTutorRating = createAsyncThunk(
  'ratings/updateTutorRating',
  async ({ tutorId, ratingId, newRating }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const response = await axios.patch(
        `${API_BASE_URL}/tutors/${tutorId}/ratings/${ratingId}`,
        { rating: newRating },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to update tutor rating.');
    }
  }
);

export const deleteTutorRating = createAsyncThunk(
  'ratings/deleteTutorRating',
  async ({ tutorId, ratingId }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const response = await axios.delete(
        `${API_BASE_URL}/tutors/${tutorId}/ratings/${ratingId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to delete tutor rating.');
    }
  }
);

export const fetchTutorRatings = createAsyncThunk(
  'ratings/fetchTutorRatings',
  async (tutorId) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/tutors/${tutorId}/ratings`
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch tutor ratings.');
    }
  }
);


export const calculateTutorAverageRating = createAsyncThunk(
  'ratings/calculateTutorAverageRating',
  async (tutorId) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/tutors/${tutorId}/ratings/average`
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to calculate tutor average rating.');
    }
  }
);

export default {
  submitTutorRating,
  fetchTutorRatings,
  updateTutorRating,
  deleteTutorRating,
  calculateTutorAverageRating,
};
