import { Bus, Route, Stop, CCTVFeed } from '@/types';

// Delhi metro area coordinates for realistic demo
export const delhiCenter: [number, number] = [77.2090, 28.6139];

export const mockStops: Stop[] = [
  {
    id: 'stop_1',
    name: 'Connaught Place',
    lat: 28.6304,
    lng: 77.2177,
    code: 'CP01',
    amenities: ['Shelter', 'Digital Display', 'WiFi'],
    routes: ['route_1', 'route_2']
  },
  {
    id: 'stop_2',
    name: 'India Gate',
    lat: 28.6129,
    lng: 77.2295,
    code: 'IG01',
    amenities: ['Shelter', 'Digital Display'],
    routes: ['route_1', 'route_3']
  },
  {
    id: 'stop_3',
    name: 'Red Fort',
    lat: 28.6562,
    lng: 77.2410,
    code: 'RF01',
    amenities: ['Shelter', 'Toilet', 'Food Court'],
    routes: ['route_2', 'route_3']
  },
  {
    id: 'stop_4',
    name: 'Lotus Temple',
    lat: 28.5535,
    lng: 77.2588,
    code: 'LT01',
    amenities: ['Shelter', 'Digital Display', 'ATM'],
    routes: ['route_1', 'route_4']
  },
  {
    id: 'stop_5',
    name: 'Qutub Minar',
    lat: 28.5244,
    lng: 77.1855,
    code: 'QM01',
    amenities: ['Shelter', 'Parking'],
    routes: ['route_4', 'route_5']
  },
  {
    id: 'stop_6',
    name: 'AIIMS',
    lat: 28.5672,
    lng: 77.2100,
    code: 'AMS01',
    amenities: ['Shelter', 'Digital Display', 'Medical Aid'],
    routes: ['route_2', 'route_5']
  }
];

export const mockRoutes: Route[] = [
  {
    id: 'route_1',
    name: 'Heritage Line',
    shortName: 'HL',
    type: 'regular',
    polyline: [
      [77.2177, 28.6304], // Connaught Place
      [77.2200, 28.6250],
      [77.2250, 28.6200],
      [77.2295, 28.6129], // India Gate
      [77.2350, 28.5900],
      [77.2500, 28.5700],
      [77.2588, 28.5535]  // Lotus Temple
    ],
    stops: ['stop_1', 'stop_2', 'stop_4'],
    color: '#3B82F6',
    fare: 25,
    isActive: true
  },
  {
    id: 'route_2',
    name: 'Central Delhi Express',
    shortName: 'CDE',
    type: 'express',
    polyline: [
      [77.2177, 28.6304], // Connaught Place
      [77.2300, 28.6400],
      [77.2410, 28.6562], // Red Fort
      [77.2200, 28.5800],
      [77.2100, 28.5672]  // AIIMS
    ],
    stops: ['stop_1', 'stop_3', 'stop_6'],
    color: '#10B981',
    fare: 35,
    isActive: true
  },
  {
    id: 'route_3',
    name: 'Historical Circuit',
    shortName: 'HC',
    type: 'regular',
    polyline: [
      [77.2295, 28.6129], // India Gate
      [77.2350, 28.6300],
      [77.2410, 28.6562]  // Red Fort
    ],
    stops: ['stop_2', 'stop_3'],
    color: '#F59E0B',
    fare: 20,
    isActive: true
  },
  {
    id: 'route_4',
    name: 'South Delhi Connector',
    shortName: 'SDC',
    type: 'shuttle',
    polyline: [
      [77.2588, 28.5535], // Lotus Temple
      [77.2300, 28.5400],
      [77.2000, 28.5300],
      [77.1855, 28.5244]  // Qutub Minar
    ],
    stops: ['stop_4', 'stop_5'],
    color: '#EF4444',
    fare: 30,
    isActive: true
  },
  {
    id: 'route_5',
    name: 'Medical District',
    shortName: 'MD',
    type: 'regular',
    polyline: [
      [77.1855, 28.5244], // Qutub Minar
      [77.1950, 28.5400],
      [77.2100, 28.5672]  // AIIMS
    ],
    stops: ['stop_5', 'stop_6'],
    color: '#8B5CF6',
    fare: 25,
    isActive: true
  }
];

