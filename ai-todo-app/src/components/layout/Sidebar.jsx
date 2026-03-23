import React from 'react';
import { LayoutDashboard, CheckSquare, Calendar, Award, Flame } from 'lucide-react';
import { motion } from 'framer-motion';
import { useGamification } from '../../context/GamificationContext';
import { cn } from '../../utils/cn';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'tasks', label: 'Tasks', icon: CheckSquare },
  { id: 'calendar', label: 'Calendar', icon: Calendar },
];

const Sidebar = ({ activeTab, setActiveTab }) => {
  const { points, currentStreak } = useGamification();

  return (
    <aside className="w-64 h-full py-6 px-4 flex flex-col gap-8 z-20">
      <div className="flex items-center gap-3 px-4">
        <div className="p-2 bg-accent rounded-xl shadow-lg shadow-accent/40">
           <CheckSquare className="text-white" size={24} />
        </div>
        <h1 className="text-xl font-bold tracking-tight">AI Taskify</h1>
      </div>

      <nav className="flex-1 flex flex-col gap-2">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "relative flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors text-left outline-none",
                isActive ? "text-white" : "text-gray-500 hover:text-foreground hover:bg-card-border/50"
              )}
            >
              {isActive && (
                <motion.div 
                  layoutId="active-nav-bg"
                  className="absolute inset-0 bg-accent rounded-xl shadow-md shadow-accent/30 -z-10"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <Icon size={20} className="z-10" />
              <span className="z-10">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto glass-panel p-4 flex flex-col gap-4 text-sm font-semibold">
        <div className="flex items-center justify-between">
          <span className="text-gray-500 flex items-center gap-2"><Award size={16} className="text-yellow-500"/> Points</span>
          <span className="text-accent">{points}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500 flex items-center gap-2"><Flame size={16} className="text-red-500"/> Streak</span>
          <span className="text-red-500">{currentStreak}</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
