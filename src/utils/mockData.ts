// Mock data for the Tourist Safety System

export const generateRandomId = (prefix: string): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let id = '';
  for (let i = 0; i < 5; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `${prefix}-${id}`;
};

export interface Tourist {
  id: string;
  name: string;
  profilePic: string;
  status: 'active' | 'inactive';
  location: { lat: number; lng: number };
  nationality: string;
  age: number;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  travelPreferences: {
    interests: string[];
    budget: 'low' | 'medium' | 'high';
    accommodation: 'budget' | 'mid-range' | 'luxury';
  };
  safetyRating: number; // 1-5 scale
  lastCheckIn: string;
}

export interface Trip {
  id: string;
  touristId: string;
  touristName: string;
  city: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed';
  route: { lat: number; lng: number }[];
  visitedPlaces: {
    type: 'hotel' | 'restaurant' | 'temple' | 'tourist_spot';
    name: string;
    location: { lat: number; lng: number };
  }[];
}

export interface Alert {
  id: string;
  touristId: string;
  touristName: string;
  profilePic: string;
  title: string;
  description: string;
  severity: 'emergency' | 'warning' | 'moderate';
  status: 'active' | 'inactive' | 'pending' | 'resolved';
  timestamp: string;
  location: { lat: number; lng: number };
}

export interface Report {
  id: string;
  tripId: string;
  touristId: string;
  touristName: string;
  zones: {
    type: 'danger' | 'moderate' | 'restricted' | 'congested';
    name: string;
    timestamp: string;
  }[];
  summary: string;
  timestamp: string;
}

