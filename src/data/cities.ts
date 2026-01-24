export interface City {
  id: string;
  name: string;
  country: string;
  region?: string;
  popular?: boolean;
}

export const cities: City[] = [
  // Popular destinations
  { id: 'paris-fr', name: 'Paris', country: 'France', popular: true },
  { id: 'london-uk', name: 'London', country: 'United Kingdom', popular: true },
  { id: 'new-york-us', name: 'New York', country: 'United States', region: 'New York', popular: true },
  { id: 'tokyo-jp', name: 'Tokyo', country: 'Japan', popular: true },
  { id: 'dubai-ae', name: 'Dubai', country: 'United Arab Emirates', popular: true },
  { id: 'rome-it', name: 'Rome', country: 'Italy', popular: true },
  { id: 'barcelona-es', name: 'Barcelona', country: 'Spain', popular: true },
  { id: 'amsterdam-nl', name: 'Amsterdam', country: 'Netherlands', popular: true },
  
  // Europe
  { id: 'berlin-de', name: 'Berlin', country: 'Germany' },
  { id: 'madrid-es', name: 'Madrid', country: 'Spain' },
  { id: 'vienna-at', name: 'Vienna', country: 'Austria' },
  { id: 'prague-cz', name: 'Prague', country: 'Czech Republic' },
  { id: 'lisbon-pt', name: 'Lisbon', country: 'Portugal' },
  { id: 'brussels-be', name: 'Brussels', country: 'Belgium' },
  { id: 'munich-de', name: 'Munich', country: 'Germany' },
  { id: 'milan-it', name: 'Milan', country: 'Italy' },
  { id: 'florence-it', name: 'Florence', country: 'Italy' },
  { id: 'venice-it', name: 'Venice', country: 'Italy' },
  { id: 'dublin-ie', name: 'Dublin', country: 'Ireland' },
  { id: 'zurich-ch', name: 'Zurich', country: 'Switzerland' },
  { id: 'geneva-ch', name: 'Geneva', country: 'Switzerland' },
  { id: 'copenhagen-dk', name: 'Copenhagen', country: 'Denmark' },
  { id: 'stockholm-se', name: 'Stockholm', country: 'Sweden' },
  { id: 'oslo-no', name: 'Oslo', country: 'Norway' },
  { id: 'helsinki-fi', name: 'Helsinki', country: 'Finland' },
  { id: 'athens-gr', name: 'Athens', country: 'Greece' },
  { id: 'budapest-hu', name: 'Budapest', country: 'Hungary' },
  { id: 'warsaw-pl', name: 'Warsaw', country: 'Poland' },
  { id: 'krakow-pl', name: 'Krakow', country: 'Poland' },
  
  // Americas
  { id: 'los-angeles-us', name: 'Los Angeles', country: 'United States', region: 'California' },
  { id: 'san-francisco-us', name: 'San Francisco', country: 'United States', region: 'California' },
  { id: 'miami-us', name: 'Miami', country: 'United States', region: 'Florida' },
  { id: 'las-vegas-us', name: 'Las Vegas', country: 'United States', region: 'Nevada' },
  { id: 'chicago-us', name: 'Chicago', country: 'United States', region: 'Illinois' },
  { id: 'boston-us', name: 'Boston', country: 'United States', region: 'Massachusetts' },
  { id: 'washington-us', name: 'Washington D.C.', country: 'United States' },
  { id: 'toronto-ca', name: 'Toronto', country: 'Canada' },
  { id: 'vancouver-ca', name: 'Vancouver', country: 'Canada' },
  { id: 'montreal-ca', name: 'Montreal', country: 'Canada' },
  { id: 'mexico-city-mx', name: 'Mexico City', country: 'Mexico' },
  { id: 'cancun-mx', name: 'Cancun', country: 'Mexico' },
  { id: 'rio-de-janeiro-br', name: 'Rio de Janeiro', country: 'Brazil' },
  { id: 'sao-paulo-br', name: 'São Paulo', country: 'Brazil' },
  { id: 'buenos-aires-ar', name: 'Buenos Aires', country: 'Argentina' },
  
  // Asia
  { id: 'singapore-sg', name: 'Singapore', country: 'Singapore', popular: true },
  { id: 'hong-kong-hk', name: 'Hong Kong', country: 'China' },
  { id: 'bangkok-th', name: 'Bangkok', country: 'Thailand', popular: true },
  { id: 'seoul-kr', name: 'Seoul', country: 'South Korea' },
  { id: 'osaka-jp', name: 'Osaka', country: 'Japan' },
  { id: 'kyoto-jp', name: 'Kyoto', country: 'Japan' },
  { id: 'beijing-cn', name: 'Beijing', country: 'China' },
  { id: 'shanghai-cn', name: 'Shanghai', country: 'China' },
  { id: 'mumbai-in', name: 'Mumbai', country: 'India' },
  { id: 'delhi-in', name: 'New Delhi', country: 'India' },
  { id: 'bali-id', name: 'Bali', country: 'Indonesia', popular: true },
  { id: 'phuket-th', name: 'Phuket', country: 'Thailand' },
  { id: 'kuala-lumpur-my', name: 'Kuala Lumpur', country: 'Malaysia' },
  
  // Middle East & Africa
  { id: 'abu-dhabi-ae', name: 'Abu Dhabi', country: 'United Arab Emirates' },
  { id: 'doha-qa', name: 'Doha', country: 'Qatar' },
  { id: 'istanbul-tr', name: 'Istanbul', country: 'Turkey', popular: true },
  { id: 'marrakech-ma', name: 'Marrakech', country: 'Morocco' },
  { id: 'cape-town-za', name: 'Cape Town', country: 'South Africa' },
  { id: 'cairo-eg', name: 'Cairo', country: 'Egypt' },
  
  // Oceania
  { id: 'sydney-au', name: 'Sydney', country: 'Australia', popular: true },
  { id: 'melbourne-au', name: 'Melbourne', country: 'Australia' },
  { id: 'auckland-nz', name: 'Auckland', country: 'New Zealand' },
  { id: 'queenstown-nz', name: 'Queenstown', country: 'New Zealand' },
];

export function searchCities(query: string): City[] {
  if (!query.trim()) {
    return cities.filter(city => city.popular).slice(0, 8);
  }
  
  const lowerQuery = query.toLowerCase();
  
  return cities
    .filter(city => 
      city.name.toLowerCase().includes(lowerQuery) ||
      city.country.toLowerCase().includes(lowerQuery) ||
      (city.region && city.region.toLowerCase().includes(lowerQuery))
    )
    .sort((a, b) => {
      // Exact match first
      const aExact = a.name.toLowerCase().startsWith(lowerQuery);
      const bExact = b.name.toLowerCase().startsWith(lowerQuery);
      if (aExact && !bExact) return -1;
      if (!aExact && bExact) return 1;
      
      // Popular cities next
      if (a.popular && !b.popular) return -1;
      if (!a.popular && b.popular) return 1;
      
      return a.name.localeCompare(b.name);
    })
    .slice(0, 8);
}
