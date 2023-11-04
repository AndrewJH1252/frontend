// requestsSlice.js

import { createSlice } from '@reduxjs/toolkit';
import { fetchUserRequests,fetchRequestById, fetchStudentRequests, fetchTutorRequests  } from '../Thunks/requestsThunk';

const initialState = {
  requests: [],
  request: {},
  loading: false,
  error: null,
};

const requestsSlice = createSlice({
  name: 'requests',
  initialState,
  reducers: {
    addRequest: (state, action) => {
      state.requests.push(action.payload);
    },
    updateRequest: (state, action) => {
      const updatedRequest = action.payload;
      const index = state.requests.findIndex((request) => request.id === updatedRequest.id);
      if (index !== -1) {
        state.requests[index] = updatedRequest;
      }
    },
    deleteRequest: (state, action) => {
      const requestId = action.payload;
      state.requests = state.requests.filter((request) => request.id !== requestId);
    },
    requestError: (state, action) => {
      state.error = action.payload;
    },
    clearAllRequests: (state) => {
      state.requests = [];
    },
    setRequests: (state, action) => {
      return action.payload;
      
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = action.payload; // Update the requests array with fetched data
      })
      .addCase(fetchUserRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set the error in case of rejection
      })
      .addCase(fetchStudentRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = action.payload; // Update the requests array with fetched data
      })
      .addCase(fetchStudentRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set the error in case of rejection
      })
      .addCase(fetchTutorRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTutorRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = action.payload; // Update the requests array with fetched data
      })
      .addCase(fetchTutorRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set the error in case of rejection
      })
      .addCase(fetchRequestById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRequestById.fulfilled, (state, action) => {
        state.loading = false;
        state.request = action.payload; // Update the requests array with fetched data
      })
      .addCase(fetchRequestById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set the error in case of rejection
      });
  },
});

export const { addRequest, updateRequest, deleteRequest, clearAllRequests, setRequests, requestError } = requestsSlice.actions;

export default requestsSlice.reducer;
