import React, { useState } from 'react';
import { AiFillCheckCircle, AiOutlineClockCircle, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { updateMessage, deleteMessage } from '../../redux/Thunks/messageThunk';

const MessageCard = ({ message, currentUser, userId, conversationId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedMessage, setEditedMessage] = useState(message.message);
  const isSentByCurrentUser = message.userId === currentUser.id;
  const dispatch = useDispatch();

  const handleEditMessage = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    dispatch(updateMessage({ userId, conversationId, messageId: message.id, updatedMessage: editedMessage }));
    setIsEditing(false);
  };

  const handleDeleteMessage = () => {
    dispatch(deleteMessage({ userId, conversationId, messageId: message.id }));
  };

  return (
    <div
      className={`message-card p-4 rounded-lg ${
        isSentByCurrentUser ? 'bg-blue-100 text-right' : 'bg-gray-100 text-left'
      }`}
    >
      {isEditing ? (
        <textarea
          className="w-full p-2 border rounded-lg resize-none"
          rows="2"
          value={editedMessage}
          onChange={(e) => setEditedMessage(e.target.value)}
        />
      ) : (
        <p className="mb-1">{message.message}</p>
      )}
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-600">
          {isSentByCurrentUser ? 'You' : 'Sender'} - {message.createdAt}
        </span>
        <div className="flex space-x-2">
          {isSentByCurrentUser && (
            <>
              {isEditing ? (
                <button
                  className="text-blue-500 hover:text-blue-600"
                  onClick={handleSaveEdit}
                >
                  <AiFillCheckCircle />
                </button>
              ) : (
                <button
                  className="text-blue-500 hover:text-blue-600"
                  onClick={handleEditMessage}
                >
                  <AiOutlineEdit />
                </button>
              )}
              <button
                className="text-red-500 hover:text-red-600"
                onClick={handleDeleteMessage}
              >
                <AiOutlineDelete />
              </button>
            </>
          )}
          {message.isRead ? (
            <AiFillCheckCircle className="text-green-500" />
          ) : (
            <AiOutlineClockCircle className="text-gray-500" />
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageCard;
