import React from 'react';

const Card = ({ children, className = '', variant = 'glass', ...props }) => {
  const baseClass = variant === 'glass' ? 'glass-card' : 'neumorphic';
  return (
    <div className={`${baseClass} ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Card;
