import React, { useState, useEffect, useMemo, Suspense, lazy } from 'react';
import { LandingPage } from './components/LandingPage';
import { LoadingPage } from './components/LoadingPage';
import { Toaster } from './components/Toaster';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { toast } from 'sonner@2.0.3';
import { ArrowLeft, Home, Settings, HelpCircle, Wifi, WifiOff } from 'lucide-react';


// Lazy load heavy dashboard components to improve initial load time
const TouristDashboard = lazy(() => import('./components/TouristDashboard').then(module => ({ default: module.TouristDashboard })));
const PoliceDashboard = lazy(() => import('./components/PoliceDashboard').then(module => ({ default: module.PoliceDashboard })));
const AdminDashboard = lazy(() => import('./components/AdminDashboard').then(module => ({ default: module.AdminDashboard })));
const EmergencyResponseInterface = lazy(() => import('./components/EmergencyResponseInterface').then(module => ({ default: module.EmergencyResponseInterface })));
const DigitalIDRegistration = lazy(() => import('./components/DigitalIDRegistration').then(module => ({ default: module.DigitalIDRegistration })));
const InteractiveMap = lazy(() => import('./components/InteractiveMap').then(module => ({ default: module.InteractiveMap })));
const AnalyticsDashboard = lazy(() => import('./components/AnalyticsDashboard').then(module => ({ default: module.AnalyticsDashboard })));
const MobileTouristApp = lazy(() => import('./components/MobileTouristApp').then(module => ({ default: module.MobileTouristApp })));
const DraggableAIAssistant = lazy(() => import('./components/DraggableAIAssistant').then(module => ({ default: module.DraggableAIAssistant })));
const AgencyDashboard = lazy(() => import('./components/AgencyDashboard').then(module => ({ default: module.AgencyDashboard })));
const GPSNavigation = lazy(() => import('./components/GPSNavigation').then(module => ({ default: module.GPSNavigation })));

type UserRole = 'tourist' | 'police' | 'admin' | 'emergency' | 'register' | 'agency' | 'map' | 'analytics' | 'mobile' | 'gps' | null;

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Application error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100">
          <div className="text-center p-8 max-w-md">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-red-800 mb-4">Something went wrong</h2>
            <p className="text-red-600 mb-6">We're sorry, but something unexpected happened. Please refresh the page or try again later.</p>
            <Button onClick={() => window.location.reload()} className="bg-red-600 hover:bg-red-700">
              Refresh Page
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Main landing page background - High-resolution Taj Mahal image
const HOMEPAGE_BACKGROUND_URL = 'https://images.unsplash.com/photo-1576135872771-b3205260262f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWolMjBtYWhhbCUyMGluZGlhJTIwbW9udW1lbnR8ZW58MXx8fHwxNzU3ODg5OTMzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';

// Role display names for better UX
const ROLE_DISPLAY_NAMES: Record<UserRole, string> = {
  tourist: 'Tourist Dashboard',
  police: 'Police Operations',
  admin: 'System Administration',
  emergency: 'Emergency Response',
  register: 'Digital ID Registration',
  agency: 'Agency Dashboard',
  map: 'Interactive Safety Map',
  analytics: 'Analytics Dashboard',
  mobile: 'Mobile Tourist App',
  gps: 'GPS Navigation'
};

