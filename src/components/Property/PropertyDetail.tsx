import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Phone, 
  Mail, 
  ChevronLeft, 
  ChevronRight,
  Calendar,
  Heart,
  Share2
} from 'lucide-react';
import { mockProperties } from '../../data/mockData';
import { useAuth } from '../../contexts/AuthContext';

export const PropertyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [inquiryData, setInquiryData] = useState({
    message: '',
    preferredDate: '',
  });

  const property = mockProperties.find(p => p.id === id);

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h1>
          <Link to="/properties" className="text-blue-600 hover:text-blue-800">
            Back to Properties
          </Link>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Inquiry submitted:', inquiryData);
    setShowInquiryForm(false);
    // In a real app, this would make an API call
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/properties"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Properties
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative">
              <img
                src={property.images[currentImageIndex]}
                alt={property.title}
                className="w-full h-96 object-cover rounded-lg"
              />
              {property.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-md"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-md"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {property.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-2">
              {property.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative ${
                    index === currentImageIndex ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  <img
                    src={image}
                    alt={`View ${index + 1}`}
                    className="w-full h-20 object-cover rounded-md"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Property Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{property.title}</h1>
                <div className="flex space-x-2">
                  <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
                    <Heart className="h-5 w-5 text-gray-600" />
                  </button>
                  <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
                    <Share2 className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{property.location.address}, {property.location.city}, {property.location.state} {property.location.zipCode}</span>
              </div>

              <div className="text-3xl font-bold text-blue-600 mb-4">
                ${property.rent.toLocaleString()}/month
              </div>

              <div className="flex items-center space-x-6 text-gray-700 mb-6">
                {property.bedrooms > 0 && (
                  <div className="flex items-center">
                    <Bed className="h-5 w-5 mr-2" />
                    <span>{property.bedrooms} Bedroom{property.bedrooms > 1 ? 's' : ''}</span>
                  </div>
                )}
                <div className="flex items-center">
                  <Bath className="h-5 w-5 mr-2" />
                  <span>{property.bathrooms} Bathroom{property.bathrooms > 1 ? 's' : ''}</span>
                </div>
                <div className="flex items-center">
                  <Square className="h-5 w-5 mr-2" />
                  <span>{property.area} sqft</span>
                </div>
              </div>

              <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                property.availability === 'available' 
                  ? 'bg-green-100 text-green-800'
                  : property.availability === 'pending'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {property.availability}
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Description</h2>
              <p className="text-gray-700 leading-relaxed">{property.description}</p>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Amenities</h2>
              <div className="grid grid-cols-2 gap-2">
                {property.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Property Owner</h2>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {property.ownerName.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <div className="font-medium text-gray-900">{property.ownerName}</div>
                    <div className="text-sm text-gray-600">Property Owner</div>
                  </div>
                </div>
                
                <div className="flex items-center text-gray-700">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>{property.ownerContact.email}</span>
                </div>
                
                <div className="flex items-center text-gray-700">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>{property.ownerContact.phone}</span>
                </div>
              </div>

              {user?.role === 'renter' && property.availability === 'available' && (
                <div className="mt-6 space-y-3">
                  <button
                    onClick={() => setShowInquiryForm(true)}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
                  >
                    Send Inquiry
                  </button>
                  <button className="w-full bg-white text-blue-600 border border-blue-600 py-3 px-4 rounded-md hover:bg-blue-50 transition-colors font-medium">
                    Schedule Tour
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Inquiry Modal */}
      {showInquiryForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full mx-4 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Send Inquiry</h3>
            <form onSubmit={handleInquirySubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  value={inquiryData.message}
                  onChange={(e) => setInquiryData(prev => ({ ...prev, message: e.target.value }))}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Tell the owner about your interest in this property..."
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Viewing Date
                </label>
                <input
                  type="date"
                  value={inquiryData.preferredDate}
                  onChange={(e) => setInquiryData(prev => ({ ...prev, preferredDate: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowInquiryForm(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Send Inquiry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};