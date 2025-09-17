import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Alert, AlertDescription } from './ui/alert';
import { Separator } from './ui/separator';
import { 
  ArrowLeft, 
  Phone, 
  Shield, 
  MapPin, 
  AlertTriangle, 
  QrCode, 
  Globe,
  Heart,
  Battery,
  Wifi,
  Navigation,
  CheckCircle,
  Clock,
  User,
  CreditCard
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import logoImage from 'figma:asset/d523c28324cd629ececcf264dd1b037642c2bd36.png';

interface TouristDashboardProps {
  onBack: () => void;
  onEmergencyMode?: () => void;
  onRegisterDigitalID?: () => void;
  onOpenMap?: () => void;
  onOpenAnalytics?: () => void;
  onOpenMobileApp?: () => void;
  onOpenGPS?: () => void;
}

export function TouristDashboard({ onBack, onEmergencyMode, onRegisterDigitalID, onOpenMap, onOpenAnalytics, onOpenMobileApp, onOpenGPS }: TouristDashboardProps) {
  const [safetyScore] = useState(85);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [emergencyActive, setEmergencyActive] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'hi', name: 'हिन्दी (Hindi)', flag: '🇮🇳' },
    { code: 'bn', name: 'বাংলা (Bengali)', flag: '🇮🇳' },
    { code: 'te', name: 'తెలుగు (Telugu)', flag: '🇮🇳' },
    { code: 'mr', name: 'मराठी (Marathi)', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ் (Tamil)', flag: '🇮🇳' },
    { code: 'ur', name: 'اردو (Urdu)', flag: '🇮🇳' },
    { code: 'gu', name: 'ગુજરાતી (Gujarati)', flag: '🇮🇳' },
    { code: 'kn', name: 'ಕನ್ನಡ (Kannada)', flag: '🇮🇳' },
    { code: 'ml', name: 'മലയാളം (Malayalam)', flag: '🇮🇳' },
  ];

  const emergencyContacts = [
    { name: 'Local Police', number: '100', type: 'police' },
    { name: 'Medical Emergency', number: '108', type: 'medical' },
    { name: 'Tourist Helpline', number: '1363', type: 'tourist' },
    { name: 'Embassy Contact', number: '+1-555-0123', type: 'embassy' },
  ];

  const recentAlerts = [
    { 
      id: 1, 
      type: 'info', 
      message: 'Welcome to Delhi! Your safety monitoring is now active.', 
      time: '2 hours ago',
      severity: 'low'
    },
    { 
      id: 2, 
      type: 'warning', 
      message: 'High tourist activity detected in your area. Stay alert.', 
      time: '45 minutes ago',
      severity: 'medium'
    },
    { 
      id: 3, 
      type: 'success', 
      message: 'You have entered a verified safe zone.', 
      time: '15 minutes ago',
      severity: 'low'
    },
  ];

  const handleEmergencyAlert = () => {
    if (onEmergencyMode) {
      onEmergencyMode();
    } else {
      setEmergencyActive(true);
      // In a real app, this would trigger emergency protocols
      setTimeout(() => setEmergencyActive(false), 5000);
    }
  };

  const getSafetyScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-orange-500';
    return 'text-red-600';
  };

  const getSafetyScoreStatus = (score: number) => {
    if (score >= 80) return 'Safe';
    if (score >= 60) return 'Caution';
    return 'Alert';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900/60 via-black/50 to-gray-800/60 backdrop-blur-lg text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900/95 to-black/95 backdrop-blur-lg border-b border-gray-400/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="text-gray-100 hover:text-white hover:bg-gray-800/50"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 flex items-center justify-center">
                  <img 
                    src={logoImage} 
                    alt="Dhruvian Logo" 
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Tourist Dashboard</h1>
                  <p className="text-sm text-gray-200">Dhruvian Monitoring System</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-32 bg-gray-900/60 border-gray-400/30 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-400/30">
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      <span className="flex items-center space-x-2">
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Digital ID Card */}
            <Card className="overflow-hidden bg-black/60 backdrop-blur-lg border-gray-400/20">
              <CardHeader className="bg-gradient-to-r from-gray-700 to-gray-800 text-white">
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Digital Tourist ID</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-start space-x-6">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1679340999599-599f2f1f6331?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3VyaXN0JTIwcGFzc3BvcnQlMjBwaG90b3xlbnwxfHx8fDE3NTc2OTIzODF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Tourist Photo"
                    className="w-24 h-32 object-cover rounded-lg border-2 border-gray-200"
                  />
                  <div className="flex-1">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Full Name</p>
                        <p className="font-semibold">John Anderson</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Nationality</p>
                        <p className="font-semibold">🇺🇸 United States</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Tourist ID</p>
                        <p className="font-semibold">TID-2024-001234</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Validity</p>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Valid until Dec 2024
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <QrCode className="w-16 h-16 mx-auto mb-2 text-gray-400" />
                    <p className="text-xs text-muted-foreground">Scan for verification</p>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="flex justify-center">
                  <Button 
                    onClick={onRegisterDigitalID}
                    variant="outline"
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Update Digital ID
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Safety Score & Location */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-black/60 backdrop-blur-lg border-gray-400/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-white">
                    <Shield className="w-5 h-5" />
                    <span>Safety Score</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className={`text-4xl font-bold mb-2 ${getSafetyScoreColor(safetyScore)}`}>
                      {safetyScore}%
                    </div>
                    <Badge 
                      variant={safetyScore >= 80 ? "default" : safetyScore >= 60 ? "secondary" : "destructive"}
                      className="mb-4"
                    >
                      {getSafetyScoreStatus(safetyScore)}
                    </Badge>
                    <Progress value={safetyScore} className="w-full h-2" />
                    <p className="text-sm text-muted-foreground mt-2">
                      Based on location, time, and crowd analysis
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/60 backdrop-blur-lg border-gray-400/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-white">
                    <MapPin className="w-5 h-5" />
                    <span>Current Location</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold">Connaught Place</p>
                      <p className="text-sm text-muted-foreground">New Delhi, India</p>
                    </div>
                    <Badge variant="outline" className="bg-green-50 border-green-200 text-green-800">
                      <Navigation className="w-3 h-3 mr-1" />
                      Safe Zone
                    </Badge>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1" style={{ marginRight: '200px' }}>
                        <Wifi className="w-4 h-4 text-green-600" />
                        <span>Connected</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Battery className="w-4 h-4 text-green-600" />
                        <span>92%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Emergency Panic Button */}
            <Card className={`border-2 ${emergencyActive ? 'border-red-500 bg-red-50 dark:bg-red-950' : 'border-red-200'}`}>
              <CardContent className="p-6">
                <div className="text-center">
                  <Button
                    size="lg"
                    className={`w-32 h-32 rounded-full text-white font-bold text-lg ${
                      emergencyActive 
                        ? 'bg-red-700 animate-pulse' 
                        : 'bg-red-600 hover:bg-red-700 transform hover:scale-105 transition-all'
                    }`}
                    onClick={handleEmergencyAlert}
                    disabled={emergencyActive}
                  >
                    <div className="flex flex-col items-center">
                      <AlertTriangle className="w-8 h-8 mb-2" />
                      <span>PANIC</span>
                    </div>
                  </Button>
                  <p className="mt-4 text-sm text-muted-foreground">
                    {emergencyActive ? 'Emergency alert sent! Help is on the way.' : 'Press for emergency assistance interface'}
                  </p>
                  {emergencyActive && (
                    <Alert className="mt-4 border-red-200 bg-red-50 dark:bg-red-950">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription className="text-red-800 dark:text-red-200">
                        Emergency services have been notified. Stay calm and safe.
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Quick Access */}
          <div className="space-y-6">
            {/* Emergency Contacts */}
            <Card className="bg-black/60 backdrop-blur-lg border-gray-400/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white">
                  <Phone className="w-5 h-5" />
                  <span>Emergency Contacts</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <p className="font-semibold text-sm">{contact.name}</p>
                      <p className="text-sm text-muted-foreground">{contact.number}</p>
                    </div>
                    <Button size="sm" variant="outline">
                      <Phone className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Health Monitor */}
            <Card className="bg-black/60 backdrop-blur-lg border-gray-400/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white">
                  <Heart className="w-5 h-5" />
                  <span>Health Monitor</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 rounded-lg bg-muted/50">
                    <p className="text-2xl font-bold text-red-600">72</p>
                    <p className="text-xs text-muted-foreground">Heart Rate</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-muted/50">
                    <p className="text-2xl font-bold text-green-600">98.6°F</p>
                    <p className="text-xs text-muted-foreground">Temperature</p>
                  </div>
                </div>
                <Badge variant="outline" className="w-full justify-center">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  All vitals normal
                </Badge>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-black/60 backdrop-blur-lg border-gray-400/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white">
                  <Navigation className="w-5 h-5" />
                  <span>Quick Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  onClick={onOpenGPS}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  GPS Navigation
                </Button>
                <Button 
                  onClick={onOpenMobileApp}
                  variant="secondary"
                  className="w-full"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Mobile Safety App
                </Button>
                <Button 
                  onClick={onRegisterDigitalID}
                  variant="outline"
                  className="w-full"
                >
                  <QrCode className="w-4 h-4 mr-2" />
                  Update Digital ID
                </Button>
                <Button 
                  onClick={onOpenMap}
                  variant="outline"
                  className="w-full"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Safety Map
                </Button>
              </CardContent>
            </Card>

            {/* Recent Alerts */}
            <Card className="bg-black/60 backdrop-blur-lg border-gray-400/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white">
                  <AlertTriangle className="w-5 h-5" />
                  <span>Recent Alerts</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentAlerts.map((alert) => (
                  <div key={alert.id} className="p-3 rounded-lg border border-border">
                    <div className="flex items-start space-x-2">
                      <Badge 
                        variant={alert.type === 'success' ? 'default' : alert.type === 'warning' ? 'secondary' : 'outline'}
                        className="mt-0.5"
                      >
                        {alert.severity}
                      </Badge>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">{alert.message}</p>
                        <div className="flex items-center text-xs text-muted-foreground mt-1">
                          <Clock className="w-3 h-3 mr-1" />
                          {alert.time}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}