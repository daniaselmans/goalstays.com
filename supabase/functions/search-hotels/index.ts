const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SearchParams {
  city: string;
  country?: string;
  checkIn: string;
  checkOut: string;
  guests?: number;
  rooms?: number;
}

interface PlatformPrice {
  platform: string;
  price: number;
  originalPrice?: number;
  logo: string;
  color: string;
  url: string;
}

interface HotelResult {
  id: string;
  name: string;
  location: string;
  image: string;
  rating: number;
  reviews: number;
  stars: number;
  amenities: string[];
  lowestPrice: number;
  prices: PlatformPrice[];
  discount?: number;
  featured?: boolean;
}

// Fetch from Booking.com API
async function fetchBookingDotCom(params: SearchParams): Promise<HotelResult[]> {
  const apiKey = Deno.env.get('BOOKING_API_KEY');
  if (!apiKey) {
    console.log('Booking.com API key not configured');
    return [];
  }

  try {
    // Using RapidAPI's Booking.com endpoint
    const response = await fetch(
      `https://booking-com.p.rapidapi.com/v1/hotels/search?` +
      `dest_type=city&dest_id=${encodeURIComponent(params.city)}&` +
      `checkin_date=${params.checkIn}&checkout_date=${params.checkOut}&` +
      `adults_number=${params.guests || 2}&room_number=${params.rooms || 1}&` +
      `units=metric&filter_by_currency=USD&locale=en-us&order_by=popularity`,
      {
        headers: {
          'X-RapidAPI-Key': apiKey,
          'X-RapidAPI-Host': 'booking-com.p.rapidapi.com',
        },
      }
    );

    if (!response.ok) {
      console.error('Booking.com API error:', response.status);
      return [];
    }

    const data = await response.json();
    
    return (data.result || []).slice(0, 10).map((hotel: any) => ({
      id: `booking-${hotel.hotel_id}`,
      name: hotel.hotel_name,
      location: `${hotel.address}, ${hotel.city}`,
      image: hotel.main_photo_url?.replace('square60', 'square600') || '',
      rating: hotel.review_score / 2 || 0,
      reviews: hotel.review_nr || 0,
      stars: hotel.class || 0,
      amenities: extractAmenities(hotel),
      price: hotel.min_total_price || hotel.price_breakdown?.gross_price || 0,
      originalPrice: hotel.strikethrough_amount,
      url: hotel.url,
    }));
  } catch (error) {
    console.error('Booking.com fetch error:', error);
    return [];
  }
}

// Fetch from Hotels.com API
async function fetchHotelsDotCom(params: SearchParams): Promise<HotelResult[]> {
  const apiKey = Deno.env.get('HOTELS_COM_API_KEY');
  if (!apiKey) {
    console.log('Hotels.com API key not configured');
    return [];
  }

  try {
    const response = await fetch(
      `https://hotels-com-provider.p.rapidapi.com/v2/hotels/search?` +
      `region_id=6054439&locale=en_US&checkin_date=${params.checkIn}&` +
      `checkout_date=${params.checkOut}&adults_number=${params.guests || 2}&` +
      `domain=US&sort_order=REVIEW`,
      {
        headers: {
          'X-RapidAPI-Key': apiKey,
          'X-RapidAPI-Host': 'hotels-com-provider.p.rapidapi.com',
        },
      }
    );

    if (!response.ok) {
      console.error('Hotels.com API error:', response.status);
      return [];
    }

    const data = await response.json();
    
    return (data.properties || []).slice(0, 10).map((hotel: any) => ({
      id: `hotels-${hotel.id}`,
      name: hotel.name,
      location: hotel.neighborhood?.name || hotel.destinationInfo?.distanceFromDestination?.value || '',
      image: hotel.propertyImage?.image?.url || '',
      rating: hotel.reviews?.score / 2 || 0,
      reviews: hotel.reviews?.total || 0,
      stars: hotel.star || 0,
      amenities: (hotel.amenities || []).slice(0, 5),
      price: hotel.price?.lead?.amount || 0,
      originalPrice: hotel.price?.strikeOut?.amount,
      url: `https://www.hotels.com/ho${hotel.id}`,
    }));
  } catch (error) {
    console.error('Hotels.com fetch error:', error);
    return [];
  }
}

