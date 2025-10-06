import React from 'react';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute: React.FC<{ children: React.ReactElement; role?: string }> = ({ children, role }) => {
  const token = localStorage.getItem('token');
  const userJson = localStorage.getItem('user');
  const user = userJson ? JSON.parse(userJson) : null;

  if (!token) return <Navigate to="/login" replace />;
  if (role && user?.role !== role) return <Navigate to="/dashboard" replace />;

  return children;
};
