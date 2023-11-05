import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import  cartSlice  from '../slice/cartSlice'; // Import your cart slice

const API_BASE_URL = 'https://tutorium-api.onrender.com'; // Update this to your API URL

export const addToCart = createAsyncThunk('cart/addToCart', async (courseId, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token; // Assuming you have the token in the auth state

    console.log('Adding course to cart. Course ID:', courseId);

    const response = await axios.post(
      `${API_BASE_URL}/courses/${courseId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const course = response.data;
    // Update the cart state with the course details
    thunkAPI.dispatch(cartSlice.actions.addToCart(course));
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (itemId, thunkAPI) => {
    try {
      console.log('Removing itemId:', itemId);
      // Remove the notification from the server
      await axios.delete(`${API_BASE_URL}/item/${itemId}`);
      // Dispatch an action to remove the item from the local state
      thunkAPI.dispatch(cartSlice.actions.removeFromCart(itemId));
    } catch (error) {
      // Handle errors here
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)


export const updateCartItemQuantity = createAsyncThunk(
  'cart/updateCartItemQuantity',
  async ({ courseId, quantity }, thunkAPI) => {
    try {
      // Update the cart state with the updated quantity
      thunkAPI.dispatch(cartSlice.actions.updateQuantity({ courseId, quantity }));
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);



export const fetchCartContents = createAsyncThunk(
  'cart/fetchCartContents',
  async (token, thunkAPI) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const cartContents = response.data;
      return cartContents;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);



export const checkout = createAsyncThunk('cart/checkout', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token;
    const cartState = thunkAPI.getState().cart;
    // Perform the checkout process and update user account info
    const response = await axios.post(`${API_BASE_URL}/checkout`, cartState, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const checkout = response.data;
    thunkAPI.dispatch(cartSlice.actions.clearCart());
    return checkout;
    // Clear the cart state after successful checkout
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const applyCoupon = createAsyncThunk('cart/applyCoupon', async (couponCode, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token;
    const response = await axios.post(`${API_BASE_URL}/apply-coupon`, { couponCode }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const updatedCart = response.data;
    // Update the cart state with the updated cart after applying the coupon
    thunkAPI.dispatch(cartSlice.actions.updateCart(updatedCart));
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});


// Frontend (Redux Thunk)
export const markAllCartItems = createAsyncThunk(
  'cart/markAllCartItems',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      // Make a request to the backend API to mark all cart items
      const response = await axios.post(`${API_BASE_URL}/mark-all`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Dispatch the markAllCartItems action in the slice
      thunkAPI.dispatch(cartSlice.actions.markAllCartItems());

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const unmarkAllCartItems = createAsyncThunk(
  'cart/unmarkAllCartItems',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      // Make a request to the backend API to unmark all cart items
      const response = await axios.post(`${API_BASE_URL}/unmark-all`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Dispatch the unmarkAllCartItems action in the slice
      thunkAPI.dispatch(cartSlice.actions.unmarkAllCartItems());

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const clearMarkedCartItems = createAsyncThunk(
  'cart/clearMarkedCartItems',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      // Make a DELETE request to the backend API to clear marked items
      await axios.delete(`${API_BASE_URL}/clear-marked`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Dispatch the clearMarkedCartItems action in the slice
      thunkAPI.dispatch(cartSlice.actions.clearMarkedCartItems());

      // Return any data if needed
      return {}; // You can return an empty object or other relevant data here
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);




export const markCartItem = createAsyncThunk(
  'cart/markCartItem',
  async (itemId, thunkAPI) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/mark-item/${itemId}`);
      thunkAPI.dispatch(cartSlice.actions.markCartItem());
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const unmarkCartItem = createAsyncThunk(
  'cart/unmarkCartItem',
  async (itemId, thunkAPI) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/unmark-item/${itemId}`);
      thunkAPI.dispatch(cartSlice.actions.unmarkCartItem(itemId));
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);



export default {
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  fetchCartContents,
  checkout,
  applyCoupon,
  markAllCartItems,
  clearMarkedCartItems,
  markCartItem, // Add this line
  unmarkCartItem,
};

