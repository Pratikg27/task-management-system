import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({ setIsAuthenticated }) => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    streakDays: 0
  });
  const navigate = useNavigate();

  // ✅ Memoized logout function
  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    setIsAuthenticated(false);
    navigate('/login');
  }, [navigate, setIsAuthenticated]);

  // ✅ Memoized fetch function
  const fetchUserData = useCallback(() => {
    try {
      const userData = JSON.parse(localStorage.getItem('currentUser'));
      if (userData) {
        setUser(userData);

        // Set demo stats
        setStats({
          totalTasks: 24,
          completedTasks: 18,
          pendingTasks: 6,
          streakDays: 12
        });
      } else {
        logout();
      }
    } catch (err) {
      console.error('Error fetching user data:', err);
      logout();
    }
  }, [logout]);

  useEffect(() => {
    fetchUserData();
    animateStats();
  }, [fetchUserData]); // ✅ Fixed missing dependency warning

  const animateStats = () => {
    setTimeout(() => {
      const statNumbers = document.querySelectorAll('.stat-number');
      statNumbers.forEach(stat => {
        const finalNumber = parseInt(stat.textContent);
        let currentNumber = 0;
        const increment = finalNumber / 30;

        const timer = setInterval(() => {
          currentNumber += increment;
          if (currentNumber >= finalNumber) {
            stat.textContent = finalNumber;
            clearInterval(timer);
          } else {
            stat.textContent = Math.floor(currentNumber);
          }
        }, 50);
      });
    }, 500);
  };

  if (!user) {
    return (
      <div className="glass-card">
        <div style={{ textAlign: 'center', color: 'white' }}>
          <div className="loading" style={{ margin: '20px auto' }}></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="welcome-text">
          Welcome back, {user.name}! 👋
        </div>
        <div className="user-info">
          <div className="user-avatar">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <button className="logout-btn" onClick={logout}>
            🚪 Logout
          </button>
        </div>
      </div>

      {/* ✅ stats now actually used */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-number">{stats.totalTasks}</div>
          <div className="stat-label">Total Tasks</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-number">{stats.completedTasks}</div>
          <div className="stat-label">Completed</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-number">{stats.pendingTasks}</div>
          <div className="stat-label">Pending</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🔥</div>
          <div className="stat-number">{stats.streakDays}</div>
          <div className="stat-label">Streak Days</div>
        </div>
      </div>

      <div className="welcome-card">
        <h2>🎯 Week 1 Complete - Amazing Progress!</h2>
        <p style={{ marginBottom: '20px', fontSize: '1.1rem' }}>
          Your beautiful authentication system is working perfectly!
        </p>

        <ul className="feature-list">
          <li>✨ Stunning Glass Morphism Design</li>
          <li>🌙 Dark Mode Toggle</li>
          <li>🎭 Animated Particle Background</li>
          <li>🔐 Secure Authentication Flow</li>
          <li>📱 Fully Responsive Design</li>
          <li>🎨 Beautiful Hover Effects</li>
          <li>⚡ Smooth Animations</li>
        </ul>

        <div
          style={{
            marginTop: '30px',
            padding: '20px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '10px'
          }}
        >
          <h3 style={{ marginBottom: '15px' }}>🚀 Coming in Week 2:</h3>
          <p>Task creation, editing, categories, priorities, and much more!</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
