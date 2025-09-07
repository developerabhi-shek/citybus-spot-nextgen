import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Route, CreditCard, Brain, Camera, Shield, Bus, Users, Clock, TrendingUp } from 'lucide-react';

const Index = () => {
  const features = [
    { icon: MapPin, title: 'Live Tracking', description: 'Real-time bus locations', href: '/track', variant: 'default' as const },
    { icon: Route, title: 'Plan Trip', description: 'Smart route planning', href: '/plan', variant: 'secondary' as const },
    { icon: CreditCard, title: 'Buy Tickets', description: 'UPI payments', href: '/tickets', variant: 'success' as const },
    { icon: Shield, title: 'Emergency SOS', description: 'One-tap alerts', href: '/sos', variant: 'emergency' as const },
  ];

  const stats = [
    { icon: Bus, label: 'Active Buses', value: '150+' },
    { icon: Users, label: 'Daily Users', value: '25K+' },
    { icon: Clock, label: 'Avg ETA Accuracy', value: '95%' },
    { icon: TrendingUp, label: 'On-Time Performance', value: '94%' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-20 md:py-32">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="container relative mx-auto px-4 text-center">
          <div className="mx-auto max-w-4xl">
            <Badge className="mb-6 bg-white/20 text-white border-white/30">
              SIH25013 • NextGen Transport Solution
            </Badge>
            <h1 className="mb-6 text-4xl font-bold text-white md:text-6xl lg:text-7xl">
              CityBus Spot
            </h1>
            <p className="mb-8 text-xl text-white/90 md:text-2xl">
              Real-time bus tracking with AI-powered insights, smart ticketing, and emergency response
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link to="/track">
                <Button variant="hero" size="lg" className="w-full sm:w-auto">
                  <MapPin className="mr-2 h-5 w-5" />
                  Start Tracking
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="glass" size="lg" className="w-full sm:w-auto">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <Icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                    <div className="text-3xl font-bold mb-2">{stat.value}</div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Core Features</h2>
            <p className="text-muted-foreground text-lg">
              Everything you need for smart public transportation
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link key={index} to={feature.href}>
                  <Card className="h-full hover:shadow-lg transition-all hover:-translate-y-1">
                    <CardHeader className="text-center">
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-primary">
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant={feature.variant} className="w-full">
                        Explore
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Advanced Features */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-2">
            <Card className="overflow-hidden">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Brain className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle>AI Vision Demo</CardTitle>
                    <CardDescription>Real-time passenger counting</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-muted-foreground">
                  Advanced computer vision for crowd analysis and safety monitoring
                </p>
                <Link to="/ai-vision">
                  <Button variant="outline" className="w-full">
                    Try AI Demo
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Camera className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle>CCTV Integration</CardTitle>
                    <CardDescription>Live security feeds</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-muted-foreground">
                  Monitor bus interiors and stations with real-time video feeds
                </p>
                <Link to="/cctv">
                  <Button variant="outline" className="w-full">
                    View Demo
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
