import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import notificationsSlice, { markNotificationAsRead } from '../slice/notificationSlice'; // Import your notificationsSlice
import { setNotifications } from '../slice/notificationSlice'; // Correctly import the setNotifications action


const API_BASE_URL = 'http://localhost:5000'; // Update this to your API URL

// Simulated unique ID generator
let notificationIdCounter = 0;

// Thunk to add a new notification


export const addNewNotification = createAsyncThunk(
  'notifications/addNewNotification',
  async (notification, thunkAPI) => {
    try {
      // Generate a unique ID for the notification
      const notificationId = ++notificationIdCounter;

      // Send the notification to the server with recipient information
      const response = await axios.post(`${API_BASE_URL}/notifications`, {
        ...notification,
        id: notificationId,
        recipientId: notification.recipientId, // Corrected recipientId assignment
      });

      const newNotification = response.data;
      thunkAPI.dispatch(notificationsSlice.actions.addNotification(newNotification));
    } catch (error) {
      // Handle errors here
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


// Thunk to remove a notification by its ID
export const removeNotificationById = createAsyncThunk(
  'notifications/removeNotificationById',
  async (notificationId, thunkAPI) => {
    try {
      console.log('Removing notification with ID:', notificationId);
      // Remove the notification from the server
      await axios.delete(`${API_BASE_URL}/notifications/${notificationId}`);
      thunkAPI.dispatch(notificationsSlice.actions.removeNotification(notificationId));
    } catch (error) {
      // Handle errors here
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const clearAllNotifications = createAsyncThunk(
  'notifications/clearAllNotifications',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;

      // Clear all notifications on the server
      await axios.delete(`${API_BASE_URL}/notifications`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      thunkAPI.dispatch(notificationsSlice.actions.clearNotifications());
    } catch (error) {
      // Handle errors here
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Thunk to automatically remove a notification after a specified duration
export const autoRemoveNotification = createAsyncThunk(
  'notifications/autoRemoveNotification',
  async ({ notificationId, duration }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;

      await new Promise(resolve => setTimeout(resolve, duration));

      // Remove the notification from the server
      await axios.delete(`${API_BASE_URL}/notifications/${notificationId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      thunkAPI.dispatch(notificationsSlice.actions.removeNotification(notificationId));
    } catch (error) {
      // Handle errors here
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Thunk to show temporary notifications that disappear after a short period
export const showTemporaryNotification = createAsyncThunk(
  'notifications/showTemporaryNotification',
  async (notification, thunkAPI) => {
    try {
      const { duration = 20000 } = notification; // Default duration is 20 seconds
      const token = thunkAPI.getState().auth.token;
      // Send the temporary notification to the server
      const response = await axios.post(
        `${API_BASE_URL}/notifications`,
        { ...notification },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const newNotification = response.data;
      thunkAPI.dispatch(notificationsSlice.actions.addNotification(newNotification));

      await new Promise(resolve => setTimeout(resolve, duration));

      // Remove the temporary notification from the server
      await axios.delete(`${API_BASE_URL}/notifications/${newNotification._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      thunkAPI.dispatch(notificationsSlice.actions.removeNotification(newNotification._id));
    } catch (error) {
      // Handle errors here
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Thunk to update the content of a notification
export const updateNotification = createAsyncThunk(
  'notifications/updateNotification',
  async (notification, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;

      // Update the notification on the server
      await axios.put(`${API_BASE_URL}/notifications/${notification._id}`, { ...notification }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      thunkAPI.dispatch(notificationsSlice.actions.updateNotification(notification));
    } catch (error) {
      // Handle errors here
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Thunk to batch add notifications
export const batchAddNotifications = createAsyncThunk(
  'notifications/batchAddNotifications',
  async (notificationArray, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;

      // Send the array of notifications to the server
      const response = await axios.post(`${API_BASE_URL}/batchNotications`, notificationArray, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const addedNotifications = response.data;
      thunkAPI.dispatch(notificationsSlice.actions.addNotifications(addedNotifications));
    } catch (error) {
      // Handle errors here
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const setNotificationAsRead = createAsyncThunk(
  'notifications/markNotificationAsRead',
  async (notificationId, thunkAPI) => {
    try {
      // Mark the notification as read on the server
      await axios.put(`${API_BASE_URL}/notifications/${notificationId}/read`);
      thunkAPI.dispatch(notificationsSlice.actions.markNotificationAsRead(notificationId));
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (token, thunkAPI) => { // Pass 'token' as an argument
    try {
      // Fetch notifications for the logged-in user
      const response = await axios.get(`${API_BASE_URL}/notifications`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const notifications = response.data;
      thunkAPI.dispatch(setNotifications(notifications));
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const markAllNotificationsAsRead = createAsyncThunk(
  'notifications/markAllNotificationsAsRead',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;

      // Mark all notifications as read on the server
      const response = await axios.put(`${API_BASE_URL}/notifications`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
        thunkAPI.dispatch(notificationsSlice.actions.markAllNotificationsAsRead());
        return response.data;
  
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);



export default {
  addNewNotification,
  removeNotificationById,
  clearAllNotifications,
  autoRemoveNotification,
  showTemporaryNotification,
  updateNotification,
  batchAddNotifications,
  markNotificationAsRead,
  fetchNotifications,
  markAllNotificationsAsRead,
};

