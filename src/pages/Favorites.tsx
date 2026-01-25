import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Hotel, Plane, Car, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuthContext } from '@/contexts/AuthContext';
import { useFavorites, FavoriteType } from '@/hooks/useFavorites';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Favorites = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuthContext();
  const { favorites, loading, removeFavorite } = useFavorites();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/');
    }
  }, [user, authLoading, navigate]);

  const hotelFavorites = favorites.filter(f => f.item_type === 'hotel');
  const flightFavorites = favorites.filter(f => f.item_type === 'flight');
  const carFavorites = favorites.filter(f => f.item_type === 'car');

  const handleRemove = async (itemType: FavoriteType, itemId: string) => {
    await removeFavorite(itemType, itemId);
  };

  const renderFavoriteCard = (favorite: typeof favorites[0]) => {
    const data = (favorite.item_data || {}) as Record<string, any>;
    
    return (
      <motion.div
        key={favorite.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <Card className="overflow-hidden hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{data.name || data.title || 'Unnamed'}</h3>
                <p className="text-muted-foreground text-sm">{data.location || data.destination || ''}</p>
                {data.price && (
                  <p className="text-primary font-bold mt-2">${data.price}</p>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemove(favorite.item_type as FavoriteType, favorite.item_id)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  const EmptyState = ({ type }: { type: string }) => (
    <div className="text-center py-12">
      <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium mb-2">No {type} favorites yet</h3>
      <p className="text-muted-foreground">Start exploring and save your favorites!</p>
      <Button onClick={() => navigate('/')} className="mt-4">
        Explore Deals
      </Button>
    </div>
  );

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
        <div className="flex items-center gap-3 mb-8">
          <Heart className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">My Favorites</h1>
        </div>

        <Tabs defaultValue="hotels" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="hotels" className="gap-2">
              <Hotel className="h-4 w-4" />
              Hotels ({hotelFavorites.length})
            </TabsTrigger>
            <TabsTrigger value="flights" className="gap-2">
              <Plane className="h-4 w-4" />
              Flights ({flightFavorites.length})
            </TabsTrigger>
            <TabsTrigger value="cars" className="gap-2">
              <Car className="h-4 w-4" />
              Cars ({carFavorites.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="hotels">
            {loading ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map(i => (
                  <Card key={i} className="h-32 animate-pulse bg-muted" />
                ))}
              </div>
            ) : hotelFavorites.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {hotelFavorites.map(renderFavoriteCard)}
              </div>
            ) : (
              <EmptyState type="hotel" />
            )}
          </TabsContent>

          <TabsContent value="flights">
            {loading ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map(i => (
                  <Card key={i} className="h-32 animate-pulse bg-muted" />
                ))}
              </div>
            ) : flightFavorites.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {flightFavorites.map(renderFavoriteCard)}
              </div>
            ) : (
              <EmptyState type="flight" />
            )}
          </TabsContent>

          <TabsContent value="cars">
            {loading ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map(i => (
                  <Card key={i} className="h-32 animate-pulse bg-muted" />
                ))}
              </div>
            ) : carFavorites.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {carFavorites.map(renderFavoriteCard)}
              </div>
            ) : (
              <EmptyState type="car" />
            )}
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default Favorites;
