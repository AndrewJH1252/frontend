import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTutors } from '../../redux/Thunks/userThunk';
import TutorCard from '../tutor/TutorCard';
import Pagination from '../common/pagination';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import Logo from '../../images/logo.png';
import Search from './Search';
import Filter from './filter';

const TutorPage = () => {
  const dispatch = useDispatch();
  const tutors = useSelector((state) => state.user.tutors);

  const [currentPage, setCurrentPage] = useState(1);
  const tutorsPerPage = 10;

  useEffect(() => {
    dispatch(fetchTutors());
  }, [dispatch]);

  const indexOfLastTutor = currentPage * tutorsPerPage;
  const indexOfFirstTutor = indexOfLastTutor - tutorsPerPage;
  const currentTutors = tutors.slice(indexOfFirstTutor, indexOfLastTutor);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 to-teal-800 p-5">

    <div className="container mx-auto p-4">
      <div className="flex items-center hover:opacity-80 transition-opacity">
      <a href="/Main" className="flex items-center hover:opacity-80 transition-opacity">
        <img src={Logo} alt="My Logo" className="w-30 h-12 mr-8 mb-3" />
      </a>
      </div>
      <div className="text-center mb-8">
        <h2 className="text-4xl font-extrabold tracking-tight text-white">Find Tutors</h2>
        <p className="text-lg mt-2 font-semibold text-gray-100">Explore and connect with qualified tutors in your area.</p>
      </div>
      <div className='flex'>
        <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/5 p-4 bg-transparent rounded-lg ">
          <div className="mb-5">
            <Search />
          </div>
          <div>
            <Filter />
          </div>
        </div>
  
        {/* Right Side: Tutor Cards */}
        <div className="w-3/4 ml-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
            {currentTutors.map((tutor) => (
              <TutorCard key={tutor._id} tutor={tutor} />
            ))}
          </div>
  
          <Pagination
            itemsPerPage={tutorsPerPage}
            totalItems={tutors.length}
            currentPage={currentPage}
            paginate={paginate}
            prevIcon={<FiChevronLeft className="text-purple-500 text-xl" />}
            nextIcon={<FiChevronRight className="text-purple-500 text-xl" />}
          />
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default TutorPage;
