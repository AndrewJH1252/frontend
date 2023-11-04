import React, { useState, useEffect, useRef } from 'react';
import { FaUser,  FaUserEdit, FaRegAddressCard, FaRegEnvelope, FaRegCreditCard, FaSignOutAlt, FaElementor, FaForumbee } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {  FiRefreshCw, FiSearch, FiSettings } from 'react-icons/fi';
import { fetchUserData } from '../../redux/Thunks/authThunk';

const UserMenu = () => {
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const token = useSelector(state => state.auth.token);
  const userProfile = useSelector(state => state.auth.profile || []); // User profile data from userReducer
  const defaultProfilePicture = <FaUser className="text-gray-600" />;

  // Logged-in user dropdown menu options
  const dropdownOptions = [
    { title: 'Dashboard', icon: <FaElementor className="inline-block text-xl mr-3" />, path: '/student' },
    { title: 'Tutor', icon: <FiRefreshCw className="inline-block text-xl mr-3" />, path: '/switch' },
    { title: 'Edit Profile', icon: <FaUserEdit className="inline-block text-xl mr-3" />, path: '/profile/edit' },
    { title: 'Find Tutor', icon: <FiSearch className="inline-block text-xl mr-3" />, path: '/tutor-page' },
    { title: 'My Courses', icon: <FaRegAddressCard className="inline-block text-xl mr-3" />, path: '/student/courses' },
    { title: 'Requests', icon: <FaRegEnvelope className="inline-block text-xl mr-3" />, path: '/requests-page' },
    { title: 'Payment History', icon: <FaRegCreditCard className="inline-block text-xl mr-3" />, path: '/student/payment/history' },
    { title: 'Forum', icon: <FaForumbee className="inline-block text-xl mr-3" />, path: '/forum' },
    { title: 'Settings', icon: <FiSettings className="inline-block text-xl mr-3" />, path: '/Settings' },
    { title: 'Log Out', icon: <FaSignOutAlt className="inline-block text-xl mr-3 text-red-500" />, path: '/logout' },
  ];
  

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false); // Close the dropdown when clicking outside
    }
  };

  const handleUserIconClick = () => {
    setShowDropdown((prevState) => !prevState); // Toggle the dropdown visibility
  };

  useEffect(() => {
    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    dispatch(fetchUserData(token));
  }, [dispatch, token]);
  
  
  return (
    <div className="flex items-center relative">
      <button className="text-gray-600 focus:outline-none" onClick={handleUserIconClick}>
        {userProfile && userProfile.profilePicture ? (
          <img
            src={userProfile.profilePicture}
            alt="profile-icon"
            className="w-10 h-10 rounded-full cursor-pointer hover:opacity-80 transition-opacity"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity">
            {defaultProfilePicture}
          </div>
        )}
      </button>

      {showDropdown && (
        <ul className="absolute top-12 right-0 z-20 bg-white border border-gray-300 rounded-lg shadow-lg w-56 p-2 space-y-2">
          {!userProfile ? (
            <li className="flex items-center px-3 py-2 cursor-pointer hover:bg-gray-100 rounded-md">
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                {defaultProfilePicture}
              </div>
            </li>
          ) : (
            <li className="flex items-center px-3 py-2 cursor-pointer hover:bg-gray-100 rounded-md">
              {userProfile.profilePicture ? (
                <img
                  src={userProfile.profilePicture}
                  alt="profile-icon"
                  className="w-10 h-10 rounded-full mr-2"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                  {defaultProfilePicture}
                </div>
              )}
              <div>
                <p className="font-semibold ml-3 text-gray-800">
                  {`${userProfile.firstName} ${userProfile.lastName}`}
                </p>
                <p className="text-sm text-gray-600 text-center">{userProfile.role}</p>
              </div>
            </li>
          )}
          <hr className="my-2 border-gray-400" />
          {dropdownOptions.map(option => (
            <li key={option.title} className="px-3 py-2 cursor-pointer hover:bg-gray-100 rounded-md">
              <Link to={option.path} className="flex items-center text-gray-600 user-menu-option">
                {option.icon}
                {option.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserMenu;