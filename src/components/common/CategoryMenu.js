import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCoursesByCategory } from '../../redux/Thunks/courseThunk';
import { fetchCategories } from '../../redux/Thunks/categoriesThunk';
import { Link} from 'react-router-dom';

const DropdownMenu = () => {
  const categories = useSelector((state) => state.categories.categories);
  const dispatch = useDispatch();
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [coursesForCategory, setCoursesForCategory] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategoryClick = (categoryId) => {
    setActiveCategoryId(categoryId);
    setMenuVisible(false);
    setLoading(true);

    dispatch(fetchCoursesByCategory(categoryId))
      .then((response) => {
        setCoursesForCategory(response.data.slice(0, 8)); // Show the first 8 courses.
        setLoading(false);

        // Navigate to the Results page with the selected category ID as a parameter.
        
      })
      .catch((error) => {
        setLoading(false);
        console.error('Error fetching courses:', error);
      });
    
  };


  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setMenuVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative group" ref={dropdownRef}>
    <button
      className="flex items-center space-x-2 text-white hover:text-indigo-500 focus:outline-none focus:text-indigo-500 px-4 py-2 rounded-lg transition-colors duration-300"
      onClick={() => setMenuVisible(!menuVisible)}
    >
      <span className="text-lg font-semibold">Categories</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-6 w-6 transform transition-transform duration-300 ${
          menuVisible ? 'rotate-180' : ''
        }`}
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10.293 5.293a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L10 7.414l-2.293 2.293a1 1 0 01-1.414-1.414l3-3a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    </button>
    {menuVisible && (
      <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-300 divide-y divide-gray-300 rounded-lg shadow-lg z-10 transition-opacity duration-300 transform scale-100">
        <button
          className="absolute top-0 right-0 m-2 text-gray-600 hover:text-gray-800 focus:outline-none"
          onClick={() => setMenuVisible(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M14.293 5.293a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L10 7.414l-2.293 2.293a1 1 0 01-1.414-1.414l3-3a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        {loading ? (
          <div className="px-4 py-2 text-lg font-semibold">Loading...</div>
        ) : (
          categories.map((category) => (
            <Link
              key={category.id}
              to={`/Results?category=${category._id}`}
              onClick={() => handleCategoryClick(category.id)}
              className={`block px-4 py-3 text-gray-800 hover:bg-indigo-100 hover:text-indigo-500 transition-all duration-300 ${
                activeCategoryId === category.id ? 'bg-indigo-500 text-white' : ''
              }`}
            >
              {category.name}
            </Link>
          ))
        )}
      </div>
    )}
  </div>
  
 

  );
};

export default DropdownMenu;
