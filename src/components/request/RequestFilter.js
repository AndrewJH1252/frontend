import React, { useState } from 'react';
import { FiFilter } from 'react-icons/fi'; // Import icons for filtering

const RequestFilter = ({ filters, setFilters }) => {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // State to control the visibility of the filter section
  const [isFilterOpen, setIsFilterOpen] = useState(true);

  // Function to toggle the filter section's visibility
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="mb-4">
    <div className="border-b border-gray-300 pb-2 mb-2">
      <h2 className="text-xl font-semibold mb-2 flex items-center">
        <button
          className="text-blue-500 hover:text-blue-700 focus:outline-none"
          onClick={toggleFilter}
        >
          <FiFilter className={`mr-2 text-xl ${isFilterOpen ? 'rotate-0' : 'rotate-180'}`} />
        </button>
        Filter
      </h2>
    </div>
    <div className={`transition-all ${isFilterOpen ? 'max-h-0 overflow-hidden' : 'max-h-full'} duration-300 ease-in-out`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Type:</label>
          <select
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
            className="w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
          >
            <option value="all">All Types</option>
            <option value="hire">Hire</option>
            <option value="meetup">Meetup</option>
            {/* Add more type options as needed */}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Urgency:</label>
          <select
            name="urgency"
            value={filters.urgency}
            onChange={handleFilterChange}
            className="w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
          >
            <option value="all">All Urgencies</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Duration:</label>
          <select
            name="duration"
            value={filters.duration}
            onChange={handleFilterChange}
            className="w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
          >
            <option value="all">All Durations</option>
            <option value="0.5-1">30-60 min</option>
            <option value="1-1.5">60-90 min</option>
            <option value="1.5-2">90-120 min</option>
            <option value="2.5-3+">120-150+ min</option>
            {/* Add more duration options as needed */}
          </select>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default RequestFilter;
