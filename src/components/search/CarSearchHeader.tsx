import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, Car, ArrowLeft, ArrowLeftRight, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import LocationAutocomplete from '@/components/LocationAutocomplete';
import DateRangePicker from '@/components/DateRangePicker';

interface CarSearchHeaderProps {
  onSearch: (params: {
    pickupLocation: string;
    dropoffLocation: string;
    pickupDate: string;
    dropoffDate: string;
    driverAge: number;
    tripType: 'roundtrip' | 'oneway';
  }) => void;
  isSearching: boolean;
}

const CarSearchHeader = ({ onSearch, isSearching }: CarSearchHeaderProps) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [tripType, setTripType] = useState<'roundtrip' | 'oneway'>(
    (searchParams.get('tripType') as 'roundtrip' | 'oneway') || 'roundtrip'
  );
  const [pickupLocation, setPickupLocation] = useState(
    searchParams.get('pickup') || ''
  );
  const [dropoffLocation, setDropoffLocation] = useState(
    searchParams.get('dropoff') || ''
  );
  const [pickupDate, setPickupDate] = useState<Date | undefined>(
    searchParams.get('pickupDate')
      ? new Date(searchParams.get('pickupDate')!)
      : undefined
  );
  const [dropoffDate, setDropoffDate] = useState<Date | undefined>(
    searchParams.get('dropoffDate')
      ? new Date(searchParams.get('dropoffDate')!)
      : undefined
  );
  const [driverAge] = useState(
    searchParams.get('age') ? parseInt(searchParams.get('age')!) : 30
  );

  useEffect(() => {
    // Auto-search if we have location from URL params
    if (pickupLocation && !pickupDate) {
      setPickupDate(new Date());
      setDropoffDate(new Date(Date.now() + 3 * 86400000));
    }
  }, []);

  // When switching to round-trip, clear different drop-off
  useEffect(() => {
    if (tripType === 'roundtrip') {
      setDropoffLocation('');
    }
  }, [tripType]);

  const handleSearch = () => {
    if (!pickupLocation) return;

    const pickup = pickupDate || new Date();
    const dropoff = dropoffDate || new Date(Date.now() + 3 * 86400000);
    const finalDropoff = tripType === 'oneway' ? dropoffLocation : pickupLocation;

    onSearch({
      pickupLocation,
      dropoffLocation: finalDropoff || pickupLocation,
      pickupDate: format(pickup, 'yyyy-MM-dd'),
      dropoffDate: format(dropoff, 'yyyy-MM-dd'),
      driverAge,
      tripType,
    });
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <Car className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold text-foreground">Car Rentals</h1>
            </div>
          </div>

          {/* Trip Type Toggle */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setTripType('roundtrip')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                tripType === 'roundtrip'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              <ArrowLeftRight className="h-4 w-4" />
              <span className="hidden sm:inline">Round-trip</span>
            </button>
            <button
              type="button"
              onClick={() => setTripType('oneway')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                tripType === 'oneway'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              <ArrowRight className="h-4 w-4" />
              <span className="hidden sm:inline">One-way</span>
            </button>
          </div>
        </div>

        <div className={`grid grid-cols-1 gap-3 ${tripType === 'oneway' ? 'md:grid-cols-5' : 'md:grid-cols-4'}`}>
          <div className="relative">
            <label className="text-xs font-medium text-muted-foreground mb-1 block">
              Pick-up Location
            </label>
            <LocationAutocomplete
              value={pickupLocation}
              onChange={setPickupLocation}
              placeholder="City or airport"
              type="both"
            />
          </div>

          {tripType === 'oneway' && (
            <div className="relative">
              <label className="text-xs font-medium text-muted-foreground mb-1 block">
                Drop-off Location
              </label>
              <LocationAutocomplete
                value={dropoffLocation}
                onChange={setDropoffLocation}
                placeholder="Different location"
                type="both"
              />
            </div>
          )}

          <div className="md:col-span-2">
            <label className="text-xs font-medium text-muted-foreground mb-1 block">
              Dates
            </label>
            <DateRangePicker
              checkIn={pickupDate}
              checkOut={dropoffDate}
              onCheckInChange={setPickupDate}
              onCheckOutChange={setDropoffDate}
            />
          </div>

          <div className="flex items-end">
            <Button
              onClick={handleSearch}
              disabled={!pickupLocation || (tripType === 'oneway' && !dropoffLocation) || isSearching}
              className="w-full h-12"
            >
              {isSearching ? (
                <span className="animate-pulse">Searching...</span>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Search Cars
                </>
              )}
            </Button>
          </div>
        </div>

        {tripType === 'oneway' && (
          <p className="text-xs text-muted-foreground mt-2">
            One-way rentals may have additional fees depending on drop-off location.
          </p>
        )}
      </div>
    </header>
  );
};

export default CarSearchHeader;
