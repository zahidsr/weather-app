import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-8 animate-fade-in">
      <div className="relative">
        {/* Main spinning circle */}
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-white/20 border-t-yellow-400"></div>
        
        {/* Inner pulsing circle */}
        <div className="absolute inset-2 animate-pulse rounded-full bg-yellow-400/20"></div>
        
        {/* Weather icon in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-2xl animate-bounce">🌤️</div>
        </div>
      </div>
      
      <p className="text-white/80 mt-4 text-lg font-medium animate-pulse">
        Hava durumu verisi alınıyor...
      </p>
    </div>
  );
};

export default LoadingSpinner; 