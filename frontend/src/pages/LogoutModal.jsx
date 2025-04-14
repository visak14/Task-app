import React from 'react';

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-[90%] max-w-md rounded-xl shadow-xl font-sans overflow-hidden">
       
        <div className="bg-purple-800 text-white text-lg font-semibold px-6 py-4 text-center">
          Log Out
        </div>

        {/* Body */}
        <div className="px-6 py-8 text-center">
          <p className="text-gray-700 text-base mb-6">
            Are you sure you want to log out?
          </p>

         
          <div className="flex justify-center gap-4">
            <button
              onClick={onClose}
              className="bg-purple-800 text-white px-6 py-2 rounded-full text-sm font-medium shadow-md hover:bg-purple-900 transition"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="text-red-600 border border-red-600 px-6 py-2 rounded-full text-sm font-medium hover:bg-red-50 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
