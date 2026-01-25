import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, Users, ChevronDown, Hotel, Plane, Car, User, ArrowLeftRight, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import CityAutocomplete from '@/components/CityAutocomplete';
import LocationAutocomplete from '@/components/LocationAutocomplete';
import DateRangePicker from '@/components/DateRangePicker';
import heroImage from '@/assets/hero-travel.jpg';

// Floating particles component
const FloatingParticles = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 8 + 4,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 10 + 15,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white/10"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const HeroSection = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('hotels');
  const { scrollY } = useScroll();
  
  // Parallax effects
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
  const contentY = useTransform(scrollY, [0, 500], [0, -50]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  
  // Hotel state
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState<Date | undefined>();
  const [checkOut, setCheckOut] = useState<Date | undefined>();

  // Flight state
  const [origin, setOrigin] = useState('');
  const [flightDestination, setFlightDestination] = useState('');
  const [departDate, setDepartDate] = useState<Date | undefined>();
  const [returnDate, setReturnDate] = useState<Date | undefined>();
  const [passengers, setPassengers] = useState(1);

  // Car rental state
  const [carTripType, setCarTripType] = useState<'roundtrip' | 'oneway'>('roundtrip');
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [pickupDate, setPickupDate] = useState<Date | undefined>();
  const [dropoffDate, setDropoffDate] = useState<Date | undefined>();
  const [driverAge, setDriverAge] = useState(30);

  // Animated text
  const [displayText, setDisplayText] = useState('');
  const fullText = 'All Your Travel Deals';
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = () => {
    if (activeTab === 'hotels') {
      navigate('/search');
    } else if (activeTab === 'flights') {
      navigate(`/search/flights?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(flightDestination)}&tripType=roundtrip`);
    } else if (activeTab === 'cars') {
      const dropoff = carTripType === 'oneway' ? dropoffLocation : pickupLocation;
      navigate(`/search/cars?pickup=${encodeURIComponent(pickupLocation)}&dropoff=${encodeURIComponent(dropoff || pickupLocation)}&tripType=${carTripType}`);
    }
  };

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Parallax Background Image */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: backgroundY }}
      >
        <img
          src={heroImage}
          alt="Tropical paradise resort"
          className="w-full h-[110%] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-foreground/70" />
        
        {/* Animated gradient overlay */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-accent/20 animate-gradient"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        />
      </motion.div>

      {/* Floating Particles */}
      <FloatingParticles />

      {/* Content */}
      <motion.div 
        className="relative z-10 container mx-auto px-4 text-center"
        style={{ y: contentY, opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-4xl mx-auto"
        >
          {/* Sparkle badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6"
          >
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="text-sm text-primary-foreground/90">Compare 50+ booking sites instantly</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-primary-foreground mb-6 leading-tight"
          >
            <span className="inline-block">
              {displayText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                className="inline-block w-1 h-12 md:h-16 bg-accent ml-1 align-middle"
              />
            </span>
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="block text-accent mt-2"
            >
              In One Place
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-primary-foreground/90 mb-10 max-w-2xl mx-auto"
          >
            Compare hotels, flights, and car rentals from top booking sites. 
            Find the best deals instantly.
          </motion.p>
        </motion.div>

        {/* Search Card with Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl mx-auto"
        >
          <div className="glass-card rounded-2xl p-6 md:p-8 relative overflow-hidden">
            {/* Animated border glow */}
            <motion.div
              className="absolute inset-0 rounded-2xl opacity-50"
              style={{
                background: 'linear-gradient(90deg, transparent, hsl(var(--primary) / 0.3), transparent)',
                backgroundSize: '200% 100%',
              }}
              animate={{
                backgroundPosition: ['200% 0', '-200% 0'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full relative z-10">
              <TabsList className="grid w-full grid-cols-3 mb-6 bg-background/50">
                {[
                  { value: 'hotels', icon: Hotel, label: 'Hotels' },
                  { value: 'flights', icon: Plane, label: 'Flights' },
                  { value: 'cars', icon: Car, label: 'Cars' },
                ].map((tab) => (
                  <TabsTrigger 
                    key={tab.value}
                    value={tab.value} 
                    className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <tab.icon className="h-4 w-4" />
                    </motion.div>
                    <span className="hidden sm:inline">{tab.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Hotels Tab */}
              <TabsContent value="hotels" className="mt-0">
                <motion.div 
                  variants={tabVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-4 gap-4"
                >
                  <div className="relative">
                    <label className="text-xs font-medium text-muted-foreground mb-2 block text-left">
                      Destination
                    </label>
                    <CityAutocomplete
                      value={destination}
                      onChange={setDestination}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <DateRangePicker
                      checkIn={checkIn}
                      checkOut={checkOut}
                      onCheckInChange={setCheckIn}
                      onCheckOutChange={setCheckOut}
                    />
                  </div>

                  <div className="relative">
                    <label className="text-xs font-medium text-muted-foreground mb-2 block text-left">
                      Guests
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <button className="w-full h-12 pl-11 pr-4 rounded-lg border border-input bg-background text-foreground text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 hover:border-primary/50">
                        <span className="text-muted-foreground">2 guests</span>
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>

              {/* Flights Tab */}
              <TabsContent value="flights" className="mt-0">
                <motion.div 
                  variants={tabVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-4 gap-4"
                >
                  <div className="relative">
                    <label className="text-xs font-medium text-muted-foreground mb-2 block text-left">
                      From
                    </label>
                    <LocationAutocomplete
                      value={origin}
                      onChange={setOrigin}
                      placeholder="Origin airport"
                      type="airport"
                    />
                  </div>

                  <div className="relative">
                    <label className="text-xs font-medium text-muted-foreground mb-2 block text-left">
                      To
                    </label>
                    <LocationAutocomplete
                      value={flightDestination}
                      onChange={setFlightDestination}
                      placeholder="Destination airport"
                      type="airport"
                    />
                  </div>

                  <div className="md:col-span-1">
                    <DateRangePicker
                      checkIn={departDate}
                      checkOut={returnDate}
                      onCheckInChange={setDepartDate}
                      onCheckOutChange={setReturnDate}
                    />
                  </div>

                  <div className="relative">
                    <label className="text-xs font-medium text-muted-foreground mb-2 block text-left">
                      Passengers
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <select
                        value={passengers}
                        onChange={(e) => setPassengers(Number(e.target.value))}
                        className="w-full h-12 pl-11 pr-4 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer transition-all duration-200 hover:border-primary/50"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'Passenger' : 'Passengers'}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>
                </motion.div>
              </TabsContent>

              {/* Cars Tab */}
              <TabsContent value="cars" className="mt-0">
                <motion.div
                  variants={tabVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.3 }}
                >
                  {/* Trip Type Toggle */}
                  <div className="flex gap-2 mb-4">
                    {[
                      { type: 'roundtrip' as const, icon: ArrowLeftRight, label: 'Round-trip' },
                      { type: 'oneway' as const, icon: ArrowRight, label: 'One-way' },
                    ].map((trip) => (
                      <motion.button
                        key={trip.type}
                        type="button"
                        onClick={() => setCarTripType(trip.type)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                          carTripType === trip.type
                            ? 'bg-primary text-primary-foreground shadow-md'
                            : 'bg-background/50 text-foreground hover:bg-background/70'
                        }`}
                      >
                        <trip.icon className="h-4 w-4" />
                        {trip.label}
                      </motion.button>
                    ))}
                  </div>

                  <div className={`grid grid-cols-1 gap-4 ${carTripType === 'oneway' ? 'md:grid-cols-5' : 'md:grid-cols-4'}`}>
                    <div className="relative">
                      <label className="text-xs font-medium text-muted-foreground mb-2 block text-left">
                        Pick-up Location
                      </label>
                      <LocationAutocomplete
                        value={pickupLocation}
                        onChange={setPickupLocation}
                        placeholder="City or airport"
                        type="both"
                      />
                    </div>

                    {carTripType === 'oneway' && (
                      <motion.div 
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        className="relative"
                      >
                        <label className="text-xs font-medium text-muted-foreground mb-2 block text-left">
                          Drop-off Location
                        </label>
                        <LocationAutocomplete
                          value={dropoffLocation}
                          onChange={setDropoffLocation}
                          placeholder="Different location"
                          type="both"
                        />
                      </motion.div>
                    )}

                    <div className="md:col-span-1">
                      <DateRangePicker
                        checkIn={pickupDate}
                        checkOut={dropoffDate}
                        onCheckInChange={setPickupDate}
                        onCheckOutChange={setDropoffDate}
                      />
                    </div>

                    <div className="relative">
                      <label className="text-xs font-medium text-muted-foreground mb-2 block text-left">
                        Driver's Age
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <select
                          value={driverAge}
                          onChange={(e) => setDriverAge(Number(e.target.value))}
                          className="w-full h-12 pl-11 pr-4 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer transition-all duration-200 hover:border-primary/50"
                        >
                          {Array.from({ length: 63 }, (_, i) => i + 18).map((age) => (
                            <option key={age} value={age}>
                              {age} years
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>
            </Tabs>

            <div className="mt-6 flex justify-center relative z-10">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  variant="hero" 
                  size="xl" 
                  className="min-w-[200px] relative overflow-hidden group"
                  onClick={handleSearch}
                >
                  <motion.span
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: '-100%', skewX: '-15deg' }}
                    whileHover={{ x: '200%' }}
                    transition={{ duration: 0.6 }}
                  />
                  <Search className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                  {activeTab === 'hotels' && 'Search Hotels'}
                  {activeTab === 'flights' && 'Search Flights'}
                  {activeTab === 'cars' && 'Search Cars'}
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="h-8 w-8 text-primary-foreground/70" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
