import { createCourseStart, createCourseSuccess, createCourseFailure, storeCourseDetails,setCreatedCourses, clearCurriculumDataAction } from '../slice/courseCreationSlice'; // Adjust the import path
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const API_BASE_URL = 'https://tutorium-api.onrender.com';

// Thunk to store course details in Redux
export const storeCourseDetailsInRedux = (courseDetails) => (dispatch) => {
  dispatch(storeCourseDetails(courseDetails));
};

// Thunk to create the course
export const createCourse = createAsyncThunk(
  'courseCreation/createCourse',
  async ({ courseDetails, userId }, { rejectWithValue }) => {
    try {

      const response = await axios.post(`${API_BASE_URL}/create`, courseDetails, userId, {
      
      });

      if (response.status === 201) {
        const courseId = response.data._id;
        return { courseId };
      } else {
        return rejectWithValue('An error occurred while creating the course.');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to edit a course
export const editCourse = createAsyncThunk(
  'course/editCourse',
  async ({ id, courseDetails }, { rejectWithValue }) => {
    try {
      console.log('courseDetails',courseDetails);
      const response = await axios.put(`${API_BASE_URL}/courses/${id}`, courseDetails);

      if (response.status === 200) {
        return response.data;
      } else {
        return rejectWithValue('Course update failed');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const fetchCreatedCourses = createAsyncThunk(
  'courseCreation/fetchCreatedCourses',
  async (_, { getState,  rejectWithValue }) => { // Add 'dispatch' to the function parameters
    try {
      const token = getState().auth.token;
      const response = await axios.get(`${API_BASE_URL}/coursescreated`, {
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


// Thunk to delete a course
export const deleteCourse = createAsyncThunk(
  'courses/deleteCourse',
  async (courseId, thunkAPI) => {
    try {
      const { auth } = thunkAPI.getState();
      const { token } = auth;

      // Make an API call to delete the course with the token in the header
      const response = await axios.delete(
        `${API_BASE_URL}/courses/${courseId}`, // Adjust the API endpoint
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 204) {
        // Course deleted successfully
        // You can return data indicating success if needed
        return courseId; // Replace with your actual success data
      } else {
        // Handle errors or return an error message as needed
        return thunkAPI.rejectWithValue(response.data.error); // Replace with your actual error handling
      }
    } catch (error) {
      // Handle errors or return an error message as needed
      return thunkAPI.rejectWithValue(error.message); // Replace with your actual error handling
    }
  }
);

export const fetchCurriculumData = createAsyncThunk(
  'course/fetchCurriculumData',
  async (courseId, thunkAPI) => {
    try {
      // Make an API request to fetch curriculum data by courseId using Axios
      const response = await axios.get(`${API_BASE_URL}/courses/${courseId}/curriculum`);

      if (response.status !== 200) {
        throw new Error('Failed to fetch curriculum data');
      }

      const curriculumData = response.data;
      return curriculumData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchCurriculumDataById = createAsyncThunk(
  'curriculum/fetchById',
  async (curriculumId, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const { token } = auth;

      // Define headers with the token (if available)
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const response = await axios.get(`${API_BASE_URL}/curriculum/${curriculumId}`, {
        headers,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const clearCurriculumData = createAsyncThunk(
  'courseCreation/clearCurriculumData',
  async (_, { dispatch }) => {
    // You can perform any async operations here if needed

    // Dispatch the clearCurriculumData action
    dispatch(clearCurriculumDataAction());

    // You can return any result if needed
    return 'Curriculum data cleared';
  }
);


export default {
  createCourse,
  storeCourseDetailsInRedux,
  fetchCreatedCourses,
  editCourse,
  deleteCourse,
  fetchCurriculumData,
  fetchCurriculumDataById,
};
