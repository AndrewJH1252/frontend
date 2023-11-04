import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const CategoryCard = ({ category }) => {

  const navigate = useNavigate();

  if (!category || !category.image) {
    return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="w-full h-64 bg-gray-300 flex items-center justify-center">
          <span className="text-gray-600">Category Not Available</span>
        </div>
      </div>
    );
  }

  const { id, name, image } = category;

  const handleCategoryClick = () => {
    navigate(`/Results?category=${category._id}`);
  };
  
  

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden w-80 mx-auto hover:shadow-2xl transform hover:scale-105 transition-transform duration-300 ease-in-out">
    <div
      className="relative cursor-pointer"
      onClick={handleCategoryClick}
    >
      <img
        className="object-cover w-full h-64 rounded-t-lg"
        src={image}
        alt={name}
      />
      <div className="absolute top-0 left-0 bg-black bg-opacity-50 w-full h-full flex items-center justify-center">
        <h3 className="text-white text-center text-2xl font-semibold">{name}</h3>
      </div>
    </div>
  </div>
  
  );
};

CategoryCard.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string,
  }).isRequired,
  selectedCategory: PropTypes.string, // Add this prop type
  searchQuery: PropTypes.string,      // Add this prop type
};

export default CategoryCard;