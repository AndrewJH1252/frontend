import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchThreads, searchThreads, sortThreads } from '../../../redux/Thunks/communityThunk';

import ThreadList from '../ThreadList';
import CategoryFilter from './categoryFilter';
import SortOptions from './sortOptions';
import SearchBar from './searchBar';
import Pagination from '../../common/pagination';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Logo from '../../../images/logo.png';

const CommunityPage = () => {
  const dispatch = useDispatch();
  const threads = useSelector((state) => state.community.threads);
  const searchThreadsResult = useSelector((state) => state.community.threadResults);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(''); // State to store the selected category
  const [sortBy, setSortBy] = useState('newest'); // State to store the sorting option
  const [isSearching, setIsSearching] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // Number of items to display per page

  useEffect(() => {
    dispatch(fetchThreads());
  }, [dispatch]);

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category); // Update selected category
  };

  const handleSortThreads = (option) => {
    setSortBy(option);
  };

  const handleSearch = async () => {
    if (searchQuery.trim() !== '') {
      setIsSearching(true);
      dispatch(searchThreads(searchQuery));
    }
  };

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Initialize currentThreads based on the isSearching condition and sorting logic
  let currentThreads = [];

  if (isSearching) {
    currentThreads = searchThreadsResult;
  } else {
    // Sort threads based on the selected sorting option
    const sortedThreads = threads.slice().sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortBy === 'oldest') {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
      return 0;
    });

    // Filter threads based on the selected category
    currentThreads = selectedCategory
      ? sortedThreads.filter((thread) => thread.category._id === selectedCategory)
      : sortedThreads;
  }

  // Function to change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="bg-gradient-to-b from-purple-800 to-purple-600 min-h-screen text-white py-8">
    <div className="container mx-auto px-4">
      <header className="mb-8">
        <a href="/Main" className="flex items-center hover:opacity-80 transition-opacity">
          <img src={Logo} alt="My Logo" className="w-30 h-12 mr-8 mb-3" />
        </a>
      </header>
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-semibold mb-4">Welcome to the Community</h1>
        <p className="text-lg">Explore, Discuss, and Connect with Others</p>
      </div>
  
      <div className="bg-opacity-25 bg-white p-6 rounded-lg mb-6">
        <h2 className="text-3xl font-semibold mb-4 text-white">Community Forum</h2>
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 mb-4 justify-between">
          <div className='flex space-x-5'>
          <CategoryFilter onFilter={handleCategoryFilter} />
          <SortOptions onSort={handleSortThreads} />
          </div>
          <div className='flex'>
          <SearchBar
            onSearch={handleSearch}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            isSearching={isSearching}
            setIsSearching={setIsSearching}
          />
          </div>
         
         
        </div>
        <ThreadList threads={currentThreads} />
      </div>
  
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={currentThreads.length}
        currentPage={currentPage}
        paginate={paginate}
        prevIcon={<FiChevronLeft className="text-purple-500 text-xl" />}
        nextIcon={<FiChevronRight className="text-purple-500 text-xl" />}
      />
    </div>
  </div>
  
  );
};

export default CommunityPage;
