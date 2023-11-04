import React from 'react';
import { FaVideo } from 'react-icons/fa';

const UploadLessonForm = ({
  topicIndex,
  lessonIndex,
  lesson,
  handleLessonChange,
  handleSaveLesson,
}) => {
  return (
    <div className="mt-6 p-6 bg-white rounded shadow-lg">
      {lesson && (
        <div className="space-y-4">
          <div className="mb-4">
            <label htmlFor={`lesson-media-${topicIndex}-${lessonIndex}`} className="block text-lg font-semibold text-gray-700">
              Upload Lesson Media
            </label>
            <div className="flex items-center space-x-2 mt-2">
              <input
                type="file"
                id={`lesson-media-${topicIndex}-${lessonIndex}`}
                className="hidden"
                accept="video/*"
                onChange={(e) => handleLessonChange(topicIndex, lessonIndex, 'lessonMedia', e.target.files[0])}
              />
              <label
                htmlFor={`lesson-media-${topicIndex}-${lessonIndex}`}
                className="cursor-pointer flex items-center text-blue-500 hover:text-blue-700 transition duration-300"
              >
                <FaVideo className="mr-2 text-xl" />
                Upload Video
              </label>
            </div>
          </div>

          {lesson.lessonMedia && (
            <div className="mt-4">
              <video controls className="w-full max-h-64">
                <source src={URL.createObjectURL(lesson.lessonMedia)} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}

          <div className="space-y-4">
            <input
              type="number"
              className="w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              placeholder="Lesson Duration (in minutes)"
              value={lesson.lessonDuration}
              onChange={(e) => handleLessonChange(topicIndex, lessonIndex, 'lessonDuration', e.target.value)}
              min="0"
              required
            />
            <textarea
              className="w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              placeholder="Lesson Content"
              value={lesson.lessonContent}
              onChange={(e) => handleLessonChange(topicIndex, lessonIndex, 'lessonContent', e.target.value)}
              rows="3"
              required
            />

            <div className="flex space-x-4">
              {/* Video URL Input */}
              <input
                type="url"
                className="flex-1 px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                placeholder="Video URL"
                value={lesson.lessonURL || ''}
                onChange={(e) => handleLessonChange(topicIndex, lessonIndex, 'lessonURL', e.target.value)}
              />

          {/* isPaid Input */}
          <div className="flex items-center text-gray-700">
            <span className="mr-2">Is Paid:</span>
            <label htmlFor={`is-paid-${topicIndex}-${lessonIndex}`} className="relative inline-block w-14 h-7 cursor-pointer">
              <input
                type="checkbox"
                id={`is-paid-${topicIndex}-${lessonIndex}`}
                className="sr-only"
                checked={lesson.isPaid}
                onChange={(e) => handleLessonChange(topicIndex, lessonIndex, 'isPaid', e.target.checked)}
              />
              <div className="w-14 h-7 bg-gray-300 rounded-full shadow-inner transition-transform duration-300 ease-in-out transform scale-110">
                <div className={`w-7 h-7 rounded-full bg-white shadow-md transition-transform duration-300 ease-in-out transform ${lesson.isPaid ? 'translate-x-7' : 'translate-x-0'}`}></div>
              </div>
            </label>
          </div>

          </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadLessonForm;
