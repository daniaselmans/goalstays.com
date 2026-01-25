import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';
import type { Json } from '@/integrations/supabase/types';

export type AlertSearchType = 'hotel' | 'flight' | 'car';

export interface PriceAlert {
  id: string;
  user_id: string;
  search_type: AlertSearchType;
  search_params: Json;
  target_price: number;
  current_price: number | null;
  item_name: string;
  is_active: boolean;
  last_checked_at: string | null;
  triggered_at: string | null;
  created_at: string;
  updated_at: string;
}

export const usePriceAlerts = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [alerts, setAlerts] = useState<PriceAlert[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAlerts = useCallback(async () => {
    if (!user) return;
    
    setLoading(true);
    const { data, error } = await supabase
      .from('price_alerts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching price alerts:', error);
    } else {
      setAlerts(data as PriceAlert[]);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchAlerts();
  }, [fetchAlerts]);

  const createAlert = async (
    searchType: AlertSearchType,
    searchParams: Record<string, unknown>,
    targetPrice: number,
    currentPrice: number,
    itemName: string
  ) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to set price alerts.",
        variant: "destructive",
      });
      return false;
    }

    const { error } = await supabase
      .from('price_alerts')
      .insert([{
        user_id: user.id,
        search_type: searchType,
        search_params: searchParams as unknown as Json,
        target_price: targetPrice,
        current_price: currentPrice,
        item_name: itemName,
      }]);

    if (error) {
      console.error('Error creating price alert:', error);
      toast({
        title: "Error",
        description: "Failed to create price alert. Please try again.",
        variant: "destructive",
      });
      return false;
    }

    toast({
      title: "Price alert set!",
      description: `We'll notify you when ${itemName} drops below $${targetPrice}.`,
    });

    await fetchAlerts();
    return true;
  };

  const updateAlert = async (alertId: string, updates: { is_active?: boolean }) => {
    if (!user) return false;

    const { error } = await supabase
      .from('price_alerts')
      .update(updates)
      .eq('id', alertId);

    if (error) {
      console.error('Error updating price alert:', error);
      return false;
    }

    await fetchAlerts();
    return true;
  };

  const deleteAlert = async (alertId: string) => {
    if (!user) return false;

    const { error } = await supabase
      .from('price_alerts')
      .delete()
      .eq('id', alertId);

    if (error) {
      console.error('Error deleting price alert:', error);
      toast({
        title: "Error",
        description: "Failed to delete price alert.",
        variant: "destructive",
      });
      return false;
    }

    toast({
      title: "Alert deleted",
      description: "Price alert has been removed.",
    });

    await fetchAlerts();
    return true;
  };

  const toggleAlert = async (alertId: string, isActive: boolean) => {
    return updateAlert(alertId, { is_active: isActive });
  };

  return {
    alerts,
    loading,
    createAlert,
    updateAlert,
    deleteAlert,
    toggleAlert,
    refetch: fetchAlerts,
  };
};