export default function App() {
  const [deviceName, setDeviceName] = useState("tourist-001"); // unique device name for backend

  const [currentRole, setCurrentRole] = useState<UserRole>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showLoadingTransition, setShowLoadingTransition] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [userPreferences, setUserPreferences] = useState({
    reducedMotion: false,
    highContrast: false,
    largeText: false
  });

  // Load user preferences from localStorage and force dark mode
  useEffect(() => {
    const savedPreferences = localStorage.getItem('safety-app-preferences');
    
    if (savedPreferences) {
      try {
        setUserPreferences(JSON.parse(savedPreferences));
      } catch (error) {
        console.error('Failed to load user preferences:', error);
      }
    }
    
    // Force dark mode - always enabled
    document.documentElement.classList.add('dark');
  }, []);

  // Save user preferences to localStorage
  useEffect(() => {
    localStorage.setItem('safety-app-preferences', JSON.stringify(userPreferences));
  }, [userPreferences]);

  // Online/offline detection
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast.success('Connection restored', { duration: 3000 });
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      toast.error('Connection lost - Working in offline mode', { duration: 5000 });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Initial loading with welcome message - only show on first visit
  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem('safety-app-visited');
    
    if (!hasVisitedBefore) {
      // First time visitor - show loading screen
      localStorage.setItem('safety-app-visited', 'true');
      const timer = setTimeout(() => {
        setIsLoading(false);
        toast.success('Welcome to Dhruvian Safety System', { duration: 4000 });
      }, 4000);
      return () => clearTimeout(timer);
    } else {
      // Returning visitor - skip loading screen
      setIsLoading(false);
    }
  }, []);

  // Static background - no slideshow needed anymore

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // ESC key to go back
      if (event.key === 'Escape' && currentRole) {
        handleBackToLanding();
      }
      // Alt + H for help
      if (event.altKey && event.key === 'h') {
        event.preventDefault();
        // Toggle AI assistant or show help
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentRole]);

  const handleRoleSelect = (role: UserRole) => {
    setShowLoadingTransition(true);
    toast.info(`Loading ${ROLE_DISPLAY_NAMES[role]}...`);
    
    setTimeout(() => {
      setCurrentRole(role);
      setShowLoadingTransition(false);
      toast.success(`Welcome to ${ROLE_DISPLAY_NAMES[role]}`);
    }, 500);
  };

  const handleBackToLanding = () => {
    setShowLoadingTransition(true);
    
    setTimeout(() => {
      setCurrentRole(null);
      setShowLoadingTransition(false);
      toast.info('Returned to main menu');
    }, 500);
  };

  const handleEmergencyMode = () => {
    setCurrentRole('emergency');
    toast.error('Emergency mode activated', { duration: 6000 });
  };

  const handleRegisterDigitalID = () => {
    setCurrentRole('register');
    toast.info('Starting digital ID registration...');
  };

  const handleOpenMap = () => {
    setCurrentRole('map');
    toast.info('Loading interactive safety map...');
  };

  const handleOpenAnalytics = () => {
    setCurrentRole('analytics');
    toast.info('Loading analytics dashboard...');
  };

  const handleOpenMobileApp = () => {
    setCurrentRole('mobile');
    toast.info('Loading mobile interface...');
  };

  const handleOpenGPS = () => {
  setCurrentRole("gps"); // switch view to GPSNavigation
  toast.info("Opening GPS navigation...");
};


  // Dark mode is always enabled - no toggle functionality needed

  const updateUserPreference = (key: keyof typeof userPreferences, value: boolean) => {
    setUserPreferences(prev => ({ ...prev, [key]: value }));
    toast.success(`${key} ${value ? 'enabled' : 'disabled'}`);
  };

  // Background style with Umngot River crystal clear turquoise water for landing page
  const backgroundStyle = useMemo(() => {
    if (currentRole === null) {
      return {
        backgroundImage: `linear-gradient(rgba(26, 54, 93, 0.35), rgba(20, 40, 70, 0.40)), url('${HOMEPAGE_BACKGROUND_URL}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      };
    } else {
      return {
        backgroundImage: `linear-gradient(rgba(30, 30, 30, 0.40), rgba(0, 0, 0, 0.35)), url('https://images.unsplash.com/photo-1726295255404-b75ab7a2acea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXNoJTIwZ3JlZW4lMjBmb3Jlc3QlMjB0cmVlcyUyMG5hdHVyZXxlbnwxfHx8fDE3NTc3NTA2NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      };
    }
  }, [currentRole]);



  // Connection status indicator
  const ConnectionStatus = () => (
    <div className="fixed top-4 right-4 z-40 flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
      {isOnline ? (
        <div className="flex items-center gap-2 text-green-600">
          <Wifi className="w-4 h-4" />
          <span className="text-sm hidden sm:inline">Online</span>
        </div>
      ) : (
        <div className="flex items-center gap-2 text-red-600">
          <WifiOff className="w-4 h-4" />
          <span className="text-sm hidden sm:inline">Offline</span>
        </div>
      )}
    </div>
  );

  // Show initial loading page
  if (isLoading) {
    return (
      <ErrorBoundary>
        <LoadingPage 
          onComplete={() => setIsLoading(false)}
          duration={4000}
        />
      </ErrorBoundary>
    );
  }

  // Show transition loading when switching between views
  if (showLoadingTransition) {
    return (
      <ErrorBoundary>
        <LoadingPage 
          onComplete={() => setShowLoadingTransition(false)}
          loadingText="Switching to secure mode..."
          duration={500}
        />
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <div 
        className={`min-h-screen text-foreground transition-all duration-500 ease-in-out dark ${userPreferences.highContrast ? 'contrast-125' : ''} ${
          userPreferences.largeText ? 'text-lg' : ''
        }`}
        style={backgroundStyle}
      >

        
        {/* Connection status */}
        <ConnectionStatus />

        {/* Main content */}
        {currentRole === null && (
          <LandingPage 
            onRoleSelect={handleRoleSelect}
            userPreferences={userPreferences}
            onUpdatePreference={updateUserPreference}
          />
        )}
        
        <Suspense fallback={
          <LoadingPage 
            onComplete={() => {}}
            loadingText="Loading dashboard..."
            duration={1000}
          />
        }>
          {currentRole === 'tourist' && (
            <TouristDashboard
  onBack={handleBackToLanding}
  onEmergencyMode={handleEmergencyMode}
  onRegisterDigitalID={handleRegisterDigitalID}
  onOpenMap={handleOpenMap}
  onOpenAnalytics={handleOpenAnalytics}
  onOpenMobileApp={handleOpenMobileApp}
  onOpenGPS={handleOpenGPS}   // This triggers GPSNavigation view
/>

          )}
          
          {currentRole === 'police' && (
            <PoliceDashboard 
              onBack={handleBackToLanding}
              onOpenMap={handleOpenMap}
              onOpenAnalytics={handleOpenAnalytics}
            />
          )}
          
          {currentRole === 'admin' && (
            <AdminDashboard 
              onBack={handleBackToLanding}
              onOpenMap={handleOpenMap}
              onOpenAnalytics={handleOpenAnalytics}
            />
          )}
          
          {currentRole === 'emergency' && (
            <EmergencyResponseInterface 
              onBack={handleBackToLanding}
              isActive={true}
            />
          )}
          
          {currentRole === 'register' && (
            <DigitalIDRegistration 
              onBack={handleBackToLanding}
              onComplete={(data) => {
                console.log('Registration completed:', data);
                setCurrentRole('tourist');
                toast.success('Digital ID registration completed successfully!');
              }}
            />
          )}
          
          {currentRole === 'map' && (
            <InteractiveMap 
              onBack={handleBackToLanding}
              userRole={currentRole === 'map' ? 'tourist' : 'tourist'}
            />
          )}
          
          {currentRole === 'analytics' && (
            <AnalyticsDashboard 
              onBack={handleBackToLanding}
            />
          )}
          
          {currentRole === 'mobile' && (
            <MobileTouristApp 
              onBack={handleBackToLanding}
            />
          )}
          
          {currentRole === 'agency' && (
            <AgencyDashboard 
              onBack={handleBackToLanding}
              onOpenMap={handleOpenMap}
              onOpenAnalytics={handleOpenAnalytics}
            />
          )}

          {currentRole === 'gps' && (
  <GPSNavigation
    onBack={handleBackToLanding}
    name={deviceName}   // Pass device name here
  />
)}

                </Suspense>

        {/* Toast notifications */}
        <Toaster />
      </div>
    </ErrorBoundary>
  );
}