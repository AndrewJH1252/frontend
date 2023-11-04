import React, { useState } from 'react';
import LessonCard from './LessonCard'; // Update with the correct import path
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const LessonTopic = ({ topic }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between">
        <h4 className="text-xl font-semibold text-gray-800 mb-2">{topic.topicName}</h4>
        <button
          onClick={toggleExpansion}
          className="text-gray-600 focus:outline-none hover:text-gray-800"
        >
          {isExpanded ? <FaEyeSlash className='text-xl text-gray-500 hover:text-gray-700 transition duration-300'/> : <FaEye className='text-xl text-green-500 hover:text-green-700 transition duration-300'/>}
        </button>
      </div>
      <p className="text-gray-600 mb-4">{topic.topicDescription}</p>
      {isExpanded && (
        <div className="grid gap-6 grid-cols-1 ">
          {topic.lessons.map((lesson) => (
            <LessonCard key={lesson._id} lesson={lesson} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LessonTopic;
