import React from 'react';

const PaymentCard = ({ id, date, amount, description }) => {
  // Validate the date and amount before formatting
  const formattedDate = (() => {
    try {
      const parsedDate = new Date(date);
      if (isNaN(parsedDate)) throw new Error('Invalid date');
      return parsedDate.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch (error) {
      return 'Invalid date';
    }
  })();

  const formattedAmount = (() => {
    try {
      const parsedAmount = parseFloat(amount);
      if (isNaN(parsedAmount)) throw new Error('Invalid amount');
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(parsedAmount);
    } catch (error) {
      return 'Invalid amount';
    }
  })();

  return (
    <div className="bg-white p-4 rounded-md shadow mb-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold">Payment ID: {id}</h3>
        <p className="text-gray-500">{formattedDate}</p>
      </div>
      <p className="mb-2">Amount: {formattedAmount}</p>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default PaymentCard;
