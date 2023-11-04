import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setPaymentStatus, updateBalance } from '../slice/walletSlice';
import walletSlice from '../slice/walletSlice';
import { stripe } from '@stripe/stripe-js'; // Import the stripe variable
import { elements, CardElement } from '@stripe/react-stripe-js'; // Import elements and CardElement

// Your thunk logic here...


const API_BASE_URL = 'http://localhost:5000'; // Update this to your API URL

const createPaymentIntentEndpoint = 'http://localhost:5000';



// Thunk to fetch wallet balance
// Create an async thunk to fetch a wallet by its ID
export const fetchWalletById = createAsyncThunk(
  'wallet/fetchWalletById',
  async (walletId, thunkAPI) => {
    try {
      // You can access the Redux store's state with getState()
      const token = thunkAPI.getState().auth.token;

      // Send a GET request to fetch the wallet by ID
      const response = await axios.get(`${API_BASE_URL}/wallets/${walletId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Return the data from the response as the payload
      return response.data;
    } catch (error) {
      // Handle any errors and throw them to be caught by Redux
      throw error;
    }
  }
);

// Create a new wallet for the authenticated user
export const createWallet = createAsyncThunk(
  'wallet/createWallet',
  async (walletData, thunkAPI) => {
    try {

      const token = thunkAPI.getState().auth.token;

      // Send a POST request to create a wallet with the provided data
      const response = await axios.post(`${API_BASE_URL}/wallet`, walletData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// Thunk to add funds to the wallet
export const addFundsToWallet = createAsyncThunk(
  'wallet/addFunds',
  async ({ paymentMethodId, amount }, { rejectWithValue, getState }) => {
    const token = getState().auth.token; // Get the authentication token from the Redux store's auth slice

    try {
      const response = await axios.post(
        `${API_BASE_URL}/create-payment-intent`,
        {
          paymentMethodId,
          amount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        return response.data; // You can return any data you need from the API response
      } else {
        return rejectWithValue('Payment failed'); // Handle the error
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error adding funds');
    }
  }
);

// Thunk to make a payment from the wallet
export const makePayment = createAsyncThunk(
  'wallet/makePayment',
  async (paymentDetails, thunkAPI) => {

    console.log('paymentDetails',paymentDetails);
    try {
      const token = thunkAPI.getState().auth.token; // Get the authentication token
      const response = await axios.post(
        `${API_BASE_URL}/make-payment`,
        paymentDetails,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.message; // Assuming the server responds with a success message
    } catch (error) {
      throw error;
    }
  }
);

export const makePaymentOnServer = createAsyncThunk(
  'wallet/makePaymentOnServer',
  async ({ paymentMethod, totalAmount, stripe, elements }, { rejectWithValue }) => {
    try {
      // Create a PaymentMethod using the CardElement (you can adjust the card data accordingly)
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      });

      if (error) {
        // Handle payment method creation error
        return rejectWithValue(error.message);
      }

      // Make a POST request to your server's payment endpoint
      const response = await axios.post(`${API_BASE_URL}/payment`, {
        paymentMethod,
        totalAmount,
      });

      // Assuming your API returns relevant data, return it
      return response.data;
    } catch (error) {
      // Handle errors and reject the promise with an error message
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to fetch transaction history
export const fetchTransactionHistory = createAsyncThunk(
  'wallet/fetchTransactions',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token; // Get the authentication token
      const response = await axios.get(`${API_BASE_URL}/transactions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.transactions;
    } catch (error) {
      throw error;
    }
  }
);

// Thunk to withdraw funds from the wallet
export const withdrawFundsFromWallet = createAsyncThunk(
  'wallet/withdrawFunds',
  async ({ amount }, { rejectWithValue, getState }) => {
    const token = getState().auth.token; // Get the authentication token from the Redux store's auth slice

    try {
      const response = await axios.post(
        `${API_BASE_URL}/withdraw`, // Replace with your API endpoint for withdrawing funds
        {
          amount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        return response.data; // You can return any data you need from the API response
      } else {
        return rejectWithValue('Withdrawal failed'); // Handle the error
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error withdrawing funds');
    }
  }
);

export const transferFunds = createAsyncThunk(
  'wallet/transferFunds',
  async ( transferDetails, thunkAPI) => {
    try {
       console.log('transferDetails',transferDetails);
      const token = thunkAPI.getState().auth.token;

      const response = await axios.post(`${API_BASE_URL}/transfer`,  transferDetails, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.message;
    } catch (error) {
      throw new Error('Failed to transfer Funds .');
    }
  }
);


// Thunk to fetch earnings
export const fetchEarnings = createAsyncThunk(
  'wallet/fetchEarnings',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token; // Get the authentication token
      const response = await axios.get(`${API_BASE_URL}/earnings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('response',response);
      return response.data.earnings;
    } catch (error) {
      throw error;
    }
  }
);

export const initiatePayment = createAsyncThunk(
  'stripe/initiatePayment',
  async (paymentData, { rejectWithValue, dispatch, getState }) => {
    try {
      const token = getState().auth.token; // Get the authentication token from the Redux store

      // Send a request to your server to create a payment intent
      const response = await axios.post(
        `${API_BASE_URL}${createPaymentIntentEndpoint}`,
        paymentData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        }
      );

      const paymentIntentData = response.data;

      // Check the response from the server to determine the payment status
      if (paymentIntentData.success) {
        // Payment was successful
        dispatch(setPaymentStatus('success'));
      } else {
        // Payment failed
        dispatch(setPaymentStatus('error'));
      }

      // Return the payment intent data (e.g., client secret)
      return paymentIntentData;
    } catch (error) {
      dispatch(setPaymentStatus('error')); // Handle network errors by setting an error status
      return rejectWithValue({ message: 'An error occurred' });
    }
  }
);

// Thunk to fetch transfer details
export const fetchTransferIdByUserId = createAsyncThunk(
  'wallet/fetchTransferIdByUserId',
  async (userId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/transfer/${userId}`);
      return response.data.transferId;
    } catch (error) {
      throw error;
    }
  }
);

export const checkRecipientExistence = createAsyncThunk(
  'wallet/checkRecipientExistence',
  async (recipientId) => { // Add categoryId as a parameter
    try {
      const response = await axios.get(`${API_BASE_URL}/check/${recipientId}`);
      return response.data.exists;
    } catch (error) {
      throw new Error('Failed to check');
    }
  }
);


export const makeWalletPayment = createAsyncThunk(
  'wallet/makePayment',
  async (paymentDetails, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;

      console.log('paymentDetails',paymentDetails);

      const response = await axios.post(
        `${API_BASE_URL}/pay`,
        paymentDetails,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const newBalance = response.data.newBalance;

        // Dispatch the action to update the profile locally in the store
        thunkAPI.dispatch(walletSlice.actions.updateBalance(newBalance));
        return response.data; // Return the updated user as the payload
      } else {
        // Handle other status codes (e.g., 404 for not found, 500 for server error, etc.)
        throw new Error('Failed to edit user profile.');
      }
    } catch (error) {
      // Handle errors here
      console.error('Error editing profile:', error.message);
      throw error;
    }
  }
);
