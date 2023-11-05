import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import userSlice  from '../slice/userSlice'; 
import {updateUserProfile, setTutors}  from '../slice/userSlice'; 


const API_BASE_URL = 'https://tutorium-api.onrender.com'; // Replace with your API base URL


// Async Thunk for editing user profile
export const editUserProfile = createAsyncThunk(
  'user/editProfile', 
  async (updatedProfile, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;

      const response = await axios.patch(
        `${API_BASE_URL}/profile`,{updatedProfile}
        ,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const updatedUser = response.data.updatedUser;

        // Dispatch the action to update the profile locally in the store
        thunkAPI.dispatch(updateUserProfile(updatedUser));
        return updatedUser; // Return the updated user as the payload
      } else {
        // Handle other status codes (e.g., 404 for not found, 500 for server error, etc.)
        throw new Error('Failed to edit user profile.');
      }
    } catch (error) {
      // Handle errors here
      console.error('Error editing profile:', error.message);
      throw error;
    }
  }
);



// Async Thunk for fetching updated user profile
export const fetchProfile = createAsyncThunk(
  'user/fetchProfile',
  async (userId, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    try {
      const response = await axios.get(`${API_BASE_URL}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.user;
    } catch (error) {
      throw new Error('Failed to fetch updated user profile.');
    }
  }
);

// Async Thunk for updating account details
export const updateAccountDetails = createAsyncThunk(
  'user/updateAccountDetails',
  async (updatedAccountDetails , thunkAPI) => {
    try {
      console.log('updatedAccountDetails',updatedAccountDetails)
      const token = thunkAPI.getState().auth.token;
      const response = await axios.patch(
        `${API_BASE_URL}/updateAccountDetails`,
        updatedAccountDetails,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const updatedUser = response.data.updatedUser;
        // Dispatch the action to update the user profile locally in the store
        // You should have the updateUserProfile action defined to handle this
        thunkAPI.dispatch(updateUserProfile(updatedUser));
        return updatedUser;
      } else {
        throw new Error('Failed to update account details.');
      }
    } catch (error) {
      // Handle errors here
      throw new Error('Error updating account details.');
    }
  }
);

// Async Thunk for fetching user statistics
export const fetchUserStatistics = createAsyncThunk(
  'statistics/fetchUserStatistics',
  async (userId, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    try {
      const response = await axios.get(`${API_BASE_URL}/users/${userId}/statistics`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.statistics;
    } catch (error) {
      throw new Error('Failed to fetch user statistics.');
    }
  }
);

export const fetchTutor = createAsyncThunk(
  'tutor/fetchTutor',
  async (tutorId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/tutors/${tutorId}`);
      return response.data.tutor;
    } catch (error) {
      throw new Error('Failed to fetch tutor details.');
    }
  }
);

export const fetchStudent = createAsyncThunk(
  'tutor/fetchStudent',
  async (studentId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/students/${studentId}`);
      return response.data.student;
    } catch (error) {
      throw new Error('Failed to fetch student details.');
    }
  }
);

// Define an async thunk for email verification


// Define an async thunk for password verification
export const verifyPassword = createAsyncThunk(
  'user/verifyPassword',
  async (oldPassword, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;

      // Set up headers with the token
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(`${API_BASE_URL}/verifyPassword`, {
        params: { password: oldPassword },
        headers, // Include the headers in the request
      });

      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('Failed to verify password.');
      }
    } catch (error) {
      // Handle errors here
      throw new Error('Error verifying password.');
    }
  }
);

export const searchTutors = (searchTerm) => async (dispatch) => {
  try {
    // Make an API request using Axios to search for tutors
    const response = await axios.get(`${API_BASE_URL}/search-tutors?searchTerm=${searchTerm}`);

    if (response.status === 200) {
      // Dispatch the setTutors action to update the state with the search results
      dispatch(setTutors(response.data));
    } else {
      // Handle other HTTP response statuses or errors as needed
      console.error('Failed to fetch tutors:', response.status);
      // Dispatch an error action or set an error state if needed
    }
  } catch (error) {
    // Handle Axios errors, such as network issues
    console.error('Search tutors error:', error);
    // Dispatch an error action or set an error state if needed
  }
};

export const filterTutors = (filterOptions) => async (dispatch) => {
  try {
    // Make an API request using Axios to filter tutors
    const response = await axios.post(`${API_BASE_URL}/tutors-filter`, filterOptions);

    if (response.status === 200) {
      // Dispatch the setTutors action to update the state with the filtered results
      dispatch(setTutors(response.data));
    } else {
      // Handle other HTTP response statuses or errors as needed
      console.error('Failed to filter tutors:', response.status);
      // Dispatch an error action or set an error state if needed
    }
  } catch (error) {
    // Handle Axios errors, such as network issues
    console.error('Filter tutors error:', error);
    // Dispatch an error action or set an error state if needed
  }
};

export const fetchTutors = () => async (dispatch) => {
  try {
    // Make an API request using Axios to fetch the list of tutors
    const response = await axios.get(`${API_BASE_URL}/tutors`);

    if (response.status === 200) {
      // Dispatch the setTutors action to update the state with the fetched results
      dispatch(setTutors(response.data));
    } else {
      // Handle other HTTP response statuses or errors as needed
      console.error('Failed to fetch tutors:', response.status);
      // Dispatch an error action or set an error state if needed
    }
  } catch (error) {
    // Handle Axios errors, such as network issues
    console.error('Fetch tutors error:', error);
    // Dispatch an error action or set an error state if needed
  }
};

export default {
  editUserProfile,
  fetchProfile,
  updateAccountDetails,
  fetchUserStatistics,
  fetchTutor,
  fetchStudent,
  verifyPassword,
  // ... (other async thunks for GitHub and Google login)
};
