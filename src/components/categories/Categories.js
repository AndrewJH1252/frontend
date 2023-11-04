import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../../redux/Thunks/categoriesThunk';
import CategoryCard from './CategoryCard';

const Categories = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const loading = useSelector((state) => state.categories.loading);
  const error = useSelector((state) => state.categories.error);

  useEffect(() => {
    // Fetch categories when the component mounts
    dispatch(fetchCategories());
  }, [dispatch]);

  if (!categories || categories.length === 0) {
    // Return a placeholder or loading state
    return (
      <div className="container mx-auto px-4 mt-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Trending Categories</h2>
        <div className="text-center text-gray-600">No categories found.</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 mt-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Trending Categories</h2>
        <div className="text-center text-red-500">Error: {error}</div>
      </div>
    );
  }

  const sixCategories = categories.slice(0, 8);

  return (
  <div className="bg-white py-8">
  <div className="container mx-auto px-4 mt-10 mb-5">
    <h2 className="text-2xl mb-8 px-7 font-semibold text-gray-800">Trending Categories</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {sixCategories.map((category) => (
        <div key={category.id} className="w-full">
          <CategoryCard category={category} />
        </div>
      ))}
    </div>
  </div>
</div>

  );
};

export default Categories;
