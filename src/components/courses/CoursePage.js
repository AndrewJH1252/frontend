import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchCourseById } from '../../redux/Thunks/courseThunk';
import { clearCurriculumData } from '../../redux/Thunks/courseCreationThunk';
import CourseDetails from './CourseDetails';
import LoadingSpinner from '../common/LoadingSpinner';
import ReviewSection from '../review/ReviewSection';
import { addToCart } from '../../redux/Thunks/cartThunk';
import ReviewForm from '../review/ReviewForm';
import { useNavigate } from 'react-router-dom';

const CoursePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const course = useSelector(state => state.course.course);
  const cart = useSelector((state) => state.cart.items);
  const isLoading = useSelector(state => state.course.isLoading);
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const isCourseAlreadyInCart = cart.some(item => item._id === id);
  const [updateTrigger, setUpdateTrigger] = useState(false);
  

  useEffect(() => {
    // Clear the curriculum data when the component unmounts
    return () => {
      dispatch(clearCurriculumData());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCourseById(id));
  }, [dispatch, id]);
  

  const handleAddToCart = () => {
    if (isCourseAlreadyInCart) {
      // Handle course already in the cart notification
      // You can show a toast or message here
      alert('This course is already in your cart.');
    } else {
      dispatch(addToCart(course._id));
      // Handle course added to cart successfully notification
      // You can show a success toast or message here
      alert('Course added to cart successfully.');
      
      // Navigate to the main page
      navigate('/Main');
    }
  };

  const handleOpenReviewForm = () => {
    setIsReviewFormOpen(true);
  };

  const handleCloseReviewForm = () => {
    setIsReviewFormOpen(false);
  };

  return (
  
      <div className="w-full mx-auto ">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
          {/* ... previous code ... */}
        </div>
          
          {isLoading ? (
            <LoadingSpinner />
          ) : course ? (
            <>
               <CourseDetails
              course={course}
              handleAddToCart={handleAddToCart} // Pass handleAddToCart as a prop
              handleOpenReviewForm={handleOpenReviewForm} // Pass handleOpenReviewForm as a prop
            />

              {isReviewFormOpen && (
                <ReviewForm courseId={id} onClose={handleCloseReviewForm} />
              )}

            <div className="mt-8">
              <ReviewSection reviews={course.reviews} courseId={course._id || []} />
            </div>

            </>
          ) : (
            <p className="text-center text-gray-500">Course not found</p>
          )}
        </div>
      </div>

  );
};

export default CoursePage;