// Mock tourists
export const mockTourists: Tourist[] = [
  {
    id: generateRandomId('TST'),
    name: 'Sarah Johnson',
    profilePic: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    status: 'active',
    location: { lat: 28.6139, lng: 77.2090 },
    nationality: 'American',
    age: 28,
    emergencyContact: { name: 'John Johnson', phone: '+1-555-0123', relationship: 'Father' },
    travelPreferences: { interests: ['history', 'photography'], budget: 'medium', accommodation: 'mid-range' },
    safetyRating: 4.5,
    lastCheckIn: new Date(Date.now() - 1800000).toISOString()
  },
  {
    id: generateRandomId('TST'),
    name: 'Michael Chen',
    profilePic: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    status: 'active',
    location: { lat: 28.7041, lng: 77.1025 },
    nationality: 'Chinese',
    age: 32,
    emergencyContact: { name: 'Li Chen', phone: '+86-138-0013-8000', relationship: 'Wife' },
    travelPreferences: { interests: ['culture', 'food'], budget: 'high', accommodation: 'luxury' },
    safetyRating: 4.8,
    lastCheckIn: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: generateRandomId('TST'),
    name: 'Emma Davis',
    profilePic: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    status: 'inactive',
    location: { lat: 28.5355, lng: 77.3910 },
    nationality: 'British',
    age: 25,
    emergencyContact: { name: 'Robert Davis', phone: '+44-20-7946-0958', relationship: 'Brother' },
    travelPreferences: { interests: ['adventure', 'nature'], budget: 'low', accommodation: 'budget' },
    safetyRating: 3.9,
    lastCheckIn: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: generateRandomId('TST'),
    name: 'James Wilson',
    profilePic: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    status: 'active',
    location: { lat: 28.4595, lng: 77.0266 },
    nationality: 'Australian',
    age: 35,
    emergencyContact: { name: 'Sarah Wilson', phone: '+61-2-9374-4000', relationship: 'Sister' },
    travelPreferences: { interests: ['sports', 'beaches'], budget: 'medium', accommodation: 'mid-range' },
    safetyRating: 4.2,
    lastCheckIn: new Date(Date.now() - 2700000).toISOString()
  },
  {
    id: generateRandomId('TST'),
    name: 'Sophia Martinez',
    profilePic: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    status: 'inactive',
    location: { lat: 28.6692, lng: 77.4538 },
    nationality: 'Spanish',
    age: 29,
    emergencyContact: { name: 'Carlos Martinez', phone: '+34-91-123-4567', relationship: 'Husband' },
    travelPreferences: { interests: ['art', 'museums'], budget: 'high', accommodation: 'luxury' },
    safetyRating: 4.6,
    lastCheckIn: new Date(Date.now() - 172800000).toISOString()
  },
  {
    id: generateRandomId('TST'),
    name: 'Ahmed Hassan',
    profilePic: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    status: 'active',
    location: { lat: 28.5789, lng: 77.2345 },
    nationality: 'Egyptian',
    age: 31,
    emergencyContact: { name: 'Fatima Hassan', phone: '+20-2-1234-5678', relationship: 'Mother' },
    travelPreferences: { interests: ['religion', 'architecture'], budget: 'medium', accommodation: 'mid-range' },
    safetyRating: 4.3,
    lastCheckIn: new Date(Date.now() - 4500000).toISOString()
  },
  {
    id: generateRandomId('TST'),
    name: 'Yuki Tanaka',
    profilePic: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150',
    status: 'active',
    location: { lat: 28.6234, lng: 77.1876 },
    nationality: 'Japanese',
    age: 26,
    emergencyContact: { name: 'Hiroshi Tanaka', phone: '+81-3-1234-5678', relationship: 'Father' },
    travelPreferences: { interests: ['technology', 'nature'], budget: 'high', accommodation: 'luxury' },
    safetyRating: 4.7,
    lastCheckIn: new Date(Date.now() - 5400000).toISOString()
  },
  {
    id: generateRandomId('TST'),
    name: 'Maria Rodriguez',
    profilePic: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150',
    status: 'inactive',
    location: { lat: 28.5123, lng: 77.3456 },
    nationality: 'Mexican',
    age: 33,
    emergencyContact: { name: 'Jose Rodriguez', phone: '+52-55-1234-5678', relationship: 'Brother' },
    travelPreferences: { interests: ['music', 'festivals'], budget: 'low', accommodation: 'budget' },
    safetyRating: 3.8,
    lastCheckIn: new Date(Date.now() - 259200000).toISOString()
  },
  {
    id: generateRandomId('TST'),
    name: 'David Kim',
    profilePic: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150',
    status: 'active',
    location: { lat: 28.6456, lng: 77.2987 },
    nationality: 'South Korean',
    age: 27,
    emergencyContact: { name: 'Min Kim', phone: '+82-2-1234-5678', relationship: 'Sister' },
    travelPreferences: { interests: ['food', 'shopping'], budget: 'medium', accommodation: 'mid-range' },
    safetyRating: 4.4,
    lastCheckIn: new Date(Date.now() - 6300000).toISOString()
  },
  {
    id: generateRandomId('TST'),
    name: 'Anna Petrov',
    profilePic: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    status: 'active',
    location: { lat: 28.5678, lng: 77.1234 },
    nationality: 'Russian',
    age: 30,
    emergencyContact: { name: 'Dmitri Petrov', phone: '+7-495-123-4567', relationship: 'Husband' },
    travelPreferences: { interests: ['literature', 'history'], budget: 'high', accommodation: 'luxury' },
    safetyRating: 4.1,
    lastCheckIn: new Date(Date.now() - 7200000).toISOString()
  },
  {
    id: generateRandomId('TST'),
    name: 'Carlos Silva',
    profilePic: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    status: 'inactive',
    location: { lat: 28.6789, lng: 77.4567 },
    nationality: 'Brazilian',
    age: 34,
    emergencyContact: { name: 'Ana Silva', phone: '+55-11-1234-5678', relationship: 'Wife' },
    travelPreferences: { interests: ['dance', 'beaches'], budget: 'medium', accommodation: 'mid-range' },
    safetyRating: 3.7,
    lastCheckIn: new Date(Date.now() - 345600000).toISOString()
  },
  {
    id: generateRandomId('TST'),
    name: 'Lisa Anderson',
    profilePic: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
    status: 'active',
    location: { lat: 28.5890, lng: 77.2345 },
    nationality: 'Canadian',
    age: 24,
    emergencyContact: { name: 'Mark Anderson', phone: '+1-416-123-4567', relationship: 'Father' },
    travelPreferences: { interests: ['hiking', 'wildlife'], budget: 'low', accommodation: 'budget' },
    safetyRating: 4.0,
    lastCheckIn: new Date(Date.now() - 8100000).toISOString()
  },
  {
    id: generateRandomId('TST'),
    name: 'Raj Patel',
    profilePic: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    status: 'active',
    location: { lat: 28.6345, lng: 77.1678 },
    nationality: 'Indian-American',
    age: 36,
    emergencyContact: { name: 'Priya Patel', phone: '+1-555-9876', relationship: 'Wife' },
    travelPreferences: { interests: ['family', 'temples'], budget: 'high', accommodation: 'luxury' },
    safetyRating: 4.9,
    lastCheckIn: new Date(Date.now() - 9000000).toISOString()
  },
  {
    id: generateRandomId('TST'),
    name: 'Jennifer Lee',
    profilePic: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    status: 'inactive',
    location: { lat: 28.5234, lng: 77.3789 },
    nationality: 'Singaporean',
    age: 22,
    emergencyContact: { name: 'Kevin Lee', phone: '+65-6123-4567', relationship: 'Brother' },
    travelPreferences: { interests: ['shopping', 'food'], budget: 'medium', accommodation: 'mid-range' },
    safetyRating: 3.6,
    lastCheckIn: new Date(Date.now() - 432000000).toISOString()
  },
  {
    id: generateRandomId('TST'),
    name: 'Thomas Mueller',
    profilePic: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    status: 'active',
    location: { lat: 28.6567, lng: 77.2890 },
    nationality: 'German',
    age: 38,
    emergencyContact: { name: 'Ingrid Mueller', phone: '+49-30-12345678', relationship: 'Wife' },
    travelPreferences: { interests: ['engineering', 'museums'], budget: 'high', accommodation: 'luxury' },
    safetyRating: 4.5,
    lastCheckIn: new Date(Date.now() - 10800000).toISOString()
  }
];

