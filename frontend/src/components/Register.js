import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const navigate = useNavigate();

  const { name, email, password, confirmPassword } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setMessage('❌ Passwords do not match!');
      return;
    }

    if (password.length < 6) {
      setMessage('❌ Password must be at least 6 characters!');
      return;
    }

    setLoading(true);
    
    // Demo mode - simulate API call
    setTimeout(() => {
      try {
        // Get existing users
        const existingUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
        
        // Check if user already exists
        if (existingUsers.find(u => u.email === email)) {
          setMessage('❌ User with this email already exists!');
          setLoading(false);
          return;
        }
        
        // Create new user
        const newUser = {
          id: Date.now(),
          name,
          email,
          password,
          createdAt: new Date().toISOString()
        };
        
        // Save to localStorage
        existingUsers.push(newUser);
        localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));
        
        setShowSuccess(true);
        
        // Countdown timer
        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev === 1) {
              clearInterval(timer);
              navigate('/login');
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        
      } catch (err) {
        setMessage('❌ Registration failed. Please try again.');
        setLoading(false);
      }
    }, 2000);
  };

  if (showSuccess) {
    return (
      <div className="glass-card success-animation">
        <div className="success-icon">🎉</div>
        <h2 style={{color: 'white', marginBottom: '20px'}}>Registration Successful!</h2>
        <p style={{color: 'rgba(255, 255, 255, 0.8)', marginBottom: '30px'}}>
          Welcome to Task Manager Pro! Your account has been created successfully.
        </p>
        <div style={{color: 'rgba(255, 255, 255, 0.6)'}}>
          Redirecting to login page in <span>{countdown}</span> seconds...
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card">
      <h1 className="title">🚀 Join Task Manager Pro</h1>
      <p className="subtitle">Create your account and start organizing!</p>
      
      {message && (
        <div className={`message ${message.includes('✅') ? 'success-message' : 'error-message'}`}>
          {message}
        </div>
      )}
      
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            className="form-input"
            placeholder="Full Name"
            required
          />
          <label className="floating-label">👤 Full Name</label>
        </div>
        
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
          <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? '🙈' : '👁️'}
          </span>
        </div>
        
        <div className="form-group password-container">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={confirmPassword}
            onChange={onChange}
            className="form-input"
            placeholder="Confirm Password"
            required
          />
          <label className="floating-label">🔒 Confirm Password</label>
          <span className="password-toggle" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
            {showConfirmPassword ? '🙈' : '👁️'}
          </span>
        </div>
        
        <button type="submit" className="btn" disabled={loading}>
          {loading ? (
            <>
              <span className="loading"></span>
              Creating Account...
            </>
          ) : (
            'Create Account'
          )}
        </button>
      </form>
      
      <div className="auth-link">
        Already have an account? <Link to="/login">Sign in here</Link>
      </div>
    </div>
  );
};

export default Register;