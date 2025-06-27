import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Square, Heart } from 'lucide-react';
import { Property } from '../../types';

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 left-4">
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
        <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
          <Heart className="h-4 w-4 text-gray-600" />
        </button>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {property.title}
          </h3>
          <div className="text-right">
            <div className="text-xl font-bold text-blue-600">
              ${property.rent.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500">per month</div>
          </div>
        </div>

        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">
            {property.location.city}, {property.location.state}
          </span>
        </div>

        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
          {property.bedrooms > 0 && (
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-1" />
              <span>{property.bedrooms} bed</span>
            </div>
          )}
          <div className="flex items-center">
            <Bath className="h-4 w-4 mr-1" />
            <span>{property.bathrooms} bath</span>
          </div>
          <div className="flex items-center">
            <Square className="h-4 w-4 mr-1" />
            <span>{property.area} sqft</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {property.amenities.slice(0, 3).map((amenity) => (
            <span
              key={amenity}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
            >
              {amenity}
            </span>
          ))}
          {property.amenities.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
              +{property.amenities.length - 3} more
            </span>
          )}
        </div>

        <Link
          to={`/property/${property.id}`}
          className="block w-full bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};