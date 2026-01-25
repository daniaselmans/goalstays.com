import { Star, Heart, MapPin, Check, ExternalLink, Bell } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Hotel } from '@/lib/api/hotels';
import { useFavorites } from '@/hooks/useFavorites';
import { useAuthContext } from '@/contexts/AuthContext';
import PriceAlertDialog from '@/components/PriceAlertDialog';

interface HotelCardProps {
  hotel: Hotel;
  searchParams?: Record<string, unknown>;
}

const HotelCard = ({ hotel, searchParams }: HotelCardProps) => {
  const { user } = useAuthContext();
  const { isFavorite, toggleFavorite } = useFavorites();
  
  const lowestPricePlatform = hotel.prices.reduce((prev, current) =>
    prev.price < current.price ? prev : current
  );

  const isHotelFavorite = isFavorite('hotel', hotel.id);

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    await toggleFavorite('hotel', hotel.id, {
      name: hotel.name,
      location: hotel.location,
      price: hotel.lowestPrice,
      image: hotel.image,
      rating: hotel.rating,
      stars: hotel.stars,
    });
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <div className="relative w-full md:w-80 h-56 md:h-auto shrink-0">
          <img
            src={hotel.image}
            alt={hotel.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent md:bg-gradient-to-r" />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {hotel.featured && (
              <Badge className="hero-gradient text-primary-foreground">Featured</Badge>
            )}
            {hotel.discount && (
              <Badge className="accent-gradient text-accent-foreground font-bold">
                -{hotel.discount}%
              </Badge>
            )}
          </div>

          {/* Favorite */}
          <button 
            onClick={handleFavoriteClick}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-colors ${
              isHotelFavorite 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-background/80 hover:bg-background'
            }`}
          >
            <Heart 
              className={`h-4 w-4 transition-colors ${
                isHotelFavorite ? 'text-white fill-white' : 'text-foreground'
              }`} 
            />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-5 flex flex-col">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                {hotel.stars > 0 && (
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: hotel.stars }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" />
                    ))}
                  </div>
                )}
                {hotel.stars === 0 && (
                  <Badge variant="secondary" className="text-xs">Apartment</Badge>
                )}
              </div>
              <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                {hotel.name}
              </h3>
              <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
                <MapPin className="h-3.5 w-3.5" />
                <span>{hotel.location}</span>
              </div>
            </div>

            {/* Rating */}
            <div className="text-right shrink-0">
              <div className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-primary text-primary-foreground">
                <Star className="h-3.5 w-3.5 fill-current" />
                <span className="font-bold">{hotel.rating}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {hotel.reviews.toLocaleString()} reviews
              </p>
            </div>
          </div>

          {/* Amenities */}
          <div className="flex flex-wrap gap-2 mb-4">
            {hotel.amenities.slice(0, 4).map((amenity) => (
              <span
                key={amenity}
                className="inline-flex items-center gap-1 text-xs text-muted-foreground"
              >
                <Check className="h-3 w-3 text-primary" />
                {amenity}
              </span>
            ))}
            {hotel.amenities.length > 4 && (
              <span className="text-xs text-primary">
                +{hotel.amenities.length - 4} more
              </span>
            )}
          </div>

          {/* Price Comparison */}
          <div className="mt-auto">
            <p className="text-xs text-muted-foreground mb-2">Compare prices:</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {hotel.prices.map((priceInfo) => {
                const isLowest = priceInfo.price === lowestPricePlatform.price;
                const priceUrl = 'url' in priceInfo ? (priceInfo as any).url : undefined;
                return (
                  <a
                    key={priceInfo.platform}
                    href={priceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`relative p-3 rounded-lg border-2 transition-all duration-200 hover:shadow-md cursor-pointer ${
                      isLowest
                        ? 'border-primary bg-primary/5 shadow-glow'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    {isLowest && (
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                        <Badge className="accent-gradient text-[10px] px-1.5 py-0 text-accent-foreground">
                          Best Price
                        </Badge>
                      </div>
                    )}
                    <div
                      className="w-6 h-6 rounded mx-auto mb-1 flex items-center justify-center text-[10px] font-bold text-white"
                      style={{ backgroundColor: priceInfo.color }}
                    >
                      {priceInfo.logo}
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-foreground">${priceInfo.price}</p>
                      {priceInfo.originalPrice && (
                        <p className="text-xs text-muted-foreground line-through">
                          ${priceInfo.originalPrice}
                        </p>
                      )}
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
            <div>
              <p className="text-sm text-muted-foreground">From</p>
              <p className="text-2xl font-bold text-foreground">
                ${hotel.lowestPrice}
                <span className="text-sm font-normal text-muted-foreground"> / night</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <PriceAlertDialog
                searchType="hotel"
                searchParams={searchParams || { hotelId: hotel.id }}
                currentPrice={hotel.lowestPrice}
                itemName={hotel.name}
                trigger={
                  <Button variant="outline" size="icon">
                    <Bell className="h-4 w-4" />
                  </Button>
                }
              />
              <Button variant="hero" size="lg">
                <ExternalLink className="h-4 w-4 mr-2" />
                View Deal
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default HotelCard;
