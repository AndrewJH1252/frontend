import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Pagination = ({ itemsPerPage, totalItems, currentPage, paginate }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Calculate the start and end page numbers to display
  let startPage, endPage;
  if (totalPages <= 6) {
    // Less than 6 pages, display all
    startPage = 1;
    endPage = totalPages;
  } else {
    // More than 6 pages, calculate start and end pages
    if (currentPage <= 4) {
      startPage = 1;
      endPage = 6;
    } else if (currentPage + 2 >= totalPages) {
      startPage = totalPages - 5;
      endPage = totalPages;
    } else {
      startPage = currentPage - 3;
      endPage = currentPage + 2;
    }
  }

  // Generate an array of page numbers to display
  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <nav className="flex justify-center mt-6">
      <ul className="pagination flex items-center space-x-2">
        {currentPage > 1 && (
          <li className="page-item">
            <button
              onClick={() => paginate(currentPage - 1)}
              className="page-link focus:outline-none focus:ring focus:border-blue-300 p-2 rounded-full hover:bg-blue-100 transition-colors duration-200"
            >
              <FiChevronLeft className="w-4 h-4" />
            </button>
          </li>
        )}

        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${currentPage === number ? 'active' : ''}`}
          >
            <button
              onClick={() => paginate(number)}
              className={`page-link focus:outline-none focus:ring focus:border-blue-300 p-2 rounded-full ${
                currentPage === number ? 'bg-blue-500 text-white' : 'text-blue-500 hover:bg-blue-100 transition-colors duration-200'
              }`}
            >
              {number}
            </button>
          </li>
        ))}

        {currentPage < totalPages && (
          <li className="page-item">
            <button
              onClick={() => paginate(currentPage + 1)}
              className="page-link focus:outline-none focus:ring focus:border-blue-300 p-2 rounded-full hover:bg-blue-100 transition-colors duration-200"
            >
              <FiChevronRight className="w-4 h-4" />
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
