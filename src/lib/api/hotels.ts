import { supabase } from '@/integrations/supabase/client';

export interface PlatformPrice {
  platform: string;
  price: number;
  originalPrice?: number;
  logo: string;
  color: string;
  url: string;
}

export interface Hotel {
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

export interface SearchParams {
  city: string;
  country?: string;
  checkIn: string;
  checkOut: string;
  guests?: number;
  rooms?: number;
}

export interface SearchResponse {
  success: boolean;
  hotels: Hotel[];
  meta?: {
    total: number;
    sources: {
      booking: number;
      hotels: number;
      airbnb: number;
      trivago: number;
    };
  };
  error?: string;
}

export async function searchHotels(params: SearchParams): Promise<SearchResponse> {
  try {
    const { data, error } = await supabase.functions.invoke('search-hotels', {
      body: params,
    });

    if (error) {
      console.error('Search hotels error:', error);
      return { success: false, hotels: [], error: error.message };
    }

    return data as SearchResponse;
  } catch (error) {
    console.error('Search hotels error:', error);
    return { 
      success: false, 
      hotels: [], 
      error: error instanceof Error ? error.message : 'Failed to search hotels' 
    };
  }
}
