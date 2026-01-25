import { motion } from 'framer-motion';
import { Plane, Clock, ExternalLink, Heart, Bell } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FlightResult, FlightLeg } from '@/lib/api/flights';
import { useFavorites } from '@/hooks/useFavorites';
import { useAuthContext } from '@/contexts/AuthContext';
import PriceAlertDialog from '@/components/PriceAlertDialog';

interface FlightCardProps {
  flight: FlightResult;
  searchParams?: Record<string, unknown>;
}

const LegDisplay = ({ leg, isLast }: { leg: FlightLeg; isLast: boolean }) => (
  <div className="flex items-center gap-4">
    <div className="text-center min-w-[60px]">
      <div className="text-lg font-bold">{leg.departureTime}</div>
      <div className="text-xs text-muted-foreground">{leg.departure}</div>
    </div>
    
    <div className="flex-1 flex flex-col items-center">
      <div className="text-xs text-muted-foreground mb-1">{leg.duration}</div>
      <div className="w-full flex items-center gap-1">
        <div className="h-px flex-1 bg-border" />
        <Plane className="h-3 w-3 text-primary rotate-90" />
        <div className="h-px flex-1 bg-border" />
      </div>
      <div className="text-xs text-muted-foreground mt-1">{leg.flightNumber}</div>
    </div>
    
    <div className="text-center min-w-[60px]">
      <div className="text-lg font-bold">{leg.arrivalTime}</div>
      <div className="text-xs text-muted-foreground">{leg.arrival}</div>
    </div>
  </div>
);

const FlightCard = ({ flight, searchParams }: FlightCardProps) => {
  const { user } = useAuthContext();
  const { isFavorite, toggleFavorite } = useFavorites();
  
  const lowestPriceItem = flight.prices[0];
  const savings = flight.prices.length > 1 
    ? flight.prices[flight.prices.length - 1].price - lowestPriceItem.price 
    : 0;

  const isFlightFavorite = isFavorite('flight', flight.id);

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const outboundLeg = flight.outbound[0];
    await toggleFavorite('flight', flight.id, {
      title: `${outboundLeg?.departure} → ${outboundLeg?.arrival}`,
      airlines: flight.airlines,
      price: flight.lowestPrice,
      stops: flight.stops,
      duration: flight.totalDuration,
      departureTime: outboundLeg?.departureTime,
    });
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <CardContent className="p-0">
          <div className="flex flex-col lg:flex-row">
            {/* Flight Details */}
            <div className="flex-1 p-6 relative">
              {/* Favorite Button */}
              <button 
                onClick={handleFavoriteClick}
                className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-sm transition-colors z-10 ${
                  isFlightFavorite 
                    ? 'bg-red-500 hover:bg-red-600' 
                    : 'bg-muted hover:bg-muted/80'
                }`}
              >
                <Heart 
                  className={`h-4 w-4 transition-colors ${
                    isFlightFavorite ? 'text-white fill-white' : 'text-foreground'
                  }`} 
                />
              </button>

              {/* Outbound */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">{flight.outbound[0]?.airlineLogo}</span>
                  <span className="font-medium">{flight.airlines.join(', ')}</span>
                  <Badge variant={flight.stops === 0 ? 'default' : 'secondary'} className="ml-auto mr-10">
                    {flight.stops === 0 ? 'Direct' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
                  </Badge>
                </div>
                
                {flight.outbound.map((leg, idx) => (
                  <div key={idx} className="mb-3">
                    <LegDisplay leg={leg} isLast={idx === flight.outbound.length - 1} />
                    {idx < flight.outbound.length - 1 && (
                      <div className="text-center my-2">
                        <Badge variant="outline" className="text-xs">
                          Layover in {leg.arrival}
                        </Badge>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Inbound (if round trip) */}
              {flight.inbound && flight.inbound.length > 0 && (
                <div className="pt-4 border-t border-border">
                  <div className="text-sm text-muted-foreground mb-3">Return</div>
                  {flight.inbound.map((leg, idx) => (
                    <div key={idx} className="mb-3">
                      <LegDisplay leg={leg} isLast={idx === flight.inbound!.length - 1} />
                    </div>
                  ))}
                </div>
              )}

              {/* Total Duration */}
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Total: {flight.totalDuration}
                </span>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="lg:w-80 bg-muted/30 p-6 border-t lg:border-t-0 lg:border-l border-border">
              <div className="mb-4">
                <div className="text-3xl font-bold text-primary">
                  ${lowestPriceItem.price}
                </div>
                <div className="text-sm text-muted-foreground">
                  per person • {lowestPriceItem.cabinClass}
                </div>
                {savings > 0 && (
                  <Badge variant="secondary" className="mt-2 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    Save ${savings} vs other sites
                  </Badge>
                )}
              </div>

              <div className="flex gap-2">
                <PriceAlertDialog
                  searchType="flight"
                  searchParams={searchParams || { flightId: flight.id }}
                  currentPrice={lowestPriceItem.price}
                  itemName={`${flight.outbound[0]?.departure} → ${flight.outbound[0]?.arrival}`}
                  trigger={
                    <Button variant="outline" size="icon">
                      <Bell className="h-4 w-4" />
                    </Button>
                  }
                />
                <Button className="flex-1" asChild>
                  <a href={lowestPriceItem.url} target="_blank" rel="noopener noreferrer">
                    Book on {lowestPriceItem.platform}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>

              {/* Price Comparison */}
              <div className="space-y-2">
                <div className="text-xs font-medium text-muted-foreground mb-2">
                  Compare prices
                </div>
                {flight.prices.slice(0, 4).map((price, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center justify-between p-2 rounded-lg text-sm ${
                      idx === 0 ? 'bg-primary/10 border border-primary/20' : 'bg-muted'
                    }`}
                  >
                    <span className={idx === 0 ? 'font-medium' : ''}>
                      {price.platform}
                    </span>
                    <span className={idx === 0 ? 'font-bold text-primary' : 'text-muted-foreground'}>
                      ${price.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FlightCard;
