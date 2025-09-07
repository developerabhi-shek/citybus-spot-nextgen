import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { Navbar } from "@/components/layout/Navbar";
import { MobileNavbar } from "@/components/layout/MobileNavbar";
import { useStore } from "@/store";
import { mockBuses, mockRoutes, mockStops } from "@/data/mockData";

// Pages
import Index from "./pages/Index";
import Track from "./pages/Track";
import Plan from "./pages/Plan";
import Tickets from "./pages/Tickets";
import SOS from "./pages/SOS";
import CCTVDemo from "./pages/CCTVDemo";
import AIVision from "./pages/AIVision";
import Admin from "./pages/Admin";
import About from "./pages/About";
import AuthLogin from "./pages/auth/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppContent() {
  const { setBuses, setRoutes, setStops, setUser } = useStore();

  useEffect(() => {
    // Initialize with mock data
    setBuses(mockBuses);
    setRoutes(mockRoutes);
    setStops(mockStops);
    
    // Mock user for demo (you can remove this and implement real auth)
    setUser({
      id: 'demo_user',
      email: 'demo@citybus.com',
      name: 'Demo User',
      role: 'ADMIN', // Set to ADMIN to access all features
      preferences: {
        theme: 'system',
        notifications: true,
      }
    });
  }, [setBuses, setRoutes, setStops, setUser]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pb-16 md:pb-0">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/track" element={<Track />} />
          <Route path="/plan" element={<Plan />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/sos" element={<SOS />} />
          <Route path="/cctv" element={<CCTVDemo />} />
          <Route path="/ai-vision" element={<AIVision />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/about" element={<About />} />
          <Route path="/auth/login" element={<AuthLogin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <MobileNavbar />
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
