import React from 'react';
import { useDispatch } from 'react-redux';
import { FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { logoutUser } from '../../redux/slice/authSlice';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogOut = () => {
    dispatch(logoutUser());
    navigate('/'); // Navigate to the desired route after logout
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Log Out</h1>
      <p className="text-lg text-gray-600 mb-8">Are you sure you want to log out?</p>
      <button
        className="px-4 py-2 text-lg bg-red-500 text-white rounded hover:bg-red-600 flex items-center"
        onClick={handleLogOut}
      >
        <FiLogOut className="mr-2" /> Log Out
      </button>
    </div>
  );
};

export default Logout;
