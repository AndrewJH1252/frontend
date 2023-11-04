import React from 'react';
import { MdSort } from 'react-icons/md'; // Import the MdSort icon

const SortOptions = ({ onSort }) => {
  return (
    <div className="mb-4">
    <label className="text-gray-700 font-semibold flex items-center">
      <MdSort className="inline-block mr-2 text-blue-700 text-2xl" /> Sort:
    </label>
    <select
      className="block w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
      onChange={(e) => onSort(e.target.value)}
    >
      <option value="newest">Newest</option>
      <option value="oldest">Oldest</option>
    </select>
  </div>
  
  );
};

export default SortOptions;
