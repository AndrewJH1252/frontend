import { createSlice } from '@reduxjs/toolkit';
import {
  fetchProfile,
  updateAccountDetails,
  editUserProfile,
  fetchTutor,
  fetchStudent,
  verifyPassword,
} from '../Thunks/userThunk'; // Adjust import path if needed

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userProfile: null, // Initialize as an object
    requestStatus: null, // Add requestStatus for async thunk status
    totalLessonsCreated: 0,
    studentsEnrolled: 0,
    coursesSold: 0,
    coursesEnrolledCount: 0,
    requestsCreatedCount: 0,
    courseCreated: 0,
    tutor: null,
    student: {},
    tutors: [],
    verifyPasswordError: null,
    verifyPasswordStatus: 'idle',
    isPasswordVerified: false, // Add isPasswordVerified to store password verification result
},
  reducers: {
  

    updateUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },

    setTutors: (state, action) => {
      state.tutors = action.payload;
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(updateAccountDetails.fulfilled, (state, action) => {
        state.userProfile = action.payload;
        state.requestStatus = 'success';
        state.error = null;
      })
      .addCase(updateAccountDetails.pending, (state) => {
        state.requestStatus = 'loading';
        state.error = null;
      })
      .addCase(updateAccountDetails.rejected, (state, action) => {
        state.requestStatus = 'failed';
        state.error = action.error.message;
      })
      .addCase(editUserProfile.fulfilled, (state, action) => {
        state.userProfile = action.payload;
        state.requestStatus = 'success';
        state.error = null;
      })
      .addCase(editUserProfile.pending, (state) => {
        state.requestStatus = 'loading';
        state.error = null;
      })
      .addCase(editUserProfile.rejected, (state, action) => {
        state.requestStatus = 'failed';
        state.error = action.error.message; // Log or handle the error message
      })      
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.userProfile = action.payload;
        state.requestStatus = 'success';
        state.error = null;
      })
      .addCase(fetchProfile.pending, (state) => {
        state.requestStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.requestStatus = 'failed';
        state.error = action.error.message;
      })
   
      .addCase(fetchTutor.fulfilled, (state, action) => {
        state.tutor = action.payload;
        state.requestStatus = 'success';
        state.error = null;
      })
      .addCase(fetchTutor.pending, (state) => {
        state.requestStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchTutor.rejected, (state, action) => {
        state.requestStatus = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchStudent.fulfilled, (state, action) => {
        state.student = action.payload;
        state.requestStatus = 'success';
        state.error = null;
      })
      .addCase(fetchStudent.pending, (state) => {
        state.requestStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchStudent.rejected, (state, action) => {
        state.requestStatus = 'failed';
        state.error = action.error.message;
      })
     
      .addCase(verifyPassword.pending, (state) => {
        state.verifyPasswordStatus = 'loading';
        state.verifyPasswordError = null;
      })
      .addCase(verifyPassword.fulfilled, (state, action) => {
        state.verifyPasswordStatus = 'succeeded';
        state.isPasswordVerified = action.payload.isVerified;
      })
      .addCase(verifyPassword.rejected, (state, action) => {
        state.verifyPasswordStatus = 'failed';
        state.verifyPasswordError = action.error.message;
      });
      
  },
});

export const {
  updateUserProfile,
  setTutors,
} = userSlice.actions;
export default userSlice.reducer;

