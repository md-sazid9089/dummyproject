import React from 'react';

const LoadingSpinner = ({ 
  size = 'md', 
  color = 'text-blue-600' 
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div className="flex justify-center items-center">
      <div className={`animate-spin rounded-full border-2 border-gray-300 border-t-current ${sizeClasses[size]} ${color}`}></div>
    </div>
  );
};

export default LoadingSpinner;