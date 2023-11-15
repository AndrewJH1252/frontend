import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchReviewsForCourses } from '../../redux/Thunks/reviewThunk';
import ReviewCard from '../review/ReviewCard';
import Pagination from '../common/pagination';
import { FiArrowDown, FiArrowUp, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Logo from '../../images/logo.png';

const Review = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;

  const [sortBy, setSortBy] = useState('newest');

  const reviews = useSelector((state) => state.reviews.courseReviews);
  const courses = useSelector((state) => state.auth.profile.coursesCreated);

  useEffect(() => {
    // Fetch reviews for the user's courses when courses change
    if (courses.length > 0) {
      dispatch(fetchReviewsForCourses(courses));
    }
  }, [dispatch, courses]);

  const sortReviews = (a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    if (sortBy === 'newest') {
      return dateB - dateA;
    } else {
      return dateA - dateB;
    }
  };

  const sortedReviews = [...reviews].sort(sortReviews);

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = sortedReviews.slice(indexOfFirstReview, indexOfLastReview);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(1); // Reset pagination when sorting option changes
  };

  return (
    <div className="bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900 min-h-screen p-4">
    <header className="m-6">
      <a href="https://tutorium.onrender.com/tutor-dashboard" className="flex items-center hover:opacity-80 transition-opacity">
        <img src={Logo} alt="My Logo" className="w-28 sm:w-30 h-12 mr-4 sm:mr-8 mb-3" />
      </a>
    </header>
    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-10 rounded-lg bg-white bg-opacity-90 shadow-xl">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-blue-800">Reviews</h2>
        <div className="flex items-center mb-2 space-x-2">
          <label htmlFor="sort" className="text-gray-600">
            Sort by:
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={handleSortChange}
            className="border border-gray-300 rounded-md px-2 py-1 bg-white text-blue-800 focus:outline-none focus:ring focus:border-blue-500"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-5 mt-5">
        {currentReviews.map((review) => (
          <div key={review.id}>
            <ReviewCard review={review} />
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <Pagination
          itemsPerPage={reviewsPerPage}
          totalItems={sortedReviews.length}
          currentPage={currentPage}
          paginate={paginate}
          prevIcon={<FiChevronLeft className="text-2xl text-gray-600" />}
          nextIcon={<FiChevronRight className="text-2xl text-gray-600" />}
        />
      </div>
    </div>
  </div>
  
  
  );
};

export default Review;
