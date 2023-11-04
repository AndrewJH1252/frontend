import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BiEdit, BiTrash } from 'react-icons/bi';
import { FiThumbsUp } from 'react-icons/fi';
import { updateReview, deleteReview, markReviewAsHelpful } from '../../redux/Thunks/reviewThunk';

const ReviewCard = ({ review, courseId, setReloadRequests }) => {
  const user = useSelector((state) => state.auth.profile);
  const userRole = useSelector((state) => state.auth.userRole);
  const dispatch = useDispatch();

  const isStudent = userRole === 'student';
  const isTutor = userRole === 'tutor';
  const isReviewOwner = user._id === review.ReviewerId;

  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [updatedReviewContent, setUpdatedReviewContent] = useState(review.review);

  const handleUpdateReview = () => {
    dispatch(updateReview({ reviewId: review._id, updatedReview: updatedReviewContent }));
    setReloadRequests(true);
    setEditing(false);
  };

  const handleDeleteReview = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this review?');

    if (confirmDelete) {
      dispatch(deleteReview({ reviewId: review._id }));
      setReloadRequests(true);
    }
  };

  const handleMarkAsHelpful = () => {
    dispatch(markReviewAsHelpful({ reviewId: review._id }));
    setReloadRequests(true);
  };

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  const toggleEditing = () => {
    setEditing(!editing);
  };

  const reviewContent = expanded ? review.review : review.review.slice(0, 100); // Show first 100 characters by default

  return (
    <div className="bg-blue-50 p-4 md:p-6 lg:p-8 rounded-lg shadow-md mb-4 hover:bg-blue-100 transition duration-300 transform hover:scale-105">
      <div className="flex justify-between items-center">
        <h3 className="text-lg md:text-xl lg:text-2xl font-semibold mb-2">{review.title}</h3>
      </div>
      {editing ? (
        <textarea
          className="w-full p-2 border rounded-lg"
          value={updatedReviewContent}
          onChange={(e) => setUpdatedReviewContent(e.target.value)}
        />
      ) : (
        <div className="review-content">
          <div
            className={`text-gray-600 text-sm md:text-base lg:text-lg mb-4 ${expanded ? '' : 'max-h-28 overflow-y-hidden'}`}
            dangerouslySetInnerHTML={{ __html: reviewContent }}
          />
          {review.review.length > 100 && (
            <button
              className="text-blue-500 hover:text-blue-600 hover:underline transition duration-300 cursor-pointer"
              onClick={toggleExpansion}
            >
              {expanded ? 'Read Less' : 'Read More'}
            </button>
          )}
        </div>
      )}

      <div className="flex justify-between items-center mt-3">
        {isReviewOwner && (
          <div className="flex items-center space-x-4">
            {editing ? (
             <button
             className="text-blue-500 hover:text-blue-600 hover:underline cursor-pointer border rounded-lg border-blue-500 py-1 px-3 bg-blue-100 hover:bg-blue-200 transition duration-300"
             onClick={handleUpdateReview}
           >
             Update
           </button>
           
            ) : (
              <BiEdit
                className="text-lg text-gray-600 cursor-pointer hover:text-yellow-600 transition duration-300"
                onClick={toggleEditing}
              />
            )}
            <BiTrash
              className="text-lg text-gray-600 cursor-pointer hover:text-red-500 transition duration-300"
              onClick={handleDeleteReview}
            />
          </div>
        )}
        {(isStudent || isTutor) && (
          <div className="flex items-center">
            <FiThumbsUp
              className={`text-gray-600 cursor-pointer ${review.isHelpful ? 'text-blue-500' : ''} hover:text-orange-500 transition duration-300`}
              onClick={handleMarkAsHelpful}
            />
            <span className="ml-1 text-gray-600 text-sm md:text-base lg:text-lg">
              {review.helpfulCount}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewCard;
