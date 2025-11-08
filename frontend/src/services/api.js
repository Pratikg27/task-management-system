import axios from 'axios';
import config from '../config';

// Use config for API base URL
const API_BASE_URL = `${config.API_URL}/api`;

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    
    // DEBUG: Log all outgoing requests
    console.log('🔄 API Request Details:', {
      method: config.method?.toUpperCase(),
      fullURL: `${config.baseURL}${config.url}`,
      data: config.data,
      token: token ? 'EXISTS' : 'MISSING'
    });
    
    return config;
  },
  (error) => {
    console.error('❌ API Request Setup Error:', error);
    return Promise.reject(error);
  }
);

// Handle responses and errors
api.interceptors.response.use(
  (response) => {
    console.log('✅ API Response Success:', {
      status: response.status,
      url: response.config.url,
      data: response.data
    });
    return response;
  },
  (error) => {
    console.error('❌ API Response Error Details:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      url: error.config?.url,
      code: error.code,
      isNetworkError: !error.response
    });
    
    // Handle network errors differently
    if (!error.response) {
      console.error('🚨 Network Error - Backend might be down or CORS issue');
      return Promise.reject(new Error('Network error - please check if backend is running'));
    }
    
    // Don't auto-redirect on 401 during login
    if (error.response?.status === 401 && !window.location.pathname.includes('/login')) {
      localStorage.removeItem('token');
      localStorage.removeItem('currentUser');
      window.location.replace('/login');
    }
    
    return Promise.reject(error);
  }
);

// Auth API functions
export const authAPI = {
  // Login user
  login: async (credentials) => {
    console.log('🔄 authAPI.login called with:', credentials);
    try {
      const response = await api.post('/auth/login', credentials);
      console.log('✅ authAPI.login success:', response.data);
      return response;
    } catch (error) {
      console.error('❌ authAPI.login error:', error);
      throw error;
    }
  },
  
  // Register user
  register: async (userData) => {
    console.log('🔄 authAPI.register called with:', userData);
    try {
      const response = await api.post('/auth/register', userData);
      console.log('✅ authAPI.register success:', response.data);
      return response;
    } catch (error) {
      console.error('❌ authAPI.register error:', error);
      throw error;
    }
  },
  
  // Get current user
  getCurrentUser: async () => {
    console.log('🔄 authAPI.getCurrentUser called');
    try {
      const response = await api.get('/auth/me');
      console.log('✅ authAPI.getCurrentUser success:', response.data);
      return response;
    } catch (error) {
      console.error('❌ authAPI.getCurrentUser error:', error);
      throw error;
    }
  }
};

// Task API functions
export const taskAPI = {
  getTasks: (filters = {}) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== 'all') {
        params.append(key, value);
      }
    });
    return api.get(`/tasks?${params.toString()}`);
  },
  createTask: (taskData) => api.post('/tasks', taskData),
  updateTask: (taskId, taskData) => api.put(`/tasks/${taskId}`, taskData),
  updateTaskStatus: (taskId, status) => api.patch(`/tasks/${taskId}/status`, { status }),
  deleteTask: (taskId) => api.delete(`/tasks/${taskId}`),
  getTask: (taskId) => api.get(`/tasks/${taskId}`),
};

export default api;