// Mock trips
export const mockTrips: Trip[] = [
  // Active trips
  {
    id: generateRandomId('TRIP'),
    touristId: mockTourists[0].id,
    touristName: mockTourists[0].name,
    city: 'New Delhi',
    startDate: new Date(2025, 0, 15).toISOString(),
    endDate: new Date(2025, 0, 22).toISOString(),
    status: 'active',
    route: [
      { lat: 28.6139, lng: 77.2090 },
      { lat: 28.6200, lng: 77.2200 },
      { lat: 28.6100, lng: 77.2250 },
      { lat: 28.6050, lng: 77.2100 }
    ],
    visitedPlaces: [
      { type: 'hotel', name: 'The Leela Palace', location: { lat: 28.6149, lng: 77.2190 } },
      { type: 'restaurant', name: 'Bukhara Restaurant', location: { lat: 28.6200, lng: 77.2300 } },
      { type: 'temple', name: 'Lotus Temple', location: { lat: 28.6100, lng: 77.2350 } },
      { type: 'tourist_spot', name: 'India Gate', location: { lat: 28.6050, lng: 77.2200 } }
    ]
  },
  {
    id: generateRandomId('TRIP'),
    touristId: mockTourists[1].id,
    touristName: mockTourists[1].name,
    city: 'Mumbai',
    startDate: new Date(2025, 0, 18).toISOString(),
    endDate: new Date(2025, 0, 25).toISOString(),
    status: 'active',
    route: [
      { lat: 19.0760, lng: 72.8777 },
      { lat: 19.0800, lng: 72.8800 },
      { lat: 19.0700, lng: 72.8850 }
    ],
    visitedPlaces: [
      { type: 'hotel', name: 'Taj Mahal Palace', location: { lat: 19.0770, lng: 72.8787 } },
      { type: 'restaurant', name: 'Trishna Restaurant', location: { lat: 19.0810, lng: 72.8810 } },
      { type: 'temple', name: 'Siddhivinayak Temple', location: { lat: 19.0710, lng: 72.8860 } },
      { type: 'tourist_spot', name: 'Gateway of India', location: { lat: 19.0780, lng: 72.8790 } }
    ]
  },
  {
    id: generateRandomId('TRIP'),
    touristId: mockTourists[4].id,
    touristName: mockTourists[4].name,
    city: 'Jaipur',
    startDate: new Date(2025, 0, 20).toISOString(),
    endDate: new Date(2025, 0, 27).toISOString(),
    status: 'active',
    route: [
      { lat: 26.9124, lng: 75.7873 },
      { lat: 26.9200, lng: 75.7900 },
      { lat: 26.9100, lng: 75.7950 }
    ],
    visitedPlaces: [
      { type: 'hotel', name: 'Rambagh Palace', location: { lat: 26.9134, lng: 75.7883 } },
      { type: 'restaurant', name: 'Laxmi Misthan Bhandar', location: { lat: 26.9210, lng: 75.7910 } },
      { type: 'temple', name: 'Govind Devji Temple', location: { lat: 26.9110, lng: 75.7960 } },
      { type: 'tourist_spot', name: 'Hawa Mahal', location: { lat: 26.9140, lng: 75.7890 } }
    ]
  },
  {
    id: generateRandomId('TRIP'),
    touristId: mockTourists[5].id,
    touristName: mockTourists[5].name,
    city: 'Goa',
    startDate: new Date(2025, 0, 22).toISOString(),
    endDate: new Date(2025, 0, 29).toISOString(),
    status: 'active',
    route: [
      { lat: 15.2993, lng: 74.1240 },
      { lat: 15.3050, lng: 74.1300 },
      { lat: 15.2950, lng: 74.1350 }
    ],
    visitedPlaces: [
      { type: 'hotel', name: 'Taj Exotica Resort', location: { lat: 15.3003, lng: 74.1250 } },
      { type: 'restaurant', name: 'Martin\'s Corner', location: { lat: 15.3060, lng: 74.1310 } },
      { type: 'temple', name: 'Shri Mangeshi Temple', location: { lat: 15.2960, lng: 74.1360 } },
      { type: 'tourist_spot', name: 'Calangute Beach', location: { lat: 15.3010, lng: 74.1260 } }
    ]
  },
  {
    id: generateRandomId('TRIP'),
    touristId: mockTourists[6].id,
    touristName: mockTourists[6].name,
    city: 'Agra',
    startDate: new Date(2025, 0, 25).toISOString(),
    endDate: new Date(2025, 0, 28).toISOString(),
    status: 'active',
    route: [
      { lat: 27.1767, lng: 78.0081 },
      { lat: 27.1800, lng: 78.0100 },
      { lat: 27.1750, lng: 78.0150 }
    ],
    visitedPlaces: [
      { type: 'hotel', name: 'The Oberoi Amarvilas', location: { lat: 27.1777, lng: 78.0091 } },
      { type: 'restaurant', name: 'Pinch Of Spice', location: { lat: 27.1810, lng: 78.0110 } },
      { type: 'temple', name: 'Mankameshwar Temple', location: { lat: 27.1760, lng: 78.0160 } },
      { type: 'tourist_spot', name: 'Taj Mahal', location: { lat: 27.1780, lng: 78.0100 } }
    ]
  },
  // Completed trips
  {
    id: generateRandomId('TRIP'),
    touristId: mockTourists[2].id,
    touristName: mockTourists[2].name,
    city: 'Kolkata',
    startDate: new Date(2024, 11, 10).toISOString(),
    endDate: new Date(2024, 11, 17).toISOString(),
    status: 'completed',
    route: [
      { lat: 22.5726, lng: 88.3639 },
      { lat: 22.5800, lng: 88.3700 },
      { lat: 22.5700, lng: 88.3750 }
    ],
    visitedPlaces: [
      { type: 'hotel', name: 'The Oberoi Grand', location: { lat: 22.5736, lng: 88.3649 } },
      { type: 'restaurant', name: 'Peter Cat', location: { lat: 22.5810, lng: 88.3710 } },
      { type: 'temple', name: 'Kalighat Temple', location: { lat: 22.5710, lng: 88.3760 } },
      { type: 'tourist_spot', name: 'Victoria Memorial', location: { lat: 22.5740, lng: 88.3650 } }
    ]
  },
  {
    id: generateRandomId('TRIP'),
    touristId: mockTourists[3].id,
    touristName: mockTourists[3].name,
    city: 'Bangalore',
    startDate: new Date(2024, 11, 15).toISOString(),
    endDate: new Date(2024, 11, 22).toISOString(),
    status: 'completed',
    route: [
      { lat: 12.9716, lng: 77.5946 },
      { lat: 12.9800, lng: 77.6000 },
      { lat: 12.9700, lng: 77.6050 }
    ],
    visitedPlaces: [
      { type: 'hotel', name: 'The Leela Palace Bangalore', location: { lat: 12.9726, lng: 77.5956 } },
      { type: 'restaurant', name: 'Karavalli', location: { lat: 12.9810, lng: 77.6010 } },
      { type: 'temple', name: 'ISKCON Temple', location: { lat: 12.9710, lng: 77.6060 } },
      { type: 'tourist_spot', name: 'Lalbagh Botanical Garden', location: { lat: 12.9730, lng: 77.5960 } }
    ]
  },
  {
    id: generateRandomId('TRIP'),
    touristId: mockTourists[7].id,
    touristName: mockTourists[7].name,
    city: 'Chennai',
    startDate: new Date(2024, 11, 20).toISOString(),
    endDate: new Date(2024, 11, 27).toISOString(),
    status: 'completed',
    route: [
      { lat: 13.0827, lng: 80.2707 },
      { lat: 13.0900, lng: 80.2800 },
      { lat: 13.0800, lng: 80.2850 }
    ],
    visitedPlaces: [
      { type: 'hotel', name: 'The Park Chennai', location: { lat: 13.0837, lng: 80.2717 } },
      { type: 'restaurant', name: 'Murugan Idli Shop', location: { lat: 13.0910, lng: 80.2810 } },
      { type: 'temple', name: 'Kapaleeshwarar Temple', location: { lat: 13.0810, lng: 80.2860 } },
      { type: 'tourist_spot', name: 'Marina Beach', location: { lat: 13.0840, lng: 80.2720 } }
    ]
  },
  {
    id: generateRandomId('TRIP'),
    touristId: mockTourists[8].id,
    touristName: mockTourists[8].name,
    city: 'Hyderabad',
    startDate: new Date(2024, 11, 25).toISOString(),
    endDate: new Date(2025, 0, 2).toISOString(),
    status: 'completed',
    route: [
      { lat: 17.3850, lng: 78.4867 },
      { lat: 17.3900, lng: 78.4900 },
      { lat: 17.3800, lng: 78.4950 }
    ],
    visitedPlaces: [
      { type: 'hotel', name: 'Taj Falaknuma Palace', location: { lat: 17.3860, lng: 78.4877 } },
      { type: 'restaurant', name: 'Paradise Restaurant', location: { lat: 17.3910, lng: 78.4910 } },
      { type: 'temple', name: 'Birla Mandir', location: { lat: 17.3810, lng: 78.4960 } },
      { type: 'tourist_spot', name: 'Charminar', location: { lat: 17.3870, lng: 78.4880 } }
    ]
  },
  {
    id: generateRandomId('TRIP'),
    touristId: mockTourists[9].id,
    touristName: mockTourists[9].name,
    city: 'Kochi',
    startDate: new Date(2025, 0, 5).toISOString(),
    endDate: new Date(2025, 0, 12).toISOString(),
    status: 'completed',
    route: [
      { lat: 9.9312, lng: 76.2673 },
      { lat: 9.9400, lng: 76.2700 },
      { lat: 9.9300, lng: 76.2750 }
    ],
    visitedPlaces: [
      { type: 'hotel', name: 'Brunton Boatyard', location: { lat: 9.9322, lng: 76.2683 } },
      { type: 'restaurant', name: 'Grand Hotel Restaurant', location: { lat: 9.9410, lng: 76.2710 } },
      { type: 'temple', name: 'Ernakulam Shiva Temple', location: { lat: 9.9310, lng: 76.2760 } },
      { type: 'tourist_spot', name: 'Chinese Fishing Nets', location: { lat: 9.9330, lng: 76.2690 } }
    ]
  }
];

