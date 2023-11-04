import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { FaMoneyBillAlt } from 'react-icons/fa';
import { makeWalletPayment, makePaymentOnServer, fetchWalletById } from '../../redux/Thunks/walletThunk';
import { addNewNotification } from '../../redux/Thunks/notificationsThunk';
import { useNavigate } from 'react-router-dom';
import { enrollInCourse } from '../../redux/Thunks/courseThunk';
import { removeFromCart } from '../../redux/Thunks/cartThunk';

const Checkout = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const walletBalance = useSelector((state) => (state.wallet.wallet === null ? state.wallet.balance : state.wallet.wallet.balance || 0));
  const walletId = useSelector((state) => state.auth.profile.walletId || []);
  const userId = useSelector((state) => state.auth.profile._id);
  const cartItems = useSelector((state) => state.cart.items);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');

  // Calculate the marked items and totalAmount
  const markedItems = cartItems.filter((item) => item.marked);
  const totalAmount = markedItems.reduce((total, item) => total + item.price * item.quantity, 0);
  
  const [errorState, setErrorState] = useState(null); // Define errorState

  useEffect(() => {
    // Fetch wallet details when the component mounts
      dispatch(fetchWalletById(walletId));
    
  }, [dispatch, walletId]);

  const handleCardPayment = async () => {
    const confirmed = window.confirm('Are you sure you want to make this payment with your card?');
  
    if (!confirmed) {
      // The user cancelled the payment
      return;
    }
  
    setIsProcessing(true);
  
    try {
      // Dispatch the makePaymentOnServer thunk with stripe and elements as arguments
      const paymentIntent = await dispatch(
        makePaymentOnServer({ selectedPaymentMethod, totalAmount, stripe, elements })
      );
  
      // Handle the paymentIntent as needed
  
      // Remove purchased items from the cart
      markedItems.forEach((item) => {
        const itemId = item._id; // Access the ID of the purchased item
        dispatch(removeFromCart(itemId));
      });
  
      // Dispatch an action to add a success notification
      const successMessage =
      markedItems.length > 0
        ? `Payment successful! You have purchased the following courses: ${markedItems
            .map((item) => item.itemId.title) // Access the course title
            .join(', ')}`
        : 'Payment successful';

      dispatch(
        addNewNotification({
          recipientId: userId,
          message: successMessage,
          type: 'success',
        })
      );

  
      const enrollPromises = markedItems.map(async (item) => {
        await dispatch(enrollInCourse(item.itemId._id));
      });
  
      // Wait for all enrollment promises to resolve
      await Promise.all(enrollPromises);
  
      // Payment successful, navigate to the main page
      history('/Main');
    } catch (error) {
      // Handle payment processing error
      setIsProcessing(false);
      // Display an error message to the user (e.g., setErrorState)
      setErrorState('An error occurred while processing the payment.');
    }
  };
  


  const handleWalletPayment = async () => {
    setIsProcessing(true);
  
    try {
      const confirmed = window.confirm('Are you sure you want to make this payment?');
  
      if (!confirmed) {
        // The user cancelled the payment
        return;
      }
  
      const purchasedItems = [];
  
      // Iterate through marked items and make payments if wallet balance is sufficient
      const paymentPromises = markedItems.map(async (item) => {
        if (item.price > 0) {
          const remainingBalance = walletBalance - item.price;
  
          if (remainingBalance < 0) {
            // Insufficient wallet balance for this item
            throw new Error(`Insufficient wallet balance to purchase ${item.itemName}`);
          }

          const paymentDetails = {
            amount: item.price,
            recipientId: item.itemId.tutor // Assuming 'recipient' is the variable containing recipientId
          
          };

          try {
            await dispatch(makeWalletPayment(paymentDetails));

            purchasedItems.push(item);
    
      
            window.alert('You have successfully purchased the course'); // Display success message
          } catch (error) {
            console.error('Error purchasing', error);
            window.alert('You have failed purchase the course'); // Display error message
          
          }
      
        }
      });
  
      // Wait for all payment promises to resolve
      await Promise.all(paymentPromises);
  
      // Remove purchased items from the cart
      purchasedItems.forEach((item) => {
        const itemId = item._id; // Access the ID of the purchased item
        dispatch(removeFromCart(itemId));
      });
      // Payment successful, add notification with a dynamic message
      const successMessage =
      purchasedItems.length > 0
        ? `Payment successful! You have purchased the following courses: ${purchasedItems
            .map((item) => item.itemId.title) // Access the course title
            .join(', ')}`
        : 'Payment successful';
    
    dispatch(
      addNewNotification({
        recipientId: userId,
        message: successMessage,
        type: 'success',
      })
    );
    
      const enrollPromises = purchasedItems.map(async (item) => {
        await dispatch(enrollInCourse({ courseId: item.itemId._id }));

      });
  
      // Wait for all enrollment promises to resolve
      await Promise.all(enrollPromises);
  
      history('/Main');
      // Continue with other logic as needed
    } catch (error) {
      // Handle payment errors and display an error message
      dispatch(
        addNewNotification({
          recipientId: userId,
          message: error.message,
          type: 'error',
        })
      );
    } finally {
      setIsProcessing(false);
    }
  };
  
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 to-indigo-700 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-white mb-8">Checkout</h1>
        <div className="bg-white p-6 rounded-lg shadow-xl">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Order Summary</h2>
            {/* Display a list of marked items */}
            {markedItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center border-b border-gray-300 py-2">
                <span className="text-lg text-gray-700">{item.itemName}</span>
                <span className="text-lg text-indigo-700">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Total Amount</h2>
            <p className="text-3xl text-indigo-700">${totalAmount.toFixed(2)}</p>
          </div>
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Select Payment Method</h2>
            <div className="flex">
              <button
                className={`mr-4 p-2 border ${
                  selectedPaymentMethod === 'card' ? 'border-blue-500' : 'border-gray-300'
                }`}
                onClick={() => setSelectedPaymentMethod('card')}
              >
                Credit/Debit Card
              </button>
              <button
                className={`p-2 border ${
                  selectedPaymentMethod === 'wallet' ? 'border-blue-500' : 'border-gray-300'
                }`}
                onClick={() => setSelectedPaymentMethod('wallet')}
              >
                Wallet
              </button>
            </div>
          </div>
          {selectedPaymentMethod === 'card' && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Card Payment</h2>
              <div className="border rounded-lg p-3">
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: '16px',
                        color: '#333',
                        '::placeholder': {
                          color: '#ccc',
                        },
                      },
                    },
                  }}
                  id="cardElement"
                />
              </div>
            </div>
          )}
       <button
          onClick={selectedPaymentMethod === 'card' ? handleCardPayment : handleWalletPayment}
          className="flex items-center justify-center bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300 mt-5 disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={isProcessing || (selectedPaymentMethod === 'wallet' && totalAmount > walletBalance)}
        >
          {isProcessing ? (
            <span className="flex items-center">
              Processing <FaMoneyBillAlt className="ml-2" />
            </span>
          ) : (
            <span className="flex items-center">
              Pay Now <FaMoneyBillAlt className="ml-2" />
            </span>
          )}
        </button>
          {selectedPaymentMethod === 'wallet' && totalAmount > walletBalance && (
            <p className="text-red-500 mt-4">Insufficient wallet balance to make the payment.</p>
          )}

        </div>
      </div>
    </div>
  );
};

export default Checkout;
