import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FlightSearchFilters, defaultFlightFilters } from '@/types/flightFilters';
import { Clock, DollarSign, Plane, Building2 } from 'lucide-react';

interface FlightFiltersProps {
  filters: FlightSearchFilters;
  onChange: (filters: FlightSearchFilters) => void;
  availableAirlines?: string[];
}

const FlightFilters = ({ filters, onChange, availableAirlines = [] }: FlightFiltersProps) => {
  const stopOptions: { value: 'direct' | '1stop' | '2plus'; label: string }[] = [
    { value: 'direct', label: 'Direct only' },
    { value: '1stop', label: '1 stop' },
    { value: '2plus', label: '2+ stops' },
  ];

  const timeLabels = ['12am', '6am', '12pm', '6pm', '12am'];

  const handleStopToggle = (stop: 'direct' | '1stop' | '2plus') => {
    const newStops = filters.stops.includes(stop)
      ? filters.stops.filter((s) => s !== stop)
      : [...filters.stops, stop];
    onChange({ ...filters, stops: newStops });
  };

  const handleAirlineToggle = (airline: string) => {
    const newAirlines = filters.airlines.includes(airline)
      ? filters.airlines.filter((a) => a !== airline)
      : [...filters.airlines, airline];
    onChange({ ...filters, airlines: newAirlines });
  };

  const handleReset = () => {
    onChange(defaultFlightFilters);
  };

  const formatTime = (hour: number) => {
    if (hour === 0 || hour === 24) return '12am';
    if (hour === 12) return '12pm';
    return hour < 12 ? `${hour}am` : `${hour - 12}pm`;
  };

  return (
    <Card className="sticky top-24">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Filters</CardTitle>
          <Button variant="ghost" size="sm" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Price Filter */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <Label className="font-medium">Max Price</Label>
          </div>
          <Slider
            value={[filters.maxPrice]}
            onValueChange={([value]) => onChange({ ...filters, maxPrice: value })}
            max={2000}
            min={50}
            step={50}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>$50</span>
            <span className="font-medium text-foreground">${filters.maxPrice}</span>
          </div>
        </div>

        {/* Stops Filter */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Plane className="h-4 w-4 text-muted-foreground" />
            <Label className="font-medium">Stops</Label>
          </div>
          <div className="space-y-2">
            {stopOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`stop-${option.value}`}
                  checked={filters.stops.includes(option.value)}
                  onCheckedChange={() => handleStopToggle(option.value)}
                />
                <Label
                  htmlFor={`stop-${option.value}`}
                  className="text-sm cursor-pointer"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Departure Time Filter */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <Label className="font-medium">Departure Time</Label>
          </div>
          <Slider
            value={filters.departureTimeRange}
            onValueChange={(value) =>
              onChange({ ...filters, departureTimeRange: value as [number, number] })
            }
            max={24}
            min={0}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{formatTime(filters.departureTimeRange[0])}</span>
            <span>{formatTime(filters.departureTimeRange[1])}</span>
          </div>
        </div>

        {/* Duration Filter */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <Label className="font-medium">Max Duration</Label>
          </div>
          <Slider
            value={[filters.duration]}
            onValueChange={([value]) => onChange({ ...filters, duration: value })}
            max={24}
            min={1}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>1h</span>
            <span className="font-medium text-foreground">{filters.duration}h</span>
          </div>
        </div>

        {/* Airlines Filter */}
        {availableAirlines.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <Label className="font-medium">Airlines</Label>
            </div>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {availableAirlines.map((airline) => (
                <div key={airline} className="flex items-center space-x-2">
                  <Checkbox
                    id={`airline-${airline}`}
                    checked={filters.airlines.includes(airline)}
                    onCheckedChange={() => handleAirlineToggle(airline)}
                  />
                  <Label
                    htmlFor={`airline-${airline}`}
                    className="text-sm cursor-pointer"
                  >
                    {airline}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FlightFilters;
