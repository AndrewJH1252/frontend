import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editUserProfile } from '../../redux/Thunks/authThunk';
import { addNewNotification } from '../../redux/Thunks/notificationsThunk';
import defaultProfilePicture from '../../images/profile.png';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import { fetchUserData } from '../../redux/Thunks/authThunk';

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_BIO_LENGTH = 500;


const PersonalDetails = () => {
  const user = useSelector((state) => state.auth.profile);
  const role = useSelector((state) => state.auth.userRole);
  const {
    firstName,
    lastName,
    image,
    bio,
    hourlyRate,
    location,
    availability,
    education,
    skills,
    phone,
    certifications,
    languagesSpoken,
    teachingSubjects,
    instagram,
    twitter,
    youtube,
  } = user || {};

  // State variables for form inputs
  const [newFirstName, setNewFirstName] = useState(firstName || '');
  const [newLastName, setNewLastName] = useState(lastName || '');
  const [newImage, setNewImage] = useState(image || '');
  const [newBio, setNewBio] = useState(bio || '');
  const [newHourlyRate, setNewHourlyRate] = useState(hourlyRate || '');
  const [newLocation, setNewLocation] = useState(location || '');
  const [newAvailability, setNewAvailability] = useState(availability || '');
  const [newEducation, setNewEducation] = useState(education || '');
  const [newSkills, setNewSkills] = useState(skills || []);
  const [newCertifications, setNewCertifications] = useState(certifications || []);
  const [newLanguagesSpoken, setNewLanguagesSpoken] = useState(languagesSpoken || []);
  const [newTeachingSubjects, setNewTeachingSubjects] = useState(teachingSubjects || '');
  const [newInstagram, setNewInstagram] = useState(instagram || '');
  const [newTwitter, setNewTwitter] = useState(twitter || '');
  const [newYoutube, setNewYoutube] = useState(youtube || '');
  const [newPhone, setNewPhone] = useState(phone || '');
  const [bioError, setBioError] = useState('');
  const [imageError, setImageError] = useState(''); // Define imageError state
  const [imageLink, setImageLink] = useState('');



  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.auth.token);
;

  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        await dispatch(fetchUserData(token));
      };
  
      fetchData();
    }
  }, [dispatch, token]);
  

  const handleCertificationsChange = () => {
    // Create a new certification entry with default values or validation as needed
    const newCertificationEntry = {
      name: '',
      issuer: '',
      year: '',
    };
  
    // Create a copy of the current certifications array and add the new entry
    const updatedCertifications = [...newCertifications, newCertificationEntry];
  
    // Update the state with the new certifications
    setNewCertifications(updatedCertifications);
  };
  

  const handleCertificationNameChange = (event, index) => {
    const { value } = event.target;
    const updatedCertifications = [...newCertifications];
    updatedCertifications[index].name = value;
    setNewCertifications(updatedCertifications);
  };
  
  const handleCertificationIssuerChange = (event, index) => {
    const { value } = event.target;
    const updatedCertifications = [...newCertifications];
    updatedCertifications[index].issuer = value;
    setNewCertifications(updatedCertifications);
  };
  
  const handleCertificationYearChange = (event, index) => {
    const { value } = event.target;
    const updatedCertifications = [...newCertifications];
    updatedCertifications[index].year = value;
    setNewCertifications(updatedCertifications);
  };
  
