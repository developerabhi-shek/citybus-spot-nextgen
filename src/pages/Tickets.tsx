import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useStore } from '@/store';
import { QrCode, CreditCard, Clock, MapPin, Ticket as TicketIcon, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Tickets() {
  const { routes, stops, tickets, addTicket } = useStore();
  const { toast } = useToast();
  const [selectedRoute, setSelectedRoute] = useState('');
  const [fromStop, setFromStop] = useState('');
  const [toStop, setToStop] = useState('');
  const [ticketType, setTicketType] = useState<'single' | 'day' | 'weekly' | 'monthly'>('single');

  const ticketTypes = [
    { id: 'single', name: 'Single Journey', price: 25, validity: '2 hours' },
    { id: 'day', name: 'Day Pass', price: 100, validity: '24 hours' },
    { id: 'weekly', name: 'Weekly Pass', price: 500, validity: '7 days' },
    { id: 'monthly', name: 'Monthly Pass', price: 1800, validity: '30 days' }
  ];

  const selectedTicketType = ticketTypes.find(t => t.id === ticketType);
  const selectedRouteData = routes.find(r => r.id === selectedRoute);

  const handleBuyTicket = () => {
    if (!selectedRoute || !fromStop || !toStop) {
      toast({
        title: "Incomplete Information",
        description: "Please select route and stops",
        variant: "destructive"
      });
      return;
    }

    // Generate UPI deep link
    const upiLink = `upi://pay?pa=citybus@upi&pn=CityBus%20Transport&am=${selectedTicketType?.price}&tn=CityBus%20${selectedTicketType?.name}%20Ticket&cu=INR`;
    
    // Open UPI app
    window.open(upiLink, '_self');

    // Simulate successful payment after 3 seconds
    setTimeout(() => {
      const newTicket = {
        id: `ticket_${Date.now()}`,
        type: ticketType,
        routeId: selectedRoute,
        fromStopId: fromStop,
        toStopId: toStop,
        fare: selectedTicketType?.price || 25,
        issuedAt: new Date(),
        expiresAt: new Date(Date.now() + (ticketType === 'single' ? 2 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000)),
        qrData: `CITYBUS_${Date.now()}`,
        status: 'valid' as const,
        transactionId: `TXN${Date.now()}`
      };

      addTicket(newTicket);
      
      toast({
        title: "Payment Successful!",
        description: `Your ${selectedTicketType?.name} has been purchased`,
      });
    }, 3000);
  };

  const getTicketStatus = (ticket: any) => {
    if (ticket.status === 'used') return { label: 'Used', color: 'bg-muted' };
    if (ticket.status === 'expired') return { label: 'Expired', color: 'bg-destructive' };
    if (new Date() > new Date(ticket.expiresAt)) return { label: 'Expired', color: 'bg-destructive' };
    return { label: 'Valid', color: 'bg-success' };
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Buy Tickets
        </h1>
        <p className="text-muted-foreground mt-2">
          Purchase tickets with UPI for seamless travel
        </p>
      </div>

      {/* Ticket Purchase */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Purchase New Ticket</CardTitle>
          <CardDescription>
            Select your journey details and pay via UPI
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Ticket Type Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Ticket Type</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {ticketTypes.map(type => (
                <Button
                  key={type.id}
                  variant={ticketType === type.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTicketType(type.id as any)}
                  className="h-auto p-3 flex flex-col items-center"
                >
                  <div className="font-medium">₹{type.price}</div>
                  <div className="text-xs">{type.name}</div>
                  <div className="text-xs text-muted-foreground">{type.validity}</div>
                </Button>
              ))}
            </div>
          </div>

          {/* Route Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Route</label>
            <select 
              value={selectedRoute}
              onChange={(e) => setSelectedRoute(e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-lg bg-background"
            >
              <option value="">Select a route</option>
              {routes.map(route => (
                <option key={route.id} value={route.id}>
                  {route.name} ({route.shortName}) - ₹{route.fare}
                </option>
              ))}
            </select>
          </div>

          {/* Stop Selection */}
          {selectedRoute && (
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">From</label>
                <select 
                  value={fromStop}
                  onChange={(e) => setFromStop(e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-lg bg-background"
                >
                  <option value="">Select boarding stop</option>
                  {selectedRouteData?.stops.map(stopId => {
                    const stop = stops.find(s => s.id === stopId);
                    return stop ? (
                      <option key={stop.id} value={stop.id}>{stop.name}</option>
                    ) : null;
                  })}
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">To</label>
                <select 
                  value={toStop}
                  onChange={(e) => setToStop(e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-lg bg-background"
                >
                  <option value="">Select destination stop</option>
                  {selectedRouteData?.stops.map(stopId => {
                    const stop = stops.find(s => s.id === stopId);
                    return stop ? (
                      <option key={stop.id} value={stop.id}>{stop.name}</option>
                    ) : null;
                  })}
                </select>
              </div>
            </div>
          )}

          {/* Price Summary */}
          {selectedTicketType && (
            <div className="bg-muted/30 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Total Amount:</span>
                <span className="text-xl font-bold">₹{selectedTicketType.price}</span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Valid for {selectedTicketType.validity}
              </div>
            </div>
          )}

          <Button 
            onClick={handleBuyTicket}
            disabled={!selectedRoute || !fromStop || !toStop}
            className="w-full"
          >
            <CreditCard className="h-4 w-4 mr-2" />
            Pay via UPI
            <ExternalLink className="h-4 w-4 ml-2" />
          </Button>
        </CardContent>
      </Card>

      {/* My Tickets */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">My Tickets</h2>
        
        {tickets.length === 0 ? (
          <Card>
            <CardContent className="flex items-center justify-center py-12">
              <div className="text-center">
                <TicketIcon className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No tickets found</h3>
                <p className="text-muted-foreground">
                  Purchase your first ticket to start traveling
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tickets.map((ticket) => {
              const route = routes.find(r => r.id === ticket.routeId);
              const fromStopData = stops.find(s => s.id === ticket.fromStopId);
              const toStopData = stops.find(s => s.id === ticket.toStopId);
              const status = getTicketStatus(ticket);
              
              return (
                <Card key={ticket.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg capitalize">{ticket.type} Ticket</CardTitle>
                      <Badge className={status.color}>
                        {status.label}
                      </Badge>
                    </div>
                    <CardDescription>
                      {route?.name || 'Route'} • ₹{ticket.fare}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-3">
                    {/* Journey Details */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4" />
                        <span className="font-medium">From:</span>
                        <span>{fromStopData?.name}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4" />
                        <span className="font-medium">To:</span>
                        <span>{toStopData?.name}</span>
                      </div>
                    </div>

                    {/* Validity */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4" />
                        <span className="font-medium">Issued:</span>
                        <span>{new Date(ticket.issuedAt).toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4" />
                        <span className="font-medium">Expires:</span>
                        <span>{new Date(ticket.expiresAt).toLocaleString()}</span>
                      </div>
                    </div>

                    {/* QR Code */}
                    <div className="flex items-center justify-center p-4 bg-muted/30 rounded-lg">
                      <QrCode className="h-16 w-16 text-muted-foreground" />
                    </div>

                    <div className="text-xs text-center text-muted-foreground">
                      Ticket ID: {ticket.id}
                    </div>

                    {status.label === 'Valid' && (
                      <Button variant="outline" size="sm" className="w-full">
                        Show QR Code
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}