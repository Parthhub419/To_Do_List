import React, { createContext, useContext, useState, useEffect } from 'react';

const GamificationContext = createContext();

export const useGamification = () => useContext(GamificationContext);

export const GamificationProvider = ({ children }) => {
  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem('taskify-react-stats');
    if (saved) return JSON.parse(saved);
    return {
      points: 0,
      currentStreak: 0,
      bestStreak: 0,
      lastActiveDate: null,
      badges: []
    };
  });

  useEffect(() => {
    localStorage.setItem('taskify-react-stats', JSON.stringify(stats));
  }, [stats]);

  const awardPoints = (priority) => {
    const pointsMap = { 'Low': 5, 'Medium': 10, 'High': 20 };
    const earned = pointsMap[priority] || 0;
    
    setStats(prev => ({
      ...prev,
      points: prev.points + earned
    }));
    
    return earned;
  };

  const deducePoints = (priority) => {
    const pointsMap = { 'Low': 5, 'Medium': 10, 'High': 20 };
    const lost = pointsMap[priority] || 0;
    
    setStats(prev => ({
      ...prev,
      points: Math.max(0, prev.points - lost)
    }));
  };

  const updateStreak = () => {
    const today = new Date();
    today.setHours(0,0,0,0);
    const todayStr = today.toISOString();
    
    setStats(prev => {
      if (prev.lastActiveDate === todayStr) return prev; // Already ticked
      
      let newStreak = prev.currentStreak;
      let newBest = prev.bestStreak;
      
      if (!prev.lastActiveDate) {
        newStreak = 1;
        newBest = 1;
      } else {
        const last = new Date(prev.lastActiveDate);
        const diffDays = Math.round((today.getTime() - last.getTime()) / (24 * 60 * 60 * 1000));
        
        if (diffDays === 1) {
          newStreak += 1;
          newBest = Math.max(newStreak, newBest);
        } else if (diffDays > 1) {
          newStreak = 1; // broken
        }
      }
      
      return {
        ...prev,
        currentStreak: newStreak,
        bestStreak: newBest,
        lastActiveDate: todayStr
      };
    });
  };

  const checkStreakIntegrity = () => {
    const today = new Date();
    today.setHours(0,0,0,0);
    
    setStats(prev => {
      if (!prev.lastActiveDate) return prev;
      const last = new Date(prev.lastActiveDate);
      const diffDays = Math.round((today.getTime() - last.getTime()) / (24 * 60 * 60 * 1000));
      if (diffDays > 1 && prev.currentStreak > 0) {
        return { ...prev, currentStreak: 0 };
      }
      return prev;
    });
  };

  // Run integrity check on mount
  useEffect(() => {
    checkStreakIntegrity();
  }, []);

  return (
    <GamificationContext.Provider value={{
      ...stats,
      awardPoints,
      deducePoints,
      updateStreak
    }}>
      {children}
    </GamificationContext.Provider>
  );
};
