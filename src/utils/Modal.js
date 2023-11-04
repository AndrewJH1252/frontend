// common/Modal.js

import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-75 bg-gray-900">
      <div className="bg-white p-4 rounded-lg shadow-md">
        {children}
        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 mr-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
