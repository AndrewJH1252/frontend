import React, { useState, useEffect } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import LessonTopic from '../topic/TopicCard'; // Update with the correct import path
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourseContent } from '../../redux/Thunks/courseThunk';
import LoadingSpinner from '../common/LoadingSpinner';

const CourseContent = ({ courseId }) => {
  const dispatch = useDispatch();
  const initialTopics = [];
  const topics = useSelector((state) => state.course.topics || initialTopics);
  const loading = useSelector((state) => state.course.loading);

  const [page, setPage] = useState(1);
  const [topicsToShow, setTopicsToShow] = useState([]);
  const topicsPerPage = 6;
  const [showAllTopics, setShowAllTopics] = useState(false);

  useEffect(() => {
    dispatch(fetchCourseContent({ courseId, page }));
  }, [dispatch, courseId, page]);

  useEffect(() => {
    setTopicsToShow(topics.slice(0, showAllTopics ? topics.length : page * topicsPerPage));
  }, [topics, page, showAllTopics]);

  const handleViewMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const toggleShowAllTopics = () => {
    setShowAllTopics(!showAllTopics);
  };

  useEffect(() => {
    const playerInstances = {};

    // Initialize Video.js players
    topicsToShow.forEach((topic) => {
      const playerId = `video-${topic._id}`;
      const player = videojs(playerId, {
        controls: true,
        fluid: true,
      });
      playerInstances[topic._id] = player;
    });

    // Clean up when component unmounts
    return () => {
      Object.values(playerInstances).forEach((player) => {
        player.dispose();
      });
    };
  }, [topicsToShow]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h3 className=" font-semibold mb-6">Course Content</h3>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {topicsToShow.map((topic) => (
          <LessonTopic key={topic._id} topic={topic} />
        ))}
      </div>
      {loading && <LoadingSpinner />}
      {!loading && topicsToShow.length < topics.length && (
        <div className="mt-4 text-center">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center justify-center space-x-2"
            onClick={handleViewMore}
          >
            <span>{showAllTopics ? 'View Less' : 'View More'}</span>
            {showAllTopics ? <FiChevronUp className="text-lg" /> : <FiChevronDown className="text-lg" />}
          </button>
        </div>
      )}
    </div>
  );
};

export default CourseContent;
