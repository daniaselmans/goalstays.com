export interface FlightLeg {
  departure: string;
  arrival: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  airline: string;
  airlineLogo?: string;
  flightNumber: string;
  aircraft?: string;
  stops?: string[];
}

export interface FlightPrice {
  platform: string;
  price: number;
  url: string;
  cabinClass: string;
  originalPrice?: number;
}

export interface Flight {
  id: string;
  outbound: FlightLeg[];
  inbound?: FlightLeg[];
  totalDuration: string;
  stops: number;
  prices: FlightPrice[];
  lowestPrice: number;
  airlines: string[];
  featured?: boolean;
  discount?: number;
}

// Airline logos (using placeholder URLs)
const airlineLogos: Record<string, string> = {
  'Delta': 'https://logos-world.net/wp-content/uploads/2020/11/Delta-Air-Lines-Logo.png',
  'United': 'https://logos-world.net/wp-content/uploads/2021/08/United-Airlines-Logo.png',
  'American Airlines': 'https://logos-world.net/wp-content/uploads/2021/08/American-Airlines-Logo.png',
  'British Airways': 'https://logos-world.net/wp-content/uploads/2020/10/British-Airways-Logo.png',
  'Air France': 'https://logos-world.net/wp-content/uploads/2020/10/Air-France-Logo.png',
  'Lufthansa': 'https://logos-world.net/wp-content/uploads/2020/10/Lufthansa-Logo.png',
  'Emirates': 'https://logos-world.net/wp-content/uploads/2020/03/Emirates-Logo.png',
  'Singapore Airlines': 'https://logos-world.net/wp-content/uploads/2020/10/Singapore-Airlines-Logo.png',
  'Qatar Airways': 'https://logos-world.net/wp-content/uploads/2020/10/Qatar-Airways-Logo.png',
  'Japan Airlines': 'https://logos-world.net/wp-content/uploads/2021/08/Japan-Airlines-Logo.png',
  'Qantas': 'https://logos-world.net/wp-content/uploads/2020/10/Qantas-Logo.png',
  'KLM': 'https://logos-world.net/wp-content/uploads/2020/10/KLM-Logo.png',
  'Turkish Airlines': 'https://logos-world.net/wp-content/uploads/2020/10/Turkish-Airlines-Logo.png',
  'Swiss': 'https://logos-world.net/wp-content/uploads/2020/10/Swiss-International-Air-Lines-Logo.png',
};

