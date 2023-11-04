import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { storeCurriculum } from '../../../redux/slice/courseCreationSlice';
import { AiFillPlusCircle } from 'react-icons/ai';
import CreateTopicForm from './CreateTopicForm';
import UploadLessonForm from './UploadLessonForm';
import { useNavigate } from 'react-router-dom';

const CurriculumForm = ({ goBack, nextStep }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const curriculumData = useSelector(state => state.courseCreation.curriculum || []);
  const courseDetails = useSelector(state => state.courseCreation.courseDetails.curriculum || []);

  const [topics, setTopics] = useState([]);

  useEffect(() => {
    // Initialize topics with curriculumData.topics if available
    if (curriculumData.topics) {
      setTopics(curriculumData.topics);
    }
  }, [curriculumData]);

  const handleAddTopic = () => {
    const newTopic = {
      topicName: '',
      topicDescription: '',
      lessons: []
    };
    setTopics([...topics, newTopic]);
  };

  const handleTopicChange = (topicIndex, field, value) => {
    const updatedTopics = [...topics];
    updatedTopics[topicIndex][field] = value;
    setTopics(updatedTopics);
  };

  const handleSaveLesson = (topicIndex, lessonIndex, updatedLessonData) => {
    // Create a copy of the current topics state
    const updatedTopics = [...topics];
    
    // Update the lesson data within the specified topic
    const updatedTopic = { ...updatedTopics[topicIndex] };
    const updatedLesson = { ...updatedTopic.lessons[lessonIndex], ...updatedLessonData };
    updatedTopic.lessons[lessonIndex] = updatedLesson;
    
    // Update the topics state with the modified topic
    updatedTopics[topicIndex] = updatedTopic;
    
    // Update the local state with the new topics data
    setTopics(updatedTopics);
  };
  

  const handleRemoveTopic = (topicIndex) => {
    const updatedTopics = topics.filter((_, i) => i !== topicIndex);
    setTopics(updatedTopics);
  };

  const handleAddLesson = (topicIndex) => {
    const updatedTopics = [...topics];
    const newLesson = {
      lessonTitle: '',
      lessonDuration: 0, // Example duration value
      lessonContent: '', // Example content value
      lessonMedia: null, // Example media value
      isPaid: false, // Add the isPaid field with an initial value of false
      // Add other lesson properties as needed
    };
    
    updatedTopics[topicIndex].lessons.push(newLesson);
    setTopics(updatedTopics);
  };

  const handleLessonChange = (topicIndex, lessonIndex, field, value) => {
    const updatedTopics = [...topics];
    const updatedLesson = { ...updatedTopics[topicIndex].lessons[lessonIndex] };
  
    if (field === 'lessonMedia') {
      // Check if the value is a File object (uploaded file)
      if (value instanceof File) {
        // Handle the uploaded file here, e.g., save it to your server or cloud storage
        // You can store the URL or other relevant information in the lesson data
        // For example, you can save the URL to lessonMedia:
        // updatedLesson.lessonMedia = 'URL_TO_UPLOADED_FILE';
  
        // Note: You should implement the actual file upload logic here.
      } else {
        // It's not a File object, assume it's a URL
        updatedLesson.lessonMedia = value;
      }
    } else {
      // For other fields (lessonDuration, lessonContent, etc.), update as usual
      updatedLesson[field] = value;
    }
  
    // Update the lesson in the topics
    updatedTopics[topicIndex].lessons[lessonIndex] = updatedLesson;
    setTopics(updatedTopics);
  };
  
  const handleRemoveLesson = (topicIndex, lessonIndex) => {
    const updatedTopics = [...topics];
    updatedTopics[topicIndex].lessons.splice(lessonIndex, 1);
    setTopics(updatedTopics);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Combine the existing courseDetails with the updated curriculum
    const updatedCourseDetails = {
      ...courseDetails,

        topics: topics,
    };
  
    // Dispatch an action to store the updated course details in Redux
    await dispatch(storeCurriculum(updatedCourseDetails));
  
    // Navigate to the next step (replace '/next-step' with the actual route)
    nextStep();
  };
  
  
  const handlePrevious = () => {
    goBack(); // Call the goBack function passed as a prop
  };



  return (
    <div className="flex flex-col  items-center justify-center mt-5 bg-gray-100">
      <div className="max-w-5xl w-full mx-auto p-6 bg-white rounded shadow">
        <div className="mt-4 flex justify-between">
          <h2 className="text-2xl font-semibold mb-4">Course Curriculum</h2>
          <button
            type="button"
            className="text-blue-500 hover:text-blue-700 transition duration-300"
            onClick={handleAddTopic}
          >
            Add Topic <AiFillPlusCircle className="inline-block ml-1" />
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
        {topics.map((topic, topicIndex) => (
            <div key={topicIndex} className="bg-gray-200 p-4 rounded-md shadow">
              <CreateTopicForm
                topicIndex={topicIndex}
                topic={topic}
                handleTopicChange={handleTopicChange}
                handleRemoveTopic={handleRemoveTopic}
                handleAddLesson={handleAddLesson}
                handleRemoveLesson={handleRemoveLesson}
                handleLessonChange={handleLessonChange}
              />

              {topic.lessons.map((lessonIndex) => (
                <UploadLessonForm
                  key={lessonIndex}
                  topicIndex={topicIndex}
                  lessonIndex={lessonIndex}
                  handleSaveLesson={handleSaveLesson}
                  handleAddLesson={handleAddLesson} // This should be conditional
                  handleLessonChange={handleLessonChange}
                />
              ))}

              </div>
            ))}


          <div className="flex justify-between mt-5">
            <button
              type="button"
              className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
              onClick={handlePrevious}
            >
              Previous
            </button>
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

export default CurriculumForm;
