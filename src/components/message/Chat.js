import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaPaperPlane, FaTimes } from 'react-icons/fa';
import { sendChatMessage, fetchChatMessages } from './../../redux/Thunks/chatThunk';
import { addMessage } from './../../redux/slice/chatSlice';

const Chat = ({ request, onClose }) => {
  const user = useSelector((state) => state.auth.profile);
  const messages = useSelector((state) => state.chat.messages);
  const dispatch = useDispatch();

  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const messageData = {
      sender: user._id,
      recipient: request.tutor,
      content: newMessage,
      createdAt: new Date(),
    };

    // Dispatch the sendChatMessage thunk to send the message via WebSocket
    dispatch(sendChatMessage(messageData));

    // Dispatch the addMessage action to add the message to the Redux store
    dispatch(addMessage(messageData));

    setNewMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Use useEffect to handle incoming messages from WebSocket and fetch previous messages
  useEffect(() => {
    // Fetch previous messages when the chat is opened
    const senderId = user._id;
    const recipientId = request.tutor;
    
    // Dispatch the fetchChatMessages thunk to retrieve previous chat messages
    dispatch(fetchChatMessages({ sender: senderId, recipient: recipientId }));

    // WebSocket setup remains the same
    const socket = new WebSocket('ws://localhost:5000');

    socket.onmessage = (event) => {
      const receivedMessage = JSON.parse(event.data);

      // Dispatch the addMessage action to add the received message to the Redux store
      dispatch(addMessage(receivedMessage));
    };

    return () => {
      socket.close();
    };
  }, [dispatch, request.tutor, user._id]);
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 overflow-x-hidden overflow-y-auto">
      <div className="relative w-full max-w-md">
        <div className="relative flex flex-col w-full bg-blue-100 border border-blue-900 rounded-lg shadow-lg p-3">
          <div className="flex items-start justify-between p-4 border-b border-solid border-blueGray-200 rounded-t">
            <h3 className="text-2xl font-semibold">
              Chat 
            </h3>
            <button
              className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none hover:text-red-500 transform hover:scale-110 transition-transform duration-300"
              onClick={onClose}
            >
              <FaTimes />
            </button>
          </div>
          <div className="relative p-6 flex-auto bg-gray-800">
            <div className="overflow-y-auto h-64">
            {messages.map((message, index) => (
             <div
             key={index}
             className={`mb-4 ${
               message.sender === user._id ? 'text-right' : 'text-left'
             }`}
           >
             <p className="text-xs text-gray-500">
               {message.sender === user._id
                 ? 'You'
                 : message.sender === request.tutor // Assuming `request.tutor` is the recipient ID
                 ? 'Recipient'
                 : 'Other User'}
             </p>
             <div
               className={`px-3 py-2 rounded-lg ${
                 message.sender === user._id
                   ? 'bg-blue-500 text-white'
                   : 'bg-gray-300 text-black'
               }`}
             >
               {message.content}
             </div>
           </div>
      
           
         
           
            ))}

            </div>
          </div>
          <div className="flex items-center  justify-center p-3 border-t border-solid border-blueGray-200 rounded-b">
            <input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress} 
              className="w-full p-3 pl-3 bg-gray-100 border border-gray-300 rounded-lg outline-none focus:outline-none"
            />
            <button
              className="ml-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300"
              onClick={handleSendMessage}
            >
              <FaPaperPlane className="text-xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
