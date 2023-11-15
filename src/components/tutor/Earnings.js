import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../common/pagination';
import { FiArrowDown, FiArrowUp, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { fetchEarnings } from '../../redux/Thunks/walletThunk';
import Logo from '../../images/logo.png';

const Earnings = () => {
  const dispatch = useDispatch();
  const earnings = useSelector((state) => state.wallet.earnings || []);
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const earningsPerPage = 5;

  const sortEarnings = (a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.date) - new Date(a.date);
      case 'oldest':
        return new Date(a.date) - new Date(b.date);
      case 'highest':
        return b.amount - a.amount;
      case 'lowest':
        return a.amount - b.amount;
      default:
        return 0;
    }
  };

  useEffect(() => {
    dispatch(fetchEarnings());
  }, [dispatch]);

  const sortedEarnings = [...earnings].sort(sortEarnings);

  const indexOfLastEarning = currentPage * earningsPerPage;
  const indexOfFirstEarning = indexOfLastEarning - earningsPerPage;
  const currentEarnings = sortedEarnings.slice(
    indexOfFirstEarning,
    indexOfLastEarning
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="bg-gray-100 min-h-screen rounded shadow p-4">
  <header className="m-5">
    <a href="https://tutorium.onrender.com/tutor-dashboard" className="flex items-center hover:opacity-80 transition-opacity">
      <img src={Logo} alt="My Logo" className="w-28 sm:w-30 h-12 mr-4 sm:mr-8 mb-3" />
    </a>
  </header>
  <div className="max-w-full sm:max-w-3xl md:max-w-5xl lg:max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-8 sm:py-10 rounded-lg bg-white bg-opacity-90 shadow-xl">
    <h2 className="text-2xl sm:text-3xl font-semibold text-pink-900 mb-4">Earnings</h2>
    <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
      <div className="flex items-center space-x-2 mb-2 sm:mb-0">
        <label htmlFor="sort" className="text-gray-600 font-semibold">
          Sort by{' '}
          {sortBy === 'newest' ? (
            <FiArrowDown className="text-gray-400 ml-1 inline-block align-text-bottom" />
          ) : (
            <FiArrowUp className="text-gray-400 ml-1 inline-block align-text-bottom" />
          )}
        </label>
        <select
          id="sort"
          value={sortBy}
          onChange={handleSortChange}
          className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="highest">Highest</option>
          <option value="lowest">Lowest</option>
        </select>
      </div>
      <div className="text-gray-600 font-semibold mt-2 sm:mt-0">
        Total Earnings: ${earnings.reduce((acc, cur) => acc + cur.amount, 0).toFixed(2)}
      </div>
    </div>
    {currentEarnings.length === 0 ? (
      <div className="flex justify-center items-center h-32 sm:h-40">
        <div className="text-gray-500">No earnings to display.</div>
      </div>
    ) : (
      <div className="bg-white rounded shadow p-4 mt-4">
        <ul>
          {currentEarnings.map((earning) => (
            <li
              key={earning.id}
              className="border-b border-gray-300 py-2 flex flex-col sm:flex-row justify-between items-center transition-all hover:bg-gray-50"
            >
              <div className="mb-2 sm:mb-0">
                <p className="text-sm text-gray-600">
                  {new Date(earning.date).toLocaleString(undefined, {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                  })}
                </p>
                <p className="font-semibold">{earning.description}</p>
              </div>
              <p
                className={
                  earning.type === 'credit'
                    ? 'text-green-500 font-semibold'
                    : 'text-red-500 font-semibold'
                }
              >
                {earning.type === 'credit' ? '+' : '-'} ${earning.amount.toFixed(2)}
              </p>
            </li>
          ))}
        </ul>
      </div>
    )}
    <div className="flex justify-center mt-6">
      <Pagination
        itemsPerPage={earningsPerPage}
        totalItems={sortedEarnings.length}
        currentPage={currentPage}
        paginate={paginate}
        prevIcon={<FiChevronLeft className="text-gray-600 text-2xl" />}
        nextIcon={<FiChevronRight className="text-gray-600 text-2xl" />}
      />
    </div>
  </div>
</div>

  
  );
};

export default Earnings;
