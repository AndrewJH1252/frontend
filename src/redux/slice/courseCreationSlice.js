import { createSlice } from '@reduxjs/toolkit';

import {
  fetchCreatedCourses,
  fetchCurriculumData,
  fetchCurriculumDataById,
 } from '../Thunks/courseCreationThunk';

const courseCreationSlice = createSlice({
  name: 'courseCreation',
  initialState: {
    loading: false,
    error: null,
    success: false,
    editMode: false,
    courseId: null,
    editingCourse: null,
    courseDetails: [],
    curriculum: [],
    createdCourses: [],
  },
  reducers: {
    createCourseStart: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
      state.courseId = null;
    },
    createCourseSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.courseId = action.payload.courseId;
    },
    createCourseFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
      state.courseId = null;
    },
    storeCourseDetails: (state, action) => {
      state.courseDetails = action.payload;
    },
    storeCurriculum: (state, action) => {
      state.courseDetails.curriculum = action.payload; // Update the curriculum data in the courseDetails
    },    
    
    setCreatedCourses: (state, action) => {
      state.createdCourses.push(action.payload);
    },

    setEditingCourse: (state, action) => {
      state.courseDetails = action.payload;
      state.editMode = true;
      
    },
    clearCurriculumDataAction: (state) => {
      state.curriculum = []; // Reset curriculum to an empty array
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCreatedCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCreatedCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.createdCourses = action.payload; // Update the filtered results in the state
      })
      .addCase(fetchCreatedCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchCurriculumData.fulfilled, (state, action) => {
        // Update the curriculum data in the state
        state.curriculum = action.payload;
      })
      .addCase(fetchCurriculumDataById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurriculumDataById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.curriculum = action.payload; // Update the filtered results in the state
      })
      .addCase(fetchCurriculumDataById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    
},
  
});

export const {
  createCourseStart,
  createCourseSuccess,
  createCourseFailure,
  storeCourseDetails,
  storeCurriculum,
  setEditingCourse,
  setCreatedCourses,
  clearCurriculumDataAction,
} = courseCreationSlice.actions;

export default courseCreationSlice.reducer;
