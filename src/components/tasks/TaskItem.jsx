import React from 'react';
import { Pencil, Trash2, CheckCircle, Circle } from 'lucide-react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

const TaskItem = ({ task, onToggle, onEdit, onDelete }) => {
  const isOverdue = !task.completed && task.dueDate && new Date(task.dueDate) < new Date(new Date().setHours(0,0,0,0));

  return (
    <div className={`neumorphic p-4 mb-4 flex items-center gap-4 transition-all ${task.completed ? 'opacity-60' : ''}`} style={{ padding: '1rem', display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
      <button 
        onClick={() => onToggle(task.id)}
        className="text-gray-400 hover:text-green-500 transition-colors"
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: task.completed ? 'var(--success-color)' : 'var(--text-secondary)' }}
      >
        {task.completed ? <CheckCircle size={24} /> : <Circle size={24} />}
      </button>

      <div style={{ flex: 1 }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, textDecoration: task.completed ? 'line-through' : 'none' }}>
          {task.title}
        </h3>
        <div style={{ display: 'flex', gap: '0.8rem', marginTop: '0.4rem', fontSize: '0.85rem' }}>
          <Badge color={task.priority}>{task.priority}</Badge>
          <span style={{ color: 'var(--text-secondary)' }}>• {task.category}</span>
          {task.dueDate && (
             <span style={{ color: isOverdue ? 'var(--danger-color)' : 'var(--text-secondary)' }}>
               • Due: {new Date(task.dueDate).toLocaleDateString()} {isOverdue && '(Overdue)'}
             </span>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Button onClick={() => onEdit(task)} className="p-2" style={{ padding: '0.5rem' }}>
          <Pencil size={16} color="var(--accent-color)" />
        </Button>
        <Button onClick={() => onDelete(task.id)} className="p-2" style={{ padding: '0.5rem' }}>
          <Trash2 size={16} color="var(--danger-color)" />
        </Button>
      </div>
    </div>
  );
};

export default TaskItem;
