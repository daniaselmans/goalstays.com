import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import type { Json } from '@/integrations/supabase/types';
export type SearchType = 'hotel' | 'flight' | 'car';

export interface SearchHistoryItem {
  id: string;
  search_type: SearchType;
  search_params: Json;
  created_at: string;
}

export const useSearchHistory = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchHistory = async () => {
    if (!user) return;
    
    setLoading(true);
    const { data, error } = await supabase
      .from('search_history')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20);

    if (error) {
      console.error('Error fetching search history:', error);
    } else {
      setHistory(data as SearchHistoryItem[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchHistory();
  }, [user]);

  const addSearchHistory = async (searchType: SearchType, searchParams: Record<string, unknown>) => {
    if (!user) return false;

    const { error } = await supabase
      .from('search_history')
      .insert([{
        user_id: user.id,
        search_type: searchType,
        search_params: searchParams as unknown as Json,
      }]);

    if (error) {
      console.error('Error adding search history:', error);
      return false;
    }

    await fetchHistory();
    return true;
  };

  const clearHistory = async () => {
    if (!user) return false;

    const { error } = await supabase
      .from('search_history')
      .delete()
      .eq('user_id', user.id);

    if (error) {
      console.error('Error clearing search history:', error);
      return false;
    }

    setHistory([]);
    return true;
  };

  return {
    history,
    loading,
    addSearchHistory,
    clearHistory,
    refetch: fetchHistory,
  };
};
