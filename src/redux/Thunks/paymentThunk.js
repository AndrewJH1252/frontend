import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; // Replace with your API base URL


// Async Thunk for fetching payment history for a user
export const fetchPaymentHistory = createAsyncThunk(
    'payment/fetchPaymentHistory',
    async (userId) => {
      
      try {
        const response = await axios.get(`${API_BASE_URL}/users/${userId}/payment-history`);
        return response.data;
      } catch (error) {
        throw new Error('Failed to fetch payment history.');
      }
    }
  )


  export const initiateStripePayment = createAsyncThunk(
    'payment/initiateStripePayment',
    async ({ amount, token }, thunkAPI) => {
      try {
        // Send a request to your backend to initiate the payment
        const response = await axios.post(`${API_BASE_URL}/payments/initiate`, {
          amount,
          token,
        });
  
        // Payment initiated successfully
        const paymentIntent = response.data.paymentIntent;
        return paymentIntent;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );
  
  

export const updatePayment = createAsyncThunk(
    'payment/updatePayment',
    async ({ userId, paymentId, updatedPaymentInfo }, { dispatch }) => {
      try {
        const response = await axios.put(
          `${API_BASE_URL}/users/${userId}/payments/${paymentId}`,
          updatedPaymentInfo
        );

  
        if (response.status === 200) {
          // Dispatch the updatedPaymentInfo action to update the state locally
          dispatch(updatedPaymentInfo({ updatedPaymentId: paymentId, updatedInfo: updatedPaymentInfo }));
  
          // You can also add a success message/notification here if needed
          return response.data;
        } else {
          throw new Error('Failed to update payment information.');
        }
      } catch (error) {
        throw new Error('Failed to update payment information.');
      }
    }
  );
  
  // Async Thunk for canceling a payment
  export const cancelPayment = createAsyncThunk(
    'payment/cancelPayment',
    async ({ userId, paymentId }) => {
      try {
        const response = await axios.post(
          `${API_BASE_URL}/users/${userId}/cancel-payment`,
          { paymentId }
        );
        return response.data;
      } catch (error) {
        throw new Error('Failed to cancel payment.');
      }
    }
  );
  


export default {
  fetchPaymentHistory,
  updatePayment,
  cancelPayment,
  initiateStripePayment,

  // ... (other payment-related async thunks)
};



