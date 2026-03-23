import React from 'react';
import { Search, Bell, Moon, Sun, User } from 'lucide-react';
import { useTheme } from '../../context/AppContext';
import { motion } from 'framer-motion';

const TopNav = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex items-center justify-between px-8 py-4 mb-6 z-10 relative">
      <div className="flex-1 max-w-xl">
        <div className="relative flex items-center w-full">
          <Search className="absolute left-4 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search tasks, events, and analytics..."
            className="w-full bg-card/60 backdrop-blur-md border border-card-border rounded-full py-2.5 pl-12 pr-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all neu-inner"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 ml-8">
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleTheme}
          className="p-2 rounded-full glass-panel hover:text-accent"
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </motion.button>

        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 rounded-full glass-panel relative hover:text-accent"
        >
          <Bell size={20} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
        </motion.button>

        <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-accent to-accent-light flex items-center justify-center text-white shadow-lg cursor-pointer hover:opacity-90 transition-opacity">
          <User size={20} />
        </div>
      </div>
    </header>
  );
};

export default TopNav;
