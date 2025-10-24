import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Demo mode - simulate API call
    setTimeout(() => {
      // Get registered users from localStorage
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
      
      // Demo users for testing
      const demoUsers = [
        { email: 'demo@example.com', password: '123456', name: 'Demo User' },
        { email: 'admin@test.com', password: 'admin123', name: 'Admin User' }
      ];
      
      // Combine demo users with registered users
      const allUsers = [...demoUsers, ...registeredUsers];
      
      const user = allUsers.find(u => u.email === email && u.password === password);
      
      if (user) {
        // Store user data
        localStorage.setItem('token', 'demo-token-' + Date.now());
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        setIsAuthenticated(true);
        setMessage('✅ Login successful! Redirecting...');
        
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } else {
        setMessage('❌ Invalid email or password. Try: demo@example.com / 123456');
        setLoading(false);
      }
    }, 1500);
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="glass-card">
      <h1 className="title">✨ Task Manager Pro</h1>
      <p className="subtitle">Welcome back! Please sign in to continue</p>
      
      {/* Demo Credentials Info */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        padding: '15px',
        borderRadius: '10px',
        marginBottom: '20px',
        textAlign: 'center',
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: '0.9rem'
      }}>
        <strong>🎯 Demo Credentials:</strong><br/>
        Email: demo@example.com<br/>
        Password: 123456
      </div>
      
      {message && (
        <div className={`message ${message.includes('✅') ? 'success-message' : 'error-message'}`}>
          {message}
        </div>
      )}
      
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            className="form-input"
            placeholder="Email"
            required
          />
          <label className="floating-label">📧 Email Address</label>
        </div>
        
        <div className="form-group password-container">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={onChange}
            className="form-input"
            placeholder="Password"
            required
          />
          <label className="floating-label">🔒 Password</label>
          <span className="password-toggle" onClick={togglePassword}>
            {showPassword ? '🙈' : '👁️'}
          </span>
        </div>
        
        <button type="submit" className="btn" disabled={loading}>
          {loading ? (
            <>
              <span className="loading"></span>
              Signing In...
            </>
          ) : (
            'Sign In'
          )}
        </button>
      </form>
      
      <div className="auth-link">
        Don't have an account? <Link to="/register">Create one here</Link>
      </div>
    </div>
  );
};

export default Login;