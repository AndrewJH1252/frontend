import React from 'react';
import { useSelector } from 'react-redux';
import { FaInfoCircle, FaCalendarAlt, FaClock, FaLocationArrow, FaHandshake, FaBuilding } from 'react-icons/fa';
import { FiMinusCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const RequestCard = ({ request, onDelete }) => {
  const user = useSelector((state) => state.auth.profile);
  const navigate = useNavigate();

  const handleViewDetails = () => {
    // Navigate to the RequestDetails page with the request ID as a parameter
    navigate(`/request/${request._id}`);
  };

  const handleDelete = () => {
    onDelete(request._id); // Call onDelete with the request._id when the button is clicked
  };

  // Check if the user is the tutor and return null to hide the component


  return (
    <div className="bg-teal-50 font-mono rounded-lg shadow-md p-3 md:p-4 mb-5">
      <div className="flex justify-between items-center">
        <h2 className="text-lg md:text-xl font-semibold mb-2">
          {request.type === 'hire' ? 'Hire' : 'Meetup'}
        </h2>
        {(user._id === request.user || user._id === request.tutor) && (
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700 focus:outline-none focus:shadow-outline rounded-full p-2 md:p-3"
            title="Delete"
          >
            <FiMinusCircle className="text-xl md:text-2xl" />
          </button>
        )}
      </div>
      <div className="grid grid-cols-1">
        <div>
          <div className="text-gray-900 text-sm mb-2">
            <FaBuilding className="inline-block mr-2 text-orange-800" />
            Agency: {request.agency}
          </div>

          <div className="text-gray-900 text-sm mb-2">
            <FaCalendarAlt className="inline-block mr-2 text-indigo-500" />
            Date: {new Date(request.dateTime).toLocaleDateString()}{' '}
            <span className="hidden md:inline ml-3">
              {new Date(request.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>

          <div className="text-gray-900 text-sm mb-2">
            <FaClock className="inline-block mr-2 text-gray-500" />
            Duration: {request.duration} hours
          </div>

          <div className="text-gray-900 text-sm mb-2">
            <FaLocationArrow className="inline-block mr-2 text-red-500" />
            Location: {request.location}
          </div>

          <div className="text-gray-900 text-sm mb-2">
            <FaHandshake className="inline-block mr-2 text-yellow-500" />
            Urgency: {request.urgency}
          </div>
        </div>
      </div>

      <div className="mt-3 flex justify-center">
        <button
          onClick={handleViewDetails}
          className="text-blue-400 font-semibold hover:text-blue-600 transition duration-300 flex items-center"
        >
          <FaInfoCircle className="text-lg text-blue-500 mr-2" /> View Details
        </button>
      </div>
    </div>
  );
};

export default RequestCard;
