import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { UserRole } from '../types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRole?: UserRole;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRole }) => {
  const { isAuthenticated, role, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-[#0D3B66] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-mono text-[#64748B] uppercase tracking-wider">Loading Security Context...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    const loginPath = allowedRole ? `/login/${allowedRole.toLowerCase()}` : '/login/trainee';
    return <Navigate to={loginPath} state={{ from: location }} replace />;
  }

  if (allowedRole && role !== allowedRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};
