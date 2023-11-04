import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setReplies, addLikedPost, removeLikedPost} from '../slice/postSlice';


const WEBSOCKET_SERVER_URL = 'ws://localhost:5000'; // Replace with your WebSocket server URL
const API_BASE_URL = 'http://localhost:5000'; // Replace with your API base URL

// Thunk for creating a new post

export const createPost = createAsyncThunk('posts/createPost', async (newPostData, { rejectWithValue, getState, dispatch }) => {
  try {
    // Access the authentication token from the Redux store
    const token = getState().auth.token;

    console.log('newPostData',newPostData)

    // Create a headers object with the Authorization header containing the token
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    // Make the POST request with the token in the headers
    const response = await axios.post(`${API_BASE_URL}/posts`, newPostData, { headers });

    // Dispatch the action to update the Redux store with the new 


    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});


// Thunk for getting all posts in a specific thread
export const getAllPostsInThread = createAsyncThunk('posts/getAllPostsInThread', async (threadId, thunkAPI) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/posts/${threadId}`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Thunk for getting a post by ID
export const getPostById = createAsyncThunk('posts/getPostById', async (postId, thunkAPI) => {
  try {
    console.log('postId',postId)
    const response = await axios.get(`${API_BASE_URL}/posts/${postId}`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Thunk for updating a post by ID
export const updatePost = createAsyncThunk('posts/updatePost', async ({ postId, content }, thunkAPI) => {
  try {

    const response = await axios.put(`${API_BASE_URL}/posts/${postId}`, { content });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Thunk for deleting a post by ID
export const deletePost = createAsyncThunk('posts/deletePost', async (postId, thunkAPI) => {
  try {
    await axios.delete(`${API_BASE_URL}/posts/${postId}`);
    return postId; // Return the deleted post ID
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});


export const createReply = createAsyncThunk(
  'replies/createReply',
  async (replyData, thunkAPI) => {
    try {
      const { getState } = thunkAPI;
      const token = getState().auth.token; // Get the authentication token from the Redux state

      // Send the reply data to the WebSocket server
      const socket = new WebSocket(WEBSOCKET_SERVER_URL);


      // Use Axios to save the reply data to the server with the authentication token
      const axiosResponse = await axios.post(`${API_BASE_URL}/replies`, replyData, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request headers
        },
      });

      return new Promise((resolve, reject) => {
        socket.onopen = () => {
          // Send the reply data to the WebSocket server
          socket.send(JSON.stringify(replyData));
        };

        socket.onmessage = (event) => {
          // Handle the response from the WebSocket server
          const response = JSON.parse(event.data);

          if (response.success) {
            resolve(axiosResponse.data); // Resolve the promise with the reply data from Axios
          } else {
            reject(response.error); // Reject the promise with an error message from WebSocket
          }
        };

        socket.onclose = () => {
          // Clean up the WebSocket connection
          socket.close();
        };
      });
    } catch (error) {
      // Handle and return errors
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Inside getRepliesForPost action
export const getRepliesForPost = createAsyncThunk(
  'replies/getRepliesForPost',
  async (postId, thunkAPI) => {
    try {
      
      console.log('thunk reply postId',postId);
      // Fetch replies for the specific postId
      const response = await axios.get(`${API_BASE_URL}/replies/${postId}`);
      
      const replies = response.data; // Assuming your API returns the updated post

      // Update the client-side state to indicate that the user has liked this post
      thunkAPI.dispatch(setReplies(replies));
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const likePost = createAsyncThunk(
  'posts/likePost',
  async (postId, thunkAPI) => {
    try {
      // Access the token from the auth state using getState
      const state = thunkAPI.getState();
      const token = state.auth.token;

      // Check if the user has already liked the post on the client-side
      const likedPosts = state.auth.likedPosts || []; // Ensure likedPosts is initialized as an array
      if (likedPosts.includes(postId)) {
        throw new Error('You have already liked this post.');
      }

      // Send a POST request to your API to like the post with the token
      const response = await axios.post(`${API_BASE_URL}/like/${postId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request headers
        },
      });

      const likedPost = response.data; // Assuming your API returns the updated post

      // Update the client-side state to indicate that the user has liked this post
      thunkAPI.dispatch(addLikedPost(postId)); // Dispatch the addLikedPost action

      return likedPost;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const unlikePost = createAsyncThunk(
  'posts/unlikePost',
  async (postId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      console.log('Removing itemId:', postId);

      const response = await axios.delete(`${API_BASE_URL}/unlike/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      
      // Remove the notification from the server

      // Dispatch an action to remove the item from the local state
      thunkAPI.dispatch(removeLikedPost(postId));
    } catch (error) {
      // Handle errors here
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
