import { createSlice } from '@reduxjs/toolkit';
import * as authThunks from '../Thunks/authThunk';
import {fetchUserData} from '../Thunks/authThunk';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import {
  updateAccountDetails,
  editUserProfile,

} from '../Thunks/authThunk'; // Adjust import path if needed

const initialState = {
  user: null,
  profile: [],
  isAuthenticated: false,
  userRole: null,
  error: null,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.userRole = null;
      state.token = null; 
      state.error = null;
      state.loading = false;
      state.profile = [];
    },
    switchRoles: (state) => {
      state.userRole = state.userRole === 'student' ? 'tutor' : 'student';
    },
    updateUserProfile: (state, action) => {
      state.profile = action.payload;
    },
    clearUserProfile: (state) => {
      state.profile = []; // Clear the user's profile
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authThunks.loginUser.fulfilled, (state, action) => {
        state.token = action.payload.token; // Save the token
        state.isAuthenticated = true;
        state.userRole = action.payload.role; // Set the user role
        state.error = null;
        state.loading = false;
      })
    
      .addCase( authThunks.fetchUserData.fulfilled, (state, action) => {
        state.profile = action.payload; // Update the user profile in the state
        state.userRole = action.payload.role; // Set the user role
      })

      .addCase( authThunks.fetchUserData.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase( authThunks.updateAccountDetails.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase( authThunks.updateAccountDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase( authThunks.updateAccountDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase( authThunks.editUserProfile.fulfilled, (state, action) => {
        state.profile= action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase( authThunks.editUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authThunks.editUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Log or handle the error message
      })      
    
      .addCase(authThunks.loginUser.rejected, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(authThunks.loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(authThunks.registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
        state.loading = false;
      })
      .addCase(authThunks.registerUser.rejected, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(authThunks.registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(authThunks.forgotPasswordRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(authThunks.forgotPasswordRequest.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(authThunks.forgotPasswordRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(authThunks.githubLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(authThunks.githubLogin.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
        state.loading = false;
      })
      .addCase(authThunks.githubLogin.rejected, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(authThunks.googleLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(authThunks.googleLogin.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
        state.loading = false;
      })
      .addCase(authThunks.googleLogin.rejected, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload;
        state.loading = false;
      });
      
      // Add similar cases for other thunks as needed
  },
});

export const { clearError, logoutUser, switchRoles, setPasswordResetError,  updateProfile } = authSlice.actions;

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['isAuthenticated', 'token','userRole','profile'], 
};


const persistedAuthReducer = persistReducer(persistConfig, authSlice.reducer);

export default persistedAuthReducer;

export const {
  loginUser,
  registerUser,
  forgotPasswordRequest,
  githubLogin,
  googleLogin,
  clearUserProfile,
} = authThunks;
