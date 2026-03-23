import React from 'react';

const Badge = ({ children, color = 'medium', className = '' }) => {
  const getColors = () => {
    switch(color.toLowerCase()) {
      case 'high': return { bg: 'var(--priority-high)', color: '#fff' };
      case 'medium': return { bg: 'var(--priority-medium)', color: '#333' };
      case 'low': return { bg: 'var(--priority-low)', color: '#333' };
      case 'success': return { bg: 'var(--success-color)', color: '#fff' };
      case 'danger': return { bg: 'var(--danger-color)', color: '#fff' };
      case 'info': return { bg: 'var(--accent-color)', color: '#fff' };
      default: return { bg: 'var(--glass-border)', color: 'var(--text-primary)' };
    }
  };

  const style = getColors();

  return (
    <span 
      className={`text-xs font-semibold px-2 py-1 rounded-full ${className}`}
      style={{ backgroundColor: style.bg, color: style.color, display: 'inline-block', fontSize: '0.75rem', padding: '0.25rem 0.6rem', borderRadius: '999px' }}
    >
      {children}
    </span>
  );
};

export default Badge;
