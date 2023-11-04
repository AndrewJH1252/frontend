import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  settings: null,
  loading: false,
  error: null,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    // Add reducer functions here for updating the state
    // For example:
    setSettings: (state, action) => {
      state.settings = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
      state.error = null;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setSettings, setLoading, setError, clearError } = settingsSlice.actions;

export default settingsSlice.reducer;
