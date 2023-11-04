import React, { useState } from 'react';
import NotificationDetails from './NotificationDetails';
import { FiMinusCircle } from 'react-icons/fi';

const NotificationCard = ({ notification, onRemove, onRead }) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  const handleRemove = () => {
    setIsRemoved(true); // Mark the notification as removed
    onRemove(notification._id); // Call the remove function
  };

  const handleRead = () => {
    if (!notification.read) {
      onRead(notification._id);
    }
  };

  const toggleDetails = () => {
    setIsDetailsOpen(!isDetailsOpen); // Toggle the pop-up state
  };

  const notificationTypeClass = `rounded-md ${
    notification.type === 'success'
      ? 'bg-green-100 text-green-800'
      : notification.type === 'error'
      ? 'bg-red-100 text-red-800'
      : 'bg-blue-100 text-blue-800'
  }`;

  const formattedTimestamp = new Date(notification.timestamp).toLocaleString();

  return (
    <div
      className={`p-4 ${notificationTypeClass} flex items-start space-x-4 shadow-md ${
        notification.read ? 'bg-gray-300' : 'bg-white'
      } cursor-pointer`}
    >
      <div className="flex-shrink-0" onClick={handleRead}>
        {notification.type === 'success' ? (
          <div className="flex items-center justify-center w-8 h-8 bg-green-500 text-white rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        ) : notification.type === 'error' ? (
          <div className="flex items-center justify-center w-8 h-8 bg-red-500 text-white rounded-full">
            <FiMinusCircle className="text-gray-800" />
          </div>
        ) : (
          <div className="flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
        )}
      </div>

      <div className="flex-1" onClick={() => { handleRead(); toggleDetails(); }}>
        <p className="font-semibold overflow-ellipsis overflow-hidden">{notification.message}</p>
        <div className="flex justify-between items-center">
          <p className="text-xs text-gray-500">{formattedTimestamp}</p>
        </div>
      </div>

      <div className="flex-shrink-0">
        <button
          onClick={handleRemove}
          title="delete"
          className="text-gray-400 hover:text-gray-600 focus:outline-none"
        >
          <FiMinusCircle className="text-gray-800" />
        </button>
      </div>

      {isDetailsOpen && <NotificationDetails notification={notification} onClose={toggleDetails} />}
    </div>
  );
};

export default NotificationCard;
