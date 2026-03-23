import React from 'react';
import { cn } from '../../utils/cn';

export function Badge({ children, variant = 'medium', className }) {
  const v = {
    'high': 'bg-priority-high/10 text-priority-high border-priority-high/20',
    'medium': 'bg-priority-medium/10 text-yellow-600 dark:text-priority-medium border-priority-medium/20',
    'low': 'bg-priority-low/10 text-teal-600 dark:text-priority-low border-priority-low/20'
  }[variant.toLowerCase()] || 'bg-gray-200/50 text-gray-700 border-gray-300';

  return (
    <span className={cn("px-2.5 py-1 rounded-full text-xs font-bold border flex items-center justify-center", v, className)}>
      {children}
    </span>
  );
}
