import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import SearchResults from "./pages/SearchResults";
import CarSearchResults from "./pages/CarSearchResults";
import FlightSearchResults from "./pages/FlightSearchResults";
import InstallApp from "./pages/InstallApp";
import Favorites from "./pages/Favorites";
import SearchHistory from "./pages/SearchHistory";
import PriceAlerts from "./pages/PriceAlerts";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/search/cars" element={<CarSearchResults />} />
            <Route path="/search/flights" element={<FlightSearchResults />} />
            <Route path="/install" element={<InstallApp />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/history" element={<SearchHistory />} />
            <Route path="/alerts" element={<PriceAlerts />} />
            <Route path="/profile" element={<Profile />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
