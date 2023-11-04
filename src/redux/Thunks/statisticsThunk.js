// statisticsThunk.js

import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'; // Import Axios

const API_BASE_URL = 'http://localhost:5000'; // Replace with your API base URL

// Define an initial state for statistics
const initialState = {
  totalStudents: 0,
  totalTutors: 0,
  totalCourses: 0,
  totalRequests: 0,
  loading: false,
  error: null,
};

// Create a statistics slice
const statisticsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {
    // Action to set loading state
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    // Action to handle successful statistics fetching
    setStatistics: (state, action) => {
      state.totalStudents = action.payload.totalStudents;
      state.totalTutors = action.payload.totalTutors;
      state.totalCourses = action.payload.totalCourses;
      state.totalRequests = action.payload.totalRequests;
      state.loading = false;
      state.error = null;
    },
    // Action to handle errors
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setLoading, setStatistics, setError } = statisticsSlice.actions;

// Thunk to fetch website statistics using Axios
export const fetchWebsiteStatistics = () => async (dispatch) => {
  try {
    // Set loading state
    dispatch(setLoading(true));

    // Make an Axios GET request to fetch statistics
    const response = await axios.get(`${API_BASE_URL}/statistics`);

    // Extract the data from the response
    const data = response.data;

    // Dispatch the successful action with the fetched statistics
    dispatch(setStatistics(data));
  } catch (error) {
    // Dispatch an error action if there's an issue
    dispatch(setError(error.message));
  }
};

export default statisticsSlice.reducer;
