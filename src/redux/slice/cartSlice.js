import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Array to hold cart items
    total: 0,  // Total cart amount
  },
  reducers: {
    addToCart: (state, action) => {
      const course = action.payload;
      // Check if the course is already in the cart, and update quantity if needed
      const existingItem = state.items.find(item => item.id === course.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ ...course, quantity: 1 });
      }
      state.total += course.price;
    },
    removeFromCart: (state, action) => {
      const courseId = action.payload;
      const removedItem = state.items.find(item => item.id === courseId);
      if (removedItem) {
        state.total -= removedItem.price * removedItem.quantity;
        state.items = state.items.filter(item => item.id !== courseId);
      }
    },
    updateQuantity: (state, action) => {
      const { courseId, quantity } = action.payload;
      const updatedItem = state.items.find(item => item.id === courseId);
      if (updatedItem) {
        const priceDifference = (quantity - updatedItem.quantity) * updatedItem.price;
        updatedItem.quantity = quantity;
        state.total += priceDifference;
      }
    },
    setCartContents: (state, action) => {
      const cartContents = action.payload;
      state.items = cartContents.items;
      state.total = cartContents.total;
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
    updateCart: (state, action) => {
      const updatedCart = action.payload;
      state.items = updatedCart.items;
      state.total = updatedCart.total;
    },

    // Redux Slice
    markAllCartItems: (state, action) => {
      state.items.forEach((item) => {
        item.marked = true; // Mark all items
      });
    },

    unmarkAllCartItems: (state, action) => {
      state.items.forEach((item) => {
        item.marked = false; // Unmark all items
      });
    },

    
    // Reducer for clearMarkedCartItems thunk
    clearMarkedCartItems: (state, action) => {
      state.items = state.items.filter(item => !item.marked); // Clear marked items
    },
    
    // Reducer for markCartItem thunk
    markCartItem: (state, action) => {
      const courseId = action.payload;
      const item = state.items.find(item => item.id === courseId);
      if (item) {
        item.marked = true; // Mark the specific item
      }
    },
  },
    unmarkCartItem: (state, action) => {
      const itemId = action.payload;
      const item = state.items.find(item => item.id === itemId);
      if (item) {
        item.marked = false; // Unmark the specific item
      }
    },
  

   
});
export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  setCartContents,
  clearCart,
  updateCart,
} = cartSlice.actions;

export default cartSlice.reducer;
