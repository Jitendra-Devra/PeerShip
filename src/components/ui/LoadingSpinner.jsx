// Replace your LoadingSpinner.jsx with this:
import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="spinner w-10 h-10 rounded-full border-4 border-t-blue-500 border-r-blue-500/30 border-b-blue-500/30 border-l-blue-500/30 animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;