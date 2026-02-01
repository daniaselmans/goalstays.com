import { Star, Heart, MapPin, Check, ExternalLink, Bell, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Hotel } from '@/lib/api/hotels';
import { useFavorites } from '@/hooks/useFavorites';
import { useAuthContext } from '@/contexts/AuthContext';
import PriceAlertDialog from '@/components/PriceAlertDialog';

interface HotelCardProps {
  hotel: Hotel;
  searchParams?: {
    checkIn?: string;
    checkOut?: string;
    guests?: number;
    [key: string]: unknown;
  };
}

// Calculate number of nights between two dates
const calculateNights = (checkIn?: string, checkOut?: string): number => {
  if (!checkIn || !checkOut) return 1;
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays || 1;
};

// Generate affiliate tracking URL
const generateAffiliateUrl = (platform: string, originalUrl: string, hotelId: string): string => {
  const affiliateParams = {
    'Booking.com': `?aid=YOUR_BOOKING_AFFILIATE_ID&dest_id=${hotelId}`,
    'Hotels.com': `?rffrid=YOUR_HOTELS_AFFILIATE_ID`,
    'Airbnb': `?affiliate_id=YOUR_AIRBNB_AFFILIATE_ID`,
    'Trivago': `?cip=YOUR_TRIVAGO_CPC_ID`,
  };
  
  const separator = originalUrl.includes('?') ? '&' : '?';
  const trackingParam = `ref=goalstays&utm_source=goalstays&utm_medium=metasearch&utm_campaign=hotel_comparison`;
  return `${originalUrl}${separator}${trackingParam}`;
};

const HotelCard = ({ hotel, searchParams }: HotelCardProps) => {
  const { user } = useAuthContext();
  const { isFavorite, toggleFavorite } = useFavorites();
  
  const nights = calculateNights(searchParams?.checkIn, searchParams?.checkOut);
  
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

  const handleBookBestPrice = () => {
    const url = generateAffiliateUrl(
      lowestPricePlatform.platform, 
      lowestPricePlatform.url, 
      hotel.id
    );
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group border-2 hover:border-primary/30">
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
                <span className="font-bold">{hotel.rating.toFixed(1)}</span>
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

          {/* Price Comparison Grid */}
          <div className="mt-auto">
            <p className="text-xs text-muted-foreground mb-2 font-medium">Compare prices across platforms:</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {hotel.prices.map((priceInfo) => {
                const isLowest = priceInfo.price === lowestPricePlatform.price;
                const affiliateUrl = generateAffiliateUrl(priceInfo.platform, priceInfo.url, hotel.id);
                const totalPrice = priceInfo.price * nights;
                
                return (
                  <a
                    key={priceInfo.platform}
                    href={affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`relative p-3 rounded-lg border-2 transition-all duration-200 hover:shadow-lg cursor-pointer ${
                      isLowest
                        ? 'border-success bg-success/10 shadow-lg ring-2 ring-success/30'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    {isLowest && (
                      <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
                        <Badge className="bg-success hover:bg-success text-success-foreground text-[10px] px-2 py-0.5 flex items-center gap-1">
                          <Sparkles className="h-2.5 w-2.5" />
                          Best Price
                        </Badge>
                      </div>
                    )}
                    <div
                      className="w-6 h-6 rounded mx-auto mb-1.5 flex items-center justify-center text-[10px] font-bold text-white"
                      style={{ backgroundColor: priceInfo.color }}
                    >
                      {priceInfo.logo}
                    </div>
                    <div className="text-center">
                      <p className={`font-bold text-lg ${isLowest ? 'text-success' : 'text-foreground'}`}>
                        ${priceInfo.price}
                      </p>
                      <p className="text-[10px] text-muted-foreground">per night</p>
                      {nights > 1 && (
                        <p className={`text-xs font-medium mt-1 ${isLowest ? 'text-success' : 'text-muted-foreground'}`}>
                          ${totalPrice} total
                        </p>
                      )}
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

          {/* CTA Section */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
            <div>
              <p className="text-sm text-muted-foreground">Best price from {lowestPricePlatform.platform}</p>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold text-success">
                  ${hotel.lowestPrice}
                </p>
                <span className="text-sm text-muted-foreground">/ night</span>
                {nights > 1 && (
                  <span className="text-sm font-semibold text-foreground">
                    (${hotel.lowestPrice * nights} for {nights} nights)
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <PriceAlertDialog
                searchType="hotel"
                searchParams={searchParams || { hotelId: hotel.id }}
                currentPrice={hotel.lowestPrice}
                itemName={hotel.name}
                trigger={
                  <Button variant="outline" size="icon" title="Set price alert">
                    <Bell className="h-4 w-4" />
                  </Button>
                }
              />
              <Button 
                onClick={handleBookBestPrice}
                className="bg-success hover:bg-success/90 text-success-foreground font-semibold"
                size="lg"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Book at Best Price
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default HotelCard;
