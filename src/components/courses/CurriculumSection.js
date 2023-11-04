import React, { useState } from 'react';
import TopicCard from '../topic/TopicCard';
import { BiBookOpen } from 'react-icons/bi'; // Import the book icon from react-icons library

const CurriculumSection = ({ curriculum }) => {
  const [showAllTopics, setShowAllTopics] = useState(false);

  const toggleTopicsVisibility = () => {
    setShowAllTopics(!showAllTopics);
    
  };

  if (!curriculum || curriculum.length === 0) {
    return <div>Curriculum  data not available</div>;
  }


  const visibleTopics = showAllTopics ? curriculum : curriculum.slice(0, 4); // Display all topics or limit to 4

  return (
    <div className="mb-8 p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">
          <BiBookOpen className="inline-block mr-2 text-gray-600" />
          Curriculum
        </h3>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {visibleTopics.map((topic, index) => (
          <div key={index} className="p-4 bg-gray-100 rounded-lg shadow">
            <TopicCard topic={topic} />
          </div>
        ))}
      </div>
      {curriculum.length > 4 && (
        <button
          className="text-blue-500 justify-center hover:underline"
          onClick={toggleTopicsVisibility}
        >
          {showAllTopics ? 'View less' : 'View more'}
        </button>
      )}
    </div>
  );
};

export default CurriculumSection;
