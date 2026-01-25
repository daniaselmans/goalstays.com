import { useState, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, AlertCircle, RefreshCw, Plane } from 'lucide-react';
import { format } from 'date-fns';
import FlightSearchHeader from '@/components/search/FlightSearchHeader';
import FlightFilters from '@/components/search/FlightFilters';
import FlightCard from '@/components/search/FlightCard';
import { Button } from '@/components/ui/button';
import { searchFlights, FlightResult } from '@/lib/api/flights';
import { useToast } from '@/hooks/use-toast';
import { FlightSearchFilters, defaultFlightFilters } from '@/types/flightFilters';
import { useFlightFilters } from '@/hooks/useFlightFilters';

const FlightSearchResults = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  const [flights, setFlights] = useState<FlightResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('price');
  const [filters, setFilters] = useState<FlightSearchFilters>(defaultFlightFilters);
  const [searchMeta, setSearchMeta] = useState<{
    origin: string;
    destination: string;
    departDate: string;
    returnDate?: string;
    passengers: number;
    tripType: 'roundtrip' | 'oneway';
    total: number;
  } | null>(null);

  // Get unique airlines from results
  const availableAirlines = useMemo(() => {
    const airlines = new Set<string>();
    flights.forEach((f) => f.airlines.forEach((a) => airlines.add(a)));
    return Array.from(airlines).sort();
  }, [flights]);

  const handleSearch = useCallback(
    async (params: {
      origin: string;
      destination: string;
      departDate: string;
      returnDate?: string;
      passengers: number;
      tripType: 'roundtrip' | 'oneway';
    }) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await searchFlights({
          origin: params.origin,
          destination: params.destination,
          departDate: params.departDate,
          returnDate: params.returnDate,
          passengers: params.passengers,
        });

        if (response.success) {
          setFlights(response.flights);
          setSearchMeta({
            origin: params.origin,
            destination: params.destination,
            departDate: params.departDate,
            returnDate: params.returnDate,
            passengers: params.passengers,
            tripType: params.tripType,
            total: response.meta?.total || response.flights.length,
          });

          if (response.flights.length === 0) {
            toast({
              title: 'No flights found',
              description: 'Try adjusting your search criteria or dates.',
            });
          } else {
            toast({
              title: 'Search complete',
              description: `Found ${response.flights.length} flights from multiple platforms.`,
            });
          }
        } else {
          setError('Failed to search flights');
          toast({
            title: 'Search failed',
            description: 'Unable to fetch flight listings. Please try again.',
            variant: 'destructive',
          });
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
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
  const filteredFlights = useFlightFilters(flights, filters);

  const sortedFlights = [...filteredFlights].sort((a, b) => {
    if (sortBy === 'price') return a.lowestPrice - b.lowestPrice;
    if (sortBy === 'duration') {
      const aDuration = parseInt(a.totalDuration.match(/(\d+)h/)?.[1] || '0');
      const bDuration = parseInt(b.totalDuration.match(/(\d+)h/)?.[1] || '0');
      return aDuration - bDuration;
    }
    if (sortBy === 'departure') {
      const aTime = a.outbound[0]?.departureTime || '00:00';
      const bTime = b.outbound[0]?.departureTime || '00:00';
      return aTime.localeCompare(bTime);
    }
    if (sortBy === 'stops') return a.stops - b.stops;
    return 0;
  });

  const formatDateRange = () => {
    if (!searchMeta) return '';
    try {
      const depart = new Date(searchMeta.departDate);
      if (searchMeta.returnDate) {
        const ret = new Date(searchMeta.returnDate);
        return `${format(depart, 'MMM d')} - ${format(ret, 'MMM d, yyyy')}`;
      }
      return format(depart, 'MMM d, yyyy');
    } catch {
      return '';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <FlightSearchHeader onSearch={handleSearch} isSearching={isLoading} />

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-72 shrink-0">
            <FlightFilters 
              filters={filters} 
              onChange={setFilters} 
              availableAirlines={availableAirlines}
            />
          </aside>

          {/* Results */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  {searchMeta ? `${searchMeta.origin} → ${searchMeta.destination}` : 'Flight Search'}
                </h1>
                <p className="text-muted-foreground">
                  {isLoading ? (
                    'Searching airlines...'
                  ) : searchMeta ? (
                    <>
                      {filteredFlights.length} of {flights.length} flights •{' '}
                      {formatDateRange()} • {searchMeta.passengers} passenger{searchMeta.passengers > 1 ? 's' : ''}
                      {searchMeta.tripType === 'oneway' && (
                        <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                          One-way
                        </span>
                      )}
                    </>
                  ) : (
                    'Enter your route and dates to search'
                  )}
                </p>
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-10 px-4 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={flights.length === 0}
              >
                <option value="price">Price: Low to High</option>
                <option value="duration">Duration: Shortest</option>
                <option value="departure">Departure: Earliest</option>
                <option value="stops">Stops: Fewest</option>
              </select>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Searching flights...
                </h3>
                <p className="text-muted-foreground text-center max-w-md">
                  We're comparing prices from Skyscanner, Kayak, Google Flights, and more.
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
                      origin: searchMeta?.origin || 'JFK',
                      destination: searchMeta?.destination || 'LAX',
                      departDate: searchMeta?.departDate || format(new Date(Date.now() + 7 * 86400000), 'yyyy-MM-dd'),
                      returnDate: searchMeta?.returnDate,
                      passengers: searchMeta?.passengers || 1,
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
            {!isLoading && !error && flights.length === 0 && searchMeta && (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Plane className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No flights found
                </h3>
                <p className="text-muted-foreground text-center max-w-md">
                  We couldn't find any flights matching your criteria. Try adjusting your dates or destinations.
                </p>
              </div>
            )}

            {/* Initial State */}
            {!isLoading && !error && flights.length === 0 && !searchMeta && (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Plane className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Ready to search
                </h3>
                <p className="text-muted-foreground text-center max-w-md">
                  Enter your origin, destination, and dates above to find flights from Skyscanner, Kayak, and other providers.
                </p>
              </div>
            )}

            {/* Flight List */}
            <AnimatePresence mode="wait">
              {!isLoading && !error && sortedFlights.length > 0 && (
                <motion.div
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {sortedFlights.map((flight, index) => (
                    <motion.div
                      key={flight.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <FlightCard flight={flight} />
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

export default FlightSearchResults;
