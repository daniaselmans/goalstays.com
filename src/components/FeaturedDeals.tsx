import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Star, MapPin, Heart, TrendingDown, Plane, Hotel, Car, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const hotelDeals = [
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

const flightDeals = [
  {
    id: 1,
    route: 'New York → London',
    airline: 'British Airways',
    departureTime: '18:30',
    arrivalTime: '06:45+1',
    duration: '7h 15m',
    stops: 0,
    price: 589,
    originalPrice: 785,
    discount: 25,
    platform: 'Skyscanner',
  },
  {
    id: 2,
    route: 'London → Dubai',
    airline: 'Emirates',
    departureTime: '08:00',
    arrivalTime: '19:25',
    duration: '6h 55m',
    stops: 0,
    price: 685,
    originalPrice: 978,
    discount: 30,
    platform: 'Kayak',
  },
  {
    id: 3,
    route: 'Paris → Barcelona',
    airline: 'Air France',
    departureTime: '07:30',
    arrivalTime: '09:20',
    duration: '1h 50m',
    stops: 0,
    price: 125,
    originalPrice: 208,
    discount: 40,
    platform: 'Google Flights',
  },
  {
    id: 4,
    route: 'Amsterdam → New York',
    airline: 'KLM',
    departureTime: '10:30',
    arrivalTime: '13:15',
    duration: '8h 45m',
    stops: 0,
    price: 525,
    originalPrice: 729,
    discount: 28,
    platform: 'Skyscanner',
  },
];

const carDeals = [
  {
    id: 1,
    title: 'Premium SUV',
    location: 'Los Angeles, USA',
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&auto=format&fit=crop&q=80',
    price: 65,
    originalPrice: 95,
    rating: 4.6,
    reviews: 234,
    platform: 'RentalCars',
    discount: 32,
    category: 'SUV',
  },
  {
    id: 2,
    title: 'Luxury Convertible',
    location: 'Miami, USA',
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&auto=format&fit=crop&q=80',
    price: 89,
    originalPrice: 125,
    rating: 4.8,
    reviews: 156,
    platform: 'Kayak',
    discount: 29,
    category: 'Convertible',
  },
  {
    id: 3,
    title: 'Economy Compact',
    location: 'Barcelona, Spain',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&auto=format&fit=crop&q=80',
    price: 28,
    originalPrice: 42,
    rating: 4.4,
    reviews: 567,
    platform: 'Europcar',
    discount: 33,
    category: 'Economy',
  },
  {
    id: 4,
    title: 'Electric Tesla Model 3',
    location: 'San Francisco, USA',
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&auto=format&fit=crop&q=80',
    price: 95,
    originalPrice: 140,
    rating: 4.9,
    reviews: 89,
    platform: 'Turo',
    discount: 32,
    category: 'Electric',
  },
];

const FeaturedDeals = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState('hotels');

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

  const renderHotelCard = (deal: typeof hotelDeals[0], index: number) => (
    <motion.div
      key={deal.id}
      variants={cardVariants}
      whileHover={{ y: -10 }}
      className="group"
    >
      <Card className="overflow-hidden h-full cursor-pointer border-2 border-transparent hover:border-primary/30 transition-all duration-500 hover:shadow-2xl relative">
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"
        />
        
        <div className="relative aspect-[4/3] overflow-hidden">
          <motion.img
            src={deal.image}
            alt={deal.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
          
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

          <motion.button 
            className="absolute top-3 right-3 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <Heart className="h-4 w-4 text-foreground group-hover:text-accent transition-colors" />
          </motion.button>

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
          <div className="flex items-center gap-1 text-muted-foreground text-sm mb-2">
            <MapPin className="h-3.5 w-3.5" />
            <span>{deal.location}</span>
          </div>

          <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
            {deal.title}
          </h3>

          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span className="font-semibold text-foreground">{deal.rating}</span>
            </div>
            <span className="text-muted-foreground text-sm">
              ({deal.reviews} reviews)
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-foreground">${deal.price}</span>
            <span className="text-muted-foreground line-through text-sm">${deal.originalPrice}</span>
            <span className="text-muted-foreground text-sm">/ night</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  const renderFlightCard = (deal: typeof flightDeals[0], index: number) => (
    <motion.div
      key={deal.id}
      variants={cardVariants}
      whileHover={{ y: -10 }}
      className="group"
    >
      <Card className="overflow-hidden h-full cursor-pointer border-2 border-transparent hover:border-primary/30 transition-all duration-500 hover:shadow-2xl relative">
        <CardContent className="p-5 relative z-20">
          <div className="flex items-center justify-between mb-4">
            <Badge className="accent-gradient text-accent-foreground font-bold shadow-lg">
              -{deal.discount}%
            </Badge>
            <Badge variant="secondary" className="bg-secondary text-foreground">
              {deal.platform}
            </Badge>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <Plane className="h-5 w-5 text-primary" />
            <span className="font-bold text-foreground">{deal.route}</span>
          </div>

          <div className="text-sm text-muted-foreground mb-2">{deal.airline}</div>

          <div className="flex items-center justify-between mb-4">
            <div className="text-center">
              <div className="text-lg font-bold text-foreground">{deal.departureTime}</div>
              <div className="text-xs text-muted-foreground">Depart</div>
            </div>
            <div className="flex-1 mx-4 border-t-2 border-dashed border-muted-foreground/30 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {deal.duration}
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-foreground">{deal.arrivalTime}</div>
              <div className="text-xs text-muted-foreground">Arrive</div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Badge variant="outline" className="text-primary border-primary">
              {deal.stops === 0 ? 'Non-stop' : `${deal.stops} stop${deal.stops > 1 ? 's' : ''}`}
            </Badge>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-foreground">${deal.price}</span>
              <span className="text-muted-foreground line-through text-sm">${deal.originalPrice}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  const renderCarCard = (deal: typeof carDeals[0], index: number) => (
    <motion.div
      key={deal.id}
      variants={cardVariants}
      whileHover={{ y: -10 }}
      className="group"
    >
      <Card className="overflow-hidden h-full cursor-pointer border-2 border-transparent hover:border-primary/30 transition-all duration-500 hover:shadow-2xl relative">
        <div className="relative aspect-[4/3] overflow-hidden">
          <motion.img
            src={deal.image}
            alt={deal.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
          
          <motion.div 
            className="absolute top-3 left-3 flex gap-2"
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.3 }}
          >
            <Badge className="accent-gradient text-accent-foreground font-bold shadow-lg">
              -{deal.discount}%
            </Badge>
            <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
              {deal.category}
            </Badge>
          </motion.div>

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
          <div className="flex items-center gap-1 text-muted-foreground text-sm mb-2">
            <MapPin className="h-3.5 w-3.5" />
            <span>{deal.location}</span>
          </div>

          <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
            {deal.title}
          </h3>

          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span className="font-semibold text-foreground">{deal.rating}</span>
            </div>
            <span className="text-muted-foreground text-sm">
              ({deal.reviews} reviews)
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-foreground">${deal.price}</span>
            <span className="text-muted-foreground line-through text-sm">${deal.originalPrice}</span>
            <span className="text-muted-foreground text-sm">/ day</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <section className="py-20 bg-secondary/30 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
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

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-background/80 backdrop-blur-sm">
              <TabsTrigger value="hotels" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Hotel className="h-4 w-4" />
                <span>Hotels</span>
              </TabsTrigger>
              <TabsTrigger value="flights" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Plane className="h-4 w-4" />
                <span>Flights</span>
              </TabsTrigger>
              <TabsTrigger value="cars" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Car className="h-4 w-4" />
                <span>Cars</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="hotels" className="mt-0">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {hotelDeals.map((deal, index) => renderHotelCard(deal, index))}
            </motion.div>
          </TabsContent>

          <TabsContent value="flights" className="mt-0">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {flightDeals.map((deal, index) => renderFlightCard(deal, index))}
            </motion.div>
          </TabsContent>

          <TabsContent value="cars" className="mt-0">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {carDeals.map((deal, index) => renderCarCard(deal, index))}
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default FeaturedDeals;
