import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { Resend } from 'resend';

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

function getTypeEmoji(type: string): string {
  switch (type) {
    case 'hotel': return '🏨';
    case 'flight': return '✈️';
    case 'car': return '🚗';
    default: return '💰';
  }
}

function generateEmailHtml(alert: PriceAlert, currentPrice: number, appUrl: string): string {
  const typeEmoji = getTypeEmoji(alert.search_type);
  const savings = alert.target_price - currentPrice;
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Price Drop Alert!</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 16px 16px 0 0;">
              <div style="font-size: 48px; margin-bottom: 16px;">${typeEmoji}</div>
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">Price Drop Alert!</h1>
              <p style="margin: 8px 0 0; color: rgba(255,255,255,0.9); font-size: 16px;">Great news! The price just dropped below your target</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 24px; color: #18181b; font-size: 20px; font-weight: 600;">${alert.item_name}</h2>
              
              <!-- Price Comparison -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 20px; background-color: #f4f4f5; border-radius: 12px;">
                    <table role="presentation" style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="text-align: center; padding: 0 10px;">
                          <p style="margin: 0 0 4px; color: #71717a; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Your Target</p>
                          <p style="margin: 0; color: #18181b; font-size: 24px; font-weight: 700;">$${alert.target_price}</p>
                        </td>
                        <td style="text-align: center; padding: 0 10px;">
                          <div style="font-size: 24px;">→</div>
                        </td>
                        <td style="text-align: center; padding: 0 10px;">
                          <p style="margin: 0 0 4px; color: #71717a; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Current Price</p>
                          <p style="margin: 0; color: #10b981; font-size: 24px; font-weight: 700;">$${currentPrice}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              ${savings > 0 ? `
              <p style="margin: 0 0 24px; padding: 16px; background-color: #ecfdf5; border-radius: 8px; color: #059669; font-size: 16px; text-align: center; font-weight: 500;">
                🎉 You're saving $${savings.toFixed(2)} below your target!
              </p>
              ` : ''}
              
              <!-- CTA Button -->
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td align="center">
                    <a href="${appUrl}/alerts" style="display: inline-block; padding: 16px 32px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 600; border-radius: 8px;">
                      View Your Alerts
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; border-top: 1px solid #e4e4e7; text-align: center;">
              <p style="margin: 0 0 8px; color: #71717a; font-size: 14px;">
                You received this email because you set a price alert on GoalStays.
              </p>
              <p style="margin: 0; color: #a1a1aa; font-size: 12px;">
                To stop receiving these alerts, deactivate them in your account settings.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

async function sendPriceDropEmail(
  resend: Resend,
  userEmail: string,
  alert: PriceAlert,
  currentPrice: number,
  appUrl: string
): Promise<boolean> {
  try {
    const { error } = await resend.emails.send({
      from: 'GoalStays Alerts <onboarding@resend.dev>',
      to: [userEmail],
      subject: `🎉 Price Drop! ${alert.item_name} is now $${currentPrice}`,
      html: generateEmailHtml(alert, currentPrice, appUrl),
    });

    if (error) {
      console.error('Resend error:', error);
      return false;
    }
    
    console.log(`Email sent successfully to ${userEmail} for alert ${alert.id}`);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    const appUrl = 'https://goalstayscom.lovable.app';
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const resend = resendApiKey ? new Resend(resendApiKey) : null;

    if (!resend) {
      console.warn('RESEND_API_KEY not configured - email notifications will be skipped');
    }

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
    let emailsSent = 0;
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

          // Create in-app notification
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

          // Send email notification if Resend is configured
          if (resend) {
            // Fetch user email from auth.users
            const { data: userData, error: userError } = await supabase.auth.admin.getUserById(alert.user_id);
            
            if (userError || !userData?.user?.email) {
              console.error('Error fetching user email:', userError || 'No email found');
            } else {
              const emailSent = await sendPriceDropEmail(resend, userData.user.email, alert, currentPrice, appUrl);
              if (emailSent) {
                emailsSent++;
              }
            }
          }

          // Mark alert as triggered
          await supabase
            .from('price_alerts')
            .update({
              triggered_at: new Date().toISOString(),
              is_active: false,
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
        emailsSent,
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
