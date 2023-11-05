import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'https://tutorium-api.onrender.com'; // Replace with your API base URL

export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async ({ userId, conversationId }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/users/${userId}/conversations/${conversationId}/messages`
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch messages.');
    }
  }
);

export const sendMessage = createAsyncThunk(
  'messages/sendMessage',
  async ({ userId, conversationId, message }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/users/${userId}/conversations/${conversationId}/messages`,
        { message }
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to send message.');
    }
  }
);

// Async Thunk for updating a message
export const updateMessage = createAsyncThunk(
    'messages/updateMessage',
    async ({ userId, conversationId, messageId, updatedMessage }) => {
      try {
        const response = await axios.patch(
          `${API_BASE_URL}/users/${userId}/conversations/${conversationId}/messages/${messageId}`,
          { message: updatedMessage }
        );
        return response.data;
      } catch (error) {
        throw new Error('Failed to update message.');
      }
    }
  );
  
  // Async Thunk for deleting a message
  export const deleteMessage = createAsyncThunk(
    'messages/deleteMessage',
    async ({ userId, conversationId, messageId }) => {
      try {
        const response = await axios.delete(
          `${API_BASE_URL}/users/${userId}/conversations/${conversationId}/messages/${messageId}`
        );
        return response.data;
      } catch (error) {
        throw new Error('Failed to delete message.');
      }
    }
  );
  
  // Async Thunk for marking a message as read
  export const markMessageAsRead = createAsyncThunk(
    'messages/markMessageAsRead',
    async ({ userId, conversationId, messageId }) => {
      try {
        const response = await axios.post(
          `${API_BASE_URL}/users/${userId}/conversations/${conversationId}/messages/${messageId}/mark-read`
        );
        return response.data;
      } catch (error) {
        throw new Error('Failed to mark message as read.');
      }
    }
  );
  
  

  export default {
    fetchMessages,
    sendMessage,
    updateMessage,
    deleteMessage,
    markMessageAsRead,
  };
  
