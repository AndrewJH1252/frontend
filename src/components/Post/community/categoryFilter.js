import React, { useEffect } from 'react';
import { fetchCategories } from '../../../redux/Thunks/categoriesThunk';
import { useDispatch, useSelector } from 'react-redux';
import { FaFilter } from 'react-icons/fa';

const CategoryFilter = ({ onFilter }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="mb-4">
    <label className="text-gray-700 font-semibold flex items-center">
      <FaFilter className="mr-2 text-blue-700" /> Filter by:
    </label>
    <select
      className="block text-gray-700 w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-500 focus:border-blue-500"
      onChange={(e) => onFilter(e.target.value)}
    >
      <option value="">All Categories</option>
      {categories.map((category) => (
        <option key={category._id} value={category._id}>
          {category.name}
        </option>
      ))}
    </select>
  </div>
  
  );
};

export default CategoryFilter;
