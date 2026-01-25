import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Star, MapPin, Heart, TrendingDown } from 'lucide-react';
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
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section className="py-20 bg-secondary/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent mb-4"
          >
            <TrendingDown className="h-4 w-4" />
            <span className="text-sm font-medium">Limited time offers</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Today's <span className="text-gradient">Best Deals</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Hand-picked offers with the biggest savings across all platforms.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {featuredDeals.map((deal, index) => (
            <motion.div
              key={deal.id}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Card className="overflow-hidden h-full cursor-pointer border-2 border-transparent hover:border-primary/30 transition-all duration-500 hover:shadow-2xl relative">
                {/* Gradient overlay on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"
                />
                
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <motion.img
                    src={deal.image}
                    alt={deal.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
                  
                  {/* Badges */}
                  <motion.div 
                    className="absolute top-3 left-3 flex gap-2"
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    <Badge className="accent-gradient text-accent-foreground font-bold shadow-lg">
                      -{deal.discount}%
                    </Badge>
                  </motion.div>

                  {/* Favorite button */}
                  <motion.button 
                    className="absolute top-3 right-3 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Heart className="h-4 w-4 text-foreground group-hover:text-accent transition-colors" />
                  </motion.button>

                  {/* Platform tag */}
                  <motion.div 
                    className="absolute bottom-3 left-3"
                    initial={{ y: 10, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.4 }}
                  >
                    <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm text-foreground">
                      {deal.platform}
                    </Badge>
                  </motion.div>
                </div>

                <CardContent className="p-4 relative z-20">
                  {/* Location */}
                  <div className="flex items-center gap-1 text-muted-foreground text-sm mb-2">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{deal.location}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                    {deal.title}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <motion.div
                        whileHover={{ rotate: 72 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Star className="h-4 w-4 fill-accent text-accent" />
                      </motion.div>
                      <span className="font-semibold text-foreground">{deal.rating}</span>
                    </div>
                    <span className="text-muted-foreground text-sm">
                      ({deal.reviews} reviews)
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-2">
                    <motion.span 
                      className="text-2xl font-bold text-foreground"
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      ${deal.price}
                    </motion.span>
                    <span className="text-muted-foreground line-through text-sm">
                      ${deal.originalPrice}
                    </span>
                    <span className="text-muted-foreground text-sm">/ night</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedDeals;
