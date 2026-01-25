import { motion } from 'framer-motion';
import { Users, Cog, Fuel, Check, ExternalLink, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CarResult, PlatformPrice } from '@/lib/api/cars';
import { useFavorites } from '@/hooks/useFavorites';
import { useAuthContext } from '@/contexts/AuthContext';

interface CarCardProps {
  car: CarResult;
}

const CarCard = ({ car }: CarCardProps) => {
  const { user } = useAuthContext();
  const { isFavorite, toggleFavorite } = useFavorites();

  const lowestPlatform = car.prices.reduce((prev, curr) =>
    prev.price < curr.price ? prev : curr
  );

  const savings = car.prices.length > 1
    ? Math.max(...car.prices.map(p => p.price)) - lowestPlatform.price
    : 0;

  const isCarFavorite = isFavorite('car', car.id);

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    await toggleFavorite('car', car.id, {
      name: car.name,
      category: car.category,
      price: car.lowestPrice,
      image: car.image,
      supplier: car.supplier,
      seats: car.seats,
      transmission: car.transmission,
    });
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-card rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
    >
      <div className="flex flex-col md:flex-row">
        {/* Car Image */}
        <div className="relative md:w-72 h-48 md:h-auto bg-muted flex-shrink-0">
          <img
            src={car.image}
            alt={car.name}
            className="w-full h-full object-cover"
          />
          <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
            {car.category}
          </Badge>
          {savings > 0 && (
            <Badge className="absolute top-10 left-3 bg-green-500 text-white">
              Save ${savings.toFixed(0)}/day
            </Badge>
          )}
          
          {/* Favorite Button */}
          <button 
            onClick={handleFavoriteClick}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-colors ${
              isCarFavorite 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-background/80 hover:bg-background'
            }`}
          >
            <Heart 
              className={`h-4 w-4 transition-colors ${
                isCarFavorite ? 'text-white fill-white' : 'text-foreground'
              }`} 
            />
          </button>
        </div>

        {/* Car Details */}
        <div className="flex-1 p-5">
          <div className="flex flex-col h-full">
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-xl font-bold text-foreground">{car.name}</h3>
                  <p className="text-sm text-muted-foreground">or similar • {car.supplier}</p>
                </div>
                {car.rating && (
                  <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded">
                    <span className="text-sm font-semibold text-primary">{car.rating}</span>
                    <span className="text-xs text-muted-foreground">/10</span>
                  </div>
                )}
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Users className="h-4 w-4" />
                  <span>{car.seats} seats</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Cog className="h-4 w-4" />
                  <span>{car.transmission}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Fuel className="h-4 w-4" />
                  <span>{car.fuelType}</span>
                </div>
              </div>

              {/* Additional Features */}
              <div className="flex flex-wrap gap-2 mt-3">
                {car.features.slice(0, 4).map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-1 text-xs text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded"
                  >
                    <Check className="h-3 w-3" />
                    {feature}
                  </div>
                ))}
                {car.features.length > 4 && (
                  <div className="text-xs text-muted-foreground px-2 py-1">
                    +{car.features.length - 4} more
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Price Comparison */}
        <div className="md:w-64 border-t md:border-t-0 md:border-l border-border p-5 bg-muted/30">
          <h4 className="text-sm font-medium text-muted-foreground mb-3">Compare Prices</h4>
          <div className="space-y-2">
            {car.prices
              .sort((a, b) => a.price - b.price)
              .map((platform, index) => (
                <PlatformPriceRow
                  key={platform.platform}
                  platform={platform}
                  isLowest={index === 0}
                />
              ))}
          </div>
          <Button
            className="w-full mt-4"
            onClick={() => window.open(lowestPlatform.url, '_blank')}
          >
            Book from ${lowestPlatform.price}/day
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

const PlatformPriceRow = ({
  platform,
  isLowest,
}: {
  platform: PlatformPrice;
  isLowest: boolean;
}) => (
  <div
    className={`flex items-center justify-between p-2 rounded-lg transition-colors ${
      isLowest ? 'bg-primary/10 border border-primary/20' : 'hover:bg-muted'
    }`}
  >
    <div className="flex items-center gap-2">
      <span className="text-lg">{platform.logo}</span>
      <span className="text-sm font-medium text-foreground">{platform.platform}</span>
      {isLowest && (
        <Badge variant="secondary" className="text-xs bg-primary/20 text-primary">
          Best
        </Badge>
      )}
    </div>
    <div className="text-right">
      <div className="font-semibold text-foreground">${platform.price}</div>
      {platform.originalPrice && platform.originalPrice > platform.price && (
        <div className="text-xs text-muted-foreground line-through">
          ${platform.originalPrice}
        </div>
      )}
    </div>
  </div>
);

export default CarCard;
