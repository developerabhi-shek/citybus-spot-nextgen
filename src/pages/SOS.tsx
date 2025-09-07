import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Phone, MapPin, Hospital, Shield, Clock, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useStore } from '@/store';

export default function SOS() {
  const [isEmergency, setIsEmergency] = useState(false);
  const [selectedType, setSelectedType] = useState<'medical' | 'security' | 'technical' | 'other'>('medical');
  const [message, setMessage] = useState('');
  const { addSOSAlert } = useStore();
  const { toast } = useToast();

  const emergencyTypes = [
    { id: 'medical', name: 'Medical Emergency', icon: Hospital, color: 'bg-red-500' },
    { id: 'security', name: 'Security Issue', icon: Shield, color: 'bg-orange-500' },
    { id: 'technical', name: 'Technical Problem', icon: AlertTriangle, color: 'bg-yellow-500' },
    { id: 'other', name: 'Other Emergency', icon: Phone, color: 'bg-blue-500' }
  ];

  const emergencyContacts = [
    { name: 'Police Control Room', number: '100', type: 'Police' },
    { name: 'Medical Emergency', number: '108', type: 'Medical' },
    { name: 'Fire Department', number: '101', type: 'Fire' },
    { name: 'Women Helpline', number: '1091', type: 'Women Safety' }
  ];

  const nearbyHelp = [
    { name: 'AIIMS Hospital', distance: '2.3 km', type: 'Hospital', phone: '+91-11-2658-8500' },
    { name: 'Connaught Place Police Station', distance: '1.8 km', type: 'Police', phone: '+91-11-2331-4838' },
    { name: 'Delhi Fire Station', distance: '3.1 km', type: 'Fire', phone: '+91-11-2381-0055' }
  ];

  const handleSOSAlert = () => {
    setIsEmergency(true);
    
    // Get user's location (mock)
    const mockLocation = { lat: 28.6139, lng: 77.2090 };
    
    const sosAlert = {
      id: `sos_${Date.now()}`,
      userId: 'demo_user',
      lat: mockLocation.lat,
      lng: mockLocation.lng,
      type: selectedType,
      message: message || 'Emergency alert triggered from CityBus app',
      timestamp: new Date(),
      status: 'active' as const
    };

    addSOSAlert(sosAlert);

    // Simulate emergency response
    setTimeout(() => {
      toast({
        title: "Emergency Alert Sent!",
        description: "Nearest help has been notified. Stay calm and follow safety protocols.",
      });
      setIsEmergency(false);
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-emergency">
          Emergency SOS
        </h1>
        <p className="text-muted-foreground mt-2">
          Get immediate help in case of emergency
        </p>
      </div>

      {/* Emergency Alert */}
      <Card className="mb-6 border-emergency/20 bg-emergency/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-emergency">
            <AlertTriangle className="h-5 w-5" />
            Emergency Alert
          </CardTitle>
          <CardDescription>
            Press the SOS button to immediately alert authorities and nearby help
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Emergency Type Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Emergency Type</label>
            <div className="grid grid-cols-2 gap-2">
              {emergencyTypes.map(type => {
                const Icon = type.icon;
                return (
                  <Button
                    key={type.id}
                    variant={selectedType === type.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedType(type.id as any)}
                    className="h-auto p-3 flex flex-col items-center"
                  >
                    <Icon className="h-5 w-5 mb-1" />
                    <span className="text-xs text-center">{type.name}</span>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Additional Information (Optional)</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe the emergency situation..."
              className="w-full px-3 py-2 border border-input rounded-lg bg-background min-h-[80px]"
            />
          </div>

          {/* SOS Button */}
          <Button 
            onClick={handleSOSAlert}
            disabled={isEmergency}
            variant="emergency"
            size="lg"
            className="w-full h-16 text-xl font-bold"
          >
            {isEmergency ? (
              <>
                <Clock className="h-6 w-6 mr-2 animate-spin" />
                Sending Alert...
              </>
            ) : (
              <>
                <AlertTriangle className="h-6 w-6 mr-2" />
                SEND SOS ALERT
              </>
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            This will share your location with emergency services and nearby help centers
          </p>
        </CardContent>
      </Card>

      {/* Emergency Contacts */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Emergency Contacts</CardTitle>
          <CardDescription>
            Quick access to emergency helplines
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">{contact.name}</div>
                    <div className="text-sm text-muted-foreground">{contact.type}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{contact.number}</Badge>
                  <Button 
                    size="sm" 
                    onClick={() => window.open(`tel:${contact.number}`, '_self')}
                  >
                    Call
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Nearby Help */}
      <Card>
        <CardHeader>
          <CardTitle>Nearby Help Centers</CardTitle>
          <CardDescription>
            Closest emergency services based on your location
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {nearbyHelp.map((help, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">{help.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {help.type} • {help.distance}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open(`tel:${help.phone}`, '_self')}
                  >
                    <Phone className="h-4 w-4 mr-1" />
                    Call
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                  >
                    <MapPin className="h-4 w-4 mr-1" />
                    Navigate
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Safety Tips */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Safety Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span>Stay calm and assess the situation before taking action</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span>If in a bus, inform the driver immediately</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span>Move to a safe location if possible</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span>Provide clear location information when calling for help</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}