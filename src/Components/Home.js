import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home({ token, setToken }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(false);
    navigate('/');
  };

  return (
    <div className="container mt-5">
      <h1>Welcome to the Multi-Task App</h1>
      {token ? (
        <>
          <p>You are logged in.</p>
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <button
            className="btn btn-primary me-3"
            onClick={() => navigate('/register')}
          >
            Register
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        </>
      )}
    </div>
  );
}

export default Home;
