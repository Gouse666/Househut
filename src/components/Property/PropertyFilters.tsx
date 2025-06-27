import React from 'react';
import { Search, X } from 'lucide-react';
import { SearchFilters } from '../../types';
import { commonAmenities } from '../../data/mockData';

interface PropertyFiltersProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  onClear: () => void;
}

export const PropertyFilters: React.FC<PropertyFiltersProps> = ({
  filters,
  onFiltersChange,
  onClear,
}) => {
  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const handleArrayToggle = (key: keyof SearchFilters, value: string) => {
    const currentArray = filters[key] as string[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    
    handleFilterChange(key, newArray);
  };

  const handleNumberArrayToggle = (key: keyof SearchFilters, value: number) => {
    const currentArray = filters[key] as number[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    
    handleFilterChange(key, newArray);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Filter Properties</h3>
        <button
          onClick={onClear}
          className="flex items-center text-sm text-gray-600 hover:text-gray-900"
        >
          <X className="h-4 w-4 mr-1" />
          Clear All
        </button>
      </div>

      <div className="space-y-6">
        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <div className="relative">
            <input
              type="text"
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              placeholder="Enter city, state, or zip code"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
        </div>

        {/* Rent Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rent Range
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="number"
                value={filters.minRent || ''}
                onChange={(e) => handleFilterChange('minRent', parseInt(e.target.value) || 0)}
                placeholder="Min"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <input
                type="number"
                value={filters.maxRent || ''}
                onChange={(e) => handleFilterChange('maxRent', parseInt(e.target.value) || 10000)}
                placeholder="Max"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Property Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Property Type
          </label>
          <div className="space-y-2">
            {['apartment', 'house', 'room', 'studio'].map((type) => (
              <label key={type} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.propertyType.includes(type)}
                  onChange={() => handleArrayToggle('propertyType', type)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700 capitalize">{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Bedrooms */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bedrooms
          </label>
          <div className="flex flex-wrap gap-2">
            {[0, 1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                onClick={() => handleNumberArrayToggle('bedrooms', num)}
                className={`px-3 py-1 rounded-full text-sm border ${
                  filters.bedrooms.includes(num)
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                }`}
              >
                {num === 0 ? 'Studio' : `${num}+`}
              </button>
            ))}
          </div>
        </div>

        {/* Bathrooms */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bathrooms
          </label>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                onClick={() => handleNumberArrayToggle('bathrooms', num)}
                className={`px-3 py-1 rounded-full text-sm border ${
                  filters.bathrooms.includes(num)
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                }`}
              >
                {num}+
              </button>
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amenities
          </label>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {commonAmenities.map((amenity) => (
              <label key={amenity} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.amenities.includes(amenity)}
                  onChange={() => handleArrayToggle('amenities', amenity)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">{amenity}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};