import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaGraduationCap, FaStar, FaUserGraduate, FaBookOpen,  FaAddressBook, FaCheckCircle, FaLanguage, FaCertificate, FaGlobe } from 'react-icons/fa';
import { AiOutlineInstagram, AiOutlineTwitter, AiOutlineYoutube } from 'react-icons/ai';

import { useDispatch, useSelector } from 'react-redux';
import { fetchTutor } from '../../redux/Thunks/userThunk';
import RatingForm from '../common/RatingForm';
import RequestForm from '../request/RequestForm';
import { useParams } from 'react-router-dom';

const stripHtmlTags = (html) => {
  
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
};


const TutorDetails = ({ tutorId }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const tutor = useSelector((state) => state.user.tutor);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const role = useSelector(state => state.auth.userRole);
  const isUserTutor = role  === 'tutor';
  const MAX_BIO_LINES = 3; // Maximum lines to display initially
  const bioText = stripHtmlTags(tutor?.bio || ''); // Use optional chaining and provide a default value
  const bioLines = bioText.split('\n');
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const displayBioLines = showMore ? bioLines : bioLines.slice(0, MAX_BIO_LINES);


  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [isRequestFormOpen, setIsRequestFormOpen] = useState(false); // Add this state variable

  const [showFullDetails, setShowFullDetails] = useState(true);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    if (tutorId || id ) {
      dispatch(fetchTutor(tutorId || id ))
        .then(() => {
          setIsLoading(false); // Set loading to false when tutor data is fetched
        })
        .catch(() => {
          setIsLoading(false); // Handle errors by setting loading to false
        });
    }
  }, [dispatch, tutorId, id ]);
  

  if (!tutor) {
    return <div>Tutor data not available</div>;
  }

  const handleOpenRatingModal = () => {
    setIsRatingModalOpen(true);
  };

  const handleCloseRatingModal = () => {
    setIsRatingModalOpen(false);
  };

  const handleOpenRequestForm = () => {
    setIsRequestFormOpen(true);
  };

  const handleCloseRequestForm = () => {
    setIsRequestFormOpen(false);
  };


  const renderAverageRatingIcon = () => {
    const averageRating = parseFloat(tutor.averageRating);
    if (averageRating >= 4.5) {
      return <FaStar className="text-green-500" />;
    } else if (averageRating >= 3.5) {
      return <FaStar className="text-yellow-500" />;
    } else if (averageRating >= 2.5) {
      return <FaStar className="text-orange-500" />;
    } else if (averageRating >= 1.5) {
      return <FaStar className="text-red-500" />;
    } else {
      return <FaStar className="text-gray-400" />;
    }
  };

  return (
    <div className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 p-10 rounded-lg shadow-2xl mt-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 md:mb-0">
        <h2 className="text-2xl font-extrabold text-gray-700 mb-4 md:mb-0 md:mr-4">
          <FaUserGraduate className="inline-block text-yellow-600 mr-2 text-xl md:text-2xl" />
          Tutor Details
        </h2>
        {!isUserTutor && isAuthenticated &&(
        <div className="flex space-x-4 items-center">
          <button
            onClick={handleOpenRatingModal}
            className="bg-yellow-500 text-white font-semibold px-5 py-3 rounded-full hover:bg-yellow-600 transition duration-300 ease-in-out"
          >
            <FaStar className="inline-block text-yellow-600 mr-2 text-xl" /> Rate
          </button>

          {/* Add the button for opening the RequestForm */}
          <button
            onClick={handleOpenRequestForm}
            className="bg-green-500 text-white font-semibold px-5 py-3 rounded-full hover:bg-green-600 transition duration-300 ease-in-out"
          >
            <FaUserGraduate className="inline-block text-white mr-2 text-2xl" /> Request
          </button>

          {isRatingModalOpen && <RatingForm tutorId={tutor._id} onClose={handleCloseRatingModal} />}

          {/* Add the RequestForm as a pop-up */}
          {isRequestFormOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <RequestForm tutorId={tutor._id} onClose={handleCloseRequestForm} />
              </div>
            </div>
          )}
        </div>
        )}
      </div>


      <div className="bg-gray-100 p-6 rounded-lg shadow-lg mt-7 mb-5">
      <div className="flex flex-col md:flex-row justify-between items-center md:space-x-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center">
          <div className="flex flex-col items-center">
          <img
            src={tutor.image}
            alt={`${tutor.firstName} ${tutor.lastName}`}
            className="w-32 h-32 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full border-4 border-gray-200 shadow-lg object-cover transition duration-500 transform hover:scale-110"
          />


          </div>

          <div className="md:col-span-2 lg:col-span-2 flex flex-col">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              {`${tutor.firstName} ${tutor.lastName}`}
            </h2>

            <div className="mt-4 md:mt-6">
              <div className="flex items-center text-gray-600 mb-3">
                <FaBookOpen className="text-indigo-500 mr-2" />
                <span className="font-semibold">Bio:</span>
              </div>
              <div className="text-gray-900 text-justify">
                {showMore
                  ? tutor.bio // Display full bio when "Show More" is clicked
                  : displayBioLines.join('\n')}{' '}
                {/* Display truncated bio */}
                {bioLines.length > MAX_BIO_LINES && (
                  <button
                    className="text-blue-500 hover:text-blue-700 cursor-pointer"
                    onClick={toggleShowMore}
                  >
                    {showMore ? 'Show Less' : 'Show More'}
                  </button>
                )}
              </div>
            </div>

            <div className="flex flex-col items-center md:flex-row mt-4">
              <FaMapMarkerAlt className="text-red-500 mr-2 mb-2 md:mb-0" />
              <span className="font-semibold md:w-24">Location:</span>
              <span className="text-gray-900">{tutor.location || 'Unknown'}</span>
            </div>

            <div className="flex items-center text-gray-600 mt-2">
              <FaStar className="text-green-500 mr-2" />
              <span className="font-semibold">Hourly Rate:</span>
              <span className="ml-2 text-gray-900">${tutor.hourlyRate || 'Unknown'}/hr</span>
            </div>
          </div>
        </div>
      </div>


    
        <div className="mt-8">
          <p className="text-2xl font-semibold text-gray-800">Additional Information</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <div className="flex items-center text-gray-600">
                <FaGraduationCap className="text-orange-700 mr-2" />
                <span className="font-semibold">Education:</span>
              </div>
              <p className="text-gray-900">{tutor.education ? tutor.education: 'Unknown'}</p>
            </div>
            <div>
              <div className="flex items-center text-gray-600">
                <span className="flex items-center font-semibold">
                <FaCheckCircle  className="text-green-500 mr-2" />Skills:
                   {/* Colored React Check Icon */}
                </span>
              </div>
              <p className="text-gray-900">{tutor.skills.join(', ')}</p>
            </div>
            <div className="flex flex-col space-y-2">
            <span className="flex items-center font-semibold">
              <FaAddressBook className="text-blue-500 mr-2" /> Contact Info:
            </span>

            <div className="flex items-center">
              <div className="text-gray-900">Phone:</div>
              <p className="ml-2 text-gray-900 break-all">
                {tutor.phone ? tutor.phone : 'Unknown'}
              </p>
            </div>

            <div className="flex items-center">
              <div className="text-gray-900">Email:</div>
              <p className="ml-2 text-gray-900 break-all">
                {tutor.email ? tutor.email : 'Unknown'}
              </p>

            </div>
          </div>

          <div>
            {tutor.certifications && tutor.certifications.length > 0 ? (
              <div className="flex items-center text-gray-600">
                <span className="flex items-center font-semibold">
                  <FaCertificate className="text-orange-500 mr-2" /> Certifications:
                </span>
              </div>
            ) : (
              <p className="text-gray-700 font-semibold">No certifications</p>
            )}

            {tutor.certifications && tutor.certifications.length > 0 ? (
              <p className="text-gray-900">
                {tutor.certifications.map((cert) => `${cert.name} (${cert.year})`).join(', ')}
              </p>
            ) : null}
          </div>

            <div>
              <div className="flex items-center text-gray-600">
                <span className="flex items-center font-semibold">
                  <FaLanguage className="text-lg text-yellow-500 mr-2" />Languages Spoken:
                </span>
              </div>
              <p className="text-gray-900">{tutor.languagesSpoken.join(', ')}</p>
            </div>
            <div>
            <span className="flex items-center font-semibold">
                  <FaGlobe className="text-blue-500 mr-2" />Social Media:
                </span>
              <div className="flex space-x-4 mt-4 text-gray-900">
                {tutor.instagram && (
                  <a href={tutor.instagram} target="_blank" rel="noopener noreferrer">
                    <AiOutlineInstagram className="text-2xl text-pink-500 hover:text-pink-600 transition duration-300" />
                  </a>
                )}
                {tutor.twitter && (
                  <a href={tutor.twitter} target="_blank" rel="noopener noreferrer">
                    <AiOutlineTwitter className="text-2xl text-blue-500 hover:text-blue-600 transition duration-300" />
                  </a>
                )}
                {tutor.youtube && (
                  <a href={tutor.youtube} target="_blank" rel="noopener noreferrer">
                    <AiOutlineYoutube className="text-2xl text-red-500 hover:text-red-600 transition duration-300" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

       
      </div>
    </div>
  );
};

export default TutorDetails;