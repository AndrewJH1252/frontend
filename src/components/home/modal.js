import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ children, onClose }) => {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-md shadow-md w-96">{children}</div>
    </div>,
    document.getElementById('modal-root') // Create a div with this ID in your HTML
  );
};

export default Modal;
