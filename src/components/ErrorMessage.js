import React from 'react';

const ErrorMessage = ({ message, onClose }) => {
  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-slide-up">
      <div className="bg-red-500/90 backdrop-blur-sm border border-red-400 rounded-2xl p-4 max-w-sm mx-4 shadow-lg">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="text-2xl">⚠️</div>
          </div>
          <div className="flex-1">
            <h3 className="text-white font-semibold mb-1">Hata</h3>
            <p className="text-white/90 text-sm leading-relaxed">
              {message}
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 text-white/60 hover:text-white transition-colors duration-200"
          >
            <div className="text-xl">×</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage; 