// Fetch from Airbnb-like API
async function fetchAirbnb(params: SearchParams): Promise<HotelResult[]> {
  const apiKey = Deno.env.get('AIRBNB_API_KEY');
  if (!apiKey) {
    console.log('Airbnb API key not configured');
    return [];
  }

  try {
    const response = await fetch(
      `https://airbnb13.p.rapidapi.com/search-location?` +
      `location=${encodeURIComponent(params.city)}&checkin=${params.checkIn}&` +
      `checkout=${params.checkOut}&adults=${params.guests || 2}&` +
      `children=0&infants=0&pets=0&page=1&currency=USD`,
      {
        headers: {
          'X-RapidAPI-Key': apiKey,
          'X-RapidAPI-Host': 'airbnb13.p.rapidapi.com',
        },
      }
    );

    if (!response.ok) {
      console.error('Airbnb API error:', response.status);
      return [];
    }

    const data = await response.json();
    
    return (data.results || []).slice(0, 10).map((listing: any) => ({
      id: `airbnb-${listing.id}`,
      name: listing.name,
      location: listing.city || params.city,
      image: listing.images?.[0] || '',
      rating: listing.rating || 0,
      reviews: listing.reviewsCount || 0,
      stars: 0, // Airbnb doesn't have star ratings
      amenities: (listing.previewAmenities || []).slice(0, 5),
      price: listing.price?.rate || listing.price?.total || 0,
      originalPrice: listing.price?.originalRate,
      url: listing.url || `https://www.airbnb.com/rooms/${listing.id}`,
    }));
  } catch (error) {
    console.error('Airbnb fetch error:', error);
    return [];
  }
}

// Fetch from Trivago API
async function fetchTrivago(params: SearchParams): Promise<HotelResult[]> {
  const apiKey = Deno.env.get('TRIVAGO_API_KEY');
  if (!apiKey) {
    console.log('Trivago API key not configured');
    return [];
  }

  try {
    // Using a hotel comparison API that aggregates Trivago-like data
    const response = await fetch(
      `https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchHotels?` +
      `geoId=187147&checkIn=${params.checkIn}&checkOut=${params.checkOut}&` +
      `adults=${params.guests || 2}&rooms=${params.rooms || 1}&` +
      `currencyCode=USD&sort=RELEVANCE`,
      {
        headers: {
          'X-RapidAPI-Key': apiKey,
          'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com',
        },
      }
    );

    if (!response.ok) {
      console.error('Trivago API error:', response.status);
      return [];
    }

    const data = await response.json();
    
    return (data.data?.data || []).slice(0, 10).map((hotel: any) => ({
      id: `trivago-${hotel.id}`,
      name: hotel.title,
      location: hotel.secondaryInfo || hotel.bubbleRating?.text || '',
      image: hotel.cardPhotos?.[0]?.sizes?.urlTemplate?.replace('{width}', '600').replace('{height}', '400') || '',
      rating: hotel.bubbleRating?.rating / 2 || 0,
      reviews: hotel.bubbleRating?.count || 0,
      stars: 0,
      amenities: [],
      price: hotel.priceForDisplay?.replace(/[^0-9.]/g, '') || 0,
      originalPrice: hotel.strikethroughPrice?.replace(/[^0-9.]/g, ''),
      url: `https://www.trivago.com/en-US/srl?search=${hotel.id}`,
    }));
  } catch (error) {
    console.error('Trivago fetch error:', error);
    return [];
  }
}

function extractAmenities(hotel: any): string[] {
  const amenities: string[] = [];
  if (hotel.has_free_parking) amenities.push('Free Parking');
  if (hotel.has_swimming_pool) amenities.push('Pool');
  if (hotel.is_free_cancellable) amenities.push('Free Cancellation');
  if (hotel.hotel_include_breakfast) amenities.push('Breakfast');
  amenities.push('Free WiFi'); // Most hotels have this
  return amenities.slice(0, 5);
}

