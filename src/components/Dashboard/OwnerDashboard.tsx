import React, { useState } from 'react';
import { Plus, Home, MessageSquare, Users, DollarSign, Eye, Edit, Trash2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { mockProperties, mockInquiries } from '../../data/mockData';

export const OwnerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'properties' | 'inquiries' | 'analytics'>('overview');

  // Mock data for demo
  const ownerProperties = mockProperties.filter(p => p.ownerId === '2'); // Mock owner ID
  const ownerInquiries = mockInquiries.filter(inquiry => 
    ownerProperties.some(p => p.id === inquiry.propertyId)
  );

  const stats = [
    { label: 'Total Properties', value: ownerProperties.length, icon: Home, color: 'blue' },
    { label: 'Active Inquiries', value: ownerInquiries.length, icon: MessageSquare, color: 'green' },
    { label: 'Total Views', value: 1247, icon: Eye, color: 'purple' },
    { label: 'Monthly Revenue', value: '$8,500', icon: DollarSign, color: 'orange' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Property Owner Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage your properties and track inquiries</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Add Property
          </button>
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
                { id: 'properties', label: 'My Properties' },
                { id: 'inquiries', label: 'Inquiries' },
                { id: 'analytics', label: 'Analytics' },
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
                {/* Recent Activity */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
                  <div className="space-y-3">
                    <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                      <MessageSquare className="h-5 w-5 text-blue-600 mr-3" />
                      <div>
                        <div className="font-medium text-gray-900">New inquiry received</div>
                        <div className="text-sm text-gray-600">Alice Cooper inquired about your downtown apartment</div>
                      </div>
                      <div className="ml-auto text-sm text-gray-500">2 hours ago</div>
                    </div>
                    <div className="flex items-center p-4 bg-green-50 rounded-lg">
                      <Eye className="h-5 w-5 text-green-600 mr-3" />
                      <div>
                        <div className="font-medium text-gray-900">Property viewed</div>
                        <div className="text-sm text-gray-600">Your luxury apartment was viewed 15 times today</div>
                      </div>
                      <div className="ml-auto text-sm text-gray-500">5 hours ago</div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
                      <Plus className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <div className="font-medium text-gray-700">Add New Property</div>
                    </button>
                    <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors">
                      <MessageSquare className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <div className="font-medium text-gray-700">View Inquiries</div>
                    </button>
                    <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors">
                      <Users className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <div className="font-medium text-gray-700">Manage Tenants</div>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'properties' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Your Properties</h2>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Property
                  </button>
                </div>

                <div className="space-y-4">
                  {ownerProperties.map((property) => (
                    <div key={property.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex">
                          <img
                            src={property.images[0]}
                            alt={property.title}
                            className="w-20 h-20 object-cover rounded-lg mr-4"
                          />
                          <div>
                            <h3 className="font-semibold text-gray-900">{property.title}</h3>
                            <p className="text-gray-600">{property.location.city}, {property.location.state}</p>
                            <div className="flex items-center mt-2 space-x-4">
                              <span className="text-lg font-semibold text-blue-600">
                                ${property.rent.toLocaleString()}/month
                              </span>
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                property.availability === 'available' 
                                  ? 'bg-green-100 text-green-800'
                                  : property.availability === 'pending'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {property.availability}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="p-2 text-gray-400 hover:text-blue-600">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'inquiries' && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Property Inquiries</h2>
                <div className="space-y-4">
                  {ownerInquiries.map((inquiry) => {
                    const property = ownerProperties.find(p => p.id === inquiry.propertyId);
                    return (
                      <div key={inquiry.id} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-semibold text-gray-900">{inquiry.renterName}</h3>
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                inquiry.status === 'pending' 
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : inquiry.status === 'approved'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {inquiry.status}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">Property: {property?.title}</p>
                            <p className="text-gray-700 mb-3">{inquiry.message}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span>{inquiry.renterEmail}</span>
                              <span>{inquiry.renterPhone}</span>
                              <span>Sent {new Date(inquiry.createdAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                          {inquiry.status === 'pending' && (
                            <div className="flex space-x-2 ml-4">
                              <button className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700">
                                Approve
                              </button>
                              <button className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">
                                Reject
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Analytics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="font-medium text-gray-900 mb-4">Property Views</h3>
                    <div className="space-y-3">
                      {ownerProperties.map((property, index) => (
                        <div key={property.id} className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">{property.title}</span>
                          <span className="font-medium">{(index + 1) * 123} views</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="font-medium text-gray-900 mb-4">Inquiry Response Rate</h3>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 mb-2">85%</div>
                      <p className="text-sm text-gray-600">You respond to inquiries within 24 hours</p>
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