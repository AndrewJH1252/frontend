import { createSlice } from '@reduxjs/toolkit';
import {
  fetchPaymentHistory,
  updatePayment,
  cancelPayment,
  initiateStripePayment,
} from '../Thunks/paymentThunk'; // Import the necessary action creators from your paymentThunk

const calculateRefundedAmount = (dataFromApi) => {
  const totalAmount = dataFromApi.totalAmount; // Total payment amount
  const refundPercentage = dataFromApi.refundPercentage; // Percentage of refund

  // Calculate the refunded amount based on the refund percentage
  const refundedAmount = (refundPercentage / 100) * totalAmount;

  return refundedAmount;
};

const initialState = {
  paymentHistory: [],
  paymentStatus: 'idle', // Can be 'idle', 'pending', 'success', 'error', etc.
  paymentIntent: null,


  // Similar to paymentStatus but for refunding
  // ... (other payment-related state properties)
};
  
const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaymentHistory.fulfilled, (state, action) => {
        state.paymentStatus = 'success';
        state.paymentHistory = action.payload; // Update the payment history
      })
     
      .addCase(updatePayment.fulfilled, (state, action) => {
        // Handle updating payment success if needed
        const updatedPayment = action.payload; // Updated payment data from the API
        // Update the paymentHistory with the updated payment
        state.paymentHistory = state.paymentHistory.map(payment => {
          if (payment.id === updatedPayment.id) {
            return updatedPayment;
          }
          return payment;
        });
      })
      .addCase(cancelPayment.fulfilled, (state, action) => {
        // Handle canceling payment success if needed
        const canceledPayment = action.payload; // Canceled payment data from the API
        // Remove the canceled payment from paymentHistory
        state.paymentHistory = state.paymentHistory.filter(payment => payment.id !== canceledPayment.id);
      })
    
      .addCase(fetchPaymentHistory.pending, (state) => {
        state.paymentStatus = 'pending';
      })
      .addCase(fetchPaymentHistory.rejected, (state) => {
        state.paymentStatus = 'error';
      })
      .addCase(initiateStripePayment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(initiateStripePayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.paymentIntent = action.payload;
        state.error = null;
      })
      .addCase(initiateStripePayment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    
      // ... other cases ...
     
    // ... (other payment-related cases)
  },
});

export const { } = paymentSlice.actions;
export default paymentSlice.reducer;
