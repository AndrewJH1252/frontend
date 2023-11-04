import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import NotificationsComponent from './components/NotificationsComponent';
import EmailPreferencesComponent from './components/PreferencesComponent';
import LanguagePreferencesComponent from './components/LanguageComponent';
import DeleteAccount from './components/DeleteAccount';
import PaymentDetails from './components/PaymentDetails';

import {
  getUserSettings,
  updateNotificationPreferences,
  updateEmailPreferences,
  updateLanguagePreferences,
  deleteUserAccount,
  managePaymentMethods,
  updateBillingAddress,
} from '../../redux/Thunks/settingsThunk';

const Settings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userSettings = useSelector((state) => state.settings.settings || {});
  const loading = useSelector((state) => state.settings.loading);
  const error = useSelector((state) => state.settings.error);
  const [billingAddress, setBillingAddress] = useState('');

  useEffect(() => {
    dispatch(getUserSettings());
  }, [dispatch]);

  const handleUpdateNotifications = (notifications) => {
    dispatch(updateNotificationPreferences(notifications));
  };

  const handleUpdateEmailPreferences = (emailPreferences) => {
    dispatch(updateEmailPreferences(emailPreferences));
  };

  const handleUpdateLanguagePreferences = (language) => {
    dispatch(updateLanguagePreferences(language));
  };

  const handleDeleteUserAccount = () => {
    
    const confirmationMessage = "Are you sure you want to delete your account? This action cannot be undone.";
  
    if (window.confirm(confirmationMessage)) {
      dispatch(deleteUserAccount());
      navigate('/home'); // Replace '/home' with the actual URL of your home page
    }
  };

  const handleManagePaymentMethods = (paymentMethods) => {
    dispatch(managePaymentMethods(paymentMethods));
  };

  const handleUpdateBillingAddress = () => {
    dispatch(updateBillingAddress(billingAddress));
  };

  const backgroundImage = 'https://img.freepik.com/free-vector/3d-style-gears-symbols-black-design_1017-25662.jpg?w=740&t=st=1697866337~exp=1697866937~hmac=7bae7daef9f5523effd81e393890ef4cefa4013dbfbc3045f2c24f16194d78d5'; 


  return (
    <div
    className="min-h-screen bg-gradient-to-b from-indigo-900 to-blue-800 py-10"
   >
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden p-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Settings</h2>
        {loading ? (
          <div className="text-gray-600">Loading...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            {/* Notification Preferences */}
            <div className="bg-white shadow-md rounded-lg p-4">
              <NotificationsComponent
                notifications={userSettings.notifications}
                onUpdateNotifications={handleUpdateNotifications}
              />
            </div>
  
  
            {/* Delete Account */}
            <div className="bg-white shadow-md rounded-lg p-4">
              <DeleteAccount onDeleteAccount={handleDeleteUserAccount} />
            </div>
  
            {/* Payment Details (if needed) */}
            {/* <div className="bg-white shadow-md rounded-lg p-4">
              <PaymentDetailsComponent paymentDetails={userSettings.paymentDetails} onUpdatePaymentDetails={handleUpdatePaymentDetails} />
            </div> */}
          </div>
        )}
      </div>
    </div>
  </div>
  
  );
};

export default Settings;
