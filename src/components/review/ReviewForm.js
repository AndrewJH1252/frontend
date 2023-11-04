import React, { useState } from 'react';
import {useDispatch } from 'react-redux';
import { BiStar } from 'react-icons/bi';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { submitReview } from '../../redux/Thunks/reviewThunk';
import { IoCloseCircleSharp } from 'react-icons/io5';

const ReviewForm = ({ courseId, onClose }) => {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();

  const handleReviewSubmit = async () => {
    if (rating > 0 && reviewText.trim() !== '') {
      try {
        await dispatch(submitReview({ courseId, review: reviewText, rating }));
        setRating(0);
        setReviewText('');
        onClose();
        window.location.reload();
      } catch (error) {
        console.error('Error submitting review:', error.message);
      }
    }
  };
  
  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
        <div className="w-full md:w-2/3 lg:w-1/2 bg-white p-6 rounded-lg shadow-md relative">
          <button
            className="absolute top-2 right-2 text-red-500 hover:text-red-800 transition duration-300"
            onClick={onClose}
          >
            <IoCloseCircleSharp size={24} />
          </button>
          <h2 className="text-2xl font-bold mb-4">Write a Review</h2>
  
          <div className="flex items-center mb-6">
            <span className="text-gray-600 mr-2">Your Rating:</span>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <BiStar
                  key={value}
                  className={`cursor-pointer text-yellow-500 text-2xl ${
                    rating >= value ? 'text-yellow-500' : 'text-gray-400'
                  }`}
                  onClick={() => setRating(value)}
                />
              ))}
            </div>
            <span className="ml-2 text-gray-600">
              {rating > 0 ? `You've rated ${rating} stars.` : 'Select a rating'}
            </span>
          </div>
  
          <ReactQuill value={reviewText} onChange={setReviewText} placeholder="Write your review here..." />
  
          <div className="flex justify-end mt-4">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
              onClick={handleReviewSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
  
    {rating === 0 && (
      <button
        className="fixed bottom-4 right-4 text-gray-500 hover:text-gray-800 bg-white rounded-full p-3"
        onClick={() => setRating(1)}
      >
        <span className="text-2xl">+</span>
      </button>
    )}
  </div>
  
  );
};

export default ReviewForm;
