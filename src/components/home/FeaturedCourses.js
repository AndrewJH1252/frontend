import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchFeaturedCourses,
  fetchPopularCourses,
  fetchNewCourses,
} from '../../redux/Thunks/courseThunk';
import CourseCard from '../courses/CourseCard';
import { BiChevronLeftCircle, BiChevronRightCircle } from 'react-icons/bi';

const FeaturedCourses = () => {
  const dispatch = useDispatch();

  const featuredCourses = useSelector(state => state.courses.featuredCourses);
  const popularCourses = useSelector(state => state.courses.popularCourses);
  const newCourses = useSelector(state => state.courses.newCourses);

  useEffect(() => {
    dispatch(fetchFeaturedCourses());
    dispatch(fetchPopularCourses());
    dispatch(fetchNewCourses());
  }, [dispatch]);

  const coursesPerPage = 5;

  const renderCourseCards = (courses, startIdx, endIdx) => {
    if (!Array.isArray(courses) || courses.length === 0) {
      return "No courses available.";
    }
  
    return courses.slice(startIdx, endIdx).map((course, index) => (
      <CourseCard key={course._id} course={course} />
    ));
  };

  const [newCoursesIndex, setNewCoursesIndex] = useState(0);
  const [popularCoursesIndex, setPopularCoursesIndex] = useState(0);
  const [featuredCoursesIndex, setFeaturedCoursesIndex] = useState(0);

  const handleNewCoursesNextClick = () => {
    setNewCoursesIndex(prevIndex =>
      Math.min(prevIndex + coursesPerPage, newCourses.length - coursesPerPage)
    );
  };

  const handleNewCoursesPrevClick = () => {
    setNewCoursesIndex(prevIndex => Math.max(prevIndex - coursesPerPage, 0));
  };

  const handlePopularCoursesNextClick = () => {
    setPopularCoursesIndex(prevIndex =>
      Math.min(prevIndex + coursesPerPage, popularCourses.length - coursesPerPage)
    );
  };

  const handlePopularCoursesPrevClick = () => {
    setPopularCoursesIndex(prevIndex => Math.max(prevIndex - coursesPerPage, 0));
  };

  const handleFeaturedCoursesNextClick = () => {
    setFeaturedCoursesIndex(prevIndex =>
      Math.min(prevIndex + coursesPerPage, featuredCourses.length - coursesPerPage)
    );
  };

  const handleFeaturedCoursesPrevClick = () => {
    setFeaturedCoursesIndex(prevIndex => Math.max(prevIndex - coursesPerPage, 0));
  };

  if (!featuredCourses || !popularCourses || !newCourses) {
    return <p>Loading...</p>;
  }

  
  

  return (
    <div className="bg-white py-16">
      <div className="container mx-auto">
        {/* New Courses Section */}
        <div className="space-y-8 mb-4">
          <div className="mb-6 text-2xl font-semibold text-gray-800 px-4">
            New Courses
          </div>
        
          {/* Navigation buttons */}
          <div className="flex justify-between mt-4 ">
            <button
              className={`flex text-xl hover:text-blue-500 transition ease-in-out duration-300 items-center text-gray-600 ${
                newCoursesIndex === 0 ? 'invisible' : ''
              }`}
              onClick={handleNewCoursesPrevClick}
            >
              <BiChevronLeftCircle className="text-2xl ml-2 mr-1" /> 
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 px-5 md:px-12">
            {renderCourseCards(newCourses, newCoursesIndex, newCoursesIndex + coursesPerPage, 'h-96')}
          </div>

            <button
              className={`flex text-xl hover:text-blue-500 transition ease-in-out duration-300 items-center text-gray-600 ${
                newCoursesIndex + coursesPerPage >= newCourses.length
                  ? 'invisible'
                  : ''
              }`}
              onClick={handleNewCoursesNextClick}
            >
              <BiChevronRightCircle className=" text-2xl ml-1 mr-2" />
            </button>
          </div>
        </div>

        {/* Popular Courses Section */}
        <div className="space-y-8 mb-4">
          <div className="mb-6 text-2xl font-semibold text-gray-800 px-4">
            Popular Courses
          </div>
        
          {/* Navigation buttons */}
          <div className="flex justify-between mt-4">
            <button
              className={`flex text-xl hover:text-blue-500 transition ease-in-out duration-300 items-center text-gray-600 ${
                popularCoursesIndex === 0 ? 'invisible' : ''
              }`}
              onClick={handlePopularCoursesPrevClick}
            >
              <BiChevronLeftCircle className="text-2xl ml-2 mr-1" /> 
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 px-5 md:px-12">
              {renderCourseCards(popularCourses, popularCoursesIndex, popularCoursesIndex + coursesPerPage)}
            </div>
            <button
              className={`flex text-xl hover:text-blue-500 transition ease-in-out duration-300 items-center text-gray-600 ${
                popularCoursesIndex + coursesPerPage >= popularCourses.length
                  ? 'invisible'
                  : ''
              }`}
              onClick={handlePopularCoursesNextClick}
            >
              <BiChevronRightCircle className="text-2xl ml-1 mr-2" />
            </button>
          </div>
        </div>

        {/* Featured Courses Section */}
        <div className="space-y-8 mb-4">
          <div className="mb-6 text-2xl font-semibold text-gray-800 px-4">
            Featured Courses
          </div>
        
          {/* Navigation buttons */}
          <div className="flex justify-between mt-4">
            <button
              className={`flex text-xl hover:text-blue-500 transition ease-in-out duration-300 items-center text-gray-600 ${
                featuredCoursesIndex === 0 ? 'invisible' : ''
              }`}
              onClick={handleFeaturedCoursesPrevClick}
            >
              <BiChevronLeftCircle className="text-2xl ml-2 mr-1" /> 
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 px-5 md:px-12">
              {renderCourseCards(featuredCourses, featuredCoursesIndex, featuredCoursesIndex + coursesPerPage)}
            </div>
            <button
              className={`flex text-xl hover:text-blue-500 transition ease-in-out duration-300 items-center text-gray-600 ${
                featuredCoursesIndex + coursesPerPage >= featuredCourses.length
                  ? 'invisible'
                  : ''
              }`}
              onClick={handleFeaturedCoursesNextClick}
            >
              <BiChevronRightCircle className="text-2xl ml-1 mr-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCourses;