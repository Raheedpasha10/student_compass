import React from 'react';

const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-6">
      <div className="relative">
        {/* Main spinner with enhanced design */}
        <div className="w-20 h-20 border-4 border-transparent rounded-full animate-spin gradient-border border-t-blue-500 border-r-indigo-500"></div>
        
        {/* Secondary spinner for layered effect */}
        <div className="absolute inset-0 w-20 h-20 border-4 border-transparent rounded-full animate-spin gradient-border border-b-purple-500 border-l-blue-500" 
             style={{ animationDirection: 'reverse', animationDuration: '1.2s' }}></div>
        
        {/* Center dot with glow effect */}
        <div className="absolute inset-0 w-20 h-20 flex items-center justify-center">
          <div className="w-4 h-4 rounded-full animate-pulse bg-gradient-to-r from-blue-500 to-indigo-500 shadow-lg neon-glow"></div>
        </div>
      </div>
      
      {/* Enhanced message with gradient text */}
      <p className="text-lg font-bold animate-pulse text-gray-300">
        {message}
      </p>
      
      {/* Enhanced bouncing dots with theme support */}
      <div className="flex space-x-2">
        <div className="w-3 h-3 rounded-full animate-bounce bg-blue-500"></div>
        <div className="w-3 h-3 rounded-full animate-bounce bg-indigo-500" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-3 h-3 rounded-full animate-bounce bg-purple-500" style={{ animationDelay: '0.4s' }}></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;