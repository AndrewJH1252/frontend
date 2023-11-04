import React, { useState } from 'react';
import { checkRecipientExistence } from '../../../redux/Thunks/walletThunk';
import { useDispatch, useSelector } from 'react-redux';
import {
  transferFunds,
} from '../../../redux/Thunks/walletThunk';
import { addNewNotification } from '../../../redux/Thunks/notificationsThunk';

const TransferFunds = ({ walletId }) => {
  const dispatch = useDispatch();
  const [recipientId, setRecipientId] = useState('');
  const [amount, setAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const userId = useSelector((state) => state.auth.profile._id);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Check if the recipient exists by dispatching the new thunk
    const recipientExists = await dispatch(checkRecipientExistence(recipientId));

    if (!recipientExists) {
      window.alert('Recipient does not exist.');
      setIsSubmitting(false);
      return;
    }

    // Display a confirmation message using a pop-up dialog
    const confirmed = window.confirm('Are you sure you want to proceed with the transfer?');

    if (!confirmed) {
      setIsSubmitting(false);
      return;
    }

    const paymentDetails = {
      walletId,
      recipientId, // Assuming 'recipient' is the variable containing recipientId
      amount,
    };
    
    // Call the transferFunds thunk to initiate the transfer
    try {
      await dispatch(transferFunds(paymentDetails));

      const successMessage = `Transfer successful: You transferred $ ${amount} to wallet ${walletId}`;
      dispatch(
        addNewNotification({
          recipientId: userId,
          message: successMessage,
          type: 'success',
        })
      );

      window.alert('Transfer successful'); // Display success message
      window.location.reload()
    } catch (error) {
      console.error('Error transferring funds:', error);
      window.alert('Transfer failed'); // Display error message
    } finally {
      // Clear the form and reset state
      setRecipientId('');
      setAmount('');
      setIsSubmitting(false);
    }
  };


  return (
    <div className="ml-5 mb-5 mt-8">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="recipientId">
            Recipient ID
          </label>
          <input
            type="text"
            id="recipientId"
            name="recipientId"
            className="border rounded-md py-2 px-3 w-full"
            placeholder="Enter recipient ID"
            value={recipientId}
            onChange={(e) => setRecipientId(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            className="border rounded-md py-2 px-3 w-full"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className={`bg-blue-500 text-white px-4 py-2 rounded-md ${
              isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:bg-blue-600'
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Transferring...' : 'Transfer'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TransferFunds;
