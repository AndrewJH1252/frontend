import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { storeCourseDetails, storeCurriculum, createCourseStart } from '../../../redux/slice/courseCreationSlice';
import { createCourse, editCourse } from '../../../redux/Thunks/courseCreationThunk'; // Import should match the filename

import { addNewNotification } from '../../../redux/Thunks/notificationsThunk';
import { FaCheckCircle } from 'react-icons/fa';

const CourseOverview = ({goBack}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector(state => state.auth.profile || []); // Ensure an object as the default value
  const userId = useSelector(state => state.auth.profile._id || []);
  const courseDetails = useSelector(state => state.courseCreation.courseDetails || {});
  const curriculumData = useSelector(state => state.courseCreation.courseDetails.curriculum || {});
  const categories = useSelector(state => state.categories.categories);
  const courseId = courseDetails._id || null;


  const handleFinish = async () => {
    try {
      dispatch(createCourseStart());
  
      if (courseId) {
        // Use editCourse action if in edit mode
        await dispatch(editCourse({ id: courseId, courseDetails }));
      } else {
        // Use createCourse action if not in edit mode
        await dispatch(createCourse({ courseDetails, userId }));
      }
  
      dispatch(storeCourseDetails({})); // Clear course details
      dispatch(storeCurriculum([])); // Clear curriculum (pass an empty array)
  
      // Redirect to the appropriate route
      navigate('/tutor-dashboard');
  
      // Create a notification about the newly created/edited course
      const message = courseId
        ? `Your course "${courseDetails.title}" has been successfully edited.`
        : `Your course "${courseDetails.title}" has been successfully created.`;
  
      const newNotification = {
        recipientId: user._id,
        message,
        type: 'success',
      };
  
      // Dispatch the addNewNotification thunk
      await dispatch(addNewNotification(newNotification));
    } catch (error) {
      console.error('Error creating/editing course:', error);
      // You can add error handling here if needed
    }
  };
  

  const handlePrevious = () => {
    goBack(); // Call the goBack function passed as a prop
  };

  return (
    <div className="flex flex-col items-center justify-center mt-5 bg-gray-100">
      <div className="max-w-5xl w-full mx-auto p-6 bg-white rounded shadow">
        <h2 className="text-3xl font-semibold mb-6">Course Overview</h2>
        <div className="space-y-6">
          <div className="text-xl font-semibold">{courseDetails.title}</div>
          <div className="text-gray-600">
          <div dangerouslySetInnerHTML={{ __html: courseDetails.description }} />
        </div>


          <div className="mt-6 grid grid-cols-2 gap-4">
          <div>
            <span className="font-semibold">Category:</span>{" "}
            {categories.find((category) => category._id === courseDetails.category)?.name}
          </div>

            <div>
              <span className="font-semibold">Price:</span> {courseDetails.price} {courseDetails.currency}
            </div>
            <div>
              <span className="font-semibold">Duration:</span> {courseDetails.duration} hours
            </div>
            <div>
              <span className="font-semibold">Level:</span> {courseDetails.level}
            </div>
            <div>
              <span className="font-semibold">Includes:</span>
              {typeof courseDetails.includes === 'string' ? (
                <ul className='ml-5'>
                  {courseDetails.includes.split(',').map((include, index) => (
                    <li className='flex items-center' key={index}>
                      <FaCheckCircle className="mr-2 text-green-400" /> {include.trim()}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No items included.</p>
              )}
            </div>


          <div >
            <span className="font-semibold">Is Paid:</span>{" "}
            {courseDetails.isPaid ? 'Yes' : 'No'}
          </div>
          </div>
         
          <div className="mt-6">
          <span className="font-semibold">Course Image</span>
            <img
              src={courseDetails.image}
              alt="Course"
              className="w-64 h-auto rounded shadow mt-3" // Adjust the width here (e.g., w-64 for a 64px width)
            />
          </div>


          <div className="mt-8">
            <h3 className="text-xl font-semibold">Curriculum</h3>
            {curriculumData.topics && curriculumData.topics.length > 0 ? (
              curriculumData.topics.map((topic, topicIndex) => (
                <div key={topicIndex} className="mt-6">
                  <h4 className="text-lg font-semibold">{topic.topicName}</h4>
                  <p className="text-gray-600 mt-2">{topic.topicDescription}</p>
                  <ul className="mt-2 list-disc list-inside">
                    {topic.lessons.map((lesson, lessonIndex) => (
                      <li key={lessonIndex} className="mt-2">
                        <span className="font-semibold">Lesson {lessonIndex + 1}:</span> {lesson.lessonTitle}
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No curriculum data available.</p>
            )}
          </div>
        </div>
        <div className="flex justify-between mt-10">
          <button
            onClick={handlePrevious}
            className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Previous
          </button>
          <button
            onClick={handleFinish}
            className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition duration-300"
          >
            Finish
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseOverview;
