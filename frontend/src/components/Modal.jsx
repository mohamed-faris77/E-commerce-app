import React from 'react';
import { X, CheckCircle, AlertTriangle, Info } from 'lucide-react';

function Modal({
  isOpen,
  onClose,
  title,
  message,
  type = 'success',
  showActions = true,
  onConfirm,
  confirmText = 'Yes',
  cancelText = 'No'
}) {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'success': return <CheckCircle size={48} className="text-green-500 flex-shrink-0" />;
      case 'error': return <AlertTriangle size={48} className="text-red-500 flex-shrink-0" />;
      case 'confirm': return <Info size={48} className="text-blue-500 flex-shrink-0" />;
      default: return <CheckCircle size={48} className="text-green-500 flex-shrink-0" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full p-6 transform transition-all scale-100">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
        >
          <X size={24} />
        </button>

        {/* Content */}
        <div className="flex items-start gap-4">
          {getIcon()}
          <div className="flex-1 pt-1">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{message}</p>
          </div>
        </div>

        {/* Action buttons */}
        {showActions && (
          <div className="mt-8 flex gap-3 justify-end">
            {type === 'confirm' ? (
              <>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium transition-colors"
                >
                  {cancelText}
                </button>
                <button
                  onClick={() => {
                    if (onConfirm) onConfirm();
                    onClose();
                  }}
                  className="px-5 py-2.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 font-medium shadow-sm transition-colors"
                >
                  {confirmText}
                </button>
              </>
            ) : (
              // Logic to support both the "Added to Cart" flow (default) and generic success messages
              onConfirm ? (
                <button
                  onClick={() => {
                    onConfirm();
                    onClose();
                  }}
                  className="px-5 py-2.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 font-medium shadow-sm transition-colors"
                >
                  Okay
                </button>
              ) : (
                // Default "Added to Cart" buttons if no specific handler is passed
                // This preserves the behavior for the Product page
                <>
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
                </>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Modal;
