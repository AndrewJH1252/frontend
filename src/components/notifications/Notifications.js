import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearAllNotifications,
  fetchNotifications,
  removeNotificationById,
  setNotificationAsRead,
  markAllNotificationsAsRead // Add this import
} from '../../redux/Thunks/notificationsThunk';
import { setNotifications } from '../../redux/slice/notificationSlice';
import NotificationCard from './NotificationCard';
import { FaCheckCircle, FaRegBell, FaSortAmountDown, FaSortAmountUp, FaTrash } from 'react-icons/fa';
import Pagination from '../common/pagination'; 
import { FiCheckCircle, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Notifications = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(state => state.notifications); // Correct slice name
  const token = useSelector(state => state.auth.token);
  const unreadNotificationCount = notifications.filter(notification => !notification.read).length;
  const [updateTrigger, setUpdateTrigger] = useState(Date.now()); // Initialize with the current timestamp


  useEffect(() => {
    // Fetch notifications for the logged-in user using the token
    dispatch(fetchNotifications(token)).then((response) => {
      if (fetchNotifications.fulfilled.match(response)) {
        dispatch(setNotifications(response.payload)); // Update the notifications in the state
      }
    });
  }, [dispatch,  updateTrigger, token]);

  const [sortOrder, setSortOrder] = useState('newest');

  const handleSort = () => {
    setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest');
  };

  const sortedNotifications = [...notifications].sort((a, b) => {
    // Parse the date strings into Date objects
    const dateA = new Date(a.timestamp);
    const dateB = new Date(b.timestamp);
  
    if (sortOrder === 'newest') {
      return dateB - dateA; // Sort from newest to oldest
    } else {
      return dateA - dateB; // Sort from oldest to newest
    }
  });
  
  
  
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const itemsPerPage = 10; // Number of items per page

  // Calculate index of last and first item of the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Get the items for the current page
  const currentItems = sortedNotifications.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleRemoveNotification = async (notificationId) => {
    const confirmed = window.confirm("Are you sure you want to delete this notification?");
    if (confirmed) {
      // Dispatch the action to remove the notification by ID
      await dispatch(removeNotificationById(notificationId));
      setUpdateTrigger(Date.now()); // Update with a new timestamp
    }
  };
  
  const handleClearAll = async () => {
    const confirmed = window.confirm("Are you sure you want to clear all notifications?");
    if (confirmed) {
      // Dispatch the action to clear all notifications
      await dispatch(clearAllNotifications());
      setUpdateTrigger(Date.now()); // Update with a new timestamp
    }
  };
  
  const handleMarkAllRead = async () => {
    const confirmed = window.confirm("Are you sure you want to mark all notifications as read?");
    if (confirmed) {
      // Dispatch the action to mark all notifications as read
      await dispatch(markAllNotificationsAsRead());
      setUpdateTrigger(Date.now()); // Update with a new timestamp
    }
  };
  

  const handleReadNotification = (notificationId) => {
    dispatch(setNotificationAsRead(notificationId));
    setUpdateTrigger(Date.now());
  };

  return (
    <div className="bg-gradient-to-br from-gray-200 to-gray-300 min-h-screen p-4">
    <div className="mx-auto border-2 border-blue-600 rounded-md p-4 bg-gray-800 text-white">
      <h2 className="text-3xl font-extrabold mb-4">Notifications</h2>
      <div className="flex justify-between items-center mb-4">
      <span
        className={`px-3 py-1 text-white bg-gradient-to-r from-purple-400 to-indigo-600 rounded-full flex items-center hover:animate-pulse ${
          unreadNotificationCount > 0 ? 'cursor-pointer' : ''
        }`}
        onClick={unreadNotificationCount > 0 ? null : null}
      >
        {unreadNotificationCount > 0 && (
          <FaRegBell className="mr-1 animate-bounce" />
        )}
        {unreadNotificationCount}
      </span>

        <div className="flex space-x-4">
          <button
            onClick={handleMarkAllRead}
            className="text-blue-400 rounded-md hover:text-blue-600 transition duration-300 ease-in-out focus:outline-none flex items-center mr-5"
            title="Mark All Read"
          >
            <FaCheckCircle className="ml-1 text-xl" />
          </button>
          <button
            onClick={handleClearAll}
            className="text-red-400 rounded-md hover:text-red-600 transition duration-300 ease-in-out focus:outline-none flex items-center mr-5"
            title="Clear All"
          >
            <FaTrash className="mr-1" />
          </button>
          <button
            className="flex items-center text-gray-400 hover:text-gray-600"
            onClick={handleSort}
          >
            Sort by {sortOrder === 'newest' ? 'Newest' : 'Oldest'}{' '}
            {sortOrder === 'newest' ? (
              <FaSortAmountDown className="ml-1" />
            ) : (
              <FaSortAmountUp className="ml-1" />
            )}
          </button>
        </div>
      </div>
      <div className="grid gap-4">
        {currentItems.map((notification) => (
          <NotificationCard
            key={notification._id}
            notification={notification}
            onRemove={handleRemoveNotification}
            onRead={handleReadNotification}
          />
        ))}
      </div>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={sortedNotifications.length}
        currentPage={currentPage}
        paginate={paginate}
        prevIcon={<FiChevronLeft className="text-blue-400 text-xl" />}
        nextIcon={<FiChevronRight className="text-blue-400 text-xl" />}
      />
    </div>
  </div>
  );
};

export default Notifications;
