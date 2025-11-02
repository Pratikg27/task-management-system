import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import Login from './components/Login';
import Register from './components/Register'; // ADD THIS LINE
import Dashboard from './components/Dashboard';
import { authAPI } from './services/api';
import './App.css';

// Add Error Boundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h2>Something went wrong.</h2>
          <button onClick={() => window.location.reload()}>
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true; // Prevent state updates if component unmounts

    const checkAuth = async () => {
  try {
    const token = localStorage.getItem('token');
    if (token && isMounted) {
      console.log('🔄 Frontend: Checking auth with token');
      const response = await authAPI.getCurrentUser();
      console.log('✅ Frontend: Auth response:', response.data);
      
      if (response.data.success && response.data.user && isMounted) {
        console.log('✅ Frontend: Auth successful, setting user');
        setCurrentUser(response.data.user); // FIXED: Changed from response.data.data
        setIsAuthenticated(true);
      }
    }
  } catch (error) {
    console.error('❌ Frontend: Auth check failed:', error);
    if (isMounted) {
      localStorage.removeItem('token');
      localStorage.removeItem('currentUser');
      setIsAuthenticated(false);
    }
  } finally {
    if (isMounted) {
      setLoading(false);
    }
  }
};

    checkAuth();

    return () => {
      isMounted = false; // Cleanup
    };
  }, []);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        Loading...
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <Router>
        <div className="App">
          <Routes>
            <Route 
              path="/login" 
              element={
                isAuthenticated ? 
                <Navigate to="/dashboard" replace /> : 
                <Login setIsAuthenticated={setIsAuthenticated} setCurrentUser={setCurrentUser} />
              } 
            />
            <Route 
              path="/register" 
              element={
                isAuthenticated ? 
                <Navigate to="/dashboard" replace /> : 
                <Register setIsAuthenticated={setIsAuthenticated} setCurrentUser={setCurrentUser} />
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                isAuthenticated ? 
                <TaskProvider>
                  <Dashboard setIsAuthenticated={setIsAuthenticated} currentUser={currentUser} />
                </TaskProvider> : 
                <Navigate to="/login" replace />
              } 
            />
            <Route 
              path="/" 
              element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} 
            />
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;