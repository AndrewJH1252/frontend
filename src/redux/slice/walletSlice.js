import { createSlice } from '@reduxjs/toolkit';
import {
  fetchWalletById,
  createWallet,
  addFundsToWallet,
  makePayment,
  fetchTransactionHistory,
  fetchEarnings,
  withdrawFundsFromWallet,
  transferFunds,
  fetchTransferIdByUserId,
  makeWalletPayment,
} from '../Thunks/walletThunk';

const initialState = {
 
  earnings: [],
  wallet: null,
  balance: 0,
  transactions: [],
  transferId: null,
  status: 'idle',
  paymentStatus: null,
  error: null,
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setPaymentStatus: (state, action) => {
      state.paymentStatus = action.payload;
    },
    updateBalance: (state, action) => {
      state.wallet = {
        ...state.wallet,
        balance: action.payload,
      };
    },
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWalletById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWalletById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.wallet = action.payload; // Update balance field
      })
      .addCase(fetchWalletById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addFundsToWallet.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.wallet.balance += action.payload;
      })
      .addCase(makePayment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.wallet.balance -= action.payload;
      })
      .addCase(fetchTransactionHistory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTransactionHistory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.transactions = action.payload;
      })
      .addCase(fetchTransactionHistory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchEarnings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEarnings.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.earnings = action.payload;
      })
      .addCase(fetchEarnings.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(withdrawFundsFromWallet.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.wallet.balance -= action.payload;
      })
      .addCase(transferFunds.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.wallet.balance = action.payload.senderBalance; // Update sender's balance
        // You can also update recipient's balance if needed
        // state.recipientWallet.balance = action.payload.recipientBalance;
      })
      
      .addCase(fetchTransferIdByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransferIdByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.transferId = action.payload;
      })
      .addCase(fetchTransferIdByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createWallet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
  
      // Handle the createWallet.fulfilled action
      .addCase(createWallet.fulfilled, (state, action) => {
        state.loading = false;
        state.wallet = action.payload;
      })
  
      // Handle the createWallet.rejected action
      .addCase(createWallet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

  },
});
export const { setPaymentStatus, updateBalance } = walletSlice.actions;

export default walletSlice.reducer;
