import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudentRequests, fetchTutorRequests, deleteAllRequests,deleteRequestById } from '../../redux/Thunks/requestsThunk';
import RequestFilter from './RequestFilter';
import RequestCard from './RequestCard';
import Pagination from '../common/pagination';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaTrashAlt } from 'react-icons/fa';
import Logo from '../../images/logo.png';

const RequestsPage = () => {
  const dispatch = useDispatch();
  const requests = useSelector((state) => state.requests.requests);
  const isStudent = useSelector((state) => state.auth.userRole === 'student');
  const isTutor = useSelector((state) => state.auth.userRole === 'tutor');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // Display 12 requests per page
  const [filters, setFilters] = useState({
    type: 'all',
    urgency: 'all',
    duration: 'all', // Add duration filter
  });

  const [reloadRequests, setReloadRequests] = useState(true); // Set to true initially

  useEffect(() => {
    // Fetch requests when the page loads or when reloadRequests is true
    if (reloadRequests) {
      // Determine which thunk action to dispatch based on the user's role
      if (isStudent) {
        dispatch(fetchStudentRequests());
      } else if (isTutor) {
        dispatch(fetchTutorRequests());
      }

      setReloadRequests(false); // Reset reloadRequests
    }
  }, [dispatch, reloadRequests, isStudent, isTutor]);

  const handleDeleteAllRequests = () => {
    const confirmed = window.confirm("Are you sure you want to delete all requests?");
    if (confirmed) {
      dispatch(deleteAllRequests());
      setReloadRequests(true); // Trigger a reload after deletion
    }
  };
  
  const handleDeleteRequest = (requestId) => {
    const confirmed = window.confirm("Are you sure you want to delete this request?");
    if (confirmed) {
      dispatch(deleteRequestById(requestId));
      setReloadRequests(true);
    }
  };
  

  const filteredRequests = requests.filter((request) => {
    if (filters.type !== 'all' && request.type !== filters.type) {
      return false;
    }
    if (filters.urgency !== 'all' && request.urgency !== filters.urgency) {
      return false;
    }
    // Assuming filters.duration is a string like "min-max"
    if (filters.duration !== 'all') {
      const [minRange, maxRange] = filters.duration.split('-').map((range) => range.split('-')[0]).map(Number);
      const requestDuration = request.duration;
    
      if (isNaN(minRange) || isNaN(maxRange)) {
        return false;
      }
    
      // Assuming requestDuration is in minutes (as per your filter options)
      if (requestDuration < minRange || requestDuration >= maxRange) {
        return false;
      }
    }
    
    return true;
  });

  const indexOfLastRequest = currentPage * itemsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - itemsPerPage;
  const currentRequests = filteredRequests.slice(indexOfFirstRequest, indexOfLastRequest);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  

  return (
   <div className="bg-gradient-to-br from-teal-900 to-blue-900 min-h-screen p-8">
    <a href="https://tutorium.onrender.com/Main" className="flex items-center hover:opacity-80 transition-opacity">
    <img src={Logo} alt="My Logo" className="w-30 h-12 mr-8 mb-8" />
 
  </a>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="px-5">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-semibold text-indigo-800">Requests</h2>
            <button
              className="text-white font-bold rounded-full focus:outline-none focus:shadow-outline"
              onClick={handleDeleteAllRequests}
              title="Delete All"
            >
              <FaTrashAlt className="text-2xl text-red-400 hover:text-red-700 transition duration-300" />
            </button>
          </div>

          <RequestFilter filters={filters} setFilters={setFilters} />

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {currentRequests.map((request) => (
              <RequestCard
                key={request._id}
                request={request}
                onDelete={handleDeleteRequest}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={filteredRequests.length}
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

export default RequestsPage;
