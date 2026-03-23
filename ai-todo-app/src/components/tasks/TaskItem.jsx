import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Pencil, Trash2, Calendar as CalIcon, Tag } from 'lucide-react';
import { Badge } from '../ui/Badge';

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

const TaskItem = ({ task, onToggle, onEdit, onDelete }) => {
  const isOverdue = !task.completed && task.dueDate && new Date(task.dueDate) < new Date(new Date().setHours(0,0,0,0));

  return (
    <motion.div
      layout
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      className={`group relative glass-panel p-4 flex items-center gap-4 transition-all duration-300 hover:shadow-lg hover:border-accent/30 ${task.completed ? 'opacity-50 grayscale-[50%]' : ''}`}
    >
      <button 
        onClick={() => onToggle(task.id)}
        className={`shrink-0 transition-colors duration-200 outline-none ${task.completed ? 'text-green-500' : 'text-gray-400 hover:text-accent'}`}
      >
        {task.completed ? <CheckCircle2 size={26} /> : <Circle size={26} />}
      </button>

      <div className="flex-1 min-w-0">
        <h3 className={`text-lg font-semibold truncate transition-all duration-300 ${task.completed ? 'line-through text-gray-500' : 'text-foreground'}`}>
          {task.title}
        </h3>
        <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs font-medium text-gray-500">
          <Badge variant={task.priority}>{task.priority}</Badge>
          <span className="flex items-center gap-1"><Tag size={12}/> {task.category}</span>
          {task.dueDate && (
             <span className={`flex items-center gap-1 ${isOverdue ? 'text-red-500 font-bold' : ''}`}>
               <CalIcon size={12}/> {new Date(task.dueDate).toLocaleDateString()} {isOverdue && '(Overdue)'}
             </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button 
          onClick={() => onEdit(task)} 
          className="p-2 rounded-lg bg-card-border/50 hover:bg-accent/10 hover:text-accent transition-colors outline-none"
        >
          <Pencil size={18} />
        </button>
        <button 
          onClick={() => onDelete(task.id)} 
          className="p-2 rounded-lg bg-card-border/50 hover:bg-red-500/10 hover:text-red-500 transition-colors outline-none"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </motion.div>
  );
};

export default TaskItem;
