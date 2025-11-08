import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';
import './LoginPage.css';

const Login = ({ setIsAuthenticated, setCurrentUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    // CRITICAL: Prevent form submission
    e.preventDefault();
    e.stopPropagation();
    
    console.log('🔄 STEP 1: Form submission prevented');
    console.log('🔄 STEP 2: Email:', email);
    console.log('🔄 STEP 3: Password length:', password.length);
    
    setLoading(true);
    setMessage('');

    try {
      console.log('🔄 STEP 4: Creating request data...');
      const credentials = { email, password };
      console.log('🔄 STEP 5: Credentials:', credentials);
      
      console.log('🔄 STEP 6: Calling authAPI.login...');
      const response = await authAPI.login(credentials);
      
      console.log('✅ STEP 7: Response received:', response);
      console.log('✅ STEP 8: Response data:', response.data);
      
      if (response.data && response.data.success) {
        console.log('✅ STEP 9: Login successful!');
        console.log('✅ STEP 10: Token:', response.data.token ? 'EXISTS' : 'MISSING');
        console.log('✅ STEP 11: User:', response.data.user);
        
        // Store authentication data
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('currentUser', JSON.stringify(response.data.user));
        
        // Update app state
        setIsAuthenticated(true);
        setCurrentUser(response.data.user);
        
        setMessage('✅ Login successful! Redirecting...');
        
        // Navigate to dashboard
        setTimeout(() => {
          navigate('/dashboard', { replace: true });
        }, 1000);
        
      } else {
        console.log('❌ STEP 9: Login failed - invalid response');
        setMessage('❌ Login failed - invalid response');
      }
      
    } catch (error) {
      console.error('❌ STEP 7: Login error caught:', error);
      console.error('❌ Error name:', error.name);
      console.error('❌ Error message:', error.message);
      console.error('❌ Error response:', error.response);
      console.error('❌ Error response data:', error.response?.data);
      
      const errorMessage = error.response?.data?.message || error.message || 'Login failed';
      setMessage('❌ ' + errorMessage);
    } finally {
      setLoading(false);
    }
  };
return (
  <div className="login-container">
    <div className="login-card">
      <div className="login-header">
        <h1 className="login-title">Welcome Back</h1>
        <p className="login-subtitle">Sign in to your account</p>
      </div>
      
      {message && (
        <div className={`message-alert ${message.includes('✅') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}
      
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="email">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            disabled={loading}
          />
        </div>
        
        <div className="form-group">
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            disabled={loading}
          />
          <div className="forgot-password">
            <Link to="/forgot-password" className="login-link">Forgot Password?</Link>
          </div>
        </div>
        
        <button
          type="submit"
          className={`login-button ${loading ? 'loading' : ''}`}
          disabled={loading}
        >
          {loading ? '' : 'Sign In'}
        </button>
      </form>
      
      <div className="login-footer">
        <p>
          Don't have an account?{' '}
          <Link to="/register" className="login-link">
            Register here
          </Link>
        </p>
      </div>
    </div>
  </div>
);
  
};

export default Login;