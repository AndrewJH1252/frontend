import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import CourseCard from '../courses/CourseCard';
import Pagination from './pagination';
import Filter from './filter';
import { useLocation } from 'react-router-dom';
import { clearFilteredResults } from '../../redux/slice/coursesSlice';
import { fetchCoursesByCategory } from '../../redux/Thunks/courseThunk';
import { fetchCategoryById } from '../../redux/Thunks/categoriesThunk';
import Logo from '../../images/logo.png';

const ResultsPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedCategory = queryParams.get('category');
  const selectedId = queryParams.get('id');
  const searchQuery = queryParams.get('query'); // Extract search query from URL
  const categoryName = useSelector((state) => state.categories.category?.name || '');

  useEffect(() => {
    dispatch(clearFilteredResults());

    // Fetch the category by ID if a category or id is selected
    if (selectedCategory || selectedId) {
      dispatch(fetchCategoryById(selectedCategory || selectedId)).then(() => {
        // After fetching the category, fetch courses by category
        dispatch(fetchCoursesByCategory(selectedCategory || selectedId));
      });
    }
  }, [dispatch, selectedCategory, selectedId]);

  const coursesPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (selectedCategory || selectedId) {
      // If a category or id is selected, fetch courses by category or id
      dispatch(fetchCoursesByCategory(selectedCategory || selectedId));
    }
  }, [dispatch, location.search, selectedCategory, selectedId]);

  const filteredCourse = useSelector((state) => state.courses.filteredResults);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourse.slice(indexOfFirstCourse, indexOfLastCourse);

  let pageTitle = 'Search Results';
  if (searchQuery) {
    pageTitle = `Search Results for "${searchQuery}"`;
  }
  if (selectedCategory) {
    pageTitle = `"${categoryName}" Courses`;
  }

  return (
    <div className="bg-gradient-to-b from-purple-900 via-indigo-800 to-blue-900 min-h-screen py-12 px-4">
  <header className="ml-5 mb-5">
  <a href="/Main" className="flex items-center hover:opacity-80 transition-opacity">
    <img src={Logo} alt="My Logo" className="w-30 h-12 mr-8 mb-3" />
 
  </a>
</header>

    <div className="max-w-7xl mx-auto">
   
      <h1 className="text-4xl font-extrabold text-white mb-8">{pageTitle}</h1>
      <div className="flex flex-col lg:flex-row mt-10 space-y-6 lg:space-y-0">
        <div className="lg:w-1/4 pr-4">
          <Filter selectedCategory={selectedCategory || selectedId} />
        </div>
        <div className="lg:w-3/4 mt-6 lg:mt-0 space-y-6">
          {currentCourses.length === 0 ? (
            <p className="text-center text-gray-300 text-lg">No results found.</p>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-8">
                {currentCourses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-white rounded-lg overflow-hidden shadow-md transform hover:scale-105 transition duration-300"
                  >
                    <CourseCard course={course} />
                  </div>
                ))}
              </div>
              <Pagination
                itemsPerPage={coursesPerPage}
                totalItems={filteredCourse.length}
                currentPage={currentPage}
                paginate={paginate}
                prevIcon={<FiChevronLeft className="text-purple-500 text-2xl" />}
                nextIcon={<FiChevronRight className="text-purple-500 text-2xl" />}
              />
            </>
          )}
        </div>
      </div>
    </div>
  </div>
  
  
  );
};

export default ResultsPage;
