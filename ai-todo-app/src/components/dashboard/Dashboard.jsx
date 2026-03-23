import React from 'react';
import { useTasks } from '../../context/TaskContext';
import { useGamification } from '../../context/GamificationContext';
import { GlassCard } from '../ui/GlassCard';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

const Dashboard = () => {
  const { tasks } = useTasks();
  const { points, currentStreak } = useGamification();

  const completed = tasks.filter(t => t.completed).length;
  const pending = tasks.length - completed;

  const pieData = [
    { name: 'Completed', value: completed, color: '#00b894' },
    { name: 'Pending', value: pending, color: '#fdcb6e' }
  ];

  const recentDays = [];
  const lineData = [];
  for(let i=6; i>=0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const name = d.toLocaleDateString('en-US', { weekday: 'short' });
    const count = tasks.filter(t => t.completed && t.completedDate?.startsWith(dateStr)).length;
    lineData.push({ name, completions: count });
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col gap-6 pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#0984e3] to-[#74b9ff]">Performance Overview</h1>
        <p className="text-gray-500 mt-1 font-medium">Track your productivity and gamification stats.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div variants={itemVariants}>
          <GlassCard className="flex flex-col gap-2">
            <span className="text-gray-500 font-semibold text-sm">Reward Points</span>
            <span className="text-4xl font-bold text-accent">{points}</span>
          </GlassCard>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <GlassCard className="flex flex-col gap-2">
            <span className="text-gray-500 font-semibold text-sm">Active Streak</span>
            <span className="text-4xl font-bold text-red-500">{currentStreak} 🔥</span>
          </GlassCard>
        </motion.div>

        <motion.div variants={itemVariants}>
          <GlassCard className="flex flex-col gap-2">
            <span className="text-gray-500 font-semibold text-sm">Completion Rate</span>
            <span className="text-4xl font-bold text-green-500">
              {tasks.length > 0 ? Math.round((completed/tasks.length)*100) : 0}%
            </span>
          </GlassCard>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
        <motion.div variants={itemVariants}>
          <GlassCard className="h-96 flex flex-col">
            <h3 className="font-bold text-lg mb-6">7-Day Productivity</h3>
            <div className="flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(150,150,150,0.1)" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'var(--text-secondary)'}} dy={10} />
                  <YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{fill: 'var(--text-secondary)'}} dx={-10} />
                  <Tooltip 
                    cursor={{ stroke: 'var(--accent-color)', strokeWidth: 1, strokeDasharray: '3 3' }}
                    contentStyle={{ backgroundColor: 'var(--card-bg)', backdropFilter: 'blur(10px)', border: '1px solid var(--card-border)', borderRadius: '12px' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="completions" 
                    stroke="var(--accent-color)" 
                    strokeWidth={4} 
                    dot={{ fill: 'var(--accent-color)', strokeWidth: 2, r: 4 }} 
                    activeDot={{ r: 6, fill: '#fff' }} 
                    animationDuration={1500}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div variants={itemVariants}>
          <GlassCard className="h-96 flex flex-col">
            <h3 className="font-bold text-lg mb-2">Task Distribution</h3>
            <div className="flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    innerRadius={70}
                    outerRadius={110}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: 'var(--card-bg)', backdropFilter: 'blur(10px)', border: '1px solid var(--card-border)', borderRadius: '12px' }} />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
