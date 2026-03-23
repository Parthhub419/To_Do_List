import React from 'react';
import { cn } from '../../utils/cn';

export function GlassCard({ children, className, ...props }) {
  return (
    <div className={cn("glass-panel p-6", className)} {...props}>
      {children}
    </div>
  );
}
