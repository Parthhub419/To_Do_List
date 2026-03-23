import React from 'react';
import { useTasks } from '../../context/TaskContext';
import { useGamification } from '../../context/GamificationContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const Dashboard = () => {
  const { tasks } = useTasks();
  const { points, currentStreak, bestStreak } = useGamification();

  const completedCount = tasks.filter(t => t.completed).length;
  const pendingCount = tasks.length - completedCount;

  const pieData = [
    { name: 'Completed', value: completedCount, color: '#00b894' },
    { name: 'Pending', value: pendingCount, color: '#fdcb6e' }
  ];

  // Weekly Productivity Data
  const last7Days = [];
  const counts = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
    
    const count = tasks.filter(t => t.completed && t.completedDate && t.completedDate.startsWith(dateStr)).length;
    last7Days.push({ name: dayName, tasks: count });
  }

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };
  
  const currentDateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = new Date().toLocaleDateString('en-US', currentDateOptions);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 700 }}>
          {getGreeting()}, what's your plan today?
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', fontWeight: 500 }}>
          {formattedDate}
        </p>
      </div>
      
      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <span style={{ color: 'var(--text-secondary)' }}>Total Points</span>
          <span style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--accent-color)' }}>{points}</span>
        </div>
        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <span style={{ color: 'var(--text-secondary)' }}>Current Streak</span>
          <span style={{ fontSize: '2rem', fontWeight: 700, color: '#ff6b6b' }}>{currentStreak} 🔥</span>
        </div>
        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <span style={{ color: 'var(--text-secondary)' }}>Task Completion</span>
          <span style={{ fontSize: '2rem', fontWeight: 700, color: '#00b894' }}>
            {tasks.length > 0 ? Math.round((completedCount/tasks.length)*100) : 0}%
          </span>
        </div>
      </div>

      {/* Charts List */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
        <div className="glass-card" style={{ padding: '1.5rem', height: '350px' }}>
          <h3 style={{ marginBottom: '1rem' }}>Weekly Productivity</h3>
          <ResponsiveContainer width="100%" height="85%">
            <LineChart data={last7Days}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
              <XAxis dataKey="name" stroke="var(--text-secondary)" />
              <YAxis allowDecimals={false} stroke="var(--text-secondary)" />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--glass-bg)', backdropFilter: 'blur(10px)', border: 'none', borderRadius: '12px' }} 
              />
              <Line type="monotone" dataKey="tasks" stroke="var(--accent-color)" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem', height: '350px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ marginBottom: '1rem' }}>Task Status</h3>
          <div style={{ flex: 1 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: 'var(--glass-bg)', borderRadius: '12px', border: 'none' }} />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
