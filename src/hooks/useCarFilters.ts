import { useMemo } from 'react';
import { CarResult } from '@/lib/api/cars';
import { CarSearchFilters } from '@/types/carFilters';

export const useCarFilters = (cars: CarResult[], filters: CarSearchFilters): CarResult[] => {
  return useMemo(() => {
    return cars.filter((car) => {
      // Price filter
      if (car.lowestPrice < filters.priceRange[0] || car.lowestPrice > filters.priceRange[1]) {
        return false;
      }

      // Vehicle type filter
      if (filters.vehicleTypes.length > 0 && !filters.vehicleTypes.includes(car.category)) {
        return false;
      }

      // Transmission filter
      if (filters.transmissions.length > 0 && !filters.transmissions.includes(car.transmission)) {
        return false;
      }

      // Fuel type filter
      if (filters.fuelTypes.length > 0 && !filters.fuelTypes.includes(car.fuelType)) {
        return false;
      }

      // Features filter
      if (filters.features.length > 0) {
        const hasAllFeatures = filters.features.every((feature) =>
          car.features.includes(feature)
        );
        if (!hasAllFeatures) return false;
      }

      return true;
    });
  }, [cars, filters]);
};
