import { createSlice } from '@reduxjs/toolkit';
import { createPost, getAllPostsInThread, getPostById, updatePost, deletePost,getRepliesForPost } from '../Thunks/postThunk';

// Initial state for the post slice
const initialState = {
  posts: [],
  post: null,
  replies: [], // Initialize replies as an empty array
  status: 'idle',
  error: null,
};


// Create a post slice with reducers and thunks
const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setReplies: (state, action) => {
      state.replies = action.payload;
    },
    addLikedPost: (state, action) => {
      state.push(action.payload);
    },

    removeLikedPost: (state, action) => {
      const postId = action.payload;
      const likedPost = state.likedPosts.find(post => post.id === postId);
      if (likedPost) {
        state.likedPosts = state.likedPosts.filter(post => post.id !== postId);
      }
    },
    
    
  },
  extraReducers: (builder) => {
    // Thunk action for creating a new post
    builder.addCase(createPost.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.posts.push(action.payload);
    });
    builder.addCase(createPost.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });

    builder.addCase(getRepliesForPost.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getRepliesForPost.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.replies.push(action.payload);
    });
    builder.addCase(getRepliesForPost.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });

    // Thunk action for getting all posts in a specific thread
    builder.addCase(getAllPostsInThread.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getAllPostsInThread.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.posts = action.payload;
    });
    builder.addCase(getAllPostsInThread.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });

    // Thunk action for getting a post by ID
    builder.addCase(getPostById.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getPostById.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.post = action.payload;
    });
    builder.addCase(getPostById.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });

    // Thunk action for updating a post by ID
    builder.addCase(updatePost.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(updatePost.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.post = action.payload;
    });
    builder.addCase(updatePost.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });

    // Thunk action for deleting a post by ID
    builder.addCase(deletePost.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    });
    builder.addCase(deletePost.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });
  },
});

// Export thunks
export const { setReplies, addLikedPost, removeLikedPost } = postSlice.actions;

// Export reducer
export default postSlice.reducer;
