import { useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { format } from 'date-fns';
import SearchHeader from '@/components/search/SearchHeader';
import SearchFilters from '@/components/search/SearchFilters';
import HotelCard from '@/components/search/HotelCard';
import { Button } from '@/components/ui/button';
import { searchHotels, Hotel } from '@/lib/api/hotels';
import { useToast } from '@/hooks/use-toast';
import { SearchFilters as SearchFiltersType, defaultFilters } from '@/types/filters';
import { useHotelFilters } from '@/hooks/useHotelFilters';
import { useSearchHistory } from '@/hooks/useSearchHistory';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const { addSearchHistory } = useSearchHistory();
  
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('recommended');
  const [filters, setFilters] = useState<SearchFiltersType>(defaultFilters);
  const [searchMeta, setSearchMeta] = useState<{
    city: string;
    checkIn: string;
    checkOut: string;
    total: number;
    sources?: { booking: number; hotels: number; airbnb: number; trivago: number };
  } | null>(null);

  const handleSearch = useCallback(async (params: {
    city: string;
    checkIn: string;
    checkOut: string;
    guests: number;
  }) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await searchHotels({
        city: params.city,
        checkIn: params.checkIn,
        checkOut: params.checkOut,
        guests: params.guests,
      });

      if (response.success) {
        setHotels(response.hotels);
        setSearchMeta({
          city: params.city,
          checkIn: params.checkIn,
          checkOut: params.checkOut,
          total: response.meta?.total || response.hotels.length,
          sources: response.meta?.sources,
        });

        // Save search to history
        addSearchHistory('hotel', {
          city: params.city,
          checkIn: params.checkIn,
          checkOut: params.checkOut,
          guests: params.guests,
        });
        
        if (response.hotels.length === 0) {
          toast({
            title: "No results found",
            description: "Try adjusting your search criteria or dates.",
          });
        } else {
          toast({
            title: "Search complete",
            description: `Found ${response.hotels.length} properties from multiple platforms.`,
          });
        }
      } else {
        setError(response.error || 'Failed to search hotels');
        toast({
          title: "Search failed",
          description: response.error || "Unable to fetch hotel listings. Please try again.",
          variant: "destructive",
        });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast, addSearchHistory]);

  // Apply filters
  const filteredHotels = useHotelFilters(hotels, filters);

  const sortedHotels = [...filteredHotels].sort((a, b) => {
    if (sortBy === 'price-low') return a.lowestPrice - b.lowestPrice;
    if (sortBy === 'price-high') return b.lowestPrice - a.lowestPrice;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // recommended - keep original order
  });

  const formatDateRange = () => {
    if (!searchMeta) return '';
    try {
      const checkIn = new Date(searchMeta.checkIn);
      const checkOut = new Date(searchMeta.checkOut);
      return `${format(checkIn, 'MMM d')} - ${format(checkOut, 'MMM d, yyyy')}`;
    } catch {
      return '';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SearchHeader onSearch={handleSearch} isSearching={isLoading} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-72 shrink-0">
            <SearchFilters filters={filters} onChange={setFilters} />
          </aside>

          {/* Results */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  {searchMeta?.city || 'Search Results'}
                </h1>
                <p className="text-muted-foreground">
                  {isLoading ? (
                    'Searching across platforms...'
                  ) : searchMeta ? (
                    <>
                      {filteredHotels.length} of {hotels.length} properties • {formatDateRange()}
                      {searchMeta.sources && (
                        <span className="block text-xs mt-1">
                          Sources: Booking ({searchMeta.sources.booking}), Hotels.com ({searchMeta.sources.hotels}), 
                          Airbnb ({searchMeta.sources.airbnb}), Trivago ({searchMeta.sources.trivago})
                        </span>
                      )}
                    </>
                  ) : (
                    'Enter your destination and dates to search'
                  )}
                </p>
              </div>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-10 px-4 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={hotels.length === 0}
              >
                <option value="recommended">Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Guest Rating</option>
              </select>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Searching across platforms...
                </h3>
                <p className="text-muted-foreground text-center max-w-md">
                  We're comparing prices from Booking.com, Hotels.com, Airbnb, and Trivago to find you the best deals.
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
                <Button onClick={() => handleSearch({
                  city: searchMeta?.city || 'Paris',
                  checkIn: searchMeta?.checkIn || format(new Date(), 'yyyy-MM-dd'),
                  checkOut: searchMeta?.checkOut || format(new Date(Date.now() + 86400000 * 3), 'yyyy-MM-dd'),
                  guests: 2,
                })}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try Again
                </Button>
              </div>
            )}

            {/* Empty State */}
            {!isLoading && !error && hotels.length === 0 && searchMeta && (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
                  <svg className="w-10 h-10 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No properties found
                </h3>
                <p className="text-muted-foreground text-center max-w-md">
                  We couldn't find any accommodations matching your criteria. Try adjusting your dates or destination.
                </p>
              </div>
            )}

            {/* Initial State */}
            {!isLoading && !error && hotels.length === 0 && !searchMeta && (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Ready to search
                </h3>
                <p className="text-muted-foreground text-center max-w-md">
                  Enter your destination, check-in and check-out dates above to find accommodations from Booking.com, Hotels.com, Airbnb, and Trivago.
                </p>
              </div>
            )}

            {/* Hotel List */}
            <AnimatePresence mode="wait">
              {!isLoading && !error && sortedHotels.length > 0 && (
                <motion.div 
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {sortedHotels.map((hotel, index) => (
                    <motion.div
                      key={hotel.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <HotelCard 
                        hotel={hotel} 
                        searchParams={{
                          checkIn: searchMeta?.checkIn,
                          checkOut: searchMeta?.checkOut,
                          hotelId: hotel.id,
                        }}
                      />
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

export default SearchResults;