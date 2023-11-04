import React, { useState } from 'react';
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';
import UploadLessonForm from './UploadLessonForm';

const CreateTopicForm = ({
  topicIndex,
  topic,
  handleTopicChange,
  handleRemoveTopic,
  handleAddLesson,
  handleRemoveLesson,
  handleLessonChange
}) => {
  const [editing, setEditing] = useState(true);

  const handleSave = () => {
    // TODO: Add your save action logic here
    setEditing(false); // Mark as not editing after saving
  };

  const handleCancel = () => {
    // TODO: Add your cancel action logic here
    setEditing(false); // Mark as not editing
  };

  return (
    <div className="mb-8 p-6 bg-white rounded shadow-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold mb-2">Topic {topicIndex + 1}</h3>
        {editing ? (
          <div className="flex gap-4">
            <button
              type="button"
              className="text-blue-500 hover:text-blue-700 transition duration-300 mr-2"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              type="button"
              className="text-red-500 hover:text-red-700 transition duration-300"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="text-red-500 hover:text-red-700 transition duration-300"
            onClick={() => handleRemoveTopic(topicIndex)}
          >
            Remove Topic <AiFillMinusCircle className="inline-block ml-1" />
          </button>
        )}
      </div>
      <div className="mt-4">
        <input
          type="text"
          className="w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          placeholder="Topic Name"
          value={topic.topicName}
          onChange={(e) => handleTopicChange(topicIndex, 'topicName', e.target.value)}
          disabled={!editing}
        />
        <textarea
          className="mt-4 w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          placeholder="Topic Description"
          value={topic.topicDescription}
          onChange={(e) => handleTopicChange(topicIndex, 'topicDescription', e.target.value)}
          rows="3"
          disabled={!editing}
        />
        <div className="mt-4">
        {topic.lessons.map((lesson, lessonIndex) => (
              <div key={lessonIndex} className="bg-white p-4 rounded-md shadow mt-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold">Lesson {lessonIndex + 1}</h4>
                  {editing ? (
                    <button
                      type="button"
                      className="text-red-500 hover:text-red-700 transition duration-300"
                      onClick={() => handleRemoveLesson(topicIndex, lessonIndex)}
                    >
                      Remove Lesson <AiFillMinusCircle className="inline-block ml-1" />
                    </button>
                  ) : null}
                </div>
                {editing ? (
                  <div>
                    <input
                      type="text"
                      className="mt-2 w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                      placeholder="Lesson Title"
                      value={lesson.lessonTitle}
                      onChange={(e) => handleLessonChange(topicIndex, lessonIndex, 'lessonTitle', e.target.value)}
                      disabled={!editing}
                    />
                    <UploadLessonForm
                      topicIndex={topicIndex}
                      lessonIndex={lessonIndex}
                      lesson={lesson} // Make sure this is correctly defined in your topic's lessons array
                      handleLessonChange={handleLessonChange}
                    />
                  </div>
                ) : null}
              </div>
            ))}

          {editing ? (
            <div className="mt-4">
             <button
                type="button"
                className="text-blue-500 hover:text-blue-700 transition duration-300"
                onClick={() => {
                  handleAddLesson(topicIndex);
                  setEditing(true); // Set editing to true when adding a lesson
                }}
              >
                Add Lesson <AiFillPlusCircle className="inline-block ml-1" />
              </button>

            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CreateTopicForm;
