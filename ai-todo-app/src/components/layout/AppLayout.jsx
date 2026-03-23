import React from 'react';
import TopNav from './TopNav';
import Sidebar from './Sidebar';
import { AnimatePresence, motion } from 'framer-motion';

const AppLayout = ({ children, activeTab, setActiveTab }) => {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      
      {/* Background Decorative Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[40%] bg-purple-400/20 rounded-full blur-[120px] pointer-events-none"></div>
      
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 flex flex-col relative z-10 overflow-hidden">
        <TopNav />
        <div className="flex-1 overflow-y-auto px-8 pb-8 scrollbar-hide">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
