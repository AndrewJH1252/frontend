import React from 'react';
import { Link } from 'react-router-dom';
import { BiPencil, BiStar } from 'react-icons/bi';
import { FiLayers, FiUsers } from 'react-icons/fi';
import { useSelector } from 'react-redux';

const CourseCard = ({ course }) => {
  const { profile } = useSelector((state) => state.auth);
  const tutor = useSelector((state) => state.auth.userRole === 'tutor');
  const guest = useSelector((state) => state.auth.isAuthenticated === false);
  const isTutor = tutor && profile._id === course.tutor;
  const isStudent = useSelector((state) => state.auth.userRole === 'student');

  const levelColorMap = {
    Beginner: 'text-green-500',
    Intermediate: 'text-orange-500',
    Advanced: 'text-red-700',
  };

  const levelColor = levelColorMap[course.level] || 'text-gray-500';

  const calculateAverageRating = () => {
    if (course.ratingCount === 0) {
      return 'N/A';
    }

    const averageRating = course.ratingSum / course.ratingCount;
    const limitedAverageRating = Math.min(averageRating, 5); // Limit to a maximum of 5

    return limitedAverageRating.toFixed(1);
  };

  const renderStars = () => {
    const averageRating = calculateAverageRating();
    const stars = [];
    const roundedRating = Math.floor(averageRating); // Whole number part of the rating
    const decimalPart = averageRating - roundedRating; // Decimal part of the rating

    for (let i = 1; i <= 5; i++) {
      if (i <= roundedRating) {
        stars.push(<BiStar key={i} className="text-yellow-500" />);
      } else if (i === roundedRating + 1) {
        const starStyle = {
          width: `${decimalPart * 100}%`, // Set the width based on the decimal part
        };
        stars.push(
          <div key={i} className="relative">
            <BiStar className="text-gray-400" />
            <div className="absolute top-0 left-0 overflow-hidden" style={starStyle}>
              <BiStar className="text-yellow-500" />
            </div>
          </div>
        );
      } else {
        stars.push(<BiStar key={i} className="text-gray-400" />);
      }
    }

    return stars;
  };

  // Conditionally render the Link only for students and guests
  const courseLink = (guest || isStudent) ? (
    <Link to={`/courses/${course._id}`} className="block relative">
      <div
        className="w-full h-36"
        style={{
          backgroundImage: `url(${course.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>
    </Link>
  ) : (
    <div className="block relative">
      <div
        className="w-full h-36"
        style={{
          backgroundImage: `url(${course.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>
    </div>
  );

  const courseTitle = (guest || isStudent) ? (
    <Link
      to={`/courses/${course._id}`}
      className="text-sm font-semibold text-blue-600 overflow-hidden"
      style={{
        display: '-webkit-box',
        WebkitLineClamp: 1,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxHeight: '1.5rem', // Adjust the height as needed
      }}
    >
      {course.title}
    </Link>
  ) : (
    <span className="text-sm font-semibold text-blue-600 overflow-hidden">
      {course.title}
    </span>
  );

  return (
    <div className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105">
      {courseLink}
      <div className="p-4">
        {courseTitle}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center mr-2">
            <FiLayers className={`${levelColor} mr-1 text-md`} />
            <span className={`mt-1 text-xs font-semibold ${levelColor}`}>{course.level}</span>
          </div>
          <div className="flex items-center ">
            <FiUsers className="text-gray-600 mr-1 text-md" />
            <span className="text-xs text-gray-600">{course.enrollmentCount}</span>
          </div>
        </div>
        <div className="flex items-center mt-2">
          <div className="flex items-center">
            {renderStars()}
            <span className="text-sm text-gray-600 ml-1">({calculateAverageRating()})</span>
          </div>
        </div>
        <div className="mt-2">
          <span className="text-gray-600 text-xs">Price:</span>
          <span className="font-semibold text-green-700 ml-1 text-xs">
            {course.currency} {course.price.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-end mt-2">
          {isTutor && (
            // Render the "Edit" button if the authenticated user is the tutor
            <Link
              to={`/course-creation?edit=${course._id}`} // Pass the course ID as a query parameter
              className="flex items-center text-blue-500 hover:text-white px-3 py-1 rounded-lg  border border-blue-400 hover:bg-blue-500 transition duration-300 ease-in-out"
            >
              <BiPencil className="text-lg mr-2 text-blue-500 hover:text-blue-600" />
              Edit
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
