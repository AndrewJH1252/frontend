import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { IoCloseCircleSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const WalletCreationForm = ({ onCreate, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [walletData, setWalletData] = useState({
    name: '',
    description: '',
    currency: 'USD', // Default currency
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWalletData({ ...walletData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Dispatch the createWallet Thunk with the wallet data
      await dispatch(onCreate(walletData));
      // Wallet creation was successful
      setSuccessMessage('Wallet created successfully.');
      // Clear the form inputs
      setWalletData({ name: '', description: '', currency: 'USD' });
      onClose();
      history('/Main');
    
    } catch (error) {
      console.error('Wallet creation error:', error);
      setError('Failed to create the wallet. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="bg-white rounded-lg p-6 w-96">
        <div className="flex justify-end">
          <button onClick={onClose} className="cursor-pointer">
            <IoCloseCircleSharp className="text-xl text-red-500 hover:text-red-700" />
          </button>
        </div>
        <h2 className="text-2xl font-semibold mb-4">Create Wallet</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        {successMessage && <p className="text-green-500 mb-2">{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          {/* Wallet Name */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Wallet Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={walletData.name}
              onChange={handleInputChange}
              className="border rounded-md py-2 px-3 w-full"
              placeholder="Enter wallet name"
              required
            />
          </div>
          {/* Currency */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="currency">
              Currency
            </label>
            <select
              id="currency"
              name="currency"
              value={walletData.currency}
              onChange={handleInputChange}
              className="border rounded-md py-2 px-3 w-full"
              required
            >
              <option value="usd">USD</option>
              <option value="eur">EUR</option>
              {/* Add more currency options as needed */}
            </select>
          </div>
          {/* Description */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Description (Optional)
            </label>
            <textarea
              id="description"
              name="description"
              value={walletData.description}
              onChange={handleInputChange}
              className="border rounded-md py-2 px-3 w-full"
              placeholder="Enter wallet description (optional)"
            />
          </div>
          <div className="flex items-center justify-between mt-4">
            <div></div>
            <button
              type="submit"
              className={`bg-blue-500 text-white px-4 py-2 rounded-lg ${
                isLoading ? 'opacity-75 cursor-not-allowed' : 'hover:bg-blue-600'
              }`}
              disabled={isLoading}
            >
              {isLoading ? 'Creating...' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WalletCreationForm;
