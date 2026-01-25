import { useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, AlertCircle, RefreshCw, Car } from 'lucide-react';
import { format } from 'date-fns';
import CarSearchHeader from '@/components/search/CarSearchHeader';
import CarFilters from '@/components/search/CarFilters';
import CarCard from '@/components/search/CarCard';
import { Button } from '@/components/ui/button';
import { searchCars, CarResult, CarSearchResponse } from '@/lib/api/cars';
import { useToast } from '@/hooks/use-toast';
import { CarSearchFilters, defaultCarFilters } from '@/types/carFilters';
import { useCarFilters } from '@/hooks/useCarFilters';

const CarSearchResults = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  const [cars, setCars] = useState<CarResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('recommended');
  const [filters, setFilters] = useState<CarSearchFilters>(defaultCarFilters);
  const [searchMeta, setSearchMeta] = useState<{
    pickupLocation: string;
    dropoffLocation: string;
    pickupDate: string;
    dropoffDate: string;
    total: number;
    tripType: 'roundtrip' | 'oneway';
    sources?: { rentalcars: number; kayak: number };
  } | null>(null);

  const handleSearch = useCallback(
    async (params: {
      pickupLocation: string;
      dropoffLocation: string;
      pickupDate: string;
      dropoffDate: string;
      driverAge: number;
      tripType: 'roundtrip' | 'oneway';
    }) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await searchCars({
          pickupLocation: params.pickupLocation,
          dropoffLocation: params.dropoffLocation,
          pickupDate: params.pickupDate,
          dropoffDate: params.dropoffDate,
          driverAge: params.driverAge,
        });

        if (response.success) {
          setCars(response.cars);
          setSearchMeta({
            pickupLocation: params.pickupLocation,
            dropoffLocation: params.dropoffLocation,
            pickupDate: params.pickupDate,
            dropoffDate: params.dropoffDate,
            total: response.meta?.total || response.cars.length,
            tripType: params.tripType,
            sources: response.meta?.sources,
          });

          if (response.cars.length === 0) {
            toast({
              title: 'No cars found',
              description: 'Try adjusting your search criteria or dates.',
            });
          } else {
            toast({
              title: 'Search complete',
              description: `Found ${response.cars.length} vehicles from multiple platforms.`,
            });
          }
        } else {
          setError('Failed to search cars');
          toast({
            title: 'Search failed',
            description: 'Unable to fetch car listings. Please try again.',
            variant: 'destructive',
          });
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'An unexpected error occurred';
        setError(errorMessage);
        toast({
          title: 'Error',
          description: errorMessage,
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    },
    [toast]
  );

  // Apply filters
  const filteredCars = useCarFilters(cars, filters);

  const sortedCars = [...filteredCars].sort((a, b) => {
    if (sortBy === 'price-low') return a.lowestPrice - b.lowestPrice;
    if (sortBy === 'price-high') return b.lowestPrice - a.lowestPrice;
    if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
    return 0; // recommended - keep original order
  });

  const formatDateRange = () => {
    if (!searchMeta) return '';
    try {
      const pickup = new Date(searchMeta.pickupDate);
      const dropoff = new Date(searchMeta.dropoffDate);
      return `${format(pickup, 'MMM d')} - ${format(dropoff, 'MMM d, yyyy')}`;
    } catch {
      return '';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <CarSearchHeader onSearch={handleSearch} isSearching={isLoading} />

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-72 shrink-0">
            <CarFilters filters={filters} onChange={setFilters} />
          </aside>

          {/* Results */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  {searchMeta?.pickupLocation || 'Car Rentals'}
                  {searchMeta?.tripType === 'oneway' && searchMeta?.dropoffLocation && 
                    searchMeta.dropoffLocation !== searchMeta.pickupLocation && (
                    <span className="text-lg font-normal text-muted-foreground">
                      {' → '}{searchMeta.dropoffLocation}
                    </span>
                  )}
                </h1>
                <p className="text-muted-foreground">
                  {isLoading ? (
                    'Searching rental providers...'
                  ) : searchMeta ? (
                    <>
                      {filteredCars.length} of {cars.length} vehicles •{' '}
                      {formatDateRange()}
                      {searchMeta.tripType === 'oneway' && (
                        <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                          One-way
                        </span>
                      )}
                      {searchMeta.sources && (
                        <span className="block text-xs mt-1">
                          Sources: RentalCars ({searchMeta.sources.rentalcars}),
                          Kayak ({searchMeta.sources.kayak})
                        </span>
                      )}
                    </>
                  ) : (
                    'Enter your location and dates to search'
                  )}
                </p>
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-10 px-4 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={cars.length === 0}
              >
                <option value="recommended">Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
              </select>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Searching rental providers...
                </h3>
                <p className="text-muted-foreground text-center max-w-md">
                  We're comparing prices from RentalCars, Kayak, and other
                  providers to find you the best deals.
                </p>
              </div>
            )}

            {/* Error State */}
            {error && !isLoading && (
              <div className="flex flex-col items-center justify-center py-20">
                <AlertCircle className="h-12 w-12 text-destructive mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Something went wrong
                </h3>
                <p className="text-muted-foreground text-center max-w-md mb-4">
                  {error}
                </p>
                <Button
                  onClick={() =>
                    handleSearch({
                      pickupLocation: searchMeta?.pickupLocation || 'New York',
                      dropoffLocation:
                        searchMeta?.dropoffLocation || 'New York',
                      pickupDate:
                        searchMeta?.pickupDate ||
                        format(new Date(), 'yyyy-MM-dd'),
                      dropoffDate:
                        searchMeta?.dropoffDate ||
                        format(
                          new Date(Date.now() + 86400000 * 3),
                          'yyyy-MM-dd'
                        ),
                      driverAge: 30,
                      tripType: searchMeta?.tripType || 'roundtrip',
                    })
                  }
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try Again
                </Button>
              </div>
            )}

            {/* Empty State */}
            {!isLoading && !error && cars.length === 0 && searchMeta && (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Car className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No vehicles found
                </h3>
                <p className="text-muted-foreground text-center max-w-md">
                  We couldn't find any cars matching your criteria. Try
                  adjusting your dates or location.
                </p>
              </div>
            )}

            {/* Initial State */}
            {!isLoading && !error && cars.length === 0 && !searchMeta && (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Car className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Ready to search
                </h3>
                <p className="text-muted-foreground text-center max-w-md">
                  Enter your pick-up location and dates above to find car
                  rentals from RentalCars, Kayak, and other providers.
                </p>
              </div>
            )}

            {/* Car List */}
            <AnimatePresence mode="wait">
              {!isLoading && !error && sortedCars.length > 0 && (
                <motion.div
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {sortedCars.map((car, index) => (
                    <motion.div
                      key={car.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <CarCard car={car} />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CarSearchResults;
