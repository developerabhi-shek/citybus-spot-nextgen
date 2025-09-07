import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, MapPin, Route, CreditCard, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

const mobileNavItems = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Track', href: '/track', icon: MapPin },
  { label: 'Plan', href: '/plan', icon: Route },
  { label: 'Tickets', href: '/tickets', icon: CreditCard },
  { label: 'SOS', href: '/sos', icon: AlertTriangle },
];

export function MobileNavbar() {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
      <div className="grid grid-cols-5 gap-1 p-2">
        {mobileNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          
          return (
            <Link key={item.href} to={item.href}>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "h-12 w-full flex-col space-y-1 p-1",
                  isActive && "bg-primary/10 text-primary"
                )}
              >
                <Icon className={cn(
                  "h-4 w-4",
                  item.href === '/sos' && "text-emergency",
                  isActive && item.href !== '/sos' && "text-primary"
                )} />
                <span className="text-xs">{item.label}</span>
              </Button>
            </Link>
          );
        })}
      </div>
    </div>
  );
}