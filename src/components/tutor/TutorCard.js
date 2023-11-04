import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import defaultTutorImage from '../../images/profile.png';

const TutorCard = ({ tutor }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 my-4 hover:shadow-lg transition-shadow">
      <Link to={`/tutors/${tutor._id}`} className="no-underline text-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="md:w-3/4 mb-4 md:mb-0">
            <h2 className="text-2xl font-semibold mb-2">
              {tutor.firstName} {tutor.lastName}
            </h2>
            <p className="text-gray-600 text-sm mb-2">
              {tutor.education} | {tutor.location}
            </p>
            <div className="flex items-center">
              {tutor.averageRating !== null ? (
                <>
                  <FaStar className={`text-${tutor.averageRating > 0 ? 'yellow' : 'gray'}-400 text-sm mr-1`} />
                  <span className="text-gray-600 text-sm">
                    {tutor.averageRating} ({tutor.ratingCount} reviews)
                  </span>
                </>
              ) : (
                <>
                  <FaStar className="text-gray-400 text-sm mr-1" />
                  <span className="text-gray-400 text-sm">No reviews yet</span>
                </>
              )}
            </div>
          
          </div>
          <div className="md:w-1/4 mb-4 md:mb-0 flex justify-center">
            <img
              src={tutor.image || defaultTutorImage}
              alt={`${tutor.firstName} ${tutor.lastName}`}
              className="w-32 h-32 md:w-24 md:h-24 rounded-full object-cover border-4 border-white shadow-lg hover:shadow-xl"
            />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TutorCard;
