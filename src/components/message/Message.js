import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchMessages,
  sendMessage,
  markMessageAsRead,
} from '../../redux/Thunks/messageThunk'; // Update with your actual thunk imports
import {  AiOutlineSend } from 'react-icons/ai';
import MessageCard from './MessageCard';

const Message = () => {
  const { userId, conversationId } = useParams();
  const dispatch = useDispatch();
  const [inputMessage, setInputMessage] = useState('');
  const messages = useSelector((state) => state.messages); // Assuming you have a state for messages

  useEffect(() => {
    dispatch(fetchMessages({ userId, conversationId }));
    // Mark all messages as read as soon as the component is opened
    dispatch(markMessageAsRead({ userId, conversationId }));
  }, [dispatch, userId, conversationId]);

  const handleSendMessage = () => {
    dispatch(sendMessage({ userId, conversationId, message: inputMessage }));
    setInputMessage('');
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Message History</h2>
        <div className="space-y-4">
          {messages.map((message) => (
            <MessageCard key={message.id} message={message} />
          ))}
        </div>
        <div className="mt-6">
          <textarea
            className="w-full p-2 border rounded-lg resize-none"
            rows="4"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <button
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleSendMessage}
          >
            <AiOutlineSend className="mr-2 inline-block" />
            
          </button>
        </div>
      </div>
    </div>
  );
};

export default Message;
