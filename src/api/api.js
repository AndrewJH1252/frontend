import axios from 'axios';

import {
  createReviewSuccess,
  createReviewFailure,
} from '../actions/ReviewActions'; // Update the path with the correct location of the file

import {
  clearCart,
  removeFromCart,
  markAll,
  checkout,
} from '../actions/cartActions'; // Update the path with the correct location of the file

import {
  fetchLessonsRequest,
  fetchLessonsSuccess,
  fetchLessonsFailure,
} from '../actions/lessonActions'; // Update the path with the correct location of the file

import {
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
  FETCH_CATEGORY_REQUEST,
  FETCH_CATEGORY_SUCCESS,
  FETCH_CATEGORY_FAILURE,
  FETCH_COURSES_REQUEST,
  FETCH_COURSES_SUCCESS,
  FETCH_COURSES_FAILURE,
} from '../actions/categoryActions'; // Update the path with the correct location of the file

import {
  FETCH_FORUM_DATA_SUCCESS,
  FETCH_FORUM_DATA_FAILURE,
  FETCH_FORUM_CATEGORIES_SUCCESS,
  FETCH_FORUM_CATEGORIES_FAILURE,
  CREATE_DISCUSSION_SUCCESS,
  CREATE_DISCUSSION_FAILURE,
} from '../actions/forumActions'; // Update the path with the correct location of the file

import {
  saveCourse,
  updateCourseData,
  addLesson,
} from '../actions/courseCreationActions'; // Update the path with the correct location of the file


import {
  createRatingRequest,
  createRatingSuccess,
  createRatingError,
  getRatingsRequest,
  getRatingsSuccess,
  getRatingsError,
 
} from '../actions/ratingActions'; // Update the path with the correct location of the file


import {
  sendMessageRequest,
  sendMessageSuccess,
  sendMessageFailure,
  loadMessagesRequest,
  loadMessagesSuccess,
  loadMessagesFailure,
} from '../actions/messageActions'; // Update the path with the correct location of the file


axios.defaults.baseURL = 'https://tutorium-api.onrender.com';


// Auth Actions
export const login = async (email, password, role) => {
  const response = await axios.post('/auth/login', { email, password, role });
  return response.data;
};

export const register = async (firstName, lastName, email, password, role) => {
  const response = await axios.post('/auth/register', { firstName, lastName, email, password, role });
  return response.data;
};

export const logout = async () => {
  const response = await axios.post('/auth/logout');
  return response.data;
};

// Category Actions
export const getCategories = () => {
  return axios.get('/categories');
};

export const getCategory = (categoryId) => {
  return axios.get(`/categories/${categoryId}`);
};

// Course Actions
export const getCourses = (categoryId) => {
  return axios.get(`/categories/${categoryId}/courses`);
};

export const getCourse = (courseId) => {
  return axios.get(`/courses/${courseId}`);
};

// Earnings Actions
export const fetchEarnings = async () => {
  try {
    const response = await axios.get('/tutors/earnings');
    return response.data.earnings;
  } catch (error) {
    console.error('Error fetching earnings:', error);
    throw error;
  }
};

export const fetchEarningsHistory = async () => {
  try {
    const response = await axios.get('/tutors/earnings/history');
    return response.data;
  } catch (error) {
    console.error('Error fetching earnings history:', error);
    throw error;
  }
};

// Recommended Courses Actions
export const fetchRecommendedCourses = async () => {
  try {
    const response = await axios.get('/courses/recommended');
    return response.data;
  } catch (error) {
    console.error('Error fetching recommended courses:', error);
    throw new Error('Failed to fetch recommended courses');
  }
};

// Unread Notifications Actions
export const fetchUnreadNotifications = async () => {
  try {
    // Perform the axios request to fetch the count of unread notifications from the backend
    const response = await fetch('/axios/unreadNotifications'); // Replace with your backend route for fetching the count of unread notifications
    const data = await response.json();
    return data.count;
  } catch (error) {
    throw new Error('Error fetching unread notifications:', error.message);
  }
};

// Student Data Actions
export const fetchStudentData = async () => {
  try {
    // Perform the axios request to fetch student information from the backend
    const response = await fetch('/axios/student'); // Replace with your backend route for fetching student information
    const studentData = await response.json();
    return studentData;
  } catch (error) {
    throw new Error('Error fetching student data:', error.message);
  }
};

