import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/LoginForm';
import Register from './Components/RegisterForm';
import Dashboard from './Components/Dashboard';
import FetchData1 from './Components/FetchData1';
import FetchData2 from './Components/FetchData2';
import InfiniteScroll from './Components/InfiniteScroll';
import Logout from './Components/Logout';
import Navbar from './Components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      {isAuthenticated && <Navbar />}
      <div className="container mt-5">
        <Routes>
          {/* Public Routes */}
          <Route
            path="/login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route
            path="/register"
            element={<Register setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route
            path="/"
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
          />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/fetch-data-1"
            element={
              <PrivateRoute>
                <FetchData1 />
              </PrivateRoute>
            }
          />
          <Route
            path="/fetch-data-2"
            element={
              <PrivateRoute>
                <FetchData2 />
              </PrivateRoute>
            }
          />
          <Route
            path="/fetch-data-3"
            element={
              <PrivateRoute>
                <InfiniteScroll />
              </PrivateRoute>
            }
          />
          <Route
            path="/logout"
            element={
              <PrivateRoute>
                <Logout setIsAuthenticated={setIsAuthenticated} />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
