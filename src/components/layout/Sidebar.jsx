import React from 'react';
import { LayoutDashboard, CheckSquare, Calendar, Moon, Sun, Award, Flame, User, LogOut } from 'lucide-react';
import { useTheme } from '../../context/AppContext';
import { useGamification } from '../../context/GamificationContext';
import { useAuth } from '../../context/AuthContext';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const { theme, toggleTheme } = useTheme();
  const { points, currentStreak } = useGamification();
  const { logout } = useAuth();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'tasks', label: 'My Tasks', icon: CheckSquare },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="sidebar glass-effect">
      <div className="brand flex items-center gap-3">
        <CheckSquare size={28} color="var(--accent-color)" />
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '1px' }}>Taskify Ai</h2>
      </div>

      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1, marginTop: '2rem' }}>
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <li 
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                padding: '1rem',
                borderRadius: '12px',
                cursor: 'pointer',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                color: isActive ? '#fff' : 'var(--text-secondary)',
                background: isActive ? 'var(--accent-gradient)' : 'transparent',
                boxShadow: isActive ? '0 4px 15px rgba(9, 132, 227, 0.4)' : 'none',
                transition: 'all 0.3s'
              }}
            >
              <Icon size={20} />
              {item.label}
            </li>
          );
        })}
      </ul>

      <div className="user-stats neumorphic-inset" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'center', fontWeight: 600 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          <Award color="gold" size={20} /> <span>{points} pts</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          <Flame color="#ff6b6b" size={20} /> <span>{currentStreak} day streak</span>
        </div>
      </div>

      <button onClick={toggleTheme} className="neumorphic-btn" style={{ width: '100%', marginTop: '1.5rem' }}>
        {theme === 'light' ? <><Moon size={18}/> Dark Mode</> : <><Sun size={18}/> Light Mode</>}
      </button>

      <button onClick={logout} className="neumorphic-btn" style={{ width: '100%', marginTop: '1rem', color: 'var(--danger-color)' }}>
        <LogOut size={18}/> Logout
      </button>
    </nav>
  );
};

export default Sidebar;
