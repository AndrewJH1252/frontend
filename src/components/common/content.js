import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWebsiteStatistics } from '../../redux/Thunks/statisticsThunk'; // Import the fetchWebsiteStatistics action

const Content = () => {
  // Set initial data
  const initialData = {
    totalStudents: 0,
    totalTutors: 0,
    totalCourses: 0,
    totalRequests: 0,
    quote: "Education is the most powerful weapon which you can use to change the world.",
  };

  // Redux dispatch
  const dispatch = useDispatch();

  // Get the real data from Redux
  const totalStudents = useSelector((state) => state.statistics.totalStudents);
  const totalTutors = useSelector((state) => state.statistics.totalTutors);
  const totalCourses = useSelector((state) => state.statistics.totalCourses);
  const totalRequests = useSelector((state) => state.statistics.totalRequests);

  // State to manage loading
  const [loading, setLoading] = useState(true);

  // Use effect to fetch data from Redux
  useEffect(() => {
    dispatch(fetchWebsiteStatistics())
      .then(() => {
        // Data is now available, set loading to false
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching website statistics:', error);
        setLoading(false); // Set loading to false even if there's an error
      });
  }, [dispatch]);

  // Format the numbers with appropriate signs (e.g., 100+ for hundreds, 1k for thousands, etc.)
  const formatNumber = (number) => {
    if (number >= 1e6) return (number / 1e6).toFixed(1) + 'm';
    if (number >= 1e3) return (number / 1e3).toFixed(1) + 'k';
    if (number >= 1) return number + '+';
    return number;
  };

  // Set the data to use based on loading state
  const data = loading
    ? initialData // Show initial data while waiting for Redux data
    : {
        totalStudents,
        totalTutors,
        totalCourses,
        totalRequests,
        quote: "Education is the most powerful weapon which you can use to change the world.",
      };
  return (
    <div className="container mt-5 mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4 text-center">Website Statistics</h2>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-300 rounded-lg shadow-lg p-6 cursor-pointer transition-colors duration-300 hover:bg-blue-400">
          <h3 className="text-xl font-semibold mb-2 text-center">Total Students Enrolled</h3>
          <p className="text-white text-2xl font-bold text-center">
            {loading ? formatNumber(initialData.totalStudents) : formatNumber(data.totalStudents)}
          </p>
        </div>
        <div className="bg-purple-300 rounded-lg shadow-lg p-6 cursor-pointer transition-colors duration-300 hover:bg-purple-400">
          <h3 className="text-xl font-semibold mb-2 text-center">Total Number of Tutors</h3>
          <p className="text-white text-2xl font-bold text-center">
            {loading ? formatNumber(initialData.totalTutors) : formatNumber(data.totalTutors)}
          </p>
        </div>
        <div className="bg-green-300 rounded-lg shadow-lg p-6 cursor-pointer transition-colors duration-300 hover:bg-green-400">
          <h3 className="text-xl font-semibold mb-2 text-center">Total Number of Courses</h3>
          <p className="text-white text-2xl font-bold text-center">
            {loading ? formatNumber(initialData.totalCourses) : formatNumber(data.totalCourses)}
          </p>
        </div>
        <div className="bg-yellow-300 rounded-lg shadow-lg p-6 cursor-pointer transition-colors duration-300 hover:bg-yellow-400">
          <h3 className="text-xl font-semibold mb-2 text-center">Total Number of Requests</h3>
          <p className="text-white text-2xl font-bold text-center">
            {loading ? formatNumber(initialData.totalRequests) : formatNumber(data.totalRequests)}
          </p>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-lg italic">{data.quote}</p>
      </div>
    </div>
  );
};

export default Content;
