import React from 'react';
import { useAuth } from './AuthContext';
import { UserRole } from '../types';
import { Permission } from './permissions';

interface RoleGuardProps {
  role: UserRole;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({ role, children, fallback = null }) => {
  const { hasRole } = useAuth();
  if (!hasRole(role)) {
    return <>{fallback}</>;
  }
  return <>{children}</>;
};

interface PermissionGateProps {
  permission: Permission;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const PermissionGate: React.FC<PermissionGateProps> = ({ permission, children, fallback = null }) => {
  const { hasPermission } = useAuth();
  if (!hasPermission(permission)) {
    return <>{fallback}</>;
  }
  return <>{children}</>;
};
