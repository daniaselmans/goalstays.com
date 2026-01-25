import { useMemo } from 'react';
import { FlightResult } from '@/lib/api/flights';
import { FlightSearchFilters } from '@/types/flightFilters';

export const useFlightFilters = (
  flights: FlightResult[],
  filters: FlightSearchFilters
): FlightResult[] => {
  return useMemo(() => {
    return flights.filter((flight) => {
      // Price filter
      if (flight.lowestPrice > filters.maxPrice) {
        return false;
      }

      // Stops filter
      if (filters.stops.length > 0) {
        const stopsCategory = flight.stops === 0 ? 'direct' : flight.stops === 1 ? '1stop' : '2plus';
        if (!filters.stops.includes(stopsCategory)) {
          return false;
        }
      }

      // Airlines filter
      if (filters.airlines.length > 0) {
        const hasMatchingAirline = flight.airlines.some((a) =>
          filters.airlines.includes(a)
        );
        if (!hasMatchingAirline) {
          return false;
        }
      }

      // Departure time filter (check outbound first leg)
      if (flight.outbound.length > 0) {
        const departureHour = parseInt(flight.outbound[0].departureTime.split(':')[0], 10);
        if (
          departureHour < filters.departureTimeRange[0] ||
          departureHour > filters.departureTimeRange[1]
        ) {
          return false;
        }
      }

      // Duration filter
      const durationMatch = flight.totalDuration.match(/(\d+)h/);
      if (durationMatch) {
        const hours = parseInt(durationMatch[1], 10);
        if (hours > filters.duration) {
          return false;
        }
      }

      return true;
    });
  }, [flights, filters]);
};
