import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { IoCloseCircle } from 'react-icons/io5';
import { submitRequest } from '../../redux/Thunks/requestsThunk';
import { addNewNotification } from '../../redux/Thunks/notificationsThunk';
import { fetchTutor  } from '../../redux/Thunks/userThunk';

const RequestForm = ({ tutorId, onClose }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.profile); // Assuming you have a user state in your Redux store
  const tutor = useSelector((state) => state.user.tutor);

  const [formData, setFormData] = useState({
    tutor: tutorId,
    type: 'hire',
    message: '',
    duration: 0,
    location: '',
    dateTime: new Date(),
    agency: '',
    urgency: 'low',
    requirements: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    // You can dispatch the form data to your Redux action to handle submission
    await dispatch(submitRequest(formData));
    await dispatch(
      addNewNotification({
        recipientId: tutorId,
        message: `A ${formData.type} request has been received from ${user.firstName} ${user.lastName}.
         Please kindly take a look at it and provide your desired response.`,
        type: 'success',
      })
    );
    onClose();
     // You might want to refresh user data
  };

  useEffect(() => {
    // Fetch the tutor's name based on tutorId from your API
    
    fetchTutor(tutorId);
  }, [dispatch, tutorId]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-gray-500">
        <div className="bg-white p-6  relative rounded-lg shadow-lg">
    <div className="flex justify-between items-center">
      <h2 className="text-xl text-blue-900 font-semibold mb-5">Create a New Request</h2>
      <button className="text-red-600 hover:text-red-800" onClick={onClose}>
        <IoCloseCircle size={24}/>
      </button>
    </div>
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="mb-2">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="tutor">
          Tutor
        </label>
        <input
          type="text"
          name="tutor"
          value={`${tutor.firstName} ${tutor.lastName}`} // Concatenate first name and last name
          disabled // Disable the input field since it's not editable
          className="block w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:shadow-outline"
        />
      </div>

        {/* Type */}
        <div className="mb-2">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="type">
            Type
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            className="block w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:shadow-outline"
          >
            <option value="hire">Hire</option>
            <option value="meetup">Meetup</option>
          </select>
        </div>
  
        {/* Date and Time */}
        <div className="mb-2">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="dateTime">
            Date and Time
          </label>
          <DatePicker
            name="dateTime"
            selected={formData.dateTime}
            onChange={(date) => setFormData({ ...formData, dateTime: date })}
            showTimeSelect
            timeFormat="HH:mm"
            dateFormat="MMMM d, yyyy h:mm aa"
            className="block w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:shadow-outline"
          />
        </div>
  
        {/* Urgency */}
        <div className="mb-2">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="urgency">
            Urgency
          </label>
          <select
            name="urgency"
            value={formData.urgency}
            onChange={handleInputChange}
            className="block w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:shadow-outline"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
  
        {/* Message */}
        <div className="col-span-2 mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="message">
            Message
          </label>
          <ReactQuill
            name="message"
            value={formData.message}
            onChange={(value) => setFormData({ ...formData, message: value })}
          />
        </div>
  
        {/* Duration (in hours) */}
        <div className="mb-2">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="duration">
            Duration (in hours)
          </label>
          <div className="flex items-center">
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              step="0.5"
              className="block w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:shadow-outline"
            />
            
          </div>
          <p className="text-sm text-gray-500 mt-2">0.5 = 30 minutes</p>
        </div>

        
  
        {/* Location */}
        <div className="mb-2">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="location">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="block w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:shadow-outline"
            placeholder="Enter a location (e.g., New York, NY)"
            autoComplete="off"
            spellCheck="false"
          />
       
        </div>
  
       
        {/* Agency */}
        <div className="mb-2">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="agency">
            Agency
          </label>
          <input
            type="text"
            name="agency"
            value={formData.agency}
            onChange={handleInputChange}
            className="block w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:shadow-outline"
            placeholder="Enter agency name (optional)"
            autoComplete="off"
            spellCheck="false"
          />
      
        </div>
       
  
        {/* Requirements */}
        <div className="col-span-3 mb-2">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="requirements">
            Requirements
          </label>
          <textarea
            name="requirements"
            value={formData.requirements}
            onChange={handleInputChange}
            className="block w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:shadow-outline"
            placeholder="Specify any special requirements (e.g., equipment, skills, etc.)"
            rows="2"
            autoComplete="off"
            spellCheck="true"
          />
        </div>
      </div>
  
      {/* Submit Button */}
      <div className="flex justify-between mb-4 mt-2">
        <div className='flex'></div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </div>
     
    </form>
    </div>
  </div>
  
  
  );
};

export default RequestForm;
