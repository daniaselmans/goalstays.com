import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface FlightSearchRequest {
  origin: string;
  destination: string;
  departDate: string;
  returnDate?: string;
  passengers: number;
  cabinClass?: string;
}

// Mock data generator for flight results
function generateMockFlights(params: FlightSearchRequest) {
  const airlines = [
    { name: 'Delta Air Lines', code: 'DL', logo: '🔺' },
    { name: 'United Airlines', code: 'UA', logo: '🌐' },
    { name: 'American Airlines', code: 'AA', logo: '🦅' },
    { name: 'JetBlue Airways', code: 'B6', logo: '💙' },
    { name: 'Southwest Airlines', code: 'WN', logo: '❤️' },
    { name: 'Alaska Airlines', code: 'AS', logo: '🏔️' },
  ];

  const platforms = ['Skyscanner', 'Kayak', 'Google Flights', 'Expedia', 'Priceline'];

  const flights = [];
  const numResults = Math.floor(Math.random() * 8) + 5;

  for (let i = 0; i < numResults; i++) {
    const airline = airlines[Math.floor(Math.random() * airlines.length)];
    const stops = Math.floor(Math.random() * 3);
    const basePrice = 150 + Math.floor(Math.random() * 500);
    const departHour = 6 + Math.floor(Math.random() * 14);
    const flightDuration = 2 + Math.floor(Math.random() * 8) + (stops * 2);
    const arrivalHour = (departHour + flightDuration) % 24;

    const prices = platforms.slice(0, 3 + Math.floor(Math.random() * 3)).map((platform) => ({
      platform,
      price: basePrice + Math.floor(Math.random() * 100) - 50,
      url: `https://${platform.toLowerCase().replace(' ', '')}.com/book`,
      cabinClass: params.cabinClass || 'economy',
    }));

    const outboundLegs = [];
    if (stops === 0) {
      outboundLegs.push({
        departure: params.origin,
        arrival: params.destination,
        departureTime: `${departHour.toString().padStart(2, '0')}:${(Math.floor(Math.random() * 60)).toString().padStart(2, '0')}`,
        arrivalTime: `${arrivalHour.toString().padStart(2, '0')}:${(Math.floor(Math.random() * 60)).toString().padStart(2, '0')}`,
        duration: `${flightDuration}h ${Math.floor(Math.random() * 60)}m`,
        airline: airline.name,
        airlineLogo: airline.logo,
        flightNumber: `${airline.code}${1000 + Math.floor(Math.random() * 9000)}`,
        aircraft: 'Boeing 737-800',
      });
    } else {
      const layoverCities = ['ORD', 'DFW', 'DEN', 'ATL', 'LAX', 'SFO'];
      const layover = layoverCities[Math.floor(Math.random() * layoverCities.length)];
      
      outboundLegs.push({
        departure: params.origin,
        arrival: layover,
        departureTime: `${departHour.toString().padStart(2, '0')}:${(Math.floor(Math.random() * 60)).toString().padStart(2, '0')}`,
        arrivalTime: `${((departHour + Math.floor(flightDuration / 2)) % 24).toString().padStart(2, '0')}:${(Math.floor(Math.random() * 60)).toString().padStart(2, '0')}`,
        duration: `${Math.floor(flightDuration / 2)}h ${Math.floor(Math.random() * 60)}m`,
        airline: airline.name,
        airlineLogo: airline.logo,
        flightNumber: `${airline.code}${1000 + Math.floor(Math.random() * 9000)}`,
        aircraft: 'Airbus A320',
      });
      
      outboundLegs.push({
        departure: layover,
        arrival: params.destination,
        departureTime: `${((departHour + Math.floor(flightDuration / 2) + 1) % 24).toString().padStart(2, '0')}:${(Math.floor(Math.random() * 60)).toString().padStart(2, '0')}`,
        arrivalTime: `${arrivalHour.toString().padStart(2, '0')}:${(Math.floor(Math.random() * 60)).toString().padStart(2, '0')}`,
        duration: `${Math.ceil(flightDuration / 2)}h ${Math.floor(Math.random() * 60)}m`,
        airline: airline.name,
        airlineLogo: airline.logo,
        flightNumber: `${airline.code}${1000 + Math.floor(Math.random() * 9000)}`,
        aircraft: 'Boeing 777',
      });
    }

    flights.push({
      id: `flight-${i}-${Date.now()}`,
      outbound: outboundLegs,
      inbound: params.returnDate ? outboundLegs.map(leg => ({
        ...leg,
        departure: leg.arrival,
        arrival: leg.departure,
        flightNumber: `${airline.code}${1000 + Math.floor(Math.random() * 9000)}`,
      })).reverse() : undefined,
      totalDuration: `${flightDuration}h ${Math.floor(Math.random() * 60)}m`,
      stops,
      prices: prices.sort((a, b) => a.price - b.price),
      lowestPrice: Math.min(...prices.map(p => p.price)),
      airlines: [airline.name],
    });
  }

  return flights.sort((a, b) => a.lowestPrice - b.lowestPrice);
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const params: FlightSearchRequest = await req.json();

    if (!params.origin || !params.destination || !params.departDate) {
      return new Response(
        JSON.stringify({ success: false, error: 'Missing required parameters' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // In production, this would call real flight APIs
    // For now, return mock data
    const flights = generateMockFlights(params);

    return new Response(
      JSON.stringify({
        success: true,
        flights,
        meta: {
          total: flights.length,
          sources: { skyscanner: Math.ceil(flights.length / 2), kayak: Math.floor(flights.length / 2) },
        },
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in search-flights:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
