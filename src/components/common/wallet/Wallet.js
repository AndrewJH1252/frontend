import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchWalletById,
  addFundsToWallet,
  withdrawFundsFromWallet,
  createWallet,
} from '../../../redux/Thunks/walletThunk';
import TransferFunds from './TransferFunds';
import WithdrawFundsModal from './WithdrawFunds';
import AddFundsModal from './AddFund';
import WalletCreationForm from './WalletCreationForm';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { IoCopy } from 'react-icons/io5';


const Wallet = () => {
  const dispatch = useDispatch();
  const [copied, setCopied] = useState(false);


  const userId = useSelector((state) => state.auth.profile._id);
  const walletId = useSelector((state) => state.auth.profile.walletId);
  const wallet = useSelector((state) => state.wallet.wallet);
  const [isCreatingWallet, setIsCreatingWallet] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [isAddFundsModalOpen, setIsAddFundsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('balance');

  useEffect(() => {
    // Fetch wallet details when the component mounts
    if (userId && !walletId) {
      dispatch(createWallet());
    } else if (walletId) {
      dispatch(fetchWalletById(walletId));
    }
  }, [dispatch, userId, walletId]);

  const handleWithdrawFunds = async (amount) => {
    try {
      // Dispatch the withdrawFundsFromWallet thunk with the amount parameter
      const resultAction = await dispatch(withdrawFundsFromWallet({ amount }));
  
      if (withdrawFundsFromWallet.fulfilled.match(resultAction)) {
        // Withdrawal succeeded, you can update the wallet balance or perform other actions
        console.log('Withdrawal succeeded');
        // Close the withdrawal modal or perform other UI actions
        setIsWithdrawModalOpen(false);
      } else {
        // Withdrawal failed, handle the error
        console.error('Withdrawal failed:', resultAction.payload);
      }
    } catch (error) {
      console.error('Error withdrawing funds:', error);
    }
  };
  

  const handleAddFunds = async (paymentMethod, amount) => {
    try {
      // Dispatch the addFundsToWallet thunk with paymentMethodId and amount
      const resultAction = await dispatch(addFundsToWallet({ paymentMethodId: paymentMethod.id, amount }));

      if (addFundsToWallet.fulfilled.match(resultAction)) {
        // Payment succeeded, you can update the wallet balance or perform other actions
        console.log('Payment succeeded');
        // Close the Add Funds modal or perform other UI actions
        setIsAddFundsModalOpen(false);
      } else {
        // Payment failed, handle the error
        console.error('Payment failed:', resultAction.payload);
      }
    } catch (error) {
      console.error('Error adding funds:', error);
    }
  };

  const openWalletCreationForm = () => {
    setIsCreatingWallet(true);
  };

  const closeWalletCreationForm = () => {
    setIsCreatingWallet(false);
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const backgroundImage = 'https://img.freepik.com/free-photo/online-money-transfer-with-3d-phones-coins_107791-16581.jpg?w=1380&t=st=1695802624~exp=1695803224~hmac=7d04f5c0821efef8896fb3fdb0a778ba6c7a60eca4258cbbab846ffc1add1da6'; 


  return (
    <div
    className="min-h-screen bg-gradient-to-b from-indigo-900 to-blue-800 py-10"
    style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    }}
  >
    <div className="bg-blue-50 max-w-7xl mx-auto mt-10 px-4 sm:px-6 lg:px-8 border rounded-lg p-4 shadow-xl">
      <div className="p-5 mb-8">
        <h1 className="text-3xl font-semibold text-indigo-800">My Wallet</h1>
        {wallet ? (
          <div className="mt-6">
            <div className="bg-white rounded-lg shadow-md p-6 w-85 transform transition-transform hover:scale-105 cursor-pointer">
              <div className="flex flex-col space-y-4">
                <div className="flex items-center">
                  <span className="text-gray-900 font-semibold">Wallet Name:</span>
                  <h2 className="text-lg font-semibold text-gray-900 ml-2">{wallet.walletName}</h2>
                </div>
                {wallet.description && (
                  <div className="flex items-center">
                    <span className="text-gray-600 font-semibold">Description:</span>
                    <p className="text-gray-900 text-sm ml-2">{wallet.description}</p>
                  </div>
                )}
                <div className="flex items-center">
                  <span className="text-gray-900 font-semibold">Current Balance:</span>
                  <p className="text-green-600 font-semibold ml-2">
                    {wallet.currency}
                    <span className="text-lg ml-2">{wallet.balance}</span>
                  </p>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-900 font-semibold mr-2">Wallet ID:</span>
                  <span className="text-lg text-gray-900 truncate">{walletId}</span>
                  <CopyToClipboard text={walletId} onCopy={handleCopy}>
                    <button className="bg-transparent text-gray-600 hover:text-blue-500 py-1 px-3 rounded-md ml-2">
                      <IoCopy />
                    </button>
                  </CopyToClipboard>
                </div>
              </div>
            </div>
  
            <div className="mt-8 space-x-2 sm:space-x-4 md:space-x-5 lg:space-x-8">
              <button
                onClick={() => setActiveTab('withdraw')}
                className={`${
                  activeTab === 'withdraw'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-600 hover:bg-blue-200'
                } px-2 sm:px-3 py-2 rounded-md mr-2 sm:mr-3 transition-colors duration-300 ease-in-out`}
              >
                Withdraw Funds
              </button>
              <button
                onClick={() => setActiveTab('add')}
                className={`${
                  activeTab === 'add'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-600 hover:bg-green-200'
                } px-2 sm:px-3 py-2 rounded-md mr-2 sm:mr-3 transition-colors duration-300 ease-in-out`}
              >
                Add Funds
              </button>
              <button
                onClick={() => setActiveTab('transfer')}
                className={`${
                  activeTab === 'transfer'
                    ? 'bg-indigo-500 text-white'
                    : 'bg-gray-200 text-gray-600 hover:bg-indigo-200'
                } px-2 sm:px-3 py-2 rounded-md transition-colors duration-300 ease-in-out`}
              >
                Transfer Funds
              </button>
            </div>

          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-screen">
            <p className="text-center text-gray-800">
              To access the exciting features of our wallet services, you need to create a wallet.
              <br />
              Don't miss out on the benefits – create your wallet today!
            </p>
            <button
              onClick={openWalletCreationForm}
              className="bg-indigo-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300"
            >
              Create Wallet
            </button>
          </div>
        )}
      </div>
  
      {/* Add the modal and form components here based on the activeTab */}
      {activeTab === 'withdraw' && (
        <WithdrawFundsModal
          isOpen={isWithdrawModalOpen}
          onClose={() => setIsWithdrawModalOpen(false)}
          onWithdraw={handleWithdrawFunds}
        />
      )}
      {activeTab === 'add' && (
        <AddFundsModal
          isOpen={isAddFundsModalOpen}
          onClose={() => setIsAddFundsModalOpen(false)}
          onAddFunds={handleAddFunds}
        />
      )}
      {activeTab === 'transfer' && (
        <TransferFunds walletId={walletId} />
      )}
      {isCreatingWallet && (
        <WalletCreationForm
          onCreate={createWallet}
          isOpen={isCreatingWallet}
          onClose={closeWalletCreationForm}
        />
      )}
    </div>
  </div>
  
  );
};

export default Wallet;
