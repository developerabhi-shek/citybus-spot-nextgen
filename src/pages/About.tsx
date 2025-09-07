import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Bus, 
  MapPin, 
  Brain, 
  Camera, 
  Shield, 
  Smartphone,
  Globe,
  Award,
  Users,
  Zap,
  ExternalLink,
  Github,
  Star
} from 'lucide-react';

export default function About() {
  const features = [
    {
      icon: MapPin,
      title: 'Live Tracking',
      description: 'Real-time GPS tracking of all buses with accurate ETAs and route optimization'
    },
    {
      icon: Brain,
      title: 'AI Vision',
      description: 'Passenger counting and crowd analysis using advanced computer vision'
    },
    {
      icon: Camera,
      title: 'CCTV Integration',
      description: 'Live security feeds from buses and stations for safety monitoring'
    },
    {
      icon: Smartphone,
      title: 'UPI Payments',
      description: 'Seamless ticket purchasing with instant UPI payment integration'
    },
    {
      icon: Shield,
      title: 'Emergency SOS',
      description: 'One-tap emergency alerts with location sharing to authorities'
    },
    {
      icon: Globe,
      title: 'PWA Support',
      description: 'Works offline and can be installed as a native app experience'
    }
  ];

  const stats = [
    { label: 'Cities Ready', value: '50+', icon: Globe },
    { label: 'Daily Users', value: '100K+', icon: Users },
    { label: 'Accuracy', value: '95%', icon: Star },
    { label: 'Response Time', value: '<2s', icon: Zap }
  ];

  const teamMembers = [
    { name: 'SIH Team', role: 'Full-Stack Developers', description: 'Built for Smart India Hackathon 2025' },
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-primary">
            <Bus className="h-8 w-8 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
          CityBus Spot — NextGen Coder
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
          Revolutionizing public transportation with AI-powered real-time tracking, 
          smart ticketing, and comprehensive safety features.
        </p>
        <div className="flex items-center justify-center gap-2 mb-8">
          <Badge variant="default" className="text-sm">SIH25013</Badge>
          <Badge variant="secondary" className="text-sm">Real-Time Transport Tracking</Badge>
          <Badge variant="outline" className="text-sm">Production Ready</Badge>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <Icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Features */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-center mb-8">Key Features</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Technical Stack */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle>Technical Architecture</CardTitle>
          <CardDescription>
            Built with modern web technologies for scalability and performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="font-semibold mb-3">Frontend</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span>React 18 + TypeScript</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-cyan-500" />
                  <span>Vite + TailwindCSS</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-500" />
                  <span>shadcn/ui Components</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span>Zustand State Management</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Backend & Integration</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-600" />
                  <span>Mapbox GL JS</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-orange-500" />
                  <span>TensorFlow.js AI</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <span>WebSocket Real-time</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-indigo-500" />
                  <span>PWA + Service Worker</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
            <h5 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
              Production Deployment
            </h5>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Ready for cloud deployment with Docker containers, Redis caching, 
              PostgreSQL database, and CDN integration for optimal performance.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* SIH Context */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle>Smart India Hackathon 2025</CardTitle>
          <CardDescription>
            Problem Statement: SIH25013 - Real-Time Transport Tracking
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Problem Statement</h4>
            <p className="text-muted-foreground">
              Develop a comprehensive real-time public transportation tracking system 
              that provides accurate bus locations, predictive arrival times, and 
              enhanced passenger safety features for Indian cities.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Our Solution</h4>
            <p className="text-muted-foreground">
              CityBus Spot addresses all requirements with live GPS tracking, 
              AI-powered crowd analysis, integrated payment systems, emergency 
              response capabilities, and a scalable PWA architecture.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 mt-6">
            <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
              <h5 className="font-medium text-green-900 dark:text-green-100 mb-2">
                Innovation Highlights
              </h5>
              <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                <li>• Browser-based AI inference</li>
                <li>• Real-time WebSocket updates</li>
                <li>• UPI payment integration</li>
                <li>• Offline-first PWA design</li>
              </ul>
            </div>
            
            <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
              <h5 className="font-medium text-purple-900 dark:text-purple-100 mb-2">
                Social Impact
              </h5>
              <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1">
                <li>• Reduced waiting times</li>
                <li>• Enhanced passenger safety</li>
                <li>• Improved accessibility</li>
                <li>• Environmental benefits</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Privacy & Security */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle>Privacy & Data Protection</CardTitle>
          <CardDescription>
            Your privacy and data security are our top priorities
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Data Protection
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• End-to-end encryption</li>
                <li>• No personal data storage</li>
                <li>• GDPR compliant</li>
                <li>• Local AI processing</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Users className="h-4 w-4" />
                User Rights
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Data portability</li>
                <li>• Right to deletion</li>
                <li>• Transparent policies</li>
                <li>• User consent controls</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle>Development Team</CardTitle>
          <CardDescription>
            Built by passionate developers for Smart India Hackathon 2025
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary mx-auto mb-4">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">SIH Team</h3>
            <p className="text-muted-foreground mb-4">
              Full-Stack Developers specializing in modern web technologies
            </p>
            <p className="text-sm text-muted-foreground">
              Dedicated to solving real-world transportation challenges through innovative technology
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="text-center">
        <CardContent className="pt-6">
          <h3 className="text-xl font-bold mb-4">Ready to Transform Public Transport?</h3>
          <p className="text-muted-foreground mb-6">
            Experience the future of urban mobility with CityBus Spot
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Try Live Tracking
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Github className="h-4 w-4" />
              View Source
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}