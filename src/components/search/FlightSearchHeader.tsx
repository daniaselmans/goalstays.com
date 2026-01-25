import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, Plane, ArrowLeft, ArrowLeftRight } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import LocationAutocomplete from '@/components/LocationAutocomplete';
import DateRangePicker from '@/components/DateRangePicker';

interface FlightSearchHeaderProps {
  onSearch: (params: {
    origin: string;
    destination: string;
    departDate: string;
    returnDate?: string;
    passengers: number;
    tripType: 'roundtrip' | 'oneway';
  }) => void;
  isSearching: boolean;
}

const FlightSearchHeader = ({ onSearch, isSearching }: FlightSearchHeaderProps) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [tripType, setTripType] = useState<'roundtrip' | 'oneway'>(
    (searchParams.get('tripType') as 'roundtrip' | 'oneway') || 'roundtrip'
  );
  const [origin, setOrigin] = useState(searchParams.get('origin') || '');
  const [destination, setDestination] = useState(searchParams.get('destination') || '');
  const [departDate, setDepartDate] = useState<Date | undefined>(
    searchParams.get('departDate') ? new Date(searchParams.get('departDate')!) : undefined
  );
  const [returnDate, setReturnDate] = useState<Date | undefined>(
    searchParams.get('returnDate') ? new Date(searchParams.get('returnDate')!) : undefined
  );
  const [passengers, setPassengers] = useState(
    searchParams.get('passengers') ? parseInt(searchParams.get('passengers')!) : 1
  );

  useEffect(() => {
    if (origin && destination && !departDate) {
      setDepartDate(new Date(Date.now() + 7 * 86400000));
      if (tripType === 'roundtrip') {
        setReturnDate(new Date(Date.now() + 14 * 86400000));
      }
    }
  }, []);

  const handleSearch = () => {
    if (!origin || !destination) return;

    const depart = departDate || new Date(Date.now() + 7 * 86400000);

    onSearch({
      origin,
      destination,
      departDate: format(depart, 'yyyy-MM-dd'),
      returnDate: tripType === 'roundtrip' && returnDate 
        ? format(returnDate, 'yyyy-MM-dd') 
        : undefined,
      passengers,
      tripType,
    });
  };

  const swapLocations = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
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
              <Plane className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold text-foreground">Flights</h1>
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
              <Plane className="h-4 w-4" />
              <span className="hidden sm:inline">One-way</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
          <div className="relative">
            <label className="text-xs font-medium text-muted-foreground mb-1 block">
              From
            </label>
            <LocationAutocomplete
              value={origin}
              onChange={setOrigin}
              placeholder="Origin airport"
              type="airport"
            />
          </div>

          <div className="flex items-end justify-center md:col-span-1">
            <Button
              variant="outline"
              size="icon"
              onClick={swapLocations}
              className="mb-0.5"
            >
              <ArrowLeftRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="relative">
            <label className="text-xs font-medium text-muted-foreground mb-1 block">
              To
            </label>
            <LocationAutocomplete
              value={destination}
              onChange={setDestination}
              placeholder="Destination airport"
              type="airport"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-xs font-medium text-muted-foreground mb-1 block">
              {tripType === 'roundtrip' ? 'Dates' : 'Departure Date'}
            </label>
            <DateRangePicker
              checkIn={departDate}
              checkOut={tripType === 'roundtrip' ? returnDate : undefined}
              onCheckInChange={setDepartDate}
              onCheckOutChange={tripType === 'roundtrip' ? setReturnDate : undefined}
            />
          </div>

          <div className="flex items-end">
            <Button
              onClick={handleSearch}
              disabled={!origin || !destination || isSearching}
              className="w-full h-12"
            >
              {isSearching ? (
                <span className="animate-pulse">Searching...</span>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Passengers selector */}
        <div className="flex items-center gap-4 mt-3">
          <label className="text-sm text-muted-foreground">Passengers:</label>
          <select
            value={passengers}
            onChange={(e) => setPassengers(parseInt(e.target.value))}
            className="h-9 px-3 rounded-lg border border-input bg-background text-sm"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <option key={num} value={num}>
                {num} {num === 1 ? 'passenger' : 'passengers'}
              </option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
};

export default FlightSearchHeader;
