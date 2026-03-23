import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export function GradientButton({ children, onClick, className, icon: Icon, ...props }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        "flex items-center justify-center gap-2 bg-gradient-to-r from-[#0984e3] to-[#74b9ff] text-white font-medium px-5 py-2.5 rounded-xl shadow-lg hover:shadow-blue-500/30 transition-shadow outline-none", 
        className
      )}
      {...props}
    >
      {Icon && <Icon size={18} />}
      {children}
    </motion.button>
  );
}
