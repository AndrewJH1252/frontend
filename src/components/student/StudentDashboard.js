import React from 'react';
import { Link } from 'react-router-dom';
import { BiNotification, BiCalendarAlt, BiHistory, BiBook, BiCart, BiSolidGraduation, BiUserPlus } from 'react-icons/bi';
import ProfileSection from './ProfileSection';

const StudentDashboard = () => {
  return (
    <div className="container mx-auto py-8">
      <ProfileSection />
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
      <Link
        to="/be-a-tutor"
        className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-center items-center space-y-4 hover:bg-purple-200 transition duration-300 ease-in-out"
      >
        <BiSolidGraduation className="text-5xl text-purple-500" />
        <span className="text-xl font-semibold text-center">Become a Tutor</span>
        <p className="text-gray-600 text-center">
          Explore opportunities to teach and share your knowledge with others.
        </p>
      </Link>

      <Link
        to="/edit-profile"
        className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-center items-center space-y-4 hover:bg-blue-200 transition duration-300 ease-in-out"
      >
        <BiUserPlus className="text-5xl text-blue-500" />
        <span className="text-xl font-semibold text-center">Edit Profile</span>
        <p className="text-gray-600 text-center">Update your profile details and keep it up to date.</p>
      </Link>

      <Link
        to="/settings"
        className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-center items-center space-y-4 hover:bg-green-200 transition duration-300 ease-in-out"
      >
        <BiNotification className="text-5xl text-green-500" />
        <span className="text-xl font-semibold text-center">Settings</span>
        <p className="text-gray-600 text-center">Customize your settings.</p>
      </Link>

      <Link
        to="/requests-page"
        className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-center items-center space-y-4 hover:bg-red-200 transition duration-300 ease-in-out"
      >
        <BiCalendarAlt className="text-5xl text-red-500" />
        <span className="text-xl font-semibold text-center">Requests</span>
        <p className="text-gray-600 text-center">Manage your meetup requests and hire.</p>
      </Link>

      <Link
        to="/payment-history"
        className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-center items-center space-y-4 hover:bg-yellow-200 transition duration-300 ease-in-out"
      >
        <BiHistory className="text-5xl text-yellow-500" />
        <span className="text-xl font-semibold text-center">Payment History</span>
        <p className="text-gray-600 text-center">View your payment history and track your transactions.</p>
      </Link>

      <Link
        to="/forum"
        className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-center items-center space-y-4 hover:bg-orange-200 transition duration-300 ease-in-out"
      >
        <BiBook className="text-5xl text-orange-500" />
        <span className="text-xl font-semibold text-center">Forum</span>
        <p className="text-gray-600 text-center">Participate in discussions and connect with the community.</p>
      </Link>

      <Link
        to="/cart"
        className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-center items-center space-y-4 hover:bg-indigo-200 transition duration-300 ease-in-out"
      >
        <BiCart className="text-5xl text-indigo-500" />
        <span className="text-xl font-semibold text-center">Cart</span>
        <p className="text-gray-600 text-center">Manage and review items in your shopping cart.</p>
      </Link>

  {/* Add more interactive cards for other features */}
    </section>


    </div>
  );
};

export default StudentDashboard;
