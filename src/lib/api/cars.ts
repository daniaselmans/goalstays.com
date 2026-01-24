import { supabase } from "@/integrations/supabase/client";

export interface CarSearchParams {
  pickupLocation: string;
  dropoffLocation?: string;
  pickupDate: string;
  dropoffDate: string;
  pickupTime?: string;
  dropoffTime?: string;
  driverAge?: number;
}

export interface PlatformPrice {
  platform: string;
  price: number;
  originalPrice?: number;
  logo: string;
  color: string;
  url: string;
}

export interface CarResult {
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

export interface CarSearchResponse {
  success: boolean;
  cars: CarResult[];
  meta: {
    total: number;
    sources: {
      rentalcars: number;
      kayak: number;
    };
  };
}

export async function searchCars(params: CarSearchParams): Promise<CarSearchResponse> {
  const { data, error } = await supabase.functions.invoke('search-cars', {
    body: params,
  });

  if (error) {
    console.error('Error searching cars:', error);
    throw new Error('Failed to search cars');
  }

  return data;
}
