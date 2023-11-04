import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BiChevronLeft, BiChevronRight, BiSort } from 'react-icons/bi';
import ReviewCard from './ReviewCard';
import { fetchCourseReviews} from '../../redux/Thunks/reviewThunk';
import Pagination from '../common/pagination';

const ReviewSection = ({ courseId }) => {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews.reviews);
  const userRole = useSelector((state) => state.auth.userRole);
  const [sortBy, setSortBy] = useState('newest');
  const reviewsPerPage = 18;
  const [currentPage, setCurrentPage] = useState(1);
  const [reloadRequests, setReloadRequests] = useState(true);

  useEffect(() => {
    // Fetch requests when the page loads or when reloadRequests is true
    if (reloadRequests) {
      dispatch(fetchCourseReviews(courseId));
      setReloadRequests(false); // Reset reloadRequests
    }
  }, [dispatch, reloadRequests, courseId]);


  const sortedReviews = [...reviews];
  sortedReviews.sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.date) - new Date(a.date);
    if (sortBy === 'oldest') return new Date(a.date) - new Date(b.date);
    if (sortBy === 'helpful') return b.helpfulCount - a.helpfulCount;
  });

  const lastReviewIndex = currentPage * reviewsPerPage;
  const firstReviewIndex = lastReviewIndex - reviewsPerPage;
  const currentReviews = sortedReviews.slice(firstReviewIndex, lastReviewIndex);

  const handleSortChange = (option) => {
    setSortBy(option);
    setCurrentPage(1);
  };

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage);
  };

  return (
<div className="bg-gray-100 min-h-screen p-6">
  <div className="mb-6 flex flex-col md:flex-row items-center justify-between">
    <h2 className="text-blue-800 text-4xl font-bold mb-4 md:mb-0">Course Reviews</h2>
    <div className="flex items-center space-x-4">
      <span className="text-blue-600 font-semibold">Sort by:</span>
      <div className="relative inline-block">
        <select
          value={sortBy}
          onChange={(e) => handleSortChange(e.target.value)}
          className="px-4 py-2 pr-10 bg-white rounded-lg border border-blue-400 focus:outline-none focus:ring focus:border-blue-500 text-blue-800 font-medium shadow-md hover:border-blue-500 hover:ring hover:ring-blue-200 hover:shadow-lg transition duration-300"
        >
          <option value="newest" className="text-blue-800">Newest</option>
          <option value="oldest" className="text-blue-800">Oldest</option>
          <option value="helpful" className="text-blue-800">Helpful</option>
        </select>
      </div>
    </div>
  </div>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
    {currentReviews.map((review) => (
      <ReviewCard
        key={review.id}
        review={review}
        courseId={courseId}
        userRole={userRole}
        setReloadRequests={setReloadRequests} // Pass the function here
      />
    ))}
  </div>
  <div className="mt-8 flex justify-center">
    <Pagination
      itemsPerPage={reviewsPerPage}
      totalItems={sortedReviews.length}
      currentPage={currentPage}
      onPageChange={handlePageChange}
      prevIcon={<BiChevronLeft className="text-3xl text-blue-400" />}
      nextIcon={<BiChevronRight className="text-3xl text-blue-400" />}
    />
  </div>
</div>

  );
};

export default ReviewSection;
