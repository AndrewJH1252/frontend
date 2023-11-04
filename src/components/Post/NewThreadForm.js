import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactQuill from 'react-quill'; // Import ReactQuill
import 'react-quill/dist/quill.snow.css'; // Import ReactQuill styles
import { fetchCategories } from '../../redux/Thunks/categoriesThunk';

const NewThreadForm = ({ onCreateThread }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const categories = useSelector((state) => state.categories.categories);
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleQuillChange = (value) => {
    setContent(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the input fields before creating a new thread
    if (!title.trim() || !content.trim() || !selectedCategory) {
      // Handle validation errors, e.g., display an error message
      return;
    }

    // Create a new thread object
    const newThread = {
      title: title.trim(),
      content: content.trim(),
      category: selectedCategory,
      tags: tags.map((tag) => tag.trim()),
    };

    console.log('newThread',newThread);

    // Call the callback function to create the new thread
    onCreateThread(newThread);

    // Clear the form fields
    setTitle('');
    setContent('');
    setSelectedCategory('');
    setTags([]);
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(updatedTags);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Create a New Thread</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Thread Title
          </label>
          <input
            type="text"
            id="title"
            className="mt-1 p-2 text-gray-700 block w-full rounded-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="Enter the thread title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Select Category
          </label>
          <select
            id="category"
            className="mt-1 p-2 text-gray-700 block w-full rounded-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories && categories.length > 0 ? (
              categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))
            ) : (
              <option value="" disabled>
                No categories available
              </option>
            )}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
            Tags
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              id="tags"
              className="p-2 block text-gray-700 w-full rounded-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Add tags"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              Add
            </button>
          </div>
          <div className="mt-2 flex flex-wrap">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-indigo-100 text-indigo-800 px-2 py-1 m-1 rounded-md flex items-center"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-2 text-lg text-red-600 hover:text-red-800 focus:outline-none"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>
        <div className="mb-6">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Thread Content
          </label>
          <ReactQuill
            className="rounded-md text-gray-700 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={content}
            onChange={handleQuillChange}
            placeholder="Enter the thread content"
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

export default NewThreadForm;
