import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import authSlice  from '../slice/authSlice'; 
const API_BASE_URL = 'https://tutorium-api.onrender.com'; // Update with your API URL

// Thunk to log in a user
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password }, thunkAPI) => {
      try {
        const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
        const user = response.data;
        return user;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );
  
  export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData, thunkAPI) => {
      try {
        const response = await axios.post(`${API_BASE_URL}/register`, userData);
        const user = response.data;
        return user;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );

// Thunk to request password reset
export const forgotPasswordRequest = createAsyncThunk(
    'auth/forgotPasswordRequest',
    async (email, thunkAPI) => {
      try {
        await axios.post(`${API_BASE_URL}/forgot-password`, { email });
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );
  
  export const githubLogin = createAsyncThunk(
    'auth/githubLogin',
    async (code, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${API_BASE_URL}/auth/github`, { code });
        const user = response.data;
        return user;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
// Define createAsyncThunk for Google login
export const googleLogin = createAsyncThunk(
  'auth/googleLogin',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/auth/google`);
      const user = response.data;
      return user;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


  export const handleGoogleLoginCallback = createAsyncThunk(
    'auth/handleGoogleLoginCallback',
    async (tokenId, thunkAPI) => {
      try {
        const response = await thunkAPI.dispatch(googleLogin(tokenId));
        return response;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );

  // ... Other imports and code

  export const fetchUserData = createAsyncThunk(
    'user/fetchUserData',
    async (token, thunkAPI) => {
      try {
        const response = await axios.get(`${API_BASE_URL}/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue('Failed to fetch user data.');
      }
    }
  );

  // Async Thunk for editing user profile
export const editUserProfile = createAsyncThunk(
  'user/editProfile',
  async (updatedProfile, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;

      const response = await axios.patch(
        `${API_BASE_URL}/profile`,
        updatedProfile,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const updatedUser = response.data.updatedUser;

        // Dispatch the action to update the profile locally in the store
        thunkAPI.dispatch(authSlice.actions.updateUserProfile(updatedUser));
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
        thunkAPI.dispatch(authSlice.actions.updateUserProfile(updatedUser));
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
 

// ... Other code


// ... (similar thunks for GitHub and Google login)
export default {
    loginUser,
    registerUser,
    forgotPasswordRequest,
    githubLogin,
    googleLogin,
    fetchUserData,
    editUserProfile,
    updateAccountDetails,
  };
  