import React, { useState } from 'react';

const NewPostForm = ({ onCreatePost, threadId }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!content.trim()) {
      // Handle validation errors, e.g., display an error message
      return;
    }

    // Create a new post object
    const newPost = {
      content: content.trim(),
      thread: threadId,
    };


    // Call the callback function to create the new post
    onCreatePost(newPost);

    // Clear the form field
    setContent('');
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Post Content
          </label>
          <textarea
            id="content"
            className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-40"
            placeholder="Enter the post content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewPostForm;
