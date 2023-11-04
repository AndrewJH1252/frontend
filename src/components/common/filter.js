import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilteredResults } from '../../redux/slice/coursesSlice';
import { fetchCategories } from '../../redux/Thunks/categoriesThunk';
import { FiFilter } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';

const Filter = ({ selectedCategory, selectedId }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);

  const results = useSelector((state) =>
  selectedCategory || selectedId
    ? state.courses.coursesByCategory
    : state.search.searchResults.courses
);

  const initialFilterOptions = useMemo(
    () => ({
      category: selectedCategory || selectedId || '',
      level: '',
      priceRange: '',
      isPaid: true,
      averageRating: 0,
    }),
    [selectedCategory, selectedId]
  );

  const [filterOptions, setFilterOptions] = useState(initialFilterOptions);

  // Define the applyFilter function
  const applyFilter = () => {
    let filteredResults;

    if (results && results.length > 0) {
      // Use results if it has data
      filteredResults = results;
    } else {
      // If neither has data, set filteredResults to an empty array or handle the case as needed
      filteredResults = [];
    }

    if (filterOptions.category) {
      filteredResults = filteredResults.filter((course) => course.category === filterOptions.category);
    }

    if (filterOptions.level) {
      filteredResults = filteredResults.filter((course) => course.level === filterOptions.level);
    }

    if (filterOptions.priceRange) {
      const priceRange = parseInt(filterOptions.priceRange);
      filteredResults = filteredResults.filter((course) => course.price <= priceRange);
    }

    if (filterOptions.isPaid !== undefined) {
      filteredResults = filteredResults.filter((course) => course.isPaid === filterOptions.isPaid);
    }

    if (filterOptions.averageRating) {
      filteredResults = filteredResults.filter((course) => {
        const averageRating =
          course.ratingCount === 0 ? 0 : course.ratingSum / course.ratingCount;
        return averageRating >= filterOptions.averageRating;
      });
    }

    return filteredResults;

    
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    const filteredResults = applyFilter();
    dispatch(setFilteredResults(filteredResults));
  }, [dispatch, results, filterOptions]);

  const handleApplyFilter = () => {
    const filteredResults = applyFilter();
    dispatch(setFilteredResults(filteredResults));
  };

  const handleClearFilter = () => {
    setFilterOptions(initialFilterOptions);
  };

  const handleCategoryChange = (event) => {
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      category: event.target.value,
    }));
  };

  const handleLevelChange = (event) => {
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      level: event.target.value,
    }));
  };

  const handlePriceRangeChange = (event) => {
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      priceRange: event.target.value,
    }));
  };

  const handleIsPaidChange = (event) => {
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      isPaid: event.target.checked,
    }));
  };

  const handleRatingChange = (rating) => {
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      averageRating: rating,
    }));
  };

  return (
    <div className="filter-container">
      <button
        className="text-xl text-blue-200 hover:text-blue-400 flex items-center space-x-2"
      >
        <FiFilter className="text-xl text-blue-200" />
        <span>Filter</span>
      </button>

      <div className="filter-options mt-2 p-4 bg-white rounded-lg shadow-md w-64">
        <h2 className="text-lg font-semibold mb-3">Filter Results</h2>
        <div className="filter-option mb-6">
          <label className="block text-gray-700 font-semibold mb-1">Category:</label>
          <select
            className="w-full bg-gray-100 border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleCategoryChange}
            name="category"
            value={filterOptions.category}
          >
            <option value="">Select a Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-option mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Level:</label>
          <select
            className="w-full bg-gray-100 border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleLevelChange}
            value={filterOptions.level}
          >
            <option value="">Select a Level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
        {/* Other filter options */}
        <div className="filter-option mb-6">
          <label className="block text-gray-700 font-semibold mb-1">Price Range:</label>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Free</span>
            <input
              type="range"
              className="w-full"
              min="0"
              max="100"
              value={filterOptions.priceRange}
              onChange={handlePriceRangeChange}
            />
            <span className="text-gray-600">$100+</span>
          </div>
        </div>

        <div className="filter-option mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            <input
              type="checkbox"
              className="mr-1"
              name="isPaid"
              checked={filterOptions.isPaid}
              onChange={handleIsPaidChange}
            />
            Paid Courses Only
          </label>
        </div>
        <div className="filter-option mb-6">
          <label className="block text-gray-700 font-semibold mb-1">Rating:</label>
          <div className="rating-stars flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((rating) => (
              <FaStar
                key={rating}
                size={20}
                className={`cursor-pointer ${
                  rating <= filterOptions.averageRating ? 'text-yellow-500' : 'text-gray-300'
                }`}
                onClick={() => handleRatingChange(rating)}
              />
            ))}
          </div>
        </div>
        <div className="filter-action-buttons mt-10 flex justify-center">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 mr-2"
            onClick={handleApplyFilter}
          >
            Apply
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            onClick={handleClearFilter}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
