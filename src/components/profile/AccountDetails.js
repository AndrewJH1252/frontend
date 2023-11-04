import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { verifyPassword } from '../../redux/Thunks/userThunk';
import { updateAccountDetails } from '../../redux/Thunks/authThunk';
import { addNewNotification } from '../../redux/Thunks/notificationsThunk';
import { useNavigate } from 'react-router-dom';

const AccountDetails = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.profile);
  const passwordStatus = useSelector((state) => state.user.verifyPasswordStatus);
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verifyPasswordError, setVerifyPasswordError] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [error, setError] = useState('');

  const handleVerifyOldPassword = async () => {
    try {
      if (!oldPassword) {
        setError('Old password is required. Please enter the old password before updating.');
        return;
      }

      // Verify the old password here using your verifyPassword Thunk or API call
      const response = await dispatch(verifyPassword(oldPassword));

      // If response is falsy (incorrect password), set an error
      if (!response) {
        setError('Incorrect old password. Please try again.');
      } else {
        setError(''); // Clear the error if the old password is correct
      }
    } catch (error) {
      console.error('Error verifying old password:', error);
      setError('An error occurred while verifying the old password.');
    }
  };

  const handleSaveAccountDetails = async () => {
    try {
      const updatedAccountDetails = {};

      // Email validation
      if (newEmail) {
        // Check if the provided email is valid
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        if (!emailRegex.test(newEmail)) {
          setError('Invalid email format');
          return; // Stop the function if email is invalid
        } else {
          // Email is valid, update the account details
          updatedAccountDetails.email = newEmail;
        }
      }

      if (passwordStatus === 'succeeded') {
        // Password validation
        if (newPassword) {
          // Check if the password meets your requirements, e.g., minimum length
          if (newPassword.length < 8) {
            setError('Password must be at least 8 characters long');
            return; // Stop the function if the password is too short
          }

          // Check if newPassword and confirmPassword match
          if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return; // Stop the function if passwords do not match
          }

          updatedAccountDetails.password = newPassword;
        }

        // The old password verification was successful, proceed with saving the account details
        await dispatch(updateAccountDetails(updatedAccountDetails));

        dispatch(
          addNewNotification({
            recipientId: user._id,
            message: 'Account details updated successfully.',
            type: 'success',
          })
        );

        setConfirmationMessage('Account details updated successfully');
        setError('');

        // Use history.push to navigate to the "Main" route after a successful update
        navigate(0);
      } else {
        // Display a message based on the passwordStatus
        setError('Old password verification failed. Please try again.');
      }
    } catch (error) {
      console.error('Error updating account details:', error);

      dispatch(
        addNewNotification({
          recipientId: user._id,
          message: 'An error occurred while updating account details.',
          type: 'error',
        })
      );

      setError('An error occurred while updating account details.');
    }
  };

  const handleClearChanges = () => {
    setOldPassword('');
    setNewEmail('');
    setNewPassword('');
    setConfirmPassword('');
    setVerifyPasswordError(false);
    setConfirmationMessage('');
    setError('');
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    if (name === 'newPassword') {
      // Check if the user cleared the newPassword field
      if (!value) {
        setNewPassword(''); // Clear the newPassword state
      } else {
        setNewPassword(value);
      }
      setVerifyPasswordError(newPassword !== confirmPassword);
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
      setVerifyPasswordError(newPassword !== value);
    }
  };

  return (
    <div className="bg-gray-100 p-4 sm:p-6 md:p-8 lg:p-10">
      <div className="max-w-3xl mx-auto">
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold" htmlFor="currentEmail">
            Current Email
          </label>
          <p className="text-gray-700 border border-gray-400 p-2 w-full rounded-lg">{user.email}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold" htmlFor="oldPassword">
            Old Password
          </label>
          <input
            type="password"
            id="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            onBlur={handleVerifyOldPassword}
            className="text-gray-700 border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold" htmlFor="newEmail">
            New Email
          </label>
          <input
            type="email"
            id="newEmail"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="text-gray-700 border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        {verifyPasswordError && (
          <p className="text-red-500 text-sm mb-4">Passwords do not match. Please try again.</p>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold" htmlFor="newPassword">
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={handlePasswordChange}
            className="text-gray-700 border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500"
            disabled={passwordStatus !== 'succeeded'} // Disable if old password verification is not successful
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={handlePasswordChange}
            className="text-gray-700 border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500"
            disabled={passwordStatus !== 'succeeded'} // Disable if old password verification is not successful
          />
        </div>
        {confirmationMessage && (
          <p className="text-green-500 text-sm mb-4">{confirmationMessage}</p>
        )}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <div className="flex justify-center mt-6">
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-600 transition duration-300 text-white font-semibold px-4 py-2 rounded-lg mr-4"
            onClick={handleSaveAccountDetails}
            disabled={
              !oldPassword ||
              (!newEmail &&
                (!newPassword || newPassword !== confirmPassword || verifyPasswordError))
            }
          >
            Save
          </button>
          <button
            type="button"
            className="bg-gray-400 hover:bg-gray-600 transition duration-300 text-white font-semibold px-4 py-2 rounded-lg"
            onClick={handleClearChanges}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
