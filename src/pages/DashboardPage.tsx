import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { RenterDashboard } from '../components/Dashboard/RenterDashboard';
import { OwnerDashboard } from '../components/Dashboard/OwnerDashboard';
import { AdminDashboard } from '../components/Dashboard/AdminDashboard';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600">Please log in to view your dashboard.</p>
        </div>
      </div>
    );
  }

  switch (user.role) {
    case 'renter':
      return <RenterDashboard />;
    case 'owner':
      return <OwnerDashboard />;
    case 'admin':
      return <AdminDashboard />;
    default:
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Invalid Role</h1>
            <p className="text-gray-600">Your account role is not recognized.</p>
          </div>
        </div>
      );
  }
};