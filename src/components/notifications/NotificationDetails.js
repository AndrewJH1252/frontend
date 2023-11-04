import React from 'react';
import { FaTimesCircle } from 'react-icons/fa';

const NotificationDetails = ({ notification, onClose }) => {
  const formattedTimestamp = new Date(notification.timestamp).toLocaleString();

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-gray-900">
    <div className="bg-white rounded-lg w-full max-w-2xl shadow-lg">
      <div className="flex justify-between items-center p-4">
        <h2 className="text-xl font-semibold">Notification Details</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 focus:outline-none mb-3">
          <FaTimesCircle className='text-red-500 text-xl' />
        </button>
      </div>
      <div className="p-4">
        <p className="font-semibold mb-2">{notification.message}</p>
        <p className="text-xs text-gray-500 mb-4">{formattedTimestamp}</p>
        <p className="text-sm">{notification.details}</p>
        {/* Add more details or content here */}
      </div>
    </div>
  </div>
  );
};

export default NotificationDetails;
