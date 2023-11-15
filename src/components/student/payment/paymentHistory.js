import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../../common/pagination';
import {
  FiArrowDown,
  FiArrowUp,
  FiChevronRight,
  FiChevronLeft,
} from 'react-icons/fi';
import { fetchTransactionHistory } from '../../../redux/Thunks/walletThunk';
import Logo from '../../../images/logo.png';

const PaymentHistory = () => {
  const dispatch = useDispatch();
  const payments = useSelector((state) => state.wallet.transactions) || [];
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const paymentsPerPage = 5;

  const sortPayments = (a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.date) - new Date(a.date);
      case 'oldest':
        return new Date(a.date) - new Date(b.date);
      case 'most_expensive':
        return b.amount - a.amount;
      case 'cheaper':
        return a.amount - b.amount;
      default:
        return 0;
    }
  };

  useEffect(() => {
    dispatch(fetchTransactionHistory());
  }, [dispatch]);

  const sortedPayments = [...payments].sort(sortPayments);

  const indexOfLastPayment = currentPage * paymentsPerPage;
  const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
  const currentPayments = sortedPayments.slice(
    indexOfFirstPayment,
    indexOfLastPayment
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-900 to-purple-900 min-h-screen py-10">
      <a href="https://tutorium.onrender.com/Main" className="ml-6 flex items-center hover:opacity-80 transition-opacity">
    <img src={Logo} alt="My Logo" className="w-30 h-12 mr-8 mb-8" />
 
  </a>
      <div className="bg-gray-50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-4 border-gray-300 rounded-lg p-6 shadow-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-semibold text-indigo-800 mb-6">Payment History</h2>
          <div className="flex items-center space-x-4 mb-4">
            <label htmlFor="sort" className="flex items-center text-gray-600 text-lg">
              Sort by{' '}
              {sortBy === 'newest' ? (
                <FiArrowDown className="text-gray-400 ml-1" />
              ) : (
                <FiArrowUp className="text-gray-400 ml-1" />
              )}
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={handleSortChange}
              className="border border-gray-300 rounded-md px-3 py-1 text-lg bg-white"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="most_expensive">Most Expensive</option>
              <option value="cheaper">Less Expensive</option>
            </select>
          </div>
        </div>

        {currentPayments.length === 0 ? (
          <div className="flex justify-center items-center h-40">
            <div className="text-gray-500 text-lg">No payments to display.</div>
          </div>
        ) : (
          <div className="bg-white rounded shadow p-6 mt-6">
            <ul className="space-y-4">
              {currentPayments.map((transaction) => (
                <li
                  key={transaction.id}
                  className="border-b border-gray-300 py-2 flex justify-between items-center"
                >
                  <div>
                  <p className="text-base text-gray-700">
                    {new Date(transaction.date).toLocaleString(undefined, {
                      year: 'numeric',
                      month: 'numeric',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                      second: 'numeric',
                    })} 
                  </p>
                  <p className="font-semibold text-lg text-indigo-800">{transaction.description}</p>
                  </div>
                  <p
                    className={
                      transaction.type === 'credit'
                        ? 'text-green-500 text-lg'
                        : 'text-red-500 text-lg'
                    }
                  >
                    {transaction.type === 'credit' ? '+' : '-'} ${transaction.amount.toFixed(2)}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="flex justify-center mt-8">
          <Pagination
            itemsPerPage={paymentsPerPage}
            totalItems={sortedPayments.length}
            currentPage={currentPage}
            paginate={paginate}
            prevIcon={<FiChevronLeft className="text-indigo-800 text-2xl" />}
            nextIcon={<FiChevronRight className="text-indigo-800 text-2xl" />}
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
