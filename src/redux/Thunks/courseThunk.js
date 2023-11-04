import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {  addCourse, removeCourse,setFilteredResults,setAvailableCourses } from '../slice/coursesSlice';


 // Import the necessary actions from your coursesSlice

const API_BASE_URL = 'http://localhost:5000'; // Replace with your API base URL

// Async Thunk for fetching available courses
export const fetchAvailableCourses = createAsyncThunk(
  'courses/fetchAvailableCourses',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/available`);
      const availableCourses = response.data;

      // Dispatch the setAvailableCourses action to update the state
      thunkAPI.dispatch(setAvailableCourses(availableCourses));

      return availableCourses; // Return the data to the action creator
    } catch (error) {
      throw new Error('Failed to fetch available courses.');
    }
  }
);


// Async Thunk for fetching featured courses
export const fetchFeaturedCourses = createAsyncThunk(
  'courses/fetchFeaturedCourses',
  async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/featured`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch featured courses.');
    }
  }
);

// Async Thunk for fetching popular courses
export const fetchPopularCourses = createAsyncThunk(
  'courses/fetchPopularCourses',
  async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/popular`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch popular courses.');
    }
  }
);

// Async Thunk for fetching new courses
export const fetchNewCourses = createAsyncThunk(
  'courses/fetchNewCourses',
  async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/new`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch new courses.');
    }
  }
);




// Modify your thunks to include token in headers
export const enrollInCourse = createAsyncThunk(
  'courses/enrollInCourse',
  async ({ courseId }, thunkAPI) => {
    try {
      console.log('courseId',courseId);
      const token = thunkAPI.getState().auth.token;
      const response = await axios.post(
        `${API_BASE_URL}/courses/${courseId}/enroll`,
        {courseId},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        // Add the enrolled course locally in the store
        thunkAPI.dispatch(addCourse(response.data.enrolledCourse));

        // You can also add a success message/notification here if needed
      } else {
        throw new Error('Failed to enroll in the course.');
      }
    } catch (error) {
      throw new Error('Error enrolling in the course.');
    }
  }
);

// Modify your unenrollFromCourse action to include a success property in the response
export const unenrollFromCourse = createAsyncThunk(
  'courses/unenrollFromCourse',
  async ({ courseId }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const response = await axios.delete(
        `${API_BASE_URL}/courses/${courseId}/unenroll`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        // You can add additional data to the success response if needed
        return { success: true, message: 'Unenrollment successful' };
      } else {
        throw new Error('Failed to unenroll from the course.');
      }
    } catch (error) {
      throw new Error('Error unenrolling from the course.');
    }
  }
);


export const fetchEnrolledCourses = createAsyncThunk(
  'enrolledCourses/fetchEnrolledCourses',
  async (_, { getState,  rejectWithValue }) => { // Add 'dispatch' to the function parameters
    try {
      const token = getState().auth.token;
      const response = await axios.get(`${API_BASE_URL}/enrolled`, {
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

  export const fetchSingleCourse = createAsyncThunk(
    'course/fetchSingleCourse',
    async (courseId) => {
      try {
        const response = await axios.get(`${API_BASE_URL}/courses/${courseId}`);
        return response.data;
      } catch (error) {
        throw new Error('Failed to fetch the course from the server.');
      }
    }
  );
  
  export const fetchTopics = createAsyncThunk(
    'course/fetchTopics',
    async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/topics`);
        return response.data;
      } catch (error) {
        throw new Error('Failed to fetch topics from the server.');
      }
    }
  );
  
  export const fetchTopicsByCourse = createAsyncThunk(
    'course/fetchTopicsByCourse',
    async (courseId) => {
      try {
        const response = await axios.get(`${API_BASE_URL}/courses/${courseId}/topics`);
        return response.data;
      } catch (error) {
        throw new Error('Failed to fetch topics by course from the server.');
      }
    }
  );


  export const fetchCourseContent = createAsyncThunk(
    'course/fetchCourseContent',
    async ({ courseId, page }) => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/courses/${courseId}/content?page=${page}`
        );
        return response.data;
      } catch (error) {
        throw new Error(error.message);
      }
    }
  );
  export const fetchCoursesByCategory = createAsyncThunk(
    'course/fetchCoursesByCategory',
    async (categoryId) => {
      try {
        console.log('categoryId',categoryId);

        const response = await axios.get(
          `${API_BASE_URL}/categories/${categoryId}/courses`
        );
        return response.data;
      } catch (error) {
        throw new Error('Failed to fetch courses by category from the server.');
      }
    }
  );
  

  export const fetchCourseById = createAsyncThunk(
    'courses/fetchCourseById',
    async (id, thunkAPI) => {
      try {
        const response = await axios.get(`${API_BASE_URL}/courses/${id}`);
        const course = response.data;
        return course; // Return the course data
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );

  export const fetchFilteredResults = createAsyncThunk(
    'filteredResults/fetch',
    async (filterOptions, thunkAPI) => {
      try {
        const response = await axios.post(`${API_BASE_URL}/filter`, filterOptions);
        // Assuming the response contains the filtered results
        const filteredResults = response.data;
        
        // Dispatch the action to add the filtered results to the store
        thunkAPI.dispatch(setFilteredResults(filteredResults));
  
        return filteredResults;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );
  
  // Thunk to clear filtered results
  export const clearFilteredResults = createAsyncThunk(
    'filteredResults/clear',
    async (_, thunkAPI) => {
      // Dispatch the action to remove the filtered results from the store
      thunkAPI.dispatch(clearFilteredResults());
  
      return null; // Return a value since we're not making an API call
    }
  );



export default {
  fetchAvailableCourses,
  fetchFeaturedCourses,
  fetchPopularCourses,
  fetchNewCourses,
  fetchEnrolledCourses,
  enrollInCourse,
  unenrollFromCourse,
  fetchCoursesByCategory,
  fetchCourseContent ,
  fetchTopicsByCourse,
  fetchTopics,
  fetchSingleCourse,
  fetchCourseById,
  fetchFilteredResults,
  clearFilteredResults,
 
  // ... (other async thunks)
};
