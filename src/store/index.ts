import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Bus, Route, Stop, User, Ticket, TripPlan, SOSAlert } from '@/types';

interface AppState {
  // Auth
  user: User | null;
  isAuthenticated: boolean;
  
  // Transport data
  buses: Bus[];
  routes: Route[];
  stops: Stop[];
  selectedBus: Bus | null;
  selectedRoute: Route | null;
  
  // UI state
  isTrackingMode: boolean;
  mapCenter: [number, number];
  mapZoom: number;
  sidebarOpen: boolean;
  
  // Trip planning
  currentTrip: TripPlan | null;
  fromStop: Stop | null;
  toStop: Stop | null;
  
  // Tickets
  tickets: Ticket[];
  
  // Emergency
  sosAlerts: SOSAlert[];
  
  // Real-time updates
  isConnected: boolean;
  lastUpdateTime: Date | null;
  
  // Actions
  setUser: (user: User | null) => void;
  setBuses: (buses: Bus[]) => void;
  updateBus: (bus: Bus) => void;
  setRoutes: (routes: Route[]) => void;
  setStops: (stops: Stop[]) => void;
  selectBus: (bus: Bus | null) => void;
  selectRoute: (route: Route | null) => void;
  setTrackingMode: (enabled: boolean) => void;
  setMapView: (center: [number, number], zoom: number) => void;
  setSidebarOpen: (open: boolean) => void;
  setTripPlanning: (from: Stop | null, to: Stop | null) => void;
  setCurrentTrip: (trip: TripPlan | null) => void;
  addTicket: (ticket: Ticket) => void;
  addSOSAlert: (alert: SOSAlert) => void;
  setConnectionStatus: (connected: boolean) => void;
  updateLastUpdateTime: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      buses: [],
      routes: [],
      stops: [],
      selectedBus: null,
      selectedRoute: null,
      isTrackingMode: false,
      mapCenter: [77.2090, 28.6139], // Delhi coordinates
      mapZoom: 12,
      sidebarOpen: true,
      currentTrip: null,
      fromStop: null,
      toStop: null,
      tickets: [],
      sosAlerts: [],
      isConnected: false,
      lastUpdateTime: null,
      
      // Actions
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      
      setBuses: (buses) => set({ buses }),
      
      updateBus: (updatedBus) => set((state) => ({
        buses: state.buses.map(bus => 
          bus.id === updatedBus.id ? updatedBus : bus
        ),
        selectedBus: state.selectedBus?.id === updatedBus.id ? updatedBus : state.selectedBus
      })),
      
      setRoutes: (routes) => set({ routes }),
      setStops: (stops) => set({ stops }),
      selectBus: (bus) => set({ selectedBus: bus }),
      selectRoute: (route) => set({ selectedRoute: route }),
      
      setTrackingMode: (enabled) => set({ isTrackingMode: enabled }),
      
      setMapView: (center, zoom) => set({ mapCenter: center, mapZoom: zoom }),
      
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      
      setTripPlanning: (from, to) => set({ fromStop: from, toStop: to }),
      
      setCurrentTrip: (trip) => set({ currentTrip: trip }),
      
      addTicket: (ticket) => set((state) => ({
        tickets: [...state.tickets, ticket]
      })),
      
      addSOSAlert: (alert) => set((state) => ({
        sosAlerts: [...state.sosAlerts, alert]
      })),
      
      setConnectionStatus: (connected) => set({ isConnected: connected }),
      
      updateLastUpdateTime: () => set({ lastUpdateTime: new Date() }),
    }),
    {
      name: 'citybus-store',
      partialize: (state) => ({
        user: state.user,
        mapCenter: state.mapCenter,
        mapZoom: state.mapZoom,
        tickets: state.tickets,
        sidebarOpen: state.sidebarOpen,
      }),
    }
  )
);