import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star } from 'lucide-react';

const SearchFilters = () => {
  const [priceRange, setPriceRange] = useState([0, 500]);

  const amenities = [
    'Free WiFi',
    'Pool',
    'Spa',
    'Restaurant',
    'Gym',
    'Parking',
    'Pet Friendly',
    'Kitchen',
  ];

  const platforms = [
    { name: 'Booking.com', color: '#003580' },
    { name: 'Hotels.com', color: '#d32f2f' },
    { name: 'Airbnb', color: '#FF5A5F' },
    { name: 'Trivago', color: '#007faf' },
  ];

  return (
    <div className="space-y-6">
      {/* Price Range */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Price per night</CardTitle>
        </CardHeader>
        <CardContent>
          <Slider
            defaultValue={[0, 500]}
            max={1000}
            step={10}
            value={priceRange}
            onValueChange={setPriceRange}
            className="mb-4"
          />
          <div className="flex items-center justify-between text-sm">
            <span className="text-foreground font-medium">${priceRange[0]}</span>
            <span className="text-foreground font-medium">${priceRange[1]}+</span>
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
              <Checkbox id={`stars-${stars}`} />
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
          {platforms.map((platform) => (
            <label key={platform.name} className="flex items-center gap-3 cursor-pointer group">
              <Checkbox id={platform.name} defaultChecked />
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
          {amenities.map((amenity) => (
            <label key={amenity} className="flex items-center gap-3 cursor-pointer group">
              <Checkbox id={amenity} />
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
