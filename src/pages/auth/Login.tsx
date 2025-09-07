import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useStore } from '@/store';
import { Bus, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useStore();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login process
    setTimeout(() => {
      // Mock login logic
      if (email && password) {
        const mockUser = {
          id: 'user_1',
          email: email,
          name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
          role: email.includes('admin') ? 'ADMIN' as const : 'COMMUTER' as const,
          preferences: {
            theme: 'system' as const,
            notifications: true,
          }
        };

        setUser(mockUser);
        
        toast({
          title: "Login Successful",
          description: `Welcome back, ${mockUser.name}!`,
        });

        navigate('/');
      } else {
        toast({
          title: "Login Failed",
          description: "Please enter valid credentials",
          variant: "destructive"
        });
      }
      
      setIsLoading(false);
    }, 1500);
  };

  const handleDemoLogin = (role: 'ADMIN' | 'COMMUTER') => {
    const demoUsers = {
      ADMIN: {
        id: 'admin_demo',
        email: 'admin@citybus.com',
        name: 'Admin User',
        role: 'ADMIN' as const,
        preferences: { theme: 'system' as const, notifications: true }
      },
      COMMUTER: {
        id: 'commuter_demo',
        email: 'user@citybus.com',
        name: 'Demo User',
        role: 'COMMUTER' as const,
        preferences: { theme: 'system' as const, notifications: true }
      }
    };

    setUser(demoUsers[role]);
    toast({
      title: "Demo Login Successful",
      description: `Logged in as ${role.toLowerCase()}`,
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/50 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-primary mx-auto mb-4">
            <Bus className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            CityBus Spot
          </h1>
          <p className="text-muted-foreground mt-2">
            Sign in to your account
          </p>
        </div>

        {/* Login Form */}
        <Card>
          <CardHeader>
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1 h-8 w-8"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            {/* Demo Logins */}
            <div className="space-y-3">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or try demo accounts
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDemoLogin('COMMUTER')}
                  className="text-sm"
                >
                  Demo User
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDemoLogin('ADMIN')}
                  className="text-sm"
                >
                  Demo Admin
                </Button>
              </div>
            </div>

            {/* Additional Links */}
            <div className="text-center space-y-2">
              <Link 
                to="/auth/forgot-password" 
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Forgot your password?
              </Link>
              <div className="text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link to="/auth/register" className="text-primary hover:underline">
                  Sign up
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features Preview */}
        <Card className="mt-6">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-3 text-center">What you can do:</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span>Track buses live</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success" />
                <span>Buy tickets</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-warning" />
                <span>Plan trips</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-destructive" />
                <span>Emergency SOS</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}