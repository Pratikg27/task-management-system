import React, { useState, useEffect } from 'react';
import Toast from './Toast';
import { 
  Plus, 
  Search, 
  RefreshCw,
  CheckSquare,
  Clock,
  AlertCircle,
  BarChart3,
  LogOut
} from 'lucide-react';
import { useTasks } from '../context/TaskContext';
import TaskCard from './TaskCard';
import TaskModal from './TaskModal';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({ setIsAuthenticated }) => {
  const {
    tasks,
    stats,
    filters,
    loading,
    error,
    createTask,
    updateTask,
    updateTaskStatus,
    deleteTask,
    setFilters,
    loadTasks
  } = useTasks();

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
const [isModalOpen, setIsModalOpen] = useState(false);
const [editingTask, setEditingTask] = useState(null);
const [modalLoading, setModalLoading] = useState(false);
const [searchTimeout, setSearchTimeout] = useState(null);

// ADD THESE 3 LINES:
const [showToast, setShowToast] = useState(false);
const [toastMessage, setToastMessage] = useState('');
const [toastType, setToastType] = useState('success');
  // Get user info on component mount
  useEffect(() => {
    try {
      const userData = JSON.parse(localStorage.getItem('currentUser'));
      if (userData) {
        setUser(userData);
      }
    } catch (err) {
      console.error('Error fetching user data:', err);
    }
  }, []);

 // Handle logout
 const logout = () => {
  console.log('🚪 Logging out...');
  
  localStorage.removeItem('token');
  localStorage.removeItem('currentUser');
  
  // Authentication state is derived from stored token; removing it is sufficient.
  navigate('/login', { replace: true });
};

  // Handle search with debounce
  const handleSearch = (value) => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    
    const timeout = setTimeout(() => {
      setFilters({ search: value });
    }, 500);
    
    setSearchTimeout(timeout);
  };

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setFilters({ [filterType]: value });
  };

  // Open modal for new task
  const handleAddTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  // Open modal for editing task
  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

 // Handle task submission (create or update)
const handleTaskSubmit = async (taskData) => {
  setModalLoading(true);
  
  try {
    if (editingTask) {
      await updateTask(editingTask._id, taskData);
      setToastMessage('Task updated successfully! 🎉');
    } else {
      await createTask(taskData);
      setToastMessage('Task created successfully! 🎉');
    }
    
    // If we reach here, the operation was successful
    setToastType('success');
    setShowToast(true);
    setIsModalOpen(false);
    setEditingTask(null);
    
  } catch (error) {
    console.error('Task submission error:', error);
    setToastMessage(error.message || 'An error occurred while saving the task');
    setToastType('error');
    setShowToast(true);
  } finally {
    setModalLoading(false);
  }
};

  // Handle task status change
const handleStatusChange = async (taskId, newStatus) => {
  try {
    await updateTaskStatus(taskId, newStatus);
    setToastMessage('Task status updated! ✅');
    setToastType('success');
    setShowToast(true);
  } catch (error) {
    console.error('Failed to update task status:', error);
    setToastMessage(error.message || 'Failed to update task status');
    setToastType('error');
    setShowToast(true);
  }
};

  // Handle task deletion
const handleDeleteTask = async (taskId) => {
  setModalLoading(true);
  
  try {
    await deleteTask(taskId);
    setToastMessage('Task deleted successfully! 🗑️');
    setToastType('success');
    setShowToast(true);
  } catch (error) {
    console.error('Failed to delete task:', error);
    setToastMessage(error.message || 'Failed to delete task');
    setToastType('error');
    setShowToast(true);
  } finally {
    setModalLoading(false);
  }
};

  if (!user) {
    return (
      <div className="dashboard-container">
        <div className="loading-container">
          <RefreshCw className="loading-spinner" />
          <p className="loading-text">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        {/* Header */}
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">
              Welcome back, {user.name}! 👋
            </h1>
            <p className="dashboard-subtitle">Manage your tasks efficiently</p>
          </div>
          <button onClick={logout} className="logout-button">
            <LogOut size={20} />
            Logout
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-card-content">
              <div className="stat-icon blue">
                <BarChart3 size={24} />
              </div>
              <div>
                <p className="stat-label">Total Tasks</p>
                <p className="stat-number">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-card-content">
              <div className="stat-icon yellow">
                <Clock size={24} />
              </div>
              <div>
                <p className="stat-label">Pending</p>
                <p className="stat-number">{stats.pending}</p>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-card-content">
              <div className="stat-icon blue">
                <AlertCircle size={24} />
              </div>
              <div>
                <p className="stat-label">In Progress</p>
                <p className="stat-number">{stats.inProgress}</p>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-card-content">
              <div className="stat-icon green">
                <CheckSquare size={24} />
              </div>
              <div>
                <p className="stat-label">Completed</p>
                <p className="stat-number">{stats.completed}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="controls-panel">
          <div className="controls-row">
            {/* Add Task Button */}
            <button onClick={handleAddTask} className="btn-primary">
              <Plus size={20} />
              Add New Task
            </button>

            {/* Refresh Button */}
            <button onClick={loadTasks} className="btn-secondary">
              <RefreshCw size={20} />
              Refresh
            </button>

            {/* Search */}
            <div className="search-container">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                placeholder="Search tasks..."
                className="search-input"
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>

            {/* Filters */}
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="filter-select"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>

            <select
              value={filters.priority}
              onChange={(e) => handleFilterChange('priority', e.target.value)}
              className="filter-select"
            >
              <option value="all">All Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>

            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="filter-select"
            >
              <option value="all">All Categories</option>
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="shopping">Shopping</option>
              <option value="health">Health</option>
              <option value="education">Education</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="error-message">
            <AlertCircle size={20} />
            <p className="error-text">{error}</p>
          </div>
        )}

        {/* Tasks Grid */}
        {loading ? (
          <div className="loading-container">
            <RefreshCw className="loading-spinner" />
            <span className="loading-text">Loading tasks...</span>
          </div>
        ) : tasks.length === 0 ? (
          <div className="empty-state">
            <CheckSquare className="empty-icon" />
            <h3 className="empty-title">No tasks found</h3>
            <p className="empty-description">
              Get started by creating your first task.
            </p>
            <div className="empty-action">
              <button onClick={handleAddTask} className="btn-primary">
                <Plus size={20} />
                Add New Task
              </button>
            </div>
          </div>
        ) : (
          <div className="tasks-grid">
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        )}
      </div>

     {/* Toast Notifications */}
      {showToast && (
        <div className="toast-container">
          <Toast
            message={toastMessage}
            type={toastType}
            onClose={() => setShowToast(false)}
          />
        </div>
      )}

      {/* Task Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        onSubmit={handleTaskSubmit}
        task={editingTask}
        loading={modalLoading}
      />
    </div>
  );
};

export default Dashboard;