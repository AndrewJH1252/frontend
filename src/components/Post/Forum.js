import React, { useState, useEffect } from 'react';
import ThreadList from './ThreadList';
import NewThreadForm from './NewThreadForm';
import { useDispatch, useSelector } from 'react-redux';
import { getAllThreads, createThread } from '../../redux/Thunks/threadThunk';
import { updateThreads } from '../../redux/slice/threadSlice';
import { Link } from 'react-router-dom';

const Forum = () => {
  const [ws, setWs] = useState(null);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
  const [showNoThreadsMessage, setShowNoThreadsMessage] = useState(false);
  const [borderColor, setBorderColor] = useState('#FFA500');
  const dispatch = useDispatch();
  const threads = useSelector((state) => state.threads.threads || []);

  useEffect(() => {
    // Fetch existing threads when the component mounts
    dispatch(getAllThreads());
    
    // Create a new WebSocket connection
    const newWs = new WebSocket('ws://localhost:5000');
    setWs(newWs);

    newWs.onopen = () => {
      console.log('WebSocket connection opened.');
    };

    newWs.onclose = () => {
      console.log('WebSocket connection closed. Reconnecting...');
      // Reconnect to WebSocket on close, you can implement a retry mechanism here
      setTimeout(() => {
        setWs(new WebSocket('ws://localhost:5000'));
      }, 5000); // Reconnect after 5 seconds (adjust this as needed)
    };

    return () => {
      newWs.close();
    };
  }, [dispatch]);

  // ...

  useEffect(() => {
    if (ws) {
      ws.onmessage = (event) => {
        const data = event.data;

        if (data instanceof ArrayBuffer || data instanceof Blob) {
          // Handle binary data (ArrayBuffer or Blob)
          // You can process binary data here or ignore it
          console.log('Received binary data:', data);
        } else {
          try {
            const parsedMessage = JSON.parse(data);
            console.log('Received WebSocket message:', parsedMessage);

            if (parsedMessage.type === 'new_thread') {
              const newThreadData = parsedMessage.data;
              // Process the new thread data as needed
              // You can dispatch an action to update your Redux store with the new thread
              dispatch(updateThreads(newThreadData));
            }
          } catch (error) {
            console.error('Error parsing WebSocket message:', error);
          }
        }
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    }
  }, [ws, dispatch]);

  // ...

  const handleNewThread = (newThread) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      const messageObject = {
        type: 'new_thread',
        data: newThread,
      };
  
      // Convert the object to a JSON string before sending
      const message = JSON.stringify(messageObject);
  
      ws.send(message);
  
      // Dispatch the createThread action to send the new thread data to the server
      dispatch(createThread(newThread)); // Add this line
    } else {
      console.error('WebSocket is not in an OPEN state.');
    }
  };
  

  // ...

  useEffect(() => {
    if (threads.length === 0) {
      setShowNoThreadsMessage(true);
    } else {
      setShowNoThreadsMessage(false);
    }
  }, [threads]);

  const closeWelcomeMessage = () => {
    setShowWelcomeMessage(false);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const randomColor = '#' + ((Math.random() * 0xffffff) << 0).toString(16);
      setBorderColor(randomColor);
    }, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const h1Style = {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    marginLeft: '1rem',
    border: `5px solid ${borderColor}`,
    borderRadius: '25px',
    padding: '0.5rem 1rem',
    display: 'inline-block',
    margin: '0 auto',
    textAlign: 'center',
  };

  return (
    <div className="bg-indigo-900 text-white min-h-screen py-8">
       
    <div className="max-w-6xl mx-auto px-4 mb-8">
      {showWelcomeMessage && (
        <div className="bg-blue-400 p-4 rounded-md mb-4 text-center relative">
          <button
            className="float-right text-blue-900 hover:text-red-500"
            onClick={closeWelcomeMessage}
          >
            ✕
          </button>
          <h2 className="text-3xl font-semibold mb-2">Welcome to the Forum!</h2>
          <p className="text-lg">
            This is a user-friendly guide on how to use the forum.
          </p>
        </div>
      )}

      {showNoThreadsMessage && (
        <div className="bg-yellow-400 p-4 rounded-md mb-4 text-center">
          <h2 className="text-3xl font-semibold text-yellow-800 mb-2">
            No Threads Available
          </h2>
          <p className="text-lg">
            There are currently no threads available. Start by creating a new thread.
          </p>
        </div>
      )}

      <div className="mb-8">
        <NewThreadForm onCreateThread={handleNewThread} />
      </div>
      {/* Add a link to the Community Page */}
      <div className="mb-4 text-center">
        <Link to="/community" className="text-blue-300 hover:underline">
          Go to Community Page
        </Link>
      </div>
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Latest Threads</h2>
        {threads.length === 0 ? (
          <p className="text-gray-600">No threads available.</p>
        ) : (
          <ThreadList threads={threads} />
        )}
      </div>
    </div>
  </div>
  );
};

export default Forum;
