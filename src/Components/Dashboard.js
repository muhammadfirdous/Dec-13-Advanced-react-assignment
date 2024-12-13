import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="container">
      <h1>Dashboard</h1>
      <p>Choose a data-fetching task:</p>
      <ul className="list-unstyled">
        <li className="mb-3">
          <Link to="/fetch-data-1" className="btn btn-primary">
            Fetch Data 1: Users
          </Link>
        </li>
        <li className="mb-3">
          <Link to="/fetch-data-2" className="btn btn-secondary">
            Fetch Data 2: Posts
          </Link>
        </li>
        <li className="mb-3">
          <Link to="/fetch-data-3" className="btn btn-success">
            Fetch Data 3: Advanced Features
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Dashboard;
