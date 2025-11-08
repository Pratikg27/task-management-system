import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';
import './RegisterPage.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  const { name, email, password, confirmPassword } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    // Validation
    if (password !== confirmPassword) {
      setMessage('❌ Passwords do not match');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setMessage('❌ Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      console.log('🔄 Attempting registration...');
      
      const response = await authAPI.register({
        name,
        email,
        password
      });

      console.log('✅ Registration successful:', response.data);
      
      if (response.data && response.data.success) {
        // Clear form
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: ''
        });
        
        // Show beautiful success modal
        setShowSuccessModal(true);
        
      } else {
        setMessage('❌ Registration failed. Please try again.');
      }
      
    } catch (error) {
      console.error('❌ Registration error:', error);
      
      if (error.response?.data?.message) {
        setMessage('❌ ' + error.response.data.message);
      } else if (error.code === 'ECONNREFUSED') {
        setMessage('❌ Cannot connect to server. Please check your connection.');
      } else {
        setMessage('❌ Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoToLogin = () => {
    setShowSuccessModal(false);
    navigate('/login', { replace: true });
  };

  return (
    <>
      <div className="register-container">
        <div className="register-card">
          <div className="register-header">
            <h1 className="register-title">Create Account</h1>
            <p className="register-subtitle">Join us today and get started</p>
          </div>
          
          {message && (
            <div className={`message-alert ${message.includes('✅') ? 'success' : 'error'}`}>
              {message}
            </div>
          )}
          
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="name">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-input"
                value={name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
                value={email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-input"
                value={password}
                onChange={handleChange}
                placeholder="Enter password (min 6 characters)"
                required
                minLength={6}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="form-input"
                value={confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
              />
            </div>

            <button
              type="submit"
              className={`register-button ${loading ? 'loading' : ''}`}
              disabled={loading}
            >
              {loading ? '' : 'Create Account'}
            </button>
          </form>
          
          <div className="register-footer">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="register-link">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Beautiful Success Modal */}
      {showSuccessModal && (
        <div className="success-modal">
          <div className="success-modal-content">
            <div className="success-icon">🎉</div>
            <h2 className="success-title">Registration Successful!</h2>
            <p className="success-message">
              Welcome aboard! Your account has been created successfully. 
              You can now sign in to access your dashboard.
            </p>
            <button 
              className="success-button"
              onClick={handleGoToLogin}
            >
              Go to Login Page
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;