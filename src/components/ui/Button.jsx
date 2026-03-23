import React from 'react';

const Button = ({ children, className = '', variant = 'primary', onClick, icon: Icon, ...props }) => {
  return (
    <button 
      className={`neumorphic-btn ${className}`} 
      onClick={onClick}
      {...props}
    >
      {Icon && <Icon size={18} />}
      {children}
    </button>
  );
};

export default Button;
