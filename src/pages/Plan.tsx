import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useStore } from '@/store';
import { Route, MapPin, Clock, DollarSign, ArrowRight, Search } from 'lucide-react';

export default function Plan() {
  const { routes, stops } = useStore();
  const [fromStop, setFromStop] = useState('');
  const [toStop, setToStop] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearch = () => {
    // Mock trip planning logic
    const mockResults = [
      {
        id: '1',
        routes: [routes[0]],
        totalTime: 25,
        totalFare: 25,
        transfers: 0,
        steps: [
          { type: 'walk', description: 'Walk to Connaught Place', time: 3 },
          { type: 'bus', route: routes[0], from: 'Connaught Place', to: 'India Gate', time: 20 },
          { type: 'walk', description: 'Walk to destination', time: 2 }
        ]
      },
      {
        id: '2',
        routes: [routes[1], routes[2]],
        totalTime: 35,
        totalFare: 35,
        transfers: 1,
        steps: [
          { type: 'walk', description: 'Walk to Connaught Place', time: 3 },
          { type: 'bus', route: routes[1], from: 'Connaught Place', to: 'Red Fort', time: 15 },
          { type: 'transfer', description: 'Transfer at Red Fort', time: 5 },
          { type: 'bus', route: routes[2], from: 'Red Fort', to: 'India Gate', time: 10 },
          { type: 'walk', description: 'Walk to destination', time: 2 }
        ]
      }
    ];
    setSearchResults(mockResults);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Trip Planner
        </h1>
        <p className="text-muted-foreground mt-2">
          Plan your journey with real-time route optimization
        </p>
      </div>

      {/* Search Form */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Plan Your Journey</CardTitle>
          <CardDescription>
            Enter your start and destination to find the best routes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">From</label>
              <select 
                value={fromStop}
                onChange={(e) => setFromStop(e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-lg bg-background"
              >
                <option value="">Select starting point</option>
                {stops.map(stop => (
                  <option key={stop.id} value={stop.id}>{stop.name}</option>
                ))}
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">To</label>
              <select 
                value={toStop}
                onChange={(e) => setToStop(e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-lg bg-background"
              >
                <option value="">Select destination</option>
                {stops.map(stop => (
                  <option key={stop.id} value={stop.id}>{stop.name}</option>
                ))}
              </select>
            </div>
          </div>
          
          <Button 
            onClick={handleSearch}
            disabled={!fromStop || !toStop}
            className="w-full"
          >
            <Search className="h-4 w-4 mr-2" />
            Find Routes
          </Button>
        </CardContent>
      </Card>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Recommended Routes</h2>
          
          {searchResults.map((result, index) => (
            <Card key={result.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">
                    Option {index + 1}
                    {index === 0 && <Badge className="ml-2 bg-success">Fastest</Badge>}
                    {result.transfers === 0 && <Badge variant="secondary" className="ml-2">Direct</Badge>}
                  </CardTitle>
                  <div className="text-right">
                    <div className="text-lg font-semibold">₹{result.totalFare}</div>
                    <div className="text-sm text-muted-foreground">{result.totalTime} min</div>
                  </div>
                </div>
                <CardDescription>
                  {result.transfers === 0 ? 'Direct route' : `${result.transfers} transfer(s)`}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                {/* Route Summary */}
                <div className="flex items-center gap-2 mb-4 text-sm">
                  <Clock className="h-4 w-4" />
                  <span>{result.totalTime} minutes</span>
                  <DollarSign className="h-4 w-4 ml-4" />
                  <span>₹{result.totalFare}</span>
                  {result.transfers > 0 && (
                    <>
                      <Route className="h-4 w-4 ml-4" />
                      <span>{result.transfers} transfer(s)</span>
                    </>
                  )}
                </div>

                {/* Step by step directions */}
                <div className="space-y-2">
                  {result.steps.map((step: any, stepIndex: number) => (
                    <div key={stepIndex} className="flex items-center gap-3 p-2 rounded-lg bg-muted/30">
                      {step.type === 'walk' && <MapPin className="h-4 w-4 text-muted-foreground" />}
                      {step.type === 'bus' && <Route className="h-4 w-4 text-primary" />}
                      {step.type === 'transfer' && <ArrowRight className="h-4 w-4 text-warning" />}
                      
                      <div className="flex-1">
                        <div className="text-sm font-medium">{step.description}</div>
                        {step.route && (
                          <div className="text-xs text-muted-foreground">
                            {step.route.name} ({step.from} → {step.to})
                          </div>
                        )}
                      </div>
                      
                      <div className="text-xs text-muted-foreground">
                        {step.time} min
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex gap-2">
                  <Button variant="outline" className="flex-1">
                    View on Map
                  </Button>
                  <Button className="flex-1">
                    Start Journey
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Popular Routes */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Popular Routes</CardTitle>
          <CardDescription>
            Frequently traveled routes in Delhi
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {routes.slice(0, 3).map(route => (
              <div key={route.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer">
                <div>
                  <div className="font-medium">{route.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {route.stops.length} stops • {route.type}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">₹{route.fare}</div>
                  <Badge 
                    variant="secondary" 
                    style={{ backgroundColor: route.color + '20', color: route.color }}
                  >
                    {route.shortName}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}