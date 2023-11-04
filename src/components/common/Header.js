import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineShoppingCart, AiOutlineBell } from 'react-icons/ai';
import Logo from '../../images/logo.png';
import CategoryMenu from './CategoryMenu';
import SearchBar from './SearchBar';
import UserMenu from './UserMenu';
import { BiWallet } from 'react-icons/bi';
import {
  fetchNotifications,
} from '../../redux/Thunks/notificationsThunk';
import { useDispatch, useSelector } from 'react-redux';

const Header = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(state => state.notifications); // Correct slice name
  const token = useSelector(state => state.auth.token);
  const unreadNotificationCount = notifications.filter(notification => !notification.read).length;

  useEffect(() => {
    dispatch(fetchNotifications(token));
  }, [dispatch]);
  

  return (
    <header className="bg-gray-800 py-6 px-8 flex flex-col lg:flex-row items-center justify-between">
      {/* Logo and Category Menu */}
      <div className="flex items-center space-x-4 lg:space-x-6 mb-4 lg:mb-0">
      <a href="/Main" className="flex items-center hover:opacity-80 transition-opacity">
    <img src={Logo} alt="My Logo" className="w-30 h-12 mr-8 mb-3" />
 
  </a>
        <CategoryMenu />
      </div>

      {/* Search Bar */}
      <div className="flex items-center mb-4 lg:mb-0">
        <SearchBar />
      </div>

      {/* Icons and User Menu */}
      <div className="flex items-center space-x-12">
        <div className="flex items-center">
          <Link to="/wallet">
            <BiWallet className="text-gray-300 text-2xl" />
          </Link>
        </div>

        {/* Shopping Cart Icon */}
        <div className="flex items-center">
          <Link to="/Cart">
            <AiOutlineShoppingCart className="text-gray-300 text-2xl" />
          </Link>
        </div>

        {/* Bell Icon */}
        <div className="relative">
          <Link to="/Notifications" className="flex items-center">
            <AiOutlineBell className="text-gray-300 text-2xl" />
            {/* Display unread notifications count */}
            {unreadNotificationCount > 0 && (
              <span className="absolute top-0 right-0 -mt-2 -mr-2 inline-flex items-center justify-center w-6 h-6 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full animate-pulse">
                {unreadNotificationCount}
              </span>
            )}
          </Link>
        </div>

        {/* User Menu */}
        <div className="flex items-center">
          <UserMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
