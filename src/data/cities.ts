export interface City {
  id: string;
  name: string;
  country: string;
  region?: string;
  popular?: boolean;
}

export const cities: City[] = [
  // ===== POPULAR DESTINATIONS =====
  { id: 'paris-fr', name: 'Paris', country: 'France', popular: true },
  { id: 'london-uk', name: 'London', country: 'United Kingdom', popular: true },
  { id: 'new-york-us', name: 'New York', country: 'United States', region: 'New York', popular: true },
  { id: 'tokyo-jp', name: 'Tokyo', country: 'Japan', popular: true },
  { id: 'dubai-ae', name: 'Dubai', country: 'United Arab Emirates', popular: true },
  { id: 'rome-it', name: 'Rome', country: 'Italy', popular: true },
  { id: 'barcelona-es', name: 'Barcelona', country: 'Spain', popular: true },
  { id: 'amsterdam-nl', name: 'Amsterdam', country: 'Netherlands', popular: true },
  { id: 'singapore-sg', name: 'Singapore', country: 'Singapore', popular: true },
  { id: 'bangkok-th', name: 'Bangkok', country: 'Thailand', popular: true },
  { id: 'istanbul-tr', name: 'Istanbul', country: 'Turkey', popular: true },
  { id: 'sydney-au', name: 'Sydney', country: 'Australia', popular: true },
  { id: 'bali-id', name: 'Bali', country: 'Indonesia', popular: true },

  // ===== EUROPE =====
  // France
  { id: 'nice-fr', name: 'Nice', country: 'France' },
  { id: 'lyon-fr', name: 'Lyon', country: 'France' },
  { id: 'marseille-fr', name: 'Marseille', country: 'France' },
  { id: 'bordeaux-fr', name: 'Bordeaux', country: 'France' },
  { id: 'toulouse-fr', name: 'Toulouse', country: 'France' },
  { id: 'strasbourg-fr', name: 'Strasbourg', country: 'France' },
  { id: 'cannes-fr', name: 'Cannes', country: 'France' },
  { id: 'monaco-mc', name: 'Monaco', country: 'Monaco' },

  // United Kingdom
  { id: 'manchester-uk', name: 'Manchester', country: 'United Kingdom' },
  { id: 'edinburgh-uk', name: 'Edinburgh', country: 'United Kingdom', region: 'Scotland' },
  { id: 'glasgow-uk', name: 'Glasgow', country: 'United Kingdom', region: 'Scotland' },
  { id: 'birmingham-uk', name: 'Birmingham', country: 'United Kingdom' },
  { id: 'liverpool-uk', name: 'Liverpool', country: 'United Kingdom' },
  { id: 'bristol-uk', name: 'Bristol', country: 'United Kingdom' },
  { id: 'oxford-uk', name: 'Oxford', country: 'United Kingdom' },
  { id: 'cambridge-uk', name: 'Cambridge', country: 'United Kingdom' },
  { id: 'bath-uk', name: 'Bath', country: 'United Kingdom' },
  { id: 'belfast-uk', name: 'Belfast', country: 'United Kingdom', region: 'Northern Ireland' },
  { id: 'cardiff-uk', name: 'Cardiff', country: 'United Kingdom', region: 'Wales' },

  // Germany
  { id: 'berlin-de', name: 'Berlin', country: 'Germany' },
  { id: 'munich-de', name: 'Munich', country: 'Germany' },
  { id: 'frankfurt-de', name: 'Frankfurt', country: 'Germany' },
  { id: 'hamburg-de', name: 'Hamburg', country: 'Germany' },
  { id: 'cologne-de', name: 'Cologne', country: 'Germany' },
  { id: 'dusseldorf-de', name: 'Düsseldorf', country: 'Germany' },
  { id: 'stuttgart-de', name: 'Stuttgart', country: 'Germany' },
  { id: 'dresden-de', name: 'Dresden', country: 'Germany' },
  { id: 'leipzig-de', name: 'Leipzig', country: 'Germany' },
  { id: 'nuremberg-de', name: 'Nuremberg', country: 'Germany' },
  { id: 'heidelberg-de', name: 'Heidelberg', country: 'Germany' },

  // Italy
  { id: 'milan-it', name: 'Milan', country: 'Italy' },
  { id: 'florence-it', name: 'Florence', country: 'Italy' },
  { id: 'venice-it', name: 'Venice', country: 'Italy' },
  { id: 'naples-it', name: 'Naples', country: 'Italy' },
  { id: 'turin-it', name: 'Turin', country: 'Italy' },
  { id: 'bologna-it', name: 'Bologna', country: 'Italy' },
  { id: 'verona-it', name: 'Verona', country: 'Italy' },
  { id: 'genoa-it', name: 'Genoa', country: 'Italy' },
  { id: 'palermo-it', name: 'Palermo', country: 'Italy', region: 'Sicily' },
  { id: 'catania-it', name: 'Catania', country: 'Italy', region: 'Sicily' },
  { id: 'amalfi-it', name: 'Amalfi', country: 'Italy' },
  { id: 'positano-it', name: 'Positano', country: 'Italy' },
  { id: 'cinque-terre-it', name: 'Cinque Terre', country: 'Italy' },
  { id: 'sardinia-it', name: 'Sardinia', country: 'Italy' },

  // Spain
  { id: 'madrid-es', name: 'Madrid', country: 'Spain' },
  { id: 'seville-es', name: 'Seville', country: 'Spain' },
  { id: 'valencia-es', name: 'Valencia', country: 'Spain' },
  { id: 'malaga-es', name: 'Málaga', country: 'Spain' },
  { id: 'granada-es', name: 'Granada', country: 'Spain' },
  { id: 'bilbao-es', name: 'Bilbao', country: 'Spain' },
  { id: 'san-sebastian-es', name: 'San Sebastián', country: 'Spain' },
  { id: 'ibiza-es', name: 'Ibiza', country: 'Spain' },
  { id: 'mallorca-es', name: 'Mallorca', country: 'Spain' },
  { id: 'tenerife-es', name: 'Tenerife', country: 'Spain', region: 'Canary Islands' },
  { id: 'gran-canaria-es', name: 'Gran Canaria', country: 'Spain', region: 'Canary Islands' },
  { id: 'cordoba-es', name: 'Córdoba', country: 'Spain' },
  { id: 'toledo-es', name: 'Toledo', country: 'Spain' },

  // Portugal
  { id: 'lisbon-pt', name: 'Lisbon', country: 'Portugal' },
  { id: 'porto-pt', name: 'Porto', country: 'Portugal' },
  { id: 'faro-pt', name: 'Faro', country: 'Portugal', region: 'Algarve' },
  { id: 'madeira-pt', name: 'Madeira', country: 'Portugal' },
  { id: 'azores-pt', name: 'Azores', country: 'Portugal' },
  { id: 'sintra-pt', name: 'Sintra', country: 'Portugal' },
  { id: 'cascais-pt', name: 'Cascais', country: 'Portugal' },

  // Netherlands
  { id: 'rotterdam-nl', name: 'Rotterdam', country: 'Netherlands' },
  { id: 'the-hague-nl', name: 'The Hague', country: 'Netherlands' },
  { id: 'utrecht-nl', name: 'Utrecht', country: 'Netherlands' },
  { id: 'eindhoven-nl', name: 'Eindhoven', country: 'Netherlands' },
  { id: 'maastricht-nl', name: 'Maastricht', country: 'Netherlands' },

  // Belgium
  { id: 'brussels-be', name: 'Brussels', country: 'Belgium' },
  { id: 'bruges-be', name: 'Bruges', country: 'Belgium' },
  { id: 'ghent-be', name: 'Ghent', country: 'Belgium' },
  { id: 'antwerp-be', name: 'Antwerp', country: 'Belgium' },
  { id: 'liege-be', name: 'Liège', country: 'Belgium' },

  // Switzerland
  { id: 'zurich-ch', name: 'Zurich', country: 'Switzerland' },
  { id: 'geneva-ch', name: 'Geneva', country: 'Switzerland' },
  { id: 'bern-ch', name: 'Bern', country: 'Switzerland' },
  { id: 'basel-ch', name: 'Basel', country: 'Switzerland' },
  { id: 'lucerne-ch', name: 'Lucerne', country: 'Switzerland' },
  { id: 'interlaken-ch', name: 'Interlaken', country: 'Switzerland' },
  { id: 'zermatt-ch', name: 'Zermatt', country: 'Switzerland' },
  { id: 'lausanne-ch', name: 'Lausanne', country: 'Switzerland' },
  { id: 'st-moritz-ch', name: 'St. Moritz', country: 'Switzerland' },

  // Austria
  { id: 'vienna-at', name: 'Vienna', country: 'Austria' },
  { id: 'salzburg-at', name: 'Salzburg', country: 'Austria' },
  { id: 'innsbruck-at', name: 'Innsbruck', country: 'Austria' },
  { id: 'graz-at', name: 'Graz', country: 'Austria' },
  { id: 'hallstatt-at', name: 'Hallstatt', country: 'Austria' },

  // Scandinavia
  { id: 'copenhagen-dk', name: 'Copenhagen', country: 'Denmark' },
  { id: 'aarhus-dk', name: 'Aarhus', country: 'Denmark' },
  { id: 'stockholm-se', name: 'Stockholm', country: 'Sweden' },
  { id: 'gothenburg-se', name: 'Gothenburg', country: 'Sweden' },
  { id: 'malmo-se', name: 'Malmö', country: 'Sweden' },
  { id: 'oslo-no', name: 'Oslo', country: 'Norway' },
  { id: 'bergen-no', name: 'Bergen', country: 'Norway' },
  { id: 'tromso-no', name: 'Tromsø', country: 'Norway' },
  { id: 'helsinki-fi', name: 'Helsinki', country: 'Finland' },
  { id: 'turku-fi', name: 'Turku', country: 'Finland' },
  { id: 'rovaniemi-fi', name: 'Rovaniemi', country: 'Finland' },
  { id: 'reykjavik-is', name: 'Reykjavik', country: 'Iceland' },

  // Eastern Europe
  { id: 'prague-cz', name: 'Prague', country: 'Czech Republic' },
  { id: 'brno-cz', name: 'Brno', country: 'Czech Republic' },
  { id: 'cesky-krumlov-cz', name: 'Český Krumlov', country: 'Czech Republic' },
  { id: 'budapest-hu', name: 'Budapest', country: 'Hungary' },
  { id: 'warsaw-pl', name: 'Warsaw', country: 'Poland' },
  { id: 'krakow-pl', name: 'Krakow', country: 'Poland' },
  { id: 'gdansk-pl', name: 'Gdańsk', country: 'Poland' },
  { id: 'wroclaw-pl', name: 'Wrocław', country: 'Poland' },
  { id: 'bratislava-sk', name: 'Bratislava', country: 'Slovakia' },
  { id: 'bucharest-ro', name: 'Bucharest', country: 'Romania' },
  { id: 'cluj-napoca-ro', name: 'Cluj-Napoca', country: 'Romania' },
  { id: 'brasov-ro', name: 'Brașov', country: 'Romania' },
  { id: 'sofia-bg', name: 'Sofia', country: 'Bulgaria' },
  { id: 'plovdiv-bg', name: 'Plovdiv', country: 'Bulgaria' },
  { id: 'varna-bg', name: 'Varna', country: 'Bulgaria' },

  // Balkans
  { id: 'zagreb-hr', name: 'Zagreb', country: 'Croatia' },
  { id: 'dubrovnik-hr', name: 'Dubrovnik', country: 'Croatia' },
  { id: 'split-hr', name: 'Split', country: 'Croatia' },
  { id: 'pula-hr', name: 'Pula', country: 'Croatia' },
  { id: 'ljubljana-si', name: 'Ljubljana', country: 'Slovenia' },
  { id: 'bled-si', name: 'Bled', country: 'Slovenia' },
  { id: 'belgrade-rs', name: 'Belgrade', country: 'Serbia' },
  { id: 'sarajevo-ba', name: 'Sarajevo', country: 'Bosnia and Herzegovina' },
  { id: 'mostar-ba', name: 'Mostar', country: 'Bosnia and Herzegovina' },
  { id: 'podgorica-me', name: 'Podgorica', country: 'Montenegro' },
  { id: 'kotor-me', name: 'Kotor', country: 'Montenegro' },
  { id: 'budva-me', name: 'Budva', country: 'Montenegro' },
  { id: 'tirana-al', name: 'Tirana', country: 'Albania' },
  { id: 'skopje-mk', name: 'Skopje', country: 'North Macedonia' },

  // Greece
  { id: 'athens-gr', name: 'Athens', country: 'Greece' },
  { id: 'thessaloniki-gr', name: 'Thessaloniki', country: 'Greece' },
  { id: 'santorini-gr', name: 'Santorini', country: 'Greece' },
  { id: 'mykonos-gr', name: 'Mykonos', country: 'Greece' },
  { id: 'crete-gr', name: 'Crete', country: 'Greece' },
  { id: 'rhodes-gr', name: 'Rhodes', country: 'Greece' },
  { id: 'corfu-gr', name: 'Corfu', country: 'Greece' },
  { id: 'zakynthos-gr', name: 'Zakynthos', country: 'Greece' },
  { id: 'naxos-gr', name: 'Naxos', country: 'Greece' },
  { id: 'paros-gr', name: 'Paros', country: 'Greece' },

  // Cyprus & Malta
  { id: 'nicosia-cy', name: 'Nicosia', country: 'Cyprus' },
  { id: 'limassol-cy', name: 'Limassol', country: 'Cyprus' },
  { id: 'paphos-cy', name: 'Paphos', country: 'Cyprus' },
  { id: 'ayia-napa-cy', name: 'Ayia Napa', country: 'Cyprus' },
  { id: 'valletta-mt', name: 'Valletta', country: 'Malta' },
  { id: 'sliema-mt', name: 'Sliema', country: 'Malta' },
  { id: 'gozo-mt', name: 'Gozo', country: 'Malta' },

  // Ireland
  { id: 'dublin-ie', name: 'Dublin', country: 'Ireland' },
  { id: 'cork-ie', name: 'Cork', country: 'Ireland' },
  { id: 'galway-ie', name: 'Galway', country: 'Ireland' },
  { id: 'limerick-ie', name: 'Limerick', country: 'Ireland' },
  { id: 'killarney-ie', name: 'Killarney', country: 'Ireland' },

  // Baltic States
  { id: 'tallinn-ee', name: 'Tallinn', country: 'Estonia' },
  { id: 'tartu-ee', name: 'Tartu', country: 'Estonia' },
  { id: 'riga-lv', name: 'Riga', country: 'Latvia' },
  { id: 'vilnius-lt', name: 'Vilnius', country: 'Lithuania' },
  { id: 'kaunas-lt', name: 'Kaunas', country: 'Lithuania' },

  // Russia & Ukraine
  { id: 'moscow-ru', name: 'Moscow', country: 'Russia' },
  { id: 'st-petersburg-ru', name: 'Saint Petersburg', country: 'Russia' },
  { id: 'sochi-ru', name: 'Sochi', country: 'Russia' },
  { id: 'kazan-ru', name: 'Kazan', country: 'Russia' },
  { id: 'kyiv-ua', name: 'Kyiv', country: 'Ukraine' },
  { id: 'lviv-ua', name: 'Lviv', country: 'Ukraine' },
  { id: 'odesa-ua', name: 'Odesa', country: 'Ukraine' },

  // Luxembourg
  { id: 'luxembourg-lu', name: 'Luxembourg City', country: 'Luxembourg' },

  // ===== NORTH AMERICA =====
  // USA - Major Cities
  { id: 'los-angeles-us', name: 'Los Angeles', country: 'United States', region: 'California' },
  { id: 'san-francisco-us', name: 'San Francisco', country: 'United States', region: 'California' },
  { id: 'san-diego-us', name: 'San Diego', country: 'United States', region: 'California' },
  { id: 'miami-us', name: 'Miami', country: 'United States', region: 'Florida' },
  { id: 'orlando-us', name: 'Orlando', country: 'United States', region: 'Florida' },
  { id: 'tampa-us', name: 'Tampa', country: 'United States', region: 'Florida' },
  { id: 'fort-lauderdale-us', name: 'Fort Lauderdale', country: 'United States', region: 'Florida' },
  { id: 'key-west-us', name: 'Key West', country: 'United States', region: 'Florida' },
  { id: 'las-vegas-us', name: 'Las Vegas', country: 'United States', region: 'Nevada' },
  { id: 'chicago-us', name: 'Chicago', country: 'United States', region: 'Illinois' },
  { id: 'boston-us', name: 'Boston', country: 'United States', region: 'Massachusetts' },
  { id: 'washington-us', name: 'Washington D.C.', country: 'United States' },
  { id: 'seattle-us', name: 'Seattle', country: 'United States', region: 'Washington' },
  { id: 'portland-us', name: 'Portland', country: 'United States', region: 'Oregon' },
  { id: 'denver-us', name: 'Denver', country: 'United States', region: 'Colorado' },
  { id: 'phoenix-us', name: 'Phoenix', country: 'United States', region: 'Arizona' },
  { id: 'scottsdale-us', name: 'Scottsdale', country: 'United States', region: 'Arizona' },
  { id: 'sedona-us', name: 'Sedona', country: 'United States', region: 'Arizona' },
  { id: 'austin-us', name: 'Austin', country: 'United States', region: 'Texas' },
  { id: 'houston-us', name: 'Houston', country: 'United States', region: 'Texas' },
  { id: 'dallas-us', name: 'Dallas', country: 'United States', region: 'Texas' },
  { id: 'san-antonio-us', name: 'San Antonio', country: 'United States', region: 'Texas' },
  { id: 'new-orleans-us', name: 'New Orleans', country: 'United States', region: 'Louisiana' },
  { id: 'nashville-us', name: 'Nashville', country: 'United States', region: 'Tennessee' },
  { id: 'memphis-us', name: 'Memphis', country: 'United States', region: 'Tennessee' },
  { id: 'atlanta-us', name: 'Atlanta', country: 'United States', region: 'Georgia' },
  { id: 'savannah-us', name: 'Savannah', country: 'United States', region: 'Georgia' },
  { id: 'charleston-us', name: 'Charleston', country: 'United States', region: 'South Carolina' },
  { id: 'philadelphia-us', name: 'Philadelphia', country: 'United States', region: 'Pennsylvania' },
  { id: 'pittsburgh-us', name: 'Pittsburgh', country: 'United States', region: 'Pennsylvania' },
  { id: 'baltimore-us', name: 'Baltimore', country: 'United States', region: 'Maryland' },
  { id: 'detroit-us', name: 'Detroit', country: 'United States', region: 'Michigan' },
  { id: 'minneapolis-us', name: 'Minneapolis', country: 'United States', region: 'Minnesota' },
  { id: 'salt-lake-city-us', name: 'Salt Lake City', country: 'United States', region: 'Utah' },
  { id: 'park-city-us', name: 'Park City', country: 'United States', region: 'Utah' },
  { id: 'aspen-us', name: 'Aspen', country: 'United States', region: 'Colorado' },
  { id: 'vail-us', name: 'Vail', country: 'United States', region: 'Colorado' },
  { id: 'honolulu-us', name: 'Honolulu', country: 'United States', region: 'Hawaii' },
  { id: 'maui-us', name: 'Maui', country: 'United States', region: 'Hawaii' },
  { id: 'kauai-us', name: 'Kauai', country: 'United States', region: 'Hawaii' },
  { id: 'big-island-us', name: 'Big Island', country: 'United States', region: 'Hawaii' },
  { id: 'anchorage-us', name: 'Anchorage', country: 'United States', region: 'Alaska' },
  { id: 'napa-valley-us', name: 'Napa Valley', country: 'United States', region: 'California' },
  { id: 'santa-barbara-us', name: 'Santa Barbara', country: 'United States', region: 'California' },
  { id: 'monterey-us', name: 'Monterey', country: 'United States', region: 'California' },
  { id: 'palm-springs-us', name: 'Palm Springs', country: 'United States', region: 'California' },

  // Canada
  { id: 'toronto-ca', name: 'Toronto', country: 'Canada', region: 'Ontario' },
  { id: 'vancouver-ca', name: 'Vancouver', country: 'Canada', region: 'British Columbia' },
  { id: 'montreal-ca', name: 'Montreal', country: 'Canada', region: 'Quebec' },
  { id: 'quebec-city-ca', name: 'Quebec City', country: 'Canada', region: 'Quebec' },
  { id: 'ottawa-ca', name: 'Ottawa', country: 'Canada', region: 'Ontario' },
  { id: 'calgary-ca', name: 'Calgary', country: 'Canada', region: 'Alberta' },
  { id: 'edmonton-ca', name: 'Edmonton', country: 'Canada', region: 'Alberta' },
  { id: 'winnipeg-ca', name: 'Winnipeg', country: 'Canada', region: 'Manitoba' },
  { id: 'halifax-ca', name: 'Halifax', country: 'Canada', region: 'Nova Scotia' },
  { id: 'victoria-ca', name: 'Victoria', country: 'Canada', region: 'British Columbia' },
  { id: 'whistler-ca', name: 'Whistler', country: 'Canada', region: 'British Columbia' },
  { id: 'banff-ca', name: 'Banff', country: 'Canada', region: 'Alberta' },
  { id: 'jasper-ca', name: 'Jasper', country: 'Canada', region: 'Alberta' },
  { id: 'niagara-falls-ca', name: 'Niagara Falls', country: 'Canada', region: 'Ontario' },

  // Mexico
  { id: 'mexico-city-mx', name: 'Mexico City', country: 'Mexico' },
  { id: 'cancun-mx', name: 'Cancun', country: 'Mexico', region: 'Quintana Roo' },
  { id: 'playa-del-carmen-mx', name: 'Playa del Carmen', country: 'Mexico', region: 'Quintana Roo' },
  { id: 'tulum-mx', name: 'Tulum', country: 'Mexico', region: 'Quintana Roo' },
  { id: 'cozumel-mx', name: 'Cozumel', country: 'Mexico', region: 'Quintana Roo' },
  { id: 'los-cabos-mx', name: 'Los Cabos', country: 'Mexico', region: 'Baja California Sur' },
  { id: 'puerto-vallarta-mx', name: 'Puerto Vallarta', country: 'Mexico', region: 'Jalisco' },
  { id: 'guadalajara-mx', name: 'Guadalajara', country: 'Mexico', region: 'Jalisco' },
  { id: 'oaxaca-mx', name: 'Oaxaca', country: 'Mexico' },
  { id: 'san-miguel-de-allende-mx', name: 'San Miguel de Allende', country: 'Mexico' },
  { id: 'merida-mx', name: 'Mérida', country: 'Mexico', region: 'Yucatán' },
  { id: 'monterrey-mx', name: 'Monterrey', country: 'Mexico' },

  // Central America
  { id: 'guatemala-city-gt', name: 'Guatemala City', country: 'Guatemala' },
  { id: 'antigua-gt', name: 'Antigua', country: 'Guatemala' },
  { id: 'belize-city-bz', name: 'Belize City', country: 'Belize' },
  { id: 'san-pedro-bz', name: 'San Pedro', country: 'Belize' },
  { id: 'san-salvador-sv', name: 'San Salvador', country: 'El Salvador' },
  { id: 'tegucigalpa-hn', name: 'Tegucigalpa', country: 'Honduras' },
  { id: 'roatan-hn', name: 'Roatán', country: 'Honduras' },
  { id: 'managua-ni', name: 'Managua', country: 'Nicaragua' },
  { id: 'granada-ni', name: 'Granada', country: 'Nicaragua' },
  { id: 'san-jose-cr', name: 'San José', country: 'Costa Rica' },
  { id: 'manuel-antonio-cr', name: 'Manuel Antonio', country: 'Costa Rica' },
  { id: 'tamarindo-cr', name: 'Tamarindo', country: 'Costa Rica' },
  { id: 'monteverde-cr', name: 'Monteverde', country: 'Costa Rica' },
  { id: 'la-fortuna-cr', name: 'La Fortuna', country: 'Costa Rica' },
  { id: 'panama-city-pa', name: 'Panama City', country: 'Panama' },
  { id: 'bocas-del-toro-pa', name: 'Bocas del Toro', country: 'Panama' },

  // Caribbean
  { id: 'havana-cu', name: 'Havana', country: 'Cuba' },
  { id: 'varadero-cu', name: 'Varadero', country: 'Cuba' },
  { id: 'kingston-jm', name: 'Kingston', country: 'Jamaica' },
  { id: 'montego-bay-jm', name: 'Montego Bay', country: 'Jamaica' },
  { id: 'negril-jm', name: 'Negril', country: 'Jamaica' },
  { id: 'ocho-rios-jm', name: 'Ocho Rios', country: 'Jamaica' },
  { id: 'santo-domingo-do', name: 'Santo Domingo', country: 'Dominican Republic' },
  { id: 'punta-cana-do', name: 'Punta Cana', country: 'Dominican Republic' },
  { id: 'puerto-plata-do', name: 'Puerto Plata', country: 'Dominican Republic' },
  { id: 'san-juan-pr', name: 'San Juan', country: 'Puerto Rico' },
  { id: 'nassau-bs', name: 'Nassau', country: 'Bahamas' },
  { id: 'freeport-bs', name: 'Freeport', country: 'Bahamas' },
  { id: 'exuma-bs', name: 'Exuma', country: 'Bahamas' },
  { id: 'bridgetown-bb', name: 'Bridgetown', country: 'Barbados' },
  { id: 'oranjestad-aw', name: 'Oranjestad', country: 'Aruba' },
  { id: 'willemstad-cw', name: 'Willemstad', country: 'Curaçao' },
  { id: 'philipsburg-sx', name: 'Philipsburg', country: 'Sint Maarten' },
  { id: 'st-thomas-vi', name: 'St. Thomas', country: 'US Virgin Islands' },
  { id: 'st-john-vi', name: 'St. John', country: 'US Virgin Islands' },
  { id: 'road-town-vg', name: 'Road Town', country: 'British Virgin Islands' },
  { id: 'grand-cayman-ky', name: 'Grand Cayman', country: 'Cayman Islands' },
  { id: 'port-of-spain-tt', name: 'Port of Spain', country: 'Trinidad and Tobago' },
  { id: 'castries-lc', name: 'Castries', country: 'Saint Lucia' },
  { id: 'st-georges-gd', name: "St. George's", country: 'Grenada' },
  { id: 'kingstown-vc', name: 'Kingstown', country: 'Saint Vincent and the Grenadines' },
  { id: 'antigua-ag', name: 'St. John\'s', country: 'Antigua and Barbuda' },
  { id: 'basseterre-kn', name: 'Basseterre', country: 'Saint Kitts and Nevis' },
  { id: 'hamilton-bm', name: 'Hamilton', country: 'Bermuda' },
  { id: 'turks-caicos-tc', name: 'Providenciales', country: 'Turks and Caicos Islands' },

  // ===== SOUTH AMERICA =====
  // Brazil
  { id: 'rio-de-janeiro-br', name: 'Rio de Janeiro', country: 'Brazil' },
  { id: 'sao-paulo-br', name: 'São Paulo', country: 'Brazil' },
  { id: 'salvador-br', name: 'Salvador', country: 'Brazil' },
  { id: 'florianopolis-br', name: 'Florianópolis', country: 'Brazil' },
  { id: 'fortaleza-br', name: 'Fortaleza', country: 'Brazil' },
  { id: 'recife-br', name: 'Recife', country: 'Brazil' },
  { id: 'brasilia-br', name: 'Brasília', country: 'Brazil' },
  { id: 'belo-horizonte-br', name: 'Belo Horizonte', country: 'Brazil' },
  { id: 'manaus-br', name: 'Manaus', country: 'Brazil' },
  { id: 'foz-do-iguacu-br', name: 'Foz do Iguaçu', country: 'Brazil' },
  { id: 'buzios-br', name: 'Búzios', country: 'Brazil' },
  { id: 'paraty-br', name: 'Paraty', country: 'Brazil' },
  { id: 'fernando-de-noronha-br', name: 'Fernando de Noronha', country: 'Brazil' },

  // Argentina
  { id: 'buenos-aires-ar', name: 'Buenos Aires', country: 'Argentina' },
  { id: 'mendoza-ar', name: 'Mendoza', country: 'Argentina' },
  { id: 'bariloche-ar', name: 'Bariloche', country: 'Argentina' },
  { id: 'ushuaia-ar', name: 'Ushuaia', country: 'Argentina' },
  { id: 'el-calafate-ar', name: 'El Calafate', country: 'Argentina' },
  { id: 'cordoba-ar', name: 'Córdoba', country: 'Argentina' },
  { id: 'salta-ar', name: 'Salta', country: 'Argentina' },
  { id: 'iguazu-ar', name: 'Puerto Iguazú', country: 'Argentina' },

  // Chile
  { id: 'santiago-cl', name: 'Santiago', country: 'Chile' },
  { id: 'valparaiso-cl', name: 'Valparaíso', country: 'Chile' },
  { id: 'vina-del-mar-cl', name: 'Viña del Mar', country: 'Chile' },
  { id: 'easter-island-cl', name: 'Easter Island', country: 'Chile' },
  { id: 'atacama-cl', name: 'San Pedro de Atacama', country: 'Chile' },
  { id: 'punta-arenas-cl', name: 'Punta Arenas', country: 'Chile' },
  { id: 'torres-del-paine-cl', name: 'Torres del Paine', country: 'Chile' },
  { id: 'pucon-cl', name: 'Pucón', country: 'Chile' },

  // Peru
  { id: 'lima-pe', name: 'Lima', country: 'Peru' },
  { id: 'cusco-pe', name: 'Cusco', country: 'Peru' },
  { id: 'machu-picchu-pe', name: 'Machu Picchu', country: 'Peru' },
  { id: 'arequipa-pe', name: 'Arequipa', country: 'Peru' },
  { id: 'puno-pe', name: 'Puno', country: 'Peru' },
  { id: 'iquitos-pe', name: 'Iquitos', country: 'Peru' },
  { id: 'sacred-valley-pe', name: 'Sacred Valley', country: 'Peru' },

  // Colombia
  { id: 'bogota-co', name: 'Bogotá', country: 'Colombia' },
  { id: 'medellin-co', name: 'Medellín', country: 'Colombia' },
  { id: 'cartagena-co', name: 'Cartagena', country: 'Colombia' },
  { id: 'cali-co', name: 'Cali', country: 'Colombia' },
  { id: 'santa-marta-co', name: 'Santa Marta', country: 'Colombia' },
  { id: 'san-andres-co', name: 'San Andrés', country: 'Colombia' },
  { id: 'barranquilla-co', name: 'Barranquilla', country: 'Colombia' },

  // Ecuador
  { id: 'quito-ec', name: 'Quito', country: 'Ecuador' },
  { id: 'guayaquil-ec', name: 'Guayaquil', country: 'Ecuador' },
  { id: 'cuenca-ec', name: 'Cuenca', country: 'Ecuador' },
  { id: 'galapagos-ec', name: 'Galápagos Islands', country: 'Ecuador' },
  { id: 'banos-ec', name: 'Baños', country: 'Ecuador' },

  // Other South America
  { id: 'montevideo-uy', name: 'Montevideo', country: 'Uruguay' },
  { id: 'punta-del-este-uy', name: 'Punta del Este', country: 'Uruguay' },
  { id: 'asuncion-py', name: 'Asunción', country: 'Paraguay' },
  { id: 'la-paz-bo', name: 'La Paz', country: 'Bolivia' },
  { id: 'sucre-bo', name: 'Sucre', country: 'Bolivia' },
  { id: 'uyuni-bo', name: 'Uyuni', country: 'Bolivia' },
  { id: 'caracas-ve', name: 'Caracas', country: 'Venezuela' },
  { id: 'margarita-ve', name: 'Isla Margarita', country: 'Venezuela' },
  { id: 'georgetown-gy', name: 'Georgetown', country: 'Guyana' },
  { id: 'paramaribo-sr', name: 'Paramaribo', country: 'Suriname' },
  { id: 'cayenne-gf', name: 'Cayenne', country: 'French Guiana' },

  // ===== ASIA =====
  // Japan
  { id: 'osaka-jp', name: 'Osaka', country: 'Japan' },
  { id: 'kyoto-jp', name: 'Kyoto', country: 'Japan' },
  { id: 'yokohama-jp', name: 'Yokohama', country: 'Japan' },
  { id: 'hiroshima-jp', name: 'Hiroshima', country: 'Japan' },
  { id: 'nagoya-jp', name: 'Nagoya', country: 'Japan' },
  { id: 'sapporo-jp', name: 'Sapporo', country: 'Japan' },
  { id: 'fukuoka-jp', name: 'Fukuoka', country: 'Japan' },
  { id: 'nara-jp', name: 'Nara', country: 'Japan' },
  { id: 'kobe-jp', name: 'Kobe', country: 'Japan' },
  { id: 'okinawa-jp', name: 'Okinawa', country: 'Japan' },
  { id: 'hakone-jp', name: 'Hakone', country: 'Japan' },
  { id: 'nikko-jp', name: 'Nikko', country: 'Japan' },
  { id: 'kanazawa-jp', name: 'Kanazawa', country: 'Japan' },
  { id: 'takayama-jp', name: 'Takayama', country: 'Japan' },

  // South Korea
  { id: 'seoul-kr', name: 'Seoul', country: 'South Korea' },
  { id: 'busan-kr', name: 'Busan', country: 'South Korea' },
  { id: 'jeju-kr', name: 'Jeju Island', country: 'South Korea' },
  { id: 'incheon-kr', name: 'Incheon', country: 'South Korea' },
  { id: 'gyeongju-kr', name: 'Gyeongju', country: 'South Korea' },
  { id: 'daegu-kr', name: 'Daegu', country: 'South Korea' },

  // China
  { id: 'beijing-cn', name: 'Beijing', country: 'China' },
  { id: 'shanghai-cn', name: 'Shanghai', country: 'China' },
  { id: 'hong-kong-hk', name: 'Hong Kong', country: 'Hong Kong' },
  { id: 'macau-mo', name: 'Macau', country: 'Macau' },
  { id: 'guangzhou-cn', name: 'Guangzhou', country: 'China' },
  { id: 'shenzhen-cn', name: 'Shenzhen', country: 'China' },
  { id: 'hangzhou-cn', name: 'Hangzhou', country: 'China' },
  { id: 'xian-cn', name: "Xi'an", country: 'China' },
  { id: 'chengdu-cn', name: 'Chengdu', country: 'China' },
  { id: 'guilin-cn', name: 'Guilin', country: 'China' },
  { id: 'suzhou-cn', name: 'Suzhou', country: 'China' },
  { id: 'nanjing-cn', name: 'Nanjing', country: 'China' },
  { id: 'xiamen-cn', name: 'Xiamen', country: 'China' },
  { id: 'chongqing-cn', name: 'Chongqing', country: 'China' },
  { id: 'lijiang-cn', name: 'Lijiang', country: 'China' },
  { id: 'zhangjiajie-cn', name: 'Zhangjiajie', country: 'China' },
  { id: 'lhasa-cn', name: 'Lhasa', country: 'China', region: 'Tibet' },
  { id: 'harbin-cn', name: 'Harbin', country: 'China' },
  { id: 'sanya-cn', name: 'Sanya', country: 'China', region: 'Hainan' },

  // Taiwan
  { id: 'taipei-tw', name: 'Taipei', country: 'Taiwan' },
  { id: 'kaohsiung-tw', name: 'Kaohsiung', country: 'Taiwan' },
  { id: 'taichung-tw', name: 'Taichung', country: 'Taiwan' },
  { id: 'hualien-tw', name: 'Hualien', country: 'Taiwan' },
  { id: 'tainan-tw', name: 'Tainan', country: 'Taiwan' },

  // Southeast Asia - Thailand
  { id: 'phuket-th', name: 'Phuket', country: 'Thailand' },
  { id: 'chiang-mai-th', name: 'Chiang Mai', country: 'Thailand' },
  { id: 'pattaya-th', name: 'Pattaya', country: 'Thailand' },
  { id: 'krabi-th', name: 'Krabi', country: 'Thailand' },
  { id: 'koh-samui-th', name: 'Koh Samui', country: 'Thailand' },
  { id: 'koh-phi-phi-th', name: 'Koh Phi Phi', country: 'Thailand' },
  { id: 'koh-phangan-th', name: 'Koh Phangan', country: 'Thailand' },
  { id: 'koh-tao-th', name: 'Koh Tao', country: 'Thailand' },
  { id: 'koh-lanta-th', name: 'Koh Lanta', country: 'Thailand' },
  { id: 'chiang-rai-th', name: 'Chiang Rai', country: 'Thailand' },
  { id: 'ayutthaya-th', name: 'Ayutthaya', country: 'Thailand' },
  { id: 'hua-hin-th', name: 'Hua Hin', country: 'Thailand' },
  { id: 'pai-th', name: 'Pai', country: 'Thailand' },

  // Vietnam
  { id: 'ho-chi-minh-vn', name: 'Ho Chi Minh City', country: 'Vietnam' },
  { id: 'hanoi-vn', name: 'Hanoi', country: 'Vietnam' },
  { id: 'da-nang-vn', name: 'Da Nang', country: 'Vietnam' },
  { id: 'hoi-an-vn', name: 'Hoi An', country: 'Vietnam' },
  { id: 'nha-trang-vn', name: 'Nha Trang', country: 'Vietnam' },
  { id: 'phu-quoc-vn', name: 'Phu Quoc', country: 'Vietnam' },
  { id: 'ha-long-bay-vn', name: 'Ha Long Bay', country: 'Vietnam' },
  { id: 'sapa-vn', name: 'Sapa', country: 'Vietnam' },
  { id: 'hue-vn', name: 'Hue', country: 'Vietnam' },
  { id: 'dalat-vn', name: 'Da Lat', country: 'Vietnam' },
  { id: 'mui-ne-vn', name: 'Mui Ne', country: 'Vietnam' },

  // Indonesia
  { id: 'jakarta-id', name: 'Jakarta', country: 'Indonesia' },
  { id: 'ubud-id', name: 'Ubud', country: 'Indonesia', region: 'Bali' },
  { id: 'seminyak-id', name: 'Seminyak', country: 'Indonesia', region: 'Bali' },
  { id: 'kuta-id', name: 'Kuta', country: 'Indonesia', region: 'Bali' },
  { id: 'canggu-id', name: 'Canggu', country: 'Indonesia', region: 'Bali' },
  { id: 'nusa-dua-id', name: 'Nusa Dua', country: 'Indonesia', region: 'Bali' },
  { id: 'uluwatu-id', name: 'Uluwatu', country: 'Indonesia', region: 'Bali' },
  { id: 'gili-islands-id', name: 'Gili Islands', country: 'Indonesia' },
  { id: 'lombok-id', name: 'Lombok', country: 'Indonesia' },
  { id: 'yogyakarta-id', name: 'Yogyakarta', country: 'Indonesia' },
  { id: 'surabaya-id', name: 'Surabaya', country: 'Indonesia' },
  { id: 'bandung-id', name: 'Bandung', country: 'Indonesia' },
  { id: 'komodo-id', name: 'Komodo', country: 'Indonesia' },
  { id: 'raja-ampat-id', name: 'Raja Ampat', country: 'Indonesia' },
  { id: 'nusa-penida-id', name: 'Nusa Penida', country: 'Indonesia' },

  // Malaysia
  { id: 'kuala-lumpur-my', name: 'Kuala Lumpur', country: 'Malaysia' },
  { id: 'penang-my', name: 'Penang', country: 'Malaysia' },
  { id: 'langkawi-my', name: 'Langkawi', country: 'Malaysia' },
  { id: 'melaka-my', name: 'Melaka', country: 'Malaysia' },
  { id: 'kota-kinabalu-my', name: 'Kota Kinabalu', country: 'Malaysia', region: 'Sabah' },
  { id: 'kuching-my', name: 'Kuching', country: 'Malaysia', region: 'Sarawak' },
  { id: 'johor-bahru-my', name: 'Johor Bahru', country: 'Malaysia' },
  { id: 'cameron-highlands-my', name: 'Cameron Highlands', country: 'Malaysia' },
  { id: 'tioman-my', name: 'Tioman Island', country: 'Malaysia' },
  { id: 'perhentian-my', name: 'Perhentian Islands', country: 'Malaysia' },
  { id: 'redang-my', name: 'Redang Island', country: 'Malaysia' },
  { id: 'sipadan-my', name: 'Sipadan', country: 'Malaysia' },

  // Philippines
  { id: 'manila-ph', name: 'Manila', country: 'Philippines' },
  { id: 'cebu-ph', name: 'Cebu', country: 'Philippines' },
  { id: 'boracay-ph', name: 'Boracay', country: 'Philippines' },
  { id: 'palawan-ph', name: 'Palawan', country: 'Philippines' },
  { id: 'el-nido-ph', name: 'El Nido', country: 'Philippines' },
  { id: 'coron-ph', name: 'Coron', country: 'Philippines' },
  { id: 'bohol-ph', name: 'Bohol', country: 'Philippines' },
  { id: 'siargao-ph', name: 'Siargao', country: 'Philippines' },
  { id: 'davao-ph', name: 'Davao', country: 'Philippines' },
  { id: 'baguio-ph', name: 'Baguio', country: 'Philippines' },
  { id: 'dumaguete-ph', name: 'Dumaguete', country: 'Philippines' },
  { id: 'puerto-galera-ph', name: 'Puerto Galera', country: 'Philippines' },

  // Cambodia
  { id: 'phnom-penh-kh', name: 'Phnom Penh', country: 'Cambodia' },
  { id: 'siem-reap-kh', name: 'Siem Reap', country: 'Cambodia' },
  { id: 'sihanoukville-kh', name: 'Sihanoukville', country: 'Cambodia' },
  { id: 'koh-rong-kh', name: 'Koh Rong', country: 'Cambodia' },
  { id: 'kampot-kh', name: 'Kampot', country: 'Cambodia' },
  { id: 'battambang-kh', name: 'Battambang', country: 'Cambodia' },

  // Laos
  { id: 'vientiane-la', name: 'Vientiane', country: 'Laos' },
  { id: 'luang-prabang-la', name: 'Luang Prabang', country: 'Laos' },
  { id: 'vang-vieng-la', name: 'Vang Vieng', country: 'Laos' },

  // Myanmar
  { id: 'yangon-mm', name: 'Yangon', country: 'Myanmar' },
  { id: 'bagan-mm', name: 'Bagan', country: 'Myanmar' },
  { id: 'mandalay-mm', name: 'Mandalay', country: 'Myanmar' },
  { id: 'inle-lake-mm', name: 'Inle Lake', country: 'Myanmar' },
  { id: 'ngapali-mm', name: 'Ngapali Beach', country: 'Myanmar' },

  // Brunei
  { id: 'bandar-seri-begawan-bn', name: 'Bandar Seri Begawan', country: 'Brunei' },

  // Timor-Leste
  { id: 'dili-tl', name: 'Dili', country: 'Timor-Leste' },

  // South Asia - India
  { id: 'mumbai-in', name: 'Mumbai', country: 'India' },
  { id: 'delhi-in', name: 'New Delhi', country: 'India' },
  { id: 'bangalore-in', name: 'Bangalore', country: 'India' },
  { id: 'chennai-in', name: 'Chennai', country: 'India' },
  { id: 'kolkata-in', name: 'Kolkata', country: 'India' },
  { id: 'hyderabad-in', name: 'Hyderabad', country: 'India' },
  { id: 'jaipur-in', name: 'Jaipur', country: 'India', region: 'Rajasthan' },
  { id: 'goa-in', name: 'Goa', country: 'India' },
  { id: 'agra-in', name: 'Agra', country: 'India' },
  { id: 'udaipur-in', name: 'Udaipur', country: 'India', region: 'Rajasthan' },
  { id: 'varanasi-in', name: 'Varanasi', country: 'India' },
  { id: 'kerala-in', name: 'Kerala', country: 'India' },
  { id: 'kochi-in', name: 'Kochi', country: 'India', region: 'Kerala' },
  { id: 'pune-in', name: 'Pune', country: 'India' },
  { id: 'ahmedabad-in', name: 'Ahmedabad', country: 'India' },
  { id: 'jodhpur-in', name: 'Jodhpur', country: 'India', region: 'Rajasthan' },
  { id: 'jaisalmer-in', name: 'Jaisalmer', country: 'India', region: 'Rajasthan' },
  { id: 'rishikesh-in', name: 'Rishikesh', country: 'India' },
  { id: 'darjeeling-in', name: 'Darjeeling', country: 'India' },
  { id: 'shimla-in', name: 'Shimla', country: 'India' },
  { id: 'manali-in', name: 'Manali', country: 'India' },
  { id: 'leh-in', name: 'Leh', country: 'India', region: 'Ladakh' },
  { id: 'amritsar-in', name: 'Amritsar', country: 'India' },
  { id: 'mysore-in', name: 'Mysore', country: 'India' },
  { id: 'hampi-in', name: 'Hampi', country: 'India' },
  { id: 'andaman-in', name: 'Andaman Islands', country: 'India' },
  { id: 'pondicherry-in', name: 'Pondicherry', country: 'India' },
  { id: 'ooty-in', name: 'Ooty', country: 'India' },
  { id: 'munnar-in', name: 'Munnar', country: 'India', region: 'Kerala' },
  { id: 'alleppey-in', name: 'Alleppey', country: 'India', region: 'Kerala' },

  // Sri Lanka
  { id: 'colombo-lk', name: 'Colombo', country: 'Sri Lanka' },
  { id: 'kandy-lk', name: 'Kandy', country: 'Sri Lanka' },
  { id: 'galle-lk', name: 'Galle', country: 'Sri Lanka' },
  { id: 'ella-lk', name: 'Ella', country: 'Sri Lanka' },
  { id: 'sigiriya-lk', name: 'Sigiriya', country: 'Sri Lanka' },
  { id: 'negombo-lk', name: 'Negombo', country: 'Sri Lanka' },
  { id: 'bentota-lk', name: 'Bentota', country: 'Sri Lanka' },
  { id: 'mirissa-lk', name: 'Mirissa', country: 'Sri Lanka' },
  { id: 'trincomalee-lk', name: 'Trincomalee', country: 'Sri Lanka' },
  { id: 'arugam-bay-lk', name: 'Arugam Bay', country: 'Sri Lanka' },
  { id: 'nuwara-eliya-lk', name: 'Nuwara Eliya', country: 'Sri Lanka' },

  // Maldives
  { id: 'male-mv', name: 'Malé', country: 'Maldives' },
  { id: 'maldives-atolls-mv', name: 'Maldives Atolls', country: 'Maldives' },

  // Nepal
  { id: 'kathmandu-np', name: 'Kathmandu', country: 'Nepal' },
  { id: 'pokhara-np', name: 'Pokhara', country: 'Nepal' },
  { id: 'chitwan-np', name: 'Chitwan', country: 'Nepal' },
  { id: 'lumbini-np', name: 'Lumbini', country: 'Nepal' },
  { id: 'everest-base-camp-np', name: 'Everest Base Camp', country: 'Nepal' },

  // Bhutan
  { id: 'thimphu-bt', name: 'Thimphu', country: 'Bhutan' },
  { id: 'paro-bt', name: 'Paro', country: 'Bhutan' },
  { id: 'punakha-bt', name: 'Punakha', country: 'Bhutan' },

  // Bangladesh
  { id: 'dhaka-bd', name: 'Dhaka', country: 'Bangladesh' },
  { id: 'chittagong-bd', name: 'Chittagong', country: 'Bangladesh' },
  { id: 'coxs-bazar-bd', name: "Cox's Bazar", country: 'Bangladesh' },
  { id: 'sylhet-bd', name: 'Sylhet', country: 'Bangladesh' },

  // Pakistan
  { id: 'karachi-pk', name: 'Karachi', country: 'Pakistan' },
  { id: 'lahore-pk', name: 'Lahore', country: 'Pakistan' },
  { id: 'islamabad-pk', name: 'Islamabad', country: 'Pakistan' },
  { id: 'hunza-pk', name: 'Hunza Valley', country: 'Pakistan' },
  { id: 'swat-pk', name: 'Swat Valley', country: 'Pakistan' },

  // Central Asia
  { id: 'tashkent-uz', name: 'Tashkent', country: 'Uzbekistan' },
  { id: 'samarkand-uz', name: 'Samarkand', country: 'Uzbekistan' },
  { id: 'bukhara-uz', name: 'Bukhara', country: 'Uzbekistan' },
  { id: 'khiva-uz', name: 'Khiva', country: 'Uzbekistan' },
  { id: 'almaty-kz', name: 'Almaty', country: 'Kazakhstan' },
  { id: 'astana-kz', name: 'Astana', country: 'Kazakhstan' },
  { id: 'bishkek-kg', name: 'Bishkek', country: 'Kyrgyzstan' },
  { id: 'issyk-kul-kg', name: 'Issyk-Kul', country: 'Kyrgyzstan' },
  { id: 'dushanbe-tj', name: 'Dushanbe', country: 'Tajikistan' },
  { id: 'ashgabat-tm', name: 'Ashgabat', country: 'Turkmenistan' },

  // Mongolia
  { id: 'ulaanbaatar-mn', name: 'Ulaanbaatar', country: 'Mongolia' },

  // ===== MIDDLE EAST =====
  // UAE
  { id: 'abu-dhabi-ae', name: 'Abu Dhabi', country: 'United Arab Emirates' },
  { id: 'sharjah-ae', name: 'Sharjah', country: 'United Arab Emirates' },
  { id: 'ras-al-khaimah-ae', name: 'Ras Al Khaimah', country: 'United Arab Emirates' },
  { id: 'fujairah-ae', name: 'Fujairah', country: 'United Arab Emirates' },
  { id: 'ajman-ae', name: 'Ajman', country: 'United Arab Emirates' },

  // Saudi Arabia
  { id: 'riyadh-sa', name: 'Riyadh', country: 'Saudi Arabia' },
  { id: 'jeddah-sa', name: 'Jeddah', country: 'Saudi Arabia' },
  { id: 'mecca-sa', name: 'Mecca', country: 'Saudi Arabia' },
  { id: 'medina-sa', name: 'Medina', country: 'Saudi Arabia' },
  { id: 'dammam-sa', name: 'Dammam', country: 'Saudi Arabia' },
  { id: 'alula-sa', name: 'AlUla', country: 'Saudi Arabia' },
  { id: 'neom-sa', name: 'NEOM', country: 'Saudi Arabia' },

  // Qatar
  { id: 'doha-qa', name: 'Doha', country: 'Qatar' },

  // Bahrain
  { id: 'manama-bh', name: 'Manama', country: 'Bahrain' },

  // Kuwait
  { id: 'kuwait-city-kw', name: 'Kuwait City', country: 'Kuwait' },

  // Oman
  { id: 'muscat-om', name: 'Muscat', country: 'Oman' },
  { id: 'salalah-om', name: 'Salalah', country: 'Oman' },

  // Jordan
  { id: 'amman-jo', name: 'Amman', country: 'Jordan' },
  { id: 'petra-jo', name: 'Petra', country: 'Jordan' },
  { id: 'dead-sea-jo', name: 'Dead Sea', country: 'Jordan' },
  { id: 'aqaba-jo', name: 'Aqaba', country: 'Jordan' },
  { id: 'wadi-rum-jo', name: 'Wadi Rum', country: 'Jordan' },

  // Israel
  { id: 'tel-aviv-il', name: 'Tel Aviv', country: 'Israel' },
  { id: 'jerusalem-il', name: 'Jerusalem', country: 'Israel' },
  { id: 'haifa-il', name: 'Haifa', country: 'Israel' },
  { id: 'eilat-il', name: 'Eilat', country: 'Israel' },

  // Lebanon
  { id: 'beirut-lb', name: 'Beirut', country: 'Lebanon' },
  { id: 'byblos-lb', name: 'Byblos', country: 'Lebanon' },
  { id: 'baalbek-lb', name: 'Baalbek', country: 'Lebanon' },

  // Turkey
  { id: 'ankara-tr', name: 'Ankara', country: 'Turkey' },
  { id: 'antalya-tr', name: 'Antalya', country: 'Turkey' },
  { id: 'bodrum-tr', name: 'Bodrum', country: 'Turkey' },
  { id: 'cappadocia-tr', name: 'Cappadocia', country: 'Turkey' },
  { id: 'izmir-tr', name: 'Izmir', country: 'Turkey' },
  { id: 'fethiye-tr', name: 'Fethiye', country: 'Turkey' },
  { id: 'marmaris-tr', name: 'Marmaris', country: 'Turkey' },
  { id: 'ephesus-tr', name: 'Ephesus', country: 'Turkey' },
  { id: 'pamukkale-tr', name: 'Pamukkale', country: 'Turkey' },
  { id: 'alanya-tr', name: 'Alanya', country: 'Turkey' },
  { id: 'kas-tr', name: 'Kaş', country: 'Turkey' },
  { id: 'trabzon-tr', name: 'Trabzon', country: 'Turkey' },

  // Georgia
  { id: 'tbilisi-ge', name: 'Tbilisi', country: 'Georgia' },
  { id: 'batumi-ge', name: 'Batumi', country: 'Georgia' },
  { id: 'gudauri-ge', name: 'Gudauri', country: 'Georgia' },
  { id: 'kazbegi-ge', name: 'Kazbegi', country: 'Georgia' },

  // Armenia
  { id: 'yerevan-am', name: 'Yerevan', country: 'Armenia' },
  { id: 'dilijan-am', name: 'Dilijan', country: 'Armenia' },

  // Azerbaijan
  { id: 'baku-az', name: 'Baku', country: 'Azerbaijan' },
  { id: 'gabala-az', name: 'Gabala', country: 'Azerbaijan' },

  // Iran
  { id: 'tehran-ir', name: 'Tehran', country: 'Iran' },
  { id: 'isfahan-ir', name: 'Isfahan', country: 'Iran' },
  { id: 'shiraz-ir', name: 'Shiraz', country: 'Iran' },
  { id: 'yazd-ir', name: 'Yazd', country: 'Iran' },
  { id: 'tabriz-ir', name: 'Tabriz', country: 'Iran' },

  // Iraq
  { id: 'baghdad-iq', name: 'Baghdad', country: 'Iraq' },
  { id: 'erbil-iq', name: 'Erbil', country: 'Iraq' },
  { id: 'basra-iq', name: 'Basra', country: 'Iraq' },

  // ===== AFRICA =====
  // North Africa
  { id: 'cairo-eg', name: 'Cairo', country: 'Egypt' },
  { id: 'luxor-eg', name: 'Luxor', country: 'Egypt' },
  { id: 'aswan-eg', name: 'Aswan', country: 'Egypt' },
  { id: 'hurghada-eg', name: 'Hurghada', country: 'Egypt' },
  { id: 'sharm-el-sheikh-eg', name: 'Sharm El Sheikh', country: 'Egypt' },
  { id: 'alexandria-eg', name: 'Alexandria', country: 'Egypt' },
  { id: 'dahab-eg', name: 'Dahab', country: 'Egypt' },
  { id: 'siwa-eg', name: 'Siwa Oasis', country: 'Egypt' },
  { id: 'marrakech-ma', name: 'Marrakech', country: 'Morocco' },
  { id: 'casablanca-ma', name: 'Casablanca', country: 'Morocco' },
  { id: 'fes-ma', name: 'Fes', country: 'Morocco' },
  { id: 'tangier-ma', name: 'Tangier', country: 'Morocco' },
  { id: 'chefchaouen-ma', name: 'Chefchaouen', country: 'Morocco' },
  { id: 'essaouira-ma', name: 'Essaouira', country: 'Morocco' },
  { id: 'agadir-ma', name: 'Agadir', country: 'Morocco' },
  { id: 'rabat-ma', name: 'Rabat', country: 'Morocco' },
  { id: 'meknes-ma', name: 'Meknes', country: 'Morocco' },
  { id: 'ouarzazate-ma', name: 'Ouarzazate', country: 'Morocco' },
  { id: 'merzouga-ma', name: 'Merzouga', country: 'Morocco' },
  { id: 'tunis-tn', name: 'Tunis', country: 'Tunisia' },
  { id: 'sidi-bou-said-tn', name: 'Sidi Bou Said', country: 'Tunisia' },
  { id: 'sousse-tn', name: 'Sousse', country: 'Tunisia' },
  { id: 'djerba-tn', name: 'Djerba', country: 'Tunisia' },
  { id: 'hammamet-tn', name: 'Hammamet', country: 'Tunisia' },
  { id: 'algiers-dz', name: 'Algiers', country: 'Algeria' },
  { id: 'oran-dz', name: 'Oran', country: 'Algeria' },
  { id: 'tripoli-ly', name: 'Tripoli', country: 'Libya' },

  // East Africa
  { id: 'nairobi-ke', name: 'Nairobi', country: 'Kenya' },
  { id: 'mombasa-ke', name: 'Mombasa', country: 'Kenya' },
  { id: 'diani-beach-ke', name: 'Diani Beach', country: 'Kenya' },
  { id: 'maasai-mara-ke', name: 'Maasai Mara', country: 'Kenya' },
  { id: 'lamu-ke', name: 'Lamu', country: 'Kenya' },
  { id: 'dar-es-salaam-tz', name: 'Dar es Salaam', country: 'Tanzania' },
  { id: 'zanzibar-tz', name: 'Zanzibar', country: 'Tanzania' },
  { id: 'arusha-tz', name: 'Arusha', country: 'Tanzania' },
  { id: 'serengeti-tz', name: 'Serengeti', country: 'Tanzania' },
  { id: 'kilimanjaro-tz', name: 'Mount Kilimanjaro', country: 'Tanzania' },
  { id: 'ngorongoro-tz', name: 'Ngorongoro', country: 'Tanzania' },
  { id: 'kampala-ug', name: 'Kampala', country: 'Uganda' },
  { id: 'entebbe-ug', name: 'Entebbe', country: 'Uganda' },
  { id: 'bwindi-ug', name: 'Bwindi', country: 'Uganda' },
  { id: 'kigali-rw', name: 'Kigali', country: 'Rwanda' },
  { id: 'volcanoes-rw', name: 'Volcanoes National Park', country: 'Rwanda' },
  { id: 'addis-ababa-et', name: 'Addis Ababa', country: 'Ethiopia' },
  { id: 'lalibela-et', name: 'Lalibela', country: 'Ethiopia' },
  { id: 'gondar-et', name: 'Gondar', country: 'Ethiopia' },
  { id: 'djibouti-city-dj', name: 'Djibouti City', country: 'Djibouti' },
  { id: 'mogadishu-so', name: 'Mogadishu', country: 'Somalia' },
  { id: 'asmara-er', name: 'Asmara', country: 'Eritrea' },

  // Southern Africa
  { id: 'cape-town-za', name: 'Cape Town', country: 'South Africa' },
  { id: 'johannesburg-za', name: 'Johannesburg', country: 'South Africa' },
  { id: 'durban-za', name: 'Durban', country: 'South Africa' },
  { id: 'pretoria-za', name: 'Pretoria', country: 'South Africa' },
  { id: 'kruger-za', name: 'Kruger National Park', country: 'South Africa' },
  { id: 'garden-route-za', name: 'Garden Route', country: 'South Africa' },
  { id: 'stellenbosch-za', name: 'Stellenbosch', country: 'South Africa' },
  { id: 'knysna-za', name: 'Knysna', country: 'South Africa' },
  { id: 'port-elizabeth-za', name: 'Port Elizabeth', country: 'South Africa' },
  { id: 'victoria-falls-zw', name: 'Victoria Falls', country: 'Zimbabwe' },
  { id: 'harare-zw', name: 'Harare', country: 'Zimbabwe' },
  { id: 'livingstone-zm', name: 'Livingstone', country: 'Zambia' },
  { id: 'lusaka-zm', name: 'Lusaka', country: 'Zambia' },
  { id: 'south-luangwa-zm', name: 'South Luangwa', country: 'Zambia' },
  { id: 'windhoek-na', name: 'Windhoek', country: 'Namibia' },
  { id: 'sossusvlei-na', name: 'Sossusvlei', country: 'Namibia' },
  { id: 'swakopmund-na', name: 'Swakopmund', country: 'Namibia' },
  { id: 'etosha-na', name: 'Etosha', country: 'Namibia' },
  { id: 'gaborone-bw', name: 'Gaborone', country: 'Botswana' },
  { id: 'okavango-delta-bw', name: 'Okavango Delta', country: 'Botswana' },
  { id: 'chobe-bw', name: 'Chobe', country: 'Botswana' },
  { id: 'kasane-bw', name: 'Kasane', country: 'Botswana' },
  { id: 'maputo-mz', name: 'Maputo', country: 'Mozambique' },
  { id: 'bazaruto-mz', name: 'Bazaruto', country: 'Mozambique' },
  { id: 'vilanculos-mz', name: 'Vilanculos', country: 'Mozambique' },
  { id: 'tofo-mz', name: 'Tofo', country: 'Mozambique' },
  { id: 'lilongwe-mw', name: 'Lilongwe', country: 'Malawi' },
  { id: 'lake-malawi-mw', name: 'Lake Malawi', country: 'Malawi' },
  { id: 'mbabane-sz', name: 'Mbabane', country: 'Eswatini' },
  { id: 'maseru-ls', name: 'Maseru', country: 'Lesotho' },
  { id: 'antananarivo-mg', name: 'Antananarivo', country: 'Madagascar' },
  { id: 'nosy-be-mg', name: 'Nosy Be', country: 'Madagascar' },
  { id: 'isalo-mg', name: 'Isalo', country: 'Madagascar' },

  // West Africa
  { id: 'lagos-ng', name: 'Lagos', country: 'Nigeria' },
  { id: 'abuja-ng', name: 'Abuja', country: 'Nigeria' },
  { id: 'accra-gh', name: 'Accra', country: 'Ghana' },
  { id: 'cape-coast-gh', name: 'Cape Coast', country: 'Ghana' },
  { id: 'dakar-sn', name: 'Dakar', country: 'Senegal' },
  { id: 'saint-louis-sn', name: 'Saint-Louis', country: 'Senegal' },
  { id: 'abidjan-ci', name: 'Abidjan', country: 'Ivory Coast' },
  { id: 'yamoussoukro-ci', name: 'Yamoussoukro', country: 'Ivory Coast' },
  { id: 'bamako-ml', name: 'Bamako', country: 'Mali' },
  { id: 'timbuktu-ml', name: 'Timbuktu', country: 'Mali' },
  { id: 'ouagadougou-bf', name: 'Ouagadougou', country: 'Burkina Faso' },
  { id: 'niamey-ne', name: 'Niamey', country: 'Niger' },
  { id: 'conakry-gn', name: 'Conakry', country: 'Guinea' },
  { id: 'freetown-sl', name: 'Freetown', country: 'Sierra Leone' },
  { id: 'monrovia-lr', name: 'Monrovia', country: 'Liberia' },
  { id: 'banjul-gm', name: 'Banjul', country: 'Gambia' },
  { id: 'bissau-gw', name: 'Bissau', country: 'Guinea-Bissau' },
  { id: 'praia-cv', name: 'Praia', country: 'Cape Verde' },
  { id: 'sal-cv', name: 'Sal', country: 'Cape Verde' },
  { id: 'boa-vista-cv', name: 'Boa Vista', country: 'Cape Verde' },
  { id: 'lome-tg', name: 'Lomé', country: 'Togo' },
  { id: 'cotonou-bj', name: 'Cotonou', country: 'Benin' },
  { id: 'nouakchott-mr', name: 'Nouakchott', country: 'Mauritania' },

  // Central Africa
  { id: 'kinshasa-cd', name: 'Kinshasa', country: 'Democratic Republic of the Congo' },
  { id: 'brazzaville-cg', name: 'Brazzaville', country: 'Republic of the Congo' },
  { id: 'libreville-ga', name: 'Libreville', country: 'Gabon' },
  { id: 'lope-ga', name: 'Lopé', country: 'Gabon' },
  { id: 'yaounde-cm', name: 'Yaoundé', country: 'Cameroon' },
  { id: 'douala-cm', name: 'Douala', country: 'Cameroon' },
  { id: 'malabo-gq', name: 'Malabo', country: 'Equatorial Guinea' },
  { id: 'bangui-cf', name: 'Bangui', country: 'Central African Republic' },
  { id: 'ndjamena-td', name: "N'Djamena", country: 'Chad' },
  { id: 'sao-tome-st', name: 'São Tomé', country: 'São Tomé and Príncipe' },

  // Indian Ocean Islands
  { id: 'port-louis-mu', name: 'Port Louis', country: 'Mauritius' },
  { id: 'grand-baie-mu', name: 'Grand Baie', country: 'Mauritius' },
  { id: 'le-morne-mu', name: 'Le Morne', country: 'Mauritius' },
  { id: 'victoria-sc', name: 'Victoria', country: 'Seychelles' },
  { id: 'mahe-sc', name: 'Mahé', country: 'Seychelles' },
  { id: 'praslin-sc', name: 'Praslin', country: 'Seychelles' },
  { id: 'la-digue-sc', name: 'La Digue', country: 'Seychelles' },
  { id: 'saint-denis-re', name: 'Saint-Denis', country: 'Réunion' },
  { id: 'moroni-km', name: 'Moroni', country: 'Comoros' },

  // ===== OCEANIA =====
  // Australia
  { id: 'melbourne-au', name: 'Melbourne', country: 'Australia' },
  { id: 'brisbane-au', name: 'Brisbane', country: 'Australia' },
  { id: 'perth-au', name: 'Perth', country: 'Australia' },
  { id: 'gold-coast-au', name: 'Gold Coast', country: 'Australia' },
  { id: 'adelaide-au', name: 'Adelaide', country: 'Australia' },
  { id: 'cairns-au', name: 'Cairns', country: 'Australia' },
  { id: 'great-barrier-reef-au', name: 'Great Barrier Reef', country: 'Australia' },
  { id: 'hobart-au', name: 'Hobart', country: 'Australia', region: 'Tasmania' },
  { id: 'darwin-au', name: 'Darwin', country: 'Australia' },
  { id: 'uluru-au', name: 'Uluru', country: 'Australia' },
  { id: 'byron-bay-au', name: 'Byron Bay', country: 'Australia' },
  { id: 'canberra-au', name: 'Canberra', country: 'Australia' },
  { id: 'whitsundays-au', name: 'Whitsundays', country: 'Australia' },
  { id: 'noosa-au', name: 'Noosa', country: 'Australia' },
  { id: 'fraser-island-au', name: 'Fraser Island', country: 'Australia' },
  { id: 'sunshine-coast-au', name: 'Sunshine Coast', country: 'Australia' },
  { id: 'kakadu-au', name: 'Kakadu', country: 'Australia' },
  { id: 'kangaroo-island-au', name: 'Kangaroo Island', country: 'Australia' },
  { id: 'margaret-river-au', name: 'Margaret River', country: 'Australia' },
  { id: 'port-douglas-au', name: 'Port Douglas', country: 'Australia' },
  { id: 'alice-springs-au', name: 'Alice Springs', country: 'Australia' },

  // New Zealand
  { id: 'auckland-nz', name: 'Auckland', country: 'New Zealand' },
  { id: 'wellington-nz', name: 'Wellington', country: 'New Zealand' },
  { id: 'queenstown-nz', name: 'Queenstown', country: 'New Zealand' },
  { id: 'christchurch-nz', name: 'Christchurch', country: 'New Zealand' },
  { id: 'rotorua-nz', name: 'Rotorua', country: 'New Zealand' },
  { id: 'milford-sound-nz', name: 'Milford Sound', country: 'New Zealand' },
  { id: 'wanaka-nz', name: 'Wanaka', country: 'New Zealand' },
  { id: 'bay-of-islands-nz', name: 'Bay of Islands', country: 'New Zealand' },
  { id: 'franz-josef-nz', name: 'Franz Josef', country: 'New Zealand' },
  { id: 'taupo-nz', name: 'Taupo', country: 'New Zealand' },
  { id: 'hobbiton-nz', name: 'Hobbiton', country: 'New Zealand' },
  { id: 'dunedin-nz', name: 'Dunedin', country: 'New Zealand' },
  { id: 'kaikoura-nz', name: 'Kaikoura', country: 'New Zealand' },
  { id: 'abel-tasman-nz', name: 'Abel Tasman', country: 'New Zealand' },

  // Pacific Islands
  { id: 'fiji-islands-fj', name: 'Fiji Islands', country: 'Fiji' },
  { id: 'nadi-fj', name: 'Nadi', country: 'Fiji' },
  { id: 'suva-fj', name: 'Suva', country: 'Fiji' },
  { id: 'bora-bora-pf', name: 'Bora Bora', country: 'French Polynesia' },
  { id: 'tahiti-pf', name: 'Tahiti', country: 'French Polynesia' },
  { id: 'moorea-pf', name: 'Moorea', country: 'French Polynesia' },
  { id: 'rangiroa-pf', name: 'Rangiroa', country: 'French Polynesia' },
  { id: 'apia-ws', name: 'Apia', country: 'Samoa' },
  { id: 'pago-pago-as', name: 'Pago Pago', country: 'American Samoa' },
  { id: 'nukualofa-to', name: "Nuku'alofa", country: 'Tonga' },
  { id: 'port-vila-vu', name: 'Port Vila', country: 'Vanuatu' },
  { id: 'noumea-nc', name: 'Nouméa', country: 'New Caledonia' },
  { id: 'rarotonga-ck', name: 'Rarotonga', country: 'Cook Islands' },
  { id: 'aitutaki-ck', name: 'Aitutaki', country: 'Cook Islands' },
  { id: 'honiara-sb', name: 'Honiara', country: 'Solomon Islands' },
  { id: 'port-moresby-pg', name: 'Port Moresby', country: 'Papua New Guinea' },
  { id: 'tarawa-ki', name: 'Tarawa', country: 'Kiribati' },
  { id: 'majuro-mh', name: 'Majuro', country: 'Marshall Islands' },
  { id: 'koror-pw', name: 'Koror', country: 'Palau' },
  { id: 'funafuti-tv', name: 'Funafuti', country: 'Tuvalu' },
  { id: 'yaren-nr', name: 'Yaren', country: 'Nauru' },
  { id: 'palikir-fm', name: 'Palikir', country: 'Micronesia' },
  { id: 'guam-gu', name: 'Guam', country: 'Guam' },
  { id: 'saipan-mp', name: 'Saipan', country: 'Northern Mariana Islands' },
  { id: 'niue-nu', name: 'Alofi', country: 'Niue' },

  // ===== ANTARCTICA =====
  { id: 'antarctica', name: 'Antarctica', country: 'Antarctica' },
];

export function searchCities(query: string): City[] {
  if (!query.trim()) {
    return cities.filter(city => city.popular).slice(0, 8);
  }
  
  const lowerQuery = query.toLowerCase().trim();
  
  return cities
    .filter(city => 
      city.name.toLowerCase().includes(lowerQuery) ||
      city.country.toLowerCase().includes(lowerQuery) ||
      (city.region && city.region.toLowerCase().includes(lowerQuery))
    )
    .sort((a, b) => {
      // Exact name match first
      const aExact = a.name.toLowerCase() === lowerQuery;
      const bExact = b.name.toLowerCase() === lowerQuery;
      if (aExact && !bExact) return -1;
      if (!aExact && bExact) return 1;
      
      // Starts with query second
      const aStarts = a.name.toLowerCase().startsWith(lowerQuery);
      const bStarts = b.name.toLowerCase().startsWith(lowerQuery);
      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;
      
      // Popular cities next
      if (a.popular && !b.popular) return -1;
      if (!a.popular && b.popular) return 1;
      
      return a.name.localeCompare(b.name);
    })
    .slice(0, 8);
}
