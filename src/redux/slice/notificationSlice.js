import { createSlice } from '@reduxjs/toolkit';

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: [],
  reducers: {
    addNotification: (state, action) => {
      state.push(action.payload);
    },
    removeNotification: (state, action) => {
      return state.filter(notification => notification._id !== action.payload);
    },
    clearNotifications: (state) => {
      return [];
    },
    updateNotification: (state, action) => {
      const { id, ...updatedFields } = action.payload;
      const notification = state.find(notification => notification.id === id);
      if (notification) {
        Object.assign(notification, updatedFields);
      }
    },
    addNotifications: (state, action) => {
      state.push(...action.payload);
    },

    setNotifications: (state, action) => {
      return action.payload;
    },
  },

  markNotificationAsRead: (state, action) => {
    const notification = state.find(notification => notification._id === action.payload);
    if (notification) {
      notification.read = true;
    }
  },
  markAllNotificationsAsRead: (state) => {
    state.forEach(notification => {
      notification.read = true;
    });
  },

});

export const {
  addNotification,
  removeNotification,
  clearNotifications,
  updateNotification,
  addNotifications,
  markNotificationAsRead,
  setNotifications,
  markAllNotificationsAsRead,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
