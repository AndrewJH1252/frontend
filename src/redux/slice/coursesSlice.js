import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAvailableCourses,
  fetchFeaturedCourses,
  fetchPopularCourses,
  fetchNewCourses,
  enrollInCourse,
  unenrollFromCourse,
  fetchCoursesByCategory,
  fetchCourseContent ,
  fetchTopicsByCourse,
  fetchTopics,
  fetchEnrolledCourses,
  fetchSingleCourse,
  fetchCourseById,
  fetchFilteredResults, } from '../Thunks/courseThunk';


const initialState = {
  availableCourses: [],
  featuredCourses: [],
  popularCourses: [],
  newCourses: [],
  enrolledCourses: [],
  topics: [],
  course: null,
  coursesByCategory: [],
  topicsByCourse: [],
  filteredResults: [],
  loading: false,
 
};



const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    addCourse: (state, action) => {
      // Add the logic to add a course to the state
      state.availableCourses.push(action.payload);
      
    },
    removeCourse: (state, action) => {
      // Add the logic to remove a course from the state
      state.availableCourses = state.availableCourses.filter(course => course.id !== action.payload);
     
    },

    setFilteredResults: (state, action) => {
      state.filteredResults = action.payload; // Replace the assignment
    },
    
    
    clearFilteredResults: (state) => {
      state.filteredResults = [];
    },

    setAvailableCourses: (state, action) => {
      state.availableCourses = action.payload; // Update the available courses in the state
    },
   
  
  },
  extraReducers: (builder) => {
    builder
   
  
    .addCase(fetchAvailableCourses.pending, state => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchAvailableCourses.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.availableCourses = action.payload;
    })
    .addCase(fetchAvailableCourses.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })
    .addCase(fetchFeaturedCourses.pending, state => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchFeaturedCourses.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.featuredCourses = action.payload;
    })
    .addCase(fetchFeaturedCourses.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })
    .addCase(fetchPopularCourses.pending, state => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchPopularCourses.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.popularCourses = action.payload;
    })
    .addCase(fetchPopularCourses.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })
    .addCase(fetchNewCourses.pending, state => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchNewCourses.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.newCourses = action.payload;
    })
    .addCase(fetchNewCourses.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })
    .addCase(fetchEnrolledCourses.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.enrolledCourses = action.payload;
    })
    .addCase(enrollInCourse.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      // You can update the necessary state based on the action.payload
    })
    .addCase(unenrollFromCourse.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      // You can update the necessary state based on the action.payload
    })
      
      .addCase(fetchTopicsByCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.topicsByCourse = action.payload;
        state.error = null;
      })
      .addCase(fetchTopicsByCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  
  
      .addCase(fetchCoursesByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.coursesByCategory = action.payload;
        state.error = null;
      })
      .addCase(fetchCoursesByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchSingleCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.course = action.payload;
        state.error = null;
      })
      .addCase(fetchSingleCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchTopics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopics.fulfilled, (state, action) => {
        state.loading = false;
        state.topics = action.payload;
        state.error = null;
      })
      .addCase(fetchTopics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchCourseContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourseContent.fulfilled, (state, action) => {
        state.loading = false;
        state.topics.push(...action.payload);
        state.error = null;
      })
      .addCase(fetchCourseContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchCourseById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.course = action.payload;
      })
      .addCase(fetchCourseById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchFilteredResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFilteredResults.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.filteredResults = action.payload; // Update the filtered results in the state
      })
      .addCase(fetchFilteredResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
      
      
      
      // ... other cases ...
  },
});

export default coursesSlice.reducer;



export const {
  addCourse,
  removeCourse,
  setFilteredResults, 
  clearFilteredResults,
  setAvailableCourses,
} = coursesSlice.actions;
