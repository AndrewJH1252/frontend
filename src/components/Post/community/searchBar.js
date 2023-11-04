import React, { useState } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa'; // Import icons

const SearchBar = ({ onSearch , searchQuery,setSearchQuery}) => {
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      setIsSearching(true);
      onSearch(searchQuery);
    }
  };

  const handleClear = () => {
    setSearchQuery('');
    setIsSearching(false);
    onSearch(''); // Clear the search results
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center justify-center mt-3">
      <div className="relative w-80">
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 text-gray-700"
          placeholder="Search Threads"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        {isSearching && (
          <button
            className="absolute top-0 right-0 mr-3 mt-3 text-red-500 hover:text-red-600 focus:outline-none"
            onClick={handleClear}
          >
            <FaTimes className="w-6 h-6" />
          </button>
        )}
        <button
        className={`absolute top-0 right-0 px-4 py-2  ${
          isSearching ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
        } rounded-r-lg hover:bg-red-600 focus:outline-none transition duration-300 transform hover:scale-105`}
        onClick={isSearching ? handleClear : handleSearch}
      >
        {isSearching ? <FaTimes className="w-6 h-6" /> : <FaSearch className="w-6 h-6" />}
      </button>
      </div>
    </div>
  );
};

export default SearchBar;
