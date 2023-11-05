import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Rest of your code

import { setSettings, setLoading, setError, clearError } from '../slice/settingsSlice';


const API_BASE_URL = 'https://tutorium-api.onrender.com'; // Replace with your API base URL

// Thunk for getting user settings


export const getUserSettings = createAsyncThunk(
  'settings/getUserSettings',
  async (token, thunkAPI) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/settings `, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        // Set user settings from the response data
        thunkAPI.dispatch(setSettings(response.data));

        // You can also add a success message/notification here if needed
        return response.data;
      } else {
        throw new Error('Failed to fetch user settings.');
      }
    } catch (error) {
      // Use thunkAPI.rejectWithValue to handle errors and return the error message
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


// Thunk for updating notification preferences
export const updateNotificationPreferences = createAsyncThunk(
  'settings/updateNotificationPreferences',
  async ({ notifications }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const response = await axios.patch(
        `${API_BASE_URL}/notifications`,
        { notifications },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        // Update the notification preferences in the store
        thunkAPI.dispatch(setSettings(response.data));
        return response.data; // Return the updated notification preferences if needed
      } else {
        throw new Error('Failed to update notifications.');
      }
    } catch (error) {
      // You can handle errors and dispatch appropriate actions or show error messages here
      throw new Error('Error updating notifications.');
    }
  }
);


// Thunk for updating email preferences
export const updateEmailPreferences = (emailPreferences, token) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.put(
      `${API_BASE_URL}/preferences`,
      { emailPreferences },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(setSettings(response.data));
    dispatch(clearError());
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Thunk for updating language preferences
export const updateLanguagePreferences = (language, token) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.put(
      `${API_BASE_URL}/language`,
      { language },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(setSettings(response.data));
    dispatch(clearError());
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Thunk for deleting user account
export const deleteUserAccount = createAsyncThunk(
  'settings/deleteUserAccount',
  async (token, thunkAPI) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/account`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        // Clear user settings upon account deletion
        thunkAPI.dispatch(setSettings(null));
        thunkAPI.dispatch(clearError());

        // You can also add a success message/notification here if needed
      } else {
        throw new Error('Failed to delete user account.');
      }
    } catch (error) {
      throw new Error('Error deleting user account.');
    }
  }
);

// Thunk for managing payment methods
export const managePaymentMethods = (paymentMethods) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.put(`${API_BASE_URL}/payment`, { paymentMethods });
    dispatch(setSettings(response.data));
    dispatch(clearError());
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Thunk for updating billing address
export const updateBillingAddress = (billingAddress) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.put(`${API_BASE_URL}/billing`, { billingAddress });
    dispatch(setSettings(response.data));
    dispatch(clearError());
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};
