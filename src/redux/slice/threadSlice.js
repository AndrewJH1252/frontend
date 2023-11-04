import { createSlice } from '@reduxjs/toolkit';
import { createThread, getAllThreads, getThreadById, updateThread, deleteThread } from '../Thunks/threadThunk';

// Initial state for the thread slice
const initialState = {
  threads: [],
  thread: null,
  status: 'idle',
  error: null,
};

// Create a thread slice with reducers and thunks
const threadSlice = createSlice({
  name: 'threads',
  initialState,
  reducers: {
    updateThreads: (state, action) => {
      // Update the threads array with the new thread data
      state.threads.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    // Thunk action for creating a new thread
    builder.addCase(createThread.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(createThread.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.threads.push(action.payload);
    });
    builder.addCase(createThread.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });

    // Thunk action for getting all threads
    builder.addCase(getAllThreads.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getAllThreads.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.threads = action.payload;
    });
    builder.addCase(getAllThreads.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });

    // Thunk action for getting a thread by ID
    builder.addCase(getThreadById.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getThreadById.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.thread = action.payload;
    });
    builder.addCase(getThreadById.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });

    // Thunk action for updating a thread by ID
    builder.addCase(updateThread.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(updateThread.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.thread = action.payload;
    });
    builder.addCase(updateThread.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });

    // Thunk action for deleting a thread by ID
    builder.addCase(deleteThread.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(deleteThread.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.threads = state.threads.filter((thread) => thread.id !== action.payload);
    });
    builder.addCase(deleteThread.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });
  },
});

// Export action creators
export const { updateThreads } = threadSlice.actions;


// Export reducer
export default threadSlice.reducer;
