import React from 'react';
import AppLayout from './components/layout/AppLayout';
import Dashboard from './components/dashboard/Dashboard';
import TaskList from './components/tasks/TaskList';
import CalendarView from './components/calendar/CalendarView';
import ProfileView from './components/profile/ProfileView';
import AuthPage from './components/auth/AuthPage';
import { useAuth } from './context/AuthContext';

// Inner component logic wrapped by AppLayout
// We extract the routing mapping to a child function
const AppContent = ({ activeTab }) => {
  switch (activeTab) {
    case 'dashboard':
      return <Dashboard />;
    case 'tasks':
      return <TaskList />;
    case 'calendar':
      return <CalendarView />;
    case 'profile':
      return <ProfileView />;
    default:
      return <Dashboard />;
  }
};

function App() {
  const { user } = useAuth();

  if (!user) {
    return <AuthPage />;
  }

  return (
    <AppLayout>
      <AppContent />
    </AppLayout>
  );
}

export default App;
