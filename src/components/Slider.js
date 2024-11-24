import React from 'react';

export function Slider({ isOpen, onClose, children }) {
  return (
    <div
      className={`fixed top-0 right-0 h-full bg-white shadow-lg transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } transition-transform duration-300 w-64`}
    >
      <button
        className="absolute top-4 left-4 text-gray-500 hover:text-gray-800"
        onClick={onClose}
      >
        Close
      </button>
      <div className="p-4">{children}</div>
    </div>
  );
}

