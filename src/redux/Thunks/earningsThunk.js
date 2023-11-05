import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'https://tutorium-api.onrender.com'; // Replace with your API base URL

// Async Thunk for fetching earnings history
export const fetchEarningsHistory = createAsyncThunk(
  'earnings/fetchEarningsHistory',
  async (userId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/${userId}/earnings/history`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch earnings history.');
    }
  }
);

// Async Thunk for fetching earnings summary
export const fetchEarningsSummary = createAsyncThunk(
  'earnings/fetchEarningsSummary',
  async (userId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/${userId}/earnings/summary`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch earnings summary.');
    }
  }
);

export const fetchTotalEarnings = createAsyncThunk(
    'earnings/fetchTotalEarnings',
    async (userId) => {
      try {
        const response = await axios.get(`${API_BASE_URL}/users/${userId}/earnings/total`);
        return response.data;
      } catch (error) {
        throw new Error('Failed to fetch total earnings.');
      }
    }
  );

  export const deleteEarnings = createAsyncThunk(
    'earnings/deleteEarnings',
    async ({ userId, earningsId }) => {
      try {
        const response = await axios.delete(`${API_BASE_URL}/users/${userId}/earnings/${earningsId}`);
        return response.data;
      } catch (error) {
        throw new Error('Failed to delete earnings.');
      }
    }
  );

  export const calculateProjectedEarnings = createAsyncThunk(
    'earnings/calculateProjectedEarnings',
    async ({ courseId, monthlyEnrollments }) => {
      try {
        const response = await axios.post(
          `${API_BASE_URL}/courses/${courseId}/projected-earnings`,
          { monthlyEnrollments }
        );
        return response.data;
      } catch (error) {
        throw new Error('Failed to calculate projected earnings.');
      }
    }
  );
  


export default {
  fetchEarningsHistory,
  fetchEarningsSummary,
  fetchTotalEarnings,
  deleteEarnings,
  calculateProjectedEarnings,
};
