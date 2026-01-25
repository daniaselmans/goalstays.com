import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PriceAlert {
  id: string;
  user_id: string;
  search_type: 'hotel' | 'flight' | 'car';
  search_params: Record<string, unknown>;
  target_price: number;
  current_price: number | null;
  item_name: string;
  is_active: boolean;
}

interface SearchResult {
  lowestPrice?: number;
  price?: number;
  prices?: Array<{ price: number }>;
}

async function checkHotelPrice(params: Record<string, unknown>, supabaseUrl: string): Promise<number | null> {
  try {
    const response = await fetch(`${supabaseUrl}/functions/v1/search-hotels`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    
    if (!response.ok) return null;
    
    const data = await response.json();
    if (data.hotels && data.hotels.length > 0) {
      // Find the hotel by name or get the lowest price
      const prices = data.hotels.map((h: SearchResult) => h.lowestPrice || h.price || 0).filter((p: number) => p > 0);
      return prices.length > 0 ? Math.min(...prices) : null;
    }
    return null;
  } catch (error) {
    console.error('Error checking hotel price:', error);
    return null;
  }
}

async function checkFlightPrice(params: Record<string, unknown>, supabaseUrl: string): Promise<number | null> {
  try {
    const response = await fetch(`${supabaseUrl}/functions/v1/search-flights`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    
    if (!response.ok) return null;
    
    const data = await response.json();
    if (data.flights && data.flights.length > 0) {
      const prices = data.flights.map((f: SearchResult) => {
        if (f.prices && f.prices.length > 0) {
          return Math.min(...f.prices.map((p) => p.price));
        }
        return f.price || 0;
      }).filter((p: number) => p > 0);
      return prices.length > 0 ? Math.min(...prices) : null;
    }
    return null;
  } catch (error) {
    console.error('Error checking flight price:', error);
    return null;
  }
}

async function checkCarPrice(params: Record<string, unknown>, supabaseUrl: string): Promise<number | null> {
  try {
    const response = await fetch(`${supabaseUrl}/functions/v1/search-cars`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    
    if (!response.ok) return null;
    
    const data = await response.json();
    if (data.cars && data.cars.length > 0) {
      const prices = data.cars.map((c: SearchResult) => {
        if (c.prices && c.prices.length > 0) {
          return Math.min(...c.prices.map((p) => p.price));
        }
        return c.price || 0;
      }).filter((p: number) => p > 0);
      return prices.length > 0 ? Math.min(...prices) : null;
    }
    return null;
  } catch (error) {
    console.error('Error checking car price:', error);
    return null;
  }
}

async function checkPrice(alert: PriceAlert, supabaseUrl: string): Promise<number | null> {
  switch (alert.search_type) {
    case 'hotel':
      return checkHotelPrice(alert.search_params, supabaseUrl);
    case 'flight':
      return checkFlightPrice(alert.search_params, supabaseUrl);
    case 'car':
      return checkCarPrice(alert.search_params, supabaseUrl);
    default:
      return null;
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch all active price alerts
    const { data: alerts, error: alertsError } = await supabase
      .from('price_alerts')
      .select('*')
      .eq('is_active', true);

    if (alertsError) {
      console.error('Error fetching alerts:', alertsError);
      return new Response(JSON.stringify({ error: 'Failed to fetch alerts' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!alerts || alerts.length === 0) {
      return new Response(JSON.stringify({ message: 'No active alerts to check', checked: 0 }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(`Checking ${alerts.length} active price alerts...`);

    let notificationsCreated = 0;
    let alertsChecked = 0;

    for (const alert of alerts as PriceAlert[]) {
      try {
        const currentPrice = await checkPrice(alert, supabaseUrl);
        
        if (currentPrice === null) {
          console.log(`Could not get price for alert ${alert.id}`);
          continue;
        }

        alertsChecked++;

        // Update the alert with current price and last checked timestamp
        await supabase
          .from('price_alerts')
          .update({
            current_price: currentPrice,
            last_checked_at: new Date().toISOString(),
          })
          .eq('id', alert.id);

        // Check if price dropped below target
        if (currentPrice <= alert.target_price) {
          console.log(`Price alert triggered for ${alert.item_name}: $${currentPrice} <= $${alert.target_price}`);

          // Create notification
          const { error: notifError } = await supabase
            .from('notifications')
            .insert({
              user_id: alert.user_id,
              type: 'price_drop',
              title: '🎉 Price Drop Alert!',
              message: `${alert.item_name} is now $${currentPrice} (your target: $${alert.target_price})`,
              link: `/alerts`,
            });

          if (notifError) {
            console.error('Error creating notification:', notifError);
          } else {
            notificationsCreated++;
          }

          // Mark alert as triggered
          await supabase
            .from('price_alerts')
            .update({
              triggered_at: new Date().toISOString(),
              is_active: false, // Deactivate after triggering
            })
            .eq('id', alert.id);
        }
      } catch (error) {
        console.error(`Error processing alert ${alert.id}:`, error);
      }
    }

    return new Response(
      JSON.stringify({
        message: 'Price check completed',
        totalAlerts: alerts.length,
        alertsChecked,
        notificationsCreated,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in check-price-alerts:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
