import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { GradientButton } from '../ui/GradientButton';

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', damping: 25, stiffness: 300 } },
  exit: { opacity: 0, scale: 0.95, y: 20 }
};

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
    <motion.div 
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
    >
      <motion.div 
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="w-full max-w-lg bg-background rounded-3xl shadow-2xl overflow-hidden border border-card-border/30"
      >
        <div className="px-6 py-4 flex justify-between items-center border-b border-card-border/50 bg-card/50 backdrop-blur-md">
          <h2 className="text-xl font-bold">{initialData ? 'Edit Task' : 'New Task'}</h2>
          <button onClick={onCancel} className="p-2 hover:bg-card-border/50 rounded-full transition-colors outline-none"><X size={20}/></button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-500">Task Title</label>
            <input 
              type="text" 
              className="px-4 py-3 rounded-xl bg-card/40 border border-card-border/50 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all font-medium"
              placeholder="e.g. Discuss roadmap with design team"
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
              required
              autoFocus
            />
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-sm font-semibold text-gray-500">Priority Level</label>
              <select 
                className="px-4 py-3 rounded-xl bg-card/40 border border-card-border/50 focus:border-accent outline-none font-medium appearance-none"
                value={formData.priority} 
                onChange={e => setFormData({...formData, priority: e.target.value})}
              >
                <option value="Low">Low Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="High">High Priority</option>
              </select>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-sm font-semibold text-gray-500">Category</label>
              <select 
                className="px-4 py-3 rounded-xl bg-card/40 border border-card-border/50 focus:border-accent outline-none font-medium appearance-none"
                value={formData.category} 
                onChange={e => setFormData({...formData, category: e.target.value})}
              >
                <option value="Work">Engineering</option>
                <option value="Design">Design</option>
                <option value="Personal">Personal</option>
                <option value="Finance">Finance</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-500">Target Date</label>
            <input 
              type="date" 
              className="px-4 py-3 rounded-xl bg-card/40 border border-card-border/50 focus:border-accent outline-none font-medium"
              value={formData.dueDate}
              onChange={e => setFormData({...formData, dueDate: e.target.value})}
            />
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button 
              type="button" 
              onClick={onCancel}
              className="px-5 py-2.5 rounded-xl font-medium text-gray-500 hover:bg-card-border/50 transition-colors"
            >
              Cancel
            </button>
            <GradientButton type="submit">
              {initialData ? 'Save Changes' : 'Create Task'}
            </GradientButton>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default TaskForm;
