import { useState } from 'react';
import { motion } from 'framer-motion';
import SearchHeader from '@/components/search/SearchHeader';
import SearchFilters from '@/components/search/SearchFilters';
import HotelCard from '@/components/search/HotelCard';
import { mockHotels } from '@/data/mockHotels';

const SearchResults = () => {
  const [sortBy, setSortBy] = useState('recommended');

  const sortedHotels = [...mockHotels].sort((a, b) => {
    if (sortBy === 'price-low') return a.lowestPrice - b.lowestPrice;
    if (sortBy === 'price-high') return b.lowestPrice - a.lowestPrice;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // recommended - keep original order
  });

  return (
    <div className="min-h-screen bg-background">
      <SearchHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-72 shrink-0">
            <SearchFilters />
          </aside>

          {/* Results */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Paris, France
                </h1>
                <p className="text-muted-foreground">
                  {mockHotels.length} properties found • Jan 25 - Jan 28, 2026
                </p>
              </div>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-10 px-4 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="recommended">Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Guest Rating</option>
              </select>
            </div>

            {/* Hotel List */}
            <div className="space-y-6">
              {sortedHotels.map((hotel, index) => (
                <motion.div
                  key={hotel.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <HotelCard hotel={hotel} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SearchResults;
