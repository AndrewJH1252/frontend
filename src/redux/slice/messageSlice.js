import { createSlice } from '@reduxjs/toolkit';
import {
  fetchMessages,
  sendMessage,
  updateMessage,
  deleteMessage,
  markMessageAsRead,
  // ... (other message-related thunks)
} from '../Thunks/messageThunk';

const initialState = {
  messages: [], // Holds all the messages in a conversation
  loading: false,
  error: null,
};

const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messages = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMessage.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updateMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMessage.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(markMessageAsRead.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(markMessageAsRead.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(markMessageAsRead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
      // ... (other message-related cases)
  },
});

export default messageSlice.reducer;
