import { Car } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  CarSearchFilters,
  VEHICLE_TYPES,
  TRANSMISSION_TYPES,
  FUEL_TYPES,
  CAR_FEATURES,
} from '@/types/carFilters';

interface CarFiltersProps {
  filters: CarSearchFilters;
  onChange: (filters: CarSearchFilters) => void;
}

const CarFilters = ({ filters, onChange }: CarFiltersProps) => {
  const handlePriceChange = (value: number[]) => {
    onChange({ ...filters, priceRange: [value[0], value[1]] });
  };

  const toggleVehicleType = (type: string) => {
    const updated = filters.vehicleTypes.includes(type)
      ? filters.vehicleTypes.filter((t) => t !== type)
      : [...filters.vehicleTypes, type];
    onChange({ ...filters, vehicleTypes: updated });
  };

  const toggleTransmission = (transmission: string) => {
    const updated = filters.transmissions.includes(transmission)
      ? filters.transmissions.filter((t) => t !== transmission)
      : [...filters.transmissions, transmission];
    onChange({ ...filters, transmissions: updated });
  };

  const toggleFuelType = (fuel: string) => {
    const updated = filters.fuelTypes.includes(fuel)
      ? filters.fuelTypes.filter((f) => f !== fuel)
      : [...filters.fuelTypes, fuel];
    onChange({ ...filters, fuelTypes: updated });
  };

  const toggleFeature = (feature: string) => {
    const updated = filters.features.includes(feature)
      ? filters.features.filter((f) => f !== feature)
      : [...filters.features, feature];
    onChange({ ...filters, features: updated });
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 space-y-6">
      <div className="flex items-center gap-2">
        <Car className="h-5 w-5 text-primary" />
        <h3 className="font-semibold text-foreground">Filters</h3>
      </div>

      {/* Price Range */}
      <div className="space-y-4">
        <h4 className="font-medium text-sm text-foreground">Price per Day</h4>
        <Slider
          value={[filters.priceRange[0], filters.priceRange[1]]}
          onValueChange={handlePriceChange}
          max={500}
          min={0}
          step={10}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>${filters.priceRange[0]}</span>
          <span>${filters.priceRange[1]}+</span>
        </div>
      </div>

      {/* Vehicle Type */}
      <div className="space-y-3">
        <h4 className="font-medium text-sm text-foreground">Vehicle Type</h4>
        <div className="grid grid-cols-2 gap-2">
          {VEHICLE_TYPES.map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={`vehicle-${type}`}
                checked={filters.vehicleTypes.includes(type)}
                onCheckedChange={() => toggleVehicleType(type)}
              />
              <Label
                htmlFor={`vehicle-${type}`}
                className="text-sm text-foreground cursor-pointer"
              >
                {type}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Transmission */}
      <div className="space-y-3">
        <h4 className="font-medium text-sm text-foreground">Transmission</h4>
        <div className="space-y-2">
          {TRANSMISSION_TYPES.map((type) => (
            <div key={type.value} className="flex items-center space-x-2">
              <Checkbox
                id={`transmission-${type.value}`}
                checked={filters.transmissions.includes(type.value)}
                onCheckedChange={() => toggleTransmission(type.value)}
              />
              <Label
                htmlFor={`transmission-${type.value}`}
                className="text-sm text-foreground cursor-pointer"
              >
                {type.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Fuel Type */}
      <div className="space-y-3">
        <h4 className="font-medium text-sm text-foreground">Fuel Type</h4>
        <div className="grid grid-cols-2 gap-2">
          {FUEL_TYPES.map((fuel) => (
            <div key={fuel} className="flex items-center space-x-2">
              <Checkbox
                id={`fuel-${fuel}`}
                checked={filters.fuelTypes.includes(fuel)}
                onCheckedChange={() => toggleFuelType(fuel)}
              />
              <Label
                htmlFor={`fuel-${fuel}`}
                className="text-sm text-foreground cursor-pointer"
              >
                {fuel}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="space-y-3">
        <h4 className="font-medium text-sm text-foreground">Features</h4>
        <div className="space-y-2">
          {CAR_FEATURES.map((feature) => (
            <div key={feature} className="flex items-center space-x-2">
              <Checkbox
                id={`feature-${feature}`}
                checked={filters.features.includes(feature)}
                onCheckedChange={() => toggleFeature(feature)}
              />
              <Label
                htmlFor={`feature-${feature}`}
                className="text-sm text-foreground cursor-pointer"
              >
                {feature}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Reset Filters */}
      <button
        onClick={() =>
          onChange({
            priceRange: [0, 500],
            vehicleTypes: [],
            transmissions: [],
            fuelTypes: [],
            features: [],
          })
        }
        className="w-full text-sm text-primary hover:underline"
      >
        Reset all filters
      </button>
    </div>
  );
};

export default CarFilters;
