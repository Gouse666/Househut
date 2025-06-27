import React, { useState } from 'react';
import { Heart, MessageSquare, Calendar, Search, MapPin, DollarSign } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { mockProperties, mockInquiries } from '../../data/mockData';
import { PropertyCard } from '../Property/PropertyCard';

export const RenterDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'inquiries' | 'favorites' | 'messages'>('overview');

  // Mock data for demo
  const userInquiries = mockInquiries.filter(inquiry => inquiry.renterId === user?.id);
  const favoriteProperties = mockProperties.slice(0, 2);
  const recentSearches = [
    { location: 'New York, NY', filters: '2 bed, $2000-3000' },
    { location: 'Brooklyn, NY', filters: 'Studio, $1500-2000' },
  ];

  const stats = [
    { label: 'Inquiries Sent', value: userInquiries.length, icon: MessageSquare, color: 'blue' },
    { label: 'Favorites', value: favoriteProperties.length, icon: Heart, color: 'red' },
    { label: 'Scheduled Tours', value: 1, icon: Calendar, color: 'green' },
    { label: 'Saved Searches', value: recentSearches.length, icon: Search, color: 'purple' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
          <p className="text-gray-600 mt-2">Manage your property search and track your inquiries</p>
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
                { id: 'inquiries', label: 'My Inquiries' },
                { id: 'favorites', label: 'Favorites' },
                { id: 'messages', label: 'Messages' },
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
                {/* Recent Searches */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Searches</h2>
                  <div className="space-y-3">
                    {recentSearches.map((search, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <MapPin className="h-5 w-5 text-gray-400" />
                          <div>
                            <div className="font-medium text-gray-900">{search.location}</div>
                            <div className="text-sm text-gray-500">{search.filters}</div>
                          </div>
                        </div>
                        <button className="text-blue-600 hover:text-blue-800 font-medium">
                          Search Again
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommended Properties */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Recommended for You</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {favoriteProperties.map((property) => (
                      <PropertyCard key={property.id} property={property} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'inquiries' && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Inquiries</h2>
                {userInquiries.length === 0 ? (
                  <div className="text-center py-8">
                    <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No inquiries yet</h3>
                    <p className="text-gray-500">Start browsing properties and send your first inquiry!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {userInquiries.map((inquiry) => {
                      const property = mockProperties.find(p => p.id === inquiry.propertyId);
                      return (
                        <div key={inquiry.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-medium text-gray-900">{property?.title}</h3>
                              <p className="text-sm text-gray-600 mt-1">{inquiry.message}</p>
                              <div className="flex items-center mt-2 space-x-4">
                                <span className="text-xs text-gray-500">
                                  Sent {new Date(inquiry.createdAt).toLocaleDateString()}
                                </span>
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
                            </div>
                            <div className="text-right">
                              <div className="font-semibold text-blue-600">
                                ${property?.rent.toLocaleString()}
                              </div>
                              <div className="text-sm text-gray-500">per month</div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'favorites' && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Favorite Properties</h2>
                {favoriteProperties.length === 0 ? (
                  <div className="text-center py-8">
                    <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No favorites yet</h3>
                    <p className="text-gray-500">Save properties you're interested in to keep track of them!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {favoriteProperties.map((property) => (
                      <PropertyCard key={property.id} property={property} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'messages' && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Messages</h2>
                <div className="text-center py-8">
                  <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No messages yet</h3>
                  <p className="text-gray-500">Messages from property owners will appear here</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};