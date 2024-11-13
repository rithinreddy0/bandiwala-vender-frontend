import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    // Redirect to the login page with a state indicating a message
    return <Navigate to="/signIn" replace state={{ message: "Please login or create an account." }} />;
  }

  return children;
};

export default ProtectedRoute;