// Mock alerts
export const mockAlerts: Alert[] = [
  {
    id: generateRandomId('ALT'),
    touristId: mockTourists[0].id,
    touristName: mockTourists[0].name,
    profilePic: mockTourists[0].profilePic,
    title: 'Emergency Alert',
    description: 'Tourist entered restricted zone near government building',
    severity: 'emergency',
    status: 'active',
    timestamp: new Date().toISOString(),
    location: mockTourists[0].location
  },
  {
    id: generateRandomId('ALT'),
    touristId: mockTourists[1].id,
    touristName: mockTourists[1].name,
    profilePic: mockTourists[1].profilePic,
    title: 'Weather Warning',
    description: 'Heavy rainfall and flooding expected in Mumbai area',
    severity: 'warning',
    status: 'pending',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    location: mockTourists[1].location
  },
  {
    id: generateRandomId('ALT'),
    touristId: mockTourists[4].id,
    touristName: mockTourists[4].name,
    profilePic: mockTourists[4].profilePic,
    title: 'Medical Emergency',
    description: 'Tourist reported feeling unwell, requesting medical assistance',
    severity: 'emergency',
    status: 'active',
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    location: mockTourists[4].location
  },
  {
    id: generateRandomId('ALT'),
    touristId: mockTourists[5].id,
    touristName: mockTourists[5].name,
    profilePic: mockTourists[5].profilePic,
    title: 'Lost Tourist',
    description: 'Tourist separated from group, last seen near beach area',
    severity: 'warning',
    status: 'pending',
    timestamp: new Date(Date.now() - 2700000).toISOString(),
    location: mockTourists[5].location
  },
  {
    id: generateRandomId('ALT'),
    touristId: mockTourists[6].id,
    touristName: mockTourists[6].name,
    profilePic: mockTourists[6].profilePic,
    title: 'Transportation Issue',
    description: 'Tourist stranded due to cancelled flight, needs accommodation assistance',
    severity: 'moderate',
    status: 'active',
    timestamp: new Date(Date.now() - 5400000).toISOString(),
    location: mockTourists[6].location
  },
  {
    id: generateRandomId('ALT'),
    touristId: mockTourists[8].id,
    touristName: mockTourists[8].name,
    profilePic: mockTourists[8].profilePic,
    title: 'Language Barrier',
    description: 'Tourist having difficulty communicating with locals',
    severity: 'moderate',
    status: 'resolved',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    location: mockTourists[8].location
  },
  {
    id: generateRandomId('ALT'),
    touristId: mockTourists[9].id,
    touristName: mockTourists[9].name,
    profilePic: mockTourists[9].profilePic,
    title: 'Theft Report',
    description: 'Tourist reported wallet stolen, needs embassy contact',
    severity: 'warning',
    status: 'pending',
    timestamp: new Date(Date.now() - 9000000).toISOString(),
    location: mockTourists[9].location
  },
  {
    id: generateRandomId('ALT'),
    touristId: mockTourists[10].id,
    touristName: mockTourists[10].name,
    profilePic: mockTourists[10].profilePic,
    title: 'Cultural Misunderstanding',
    description: 'Tourist accidentally violated local customs, needs guidance',
    severity: 'moderate',
    status: 'resolved',
    timestamp: new Date(Date.now() - 10800000).toISOString(),
    location: mockTourists[10].location
  },
  {
    id: generateRandomId('ALT'),
    touristId: mockTourists[11].id,
    touristName: mockTourists[11].name,
    profilePic: mockTourists[11].profilePic,
    title: 'Food Allergy',
    description: 'Tourist experiencing allergic reaction, needs medical attention',
    severity: 'emergency',
    status: 'active',
    timestamp: new Date(Date.now() - 12600000).toISOString(),
    location: mockTourists[11].location
  },
  {
    id: generateRandomId('ALT'),
    touristId: mockTourists[12].id,
    touristName: mockTourists[12].name,
    profilePic: mockTourists[12].profilePic,
    title: 'Crowd Safety',
    description: 'Tourist caught in large crowd during festival, needs assistance',
    severity: 'warning',
    status: 'pending',
    timestamp: new Date(Date.now() - 14400000).toISOString(),
    location: mockTourists[12].location
  },
  {
    id: generateRandomId('ALT'),
    touristId: mockTourists[13].id,
    touristName: mockTourists[13].name,
    profilePic: mockTourists[13].profilePic,
    title: 'Transportation Delay',
    description: 'Tourist missed connecting flight, needs rebooking assistance',
    severity: 'moderate',
    status: 'resolved',
    timestamp: new Date(Date.now() - 16200000).toISOString(),
    location: mockTourists[13].location
  },
  {
    id: generateRandomId('ALT'),
    touristId: mockTourists[14].id,
    touristName: mockTourists[14].name,
    profilePic: mockTourists[14].profilePic,
    title: 'Document Issue',
    description: 'Tourist passport damaged, needs embassy assistance',
    severity: 'warning',
    status: 'pending',
    timestamp: new Date(Date.now() - 18000000).toISOString(),
    location: mockTourists[14].location
  }
];

