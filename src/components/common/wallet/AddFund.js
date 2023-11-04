import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const AddFunds = ({ onAddFunds }) => {
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddFunds = async (e) => {
    console.log('handleAddFunds called'); // Add this line
    e.preventDefault();
  
    if (isSubmitting || !stripe || !elements) return;
  
    setIsSubmitting(true);
  
    try {
      // Client-side validation
      if (!amount || parseFloat(amount) <= 0) {
        alert('Please enter a valid amount.');
        setIsSubmitting(false);
        return;
      }
  
      // Create a PaymentMethod using the CardElement
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      });
  
      console.log('PaymentMethod:', paymentMethod); // Log the PaymentMethod object
      console.log('Stripe error:', error); // Log the error object
  
      if (error) {
        console.error('Stripe error:', error.message);
        alert('An error occurred while processing your payment.');
        setIsSubmitting(false);
        return;
      }
  
      // Dispatch the addFundsToWallet thunk to initiate the addition of funds
      await dispatch(onAddFunds({ paymentMethod, amount: parseFloat(amount) }));
  
      console.log('Payment succeeded'); // Log payment success
  
      // Reset the form and state
      setAmount('');
      setIsSubmitting(false);
  
      // Invoke the provided callback to handle the addition of funds on the parent component
      if (typeof onAddFunds === 'function') {
        onAddFunds();
      }
    } catch (error) {
      console.error('Add funds error:', error);
      alert('An error occurred while adding funds.');
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="ml-5 mt-8 mb-5">
      <form onSubmit={handleAddFunds}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="addFundsAmount">
            Amount to Add
          </label>
          <div className="relative rounded-md border border-gray-300">
            <input
              type="number"
              id="addFundsAmount"
              name="addFundsAmount"
              className="border rounded-md py-2 px-3 w-full"
              placeholder="Enter amount to add"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-2">
              <span className="text-gray-500">$</span>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cardElement">
            Card Information
          </label>
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
        <div className="mt-4">
          <button
            type="submit"
            onClick={handleAddFunds}
            className={`bg-blue-500 text-white px-4 py-2 rounded-md ${
              isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:bg-blue-600'
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding Funds...' : 'Add Funds'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFunds;
