import React, { useState } from 'react';
import { useTasks } from '../../context/TaskContext';
import { useGamification } from '../../context/GamificationContext';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import Button from '../ui/Button';
import { Plus, Search, Sparkles } from 'lucide-react';

const TaskList = () => {
  const { tasks, addTask, updateTask, toggleTask, deleteTask, getFilteredTasks } = useTasks();
  const { awardPoints, updateStreak } = useGamification();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  
  const [filter, setFilter] = useState({ status: 'all', priority: 'all', search: '', category: 'All Categories' });

  const handleToggle = (id) => {
    const { didComplete, task } = toggleTask(id);
    if (didComplete && task) {
      awardPoints(task.priority);
      updateStreak();
    }
  };

  const handleSave = (data) => {
    if (editingTask) {
      updateTask(editingTask.id, data);
    } else {
      addTask(data);
    }
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleDelete = (id) => {
    if(window.confirm('Delete this task?')) {
      deleteTask(id);
    }
  };

  const filteredTasks = getFilteredTasks(filter);

  // Mock AI Suggestions
  const suggestions = [
    "Follow up on pending emails",
    "Review weekly project goals",
    "Schedule 30-min reading block"
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%' }}>
      
      {/* Smart AI Suggestions Banner */}
      <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <div style={{ padding: '1rem', borderRadius: '50%', background: 'var(--accent-gradient)' }}>
          <Sparkles color="#fff" size={28} />
        </div>
        <div>
          <h3 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
             AI Suggestions
          </h3>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {suggestions.map((s, i) => (
              <span key={i} className="neumorphic-inset" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem', cursor: 'pointer' }}
                    onClick={() => { setEditingTask(null); setIsModalOpen(true); }}>
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '2rem' }}>My Tasks</h1>
        <Button onClick={() => { setEditingTask(null); setIsModalOpen(true); }}>
          <Plus size={20}/> Add Task
        </Button>
      </div>

      {/* Filters */}
      <div className="neumorphic" style={{ padding: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Search size={20} color="var(--text-secondary)" />
        <input 
          placeholder="Search items..." 
          style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', outline: 'none', flex: 1 }}
          value={filter.search}
          onChange={e => setFilter({...filter, search: e.target.value})}
        />
        <select className="neumorphic-inset" style={{ padding: '0.5rem', border: 'none', color: 'var(--text-primary)' }} value={filter.status} onChange={e => setFilter({...filter, status: e.target.value})}>
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
        <select className="neumorphic-inset" style={{ padding: '0.5rem', border: 'none', color: 'var(--text-primary)' }} value={filter.priority} onChange={e => setFilter({...filter, priority: e.target.value})}>
          <option value="all">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      {/* Category Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
        {['All Categories', 'Work', 'Personal', 'Health', 'Learning', 'Family', 'Meal', 'Finance', 'Hobbies'].map(cat => (
          <button 
            key={cat}
            onClick={() => setFilter({...filter, category: cat})}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              border: 'none',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              background: filter.category === cat ? 'var(--accent-color)' : 'var(--glass-bg)',
              color: filter.category === cat ? '#fff' : 'var(--text-primary)',
              boxShadow: filter.category === cat ? '0 4px 10px rgba(229, 9, 20, 0.4)' : 'none',
              transition: 'all 0.3s ease'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {filteredTasks.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: '2rem' }}>No tasks found.</p>
        ) : (
          filteredTasks.map(task => (
            <TaskItem key={task.id} task={task} onToggle={handleToggle} onEdit={(t) => { setEditingTask(t); setIsModalOpen(true); }} onDelete={handleDelete} />
          ))
        )}
      </div>

      {isModalOpen && (
        <TaskForm 
          initialData={editingTask} 
          onSubmit={handleSave} 
          onCancel={() => { setIsModalOpen(false); setEditingTask(null); }} 
        />
      )}
    </div>
  );
};

export default TaskList;
