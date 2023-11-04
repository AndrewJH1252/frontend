import { createSlice } from '@reduxjs/toolkit';
import * as earningsThunks from '../Thunks/earningsThunk'; // Import the necessary action creators from your earningsThunk

const initialState = {
  earningsHistory: [],
  earningsSummary: null,
  totalEarnings: null,
  requestStatus: 'idle',
  // ... (other earnings-related state properties)
};

const earningsSlice = createSlice({
  name: 'earnings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(earningsThunks.fetchEarningsHistory.pending, (state) => {
        state.requestStatus = 'pending';
      })
      .addCase(earningsThunks.fetchEarningsHistory.fulfilled, (state, action) => {
        state.requestStatus = 'success';
        state.earningsHistory = action.payload;
      })
      .addCase(earningsThunks.fetchEarningsHistory.rejected, (state) => {
        state.requestStatus = 'error';
      })
      .addCase(earningsThunks.fetchEarningsSummary.pending, (state) => {
        state.requestStatus = 'pending';
      })
      .addCase(earningsThunks.fetchEarningsSummary.fulfilled, (state, action) => {
        state.requestStatus = 'success';
        state.earningsSummary = action.payload;
      })
      .addCase(earningsThunks.fetchEarningsSummary.rejected, (state) => {
        state.requestStatus = 'error';
      })
      .addCase(earningsThunks.fetchTotalEarnings.pending, (state) => {
        state.requestStatus = 'pending';
      })
      .addCase(earningsThunks.fetchTotalEarnings.fulfilled, (state, action) => {
        state.requestStatus = 'success';
        state.totalEarnings = action.payload;
      })
      .addCase(earningsThunks.fetchTotalEarnings.rejected, (state) => {
        state.requestStatus = 'error';
      })
      .addCase(earningsThunks.deleteEarnings.pending, (state) => {
        state.requestStatus = 'pending';
      })
      .addCase(earningsThunks.deleteEarnings.fulfilled, (state) => {
        state.requestStatus = 'success';
        // Handle deletion of earnings
      })
      .addCase(earningsThunks.deleteEarnings.rejected, (state) => {
        state.requestStatus = 'error';
      })
      .addCase(earningsThunks.calculateProjectedEarnings.pending, (state) => {
        state.requestStatus = 'pending';
      })
      .addCase(earningsThunks.calculateProjectedEarnings.fulfilled, (state, action) => {
        state.requestStatus = 'success';
        // Handle calculated projected earnings
        state.projectedEarnings = action.payload; // Update the state with the calculated projected earnings
      })      
      .addCase(earningsThunks.calculateProjectedEarnings.rejected, (state) => {
        state.requestStatus = 'error';
      });
  },
});

export default earningsSlice.reducer;