// Featured Courses Actions
export const getFeaturedCourses = async () => {
  try {
    const response = await axios.get('/courses/featured');
    return response.data;
  } catch (error) {
    console.error('Error fetching featured courses:', error);
    throw new Error('Failed to fetch featured courses');
  }
};

// Popular Courses Actions
export const getPopularCourses = async () => {
  try {
    const response = await axios.get('/courses/popular');
    return response.data;
  } catch (error) {
    console.error('Error fetching popular courses:', error);
    throw new Error('Failed to fetch popular courses');
  }
};

// New Courses Actions
export const getNewCourses = async () => {
  try {
    const response = await axios.get('/courses/new');
    return response.data;
  } catch (error) {
    console.error('Error fetching new courses:', error);
    throw new Error('Failed to fetch new courses');
  }
};

// Fetch Course Actions
export const fetchCourse = () => {
  return axios
    .get('/api/courses')
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error fetching course:', error);
      throw error;
    });
};

// Upload Additional Material Action
export const uploadAdditionalMaterial = (courseId, file) => {
  const formData = new FormData();
  formData.append('file', file);

  return axios
    .post(`/api/courses/${courseId}/materials`, formData)
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error uploading additional material:', error);
      throw error;
    });
};

// Add Lesson to Course Action
export const addLessonToCourseAPI = (courseId, lesson) => {
  return axios
    .post(`/api/courses/${courseId}/lessons`, lesson)
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error adding lesson to course:', error);
      throw error;
    });
};

// Add Material to Course Action
export const addMaterialToCourseAPI = (courseId, material) => {
  return axios
    .post(`/api/courses/${courseId}/materials`, material)
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error adding material to course:', error);
      throw error;
    });
};

// Fetch User Profile Action
export const fetchUserProfileAPI = () => {
  return axios.get('/api/users/profile');
};

// Update User Profile Action
export const updateUserProfile = (updatedProfile) => {
  return axios.put('/api/users/profile', updatedProfile);
};

// Thunk to save the course
export const createCourse = (course) => {
  return async (dispatch) => {
    try {
      // Make API request to save the course
      const response = await axios.post('/api/courses', course);
      const savedCourse = response.data;

      // Dispatch the action to save the course
      dispatch(saveCourse(savedCourse));
    } catch (error) {
      console.error('Error creating course:', error);
    }
  };
};

