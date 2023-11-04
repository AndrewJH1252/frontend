import React from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import { FaHome, FaUserEdit, FaBook, FaBell, FaUsers,  FaMoneyBillAlt, FaUserGraduate, FaForumbee } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ student, isSidebarOpen, toggleSidebar }) => {
  const { firstName, lastName, email, profilePicture } = student;

  const sidebarClasses = `w-64 bg-gray-800 px-4 py-8 text-white ${
    isSidebarOpen ? 'block' : 'hidden'
  } transition-all duration-300 ease-in-out`;

  return (
    <>
      <div className={sidebarClasses}>
        <div className="flex items-center justify-between mb-8">
          <img src={profilePicture} alt="Profile" className="w-16 h-16 rounded-full" />
          <button
            onClick={toggleSidebar}
            className="p-2 bg-gray-700 rounded-full focus:outline-none"
          >
            <FiChevronLeft className="w-6 h-6 text-gray-300" />
          </button>
        </div>
        <h3 className="text-xl font-semibold mb-2">
          {firstName} {lastName}
        </h3>
        <p className="text-gray-400 mb-8">{email}</p>
        <ul>
          <li>
            <NavLink
              exact
              to="/"
              activeClassName="bg-gray-600"
              className="flex items-center py-2 px-4 rounded-md hover:bg-gray-600"
            >
              <FaHome className="mr-2" />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/tutor"
              activeClassName="bg-gray-600"
              className="flex items-center py-2 px-4 rounded-md hover:bg-gray-600"
            >
              <FaUserGraduate className="mr-2" />
              Tutor
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile/edit"
              activeClassName="bg-gray-600"
              className="flex items-center py-2 px-4 rounded-md hover:bg-gray-600"
            >
              <FaUserEdit className="mr-2" />
              Edit Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/student/courses"
              activeClassName="bg-gray-600"
              className="flex items-center py-2 px-4 rounded-md hover:bg-gray-600"
            >
              <FaBook className="mr-2" />
              My Courses
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/notifications/settings"
              activeClassName="bg-gray-600"
              className="flex items-center py-2 px-4 rounded-md hover:bg-gray-600"
            >
              <FaBell className="mr-2" />
              Notifications Settings
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/student/requests"
              activeClassName="bg-gray-600"
              className="flex items-center py-2 px-4 rounded-md hover:bg-gray-600"
            >
              <FaUsers className="mr-2" />
              Requests Management
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/student/payment/history"
              activeClassName="bg-gray-600"
              className="flex items-center py-2 px-4 rounded-md hover:bg-gray-600"
            >
              <FaMoneyBillAlt className="mr-2" />
              Payment History
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/forum"
              activeClassName="bg-gray-600"
              className="flex items-center py-2 px-4 rounded-md hover:bg-gray-600"
            >
              <FaForumbee className="mr-2" />
              Forum
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
