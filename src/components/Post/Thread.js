import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaComment } from 'react-icons/fa';
import PostList from './PostList';
import { useParams } from 'react-router-dom';
import NewPostForm from './NewPostForm';
import NewThreadForm from './NewThreadForm';
import { createThread, getThreadById} from '../../redux/Thunks/threadThunk';
import { createPost, getAllPostsInThread  } from '../../redux/Thunks/postThunk'; // Import the createPost thunk

const Thread = () => {  
  const dispatch = useDispatch();
  const { threadId } = useParams();
  const [ws, setWs] = useState(null);
  const posts = useSelector((state) => state.posts.posts);
;
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [showNewThreadForm, setShowNewThreadForm] = useState(false);

  useEffect(() => {
    // Create a WebSocket connection when the component mounts
    if (threadId) {
      const newWs = new WebSocket('ws://localhost:5000'); // Replace with your WebSocket URL
      setWs(newWs);

      newWs.onopen = () => {
        console.log('WebSocket connection opened.');
      };

      newWs.onmessage = (event) => {
        console.log('Received message from server:', event.data);
        // Handle WebSocket messages from the server as needed
      };

      newWs.onclose = (event) => {
        console.log('WebSocket connection closed:', event.code, event.reason);
      };

      return () => {
        // Close the WebSocket connection when the component unmounts
        if (newWs && newWs.readyState === WebSocket.OPEN) {
          newWs.close();
        }
      };
    }
  }, [threadId]);

  useEffect(() => {
    // Fetch thread data when the component mounts
    if (threadId) {
      dispatch(getThreadById(threadId))
        .then(() => {
          // Thread data is now in the Redux state, so you can access it like this:
          dispatch(getAllPostsInThread(threadId)); // Fetch posts for the thread
        })
        .catch((error) => {
          console.error('Error fetching thread data:', error);
        });
    }
  }, [dispatch, threadId]);

  const handleNewThread = (newThread) => {
    if (ws) {
      const message = JSON.stringify({
        type: 'new_thread',
        data: newThread,
      });
      ws.send(message);
    }

    dispatch(createThread(newThread))
      .then((createdThread) => {
        // Handle success, maybe update the UI
        console.log('Thread created successfully:', createdThread);
        setShowNewThreadForm(false); // Close the NewThreadForm
      })
      .catch((error) => {
        console.error('Error creating thread:', error);
      });
  };

  const handleNewPost = (newPost) => {
    if (ws) {
      const message = JSON.stringify({
        type: 'new_post',
        data: newPost,
      });
      ws.send(message);
    }

    dispatch(createPost(newPost))
      .then((createdPost) => {
        // Handle success, maybe update the UI
        console.log('Post created successfully:', createdPost);
        setShowNewPostForm(false); // Close the NewPostForm
      })
      .catch((error) => {
        console.error('Error creating post:', error);
      });
  };
  



  return (
    <div className="bg-gray-100 min-h-screen p-4">
    <div className="bg-white shadow-lg rounded-lg p-6 mb-4">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-4">Thread Title</h1>
      <div className="bg-gray-200 rounded-lg p-4 mb-4">
        <button
          className="text-blue-500 hover:underline mb-3"
          onClick={() => setShowNewPostForm(!showNewPostForm)}
        >
          {showNewPostForm ? 'Hide New Post Form' : 'Create New Post'}
        </button>
        {showNewPostForm && (
          <NewPostForm onCreatePost={handleNewPost} threadId={threadId} />
        )}
      </div>
      <div className="bg-gray-200 rounded-lg p-4 mb-4">
        <button
          className="text-blue-500 hover:underline mb-3"
          onClick={() => setShowNewThreadForm(!showNewThreadForm)}
        >
          {showNewThreadForm ? 'Hide New Thread Form' : 'Create New Thread'}
        </button>
        {showNewThreadForm && (
          <NewThreadForm onCreateThread={handleNewThread} />
        )}
      </div>
      <div className="mt-8">
        <div className="flex items-center justify-between text-gray-600 text-sm">
          <div className="flex items-center space-x-4">
            <FaComment className="w-5 h-5 fill-current text-blue-500" />
            <span>Posts in this Thread</span>
          </div>
        </div>
        <PostList posts={posts} />
      </div>
    </div>
  </div>
  
  );
};

export default Thread;
