// src/Thunks/searchThunk.js

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'https://tutorium-api.onrender.com'; // Make sure this matches your backend URL

export const fetchSuggestions = createAsyncThunk(
  'search/fetchSuggestions',
  async (query) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/suggestions`, {
        params: { query },
      });

      return response.data;
    } catch (error) {
      throw new Error('Error fetching suggestions');
    }
  }
);

export const fetchSearchResults = createAsyncThunk(
  'search/fetchSearchResults',
  async (query) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/search`, {
        params: { query },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const searchThunks = {
  fetchSearchResults,
  fetchSuggestions,
};

export default searchThunks;
