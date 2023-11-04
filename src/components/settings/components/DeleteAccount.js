import React, { useState } from 'react';

const DeleteAccount = ({ onDeleteAccount }) => {
  const [confirmation, setConfirmation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setConfirmation(e.target.value);
  };

  const handleConfirmDelete = async () => {
    if (isLoading || isConfirmed) return;

    if (confirmation.toLowerCase() === 'delete account') {
      setIsLoading(true);
      setError('');

      try {
        // Perform the actual account deletion here
        await onDeleteAccount();
        setIsConfirmed(true);
      } catch (err) {
        setError('An error occurred while deleting your account. Please try again.');
      }

      setIsLoading(false);
    } else {
      setError('Please type "Delete Account" to confirm.');
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-4">
      <h3 className="text-xl font-semibold mb-2">Delete Account</h3>
      <p className="text-gray-600">
        To delete your account, please type <strong>"Delete Account"</strong> below:
      </p>

      <input
        type="text"
        className={`border ${
          error ? 'border-red-500' : 'border-gray-300'
        } rounded-md p-2 mt-2 w-full focus:outline-none focus:border-blue-500`}
        placeholder="Type 'Delete Account' to confirm"
        value={confirmation}
        onChange={handleInputChange}
        disabled={isLoading || isConfirmed}
      />

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <button
        className={`${
          isLoading || isConfirmed
            ? 'bg-red-500 cursor-not-allowed opacity-50'
            : 'bg-red-600 hover:bg-red-700'
        } text-white px-4 py-2 mt-4 rounded-md focus:outline-none`}
        onClick={handleConfirmDelete}
        disabled={isLoading || isConfirmed}
      >
        {isLoading ? 'Deleting...' : 'Delete Account'}
      </button>
    </div>
  );
};

export default DeleteAccount;
