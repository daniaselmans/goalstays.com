import { supabase } from '@/integrations/supabase/client';

export interface FlightLeg {
  departure: string;
  arrival: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  airline: string;
  airlineLogo?: string;
  flightNumber: string;
  aircraft?: string;
}

export interface FlightPrice {
  platform: string;
  price: number;
  url: string;
  cabinClass: string;
}

export interface FlightResult {
  id: string;
  outbound: FlightLeg[];
  inbound?: FlightLeg[];
  totalDuration: string;
  stops: number;
  prices: FlightPrice[];
  lowestPrice: number;
  airlines: string[];
}

export interface FlightSearchResponse {
  success: boolean;
  flights: FlightResult[];
  meta?: {
    total: number;
    sources?: { skyscanner: number; kayak: number };
  };
  error?: string;
}

export interface FlightSearchParams {
  origin: string;
  destination: string;
  departDate: string;
  returnDate?: string;
  passengers: number;
  cabinClass?: 'economy' | 'business' | 'first';
}

export async function searchFlights(params: FlightSearchParams): Promise<FlightSearchResponse> {
  try {
    const { data, error } = await supabase.functions.invoke('search-flights', {
      body: params,
    });

    if (error) {
      console.error('Flight search error:', error);
      return { success: false, flights: [], error: error.message };
    }

    return data as FlightSearchResponse;
  } catch (err) {
    console.error('Flight search exception:', err);
    return {
      success: false,
      flights: [],
      error: err instanceof Error ? err.message : 'Unknown error',
    };
  }
}
