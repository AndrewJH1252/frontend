import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { AiOutlineUpload } from 'react-icons/ai';
import { storeCourseDetails} from '../../../redux/slice/courseCreationSlice';
import {fetchCurriculumData} from '../../../redux/Thunks/courseCreationThunk';
import { fetchCategories } from '../../../redux/Thunks/categoriesThunk';
import { fetchCourseById } from '../../../redux/Thunks/courseThunk'; 
import { useLocation, useNavigate } from 'react-router-dom';

const CreateCourse = ({nextStep }) => {
  const location = useLocation();
  const categories = useSelector(state => state.categories.categories); // Assuming categories are fetched using the categoriesThunk
  const edit = new URLSearchParams(location.search).get('edit');
  const courseId = edit;
  
  const navigate = useNavigate();
  const levelOptions = ['Beginner', 'Intermediate', 'Advanced'];
  const topCurrencies = ['USD', 'EUR', 'JPY', 'GBP', 'AUD'];
  const [imageLink, setImageLink] = useState('');
  const isEdit = courseId ? true : false;
  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [categoryError, setCategoryError] = useState('');
  const [priceError, setPriceError] = useState('');
  const [currencyError, setCurrencyError] = useState('');
  const [durationError, setDurationError] = useState('');
  const [levelError, setLevelError] = useState('');
  const [imageError, setImageError] = useState('');
  const [includesError, setIncludesError] = useState('');
  const [isPaidError, setIsPaidError] = useState('');

  const dispatch = useDispatch();


  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    category: '', // Use a dropdown/select to choose category
    price: 0,
    currency: '', // Use a dropdown/select to choose currency
    duration: 0,
    level: '', // Use a dropdown/select to choose level
    image: '', // File upload logic here
    includes: '',
    isPaid: false,
    curriculum: [
      {
        topicName: '',
        topicDescription: '',
        lessons: [
          {
            lessonTitle: '',
            lessonMedia: '', // File upload logic here
            lessonDuration: 0,
            lessonContent: '',
            isPaid: false, // Add the isPaid field with an initial value of false
          }
        ],
      },
    ],
    
    
  });

  useEffect(() => {
  const fetchCourseData = async () => {
    if (isEdit) {
      try {
        // Fetch course data only when in edit mode
        const response = await dispatch(fetchCourseById(courseId));
        const fetchedCourseData = response.payload; // Assuming response contains course data

        // Update the courseData state with the fetched data
        setCourseData(fetchedCourseData);
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    }
  };

  fetchCourseData();
  dispatch(fetchCurriculumData(courseId))
  dispatch(fetchCategories());
}, [dispatch, isEdit, courseId]);



 
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
  
    if (!file) {
      // No file selected, try to use image link
      if (imageLink) {
        // Verify the image link
        try {
          const response = await fetch(imageLink);
  
          if (response.ok) {
            // If the response status is OK, set the image link
            setCourseData({ ...courseData, image: imageLink });
          } else {
            console.log('Image link is not valid.');
          }
        } catch (error) {
          console.error('Error while verifying image link:', error);
        }
      }
      return;
    }
  
    // Validate file type (e.g., accept only image files)
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      // Invalid file type
      console.log('Invalid file type. Please select an image.');
      return;
    }
  
    // Optionally, you can check for file size limits here
    // Assuming you have an image upload logic, you can update the state here
    const reader = new FileReader();
    reader.onload = (e) => {
      setCourseData({ ...courseData, image: e.target.result });
    };
    reader.readAsDataURL(file);
  };
  
  
  const maxTitleLength = 60;

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    if (newTitle.length <= maxTitleLength) {
      setCourseData({ ...courseData, title: newTitle });
      setTitleError(''); // Clear the error when the user starts typing again
    } else {
      setTitleError('Title is required and should be less than 60 characters.');
    }
  }
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Reset error states
    setTitleError('');
    setDescriptionError('');
    setCategoryError('');
    setPriceError('');
    setCurrencyError('');
    setDurationError('');
    setLevelError('');
    setImageError('');
    setIncludesError('');
    setIsPaidError('');
  
    try {
      if (!courseData.title || courseData.title.length > 60) {
        setTitleError('Title is required and should be less than 60 characters.');
        return;
      }
      if (!courseData.description) {
        setDescriptionError('Description is required.');
        return;
      }
      if (!courseData.category) {
        setCategoryError('Category is required.');
        return;
      }
      if (courseData.price < 0) {
        setPriceError('Price should be a positive number.');
        return;
      }
      if (!courseData.currency) {
        setCurrencyError('Currency is required.');
        return;
      }
      if (courseData.duration <= 0) {
        setDurationError('Duration should be a positive number.');
        return;
      }
      if (!courseData.level) {
        setLevelError('Level is required.');
        return;
      }
      if (!courseData.image) {
        setImageError('Image is required.');
        return;
      }
  
      if (courseData.isPaid && courseData.price <= 0) {
        setIsPaidError('Price is required for a paid course.');
        return;
      }
  
      
      if (isEdit) {
        // Editing an existing course, include the id in the payload
        await dispatch(storeCourseDetails({ ...courseData, id: courseId }));
      } else {
        // Creating a new course, exclude id from courseData
        const { id, ...newCourseData } = courseData;
        await dispatch(storeCourseDetails(newCourseData));
      }

      nextStep();
    } catch (error) {
      console.error('An error occurred while submitting the form:', error);
      // Handle error, show error message, etc.
    }
  };

  
  
  // Handlers for form and data updates

  return (
    <div className="flex flex-col items-center justify-center mt-5 bg-gray-100">
        <div className="max-w-5xl w-full mx-auto p-6 bg-white rounded shadow">
          <h2 className="text-2xl font-semibold mb-8 text-center text-gray-800">
            Create a New Course
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Title */}
            <div className="flex flex-col">
              <label htmlFor="title" className="mb-2 text-gray-700">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={courseData.title}
                onChange={handleTitleChange}
                maxLength={maxTitleLength}
                className="px-4 py-3 rounded border-gray-300 focus:ring focus:ring-blue-200"
                placeholder="Enter course title"
              />
              <p className="mt-1 text-sm text-gray-500">
                {maxTitleLength - courseData.title.length} characters remaining
              </p>
              <p className="mt-1 text-sm text-red-500">
              {titleError}
            </p>
            </div>

            {/* Description */}
            <div className="flex flex-col">
              <label htmlFor="description" className="mb-2 text-gray-700">
                Description
              </label>
              <ReactQuill
                id="description"
                className="rounded border-gray-300 focus:ring focus:ring-blue-200"
                value={courseData.description}
                onChange={(value) => setCourseData({ ...courseData, description: value })}
              />
              <p className="mt-1 text-sm text-red-500">
              {descriptionError}
            </p>
            </div>

            {/* Category */}
            <div className="flex flex-col">
              <label htmlFor="category" className="mb-2 text-gray-700">
                Category
              </label>
              <select
                id="category"
                className="px-4 py-3 rounded border-gray-300 focus:ring focus:ring-blue-200"
                value={courseData.category}
                onChange={(e) => setCourseData({ ...courseData, category: e.target.value })}
                required
              >
                 <p className="mt-1 text-sm text-red-500">
              {categoryError}
            </p>
                <option value="" disabled>Select a category</option>
                {categories.map(category => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
      
            </div>


          {/* Currency */}
         {/* Currency */}
          <div className="flex flex-col">
            <label htmlFor="currency" className="mb-2 text-gray-700">
              Currency
            </label>
            <select
              id="currency"
              className="px-4 py-3 rounded border-gray-300 focus:ring focus:ring-blue-200"
              value={courseData.currency}
              onChange={(e) => setCourseData({ ...courseData, currency: e.target.value })}
              required
            >
               <p className="mt-1 text-sm text-red-500">
              {currencyError}
            </p>
              <option value="" disabled>Select a currency</option>
              {topCurrencies.map(currency => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>

          </div>

          {/* Price */}
          <div className="flex flex-col">
            <label htmlFor="price" className="mb-2 text-gray-700">
              Price
            </label>
            <input
              type="number"
              id="price"
              className="px-4 py-3 rounded border-gray-300 focus:ring focus:ring-blue-200"
              value={courseData.price}
              onChange={(e) => setCourseData({ ...courseData, price: e.target.value })}
              min="0" // Ensure a positive value
              step="0.01" // Allow decimal values
              required // Mark as required
            />
            <p className="mt-1 text-sm text-red-500">
              {priceError}
            </p>
          </div>

          {/* Duration */}
          <div className="flex flex-col">
            <label htmlFor="duration" className="mb-2 text-gray-700">
              Duration (in hours)
            </label>
            <input
              type="number"
              id="duration"
              className="px-4 py-3 rounded border-gray-300 focus:ring focus:ring-blue-200"
              value={courseData.duration}
              onChange={(e) => setCourseData({ ...courseData, duration: e.target.value })}
              min="0" // Ensure a positive value
              required // Mark as required
            />
            <p className="mt-1 text-sm text-red-500">
              {durationError}
            </p>
          </div>

          {/* Level */}
          <div className="flex flex-col">
            <label htmlFor="level" className="mb-2 text-gray-700">
              Level
            </label>
            <select
              id="level"
              className="px-4 py-3 rounded border-gray-300 focus:ring focus:ring-blue-200"
              value={courseData.level}
              onChange={(e) => setCourseData({ ...courseData, level: e.target.value })}
            >
               <p className="mt-1 text-sm text-red-500">
              {levelError}
            </p>
              <option value="" disabled>Select a level</option>
              {levelOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            
          </div>


          {/* Includes */}
          <div className="flex flex-col">
            <label htmlFor="includes" className="mb-2 text-gray-700">
              Includes
            </label>
            <input
              type="text"
              id="includes"
              className="px-4 py-3 rounded border-gray-300 focus:ring focus:ring-blue-200"
              value={courseData.includes}
              onChange={(e) => setCourseData({ ...courseData, includes: e.target.value })}
              placeholder="E.g., Books, Videos, Materials"
              required // Mark as required
            />
            <p className="mt-1 text-sm text-red-500">
              {includesError}
            </p>
          </div>


           {/* Is Paid */}
           <div className="flex items-center">
           <span className=" flex items-center mb-2 text-gray-700 mr-7">This is a paid course</span>
            <label htmlFor="is-paid" className="text-gray-700 flex items-center cursor-pointer">
              <input
                type="checkbox"
                id="is-paid"
                checked={courseData.isPaid}
                onChange={(e) =>
                  setCourseData({ ...courseData, isPaid: e.target.checked })
                }
                className="hidden"
              />
               <p className="mt-1 text-sm text-red-500">
              {isPaidError}
            </p>
              <div className="relative w-10 h-5 bg-gray-300 rounded-full mb-1">
                <div
                  className={`absolute w-5 h-5 rounded-full transition-transform duration-300 ease-in-out transform ${
                    courseData.isPaid ? 'translate-x-4 bg-green-500' : 'bg-gray-100'
                  }`}
                ></div>
              </div>
             
            </label>
          </div>

          {/* Course Image */}
          <div>
          <label htmlFor="image" className="mb-2 text-gray-700">
            Course Image
          </label>
          <div className="flex items-center space-x-5 mt-2">
            <input
              type="file"
              id="image-upload"
              className="hidden"
              onChange={handleImageUpload}
            />
             <p className="mt-1 text-sm text-red-500">
              {imageError}
            </p>
            <label
              htmlFor="image-upload"
              className="cursor-pointer flex items-center text-gray-500 hover:text-blue-500"
            >
              <AiOutlineUpload className="mr-1 text-blue-700 text-xl" />
              Upload
            </label>
            <div className="text-gray-500">OR</div> {/* OR label */}
            <input
              type="text"
              id="image-link"
              value={courseData.image}
              onChange={(e) => setCourseData({ ...courseData, image: e.target.value })}
              placeholder="Paste image link here"
              className="px-4 py-3 rounded border-gray-300 focus:ring focus:ring-blue-200"
            />
            {courseData.image && (
              <div className="w-25 h-20">
                <img
                  src={courseData.image}
                  alt="Course"
                  className="w-full h-full object-cover rounded"
                />
              </div>
            )}
          </div>
        </div>

          
          <div className="flex justify-between mt-5">
            <div>
              {/* Other course detail inputs */}
            </div>
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition duration-300"
            >
              Next
            </button>
         </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;
