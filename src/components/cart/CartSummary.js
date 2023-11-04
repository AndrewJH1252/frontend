import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { applyCoupon } from '../../redux/Thunks/cartThunk';
import {  fetchWalletById } from '../../redux/Thunks/walletThunk';
import { FaMoneyBillAlt, FaPercentage } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const CartSummary = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const total = useSelector(state => state.cart.total);
  const items = useSelector(state => state.cart.items);
  const walletId = useSelector((state) => state.auth.profile.walletId);
  const [couponCode, setCouponCode] = useState('');

  const location = useLocation();
  const isMarkedSummary = new URLSearchParams(location.search).get('marked') === 'true';

  // Filter the items based on whether they are marked
  const displayedItems = isMarkedSummary ? items.filter(item => item.marked) : items;

  useEffect(() => {
    // Fetch wallet details when the component mounts
      dispatch(fetchWalletById(walletId));
    
  }, [dispatch, walletId]);

  const handleApplyCoupon = () => {
    dispatch(applyCoupon(couponCode));
  };

  const handleProceedToCheckout = () => {
    history('/checkout');
  };

  // Calculate total quantity
  const totalQuantity = displayedItems.reduce((acc, item) => acc + item.quantity, 0);

  // Calculate total price for displayed items
  const totalForDisplayedItems = displayedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);


  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 to-indigo-700 py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold text-white mb-8">Cart Summary</h1>
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <p className="text-2xl font-semibold text-gray-800 mb-4">
          Total: $ {totalForDisplayedItems.toFixed(2)} ({totalQuantity} items)
        </p>
        {/* Render the names of each item */}
        <div>
          <span className="text-2xl font-semibold text-gray-800 mb-2">Items List:</span>
          
          {displayedItems.map(item => (
            <div key={item.id} className="mb-2 border border-gray-300 rounded mt-2 p-2 hover:shadow-md transition duration-300 ease-in-out transform hover:scale-105">
              <span className="font-semibold text-indigo-700">{item.itemName}</span> 
            </div>
          ))}
        </div>
        <div className="flex items-center mt-6">
          <input
            type="text"
            value={couponCode}
            onChange={e => setCouponCode(e.target.value)}
            className="border rounded-l-md px-3 py-2 w-1/2 focus:outline-none focus:ring focus:ring-indigo-300"
            placeholder="Enter Coupon Code"
          />
          <button
            onClick={handleApplyCoupon}
            className="flex items-center justify-center bg-indigo-500 text-white px-4 py-2 rounded-r-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300"
          >
            Apply Coupon <FaPercentage className="ml-2" />
          </button>
        </div>
        <button
          onClick={handleProceedToCheckout}
          className="flex items-center justify-center bg-green-500 text-white px-6 py-3 rounded-lg mt-6 hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300"
        >
          Checkout <FaMoneyBillAlt className="ml-2" /> 
        </button>
      </div>
    </div>
  </div>
  
  );
};

export default CartSummary;
