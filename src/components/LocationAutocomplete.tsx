import { useState, useRef, useEffect } from 'react';
import { MapPin, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { airports, Airport } from '@/data/airports';
import { cities, City } from '@/data/cities';

interface LocationAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'airport' | 'city' | 'both';
  className?: string;
}

type LocationItem = (Airport | City) & { type: 'airport' | 'city' };

const LocationAutocomplete = ({
  value,
  onChange,
  placeholder = 'Enter location',
  type = 'both',
  className,
}: LocationAutocompleteProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [filteredLocations, setFilteredLocations] = useState<LocationItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setInputValue(query);
    setIsOpen(true);

    if (query.length < 2) {
      // Show popular locations when query is short
      const popularAirports = type !== 'city' 
        ? airports.filter(a => a.popular).slice(0, 5).map(a => ({ ...a, type: 'airport' as const }))
        : [];
      const popularCities = type !== 'airport'
        ? cities.filter(c => c.popular).slice(0, 5).map(c => ({ ...c, type: 'city' as const }))
        : [];
      setFilteredLocations([...popularAirports, ...popularCities]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    
    const matchedAirports = type !== 'city'
      ? airports
          .filter(
            a =>
              a.code.toLowerCase().includes(lowerQuery) ||
              a.name.toLowerCase().includes(lowerQuery) ||
              a.city.toLowerCase().includes(lowerQuery)
          )
          .slice(0, 8)
          .map(a => ({ ...a, type: 'airport' as const }))
      : [];

    const matchedCities = type !== 'airport'
      ? cities
          .filter(
            c =>
              c.name.toLowerCase().includes(lowerQuery) ||
              c.country.toLowerCase().includes(lowerQuery)
          )
          .slice(0, 8)
          .map(c => ({ ...c, type: 'city' as const }))
      : [];

    setFilteredLocations([...matchedAirports, ...matchedCities]);
  };

  const handleSelect = (location: LocationItem) => {
    const displayValue = location.type === 'airport'
      ? `${(location as Airport).city} (${(location as Airport).code})`
      : `${(location as City).name}, ${(location as City).country}`;
    
    setInputValue(displayValue);
    onChange(displayValue);
    setIsOpen(false);
  };

  const handleClear = () => {
    setInputValue('');
    onChange('');
    inputRef.current?.focus();
  };

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => {
            setIsOpen(true);
            if (inputValue.length < 2) {
              const popularAirports = type !== 'city'
                ? airports.filter(a => a.popular).slice(0, 5).map(a => ({ ...a, type: 'airport' as const }))
                : [];
              const popularCities = type !== 'airport'
                ? cities.filter(c => c.popular).slice(0, 5).map(c => ({ ...c, type: 'city' as const }))
                : [];
              setFilteredLocations([...popularAirports, ...popularCities]);
            }
          }}
          placeholder={placeholder}
          className="w-full h-12 pl-11 pr-10 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {inputValue && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {isOpen && filteredLocations.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-popover border border-border rounded-lg shadow-lg max-h-64 overflow-y-auto">
          {filteredLocations.map((location, index) => (
            <button
              key={`${location.type}-${index}`}
              onClick={() => handleSelect(location)}
              className="w-full px-4 py-3 text-left hover:bg-accent/50 transition-colors flex items-start gap-3 border-b border-border/50 last:border-0"
            >
              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div className="min-w-0">
                {location.type === 'airport' ? (
                  <>
                    <div className="font-medium text-foreground">
                      {(location as Airport).city} ({(location as Airport).code})
                    </div>
                    <div className="text-sm text-muted-foreground truncate">
                      {(location as Airport).name}, {(location as Airport).country}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="font-medium text-foreground">
                      {(location as City).name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {(location as City).region ? `${(location as City).region}, ` : ''}{(location as City).country}
                    </div>
                  </>
                )}
              </div>
              <span className={cn(
                "text-xs px-2 py-0.5 rounded-full ml-auto flex-shrink-0",
                location.type === 'airport' 
                  ? "bg-primary/10 text-primary" 
                  : "bg-accent text-accent-foreground"
              )}>
                {location.type === 'airport' ? 'Airport' : 'City'}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationAutocomplete;
