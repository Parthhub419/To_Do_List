import React, { useState } from 'react';

const TaskForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    priority: initialData?.priority || 'Medium',
    category: initialData?.category || 'Work',
    dueDate: initialData?.dueDate || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    onSubmit(formData);
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(5px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}>
      <div className="glass-card" style={{ padding: '2rem', width: '100%', maxWidth: '500px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <h2>{initialData ? 'Edit Task' : 'Add New Task'}</h2>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontWeight: 600 }}>Task Title</label>
            <input 
              className="neumorphic-inset" 
              style={{ padding: '0.8rem', border: 'none', color: 'var(--text-primary)' }}
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
              required
              autoFocus
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
              <label style={{ fontWeight: 600 }}>Priority</label>
              <select className="neumorphic-inset" style={{ padding: '0.8rem', border: 'none', color: 'var(--text-primary)' }} value={formData.priority} onChange={e => setFormData({...formData, priority: e.target.value})}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
              <label style={{ fontWeight: 600 }}>Category</label>
              <select className="neumorphic-inset" style={{ padding: '0.8rem', border: 'none', color: 'var(--text-primary)' }} value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Health">Health</option>
                <option value="Learning">Learning</option>
                <option value="Family">Family</option>
                <option value="Meal">Meal</option>
                <option value="Finance">Finance</option>
                <option value="Hobbies">Hobbies</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontWeight: 600 }}>Due Date</label>
            <input 
              type="date" 
              className="neumorphic-inset" 
              style={{ padding: '0.8rem', border: 'none', color: 'var(--text-primary)' }}
              value={formData.dueDate}
              onChange={e => setFormData({...formData, dueDate: e.target.value})}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
            <button type="button" className="neumorphic-btn" onClick={onCancel}>Cancel</button>
            <button type="submit" className="neumorphic-btn" style={{ color: 'var(--accent-color)' }}>Save Task</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
