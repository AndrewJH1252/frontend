import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'; // Import icons
import { updateThread, deleteThread, getThreadById } from '../../redux/Thunks/threadThunk';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';

const ThreadCard = ({ thread, index }) => {
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [reloadRequests, setReloadRequests] = useState(Date.now());
  const [editedThread, setEditedThread] = useState({
    title: thread.title,
    content: thread.content,
  });

  const author = thread.author;
  const dispatch = useDispatch();
  const [ws, setWs] = useState(null);
  const currentUser = useSelector((state) => state.auth.profile);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const bgColorClass = [
    'bg-blue-100',
    'bg-yellow-100',
    'bg-pink-100',
    'bg-purple-100',
    'bg-green-100',
    'bg-red-100',
    'bg-indigo-100',
    'bg-amber-100',
    'bg-pink-200',
    'bg-purple-200',
    'bg-green-200',
    'bg-red-200',
    'bg-indigo-200',
    'bg-amber-200',
    'bg-pink-300',
    'bg-purple-300',
    'bg-green-300',
    'bg-red-300',
    'bg-indigo-300',
    'bg-amber-300',
    'bg-pink-400',
    'bg-purple-400',
    'bg-green-400',
    'bg-red-400',
    'bg-indigo-400',
    'bg-amber-400',
   
  ];

  const handleEditThread = () => {
  dispatch(updateThread({ threadId: thread._id, ...editedThread }))
    .then((updatedData) => {
      console.log('Thread updated successfully:', updatedData);
      toggleEditing();
      navigate(0); // Refresh the page after successful update
    })
    .catch((error) => {
      console.error('Error updating thread:', error);
    });
};

const handleDeleteThread = () => {
  dispatch(deleteThread(thread._id))
    .then(() => {
      console.log('Thread deleted successfully');
      navigate(0); // Refresh the page after successful delete
    })
    .catch((error) => {
      console.error('Error deleting thread:', error);
    });
};


  useEffect(() => {
    // Update editedThread when the thread prop changes
    setEditedThread({
      title: thread.title,
      content: thread.content,
    });
  }, [thread]);

  useEffect(() => {
    // You can perform any additional actions here when reloadRequests changes
    // For example, if you want to fetch updated data, you can do it here
    if (reloadRequests) {
      dispatch(getThreadById(thread._id));
    }
    
  }, [dispatch, reloadRequests]);

  const stripHtmlTags = (html) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || '';
  };


  return (
    <div className={`bg-white shadow-lg rounded-lg p-4 hover:shadow-xl cursor-pointer transition-transform transform hover:scale-105 ${bgColorClass}`}>
       <div className={`w-full ${isEditing ? 'hidden' : 'block'}`}>
        <h2 className="text-xl font-semibold text-gray-800 mb-2 truncate">{thread.title}</h2>
        <div className={`text-gray-600 ${showDetails ? 'block' : 'hidden'}`}>
          {stripHtmlTags(thread.content)}
        </div>
      </div>
      <div className={`w-full ${isEditing ? 'block' : 'hidden'}`}>
        <input
          type="text"
          value={editedThread.title}
          onChange={(e) => setEditedThread({ ...editedThread, title: e.target.value })}
          className="w-full px-3 py-2 mb-2 text-gray-800 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Edit Title"
        />
      <textarea
        value={stripHtmlTags(editedThread.content)}
        onChange={(e) => setEditedThread({ ...editedThread, content: e.target.value })}
        className="w-full h-32 px-3 py-2 text-gray-800 border rounded-md focus:outline-none focus:ring focus:border-blue-300 resize-none"
        placeholder="Edit Content"
      ></textarea>


      </div>

      <div className={`flex items-center justify-between mt-4 ${showDetails ? 'block' : 'hidden'}`}>
        <Link to={`/threads/${thread._id}`} className="text-orange-500 hover:underline">
          View Posts
        </Link>
        <div className="flex items-center space-x-3">
          {author && currentUser && author._id === currentUser._id && (
            <>
              {isEditing ? (
                <button
                  onClick={handleEditThread}
                  className="text-indigo-600 hover:text-indigo-700 focus:outline-none transform transition-transform duration-300 hover:scale-110"
                  
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={toggleEditing}
                  className="text-orange-500 hover:text-orange-700 focus:outline-none transform transition-transform duration-300 hover:scale-110"
                  title='Edit'
                >
                  <FaEdit className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => handleDeleteThread(thread._id)} // Pass the thread ID to delete
                className="text-red-600 hover:text-red-700 focus:outline-none transform transition-transform duration-300 hover:scale-110"
                title='Delete'
              >
                <FaTrashAlt className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>
      <div className="flex items-center justify-center mt-2">
        <button
          className="text-blue-500 hover:underline"
          onClick={toggleDetails}
        >
          {showDetails ? (
            <div className='flex items-center'>
              <span>Hide Details</span>
              <AiOutlineEyeInvisible className="ml-2" />
            </div>
          ) : (
            <div className='flex items-center'>
              <span>Show Details</span>
              <AiOutlineEye className="ml-2" />
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default ThreadCard;