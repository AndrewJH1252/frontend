import React, { useState } from 'react';
import { FaLock, FaUnlockAlt, FaPlayCircle } from 'react-icons/fa';

const LessonCard = ({ lesson }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handlePlayClick = () => {
    if (lesson.isPaid) {
      alert('You must buy the course to access this lesson.');
    } else {
      setIsPlaying(true);
    }
  };

  const getVideoType = (videoUrl) => {
    const fileExtension = videoUrl.split('.').pop().toLowerCase();
    switch (fileExtension) {
      case 'mp4':
        return 'video/mp4';
      case 'webm':
        return 'video/webm';
      case 'ogg':
        return 'video/ogg';
      default:
        return ''; // Return empty string if the format is not recognized
    }
  };

  return (
    <div
      className={`bg-white p-4 shadow-lg rounded-lg hover:shadow-2xl transition-transform hover:-translate-y-2 relative ${
        isHovered ? 'hover-content-visible' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {errorMessage && (
        <div className="error-message text-red-500">{errorMessage}</div>
      )}
      <div className="flex items-center justify-between">
        <div
          className={`mr-2 flex ${
            lesson.isPaid ? 'text-gray-400' : 'text-green-500'
          } text-2xl cursor-pointer`}
          onClick={handlePlayClick}
        >
          {lesson.isPaid ? (
            <FaLock />
          ) : isPlaying ? (
            <FaUnlockAlt />
          ) : (
            <FaPlayCircle className="text-3xl text-red-500 hover:text-red-700 transition duration-300" />
          )}
        </div>
        <h5 className="ml-3 flex font-semibold text-gray-800 mb-1 text-lg">{lesson.lessonTitle}</h5>
        <div className="flex items-center">
          <p className="flex text-sm text-gray-600 mr-2">{lesson.lessonDuration}</p>
          <span className="flex items-center">min</span>
        </div>
      </div>
      <p className="text-sm text-gray-600 text-center mt-2">{lesson.lessonContent}</p>
      {lesson.isPaid && !isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white">
          <p className="text-center">You must buy the course to access this lesson.</p>
        </div>
      )}
      <div className="relative overflow-hidden rounded-md aspect-w-16 aspect-h-9 mt-4">
        {isPlaying ? (
          <video
            title="Video Player"
            width="100%"
            height="100%"
            controls
          >
            <source src={lesson.lessonURL || lesson.lessonMedia} type={getVideoType(lesson.lessonURL || lesson.lessonMedia)} />
          </video>
        ) : (
          <div className="video-poster h-full w-full bg-gray-300 flex items-center justify-center text-gray-500">
            <FaPlayCircle className="text-5xl" />
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonCard;
