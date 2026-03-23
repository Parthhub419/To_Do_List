import React, { createContext, useContext, useState, useEffect } from 'react';

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('taskify-react-tasks');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('taskify-react-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskData) => {
    const newTask = {
      id: crypto.randomUUID(),
      title: taskData.title,
      priority: taskData.priority || 'Medium',
      dueDate: taskData.dueDate || '',
      category: taskData.category || 'Work',
      completed: false,
      completedDate: null,
      createdAt: new Date().toISOString()
    };
    setTasks(prev => [...prev, newTask]);
    return newTask;
  };

  const updateTask = (id, updates) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const toggleTask = (id) => {
    let completedTask = null;
    let didComplete = false;
    
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        didComplete = !t.completed;
        const mapped = { 
          ...t, 
          completed: didComplete,
          completedDate: didComplete ? new Date().toISOString() : null 
        };
        completedTask = mapped;
        return mapped;
      }
      return t;
    }));
    
    return { didComplete, task: completedTask || (tasks.find(t=>t.id === id)) };
  };

  const getFilteredTasks = (filterObj) => {
    let filtered = tasks;
    if (filterObj.status === 'completed') filtered = filtered.filter(t => t.completed);
    if (filterObj.status === 'pending') filtered = filtered.filter(t => !t.completed);
    if (filterObj.priority && filterObj.priority !== 'all') {
      filtered = filtered.filter(t => t.priority === filterObj.priority);
    }
    if (filterObj.category && filterObj.category !== 'All Categories') {
      filtered = filtered.filter(t => t.category === filterObj.category);
    }
    if (filterObj.search) {
      filtered = filtered.filter(t => t.title.toLowerCase().includes(filterObj.search.toLowerCase()));
    }
    return filtered;
  };

  return (
    <TaskContext.Provider value={{
      tasks,
      addTask,
      updateTask,
      deleteTask,
      toggleTask,
      getFilteredTasks
    }}>
      {children}
    </TaskContext.Provider>
  );
};
