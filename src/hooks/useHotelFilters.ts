import { useMemo } from 'react';
import { Hotel } from '@/lib/api/hotels';
import { SearchFilters } from '@/types/filters';

export function useHotelFilters(hotels: Hotel[], filters: SearchFilters) {
  return useMemo(() => {
    return hotels.filter((hotel) => {
      // Price filter
      if (hotel.lowestPrice < filters.priceRange[0] || hotel.lowestPrice > filters.priceRange[1]) {
        return false;
      }

      // Star rating filter (if any selected, hotel must meet minimum)
      if (filters.starRatings.length > 0) {
        const minStars = Math.min(...filters.starRatings);
        if (hotel.stars < minStars) {
          return false;
        }
      }

      // Platform filter - hotel must have at least one price from selected platforms
      if (filters.platforms.length > 0) {
        const hasSelectedPlatform = hotel.prices.some((price) =>
          filters.platforms.includes(price.platform)
        );
        if (!hasSelectedPlatform) {
          return false;
        }
      }

      // Amenities filter - hotel must have all selected amenities
      if (filters.amenities.length > 0) {
        const hotelAmenities = hotel.amenities.map((a) => a.toLowerCase());
        const hasAllAmenities = filters.amenities.every((amenity) =>
          hotelAmenities.some((ha) => ha.includes(amenity.toLowerCase()))
        );
        if (!hasAllAmenities) {
          return false;
        }
      }

      return true;
    });
  }, [hotels, filters]);
}
