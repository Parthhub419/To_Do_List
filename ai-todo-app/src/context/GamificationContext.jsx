import React, { createContext, useContext, useState, useEffect } from 'react';

const GamificationContext = createContext();

export const useGamification = () => useContext(GamificationContext);

export const GamificationProvider = ({ children }) => {
  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem('saas-gamification-v1');
    return saved ? JSON.parse(saved) : {
      points: 0,
      currentStreak: 0,
      bestStreak: 0,
      lastActiveDate: null
    };
  });

  useEffect(() => {
    localStorage.setItem('saas-gamification-v1', JSON.stringify(stats));
  }, [stats]);

  const awardPoints = (priority) => {
    const map = { 'Low': 5, 'Medium': 10, 'High': 20 };
    const earned = map[priority] || 5;
    
    setStats(prev => ({
      ...prev,
      points: prev.points + earned
    }));
    return earned;
  };

  const deducePoints = (priority) => {
    const map = { 'Low': 5, 'Medium': 10, 'High': 20 };
    const lost = map[priority] || 5;
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
      if (prev.lastActiveDate === todayStr) return prev;
      
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
          newStreak = 1;
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

  return (
    <GamificationContext.Provider value={{...stats, awardPoints, deducePoints, updateStreak}}>
      {children}
    </GamificationContext.Provider>
  );
};
