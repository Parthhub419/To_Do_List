import React, { useState } from 'react';
import AppLayout from './components/layout/AppLayout';
import TaskList from './components/tasks/TaskList';
import Dashboard from './components/dashboard/Dashboard';
import CalendarView from './components/calendar/CalendarView';

const AppContent = ({ activeTab }) => {
  if (activeTab === 'dashboard') return <Dashboard />;
  if (activeTab === 'tasks') return <TaskList />;
  if (activeTab === 'calendar') return <CalendarView />;
  return <Dashboard />;
};

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  return (
    <AppLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      <AppContent activeTab={activeTab} />
    </AppLayout>
  );
}

export default App;
