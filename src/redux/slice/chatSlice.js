// chatSlice.js
import { createSlice } from '@reduxjs/toolkit';
import {
  fetchChatMessages
  // ... (other message-related thunks)
} from '../Thunks/chatThunk';

const initialState = {
  messages: [],
  // Other chat-related state can be added here
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    // Reducer function to add a new message to the state
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    // Other reducer functions can be added here
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChatMessages.fulfilled, (state, action) => {
        state.messages = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchChatMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // ... (other message-related cases)
  },
});

export const { addMessage } = chatSlice.actions;

export default chatSlice.reducer;
