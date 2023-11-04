import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'; // Assuming you have actions for searching
import { searchTutors } from '../../redux/Thunks/userThunk'; // Replace with your specific action
import { FiSearch } from 'react-icons/fi'; // Import the search icon from react-icons

const Search = () => {
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Dispatch a search action when the search term changes
    dispatch(searchTutors(searchTerm));
  }, [dispatch, searchTerm]);

  const handleSearch = () => {
    dispatch(searchTutors(searchTerm));
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow-md">
      <div className="mb-4 flex">
        <input
          type="text"
          id="search"
          className="w-full p-2 pr-10 border rounded focus:outline-none focus:ring focus:border-blue-300"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by Name"
        />
        <button
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 ml-2"
          onClick={handleSearch}
        >
          <FiSearch size={20} /> {/* Use the search icon */}
        </button>
      </div>
    </div>
  );
};

export default Search;
