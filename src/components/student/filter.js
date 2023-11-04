import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { filterTutors } from '../../redux/Thunks/userThunk';
import { FaStar } from 'react-icons/fa';

const Filter = () => {
  const dispatch = useDispatch();

  const [location, setLocation] = useState('');
  const [availability, setAvailability] = useState('');
  const [minHourlyRate, setMinHourlyRate] = useState('');
  const [maxHourlyRate, setMaxHourlyRate] = useState('');
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    dispatch(
      filterTutors({
        location,
        availability,
        minHourlyRate,
        maxHourlyRate,
        averageRating,
      })
    );
  }, [dispatch, location, availability, minHourlyRate, maxHourlyRate, averageRating]);

  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Filter Tutors</h2>
      <div className="mb-4">
        <label htmlFor="location" className="block text-gray-700 mb-2">
          Location:
        </label>
        <input
          type="text"
          id="location"
          className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="availability" className="block text-gray-700 mb-2">
          Availability:
        </label>
        <select
          id="availability"
          className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
        >
          <option value="">Any</option>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Flexible">Flexible</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="minHourlyRate" className="block text-gray-700 mb-2">
          Min Hourly Rate:
        </label>
        <input
          type="number"
          id="minHourlyRate"
          className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          value={minHourlyRate}
          onChange={(e) => setMinHourlyRate(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="maxHourlyRate" className="block text-gray-700 mb-2">
          Max Hourly Rate:
        </label>
        <input
          type="number"
          id="maxHourlyRate"
          className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          value={maxHourlyRate}
          onChange={(e) => setMaxHourlyRate(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="averageRating" className="block text-gray-700 mb-2">
          Average Rating:
        </label>
        <div className="flex items-center text-xl gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              className={star <= averageRating ? 'text-yellow-400 ' : 'text-gray-300 '}
              onClick={() => setAverageRating(star)}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-center items-center">
        <button
          className="bg-blue-500  px-7 text-white p-2 rounded hover:bg-blue-600"
          onClick={() => {
            dispatch(
              filterTutors({
                location,
                availability,
                minHourlyRate,
                maxHourlyRate,
                averageRating,
              })
            );
          }}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default Filter;
