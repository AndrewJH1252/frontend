import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const WithdrawFunds = ({ onWithdraw }) => {
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();

  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleWithdraw = async (e) => {
    e.preventDefault();

    if (isSubmitting || !stripe || !elements) return;

    setIsSubmitting(true);

    try {
      // Perform client-side validation (e.g., checking if the amount is valid)
      if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) {
        alert('Please enter a valid withdrawal amount.');
        setIsSubmitting(false);
        return;
      }

      // Create a PaymentMethod using the CardElement
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      });

      if (error) {
        console.error('Stripe error:', error.message);
        alert('An error occurred while processing your payment.');
        setIsSubmitting(false);
        return;
      }

      // Dispatch the `onWithdraw` action to initiate the withdrawal
      const resultAction = await dispatch(onWithdraw({ paymentMethod, amount: parseFloat(withdrawAmount) }));

      if (resultAction.type === 'wallet/withdrawFundsFromWallet/fulfilled') {
        // Withdrawal succeeded, you can perform any additional actions you need
        console.log('Withdrawal succeeded');
      } else {
        // Withdrawal failed, handle the error
        console.error('Withdrawal failed:', resultAction.payload);
      }

      // Reset the form and state
      setWithdrawAmount('');
      setIsSubmitting(false);

      // Invoke the provided callback to handle the withdrawal on the parent component
      if (typeof onWithdraw === 'function') {
        onWithdraw();
      }
    } catch (error) {
      console.error('Withdrawal error:', error);
      alert('An error occurred during withdrawal.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="ml-5 mt-8 mb-5">
      <form onSubmit={handleWithdraw}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="withdrawAmount">
            Withdraw Amount
          </label>
          <input
            type="number"
            id="withdrawAmount"
            name="withdrawAmount"
            className="border rounded-md py-2 px-3 w-full"
            placeholder="Enter withdrawal amount"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
            required
          />
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
        <button
          type="submit"
          className={`bg-blue-500 text-white px-4 py-2 rounded-md ${
            isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:bg-blue-600'
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Withdrawing...' : 'Withdraw'}
        </button>
      </form>
    </div>
  );
};

export default WithdrawFunds;
