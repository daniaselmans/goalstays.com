export interface FlightSearchFilters {
  maxPrice: number;
  stops: ('direct' | '1stop' | '2plus')[];
  airlines: string[];
  departureTimeRange: [number, number]; // Hours 0-24
  arrivalTimeRange: [number, number];
  duration: number; // Max hours
}

export const defaultFlightFilters: FlightSearchFilters = {
  maxPrice: 2000,
  stops: [],
  airlines: [],
  departureTimeRange: [0, 24],
  arrivalTimeRange: [0, 24],
  duration: 24,
};
