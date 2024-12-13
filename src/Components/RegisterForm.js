import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // This CSS will also apply styling for the register form.

const Register = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      // Validate input fields
      if (!email || !password) {
        setErrorMessage('Email and password are required.');
        setSuccessMessage('');
        return;
      }

      // Make the API request
      const response = await axios.post('https://reqres.in/api/register', {
        email,
        password,
      });

      // Show success message and redirect
      setSuccessMessage('Congratulations on creating your account!');
      setErrorMessage('');

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage('Failed to register. Please try again.');
        setSuccessMessage('');
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
        setSuccessMessage('');
      }
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Register</h2>
      <form onSubmit={(e) => e.preventDefault()} className="login-form">
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        <button className="btn btn-primary login-button" onClick={handleRegister}>
          Register
        </button>
        {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
        {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
      </form>
    </div>
  );
};

export default Register;
