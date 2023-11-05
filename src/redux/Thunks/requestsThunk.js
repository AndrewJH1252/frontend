import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { addRequest, updateRequest, deleteRequest, clearAllRequests, setRequests } from '../slice/requestsSlice';
import {clearNotifications } from '../slice/notificationSlice';

const API_BASE_URL = 'https://tutorium-api.onrender.com';

export const submitRequest = createAsyncThunk(
  'requests/submitRequest',
  async (requestData, { getState, rejectWithValue, dispatch }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.post(`${API_BASE_URL}/requests`, requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const newRequest = response.data;
      dispatch(addRequest(newRequest));
      return newRequest;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateRequestDetails = createAsyncThunk(
  'requests/updateRequestDetails',
  async ({ requestId, updatedData }, { getState, rejectWithValue, dispatch }) => {
    try {
      console.log('updateRequestStatus action called', requestId, updatedData);
      const token = getState().auth.token;
      const response = await axios.put(
        `${API_BASE_URL}/requests/${requestId}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedRequest = response.data;
      dispatch(updateRequest(updatedRequest));
      dispatch(clearNotifications()); // Clear notifications as needed
      return updatedRequest;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchUserRequests = createAsyncThunk(
  'requests/fetchUserRequests',
  async (_, { getState,  rejectWithValue }) => { // Add 'dispatch' to the function parameters
    try {
      const token = getState().auth.token;
      const response = await axios.get(`${API_BASE_URL}/requests`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
     
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchStudentRequests = createAsyncThunk(
  'requests/fetchStudentRequests',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.get(`${API_BASE_URL}/student-requests`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchTutorRequests = createAsyncThunk(
  'requests/fetchTutorRequests',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.get(`${API_BASE_URL}/tutor-requests`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const fetchRequestById = createAsyncThunk(
  'requests/fetchRequestById',
  async (id, thunkAPI) => {
    try {
    
      const response = await axios.get(`${API_BASE_URL}/requests/${id}`);
      const request = response.data;
      return request; // Return the course data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateRequestStatus = createAsyncThunk(
  'requests/updateRequestStatus',
  async ({ requestId, status }, thunkAPI) => {
    try {
      
    
      const response = await axios.put(`${API_BASE_URL}/requests/${requestId}/status`, { status });
      const updatedStatus = response.data;
      return updatedStatus; // Return the updated status
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const deleteRequestById = createAsyncThunk(
  'requests/deleteRequestById',
  async (requestId, { rejectWithValue, dispatch }) => {
    try {
      console.log('delete one requestId', requestId);
      await axios.delete(`${API_BASE_URL}/requests/${requestId}`);
      dispatch(deleteRequest(requestId));
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const deleteAllRequests = createAsyncThunk(
  'requests/deleteAllRequests',
  async (_, { getState, rejectWithValue, dispatch }) => {
    try {
      const token = getState().auth.token;
      await axios.delete(`${API_BASE_URL}/requests`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Optionally, you can dispatch an action to clear the state or perform any other necessary logic
      dispatch(clearAllRequests());

      return true; // Return a success message or boolean
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const fetchAllRequests = createAsyncThunk(
  'requests/fetchAllRequests',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.get(`${API_BASE_URL}/allrequests`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
