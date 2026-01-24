export interface CarSearchFilters {
  priceRange: [number, number];
  vehicleTypes: string[];
  transmissions: string[];
  fuelTypes: string[];
  features: string[];
}

export const defaultCarFilters: CarSearchFilters = {
  priceRange: [0, 500],
  vehicleTypes: [],
  transmissions: [],
  fuelTypes: [],
  features: [],
};

export const VEHICLE_TYPES = [
  'Economy',
  'Compact',
  'Standard',
  'Full-size',
  'SUV',
  'Luxury',
  'Van',
  'Convertible',
];

export const TRANSMISSION_TYPES = [
  { name: 'Automatic', value: 'Automatic' },
  { name: 'Manual', value: 'Manual' },
];

export const FUEL_TYPES = [
  'Petrol',
  'Diesel',
  'Hybrid',
  'Electric',
];

export const CAR_FEATURES = [
  'Air Conditioning',
  'GPS Navigation',
  'Bluetooth',
  'USB Charger',
  'Child Seat',
  'Unlimited Mileage',
];

export const CAR_PLATFORMS = [
  { name: 'RentalCars', color: '#FF6B00', logo: '🚗' },
  { name: 'Kayak', color: '#FF690F', logo: '🔍' },
  { name: 'Hertz', color: '#FFD700', logo: '🚙' },
  { name: 'Enterprise', color: '#007934', logo: '🚘' },
];
