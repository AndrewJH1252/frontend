import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { updateThreads } from '../slice/threadSlice'; // Import the action to update threads


const API_BASE_URL = 'http://localhost:5000'; // Replace with your API base URL

// Thunk for creating a new thread
export const createThread = createAsyncThunk('threads/createThread', async (newThreadData, { rejectWithValue, getState, dispatch }) => {
  try {
    // Access the authentication token from the Redux store
    const token = getState().auth.token;

    

    // Create a headers object with the Authorization header containing the token
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    // Make the POST request with the token in the headers
    const response = await axios.post(`${API_BASE_URL}/threads`, newThreadData, { headers });

    // Dispatch the action to update the Redux store with the new thread data


    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Thunk for getting all threads
export const getAllThreads = createAsyncThunk(
  'threads/getAllThreads',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth; // Get the token from the auth state
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      };

      const response = await axios.get(`${API_BASE_URL}/threads`, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk for getting a thread by ID
export const getThreadById = createAsyncThunk('threads/getThreadById', async (threadId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/threads/${threadId}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Thunk for updating a thread by ID
export const updateThread = createAsyncThunk('threads/updateThread', async ({ threadId, ...updatedThreadData }, { rejectWithValue }) => {
  try {
   
    const response = await axios.put(`${API_BASE_URL}/threads/${threadId}`, updatedThreadData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Thunk for deleting a thread by ID
export const deleteThread = createAsyncThunk('threads/deleteThread', async (threadId, { rejectWithValue }) => {
  try {
    await axios.delete(`${API_BASE_URL}/threads/${threadId}`);
    return threadId; // Return the deleted thread ID
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
