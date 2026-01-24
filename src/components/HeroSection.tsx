import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, Users, ChevronDown, Hotel, Plane, Car, Calendar, Clock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import CityAutocomplete from '@/components/CityAutocomplete';
import LocationAutocomplete from '@/components/LocationAutocomplete';
import DateRangePicker from '@/components/DateRangePicker';
import heroImage from '@/assets/hero-travel.jpg';

const HeroSection = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('hotels');
  
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
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [pickupDate, setPickupDate] = useState<Date | undefined>();
  const [dropoffDate, setDropoffDate] = useState<Date | undefined>();
  const [driverAge, setDriverAge] = useState(30);

  const handleSearch = () => {
    if (activeTab === 'hotels') {
      navigate('/search');
    } else if (activeTab === 'flights') {
      navigate(`/search?tab=flights&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(flightDestination)}`);
    } else if (activeTab === 'cars') {
      navigate(`/search/cars?pickup=${encodeURIComponent(pickupLocation)}&dropoff=${encodeURIComponent(dropoffLocation || pickupLocation)}`);
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Tropical paradise resort"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-foreground/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-4xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-primary-foreground mb-6 leading-tight"
          >
            All Your Travel Deals
            <span className="block text-accent">In One Place</span>
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
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <div className="glass-card rounded-2xl p-6 md:p-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6 bg-background/50">
                <TabsTrigger value="hotels" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Hotel className="h-4 w-4" />
                  <span className="hidden sm:inline">Hotels</span>
                </TabsTrigger>
                <TabsTrigger value="flights" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Plane className="h-4 w-4" />
                  <span className="hidden sm:inline">Flights</span>
                </TabsTrigger>
                <TabsTrigger value="cars" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Car className="h-4 w-4" />
                  <span className="hidden sm:inline">Cars</span>
                </TabsTrigger>
              </TabsList>

              {/* Hotels Tab */}
              <TabsContent value="hotels" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                      <button className="w-full h-12 pl-11 pr-4 rounded-lg border border-input bg-background text-foreground text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-primary">
                        <span className="text-muted-foreground">2 guests</span>
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Flights Tab */}
              <TabsContent value="flights" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                        className="w-full h-12 pl-11 pr-4 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
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
                </div>
              </TabsContent>

              {/* Cars Tab */}
              <TabsContent value="cars" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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

                  <div className="relative">
                    <label className="text-xs font-medium text-muted-foreground mb-2 block text-left">
                      Drop-off Location
                    </label>
                    <LocationAutocomplete
                      value={dropoffLocation}
                      onChange={setDropoffLocation}
                      placeholder="Same as pick-up"
                      type="both"
                    />
                  </div>

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
                        className="w-full h-12 pl-11 pr-4 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
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
              </TabsContent>
            </Tabs>

            <div className="mt-6 flex justify-center">
              <Button 
                variant="hero" 
                size="xl" 
                className="min-w-[200px]"
                onClick={handleSearch}
              >
                <Search className="mr-2 h-5 w-5" />
                {activeTab === 'hotels' && 'Search Hotels'}
                {activeTab === 'flights' && 'Search Flights'}
                {activeTab === 'cars' && 'Search Cars'}
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="animate-bounce">
            <ChevronDown className="h-8 w-8 text-primary-foreground/70" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