// Mock reports
export const mockReports: Report[] = [
  {
    id: generateRandomId('RPT'),
    tripId: mockTrips[5].id,
    touristId: mockTrips[5].touristId,
    touristName: mockTrips[5].touristName,
    zones: [
      {
        type: 'danger',
        name: 'High Crime Area - Park Street',
        timestamp: new Date(Date.now() - 86400000).toISOString()
      },
      {
        type: 'moderate',
        name: 'Crowded Market Zone - New Market',
        timestamp: new Date(Date.now() - 43200000).toISOString()
      },
      {
        type: 'restricted',
        name: 'Government Building Area',
        timestamp: new Date(Date.now() - 21600000).toISOString()
      }
    ],
    summary: 'Trip completed successfully with 3 safety alerts. Tourist visited 8 locations, encountered 1 minor incident with pickpocketing attempt. Overall safety rating: Good.',
    timestamp: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: generateRandomId('RPT'),
    tripId: mockTrips[6].id,
    touristId: mockTrips[6].touristId,
    touristName: mockTrips[6].touristName,
    zones: [
      {
        type: 'moderate',
        name: 'Traffic Congestion - MG Road',
        timestamp: new Date(Date.now() - 172800000).toISOString()
      },
      {
        type: 'congested',
        name: 'Shopping District - Commercial Street',
        timestamp: new Date(Date.now() - 129600000).toISOString()
      }
    ],
    summary: 'Excellent trip with no major incidents. Tourist enjoyed local cuisine and cultural sites. Minor traffic delays encountered. Safety rating: Excellent.',
    timestamp: new Date(Date.now() - 7200000).toISOString()
  },
  {
    id: generateRandomId('RPT'),
    tripId: mockTrips[7].id,
    touristId: mockTrips[7].touristId,
    touristName: mockTrips[7].touristName,
    zones: [
      {
        type: 'danger',
        name: 'Beach Safety Warning - Marina Beach',
        timestamp: new Date(Date.now() - 259200000).toISOString()
      },
      {
        type: 'moderate',
        name: 'Temple Crowd - Kapaleeshwarar',
        timestamp: new Date(Date.now() - 216000000).toISOString()
      },
      {
        type: 'congested',
        name: 'Market Area - T. Nagar',
        timestamp: new Date(Date.now() - 172800000).toISOString()
      }
    ],
    summary: 'Trip completed with 1 safety incident - tourist got separated from group briefly at beach but was quickly located. Overall experience was positive. Safety rating: Good.',
    timestamp: new Date(Date.now() - 10800000).toISOString()
  },
  {
    id: generateRandomId('RPT'),
    tripId: mockTrips[8].id,
    touristId: mockTrips[8].touristId,
    touristName: mockTrips[8].touristName,
    zones: [
      {
        type: 'moderate',
        name: 'Old City Traffic - Charminar Area',
        timestamp: new Date(Date.now() - 345600000).toISOString()
      },
      {
        type: 'congested',
        name: 'Shopping District - Laad Bazaar',
        timestamp: new Date(Date.now() - 302400000).toISOString()
      },
      {
        type: 'restricted',
        name: 'Golconda Fort - Archaeological Zone',
        timestamp: new Date(Date.now() - 259200000).toISOString()
      }
    ],
    summary: 'Outstanding cultural experience with excellent safety record. Tourist thoroughly enjoyed historical sites and local cuisine. No incidents reported. Safety rating: Excellent.',
    timestamp: new Date(Date.now() - 14400000).toISOString()
  },
  {
    id: generateRandomId('RPT'),
    tripId: mockTrips[9].id,
    touristId: mockTrips[9].touristId,
    touristName: mockTrips[9].touristName,
    zones: [
      {
        type: 'moderate',
        name: 'Backwater Navigation - Alleppey',
        timestamp: new Date(Date.now() - 432000000).toISOString()
      },
      {
        type: 'congested',
        name: 'Spice Market - Jew Town',
        timestamp: new Date(Date.now() - 388800000).toISOString()
      },
      {
        type: 'danger',
        name: 'Beach Safety - Fort Kochi',
        timestamp: new Date(Date.now() - 345600000).toISOString()
      }
    ],
    summary: 'Memorable backwater experience with one minor incident - tourist slipped on wet deck but no injuries. Excellent local guide assistance. Safety rating: Good.',
    timestamp: new Date(Date.now() - 18000000).toISOString()
  }
];

