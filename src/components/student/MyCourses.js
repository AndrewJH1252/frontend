import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CourseCard from '../courses/CourseCard';
import Pagination from '../common/pagination';
import { fetchEnrolledCourses } from '../../redux/Thunks/courseThunk';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';
import Logo from '../../images/logo.png';

const MyCourses = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses.enrolledCourses);
  const [sortedCourses, setSortedCourses] = useState([]);
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(5);
  const [sortDescending, setSortDescending] = useState(true);

  useEffect(() => {
    dispatch(fetchEnrolledCourses());
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(courses)) {
      // Make a copy of the courses array before sorting
      const sorted = [...courses].sort((a, b) => {
        if (sortBy === 'newest') {
          return new Date(b.enrollmentDate) - new Date(a.enrollmentDate);
        } else if (sortBy === 'oldest') {
          return new Date(a.enrollmentDate) - new Date(b.enrollmentDate);
        }
        return 0;
      });
      setSortedCourses(sorted);
    } else {
      setSortedCourses([]);
    }
  }, [courses, sortBy]);

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = sortedCourses.slice(indexOfFirstCourse, indexOfLastCourse);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSortChange = () => {
    setSortBy(sortBy === 'newest' ? 'oldest' : 'newest');
    setCurrentPage(1);
    setSortDescending(!sortDescending);
  };

  return (
    <div className="bg-gradient-to-br from-blue-800 to-indigo-900 min-h-screen p-8 flex flex-col">
      <a href="https://tutorium.onrender.com/Main" className="flex items-center hover:opacity-80 transition-opacity">
        <img src={Logo} alt="My Logo" className="w-30 h-12 mr-8 mb-3" />
      </a>

      <div className="text-white text-center mb-8">
        <h2 className="text-4xl font-extrabold tracking-tight">Explore My Courses</h2>
        <p className="text-lg mt-2">Discover a world of knowledge at your fingertips.</p>
      </div>

      <div className="bg-white rounded-lg p-4 shadow-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold tracking-tight">My Courses</h2>
          <button
            className="flex items-center text-gray-600 hover:text-gray-800 transition duration-300 ease-in-out"
            onClick={handleSortChange}
          >
            {sortDescending ? (
              <FaSortAmountDown className="text-xl" />
            ) : (
              <FaSortAmountUp className="text-xl" />
            )}
            <span className="ml-2 text-lg">
              Sort by {sortDescending ? 'Newest' : 'Oldest'}
            </span>
          </button>
        </div>

        <div className="mt-4">
          {courses === null ? (
            <p className="text-center text-gray-600 animate-pulse">Loading...</p>
          ) : sortedCourses && sortedCourses.length === 0 ? (
            <div className="flex flex-1 justify-center items-center h-full">
              <p className="text-gray-600 text-center">No courses available.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-6 lg:grid-cols-3 gap-10">
            {currentCourses.map((course) => (
              <div key={course.id} className="w-full">
                <CourseCard course={course} />
              </div>
            ))}
          </div>
          
          )}
        </div>

        {sortedCourses && sortedCourses.length > 0 && (
          <Pagination
            itemsPerPage={coursesPerPage}
            totalItems={sortedCourses.length}
            currentPage={currentPage}
            paginate={paginate}
            prevIcon={<FiChevronLeft className="text-purple-500 text-xl" />}
            nextIcon={<FiChevronRight className="text-purple-500 text-xl" />}
          />
        )}
      </div>
    </div>
  );
};

export default MyCourses;
