import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoStar, IoClose } from 'react-icons/io5';
import { submitTutorRating } from '../../redux/Thunks/ratingThunk';

const RatingForm = ({ tutorId, onClose }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.profile);
  const [tutorRating, setTutorRating] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleRatingSubmit = () => {
    // Clear any previous messages
    setErrorMessage('');
    setSuccessMessage('');

    if (tutorRating === 0) {
      setErrorMessage('Please select a rating before submitting.');
      return;
    }

    if (tutorId === user._id) {
      setErrorMessage("You can't rate your own page.");
      return;
    }

    dispatch(submitTutorRating({ tutorId, tutorRating }))
      .then(() => {
        setSuccessMessage('Rating submitted successfully!');
        onClose(); // Close the form after submitting the rating
        
      })
      .catch((error) => {
        // Handle errors from the API, including multiple ratings
        if (error.response && error.response.status === 400) {
          setErrorMessage(error.response.data.error);
        } else {
          setErrorMessage('Failed to submit your rating. Please try again later.');
        }
      });
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <IoStar
          size={24}
          key={i}
          className={`text-yellow-500 ${
            i <= rating ? 'fill-current' : 'fill-current opacity-30'
          }`}
          onClick={() => setTutorRating(i)}
        />
      );
    }
    return stars;
  };


  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
      <div className="bg-white p-6 sm:p-10 w-full max-w-md relative rounded-lg shadow-lg">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">Submit Your Tutor Rating</h2>
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-600"
          onClick={onClose}
        >
          <IoClose size={24} />
        </button>
        <div className="flex items-center space-x-4 mb-6">
          <p className="text-gray-600">Rate this tutor:</p>
          {renderStars(tutorRating)}
        </div>
        {errorMessage && (
          <p className="text-red-500 mb-4">{errorMessage}</p>
        )}
        {successMessage && (
          <p className="text-green-500 mb-4">{successMessage}</p>
        )}
        <div className="flex justify-between items-center">
          <p className="text-gray-600">Your Rating:</p>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            onClick={handleRatingSubmit}
            disabled={tutorRating === 0}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default RatingForm;