// Merge results from all platforms
function mergeHotelResults(
  bookingResults: any[],
  hotelsResults: any[],
  airbnbResults: any[],
  trivagoResults: any[]
): HotelResult[] {
  const hotelMap = new Map<string, HotelResult>();
  
  // Process each platform's results
  const allResults = [
    ...bookingResults.map(h => ({ ...h, platform: 'Booking.com', logo: 'B', color: '#003580' })),
    ...hotelsResults.map(h => ({ ...h, platform: 'Hotels.com', logo: 'H', color: '#d32f2f' })),
    ...airbnbResults.map(h => ({ ...h, platform: 'Airbnb', logo: 'A', color: '#FF5A5F' })),
    ...trivagoResults.map(h => ({ ...h, platform: 'Trivago', logo: 'T', color: '#007faf' })),
  ];

  // Group by hotel name (normalized)
  for (const result of allResults) {
    const normalizedName = result.name.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    if (hotelMap.has(normalizedName)) {
      // Add price from this platform
      const existing = hotelMap.get(normalizedName)!;
      existing.prices.push({
        platform: result.platform,
        price: Number(result.price) || 0,
        originalPrice: result.originalPrice ? Number(result.originalPrice) : undefined,
        logo: result.logo,
        color: result.color,
        url: result.url,
      });
      
      // Update lowest price
      const newPrice = Number(result.price) || 0;
      if (newPrice > 0 && newPrice < existing.lowestPrice) {
        existing.lowestPrice = newPrice;
      }
    } else {
      // Create new hotel entry
      const price = Number(result.price) || 0;
      hotelMap.set(normalizedName, {
        id: result.id,
        name: result.name,
        location: result.location,
        image: result.image,
        rating: result.rating,
        reviews: result.reviews,
        stars: result.stars,
        amenities: result.amenities,
        lowestPrice: price,
        prices: [{
          platform: result.platform,
          price: price,
          originalPrice: result.originalPrice ? Number(result.originalPrice) : undefined,
          logo: result.logo,
          color: result.color,
          url: result.url,
        }],
        discount: result.originalPrice && result.price 
          ? Math.round((1 - Number(result.price) / Number(result.originalPrice)) * 100) 
          : undefined,
        featured: result.rating >= 4.5,
      });
    }
  }

  // Convert to array and sort by relevance
  return Array.from(hotelMap.values())
    .filter(h => h.lowestPrice > 0 && h.image)
    .sort((a, b) => {
      // Featured hotels first, then by rating
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return b.rating - a.rating;
    });
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const params: SearchParams = await req.json();
    
    if (!params.city || !params.checkIn || !params.checkOut) {
      return new Response(
        JSON.stringify({ error: 'Missing required parameters: city, checkIn, checkOut' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Searching hotels for:', params);

    // Fetch from all platforms in parallel
    const [bookingResults, hotelsResults, airbnbResults, trivagoResults] = await Promise.all([
      fetchBookingDotCom(params),
      fetchHotelsDotCom(params),
      fetchAirbnb(params),
      fetchTrivago(params),
    ]);

    console.log(`Results: Booking(${bookingResults.length}), Hotels.com(${hotelsResults.length}), Airbnb(${airbnbResults.length}), Trivago(${trivagoResults.length})`);

    // Merge and deduplicate results
    const mergedResults = mergeHotelResults(bookingResults, hotelsResults, airbnbResults, trivagoResults);

    return new Response(
      JSON.stringify({ 
        success: true, 
        hotels: mergedResults,
        meta: {
          total: mergedResults.length,
          sources: {
            booking: bookingResults.length,
            hotels: hotelsResults.length,
            airbnb: airbnbResults.length,
            trivago: trivagoResults.length,
          }
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Search error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to search hotels' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
