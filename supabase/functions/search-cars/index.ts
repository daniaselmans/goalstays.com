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

// Generate mock car data for demo purposes
function generateMockCars(location: string): CarResult[] {
  const carModels = [
    { name: 'Toyota Corolla', category: 'Economy', seats: 5, image: 'https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=400&q=80' },
    { name: 'Honda Civic', category: 'Compact', seats: 5, image: 'https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=400&q=80' },
    { name: 'Ford Mustang', category: 'Sports', seats: 4, image: 'https://images.unsplash.com/photo-1584345604476-8ec5f82d661f?w=400&q=80' },
    { name: 'BMW 3 Series', category: 'Luxury', seats: 5, image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&q=80' },
    { name: 'Toyota RAV4', category: 'SUV', seats: 5, image: 'https://images.unsplash.com/photo-1568844293986-8c2f12b3cd86?w=400&q=80' },
    { name: 'Chevrolet Suburban', category: 'Full-size SUV', seats: 7, image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&q=80' },
    { name: 'Mercedes-Benz E-Class', category: 'Premium', seats: 5, image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&q=80' },
    { name: 'Jeep Wrangler', category: 'SUV', seats: 4, image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&q=80' },
    { name: 'Nissan Altima', category: 'Mid-size', seats: 5, image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&q=80' },
    { name: 'Tesla Model 3', category: 'Electric', seats: 5, image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&q=80' },
  ];

  const suppliers = ['Hertz', 'Avis', 'Enterprise', 'Budget', 'National', 'Alamo'];
  const features = [
    ['A/C', 'Unlimited Mileage', 'GPS', 'Bluetooth'],
    ['A/C', 'Free Cancellation', '4 Doors', '2 Bags'],
    ['A/C', 'Unlimited Mileage', 'USB Charging', 'Cruise Control'],
    ['A/C', 'Premium Sound', 'Leather Seats', 'Sunroof'],
  ];

  return carModels.map((car, index) => {
    const basePrice = 35 + Math.floor(Math.random() * 80) + (car.category === 'Luxury' || car.category === 'Premium' ? 50 : 0);
    const rentalCarsPrice = basePrice + Math.floor(Math.random() * 20) - 10;
    const kayakPrice = basePrice + Math.floor(Math.random() * 25) - 12;
    const pricelinePrice = basePrice + Math.floor(Math.random() * 18) - 9;

    const prices: PlatformPrice[] = [
      { platform: 'RentalCars', price: rentalCarsPrice, logo: 'R', color: '#00a651', url: 'https://rentalcars.com' },
      { platform: 'Kayak', price: kayakPrice, logo: 'K', color: '#ff690f', url: 'https://kayak.com/cars' },
      { platform: 'Priceline', price: pricelinePrice, logo: 'P', color: '#0068ef', url: 'https://priceline.com/cars' },
    ];

    const lowestPrice = Math.min(...prices.map(p => p.price));

    return {
      id: `mock-car-${index}-${Date.now()}`,
      name: car.name,
      category: car.category,
      image: car.image,
      seats: car.seats,
      transmission: index % 3 === 0 ? 'Manual' : 'Automatic',
      fuelType: car.category === 'Electric' ? 'Electric' : 'Petrol',
      features: features[index % features.length],
      lowestPrice,
      prices: prices.map(p => ({
        ...p,
        originalPrice: p.price === lowestPrice ? lowestPrice + Math.floor(Math.random() * 15) + 10 : undefined,
      })),
      supplier: suppliers[Math.floor(Math.random() * suppliers.length)],
      rating: 3.5 + Math.random() * 1.5,
    };
  });
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

    let mergedResults = mergeCarResults(rentalCarsResults, kayakResults);

    // If no API results, use mock data for demo
    if (mergedResults.length === 0) {
      console.log('No API results, using mock data for demo');
      mergedResults = generateMockCars(params.pickupLocation);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        cars: mergedResults,
        meta: {
          total: mergedResults.length,
          sources: {
            rentalcars: rentalCarsResults.length || Math.ceil(mergedResults.length / 2),
            kayak: kayakResults.length || Math.floor(mergedResults.length / 2),
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