export const mockFlights: Flight[] = [
  // New York to London flights
  {
    id: 'fl-001',
    outbound: [
      {
        departure: 'JFK',
        arrival: 'LHR',
        departureTime: '18:30',
        arrivalTime: '06:45+1',
        duration: '7h 15m',
        airline: 'British Airways',
        flightNumber: 'BA178',
        aircraft: 'Boeing 777-300ER',
      }
    ],
    inbound: [
      {
        departure: 'LHR',
        arrival: 'JFK',
        departureTime: '11:15',
        arrivalTime: '14:30',
        duration: '8h 15m',
        airline: 'British Airways',
        flightNumber: 'BA115',
        aircraft: 'Boeing 777-300ER',
      }
    ],
    totalDuration: '15h 30m',
    stops: 0,
    airlines: ['British Airways'],
    lowestPrice: 589,
    featured: true,
    discount: 25,
    prices: [
      { platform: 'Skyscanner', price: 589, originalPrice: 785, url: '#', cabinClass: 'Economy' },
      { platform: 'Kayak', price: 612, originalPrice: 785, url: '#', cabinClass: 'Economy' },
      { platform: 'Google Flights', price: 599, originalPrice: 785, url: '#', cabinClass: 'Economy' },
    ],
  },
  {
    id: 'fl-002',
    outbound: [
      {
        departure: 'JFK',
        arrival: 'LHR',
        departureTime: '21:00',
        arrivalTime: '09:10+1',
        duration: '7h 10m',
        airline: 'Delta',
        flightNumber: 'DL1',
        aircraft: 'Airbus A330-900neo',
      }
    ],
    inbound: [
      {
        departure: 'LHR',
        arrival: 'JFK',
        departureTime: '09:30',
        arrivalTime: '12:45',
        duration: '8h 15m',
        airline: 'Delta',
        flightNumber: 'DL2',
        aircraft: 'Airbus A330-900neo',
      }
    ],
    totalDuration: '15h 25m',
    stops: 0,
    airlines: ['Delta'],
    lowestPrice: 645,
    prices: [
      { platform: 'Skyscanner', price: 645, url: '#', cabinClass: 'Economy' },
      { platform: 'Kayak', price: 658, url: '#', cabinClass: 'Economy' },
      { platform: 'Google Flights', price: 649, url: '#', cabinClass: 'Economy' },
    ],
  },
  {
    id: 'fl-003',
    outbound: [
      {
        departure: 'JFK',
        arrival: 'CDG',
        departureTime: '16:45',
        arrivalTime: '05:50+1',
        duration: '7h 05m',
        airline: 'Air France',
        flightNumber: 'AF23',
        aircraft: 'Boeing 777-200ER',
      },
      {
        departure: 'CDG',
        arrival: 'LHR',
        departureTime: '08:30',
        arrivalTime: '08:45',
        duration: '1h 15m',
        airline: 'Air France',
        flightNumber: 'AF1680',
        aircraft: 'Airbus A320',
        stops: ['Paris CDG (2h 40m layover)'],
      }
    ],
    totalDuration: '11h 00m',
    stops: 1,
    airlines: ['Air France'],
    lowestPrice: 425,
    prices: [
      { platform: 'Skyscanner', price: 425, url: '#', cabinClass: 'Economy' },
      { platform: 'Kayak', price: 438, url: '#', cabinClass: 'Economy' },
      { platform: 'Google Flights', price: 429, url: '#', cabinClass: 'Economy' },
    ],
  },

  // Los Angeles to Tokyo flights
  {
    id: 'fl-004',
    outbound: [
      {
        departure: 'LAX',
        arrival: 'NRT',
        departureTime: '11:30',
        arrivalTime: '15:25+1',
        duration: '11h 55m',
        airline: 'Japan Airlines',
        flightNumber: 'JL69',
        aircraft: 'Boeing 787-9 Dreamliner',
      }
    ],
    inbound: [
      {
        departure: 'NRT',
        arrival: 'LAX',
        departureTime: '18:00',
        arrivalTime: '12:10',
        duration: '10h 10m',
        airline: 'Japan Airlines',
        flightNumber: 'JL62',
        aircraft: 'Boeing 787-9 Dreamliner',
      }
    ],
    totalDuration: '22h 05m',
    stops: 0,
    airlines: ['Japan Airlines'],
    lowestPrice: 1125,
    featured: true,
    prices: [
      { platform: 'Skyscanner', price: 1125, url: '#', cabinClass: 'Economy' },
      { platform: 'Kayak', price: 1149, url: '#', cabinClass: 'Economy' },
      { platform: 'Google Flights', price: 1130, url: '#', cabinClass: 'Economy' },
    ],
  },
  {
    id: 'fl-005',
    outbound: [
      {
        departure: 'LAX',
        arrival: 'NRT',
        departureTime: '14:00',
        arrivalTime: '18:30+1',
        duration: '12h 30m',
        airline: 'Singapore Airlines',
        flightNumber: 'SQ11',
        aircraft: 'Airbus A350-900',
      }
    ],
    totalDuration: '12h 30m',
    stops: 0,
    airlines: ['Singapore Airlines'],
    lowestPrice: 1045,
    discount: 20,
    prices: [
      { platform: 'Skyscanner', price: 1045, originalPrice: 1306, url: '#', cabinClass: 'Economy' },
      { platform: 'Kayak', price: 1078, originalPrice: 1306, url: '#', cabinClass: 'Economy' },
      { platform: 'Google Flights', price: 1055, originalPrice: 1306, url: '#', cabinClass: 'Economy' },
    ],
  },

  // London to Dubai flights
  {
    id: 'fl-006',
    outbound: [
      {
        departure: 'LHR',
        arrival: 'DXB',
        departureTime: '08:00',
        arrivalTime: '19:25',
        duration: '6h 55m',
        airline: 'Emirates',
        flightNumber: 'EK2',
        aircraft: 'Airbus A380-800',
      }
    ],
    inbound: [
      {
        departure: 'DXB',
        arrival: 'LHR',
        departureTime: '14:30',
        arrivalTime: '18:45',
        duration: '7h 45m',
        airline: 'Emirates',
        flightNumber: 'EK3',
        aircraft: 'Airbus A380-800',
      }
    ],
    totalDuration: '14h 40m',
    stops: 0,
    airlines: ['Emirates'],
    lowestPrice: 685,
    featured: true,
    discount: 30,
    prices: [
      { platform: 'Skyscanner', price: 685, originalPrice: 978, url: '#', cabinClass: 'Economy' },
      { platform: 'Kayak', price: 715, originalPrice: 978, url: '#', cabinClass: 'Economy' },
      { platform: 'Google Flights', price: 699, originalPrice: 978, url: '#', cabinClass: 'Economy' },
    ],
  },
  {
    id: 'fl-007',
    outbound: [
      {
        departure: 'LHR',
        arrival: 'DXB',
        departureTime: '21:15',
        arrivalTime: '08:10+1',
        duration: '6h 55m',
        airline: 'British Airways',
        flightNumber: 'BA107',
        aircraft: 'Boeing 787-9',
      }
    ],
    totalDuration: '6h 55m',
    stops: 0,
    airlines: ['British Airways'],
    lowestPrice: 545,
    prices: [
      { platform: 'Skyscanner', price: 545, url: '#', cabinClass: 'Economy' },
      { platform: 'Kayak', price: 568, url: '#', cabinClass: 'Economy' },
      { platform: 'Google Flights', price: 552, url: '#', cabinClass: 'Economy' },
    ],
  },

  // Paris to Barcelona flights
  {
    id: 'fl-008',
    outbound: [
      {
        departure: 'CDG',
        arrival: 'BCN',
        departureTime: '07:30',
        arrivalTime: '09:20',
        duration: '1h 50m',
        airline: 'Air France',
        flightNumber: 'AF1048',
        aircraft: 'Airbus A320',
      }
    ],
    inbound: [
      {
        departure: 'BCN',
        arrival: 'CDG',
        departureTime: '19:45',
        arrivalTime: '21:40',
        duration: '1h 55m',
        airline: 'Air France',
        flightNumber: 'AF1649',
        aircraft: 'Airbus A320',
      }
    ],
    totalDuration: '3h 45m',
    stops: 0,
    airlines: ['Air France'],
    lowestPrice: 125,
    discount: 40,
    prices: [
      { platform: 'Skyscanner', price: 125, originalPrice: 208, url: '#', cabinClass: 'Economy' },
      { platform: 'Kayak', price: 138, originalPrice: 208, url: '#', cabinClass: 'Economy' },
      { platform: 'Google Flights', price: 129, originalPrice: 208, url: '#', cabinClass: 'Economy' },
    ],
  },

  // Sydney to Singapore flights
  {
    id: 'fl-009',
    outbound: [
      {
        departure: 'SYD',
        arrival: 'SIN',
        departureTime: '09:15',
        arrivalTime: '14:30',
        duration: '8h 15m',
        airline: 'Singapore Airlines',
        flightNumber: 'SQ232',
        aircraft: 'Airbus A380-800',
      }
    ],
    inbound: [
      {
        departure: 'SIN',
        arrival: 'SYD',
        departureTime: '20:30',
        arrivalTime: '07:15+1',
        duration: '7h 45m',
        airline: 'Singapore Airlines',
        flightNumber: 'SQ211',
        aircraft: 'Airbus A380-800',
      }
    ],
    totalDuration: '16h 00m',
    stops: 0,
    airlines: ['Singapore Airlines'],
    lowestPrice: 785,
    featured: true,
    prices: [
      { platform: 'Skyscanner', price: 785, url: '#', cabinClass: 'Economy' },
      { platform: 'Kayak', price: 812, url: '#', cabinClass: 'Economy' },
      { platform: 'Google Flights', price: 795, url: '#', cabinClass: 'Economy' },
    ],
  },
  {
    id: 'fl-010',
    outbound: [
      {
        departure: 'SYD',
        arrival: 'SIN',
        departureTime: '16:30',
        arrivalTime: '21:45',
        duration: '8h 15m',
        airline: 'Qantas',
        flightNumber: 'QF1',
        aircraft: 'Airbus A330-300',
      }
    ],
    totalDuration: '8h 15m',
    stops: 0,
    airlines: ['Qantas'],
    lowestPrice: 695,
    discount: 15,
    prices: [
      { platform: 'Skyscanner', price: 695, originalPrice: 818, url: '#', cabinClass: 'Economy' },
      { platform: 'Kayak', price: 725, originalPrice: 818, url: '#', cabinClass: 'Economy' },
      { platform: 'Google Flights', price: 705, originalPrice: 818, url: '#', cabinClass: 'Economy' },
    ],
  },

  // Chicago to Miami flights
  {
    id: 'fl-011',
    outbound: [
      {
        departure: 'ORD',
        arrival: 'MIA',
        departureTime: '06:45',
        arrivalTime: '11:15',
        duration: '3h 30m',
        airline: 'American Airlines',
        flightNumber: 'AA1234',
        aircraft: 'Boeing 737 MAX 8',
      }
    ],
    inbound: [
      {
        departure: 'MIA',
        arrival: 'ORD',
        departureTime: '18:00',
        arrivalTime: '20:45',
        duration: '3h 45m',
        airline: 'American Airlines',
        flightNumber: 'AA2345',
        aircraft: 'Boeing 737 MAX 8',
      }
    ],
    totalDuration: '7h 15m',
    stops: 0,
    airlines: ['American Airlines'],
    lowestPrice: 198,
    prices: [
      { platform: 'Skyscanner', price: 198, url: '#', cabinClass: 'Economy' },
      { platform: 'Kayak', price: 215, url: '#', cabinClass: 'Economy' },
      { platform: 'Google Flights', price: 205, url: '#', cabinClass: 'Economy' },
    ],
  },
  {
    id: 'fl-012',
    outbound: [
      {
        departure: 'ORD',
        arrival: 'MIA',
        departureTime: '08:30',
        arrivalTime: '13:00',
        duration: '3h 30m',
        airline: 'United',
        flightNumber: 'UA1432',
        aircraft: 'Boeing 737-900ER',
      }
    ],
    totalDuration: '3h 30m',
    stops: 0,
    airlines: ['United'],
    lowestPrice: 175,
    discount: 22,
    prices: [
      { platform: 'Skyscanner', price: 175, originalPrice: 224, url: '#', cabinClass: 'Economy' },
      { platform: 'Kayak', price: 189, originalPrice: 224, url: '#', cabinClass: 'Economy' },
      { platform: 'Google Flights', price: 182, originalPrice: 224, url: '#', cabinClass: 'Economy' },
    ],
  },

  // Frankfurt to Istanbul flights
  {
    id: 'fl-013',
    outbound: [
      {
        departure: 'FRA',
        arrival: 'IST',
        departureTime: '10:15',
        arrivalTime: '14:45',
        duration: '3h 00m',
        airline: 'Turkish Airlines',
        flightNumber: 'TK1590',
        aircraft: 'Boeing 787-9',
      }
    ],
    inbound: [
      {
        departure: 'IST',
        arrival: 'FRA',
        departureTime: '07:30',
        arrivalTime: '10:15',
        duration: '3h 15m',
        airline: 'Turkish Airlines',
        flightNumber: 'TK1589',
        aircraft: 'Boeing 787-9',
      }
    ],
    totalDuration: '6h 15m',
    stops: 0,
    airlines: ['Turkish Airlines'],
    lowestPrice: 245,
    prices: [
      { platform: 'Skyscanner', price: 245, url: '#', cabinClass: 'Economy' },
      { platform: 'Kayak', price: 262, url: '#', cabinClass: 'Economy' },
      { platform: 'Google Flights', price: 252, url: '#', cabinClass: 'Economy' },
    ],
  },
  {
    id: 'fl-014',
    outbound: [
      {
        departure: 'FRA',
        arrival: 'IST',
        departureTime: '14:00',
        arrivalTime: '18:25',
        duration: '2h 55m',
        airline: 'Lufthansa',
        flightNumber: 'LH1302',
        aircraft: 'Airbus A321neo',
      }
    ],
    totalDuration: '2h 55m',
    stops: 0,
    airlines: ['Lufthansa'],
    lowestPrice: 285,
    prices: [
      { platform: 'Skyscanner', price: 285, url: '#', cabinClass: 'Economy' },
      { platform: 'Kayak', price: 298, url: '#', cabinClass: 'Economy' },
      { platform: 'Google Flights', price: 289, url: '#', cabinClass: 'Economy' },
    ],
  },

  // Doha to Bali flights
  {
    id: 'fl-015',
    outbound: [
      {
        departure: 'DOH',
        arrival: 'DPS',
        departureTime: '02:15',
        arrivalTime: '18:45',
        duration: '10h 30m',
        airline: 'Qatar Airways',
        flightNumber: 'QR962',
        aircraft: 'Boeing 787-9 Dreamliner',
      }
    ],
    inbound: [
      {
        departure: 'DPS',
        arrival: 'DOH',
        departureTime: '20:30',
        arrivalTime: '02:45+1',
        duration: '9h 15m',
        airline: 'Qatar Airways',
        flightNumber: 'QR961',
        aircraft: 'Boeing 787-9 Dreamliner',
      }
    ],
    totalDuration: '19h 45m',
    stops: 0,
    airlines: ['Qatar Airways'],
    lowestPrice: 875,
    featured: true,
    discount: 18,
    prices: [
      { platform: 'Skyscanner', price: 875, originalPrice: 1067, url: '#', cabinClass: 'Economy' },
      { platform: 'Kayak', price: 912, originalPrice: 1067, url: '#', cabinClass: 'Economy' },
      { platform: 'Google Flights', price: 889, originalPrice: 1067, url: '#', cabinClass: 'Economy' },
    ],
  },

  // Amsterdam to New York flights
  {
    id: 'fl-016',
    outbound: [
      {
        departure: 'AMS',
        arrival: 'JFK',
        departureTime: '10:30',
        arrivalTime: '13:15',
        duration: '8h 45m',
        airline: 'KLM',
        flightNumber: 'KL641',
        aircraft: 'Boeing 787-10',
      }
    ],
    inbound: [
      {
        departure: 'JFK',
        arrival: 'AMS',
        departureTime: '17:30',
        arrivalTime: '07:15+1',
        duration: '7h 45m',
        airline: 'KLM',
        flightNumber: 'KL642',
        aircraft: 'Boeing 787-10',
      }
    ],
    totalDuration: '16h 30m',
    stops: 0,
    airlines: ['KLM'],
    lowestPrice: 525,
    discount: 28,
    prices: [
      { platform: 'Skyscanner', price: 525, originalPrice: 729, url: '#', cabinClass: 'Economy' },
      { platform: 'Kayak', price: 558, originalPrice: 729, url: '#', cabinClass: 'Economy' },
      { platform: 'Google Flights', price: 535, originalPrice: 729, url: '#', cabinClass: 'Economy' },
    ],
  },

  // Zurich to Rome flights
  {
    id: 'fl-017',
    outbound: [
      {
        departure: 'ZRH',
        arrival: 'FCO',
        departureTime: '07:00',
        arrivalTime: '08:30',
        duration: '1h 30m',
        airline: 'Swiss',
        flightNumber: 'LX1736',
        aircraft: 'Airbus A220-300',
      }
    ],
    inbound: [
      {
        departure: 'FCO',
        arrival: 'ZRH',
        departureTime: '20:45',
        arrivalTime: '22:20',
        duration: '1h 35m',
        airline: 'Swiss',
        flightNumber: 'LX1737',
        aircraft: 'Airbus A220-300',
      }
    ],
    totalDuration: '3h 05m',
    stops: 0,
    airlines: ['Swiss'],
    lowestPrice: 145,
    prices: [
      { platform: 'Skyscanner', price: 145, url: '#', cabinClass: 'Economy' },
      { platform: 'Kayak', price: 162, url: '#', cabinClass: 'Economy' },
      { platform: 'Google Flights', price: 152, url: '#', cabinClass: 'Economy' },
    ],
  },
];

// Helper function to get flights by route
export const getFlightsByRoute = (origin: string, destination: string): Flight[] => {
  return mockFlights.filter(flight => {
    const outboundLeg = flight.outbound[0];
    return outboundLeg.departure.toLowerCase().includes(origin.toLowerCase()) &&
           outboundLeg.arrival.toLowerCase().includes(destination.toLowerCase());
  });
};

// Helper function to get featured flights
export const getFeaturedFlights = (): Flight[] => {
  return mockFlights.filter(flight => flight.featured);
};

// Helper function to get discounted flights
export const getDealsFlights = (): Flight[] => {
  return mockFlights.filter(flight => flight.discount && flight.discount > 0);
};

// Helper function to filter flights by stops
export const getFlightsByStops = (maxStops: number): Flight[] => {
  return mockFlights.filter(flight => flight.stops <= maxStops);
};
