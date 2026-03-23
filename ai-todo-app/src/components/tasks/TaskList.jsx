import React, { useState } from 'react';
import { Search, Plus, Sparkles, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTasks } from '../../context/TaskContext';
import { useGamification } from '../../context/GamificationContext';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import { GradientButton } from '../ui/GradientButton';
import { GlassCard } from '../ui/GlassCard';

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const TaskList = () => {
  const { tasks, addTask, updateTask, toggleTask, deleteTask, getFilteredTasks } = useTasks();
  const { awardPoints, updateStreak } = useGamification();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  
  const [filter, setFilter] = useState({ status: 'all', priority: 'all', search: '' });

  const handleToggle = (id) => {
    const { didComplete, task } = toggleTask(id);
    if (didComplete && task) {
      awardPoints(task.priority);
      updateStreak();
    }
  };

  const handleSave = (data) => {
    if (editingTask) updateTask(editingTask.id, data);
    else addTask(data);
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const filteredTasks = getFilteredTasks(filter);

  const suggestions = [
    "Draft Q3 Roadmap Report",
    "Prepare slides for All-Hands",
    "Review PR #1042"
  ];

  return (
    <div className="flex flex-col gap-6 h-full pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-accent to-purple-500">Tasks Pipeline</h1>
          <p className="text-gray-500 mt-1 font-medium">Manage and prioritize your daily operations.</p>
        </div>
        <GradientButton onClick={() => { setEditingTask(null); setIsModalOpen(true); }} icon={Plus}>
          New Task
        </GradientButton>
      </div>

      {/* AI Suggestions Header */}
      <GlassCard className="flex items-center gap-5 border-l-4 border-l-purple-500 p-5">
        <div className="p-3 bg-purple-500/10 rounded-xl">
          <Sparkles className="text-purple-500" size={24} />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg flex items-center gap-2">AI Smart Suggestions</h3>
          <div className="flex flex-wrap gap-3 mt-2">
            {suggestions.map((s, i) => (
              <button 
                key={i} 
                className="text-sm font-medium px-4 py-1.5 rounded-full bg-card-border/50 hover:bg-purple-500/20 hover:text-purple-500 transition-colors"
                onClick={() => { setEditingTask(null); setIsModalOpen(true); }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </GlassCard>

      {/* Filters Toolbar */}
      <div className="neu-active flex items-center gap-4 px-5 py-3 rounded-2xl bg-card/40 backdrop-blur-md border border-card-border/50">
        <div className="flex-1 border-r border-card-border/50 flex items-center gap-3 pr-4">
          <Search size={18} className="text-gray-400" />
          <input 
            type="text" 
            placeholder="Search tasks..." 
            className="w-full bg-transparent border-none outline-none font-medium placeholder:text-gray-400"
            value={filter.search}
            onChange={e => setFilter({...filter, search: e.target.value})}
          />
        </div>
        <div className="flex items-center gap-3">
          <Filter size={18} className="text-gray-400" />
          <select 
            className="bg-transparent border-none outline-none font-medium cursor-pointer"
            value={filter.status} 
            onChange={e => setFilter({...filter, status: e.target.value})}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          <select 
            className="bg-transparent border-none outline-none font-medium cursor-pointer"
            value={filter.priority} 
            onChange={e => setFilter({...filter, priority: e.target.value})}
          >
            <option value="all">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      {/* Taks List Area */}
      <div className="flex-1 overflow-y-auto pr-2 scrollbar-hide">
        {filteredTasks.length === 0 ? (
          <div className="h-40 flex items-center justify-center text-gray-500 font-medium">
            No tasks found. Try adjusting your filters.
          </div>
        ) : (
          <motion.div 
            variants={listVariants} 
            initial="hidden" 
            animate="visible"
            className="flex flex-col gap-3"
          >
            <AnimatePresence mode="popLayout">
              {filteredTasks.map(task => (
                <TaskItem 
                  key={task.id} 
                  task={task} 
                  onToggle={handleToggle} 
                  onEdit={(t) => { setEditingTask(t); setIsModalOpen(true); }} 
                  onDelete={handleDelete} 
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <TaskForm 
            initialData={editingTask} 
            onSubmit={handleSave} 
            onCancel={() => { setIsModalOpen(false); setEditingTask(null); }} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;
