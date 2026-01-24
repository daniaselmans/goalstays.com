export interface SearchFilters {
  priceRange: [number, number];
  starRatings: number[];
  platforms: string[];
  amenities: string[];
}

export const defaultFilters: SearchFilters = {
  priceRange: [0, 1000],
  starRatings: [],
  platforms: ['Booking.com', 'Hotels.com', 'Airbnb', 'Trivago'],
  amenities: [],
};

export const AMENITIES_LIST = [
  'Free WiFi',
  'Pool',
  'Spa',
  'Restaurant',
  'Gym',
  'Parking',
  'Pet Friendly',
  'Kitchen',
];

export const PLATFORMS_LIST = [
  { name: 'Booking.com', color: '#003580' },
  { name: 'Hotels.com', color: '#d32f2f' },
  { name: 'Airbnb', color: '#FF5A5F' },
  { name: 'Trivago', color: '#007faf' },
];