// Thunk to update the course data
export const updateCourse = (course) => {
  return async (dispatch) => {
    try {
      // Make API request to update the course
      const response = await axios.put(`/api/courses/${course.id}`, course);
      const updatedCourse = response.data;

      // Dispatch the action to update the course data
      dispatch(updateCourseData(updatedCourse));
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };
};

// Thunk to add a lesson to the course
export const addLessonToCourse = (lesson) => {
  return (dispatch) => {
    dispatch(addLesson(lesson));
  };
};

// Thunk to create a rating
export const createRating = (rating) => {
  return (dispatch) => {
    dispatch(createRatingRequest());

    axios
      .post('/api/ratings', rating)
      .then((res) => {
        dispatch(createRatingSuccess(res.data));
      })
      .catch((err) => {
        dispatch(createRatingError(err.response.data.error));
      });
  };
};

// Thunk to get ratings
export const getRatings = () => {
  return (dispatch) => {
    dispatch(getRatingsRequest());

    axios
      .get('/api/ratings')
      .then((res) => {
        dispatch(getRatingsSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getRatingsError(err.response.data.error));
      });
  };
};

// Thunk to send a message
export const sendMessage = (content) => async (dispatch) => {
  dispatch(sendMessageRequest());

  try {
    // Implement your API logic here to send a message
    const response = await axios.post('/api/messages/send', { content });
    const newMessage = response.data;
    dispatch(sendMessageSuccess(newMessage));
  } catch (error) {
    dispatch(sendMessageFailure(error.message || 'Failed to send message'));
  }
};

// Thunk to load messages
export const loadMessages = () => async (dispatch) => {
  dispatch(loadMessagesRequest());

  try {
    // Implement your API logic here to fetch messages
    const response = await axios.get('/api/messages');
    const messages = response.data;
    dispatch(loadMessagesSuccess(messages));
  } catch (error) {
    dispatch(loadMessagesFailure(error.message || 'Failed to load messages'));
  }
};

// Thunk to fetch all courses
export const fetchAllCourses = () => {
  return async (dispatch) => {
    try {
      // Implement your API logic here to fetch all courses using the api instance
      const response = await axios.getCourses();
      // Dispatch the action to save the fetched courses in the store
      dispatch(saveCourse(response.data));
    } catch (error) {
      console.error('Error fetching courses:', error);
      // Handle error scenario here
    }
  };
};

// Forum Data Actions
export const fetchForumData = () => async (dispatch) => {
  try {
    const response = await axios.get('/forum');
    dispatch({ type: FETCH_FORUM_DATA_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_FORUM_DATA_FAILURE, payload: error.message });
  }
};

// Forum Categories Actions
export const fetchForumCategories = () => async (dispatch) => {
  try {
    const response = await axios.get('/forum/categories');
    dispatch({ type: FETCH_FORUM_CATEGORIES_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_FORUM_CATEGORIES_FAILURE, payload: error.message });
  }
};

// Create Discussion Action
export const createDiscussion = (discussionData) => async (dispatch) => {
  try {
    const response = await axios.post('/forum/discussions', discussionData);
    dispatch({ type: CREATE_DISCUSSION_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: CREATE_DISCUSSION_FAILURE, payload: error.message });
  }
};

export const fetchCategories = () => {
  return dispatch => {
    dispatch({ type: FETCH_CATEGORIES_REQUEST });
    axios.getCategories()
      .then(response => {
        dispatch({
          type: FETCH_CATEGORIES_SUCCESS,
          payload: response.data
        });
      })
      .catch(error => {
        dispatch({
          type: FETCH_CATEGORIES_FAILURE,
          payload: error.message
        });
      });
  };
};

export const fetchCategory = (categoryId) => {
  return dispatch => {
    dispatch({ type: FETCH_CATEGORY_REQUEST });
    axios.getCategory(categoryId)
      .then(response => {
        dispatch({
          type: FETCH_CATEGORY_SUCCESS,
          payload: response.data
        });
      })
      .catch(error => {
        dispatch({
          type: FETCH_CATEGORY_FAILURE,
          payload: error.message
        });
      });
  };
};

export const fetchCourses = (categoryId) => {
  return dispatch => {
    dispatch({ type: FETCH_COURSES_REQUEST });
    axios.getCourses(categoryId)
      .then(response => {
        dispatch({
          type: FETCH_COURSES_SUCCESS,
          payload: response.data
        });
      })
      .catch(error => {
        dispatch({
          type: FETCH_COURSES_FAILURE,
          payload: error.message
        });
      });
  };
};

export const initiatePaypalPayment = async (paymentMethod) => {
  try {
    const response = await axios.post('/create-paypal-payment', { paymentMethod });
    return response.data; // Return the necessary data, such as approvalUrl
  } catch (error) {
    throw new Error('Error initiating PayPal payment:', error);
  }
};

// Thunk to fetch lessons
export const fetchLessons = () => {
  return async (dispatch) => {
    dispatch(fetchLessonsRequest());
    try {
      // Implement your API logic here to fetch lessons from the backend
      // For example:
        const response = await axios.get('/api/lessons');
        const lessons = response.data;
        dispatch(fetchLessonsSuccess(lessons));
    } catch (error) {
      // Handle the error if fetching fails
        dispatch(fetchLessonsFailure(error.message));
    }
  };
};



// Fetch Courses for Category
export const getCoursesForCategory = async (categoryId) => {
  try {
    const response = await axios.get(`/categories/${categoryId}/courses`);
    return response.data;
  } catch (error) {
    console.error('Error fetching courses for category:', error);
    throw new Error('Failed to fetch courses for category');
  }
};


// Fetch Popular Courses
export const fetchPopularCourses = async () => {
  try {
    const response = await axios.get('/courses/popular');
    return response.data;
  } catch (error) {
    console.error('Error fetching popular courses:', error);
    throw new Error('Failed to fetch popular courses');
  }
};

// Fetch New Courses
export const fetchNewCourses = async () => {
  try {
    const response = await axios.get('/courses/new');
    return response.data;
  } catch (error) {
    console.error('Error fetching new courses:', error);
    throw new Error('Failed to fetch new courses');
  }
};

export const fetchFeaturedCourses = async () => {
  try {
    const response = await axios.get(`/courses/featured`);
    return response.data;
  } catch (error) {
    console.error('Error fetching featured courses:', error);
    throw new Error('Failed to fetch featured courses');
  }
};

export const clearCartItems = () => {
  return async (dispatch) => {
    try {
      // Implement your API logic here to clear the cart on the backend
      await axios.post('/api/cart/clear');
      dispatch(clearCart());
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };
};

export const removeCartItem = (itemId) => {
  return async (dispatch) => {
    try {
      // Implement your API logic here to remove the item from the cart on the backend
      await axios.delete(`/api/cart/${itemId}`);
      dispatch(removeFromCart(itemId));
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };
};

export const markAllItems = () => {
  return async (dispatch) => {
    try {
      // Implement your API logic here to mark all items in the cart on the backend
      await axios.post('/api/cart/markall');
      dispatch(markAll());
    } catch (error) {
      console.error('Error marking all items in cart:', error);
    }
  };
};

export const checkoutAndPay = (paymentMethod) => {
  return async (dispatch) => {
    try {
      // Implement your API logic here to process payment and checkout on the backend
      await axios.post('/api/cart/checkout', { paymentMethod });
      dispatch(checkout(paymentMethod));
    } catch (error) {
      console.error('Error processing payment and checkout:', error);
    }
  };
};

export const CategoriesData = () => async (dispatch) => {
  try {
    const response = await axios.get('/api/categories'); // Replace with the actual API endpoint to fetch categories
    const categories = response.data;
    dispatch({ type: 'SET_CATEGORIES', payload: categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    // Handle error here (e.g., show error message to the user)
  }
};

// Action creator to fetch courses by category data
export const fetchCoursesByCategoryData = (categoryId) => async (dispatch) => {
  try {
    const response = await axios.get(`/api/categories/${categoryId}/courses`); // Replace with the actual API endpoint to fetch courses by category
    const courses = response.data;
    return courses;
  } catch (error) {
    console.error('Error fetching courses by category:', error);
    // Handle error here (e.g., show error message to the user)
    return [];
  }
};

// Action creator to fetch unread notifications count
export const fetchUnreadNotificationsData = () => async (dispatch) => {
  try {
    const response = await axios.get('/api/notifications/unread'); // Replace with the actual API endpoint to fetch unread notifications count
    const count = response.data;
    return count;
  } catch (error) {
    console.error('Error fetching unread notifications:', error);
    // Handle error here (e.g., show error message to the user)
    return 0;
  }
};

export const fetchCourseDetails = (courseId) => {
  return axios
    .get(`/api/courses/${courseId}`) // Modify the API endpoint to match your backend route
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const filterCourses = async (filterOptions) => {
  try {
    // Make an API call to fetch the filtered courses from the server
    const response = await axios.post('/api/courses/filter', filterOptions);
    return response.data;
  } catch (error) {
    console.error('Error filtering courses:', error);
    return [];
  }
};

// Function to sort courses based on a specific criterion
export const sortCourses = async (sortCriterion) => {
  try {
    // Make an API call to fetch the sorted courses from the server
    const response = await axios.get(`/api/courses/sort?criterion=${sortCriterion}`);
    return response.data;
  } catch (error) {
    console.error('Error sorting courses:', error);
    return [];
  }
};

export const createRequest = (requestData) => {

  return axios.post('/api/requests', requestData)
    .then((response) => {
      // Handle the response from the server, if needed
      return response.data;
    })
    .catch((error) => {
      // Handle any errors that occur during the request, if needed
      throw error;
    });
};

export const replyToReview = (replyData) => {

  return axios.post('/api/reviews/reply', replyData)
    .then((response) => {
      // Handle the response from the server, if needed
      return response.data;
    })
    .catch((error) => {
      // Handle any errors that occur during the request, if needed
      throw error;
    });
};

export const deleteReview = (reviewId) => {

  return axios.delete(`/api/reviews/${reviewId}`)
    .then((response) => {
      // Handle the response from the server, if needed
      return response.data;
    })
    .catch((error) => {
      // Handle any errors that occur during the request, if needed
      throw error;
    });
};

export const createReview = (reviewData) => {
  return (dispatch) => {
    // Make an API call to create the review
    axios
      .post('/api/reviews', reviewData) // Replace '/api/reviews' with your actual API endpoint for creating reviews
      .then((response) => {
        const createdReview = response.data;
        dispatch(createReviewSuccess(createdReview));
      })
      .catch((error) => {
        dispatch(createReviewFailure(error.message));
      });
  };
};

export default axios;
