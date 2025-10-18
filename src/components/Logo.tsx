import React from 'react';
import logoImage from '../assets/safe.png';

export const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src={logoImage} 
        alt="Safely Logo" 
        className="h-16 w-auto object-contain filter brightness-125 contrast-150 saturate-120 drop-shadow-lg hover:scale-105 transition-transform duration-200"
      />
    </div>
  );
};
