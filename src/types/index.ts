export interface Bus {
  id: string;
  regNo: string;
  routeId: string;
  lat: number;
  lng: number;
  speed: number;
  occupancy: number; // 0-100
  status: 'active' | 'inactive' | 'maintenance' | 'emergency';
  driverName: string;
  lastUpdated: Date;
  heading?: number;
  nextStopId?: string;
  eta?: number; // minutes to next stop
}

export interface Route {
  id: string;
  name: string;
  shortName: string;
  type: 'regular' | 'express' | 'shuttle';
  polyline: [number, number][];
  stops: string[];
  color: string;
  fare: number;
  isActive: boolean;
}

export interface Stop {
  id: string;
  name: string;
  lat: number;
  lng: number;
  code: string;
  amenities: string[];
  routes: string[];
}

export interface CCTVFeed {
  id: string;
  name: string;
  streamUrl: string;
  lat: number;
  lng: number;
  status: 'online' | 'offline' | 'maintenance';
  busId?: string;
}

export interface Ticket {
  id: string;
  type: 'single' | 'day' | 'weekly' | 'monthly';
  routeId: string;
  fromStopId: string;
  toStopId: string;
  fare: number;
  issuedAt: Date;
  expiresAt: Date;
  qrData: string;
  status: 'valid' | 'used' | 'expired';
  transactionId: string;
}

export interface SOSAlert {
  id: string;
  userId: string;
  lat: number;
  lng: number;
  busId?: string;
  type: 'medical' | 'security' | 'technical' | 'other';
  message?: string;
  timestamp: Date;
  status: 'active' | 'acknowledged' | 'resolved';
}

export interface TripPlan {
  id: string;
  fromStop: Stop;
  toStop: Stop;
  routes: {
    route: Route;
    fromStopIndex: number;
    toStopIndex: number;
    estimatedTime: number;
  }[];
  totalTime: number;
  totalFare: number;
  transfers: number;
  walking: { distance: number; time: number }[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'COMMUTER' | 'OPERATOR' | 'ADMIN';
  avatar?: string;
  preferences: {
    theme: 'light' | 'dark' | 'system';
    notifications: boolean;
    defaultLocation?: [number, number];
  };
}

export interface WSMessage {
  type: 'bus_update' | 'route_update' | 'emergency' | 'announcement';
  data: any;
  timestamp: Date;
}

// AI Vision types
export interface PersonDetection {
  count: number;
  confidence: number;
  timestamp: Date;
  imageUrl?: string;
  boundingBoxes?: {
    x: number;
    y: number;
    width: number;
    height: number;
    confidence: number;
  }[];
}