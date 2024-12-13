import React from 'react';

const Logout = ({ setIsAuthenticated }) => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <div className="container">
      <h2>Are you sure you want to log out?</h2>
      <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
