import React, { useState } from 'react';

const NotificationsComponent = ({ onUpdateNotifications }) => {
  const [notifications, setNotifications] = useState(false);

  const handleNotificationsChange = () => {
    // Update the 'notifications' state
    setNotifications(!notifications);
    onUpdateNotifications(notifications); // Pass the current state as an argument
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Notification Preferences</h3>
        <p className="text-gray-600">
          Manage your notification settings below.
        </p>
      </div>
      <div className="flex items-center space-x-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-500"
            checked={notifications}
            onChange={handleNotificationsChange}
          />
          <span className="ml-2">Receive notifications</span>
        </label>
      </div>
    </div>
  );
};

export default NotificationsComponent;
