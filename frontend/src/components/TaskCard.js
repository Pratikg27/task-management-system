import React from 'react';
import { 
  Edit, 
  Trash2, 
  Play, 
  CheckCircle, 
  RotateCcw,
  Calendar,
  Tag,
  AlertCircle
} from 'lucide-react';
import { format } from 'date-fns';
import './TaskCard.css';

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'low': return 'priority-low';
      case 'medium': return 'priority-medium';
      case 'high': return 'priority-high';
      case 'urgent': return 'priority-urgent';
      default: return 'priority-medium';
    }
  };

  const getStatusButton = () => {
    switch (task.status) {
      case 'pending':
        return (
          <button
            onClick={() => onStatusChange(task._id, 'in-progress')}
            className="task-action-btn blue"
            title="Start Task"
          >
            <Play size={18} />
          </button>
        );
      case 'in-progress':
        return (
          <button
            onClick={() => onStatusChange(task._id, 'completed')}
            className="task-action-btn green"
            title="Complete Task"
          >
            <CheckCircle size={18} />
          </button>
        );
      case 'completed':
        return (
          <button
            onClick={() => onStatusChange(task._id, 'pending')}
            className="task-action-btn gray"
            title="Reopen Task"
          >
            <RotateCcw size={18} />
          </button>
        );
      default:
        return null;
    }
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'completed';

  return (
    <div className={`task-card ${task.status}`}>
      <div className="task-header">
        <div className="task-content">
          <h3 className="task-title">{task.title}</h3>
          {task.description && (
            <p className="task-description">{task.description}</p>
          )}
        </div>
        
        <div className="task-actions">
          {getStatusButton()}
          <button
            onClick={() => onEdit(task)}
            className="task-action-btn gray"
            title="Edit Task"
          >
            <Edit size={18} />
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="task-action-btn red"
            title="Delete Task"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className="task-badges">
        <span className={`task-badge ${getPriorityClass(task.priority)}`}>
          {task.priority.toUpperCase()}
        </span>
        
        <span className="task-badge category">
          {task.category}
        </span>
        
        <span className="task-badge status">
          {task.status.replace('-', ' ')}
        </span>
      </div>

      {task.dueDate && (
        <div className={`task-meta ${isOverdue ? 'overdue' : 'normal'}`}>
          <Calendar size={14} />
          <span>Due: {format(new Date(task.dueDate), 'MMM dd, yyyy')}</span>
          {isOverdue && <AlertCircle size={14} />}
        </div>
      )}

      {task.tags && task.tags.length > 0 && (
        <div className="task-tags">
          <Tag size={14} />
          {task.tags.map((tag, index) => (
            <span key={index} className="task-tag">
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskCard;