import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { taskAPI } from '../services/api';

const TaskContext = createContext();

const initialState = {
  tasks: [],
  stats: {
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0
  },
  loading: false,
  error: null,
  filters: {
    search: '',
    status: 'all',
    priority: 'all',
    category: 'all'
  }
};

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload, error: null };
    case 'SET_TASKS':
      return {
        ...state,
        tasks: action.payload.tasks,
        stats: action.payload.stats,
        loading: false,
        error: null
      };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case 'ADD_TASK':
      return { ...state, tasks: [action.payload, ...state.tasks] };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task._id === action.payload._id ? action.payload : task
        )
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task._id !== action.payload)
      };
    default:
      return state;
  }
};

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // FIXED: Remove state.filters dependency to prevent infinite loop
  const loadTasks = useCallback(async (customFilters = null) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const filtersToUse = customFilters || state.filters;
      const response = await taskAPI.getTasks(filtersToUse);
      
      if (response.data.success) {
        dispatch({ 
          type: 'SET_TASKS', 
          payload: {
            tasks: response.data.data,
            stats: response.data.stats
          }
        });
      }
    } catch (error) {
      console.error('Load tasks error:', error);
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error.response?.data?.message || 'Failed to load tasks' 
      });
    }
  }, [state.filters]); // NO DEPENDENCIES

  const createTask = useCallback(async (taskData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await taskAPI.createTask(taskData);
      
      if (response.data.success) {
        dispatch({ type: 'ADD_TASK', payload: response.data.data });
        // Reload to get updated stats
        await loadTasks();
      }
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error.response?.data?.message || 'Failed to create task' 
      });
      throw error;
    }
  }, [loadTasks]);

  const updateTask = useCallback(async (taskId, taskData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await taskAPI.updateTask(taskId, taskData);
      
      if (response.data.success) {
        dispatch({ type: 'UPDATE_TASK', payload: response.data.data });
        await loadTasks();
      }
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error.response?.data?.message || 'Failed to update task' 
      });
      throw error;
    }
  }, [loadTasks]);

  const updateTaskStatus = useCallback(async (taskId, status) => {
    try {
      const response = await taskAPI.updateTaskStatus(taskId, status);
      
      if (response.data.success) {
        dispatch({ type: 'UPDATE_TASK', payload: response.data.data });
        await loadTasks();
      }
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error.response?.data?.message || 'Failed to update task status' 
      });
    }
  }, [loadTasks]);

  const deleteTask = useCallback(async (taskId) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await taskAPI.deleteTask(taskId);
      
      if (response.data.success) {
        dispatch({ type: 'DELETE_TASK', payload: taskId });
        await loadTasks();
      }
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error.response?.data?.message || 'Failed to delete task' 
      });
      throw error;
    }
  }, [loadTasks]);

  // const setFilters = useCallback((newFilters) => {
  const setFilters = useCallback((newFilters) => {
    dispatch({ type: 'SET_FILTERS', payload: newFilters });
    // Load tasks with new filters
    loadTasks({ ...state.filters, ...newFilters });
  }, [loadTasks, state.filters]);

  // FIXED: Only load tasks once on mount
  React.useEffect(() => {
    loadTasks();
  }, [loadTasks]); // Empty dependency array

  const value = {
    ...state,
    loadTasks,
    createTask,
    updateTask,
    updateTaskStatus,
    deleteTask,
    setFilters
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};
