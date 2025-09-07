import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useStore } from '@/store';
import { Bus, MapPin, Clock, Users, Navigation } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Track() {
  const { buses, routes, stops, selectedBus, selectBus, isConnected } = useStore();
  const [searchTerm, setSearchTerm] = useState('');

  // Filter buses based on search
  const filteredBuses = buses.filter(bus => 
    bus.regNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    routes.find(r => r.id === bus.routeId)?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getOccupancyColor = (occupancy: number) => {
    if (occupancy < 50) return 'bg-success';
    if (occupancy < 80) return 'bg-warning';
    return 'bg-emergency';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success';
      case 'inactive': return 'bg-muted';
      case 'maintenance': return 'bg-warning';
      case 'emergency': return 'bg-emergency';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Live Bus Tracking
        </h1>
        <p className="text-muted-foreground mt-2">
          Track buses in real-time across Delhi
        </p>
        
        {/* Connection Status */}
        <div className="flex items-center mt-4 gap-2">
          <div className={cn(
            "h-2 w-2 rounded-full",
            isConnected ? "bg-success animate-pulse" : "bg-emergency"
          )} />
          <span className="text-sm text-muted-foreground">
            {isConnected ? 'Live Updates Active' : 'Connection Lost'}
          </span>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by bus number or route..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-input rounded-lg bg-background"
        />
      </div>

      {/* Map Placeholder */}
      <Card className="mb-6 h-96 bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950">
        <CardContent className="flex items-center justify-center h-full">
          <div className="text-center">
            <MapPin className="h-16 w-16 mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Interactive Map</h3>
            <p className="text-muted-foreground mb-4">
              Live bus tracking with Mapbox integration
            </p>
            <Badge variant="secondary">Coming Soon</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Bus List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredBuses.map((bus) => {
          const route = routes.find(r => r.id === bus.routeId);
          const nextStop = stops.find(s => s.id === bus.nextStopId);
          
          return (
            <Card 
              key={bus.id} 
              className={cn(
                "cursor-pointer transition-all hover:shadow-lg",
                selectedBus?.id === bus.id && "ring-2 ring-primary"
              )}
              onClick={() => selectBus(selectedBus?.id === bus.id ? null : bus)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{bus.regNo}</CardTitle>
                  <Badge className={getStatusColor(bus.status)}>
                    {bus.status}
                  </Badge>
                </div>
                <CardDescription>
                  Route: {route?.name || 'Unknown'}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-3">
                {/* Speed & Location */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Navigation className="h-4 w-4" />
                    <span>{bus.speed} km/h</span>
                  </div>
                  <div className="text-muted-foreground">
                    {bus.lat.toFixed(4)}, {bus.lng.toFixed(4)}
                  </div>
                </div>

                {/* Occupancy */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>Occupancy</span>
                    </div>
                    <span className="font-medium">{bus.occupancy}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={cn("h-2 rounded-full transition-all", getOccupancyColor(bus.occupancy))}
                      style={{ width: `${bus.occupancy}%` }}
                    />
                  </div>
                </div>

                {/* Next Stop & ETA */}
                {nextStop && bus.eta !== undefined && (
                  <div className="flex items-center justify-between text-sm bg-muted/50 rounded p-2">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span className="truncate">{nextStop.name}</span>
                    </div>
                    <div className="flex items-center gap-1 text-primary font-medium">
                      <Clock className="h-4 w-4" />
                      <span>{bus.eta === 0 ? 'Arrived' : `${Math.round(bus.eta)}m`}</span>
                    </div>
                  </div>
                )}

                {/* Driver */}
                <div className="text-xs text-muted-foreground">
                  Driver: {bus.driverName}
                </div>

                {/* Action Button */}
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    // TODO: Center map on bus
                  }}
                >
                  <MapPin className="h-4 w-4 mr-1" />
                  Show on Map
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredBuses.length === 0 && (
        <Card className="mt-6">
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center">
              <Bus className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No buses found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}