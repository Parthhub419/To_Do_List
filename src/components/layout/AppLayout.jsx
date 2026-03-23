import React, { useState } from 'react';
import Sidebar from './Sidebar';

const AppLayout = ({ children }) => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="app-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="content-area">
        {/* Pass activeTab to children if needed via cloning, or children can be rendered conditionally here instead of inside App.js. 
            Actually, it's better to render the active view directly in App.js. 
            So AppLayout should just provide the shell. We'll clone children to pass activeTab. */}
        {React.Children.map(children, child => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { activeTab });
          }
          return child;
        })}
      </main>
    </div>
  );
};

export default AppLayout;
