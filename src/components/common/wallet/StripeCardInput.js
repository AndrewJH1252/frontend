import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const StripeCardInput = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleCardPayment = async () => {
    if (!stripe || !elements) {
      console.error('Stripe.js has not loaded yet.');
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      // Create a payment method
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        console.error('Error creating payment method:', error);
      } else {
        // Handle successful payment method creation
        console.log('Payment Method created:', paymentMethod);
        // You can now send the payment method to your server for processing
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Secure Card Payment</h2>
      <div className="p-4 border rounded-lg">
        <CardElement options={{ /* Customize styling here */ }} />
      </div>
      <button
        className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
        onClick={handleCardPayment}
      >
        Pay {amount}
      </button>
    </div>
  );
};

export default StripeCardInput;
