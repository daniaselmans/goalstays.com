import { motion } from 'framer-motion';
import { Star, MapPin, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const featuredDeals = [
  {
    id: 1,
    title: 'Luxury Beach Villa',
    location: 'Maldives',
    image: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&auto=format&fit=crop&q=80',
    price: 299,
    originalPrice: 450,
    rating: 4.9,
    reviews: 128,
    platform: 'Airbnb',
    discount: 34,
  },
  {
    id: 2,
    title: 'Modern City Apartment',
    location: 'Paris, France',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80',
    price: 159,
    originalPrice: 220,
    rating: 4.7,
    reviews: 89,
    platform: 'Booking.com',
    discount: 28,
  },
  {
    id: 3,
    title: 'Mountain Retreat Lodge',
    location: 'Swiss Alps',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop&q=80',
    price: 189,
    originalPrice: 280,
    rating: 4.8,
    reviews: 203,
    platform: 'Hotels.com',
    discount: 32,
  },
  {
    id: 4,
    title: 'Oceanfront Suite',
    location: 'Bali, Indonesia',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80',
    price: 245,
    originalPrice: 350,
    rating: 4.9,
    reviews: 156,
    platform: 'Trivago',
    discount: 30,
  },
];

const FeaturedDeals = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Today's <span className="text-gradient">Best Deals</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Hand-picked offers with the biggest savings across all platforms.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDeals.map((deal, index) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group overflow-hidden h-full hover:shadow-xl transition-all duration-300 cursor-pointer">
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={deal.image}
                    alt={deal.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <Badge className="accent-gradient text-accent-foreground font-bold">
                      -{deal.discount}%
                    </Badge>
                  </div>

                  {/* Favorite button */}
                  <button className="absolute top-3 right-3 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors">
                    <Heart className="h-4 w-4 text-foreground" />
                  </button>

                  {/* Platform tag */}
                  <div className="absolute bottom-3 left-3">
                    <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm text-foreground">
                      {deal.platform}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-4">
                  {/* Location */}
                  <div className="flex items-center gap-1 text-muted-foreground text-sm mb-2">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{deal.location}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {deal.title}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-accent text-accent" />
                      <span className="font-semibold text-foreground">{deal.rating}</span>
                    </div>
                    <span className="text-muted-foreground text-sm">
                      ({deal.reviews} reviews)
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-foreground">
                      ${deal.price}
                    </span>
                    <span className="text-muted-foreground line-through text-sm">
                      ${deal.originalPrice}
                    </span>
                    <span className="text-muted-foreground text-sm">/ night</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedDeals;
