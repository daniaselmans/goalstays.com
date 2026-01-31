import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PageTransition from './PageTransition';
import Index from '@/pages/Index';
import SearchResults from '@/pages/SearchResults';
import CarSearchResults from '@/pages/CarSearchResults';
import FlightSearchResults from '@/pages/FlightSearchResults';
import InstallApp from '@/pages/InstallApp';
import Favorites from '@/pages/Favorites';
import SearchHistory from '@/pages/SearchHistory';
import PriceAlerts from '@/pages/PriceAlerts';
import Profile from '@/pages/Profile';
import NotFound from '@/pages/NotFound';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/search" element={<PageTransition><SearchResults /></PageTransition>} />
        <Route path="/search/cars" element={<PageTransition><CarSearchResults /></PageTransition>} />
        <Route path="/search/flights" element={<PageTransition><FlightSearchResults /></PageTransition>} />
        <Route path="/install" element={<PageTransition><InstallApp /></PageTransition>} />
        <Route path="/favorites" element={<PageTransition><Favorites /></PageTransition>} />
        <Route path="/history" element={<PageTransition><SearchHistory /></PageTransition>} />
        <Route path="/alerts" element={<PageTransition><PriceAlerts /></PageTransition>} />
        <Route path="/profile" element={<PageTransition><Profile /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
