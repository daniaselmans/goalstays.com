export interface PlatformPrice {
  platform: string;
  price: number;
  originalPrice?: number;
  logo: string;
  color: string;
}

export interface Hotel {
  id: number;
  name: string;
  location: string;
  image: string;
  rating: number;
  reviews: number;
  stars: number;
  amenities: string[];
  lowestPrice: number;
  prices: PlatformPrice[];
  discount?: number;
  featured?: boolean;
}

export const mockHotels: Hotel[] = [
  {
    id: 1,
    name: 'Le Grand Paris Hotel & Spa',
    location: 'Champs-Élysées, Paris',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&auto=format&fit=crop&q=80',
    rating: 4.8,
    reviews: 2341,
    stars: 5,
    amenities: ['Free WiFi', 'Spa', 'Pool', 'Restaurant', 'Gym'],
    lowestPrice: 289,
    featured: true,
    discount: 25,
    prices: [
      { platform: 'Booking.com', price: 289, originalPrice: 385, logo: 'B', color: '#003580' },
      { platform: 'Hotels.com', price: 312, originalPrice: 385, logo: 'H', color: '#d32f2f' },
      { platform: 'Airbnb', price: 345, logo: 'A', color: '#FF5A5F' },
      { platform: 'Trivago', price: 299, originalPrice: 385, logo: 'T', color: '#007faf' },
    ],
  },
  {
    id: 2,
    name: 'Boutique Hotel Montmartre',
    location: 'Montmartre, Paris',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80',
    rating: 4.6,
    reviews: 1876,
    stars: 4,
    amenities: ['Free WiFi', 'Breakfast', 'Bar', 'Room Service'],
    lowestPrice: 179,
    prices: [
      { platform: 'Booking.com', price: 195, logo: 'B', color: '#003580' },
      { platform: 'Hotels.com', price: 179, originalPrice: 220, logo: 'H', color: '#d32f2f' },
      { platform: 'Airbnb', price: 199, logo: 'A', color: '#FF5A5F' },
      { platform: 'Trivago', price: 189, logo: 'T', color: '#007faf' },
    ],
  },
  {
    id: 3,
    name: 'Eiffel Tower View Apartment',
    location: 'Trocadéro, Paris',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviews: 856,
    stars: 0,
    amenities: ['Free WiFi', 'Kitchen', 'Washer', 'Balcony', 'City View'],
    lowestPrice: 245,
    discount: 15,
    prices: [
      { platform: 'Booking.com', price: 275, logo: 'B', color: '#003580' },
      { platform: 'Hotels.com', price: 289, logo: 'H', color: '#d32f2f' },
      { platform: 'Airbnb', price: 245, originalPrice: 289, logo: 'A', color: '#FF5A5F' },
      { platform: 'Trivago', price: 269, logo: 'T', color: '#007faf' },
    ],
  },
  {
    id: 4,
    name: 'Hotel & Residence Saint-Germain',
    location: 'Saint-Germain-des-Prés, Paris',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=80',
    rating: 4.5,
    reviews: 1432,
    stars: 4,
    amenities: ['Free WiFi', 'Restaurant', 'Concierge', 'Laundry'],
    lowestPrice: 215,
    prices: [
      { platform: 'Booking.com', price: 229, logo: 'B', color: '#003580' },
      { platform: 'Hotels.com', price: 235, logo: 'H', color: '#d32f2f' },
      { platform: 'Airbnb', price: 249, logo: 'A', color: '#FF5A5F' },
      { platform: 'Trivago', price: 215, originalPrice: 250, logo: 'T', color: '#007faf' },
    ],
  },
  {
    id: 5,
    name: 'Luxury Suite near Louvre',
    location: 'Le Marais, Paris',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80',
    rating: 4.7,
    reviews: 2105,
    stars: 5,
    amenities: ['Free WiFi', 'Spa', 'Butler', 'Mini Bar', 'Rooftop'],
    lowestPrice: 425,
    featured: true,
    discount: 20,
    prices: [
      { platform: 'Booking.com', price: 425, originalPrice: 530, logo: 'B', color: '#003580' },
      { platform: 'Hotels.com', price: 449, originalPrice: 530, logo: 'H', color: '#d32f2f' },
      { platform: 'Airbnb', price: 475, logo: 'A', color: '#FF5A5F' },
      { platform: 'Trivago', price: 439, originalPrice: 530, logo: 'T', color: '#007faf' },
    ],
  },
  {
    id: 6,
    name: 'Cozy Studio Latin Quarter',
    location: 'Latin Quarter, Paris',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=80',
    rating: 4.4,
    reviews: 678,
    stars: 0,
    amenities: ['Free WiFi', 'Kitchen', 'Heating', 'Workspace'],
    lowestPrice: 129,
    prices: [
      { platform: 'Booking.com', price: 145, logo: 'B', color: '#003580' },
      { platform: 'Hotels.com', price: 149, logo: 'H', color: '#d32f2f' },
      { platform: 'Airbnb', price: 129, logo: 'A', color: '#FF5A5F' },
      { platform: 'Trivago', price: 139, logo: 'T', color: '#007faf' },
    ],
  },
];
