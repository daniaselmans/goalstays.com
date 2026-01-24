const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SearchParams {
  pickupLocation: string;
  dropoffLocation?: string;
  pickupDate: string;
  dropoffDate: string;
  pickupTime?: string;
  dropoffTime?: string;
  driverAge?: number;
}

interface CarResult {
  id: string;
  name: string;
  category: string;
  image: string;
  seats: number;
  transmission: string;
  fuelType: string;
  features: string[];
  lowestPrice: number;
  prices: PlatformPrice[];
  supplier: string;
  rating?: number;
}

interface PlatformPrice {
  platform: string;
  price: number;
  originalPrice?: number;
  logo: string;
  color: string;
  url: string;
}

// Fetch from RentalCars API (via RapidAPI)
async function fetchRentalCars(params: SearchParams): Promise<CarResult[]> {
  const apiKey = Deno.env.get('RENTALCARS_API_KEY');
  if (!apiKey) {
    console.log('RentalCars API key not configured');
    return [];
  }

  try {
    // Using RapidAPI's car rental endpoint
    const response = await fetch(
      `https://priceline-com-provider.p.rapidapi.com/v1/cars/search?` +
      `pickup_location=${encodeURIComponent(params.pickupLocation)}&` +
      `pickup_date=${params.pickupDate}&dropoff_date=${params.dropoffDate}&` +
      `pickup_time=${params.pickupTime || '10:00'}&dropoff_time=${params.dropoffTime || '10:00'}&` +
      `driver_age=${params.driverAge || 30}`,
      {
        headers: {
          'X-RapidAPI-Key': apiKey,
          'X-RapidAPI-Host': 'priceline-com-provider.p.rapidapi.com',
        },
      }
    );

    if (!response.ok) {
      console.error('RentalCars API error:', response.status);
      return [];
    }

    const data = await response.json();
    
    return (data.results || data.cars || []).slice(0, 15).map((car: any, index: number) => ({
      id: `rentalcars-${car.id || index}`,
      name: car.vehicle?.name || car.name || 'Unknown Vehicle',
      category: car.vehicle?.category || car.category || 'Economy',
      image: car.vehicle?.image_url || car.image || '',
      seats: car.vehicle?.seats || car.seats || 5,
      transmission: car.vehicle?.transmission || car.transmission || 'Automatic',
      fuelType: car.vehicle?.fuel_type || car.fuel_type || 'Petrol',
      features: extractCarFeatures(car),
      price: car.rate?.price || car.price?.total || car.price || 0,
      originalPrice: car.rate?.original_price || car.price?.strikethrough,
      supplier: car.supplier?.name || car.vendor || 'RentalCars',
      rating: car.supplier?.rating || car.rating,
      url: car.booking_url || car.url || 'https://www.rentalcars.com',
    }));
  } catch (error) {
    console.error('RentalCars fetch error:', error);
    return [];
  }
}

// Fetch from Kayak-like API (via RapidAPI)
async function fetchKayak(params: SearchParams): Promise<CarResult[]> {
  const apiKey = Deno.env.get('RENTALCARS_API_KEY');
  if (!apiKey) {
    console.log('API key not configured for Kayak');
    return [];
  }

  try {
    const response = await fetch(
      `https://booking-com.p.rapidapi.com/v1/car-rental/search?` +
      `pick_up_location=${encodeURIComponent(params.pickupLocation)}&` +
      `pick_up_date=${params.pickupDate}&drop_off_date=${params.dropoffDate}&` +
      `pick_up_time=${params.pickupTime || '10:00'}&drop_off_time=${params.dropoffTime || '10:00'}&` +
      `currency=USD&locale=en-us`,
      {
        headers: {
          'X-RapidAPI-Key': apiKey,
          'X-RapidAPI-Host': 'booking-com.p.rapidapi.com',
        },
      }
    );

    if (!response.ok) {
      console.error('Kayak API error:', response.status);
      return [];
    }

    const data = await response.json();
    
    return (data.search_results || data.results || []).slice(0, 15).map((car: any, index: number) => ({
      id: `kayak-${car.vehicle_id || index}`,
      name: car.vehicle_info?.name || car.vehicle?.make_model || 'Unknown Vehicle',
      category: car.vehicle_info?.category || car.category || 'Economy',
      image: car.vehicle_info?.image_url || car.image || '',
      seats: car.vehicle_info?.seats || car.seats || 5,
      transmission: car.vehicle_info?.transmission || 'Automatic',
      fuelType: car.vehicle_info?.fuel_policy || 'Petrol',
      features: extractCarFeatures(car),
      price: car.pricing_info?.price || car.price?.amount || car.price || 0,
      originalPrice: car.pricing_info?.strikethrough_price,
      supplier: car.supplier_info?.name || car.vendor_name || 'Kayak',
      rating: car.supplier_info?.rating || car.rating,
      url: car.deeplink_url || car.url || 'https://www.kayak.com/cars',
    }));
  } catch (error) {
    console.error('Kayak fetch error:', error);
    return [];
  }
}

