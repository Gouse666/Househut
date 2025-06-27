import React, { useState } from 'react';
import { Users, Home, MessageSquare, Shield, CheckCircle, XCircle, Eye } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'properties' | 'reports'>('overview');

  // Mock data for admin dashboard
  const stats = [
    { label: 'Total Users', value: 1247, icon: Users, color: 'blue' },
    { label: 'Active Properties', value: 89, icon: Home, color: 'green' },
    { label: 'Pending Approvals', value: 12, icon: Shield, color: 'yellow' },
    { label: 'Monthly Revenue', value: '$45,230', icon: MessageSquare, color: 'purple' },
  ];

  const pendingUsers = [
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'owner', createdAt: '2024-01-15' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'owner', createdAt: '2024-01-14' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage users, properties, and platform operations</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className={`p-2 rounded-lg bg-${stat.color}-100`}>
                  <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'users', label: 'User Management' },
                { id: 'properties', label: 'Property Management' },
                { id: 'reports', label: 'Reports' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Pending Approvals */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Pending User Approvals</h2>
                  <div className="space-y-3">
                    {pendingUsers.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-white font-semibold">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-600">{user.email} • {user.role}</div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 flex items-center">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </button>
                          <button className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 flex items-center">
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Platform Activity</h2>
                  <div className="space-y-3">
                    <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                      <Users className="h-5 w-5 text-blue-600 mr-3" />
                      <div>
                        <div className="font-medium text-gray-900">New user registration</div>
                        <div className="text-sm text-gray-600">Alice Cooper registered as a renter</div>
                      </div>
                      <div className="ml-auto text-sm text-gray-500">2 hours ago</div>
                    </div>
                    <div className="flex items-center p-4 bg-green-50 rounded-lg">
                      <Home className="h-5 w-5 text-green-600 mr-3" />
                      <div>
                        <div className="font-medium text-gray-900">Property listed</div>
                        <div className="text-sm text-gray-600">Modern 2BR apartment added to downtown listings</div>
                      </div>
                      <div className="ml-auto text-sm text-gray-500">4 hours ago</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">User Management</h2>
                  <div className="flex space-x-2">
                    <select className="px-3 py-2 border border-gray-300 rounded-md">
                      <option>All Users</option>
                      <option>Renters</option>
                      <option>Owners</option>
                      <option>Pending Approval</option>
                    </select>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Role
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Joined
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {pendingUsers.map((user) => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                                {user.name.charAt(0)}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                <div className="text-sm text-gray-500">{user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                              Pending
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.createdAt}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button className="text-green-600 hover:text-green-900">Approve</button>
                              <button className="text-red-600 hover:text-red-900">Reject</button>
                              <button className="text-blue-600 hover:text-blue-900">View</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'properties' && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Property Management</h2>
                <div className="text-center py-8">
                  <Home className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Property Management</h3>
                  <p className="text-gray-500">Monitor and manage all platform properties</p>
                </div>
              </div>
            )}

            {activeTab === 'reports' && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Platform Reports</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="font-medium text-gray-900 mb-4">User Growth</h3>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">+15%</div>
                      <p className="text-sm text-gray-600">New users this month</p>
                    </div>
                  </div>
                  
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="font-medium text-gray-900 mb-4">Property Listings</h3>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 mb-2">+8%</div>
                      <p className="text-sm text-gray-600">New listings this month</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};