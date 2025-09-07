import { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useStore } from '@/store';
import { 
  Bus, 
  Route as RouteIcon, 
  Users, 
  Camera, 
  BarChart3, 
  Settings,
  MapPin,
  Clock,
  AlertTriangle,
  TrendingUp,
  Activity
} from 'lucide-react';

function AdminDashboard() {
  const { buses, routes, stops, sosAlerts } = useStore();

  const stats = {
    activeBuses: buses.filter(b => b.status === 'active').length,
    totalRoutes: routes.length,
    totalStops: stops.length,
    activeAlerts: sosAlerts.filter(a => a.status === 'active').length,
    avgDelay: 2.3, // minutes
    ridership: 15420, // daily
    onTimePerformance: 94.2 // percentage
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Buses</CardTitle>
            <Bus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeBuses}</div>
            <p className="text-xs text-muted-foreground">
              +2 from yesterday
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily Ridership</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.ridership.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last week
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On-Time Performance</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.onTimePerformance}%</div>
            <p className="text-xs text-muted-foreground">
              +0.8% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeAlerts}</div>
            <p className="text-xs text-muted-foreground">
              Emergency situations
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Live Fleet Status */}
        <Card>
          <CardHeader>
            <CardTitle>Fleet Status</CardTitle>
            <CardDescription>Real-time bus operations overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {buses.slice(0, 5).map((bus) => {
                const route = routes.find(r => r.id === bus.routeId);
                return (
                  <div key={bus.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        bus.status === 'active' ? 'bg-success' :
                        bus.status === 'maintenance' ? 'bg-warning' : 'bg-destructive'
                      }`} />
                      <div>
                        <div className="font-medium">{bus.regNo}</div>
                        <div className="text-sm text-muted-foreground">
                          {route?.name} • {bus.speed} km/h
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{bus.occupancy}%</div>
                      <div className="text-sm text-muted-foreground">Occupancy</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Route Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Route Performance</CardTitle>
            <CardDescription>Today's route efficiency metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {routes.slice(0, 5).map((route) => {
                const performance = 85 + Math.random() * 15; // Mock data
                const delay = Math.random() * 5;
                return (
                  <div key={route.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{route.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {delay.toFixed(1)}min avg delay
                        </div>
                      </div>
                      <Badge variant={performance > 90 ? "default" : "secondary"}>
                        {performance.toFixed(0)}%
                      </Badge>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${performance}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
            <CardDescription>Emergency and system notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {sosAlerts.slice(0, 3).map((alert) => (
                <div key={alert.id} className="flex items-center gap-3 p-3 rounded-lg bg-red-50 dark:bg-red-950">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <div className="flex-1">
                    <div className="font-medium capitalize">{alert.type} Emergency</div>
                    <div className="text-sm text-muted-foreground">
                      {alert.busId || 'Station'} • {alert.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                  <Badge variant="destructive">{alert.status}</Badge>
                </div>
              ))}
              
              {sosAlerts.length === 0 && (
                <div className="text-center py-6 text-muted-foreground">
                  No active alerts
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center">
              <Bus className="h-6 w-6 mb-2" />
              <span className="text-sm">Add Bus</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center">
              <RouteIcon className="h-6 w-6 mb-2" />
              <span className="text-sm">New Route</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center">
              <MapPin className="h-6 w-6 mb-2" />
              <span className="text-sm">Add Stop</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center">
              <Camera className="h-6 w-6 mb-2" />
              <span className="text-sm">CCTV</span>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* System Health */}
      <Card>
        <CardHeader>
          <CardTitle>System Health</CardTitle>
          <CardDescription>Infrastructure and service status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">GPS Tracking</span>
                <Badge className="bg-success">Online</Badge>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-success h-2 rounded-full w-full" />
              </div>
              <div className="text-xs text-muted-foreground">99.8% uptime</div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Payment System</span>
                <Badge className="bg-success">Online</Badge>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-success h-2 rounded-full w-full" />
              </div>
              <div className="text-xs text-muted-foreground">100% uptime</div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">CCTV Network</span>
                <Badge className="bg-warning">Partial</Badge>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-warning h-2 rounded-full w-3/4" />
              </div>
              <div className="text-xs text-muted-foreground">3 cameras offline</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function Admin() {
  const location = useLocation();
  const { user } = useStore();

  // Check if user has admin access
  if (!user || user.role !== 'ADMIN') {
    return (
      <div className="container mx-auto px-4 py-6">
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center">
              <AlertTriangle className="h-16 w-16 mx-auto mb-4 text-destructive" />
              <h3 className="text-lg font-semibold mb-2">Access Denied</h3>
              <p className="text-muted-foreground">
                You need administrator privileges to access this area.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground mt-2">
          Manage bus operations, routes, and system monitoring
        </p>
      </div>

      {/* Navigation Tabs */}
      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="dashboard">
            <Activity className="h-4 w-4 mr-1" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="buses">
            <Bus className="h-4 w-4 mr-1" />
            Buses
          </TabsTrigger>
          <TabsTrigger value="routes">
            <RouteIcon className="h-4 w-4 mr-1" />
            Routes
          </TabsTrigger>
          <TabsTrigger value="cctv">
            <Camera className="h-4 w-4 mr-1" />
            CCTV
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <BarChart3 className="h-4 w-4 mr-1" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="users">
            <Users className="h-4 w-4 mr-1" />
            Users
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <AdminDashboard />
        </TabsContent>

        <TabsContent value="buses">
          <Card>
            <CardHeader>
              <CardTitle>Bus Management</CardTitle>
              <CardDescription>Add, edit, and monitor bus fleet</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                Bus management interface coming soon...
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="routes">
          <Card>
            <CardHeader>
              <CardTitle>Route Management</CardTitle>
              <CardDescription>Create and modify bus routes and stops</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                Route management interface coming soon...
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cctv">
          <Card>
            <CardHeader>
              <CardTitle>CCTV Management</CardTitle>
              <CardDescription>Monitor and manage camera feeds</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                CCTV management interface coming soon...
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analytics & Reports</CardTitle>
              <CardDescription>Performance metrics and insights</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                Analytics dashboard coming soon...
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage user accounts and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                User management interface coming soon...
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}