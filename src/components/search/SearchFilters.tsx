import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { SearchFilters as SearchFiltersType, AMENITIES_LIST, PLATFORMS_LIST } from '@/types/filters';

interface SearchFiltersProps {
  filters: SearchFiltersType;
  onChange: (filters: SearchFiltersType) => void;
}

const SearchFilters = ({ filters, onChange }: SearchFiltersProps) => {
  const handlePriceChange = (value: number[]) => {
    onChange({ ...filters, priceRange: [value[0], value[1]] });
  };

  const handleStarToggle = (stars: number) => {
    const newStars = filters.starRatings.includes(stars)
      ? filters.starRatings.filter((s) => s !== stars)
      : [...filters.starRatings, stars];
    onChange({ ...filters, starRatings: newStars });
  };

  const handlePlatformToggle = (platform: string) => {
    const newPlatforms = filters.platforms.includes(platform)
      ? filters.platforms.filter((p) => p !== platform)
      : [...filters.platforms, platform];
    onChange({ ...filters, platforms: newPlatforms });
  };

  const handleAmenityToggle = (amenity: string) => {
    const newAmenities = filters.amenities.includes(amenity)
      ? filters.amenities.filter((a) => a !== amenity)
      : [...filters.amenities, amenity];
    onChange({ ...filters, amenities: newAmenities });
  };

  return (
    <div className="space-y-6">
      {/* Price Range */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Price per night</CardTitle>
        </CardHeader>
        <CardContent>
          <Slider
            max={1000}
            step={10}
            value={filters.priceRange}
            onValueChange={handlePriceChange}
            className="mb-4"
          />
          <div className="flex items-center justify-between text-sm">
            <span className="text-foreground font-medium">${filters.priceRange[0]}</span>
            <span className="text-foreground font-medium">${filters.priceRange[1]}+</span>
          </div>
        </CardContent>
      </Card>

      {/* Star Rating */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Star Rating</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[5, 4, 3, 2].map((stars) => (
            <label key={stars} className="flex items-center gap-3 cursor-pointer group">
              <Checkbox
                id={`stars-${stars}`}
                checked={filters.starRatings.includes(stars)}
                onCheckedChange={() => handleStarToggle(stars)}
              />
              <div className="flex items-center gap-1">
                {Array.from({ length: stars }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
                {Array.from({ length: 5 - stars }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-muted-foreground/30" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                & up
              </span>
            </label>
          ))}
        </CardContent>
      </Card>

      {/* Platforms */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Platforms</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {PLATFORMS_LIST.map((platform) => (
            <label key={platform.name} className="flex items-center gap-3 cursor-pointer group">
              <Checkbox
                id={platform.name}
                checked={filters.platforms.includes(platform.name)}
                onCheckedChange={() => handlePlatformToggle(platform.name)}
              />
              <div
                className="w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold text-white"
                style={{ backgroundColor: platform.color }}
              >
                {platform.name[0]}
              </div>
              <span className="text-sm text-foreground">{platform.name}</span>
            </label>
          ))}
        </CardContent>
      </Card>

      {/* Amenities */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Amenities</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {AMENITIES_LIST.map((amenity) => (
            <label key={amenity} className="flex items-center gap-3 cursor-pointer group">
              <Checkbox
                id={amenity}
                checked={filters.amenities.includes(amenity)}
                onCheckedChange={() => handleAmenityToggle(amenity)}
              />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                {amenity}
              </span>
            </label>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default SearchFilters;
