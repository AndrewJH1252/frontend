import React, { useEffect, useState } from 'react';
import { FaAngleDown, FaAngleUp,  FaCheckCircle,  FaClock, FaDollarSign, FaStar, FaUsersCog } from 'react-icons/fa';
import CurriculumSection from './CurriculumSection'; // Import the CurriculumSection component
import { FiLayers } from 'react-icons/fi';
import TutorDetails from './TutorDetails';
import ReviewForm from '../review/ReviewForm';
import { FaCartPlus, FaComment } from 'react-icons/fa';
import { fetchCurriculumDataById } from '../../redux/Thunks/courseCreationThunk';
import { useDispatch, useSelector } from 'react-redux';
import { enrollInCourse, unenrollFromCourse } from '../../redux/Thunks/courseThunk'; // Import the thunks for enrollment and unenrollment
import { useNavigate } from 'react-router-dom';
import { addNewNotification } from '../../redux/Thunks/notificationsThunk';
import { useTranslation } from 'react-i18next';

const CourseDetails = ({ course, handleAddToCart }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const curriculumData = useSelector(state => state.courseCreation.curriculum.topics || []);
  const curriculumID = useSelector(state => state.course.course.curriculum );
  const userId = useSelector(state => state.auth.profile._id);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const role = useSelector(state => state.auth.userRole);
  const navigate = useNavigate();
  

  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

  const toggleDescription = () => {
    setIsDescriptionOpen(!isDescriptionOpen);
  };

  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);

  // Function to open the review form
  const handleOpenReviewForm = () => {
    setIsReviewFormOpen(true);
  };

  // Function to close the review form
  const handleCloseReviewForm = () => {
    setIsReviewFormOpen(false);
  };
  
  const isCourseFree = !course.isPaid;
  //const isUserTutor = course.tutor === userId;
  const isUserTutor = role  === 'tutor';
  const isUserEnrolled = course.enrolledStudents.includes(userId);

  const handleEnroll = async () => {
    if (!isUserEnrolled || isCourseFree) {
      try {
        const response = await dispatch(enrollInCourse({ courseId: course._id }));
        if (response) {
          // Show a success alert
          alert('Enrollment successful!');

          dispatch(
            addNewNotification({
              recipientId: userId,
              message: `Enrollment in "${course.title}" successful!`,
              type: 'success',
            })
          );
          // Refresh the page to reflect the updated course status
          window.location.reload();
        } else {
          // Show an error alert
          alert('Enrollment failed. Please try again.');
        }
      } catch (error) {
        // Handle any errors here
        console.error('Error enrolling:', error);
        alert('An error occurred. Please try again later.');
      }
    }
  };
  
  const handleUnenroll = async () => {
    if (isUserEnrolled) {
      try {
        const response = await dispatch(unenrollFromCourse({ courseId: course._id }));
        if (response) {
          // Show a success alert
          alert('Unenrollment successful!');
          // Refresh the page to reflect the updated course status
          dispatch(
            addNewNotification({
              recipientId: userId,
              message: `Unerollment in "${course.title}" successful!`,
              type: 'success',
            })
          );

          window.location.reload();
        } else {
          // Show an error alert
          alert('Unenrollment failed. Please try again.');
        }
      } catch (error) {
        // Handle any errors here
        console.error('Error unenrolling:', error);
        alert('An error occurred. Please try again later.');
      }
    }
  };
  
  const renderStarRating = () => {
    const rating = course.ratingCount > 0 ? course.ratingSum / course.ratingCount : 0;
    const maxRating = 5.0;
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const starColor = i <= rating ? "#FFD700" : "#C4C4C4";
      stars.push(<FaStar key={i} className={`inline-block text-xl mr-1`} style={{ color: starColor }} />);
    }
    return (
      <>
        {stars}
        <span className="items-center ml-2 text-gray-600 font-semibold">
          ({rating.toFixed(1)} / {maxRating})
        </span>
      </>
    );
  };

  const levelColorMap = {
    Beginner: 'text-green-500',
    Intermediate: 'text-orange-500',
    Advanced: 'text-red-700',
  };

  const levelColor = levelColorMap[course.level] || 'text-gray-500';
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Start loading

      if (curriculumID) {
        await dispatch(fetchCurriculumDataById(curriculumID));
      }

      setIsLoading(false); // Finish loading
    };

    fetchData(); // Fetch data when the component mounts
  }, [dispatch, curriculumID]);
 


  return (
    <div className="bg-gray-100 mx-auto p-4 sm:p-6 md:p-8 lg:p-10">
      <div className="mb-4 text-gray-600">
        <span className="text-gray-500 mr-2">{t('Created At:')}</span>
        <span>{new Date(course.createdAt).toLocaleDateString()}</span>
      </div>
      <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">{course.title}</h2>

      {/* Receipt card */}
      <div className=" bg-gradient-to-r from-gray-200 to-gray-300 mx-auto p-4 rounded-lg shadow-lg max-w-lg text-white text-center md:flex md:flex-col md:items-start md:justify-between md:mb-4">

  <div className="ml-8 mb-5 flex items-center justify-between space-x-5">
    <p className="flex text-lg text-gray-700 font-semibold text-center">
      Explore This Exciting Course
    </p>
    <div className="md:flex-shrink ml-5">
    {!isUserTutor && isAuthenticated &&(
        <div className="flex items-center justify-between mb-6 mt-8">
          {isCourseFree ? (
            isUserEnrolled ? (
              <button
                onClick={handleUnenroll}
                className="flex items-center bg-red-500 text-white px-4 py-3 rounded-full shadow-lg hover:bg-red-600 focus:outline-none transform hover:scale-105 transition duration-300"
              >
                <FaUsersCog className="mr-3 text-xl" />
                Unenroll
              </button>
            ) : (
              <button
              onClick={handleEnroll}
              className="flex items-center bg-green-500 text-white px-4 py-3 rounded-full shadow-lg hover:bg-green-600 focus:outline-none transform hover:scale-105 transition duration-300 font-semibold"
            >
              <FaUsersCog className="mr-3 text-xl" />
              Enroll
            </button>

            )
          ) : (
            <button
              onClick={handleAddToCart}
              className="flex items-center bg-yellow-500 text-white px-4 py-3 rounded-full shadow-lg hover:bg-yellow-600 focus:outline-none transform hover:scale-105 transition duration-300"
            >
              <FaCartPlus className="mr-3 text-xl" />
              Add to Cart
            </button>
          )}
        </div>
      )}
    </div>
  </div>

  <div className="flex flex-col items-center md:flex-row md:justify-between">
    <div className="flex mb-4 md:mb-0 md:flex-grow md:mr-4  space-x-5">
      <div className="flex items-center mb-2">
        <span className="text-gray-300 mr-2">
          <FaDollarSign className="text-lg text-green-900" />
        </span>
        <span className="text-lg text-green-900">{course.price.toFixed(2)}</span>
      </div>

      <div className="flex items-center mb-2">
        <span className="text-gray-300 mr-2">
          <FaClock className="text-lg text-blue-900" />
        </span>
        <span className="text-lg text-blue-900">{course.duration} hours</span>
      </div>

      <div className="flex items-center mb-2">
        <FiLayers className={`${levelColor} text-lg mr-2`} />
        <span className={`text-lg ${levelColor}`}>{course.level}</span>
      </div>

      <div className="flex items-center mb-2">
        <span className="text-gray-300 mr-2">
          <FaUsersCog className="text-lg text-purple-900" />
        </span>
        <span className="text-lg text-purple-900">{course.enrollmentCount} enrolled</span>
      </div>
    </div>

   
  </div>
</div>


      {/* Course description */}
      <div className="mt-6 text-gray-800">
        <p className="mb-4 text-xl font-semibold">Course Description:</p>
        <div className="mb-4">
          <span
            dangerouslySetInnerHTML={{ __html: isDescriptionOpen ? course.description : course.description }}
          />
        </div>
        {course.description.split('\n').length > 3 && (
          <button
            className="text-blue-500 hover:underline focus:outline-none block mt-4 mx-auto"
            onClick={toggleDescription}
          >
            {isDescriptionOpen ? 'Read less' : 'Read more'}{' '}
            {isDescriptionOpen ? <FaAngleUp /> : <FaAngleDown />}
          </button>
        )}
      </div>

      <div className="flex items-center justify-between mb-6 mt-8">
  
      <div>
        <span className="font-semibold ">Includes:</span>
        {Array.isArray(course.includes) ? (
          <ul className='ml-5 mt-3'>
            {course.includes.map((include, index) => (
              <li className='flex items-center' key={index}>
                <FaCheckCircle className="mr-2 text-green-400" /> {include}
              </li>
            ))}
          </ul>
        ) : (
          <ul className='ml-5'>
            {course.includes.split(',').map((include, index) => (
              <li className='flex items-center' key={index}>
                <FaCheckCircle className="mr-2 text-green-400" /> {include.trim()}
              </li>
            ))}
          </ul>
        )}
      </div>


        {/* Write a Review Button */}
        {!isUserTutor && isAuthenticated &&(
        <div className="flex text-center">
        <button
          onClick={handleOpenReviewForm}
          className="flex items-center bg-gray-500 text-white px-4 py-3 rounded-full shadow-lg hover:bg-gray-600 focus:outline-none transform hover:scale-105 transition duration-300"
        >
          <FaComment className="mr-3 text-xl" />
          Write a Review
        </button>
        </div>
         )}
      </div>
        
      {isReviewFormOpen && (
        <ReviewForm courseId={course._id} onClose={handleCloseReviewForm} />
      )}

      {/* Curriculum Section */}
      {curriculumData.length > 0 && (
        <div className="mb-4 mt-10">
          <CurriculumSection curriculum={curriculumData} />
        </div>
      )}
      {/* Tutor Details */}
      <div className="mb-4 mt-5">
        <TutorDetails tutorId={course.tutor} />
      </div>
    </div>
  );
};

export default CourseDetails;