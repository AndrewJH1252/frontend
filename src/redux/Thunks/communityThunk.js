import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const API_BASE_URL = 'https://tutorium-api.onrender.com';

// Thunk for fetching threads
export const fetchThreads = createAsyncThunk('community/fetchThreads', async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/allthreads`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Thunk for filtering threads by category
export const filterThreadsByCategory = createAsyncThunk(
  'community/filterThreadsByCategory',
  async (category, thunkAPI) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/threads?category=${category}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Thunk for searching threads by name
export const searchThreads = createAsyncThunk(
  'community/searchThreads',
  async (searchQuery, thunkAPI) => {
    try {
      console.log('searchQuery', searchQuery);
      const response = await axios.get(`${API_BASE_URL}/threads/search/${searchQuery}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);



// Thunk for sorting threads
export const sortThreads = createAsyncThunk('community/sortThreads', async (sortBy, thunkAPI) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/threads?sort=${sortBy}`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
