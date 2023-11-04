import React, { useState, useEffect, useRef } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchSearchResults, fetchSuggestions } from '../../redux/Thunks/searchThunk';
import { updateSearchQuery } from '../../redux/slice/searchSlice'; // Import the action


const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [isInputEmpty, setIsInputEmpty] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null); // Reference to the input element
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const suggestions = useSelector(state => state.search.suggestions);
  const loadingSuggestions = useSelector(state => state.search.loadingSuggestions);
  const loadingSearchResults = useSelector(state => state.search.loadingSearchResults);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isInputEmpty) {
      startSearch(query);
    }
  };

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    if (newQuery.trim() === '') {
      setIsInputEmpty(true);
      setShowSuggestions(false);
    } else {
      setIsInputEmpty(false);
      dispatch(fetchSuggestions(newQuery));
      setShowSuggestions(true);
    }
  };

 

  const handleSuggestionClick = async (suggestion) => {
    console.log('Clicked suggestion:', suggestion);

    setQuery(suggestion);
    setShowSuggestions(false);
    dispatch(updateSearchQuery(suggestion));

    try {
      // Fetch search results based on the suggestion's title
      dispatch(fetchSearchResults(suggestion));
      navigate(`/results?query=${suggestion}`);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };
  
  

  const startSearch = (searchQuery) => {
    dispatch(fetchSearchResults(searchQuery));
    dispatch(updateSearchQuery(searchQuery));
    navigate(`/results?&query=${searchQuery}`);
  };

  const handleDocumentClick = (e) => {
    // Close suggestions dropdown when clicking outside of it
    if (!inputRef.current.contains(e.target)) {
      setShowSuggestions(false);
    }
  };

  const getTutorName = (suggestion) => {
    // Assuming your suggestion is in the format: "Course Title - Tutor Name"
    const parts = suggestion.split(' - ');
    return parts.length > 1 ? parts[1] : 'Unknown Tutor';
  };

  useEffect(() => {
    setIsInputEmpty(query.trim() === '');
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [query, dispatch]);

  return (
    <div className="relative">
      <div className="flex items-center space-x-4 px-2 py-1 rounded-full border bg-white shadow-md">
        <input
          ref={inputRef}
          placeholder="Search for courses..."
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          className="border-none focus:outline-none p-1 bg-transparent text-sm flex-grow w-48 md:w-64 lg:w-96 py-2 pr-4"
        />
        <button
          className={`text-xl ${
            isInputEmpty ? 'text-gray-500' : 'text-gray-700'
          } rounded-md hover:text-blue-600 transition duration-300 ease-in-out flex items-center pr-2`}
          onClick={() => {
            if (!isInputEmpty) {
              startSearch(query);
            }
          }}
        >
          <AiOutlineSearch className="ml-2" />
        </button>
      </div>
      {loadingSuggestions && <p>Loading suggestions...</p>}
      {loadingSearchResults && <p>Loading search results...</p>}
      {showSuggestions && suggestions && suggestions.length > 0 && (
      <div className="suggestions-container bg-white border border-gray-300 rounded-lg shadow-lg mt-2 absolute z-10 overflow-y-auto max-h-60 w-full">
      <ul className="suggestions-list">
        {suggestions.map((suggestion, index) => (
          <li
            key={index}
            onClick={() => handleSuggestionClick(suggestion)}
            className="suggestion-item p-3 cursor-pointer transition-transform duration-300 hover:bg-blue-100 transform hover:scale-105 flex items-center space-x-2"
          >
            <div className="flex-shrink-0 w-10 h-10 bg-blue-500 text-white rounded-full flex justify-center items-center">
              {suggestion.charAt(0)}
            </div>
            <div className="flex-grow">
              <p className="text-gray-800 font-semibold text-sm">{suggestion}</p>
              
            </div>
            <div className="flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-500 hover:text-blue-500 transition duration-300 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14l-4-4 4-4m0 8l-4-4m4 4l4-4M12 6v12"
                />
              </svg>
            </div>
          </li>
        ))}
      </ul>
    </div>
)}

    </div>
  );
};

export default SearchBar;
