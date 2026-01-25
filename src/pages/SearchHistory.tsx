import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { History, Hotel, Plane, Car, Trash2, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuthContext } from '@/contexts/AuthContext';
import { useSearchHistory, SearchType } from '@/hooks/useSearchHistory';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const SearchHistory = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuthContext();
  const { history, loading, clearHistory } = useSearchHistory();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/');
    }
  }, [user, authLoading, navigate]);

  const getIcon = (type: SearchType) => {
    switch (type) {
      case 'hotel':
        return <Hotel className="h-5 w-5" />;
      case 'flight':
        return <Plane className="h-5 w-5" />;
      case 'car':
        return <Car className="h-5 w-5" />;
    }
  };

  const getSearchLabel = (type: SearchType, params: Record<string, any>) => {
    switch (type) {
      case 'hotel':
        return params.destination || 'Hotel Search';
      case 'flight':
        return `${params.from || '?'} → ${params.to || '?'}`;
      case 'car':
        return params.pickupLocation || 'Car Rental Search';
    }
  };

  const handleSearchAgain = (type: SearchType, params: Record<string, any>) => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value) searchParams.set(key, String(value));
    });
    navigate(`/search/${type}s?${searchParams.toString()}`);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary/10 py-20">
        <Header />
      </div>
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <History className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Search History</h1>
          </div>
          {history.length > 0 && (
            <Button variant="outline" onClick={clearHistory} className="gap-2">
              <Trash2 className="h-4 w-4" />
              Clear All
            </Button>
          )}
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <Card key={i} className="h-20 animate-pulse bg-muted" />
            ))}
          </div>
        ) : history.length > 0 ? (
          <div className="space-y-4">
            {history.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                          {getIcon(item.search_type as SearchType)}
                        </div>
                        <div>
                          <h3 className="font-medium">
                            {getSearchLabel(item.search_type as SearchType, item.search_params as Record<string, any>)}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {format(new Date(item.created_at), 'MMM d, yyyy h:mm a')}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSearchAgain(item.search_type as SearchType, item.search_params as Record<string, any>)}
                        className="gap-2"
                      >
                        <Search className="h-4 w-4" />
                        Search Again
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <History className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No search history yet</h3>
            <p className="text-muted-foreground">Your searches will appear here</p>
            <Button onClick={() => navigate('/')} className="mt-4">
              Start Searching
            </Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default SearchHistory;
