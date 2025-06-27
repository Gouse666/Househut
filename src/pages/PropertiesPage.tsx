import React, { useState, useMemo } from 'react';
import { PropertyCard } from '../components/Property/PropertyCard';
import { PropertyFilters } from '../components/Property/PropertyFilters';
import { mockProperties } from '../data/mockData';
import { SearchFilters } from '../types';
import { Grid, List, SlidersHorizontal } from 'lucide-react';

export const PropertiesPage: React.FC = () => {
  const [filters, setFilters] = useState<SearchFilters>({
    location: '',
    minRent: 0,
    maxRent: 10000,
    propertyType: [],
    bedrooms: [],
    bathrooms: [],
    amenities: [],
  });
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'price-low' | 'price-high' | 'newest' | 'oldest'>('newest');

  const filteredProperties = useMemo(() => {
    let filtered = mockProperties.filter(property => {
      // Location filter
      if (filters.location) {
        const searchLocation = filters.location.toLowerCase();
        const propertyLocation = `${property.location.city} ${property.location.state} ${property.location.zipCode}`.toLowerCase();
        if (!propertyLocation.includes(searchLocation)) return false;
      }

      // Rent range filter
      if (property.rent < filters.minRent || property.rent > filters.maxRent) return false;

      // Property type filter
      if (filters.propertyType.length > 0 && !filters.propertyType.includes(property.type)) return false;

      // Bedrooms filter
      if (filters.bedrooms.length > 0 && !filters.bedrooms.includes(property.bedrooms)) return false;

      // Bathrooms filter
      if (filters.bathrooms.length > 0 && !filters.bathrooms.includes(property.bathrooms)) return false;

      // Amenities filter
      if (filters.amenities.length > 0) {
        const hasAllAmenities = filters.amenities.every(amenity => 
          property.amenities.includes(amenity)
        );
        if (!hasAllAmenities) return false;
      }

      return true;
    });

    // Sort properties
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.rent - b.rent);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.rent - a.rent);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
    }

    return filtered;
  }, [filters, sortBy]);

  const clearFilters = () => {
    setFilters({
      location: '',
      minRent: 0,
      maxRent: 10000,
      propertyType: [],
      bedrooms: [],
      bathrooms: [],
      amenities: [],
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Available Properties</h1>
          <p className="text-gray-600">
            Discover your perfect rental from our extensive collection of verified properties
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <PropertyFilters
              filters={filters}
              onFiltersChange={setFilters}
              onClear={clearFilters}
            />
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Controls */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                  </button>
                  
                  <div className="text-sm text-gray-600">
                    {filteredProperties.length} properties found
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>

                  <div className="flex border border-gray-300 rounded-md">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
                    >
                      <Grid className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
                    >
                      <List className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Properties Grid/List */}
            {filteredProperties.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-500 mb-4">
                  <Grid className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
                  <p>Try adjusting your filters to see more results</p>
                </div>
                <button
                  onClick={clearFilters}
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className={
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                  : 'space-y-4'
              }>
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};