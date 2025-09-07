import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { useStore } from '@/store';
import {
  Navigation,
  MapPin,
  Route,
  CreditCard,
  Brain,
  Camera,
  Shield,
  Info,
  Menu,
  X,
  Bus
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Live Tracking', href: '/track', icon: MapPin },
  { label: 'Plan Trip', href: '/plan', icon: Route },
  { label: 'Tickets', href: '/tickets', icon: CreditCard },
  { label: 'AI Vision', href: '/ai-vision', icon: Brain },
  { label: 'CCTV Demo', href: '/cctv', icon: Camera },
  { label: 'About', href: '/about', icon: Info },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated } = useStore();

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
              <Bus className="h-5 w-5 text-white" />
            </div>
            <span className="hidden font-bold sm:inline-block">
              CityBus Spot
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              
              return (
                <Link key={item.href} to={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className={cn(
                      "h-9 px-3",
                      isActive && "shadow-md"
                    )}
                  >
                    <Icon className="h-4 w-4 mr-1" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
            
            {/* Admin Link - Protected */}
            {isAuthenticated && user?.role === 'ADMIN' && (
              <Link to="/admin">
                <Button
                  variant={location.pathname.startsWith('/admin') ? "default" : "ghost"}
                  size="sm"
                  className="h-9 px-3"
                >
                  <Shield className="h-4 w-4 mr-1" />
                  Admin
                </Button>
              </Link>
            )}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex md:items-center md:space-x-2">
            <ThemeToggle />
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                  <span className="text-xs font-medium text-primary-foreground">
                    {user?.name?.charAt(0) || 'U'}
                  </span>
                </div>
                <span className="text-sm font-medium">{user?.name}</span>
              </div>
            ) : (
              <Link to="/auth/login">
                <Button size="sm">Sign In</Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 md:hidden">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-50 bg-background/80 backdrop-blur-sm md:hidden">
          <div className="fixed left-0 top-16 h-full w-64 border-r bg-background p-6 shadow-lg">
            <div className="space-y-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              
              {/* Mobile Admin Link */}
              {isAuthenticated && user?.role === 'ADMIN' && (
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    location.pathname.startsWith('/admin')
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <Shield className="h-4 w-4" />
                  <span>Admin</span>
                </Link>
              )}
              
              {/* Mobile Auth */}
              {!isAuthenticated && (
                <Link
                  to="/auth/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <span>Sign In</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}