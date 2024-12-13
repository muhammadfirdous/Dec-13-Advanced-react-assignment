import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/dashboard">
          Multi-Task App
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/fetch-data-1">
                Fetch Data 1
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/fetch-data-2">
                Fetch Data 2
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/fetch-data-3">
                Fetch Data 3
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/logout">
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
