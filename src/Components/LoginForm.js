import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Validate email and password inputs
      if (!email || !password) {
        setErrorMessage('Email and password are required.');
        return;
      }

      // Make API call to login
      const response = await axios.post('https://reqres.in/api/login', {
        email,
        password,
      });

      // If login successful, store token and redirect
      localStorage.setItem('token', response.data.token);
      setIsAuthenticated(true);
      setErrorMessage('');
      navigate('/dashboard');
    } catch (error) {
      // Handle error messages
      if (error.response && error.response.status === 400) {
        setErrorMessage('Invalid email or password.');
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form onSubmit={(e) => e.preventDefault()} className="login-form">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
          <div className="show-password">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />{' '}
            Show Password
          </div>
        </div>
        <button className="btn btn-primary login-button" onClick={handleLogin}>
          Sign In
        </button>
        {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
      </form>
      <div className="login-footer">
        <p>
          Forgot <a href="/forgot-password">Username / Password?</a>
        </p>
        <p>
          Don't have an account? <a href="/register">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