function extractCarFeatures(car: any): string[] {
  const features: string[] = [];
  if (car.air_conditioning || car.vehicle?.air_conditioning) features.push('A/C');
  if (car.unlimited_mileage || car.vehicle?.unlimited_mileage) features.push('Unlimited Mileage');
  if (car.free_cancellation) features.push('Free Cancellation');
  if (car.doors || car.vehicle?.doors) features.push(`${car.doors || car.vehicle?.doors} Doors`);
  if (car.bags || car.vehicle?.bags) features.push(`${car.bags || car.vehicle?.bags} Bags`);
  return features.slice(0, 5);
}

// Merge results from all platforms
function mergeCarResults(
  rentalCarsResults: any[],
  kayakResults: any[]
): CarResult[] {
  const carMap = new Map<string, CarResult>();
  
  const allResults = [
    ...rentalCarsResults.map(c => ({ ...c, platform: 'RentalCars', logo: 'R', color: '#00a651' })),
    ...kayakResults.map(c => ({ ...c, platform: 'Kayak', logo: 'K', color: '#ff690f' })),
  ];

  for (const result of allResults) {
    const normalizedName = (result.name + result.category).toLowerCase().replace(/[^a-z0-9]/g, '');
    
    if (carMap.has(normalizedName)) {
      const existing = carMap.get(normalizedName)!;
      existing.prices.push({
        platform: result.platform,
        price: Number(result.price) || 0,
        originalPrice: result.originalPrice ? Number(result.originalPrice) : undefined,
        logo: result.logo,
        color: result.color,
        url: result.url,
      });
      
      const newPrice = Number(result.price) || 0;
      if (newPrice > 0 && newPrice < existing.lowestPrice) {
        existing.lowestPrice = newPrice;
      }
    } else {
      const price = Number(result.price) || 0;
      carMap.set(normalizedName, {
        id: result.id,
        name: result.name,
        category: result.category,
        image: result.image,
        seats: result.seats,
        transmission: result.transmission,
        fuelType: result.fuelType,
        features: result.features,
        lowestPrice: price,
        prices: [{
          platform: result.platform,
          price: price,
          originalPrice: result.originalPrice ? Number(result.originalPrice) : undefined,
          logo: result.logo,
          color: result.color,
          url: result.url,
        }],
        supplier: result.supplier,
        rating: result.rating,
      });
    }
  }

  return Array.from(carMap.values())
    .filter(c => c.lowestPrice > 0)
    .sort((a, b) => a.lowestPrice - b.lowestPrice);
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const params: SearchParams = await req.json();
    
    if (!params.pickupLocation || !params.pickupDate || !params.dropoffDate) {
      return new Response(
        JSON.stringify({ error: 'Missing required parameters: pickupLocation, pickupDate, dropoffDate' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Searching cars for:', params);

    const [rentalCarsResults, kayakResults] = await Promise.all([
      fetchRentalCars(params),
      fetchKayak(params),
    ]);

    console.log(`Results: RentalCars(${rentalCarsResults.length}), Kayak(${kayakResults.length})`);

    const mergedResults = mergeCarResults(rentalCarsResults, kayakResults);

    return new Response(
      JSON.stringify({ 
        success: true, 
        cars: mergedResults,
        meta: {
          total: mergedResults.length,
          sources: {
            rentalcars: rentalCarsResults.length,
            kayak: kayakResults.length,
          }
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Search error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to search cars' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