// Safety zones (GeoJSON-like data)
export const safetyZones = [
  // Delhi Zones
  {
    type: 'safe',
    name: 'Connaught Place - Tourist District',
    coordinates: [
      { lat: 28.6139, lng: 77.2090 },
      { lat: 28.6200, lng: 77.2200 },
      { lat: 28.6100, lng: 77.2250 },
      { lat: 28.6050, lng: 77.2100 }
    ]
  },
  {
    type: 'danger',
    name: 'Government Restricted Area',
    coordinates: [
      { lat: 28.7041, lng: 77.1025 },
      { lat: 28.7100, lng: 77.1100 },
      { lat: 28.7000, lng: 77.1150 }
    ]
  },
  {
    type: 'moderate',
    name: 'Chandni Chowk Market',
    coordinates: [
      { lat: 28.6500, lng: 77.2300 },
      { lat: 28.6550, lng: 77.2400 },
      { lat: 28.6450, lng: 77.2450 }
    ]
  },
  {
    type: 'congested',
    name: 'Karol Bagh Shopping Area',
    coordinates: [
      { lat: 28.6450, lng: 77.1900 },
      { lat: 28.6500, lng: 77.2000 },
      { lat: 28.6400, lng: 77.2050 }
    ]
  },
  // Mumbai Zones
  {
    type: 'safe',
    name: 'Marine Drive - Tourist Area',
    coordinates: [
      { lat: 19.0760, lng: 72.8777 },
      { lat: 19.0800, lng: 72.8800 },
      { lat: 19.0700, lng: 72.8850 }
    ]
  },
  {
    type: 'moderate',
    name: 'Crawford Market',
    coordinates: [
      { lat: 18.9500, lng: 72.8300 },
      { lat: 18.9550, lng: 72.8350 },
      { lat: 18.9450, lng: 77.8400 }
    ]
  },
  {
    type: 'danger',
    name: 'Dharavi Area',
    coordinates: [
      { lat: 19.0400, lng: 72.8500 },
      { lat: 19.0450, lng: 72.8550 },
      { lat: 19.0350, lng: 72.8600 }
    ]
  },
  // Jaipur Zones
  {
    type: 'safe',
    name: 'Pink City Heritage Zone',
    coordinates: [
      { lat: 26.9124, lng: 75.7873 },
      { lat: 26.9200, lng: 75.7900 },
      { lat: 26.9100, lng: 75.7950 }
    ]
  },
  {
    type: 'moderate',
    name: 'Bapu Bazaar',
    coordinates: [
      { lat: 26.9000, lng: 75.8000 },
      { lat: 26.9050, lng: 75.8050 },
      { lat: 26.8950, lng: 75.8100 }
    ]
  },
  // Goa Zones
  {
    type: 'safe',
    name: 'Calangute Beach Area',
    coordinates: [
      { lat: 15.2993, lng: 74.1240 },
      { lat: 15.3050, lng: 74.1300 },
      { lat: 15.2950, lng: 74.1350 }
    ]
  },
  {
    type: 'moderate',
    name: 'Anjuna Flea Market',
    coordinates: [
      { lat: 15.5800, lng: 73.7400 },
      { lat: 15.5850, lng: 73.7450 },
      { lat: 15.5750, lng: 73.7500 }
    ]
  },
  // Agra Zones
  {
    type: 'safe',
    name: 'Taj Mahal Complex',
    coordinates: [
      { lat: 27.1767, lng: 78.0081 },
      { lat: 27.1800, lng: 78.0100 },
      { lat: 27.1750, lng: 78.0150 }
    ]
  },
  {
    type: 'moderate',
    name: 'Agra Fort Area',
    coordinates: [
      { lat: 27.1900, lng: 78.0200 },
      { lat: 27.1950, lng: 78.0250 },
      { lat: 27.1850, lng: 78.0300 }
    ]
  },
  // Kolkata Zones
  {
    type: 'safe',
    name: 'Park Street Area',
    coordinates: [
      { lat: 22.5726, lng: 88.3639 },
      { lat: 22.5800, lng: 88.3700 },
      { lat: 22.5700, lng: 88.3750 }
    ]
  },
  {
    type: 'danger',
    name: 'Howrah Station Area',
    coordinates: [
      { lat: 22.5800, lng: 88.3400 },
      { lat: 22.5850, lng: 88.3450 },
      { lat: 22.5750, lng: 88.3500 }
    ]
  },
  // Bangalore Zones
  {
    type: 'safe',
    name: 'MG Road Commercial District',
    coordinates: [
      { lat: 12.9716, lng: 77.5946 },
      { lat: 12.9800, lng: 77.6000 },
      { lat: 12.9700, lng: 77.6050 }
    ]
  },
  {
    type: 'congested',
    name: 'Commercial Street',
    coordinates: [
      { lat: 12.9600, lng: 77.6100 },
      { lat: 12.9650, lng: 77.6150 },
      { lat: 12.9550, lng: 77.6200 }
    ]
  },
  // Chennai Zones
  {
    type: 'safe',
    name: 'Marina Beach Area',
    coordinates: [
      { lat: 13.0827, lng: 80.2707 },
      { lat: 13.0900, lng: 80.2800 },
      { lat: 13.0800, lng: 80.2850 }
    ]
  },
  {
    type: 'moderate',
    name: 'T. Nagar Shopping District',
    coordinates: [
      { lat: 13.0400, lng: 80.2300 },
      { lat: 13.0450, lng: 80.2350 },
      { lat: 13.0350, lng: 80.2400 }
    ]
  },
  // Hyderabad Zones
  {
    type: 'safe',
    name: 'Charminar Heritage Zone',
    coordinates: [
      { lat: 17.3850, lng: 78.4867 },
      { lat: 17.3900, lng: 78.4900 },
      { lat: 17.3800, lng: 78.4950 }
    ]
  },
  {
    type: 'congested',
    name: 'Laad Bazaar',
    coordinates: [
      { lat: 17.3750, lng: 78.4800 },
      { lat: 17.3800, lng: 78.4850 },
      { lat: 17.3700, lng: 78.4900 }
    ]
  },
  // Kochi Zones
  {
    type: 'safe',
    name: 'Fort Kochi Heritage Area',
    coordinates: [
      { lat: 9.9312, lng: 76.2673 },
      { lat: 9.9400, lng: 76.2700 },
      { lat: 9.9300, lng: 76.2750 }
    ]
  },
  {
    type: 'moderate',
    name: 'Jew Town Spice Market',
    coordinates: [
      { lat: 9.9200, lng: 76.2600 },
      { lat: 9.9250, lng: 76.2650 },
      { lat: 9.9150, lng: 76.2700 }
    ]
  },
  
  // Additional High-Risk Zones
  {
    type: 'danger',
    name: 'Delhi Railway Station - Pickpocket Hotspot',
    coordinates: [
      { lat: 28.6600, lng: 77.2200 },
      { lat: 28.6650, lng: 77.2250 },
      { lat: 28.6550, lng: 77.2300 },
      { lat: 28.6620, lng: 77.2220 }
    ]
  },
  {
    type: 'danger',
    name: 'Mumbai Central Station - High Crime',
    coordinates: [
      { lat: 19.0200, lng: 72.8400 },
      { lat: 19.0250, lng: 72.8450 },
      { lat: 19.0150, lng: 72.8500 },
      { lat: 19.0220, lng: 72.8420 }
    ]
  },
  
  // Additional Moderate Risk Zones
  {
    type: 'moderate',
    name: 'Delhi Metro Stations - Crowded',
    coordinates: [
      { lat: 28.6200, lng: 77.2000 },
      { lat: 28.6250, lng: 77.2050 },
      { lat: 28.6150, lng: 77.2100 },
      { lat: 28.6220, lng: 77.2020 }
    ]
  },
  {
    type: 'moderate',
    name: 'Mumbai Local Train Stations - Rush Hour Risk',
    coordinates: [
      { lat: 19.1000, lng: 72.8200 },
      { lat: 19.1050, lng: 72.8250 },
      { lat: 19.0950, lng: 72.8300 },
      { lat: 19.1020, lng: 72.8220 }
    ]
  },
  
  // Additional Safe Zones
  {
    type: 'safe',
    name: 'Delhi Airport Area - Monitored',
    coordinates: [
      { lat: 28.5562, lng: 77.1000 },
      { lat: 28.5600, lng: 77.1050 },
      { lat: 28.5500, lng: 77.1100 },
      { lat: 28.5580, lng: 77.1020 }
    ]
  },
  {
    type: 'safe',
    name: 'Mumbai Airport Area - Secure',
    coordinates: [
      { lat: 19.0886, lng: 72.8681 },
      { lat: 19.0920, lng: 72.8720 },
      { lat: 19.0850, lng: 72.8750 },
      { lat: 19.0900, lng: 72.8700 }
    ]
  },
  
  // Additional Congested Zones
  {
    type: 'congested',
    name: 'Delhi Bus Stands - Heavy Traffic',
    coordinates: [
      { lat: 28.6300, lng: 77.1800 },
      { lat: 28.6350, lng: 77.1850 },
      { lat: 28.6250, lng: 77.1900 },
      { lat: 28.6320, lng: 77.1820 }
    ]
  },
  {
    type: 'congested',
    name: 'Mumbai Bus Depots - Peak Hours',
    coordinates: [
      { lat: 19.0500, lng: 72.8200 },
      { lat: 19.0550, lng: 72.8250 },
      { lat: 19.0450, lng: 72.8300 },
      { lat: 19.0520, lng: 72.8220 }
    ]
  }
];
