import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CourseCard from '../courses/CourseCard';
import Pagination from '../common/pagination';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { fetchCreatedCourses } from '../../redux/Thunks/courseCreationThunk';
import { FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa'; // Import the required icons
import Logo from '../../images/logo.png';

const MyCourses = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courseCreation.createdCourses);
  const [sortedCourses, setSortedCourses] = useState([]);
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(6); // Number of courses to display per page
  const [sortDescending, setSortDescending] = useState(true); // Define the sortDescending state

  useEffect(() => {
    dispatch(fetchCreatedCourses());
  }, [dispatch]);

  useEffect(() => {
    // Sort courses based on the selected sorting option
    if (Array.isArray(courses)) {
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
      setSortedCourses([]); // Set to an empty array when courses are null or undefined
    }
  }, [courses, sortBy]);

  // Pagination
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = sortedCourses?.slice(indexOfFirstCourse, indexOfLastCourse) || [];

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSortChange = () => {
    setSortBy(sortBy === 'newest' ? 'oldest' : 'newest');
    setCurrentPage(1); // Reset pagination when sorting changes
    setSortDescending(!sortDescending);
  };

  return (
    <div className="bg-gradient-to-br from-blue-900 to-indigo-900 min-h-screen p-4 flex flex-col sm:p-8">
  <header className="mb-5">
    <a href="/tutor-dashboard" className="flex items-center hover:opacity-80 transition-opacity">
      <img src={Logo} alt="My Logo" className="w-28 sm:w-30 h-12 mr-4 sm:mr-8 mb-3" />
    </a>
  </header>
  <div className="text-white text-center mb-8">
    <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
      Explore My Courses
    </h2>
    <p className="text-lg mt-2">Empower your teaching journey with boundless knowledge.</p>
  </div>
  <div className="items-center">
    <div className="w-full flex items-center justify-end mb-8">
      <button
        className="flex items-center text-white hover:text-gray-200 transition duration-300 ease-in-out"
        onClick={handleSortChange}
      >
        {sortDescending ? <FaSortAmountDown className="text-xl" /> : <FaSortAmountUp className="text-xl" />}
        <span className="ml-2 text-lg">Sort by {sortDescending ? 'Newest' : 'Oldest'}</span>
      </button>
    </div>
    {courses === null ? (
      <p>Loading...</p>
    ) : sortedCourses && sortedCourses.length === 0 ? (
      <div className="flex flex-1 justify-center items-center h-full">
        <p className="text-white font-semibold text-center">No courses available.</p>
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 sm:gap-10 px-4 sm:px-8">
        {currentCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    )}
    <Pagination
      itemsPerPage={coursesPerPage}
      totalItems={sortedCourses.length}
      currentPage={currentPage}
      paginate={paginate}
      prevIcon={<FiChevronLeft className="text-blue-500 text-xl" />}
      nextIcon={<FiChevronRight className="text-blue-500 text-xl" />}
    />
  </div>
</div>

  
  );
};

export default MyCourses;
