export interface User {
  id: string;
  email: string;
  name: string;
  role: 'renter' | 'owner' | 'admin';
  phone?: string;
  avatar?: string;
  isApproved: boolean;
  createdAt: string;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  type: 'apartment' | 'house' | 'room' | 'studio';
  rent: number;
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  bedrooms: number;
  bathrooms: number;
  area: number;
  amenities: string[];
  images: string[];
  ownerId: string;
  ownerName: string;
  ownerContact: {
    email: string;
    phone: string;
  };
  availability: 'available' | 'pending' | 'rented';
  createdAt: string;
  updatedAt: string;
}

export interface Inquiry {
  id: string;
  propertyId: string;
  renterId: string;
  renterName: string;
  renterEmail: string;
  renterPhone: string;
  message: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  content: string;
  createdAt: string;
  read: boolean;
}

export interface SearchFilters {
  location: string;
  minRent: number;
  maxRent: number;
  propertyType: string[];
  bedrooms: number[];
  bathrooms: number[];
  amenities: string[];
}