// Function to add a new certification entry
const addCertification = () => {
  const newCertificationEntry = {
    name: '',
    issuer: '',
    year: '',
  };

  // Create a copy of the current certifications array and add the new entry
  const updatedCertifications = [...newCertifications, newCertificationEntry];

  // Update the state with the new certifications
  setNewCertifications(updatedCertifications);
};


  const handleFirstNameChange = (e) => {
    setNewFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setNewLastName(e.target.value);
  };

  const handleImageChange = async (event) => {
    const selectedImage = event.target.files[0];
  
    // Check if an image was selected
    if (selectedImage) {
      // Validate the image size
      if (selectedImage.size > MAX_IMAGE_SIZE) {
        setImageError('Image size exceeds the maximum allowed size (5MB).');
      } else {
        // Clear any previous error message and set the new image
        setImageError('');
        setNewImage(selectedImage);
        setImageLink(''); // Reset the image link
      }
    } else {
      // If no file is selected, consider it as an image link input
      const link = event.target.value;
      setNewImage(''); // Clear the file input
      setImageError('');
  
      // Check if it's a valid URL (you can add more URL validation logic)
      if (/^https?:\/\//.test(link)) {
        // Set the image link
        setImageLink(link);
      } else {
        setImageError('Invalid URL format.');
      }
    }
  };
  
  
  
  const handleBioChange = (value) => {
    setNewBio(value);

    if (value.length > MAX_BIO_LENGTH) {
      setBioError(`Bio can't exceed ${MAX_BIO_LENGTH} characters.`);
    } else {
      setBioError('');
    }
  };

  const handleHourlyRateChange = (event) => {
    setNewHourlyRate(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value);
  };


  const handleLocationChange = (event) => {
    setNewLocation(event.target.value);
  };

  const handleAvailabilityChange = (event) => {
    setNewAvailability(event.target.value);
  };

  const handleEducationChange = (event) => {
    setNewEducation(event.target.value);
  };

  const handleSkillsChange = (event) => {
  const inputValue = event.target.value;
  const skillsArray = inputValue.split(',').map((skill) => skill.trim());

  if (skillsArray.length === 1 && !skillsArray[0]) {
    // If the user types one item and leaves the field, add a comma
    setNewSkills(['']);
  } else {
    setNewSkills(skillsArray);
  }
};




  const handleLanguagesSpokenChange = (event) => {
    const inputValue = event.target.value;
    const languagesArray = inputValue.split(',').map((language) => language.trim());
  
    if (languagesArray.length === 1 && !languagesArray[0]) {
      // If the user types one item and leaves the field, add a comma
      setNewLanguagesSpoken(['']);
    } else {
      setNewLanguagesSpoken(languagesArray);
    }
  };
  
  const handleTeachingSubjectsChange = (event) => {
    const inputValue = event.target.value;
  
    if (inputValue && !inputValue.includes(',')) {
      // If the user types one item and leaves the field, add a comma
      setNewTeachingSubjects(inputValue + ',');
    } else {
      setNewTeachingSubjects(inputValue);
    }
  };

  const handleInstagramChange = (event) => {
    setNewInstagram(event.target.value);
  };

  const handleTwitterChange = (event) => {
    setNewTwitter(event.target.value);
  };

  const handleYoutubeChange = (event) => {
    setNewYoutube(event.target.value);
  };


  const handleSaveChanges = async () => {
    try {
      // Dispatch an action to update the user profile with the new values
      const updatedProfile = {
        firstName: newFirstName,
        lastName: newLastName,
        image: newImage || imageLink,
        imageLink: imageLink, // Include image link in the profile update
        bio: newBio,
        phone: newPhone,
        hourlyRate: newHourlyRate,
        location: newLocation,
        availability: newAvailability,
        education: newEducation,
        skills: newSkills,
        certifications: newCertifications,
        languagesSpoken: newLanguagesSpoken,
        teachingSubjects: newTeachingSubjects,
        instagram: newInstagram,
        twitter: newTwitter,
        youtube: newYoutube,
      };
  
      await dispatch(editUserProfile(updatedProfile));
  
      // Dispatch a success notification for the changes
      dispatch(
        addNewNotification({
          recipientId: user._id,
          message: `Profile changes saved successfully.`,
          type: 'success',
        })
      );
  
      setTimeout(() => {

          navigate(0);
     
        // Use history.push to navigate to the "Main" route
       
      }, 2000);
    } catch (error) {
      console.error('Error updating profile:', error);
  
      // Show a temporary error notification
      dispatch(
        addNewNotification({
          recipientId: user._id,
          message: 'An error occurred while updating profile details.',
          type: 'error',
        })
      );
    }
  };
  

  const handleCancelChanges = () => {
    // Reset the form fields to their original values
    setNewFirstName(firstName || '');
    setNewLastName(lastName || '');
    setNewImage(image || '');
    setNewBio(bio || '');
    setNewHourlyRate(hourlyRate || '');
    setNewLocation(location || '');
    setNewAvailability(availability || '');
    setNewEducation(education || '');
    setNewSkills(skills || []);
    setNewPhone(phone || []);
    setNewCertifications(certifications || []);
    setNewLanguagesSpoken(languagesSpoken || []);
    setNewTeachingSubjects(teachingSubjects || '');
    setNewInstagram(instagram || '');
    setNewTwitter(twitter || '');
    setNewYoutube(youtube || '');
    setBioError('');
  };


  return (
    <div className="bg-gray-100 p-4 sm:p-6 md:p-8 lg:p-10">
      <div className="max-w-3xl mx-auto">
        {/* Profile Picture */}
        {/* Profile Picture */}
          <div className="mb-5 relative flex items-center">
          <img
            src={
              newImage instanceof Blob
                ? URL.createObjectURL(newImage)
                : imageLink || image || defaultProfilePicture
            }
            alt="Profile"
            className="w-32 h-32 md:w-48 md:h-40 lg:w-56 lg:h-56 rounded-full mx-auto border-4 border-white shadow-lg object-cover"
          />



            {/* React icon for upload */}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />

            {imageError && <p className="text-red-500">{imageError}</p>}
          </div>

          {/* Input field for pasting image link */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold" htmlFor="imageLink">
              Image Link (or Upload Image)
            </label>
            <input
              type="text"
              id="imageLink"
              placeholder="Paste image link here"
              value={imageLink}
              onChange={(e) => setImageLink(e.target.value)}
              className="text-gray-700 border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

        
        {/* First Name and Last Name */}
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-semibold" htmlFor="firstName">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={newFirstName}
              onChange={handleFirstNameChange}
              className="text-gray-700 border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold" htmlFor="lastName">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              value={newLastName}
              onChange={handleLastNameChange}
              className="text-gray-700 border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Bio */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold" htmlFor="bio">
            Bio
          </label>
          <ReactQuill
            id="bio"
            value={newBio}
            onChange={handleBioChange}
            placeholder="Tell something about yourself..."
            className="text-gray-700 border border-gray-400 rounded-lg p-2 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold" htmlFor="phone">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            placeholder="Enter phone number (e.g., +1 123-456-7890)"
            value={newPhone}
            onChange={handlePhoneChange}
            className="text-gray-700 border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>



     {/* Other Inputs (Hourly Rate, Subjects, Location, etc.) */}
        <div className="grid grid-cols-2 gap-5 items-center">
          {/* Hourly Rate */}
          <div>
            <label className="block text-gray-700 font-semibold" htmlFor="hourlyRate">
              Hourly Rate
            </label>
            <input
              type="number"
              id="hourlyRate"
              placeholder="e.g., 25.00"
              value={newHourlyRate}
              onChange={handleHourlyRateChange}
              className="text-gray-700 border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Education */}
          <div>
            <label className="block text-gray-700 font-semibold">Education</label>
            <input
              type="text"
              placeholder="e.g., Bachelor's in Computer Science"
              value={newEducation}
              onChange={handleEducationChange}
              className="text-gray-700 border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Skills */}
          <div >
            <label className="block text-gray-700 font-semibold">Skills</label>
            <input
              type="text"
              placeholder="Skills (comma-separated)"
              value={newSkills.join(', ')}
              onChange={handleSkillsChange}
              className="text-gray-700 border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold" htmlFor="teachingSubjects">
              Teaching Subjects
            </label>
            <input
              type="text"
              id="teachingSubjects"
              placeholder="e.g., Math, Science, History"
              value={newTeachingSubjects}
              onChange={handleTeachingSubjectsChange}
              className="text-gray-700 border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Location */}
          <div className="col-span-2">
            <label className="block text-gray-700 font-semibold" htmlFor="location">
              Location
            </label>
            <input
              type="text"
              id="location"
              placeholder="e.g., New York, NY"
              value={newLocation}
              onChange={handleLocationChange}
              className="text-gray-700 border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Availability */}
          <div className="col-span-2">
            <label className="block text-gray-700 font-semibold" htmlFor="availability">
              Availability
            </label>
            <select
              id="availability"
              value={newAvailability}
              onChange={handleAvailabilityChange}
              className="text-gray-700 border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="">Select Availability</option>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Flexible">Flexible</option>
            </select>
          </div>
        </div>
    
        {/* Certifications */}
        <div className="mt-4">
          <label className="block text-gray-700 font-semibold">Certifications</label>
          {newCertifications.map((certification, index) => (
              <div key={index} className="grid grid-cols-3 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="Certification Name"
                    value={certification.name}
                    onChange={(e) => handleCertificationNameChange(e, index)}
                    className="text-gray-700 border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Certification Issuer"
                    value={certification.issuer}
                    onChange={(e) => handleCertificationIssuerChange(e, index)}
                    className="text-gray-700 border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    placeholder="Certification Year"
                    value={certification.year}
                    onChange={(e) => handleCertificationYearChange(e, index)}
                    className="text-gray-700 border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            ))}
          <div className='flex items-center justify-between'>
          <button
            className="mt-2 text-blue-500 hover:text-blue-600  font-semibold rounded-lg"
            onClick={addCertification}
          >
            Add Certification
          </button>
          <button
            type="button"
            className="text-green-500 hover:text-green-600  font-semibold rounded-lg mr-4"
            onClick={handleCertificationsChange}
          >
            Done
          </button>
          </div>
          
        </div>
       


        {/* Languages Spoken (Multi-select) */}
        <div className="mt-4">
          <label className="block text-gray-700 font-semibold">Languages Spoken</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Enter languages separated by commas"
              value={newLanguagesSpoken.join(', ')}
              onChange={handleLanguagesSpokenChange}
              className="text-gray-700 border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
       

        {/* Social Media Links (Instagram, Twitter, Youtube) */}
        <div className="mt-4">
          <label className="block text-gray-700 font-semibold">Social Media Links</label>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <input
                type="text"
                placeholder="Instagram"
                value={newInstagram}
                onChange={handleInstagramChange}
                className="text-gray-700 border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Twitter"
                value={newTwitter}
                onChange={handleTwitterChange}
                className="text-gray-700 border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Youtube"
                value={newYoutube}
                onChange={handleYoutubeChange}
                className="text-gray-700 border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Save and Cancel Buttons */}
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-600 transition duration-300 text-white font-semibold py-2 px-4 rounded-lg mr-4"
            onClick={handleSaveChanges}
          >
            Save
          </button>
          <button
            type="button"
            className="bg-gray-400 hover:bg-gray-600 transition duration-300 text-white font-semibold py-2 px-4 rounded-lg"
            onClick={handleCancelChanges}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;