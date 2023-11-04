import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  removeFromCart,
  fetchCartContents,
  markAllCartItems,
  clearMarkedCartItems,
  unmarkAllCartItems,
} from '../../redux/Thunks/cartThunk';
import { setCartContents } from '../../redux/slice/cartSlice';
import CartItem from '../cart/CartItem';
import { FaArrowRight, FaTrash } from 'react-icons/fa'; // Import a React Icon component
import { FiCheckCircle, FiPlusCircle } from 'react-icons/fi';
import CountUp from 'react-countup';

const Cart = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const token = useSelector((state) => state.auth.token);
  const [reloadRequests, setReloadRequests] = useState(Date.now());

  useEffect(() => {
    // Fetch cart contents when the page loads or when reloadRequests is true
    if (reloadRequests) {
      dispatch(fetchCartContents(token)).then((response) => {
        if (fetchCartContents.fulfilled.match(response)) {
          dispatch(setCartContents(response.payload)); // Update the cart contents in the state
        }
      }); // Reset reloadRequests
    }
  }, [dispatch, reloadRequests, token]);
  
  // Calculate total number of items in the cart
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Calculate the total price of items in the cart
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleProceedToSummary = () => {
    // Filter the marked items
    const markedItems = cartItems.filter((item) => item.marked);

    // If there are marked items, navigate to the summary page with marked items
    if (markedItems.length > 0) {
      history(`/cart-summary?marked=true`);
    } else {
      // Handle the case when there are no marked items (e.g., show a message)
      alert('No marked items to show in Cart.');
    }
  };

  

  const handleRemoveFromCart = (itemId) => {
    dispatch(removeFromCart(itemId));
    setReloadRequests(Date.now());
  };
  
  const handleMarkUnmarkAllItems = async (mark) => {
    const action = mark ? markAllCartItems() : unmarkAllCartItems();
    await dispatch(action); // Wait for the action to complete
    setReloadRequests(Date.now());
  };

  const handleClearCart = async () => {
    const hasMarkedItems = cartItems.some((item) => item.marked);

    if (hasMarkedItems) {
      if (window.confirm('Are you sure you want to remove marked items?')) {
        await dispatch(clearMarkedCartItems()); // Wait for the action to complete
      }
      setReloadRequests(Date.now());
    } else {
      alert('No marked items to clear.');
    }
  };

  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-600 to-blue-300 py-16">
    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-10 rounded-lg bg-white bg-opacity-90 shadow-xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800">Your Cart</h1>
        <div className="space-x-4">
          <button
            onClick={() => handleMarkUnmarkAllItems(!cartItems.every((item) => item.marked))}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 transform hover:scale-105 transition duration-300 ease-in-out"
            title="Mark/Unmark All"
          >
            {cartItems.every((item) => item.marked) ? (
              <FiPlusCircle className="text-2xl" />
            ) : (
              <FiCheckCircle className="text-2xl" />
            )}
          </button>
          <button
            onClick={handleClearCart}
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300 transform hover:scale-105 transition duration-300 ease-in-out"
            title="Delete Marked"
          >
            <FaTrash className="text-2xl" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onRemove={handleRemoveFromCart}
            setReloadRequests={setReloadRequests}
          />
        ))}
      </div>
      <div className="mt-12 flex justify-between items-center">
        <div>
          <p className="text-2xl font-semibold text-gray-800">Total Items:</p>
          <p className="text-4xl font-bold text-blue-600">
            <CountUp start={0} end={totalItems} duration={2} separator="," />
          </p>
        </div>
        <div>
          <p className="text-2xl font-semibold text-gray-800">Total Price:</p>
          <p className="text-3xl font-bold text-green-600">
            <CountUp start={0} end={totalPrice.toFixed(2)} duration={2} decimals={2} prefix="$" />
          </p>
        </div>
      </div>
      <div className="mt-8 flex justify-center">
      <button
        onClick={handleProceedToSummary}
        className="flex items-center justify-center bg-blue-500 text-white py-3 px-8 rounded-full hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 transform hover:scale-110 transition duration-300 ease-in-out"
      >
        Proceed <FaArrowRight className="ml-2 text-2xl" />
      </button>
    </div>
    </div>
  </div>
  
  );
};

export default Cart;
