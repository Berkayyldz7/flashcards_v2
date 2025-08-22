import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user, ready } = useAuth();
  if (!ready) return null; // istersen yükleniyor gösterebilirsin
  return user ? children : <Navigate to="/login" replace />;
}
