import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';
import type { Json } from '@/integrations/supabase/types';
export type FavoriteType = 'hotel' | 'flight' | 'car';

export interface Favorite {
  id: string;
  item_type: FavoriteType;
  item_id: string;
  item_data: Json;
  created_at: string;
}

export const useFavorites = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchFavorites = async () => {
    if (!user) return;
    
    setLoading(true);
    const { data, error } = await supabase
      .from('favorites')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching favorites:', error);
    } else {
      setFavorites(data as Favorite[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFavorites();
  }, [user]);

  const addFavorite = async (itemType: FavoriteType, itemId: string, itemData: Record<string, unknown>) => {
    if (!user) {
      toast.error('Please sign in to save favorites');
      return false;
    }

    const { error } = await supabase
      .from('favorites')
      .insert([{
        user_id: user.id,
        item_type: itemType,
        item_id: itemId,
        item_data: itemData as unknown as Json,
      }]);

    if (error) {
      if (error.code === '23505') {
        toast.info('Already in favorites');
      } else {
        console.error('Error adding favorite:', error);
        toast.error('Failed to add to favorites');
      }
      return false;
    }

    toast.success('Added to favorites');
    await fetchFavorites();
    return true;
  };

  const removeFavorite = async (itemType: FavoriteType, itemId: string) => {
    if (!user) return false;

    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', user.id)
      .eq('item_type', itemType)
      .eq('item_id', itemId);

    if (error) {
      console.error('Error removing favorite:', error);
      toast.error('Failed to remove from favorites');
      return false;
    }

    toast.success('Removed from favorites');
    await fetchFavorites();
    return true;
  };

  const isFavorite = (itemType: FavoriteType, itemId: string) => {
    return favorites.some(f => f.item_type === itemType && f.item_id === itemId);
  };

  const toggleFavorite = async (itemType: FavoriteType, itemId: string, itemData: Record<string, unknown>) => {
    if (isFavorite(itemType, itemId)) {
      return removeFavorite(itemType, itemId);
    } else {
      return addFavorite(itemType, itemId, itemData);
    }
  };

  return {
    favorites,
    loading,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
    refetch: fetchFavorites,
  };
};
