import React from 'react';
import { X, CheckCircle } from 'lucide-react';

function Modal({ isOpen, onClose, title, message, type = 'success' }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4 p-6 transform transition-all">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
        >
          <X size={24} />
        </button>

        {/* Content */}
        <div className="flex items-start gap-4">
          {type === 'success' && (
            <CheckCircle size={48} className="text-green-500 flex-shrink-0" />
          )}
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{message}</p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-6 flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => window.location.href = '/cart'}
            className="px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-500 transition-colors font-semibold"
          >
            View Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
