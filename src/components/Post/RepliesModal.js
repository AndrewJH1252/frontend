import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createReply, getRepliesForPost } from '../../redux/Thunks/postThunk';
import { setReplies } from '../../redux/slice/postSlice';
import Reply from './Reply';
import { useNavigate } from 'react-router-dom';

const RepliesModal = ({ postId, isOpen, onRequestClose }) => {
  const [replyContent, setReplyContent] = useState('');
  const [modalSize, setModalSize] = useState({ width: '400px', height: '60vh' }); // Initial width and height
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 }); // Initial position
  const [isDragging, setIsDragging] = useState(false);
  const [ws, setWs] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const replies = useSelector((state) => state.posts.replies) || [];

  const toggleModalSize = () => {
    if (modalSize.height === '60vh') {
      setModalSize({ width: '400px', height: '80vh' }); // Expand the modal
    } else {
      setModalSize({ width: '500px', height: '60vh' }); // Collapse the modal
    }
  };

  const modalStyle = {
    width: modalSize.width,
    height: modalSize.height,
    transform: `translate(${modalPosition.x}px, ${modalPosition.y}px)`,
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    const offsetX = e.clientX - modalPosition.x;
    const offsetY = e.clientY - modalPosition.y;

    const handleMouseMove = (e) => {
      if (isDragging) {
        const newX = e.clientX - offsetX;
        const newY = e.clientY - offsetY;
        setModalPosition({ x: newX, y: newY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  useEffect(() => {
    if (isOpen) {
      // Establish a WebSocket connection when the modal is opened
      const newWs = new WebSocket('ws://localhost:5000'); // Replace with your WebSocket URL
      setWs(newWs);

      newWs.onopen = () => {
        console.log('WebSocket connection opened.');
        // Subscribe to a specific postId or room here
        newWs.send(JSON.stringify({ type: 'subscribe', postId }));
      };

      newWs.onmessage = (event) => {
        const data = event.data;

        if (data instanceof ArrayBuffer || data instanceof Blob) {
          // Handle binary data (ArrayBuffer or Blob)
          // You can process binary data here or ignore it
          console.log('Received binary data:', data);
        } else {
          try {
            const parsedMessage = JSON.parse(data);
            console.log('Received WebSocket message:', parsedMessage);

            if (parsedMessage.type === 'new_reply') {
              const newReplyData = parsedMessage.data;
              // Dispatch an action to update your Redux store with the new reply
              // Use setReplies from your slice to update the replies in Redux
              dispatch(setReplies([...replies, newReplyData])); // Add the new reply to the replies array
            }
          } catch (error) {
            console.error('Error parsing WebSocket message:', error);
          }
        }
      };

      newWs.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    }

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [dispatch, postId, isOpen, replies]); // Include replies in the dependencies array

  const handleReplySubmit = (e) => {
    e.preventDefault();
    dispatch(
      createReply({
        postId,
        content: replyContent,
      })
    );
    
    setReplyContent(''); // This clears the input field
    navigate(0);
   
  };

  useEffect(() => {
    // Fetch replies when the modal is opened
    if (isOpen) {
      // Dispatch the getRepliesForPost action for the postId
      dispatch(getRepliesForPost(postId));
    }
  }, [dispatch, postId, isOpen]);

  return (
    <div>
      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 mb-6"
          onMouseDown={handleMouseDown}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          {/* Background Overlay */}
          <div className="absolute inset-0 bg-black opacity-70"></div>

          <div style={modalStyle}>
            <div className="bg-white rounded-lg shadow-md w-full relative transform scale-105 transition-transform ease-in-out duration-300">
              {/* Modal Header */}
              <div className="bg-blue-500 text-white py-4 px-6 rounded-t-lg">
                <h2 className="text-2xl font-semibold">Replies</h2>
              </div>

              {/* Resize Button */}
              <button
                className="absolute top-4 right-4 text-gray-100 hover:text-gray-700 hover:bg-gray-200 border border-gray-500 rounded-lg px-2 py-1 font-semibold transition duration-300"
                onClick={toggleModalSize}
              >
                Resize
              </button>

              {/* Scrollable Replies Container */}
              <div className="max-h-80 overflow-y-auto mb-4">
                {replies.map((reply) => (
                  reply && reply._id ? (
                    <Reply key={reply._id} reply={reply} />
                  ) : null
                ))}
              </div>

              {/* Reply Form */}
              <form onSubmit={handleReplySubmit} className="p-4">
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-md resize-none text-gray-700 text-lg"
                  placeholder="Write your reply..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  required
                  rows="3"
                />
                <div className="flex justify-end space-x-3 mt-2">
                  <button
                    type="submit"
                    className="text-white bg-blue-500 hover:bg-blue-600 border border-blue-500 rounded-lg px-4 py-2 font-semibold transition duration-300"
                  >
                    Reply
                  </button>
                  <button
                    type="button"
                    onClick={onRequestClose}
                    className="text-gray-600 hover:bg-gray-200 border border-gray-500 rounded-lg px-4 py-2 font-semibold transition duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RepliesModal;
