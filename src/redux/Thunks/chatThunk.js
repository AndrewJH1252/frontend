import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; // Replace with your actual backend URL

export const sendChatMessage = createAsyncThunk(
  'chat/sendMessage',
  async ({ sender, recipient, content, createdAt }) => {
    try {
      const messageData = {
        sender,
        recipient,
        content,
        createdAt,
      };
      const response = await axios.post(`${API_BASE_URL}/messages`, messageData);
      // Send the message over the WebSocket connection
      const socket = new WebSocket('ws://localhost:5000');
      socket.onopen = () => {
        socket.send(JSON.stringify(messageData));
        socket.close();
      };

      // Now, let's make an Axios POST request to send the message to your backend
      
      // Handle the response data as needed
      console.log(response.data);

      // Return the sent message data
      return messageData;
    } catch (error) {
      // Handle errors
      throw error;
    }
  }
);

export const fetchChatMessages = createAsyncThunk(
  'chat/fetchMessages',
  async ({ sender, recipient }) => {
    try {
      // Make a GET request to your backend endpoint for retrieving chat messages
      const response = await axios.get(`${API_BASE_URL}/messages`, {
        params: { sender, recipient },
      });

      // Handle the response data as needed
      const chatMessages = response.data;

      // Return the retrieved chat messages
      return chatMessages;
    } catch (error) {
      // Handle errors
      throw error;
    }
  }
);