export const mockBuses: Bus[] = [
  {
    id: 'bus_1',
    regNo: 'DL01AB1234',
    routeId: 'route_1',
    lat: 28.6250,
    lng: 77.2200,
    speed: 25,
    occupancy: 65,
    status: 'active',
    driverName: 'Rajesh Kumar',
    lastUpdated: new Date(),
    heading: 45,
    nextStopId: 'stop_2',
    eta: 8
  },
  {
    id: 'bus_2',
    regNo: 'DL01CD5678',
    routeId: 'route_2',
    lat: 28.6350,
    lng: 77.2250,
    speed: 30,
    occupancy: 45,
    status: 'active',
    driverName: 'Priya Sharma',
    lastUpdated: new Date(),
    heading: 120,
    nextStopId: 'stop_3',
    eta: 5
  },
  {
    id: 'bus_3',
    regNo: 'DL01EF9012',
    routeId: 'route_1',
    lat: 28.5900,
    lng: 77.2350,
    speed: 0,
    occupancy: 85,
    status: 'active',
    driverName: 'Amit Singh',
    lastUpdated: new Date(),
    heading: 0,
    nextStopId: 'stop_4',
    eta: 0 // At stop
  },
  {
    id: 'bus_4',
    regNo: 'DL01GH3456',
    routeId: 'route_3',
    lat: 28.6200,
    lng: 77.2320,
    speed: 15,
    occupancy: 30,
    status: 'active',
    driverName: 'Sunita Devi',
    lastUpdated: new Date(),
    heading: 90,
    nextStopId: 'stop_3',
    eta: 12
  },
  {
    id: 'bus_5',
    regNo: 'DL01IJ7890',
    routeId: 'route_4',
    lat: 28.5400,
    lng: 77.2300,
    speed: 0,
    occupancy: 0,
    status: 'maintenance',
    driverName: 'Vikram Yadav',
    lastUpdated: new Date(),
    heading: 0,
    nextStopId: undefined,
    eta: undefined
  },
  {
    id: 'bus_6',
    regNo: 'DL01KL2468',
    routeId: 'route_5',
    lat: 28.5500,
    lng: 77.2000,
    speed: 20,
    occupancy: 55,
    status: 'active',
    driverName: 'Meera Gupta',
    lastUpdated: new Date(),
    heading: 60,
    nextStopId: 'stop_6',
    eta: 15
  }
];

export const mockCCTV: CCTVFeed[] = [
  {
    id: 'cctv_1',
    name: 'Connaught Place - Main',
    streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    lat: 28.6304,
    lng: 77.2177,
    status: 'online',
    busId: 'bus_1'
  },
  {
    id: 'cctv_2',
    name: 'India Gate Junction',
    streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    lat: 28.6129,
    lng: 77.2295,
    status: 'online'
  },
  {
    id: 'cctv_3',
    name: 'Red Fort Terminal',
    streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    lat: 28.6562,
    lng: 77.2410,
    status: 'offline'
  },
  {
    id: 'cctv_4',
    name: 'Bus DL01AB1234 Interior',
    streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    lat: 28.6250,
    lng: 77.2200,
    status: 'online',
    busId: 'bus_1'
  }
];

// Mock function to generate realistic bus movements
export const generateBusMovement = (bus: Bus, route: Route): Bus => {
  const routePoints = route.polyline;
  const currentIndex = Math.floor(Math.random() * routePoints.length);
  const nextIndex = (currentIndex + 1) % routePoints.length;
  
  const [currentLng, currentLat] = routePoints[currentIndex];
  const [nextLng, nextLat] = routePoints[nextIndex];
  
  // Interpolate between current and next point
  const progress = Math.random() * 0.1; // Small movement
  const newLat = currentLat + (nextLat - currentLat) * progress;
  const newLng = currentLng + (nextLng - currentLng) * progress;
  
  return {
    ...bus,
    lat: newLat,
    lng: newLng,
    speed: Math.max(0, Math.min(50, bus.speed + (Math.random() - 0.5) * 10)),
    occupancy: Math.max(0, Math.min(100, bus.occupancy + (Math.random() - 0.5) * 5)),
    lastUpdated: new Date(),
    eta: bus.eta ? Math.max(0, bus.eta + (Math.random() - 0.7)) : undefined
  };
};