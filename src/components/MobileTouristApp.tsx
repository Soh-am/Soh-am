import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  ArrowLeft, Shield, AlertCircle, Phone, MapPin, Share2, 
  Globe, MessageCircle, Camera, Navigation, AlertTriangle, Heart,
  Wifi, Battery, Signal, Settings, Bell, User, Home,
  Map, ChevronLeft, ChevronRight, Star, Clock, Info,
  Zap, Eye, ThumbsUp, BookOpen, Volume2, Languages
} from 'lucide-react';

interface MobileTouristAppProps {
  onBack: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

// Mock data
const safetyTips = [
  {
    id: 1,
    title: "Wildlife Safety in Kaziranga",
    description: "Maintain 30m distance from elephants and rhinos. Never approach or feed wild animals.",
    image: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=300&h=200&fit=crop",
    category: "Wildlife",
    priority: "high",
    likes: 124
  },
  {
    id: 2,
    title: "Monsoon Trekking Precautions",
    description: "Wear proper grip shoes, carry rain gear, and avoid steep trails during heavy rainfall.",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=300&h=200&fit=crop",
    category: "Weather",
    priority: "medium",
    likes: 89
  },
  {
    id: 3,
    title: "Cultural Etiquette Guide",
    description: "Respect local customs, dress modestly when visiting religious sites, seek permission before photography.",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop",
    category: "Culture",
    priority: "low",
    likes: 156
  },
  {
    id: 4,
    title: "Emergency Contact Protocol",
    description: "Save local emergency numbers, inform your location regularly, and carry backup communication.",
    image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=300&h=200&fit=crop",
    category: "Emergency",
    priority: "high",
    likes: 201
  }
];

const emergencyContacts = [
  { name: "Tourist Helpline", number: "1363", type: "primary", icon: "🆘" },
  { name: "Police Emergency", number: "100", type: "police", icon: "👮" },
  { name: "Medical Emergency", number: "108", type: "medical", icon: "🚑" },
  { name: "Fire Emergency", number: "101", type: "fire", icon: "🚒" },
  { name: "Local Guide - Ravi", number: "+91-98765-43210", type: "guide", icon: "🧭" },
  { name: "Hotel Reception", number: "+91-98765-43211", type: "accommodation", icon: "🏨" }
];

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
  { code: 'as', name: 'অসমীয়া', flag: '🌿' },
  { code: 'bn', name: 'বাংলা', flag: '🇧🇩' }
];

export function MobileTouristApp({ onBack, isDarkMode, onToggleDarkMode }: MobileTouristAppProps) {
  const [activeTab, setActiveTab] = useState('home');
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [locationSharing, setLocationSharing] = useState(true);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [safetyScore, setSafetyScore] = useState(87);
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState(78);
  const [signalStrength, setSignalStrength] = useState(4);

  // Auto-advance safety tips
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTipIndex((prev) => (prev + 1) % safetyTips.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleEmergencyPress = () => {
    setIsEmergencyMode(true);
    // In a real app, this would trigger emergency protocols
    setTimeout(() => setIsEmergencyMode(false), 3000);
  };

  const getCurrentTip = () => safetyTips[currentTipIndex];

  const NavButton = ({ icon: Icon, label, tabKey, badge }: { icon: any, label: string, tabKey: string, badge?: number }) => (
    <button
      onClick={() => setActiveTab(tabKey)}
      className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200 ${
        activeTab === tabKey 
          ? 'bg-blue-500/20 text-blue-400' 
          : 'text-gray-400 hover:text-white hover:bg-white/10'
      }`}
    >
      <div className="relative">
        <Icon className="h-5 w-5" />
        {badge && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            {badge}
          </span>
        )}
      </div>
      <span className="text-xs mt-1">{label}</span>
    </button>
  );

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/20 to-green-900/20 relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.8)), url('https://images.unsplash.com/photo-1589379387915-4fe084825024?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc3NhbSUyMHRlYSUyMGdhcmRlbnMlMjBoaWxscyUyMG1pc3R5fGVufDF8fHx8MTc1Nzc0ODUyNHww&ixlib=rb-4.1.0&q=80&w=1080')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Status Bar */}
      <div className="bg-black/50 backdrop-blur-sm px-4 py-2 flex justify-between items-center text-white text-sm">
        <div className="flex items-center gap-2">
          <Signal className="h-4 w-4" />
          <span>{signalStrength}/5</span>
          <Wifi className="h-4 w-4" />
        </div>
        <div className="flex items-center gap-1">
          <span>{batteryLevel}%</span>
          <Battery className="h-4 w-4" />
        </div>
      </div>

      {/* Emergency Mode Overlay */}
      {isEmergencyMode && (
        <div className="absolute inset-0 z-50 bg-red-600/90 backdrop-blur-sm flex items-center justify-center">
          <div className="text-center text-white p-8">
            <AlertTriangle className="h-16 w-16 mx-auto mb-4 animate-pulse" />
            <h2 className="text-2xl font-bold mb-2">EMERGENCY ACTIVATED</h2>
            <p className="text-lg">Sending location to emergency services...</p>
            <div className="mt-4">
              <div className="animate-spin h-8 w-8 border-4 border-white border-t-transparent rounded-full mx-auto"></div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 pb-20">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-md border-b border-white/20 px-4 py-3">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/20 p-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center gap-3">
              <Select value={currentLanguage} onValueChange={setCurrentLanguage}>
                <SelectTrigger className="w-20 bg-white/10 border-white/20 text-white text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      <span className="flex items-center gap-2">
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 p-2">
                <Bell className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Home Tab */}
        {activeTab === 'home' && (
          <div className="p-4 space-y-4">
            {/* Safety Score Widget */}
            <Card className="bg-white/20 backdrop-blur-md border-white/30 shadow-xl">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-400" />
                    <span className="text-white font-medium">Safety Status</span>
                  </div>
                  <Badge className={`${
                    safetyScore >= 80 ? 'bg-green-500/20 text-green-300 border-green-500/30' :
                    safetyScore >= 60 ? 'bg-orange-500/20 text-orange-300 border-orange-500/30' :
                    'bg-red-500/20 text-red-300 border-red-500/30'
                  }`}>
                    {safetyScore >= 80 ? 'Safe' : safetyScore >= 60 ? 'Caution' : 'Alert'}
                  </Badge>
                </div>
                
                <div className="text-center mb-3">
                  <div className="text-3xl font-bold text-white mb-1">{safetyScore}%</div>
                  <Progress value={safetyScore} className="h-2 bg-white/20" />
                </div>
                
                <div className="flex justify-between text-sm text-white/70">
                  <span>Location: Kaziranga NP</span>
                  <span>Last updated: 2m ago</span>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Button */}
            <Button 
              onClick={handleEmergencyPress}
              className="w-full h-16 bg-red-600 hover:bg-red-700 text-white font-bold text-lg rounded-xl shadow-xl border-2 border-red-500"
            >
              <AlertTriangle className="h-6 w-6 mr-2" />
              EMERGENCY - PRESS & HOLD
            </Button>

            {/* Geofencing Status */}
            <Card className="bg-white/20 backdrop-blur-md border-white/30 shadow-xl">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-blue-400" />
                    <div>
                      <p className="text-white font-medium">Current Zone</p>
                      <p className="text-sm text-white/70">Safe Tourism Area</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                      SAFE ZONE
                    </Badge>
                    <p className="text-xs text-white/60 mt-1">2.3km from boundary</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Safety Tips Carousel */}
            <Card className="bg-white/20 backdrop-blur-md border-white/30 shadow-xl">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white text-lg">Safety Tips</CardTitle>
                  <div className="flex gap-1">
                    {safetyTips.map((_, index) => (
                      <div 
                        key={index}
                        className={`h-2 w-2 rounded-full ${
                          currentTipIndex === index ? 'bg-blue-400' : 'bg-white/30'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="relative overflow-hidden rounded-lg">
                  <img 
                    src={getCurrentTip().image} 
                    alt={getCurrentTip().title}
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <Badge 
                      className={`mb-2 ${
                        getCurrentTip().priority === 'high' ? 'bg-red-500/20 text-red-300 border-red-500/30' :
                        getCurrentTip().priority === 'medium' ? 'bg-orange-500/20 text-orange-300 border-orange-500/30' :
                        'bg-green-500/20 text-green-300 border-green-500/30'
                      }`}
                    >
                      {getCurrentTip().category}
                    </Badge>
                    <h4 className="text-white font-medium mb-1">{getCurrentTip().title}</h4>
                    <p className="text-white/80 text-sm">{getCurrentTip().description}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-3">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setCurrentTipIndex((prev) => (prev - 1 + safetyTips.length) % safetyTips.length)}
                    className="text-white/70 hover:text-white hover:bg-white/10"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  
                  <div className="flex items-center gap-2 text-white/70">
                    <ThumbsUp className="h-4 w-4" />
                    <span className="text-sm">{getCurrentTip().likes}</span>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setCurrentTipIndex((prev) => (prev + 1) % safetyTips.length)}
                    className="text-white/70 hover:text-white hover:bg-white/10"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 h-12"
                onClick={() => setActiveTab('contacts')}
              >
                <Phone className="h-4 w-4 mr-2" />
                Emergency Contacts
              </Button>
              
              <Button 
                variant="outline" 
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 h-12"
                onClick={() => setActiveTab('map')}
              >
                <Map className="h-4 w-4 mr-2" />
                Open Map
              </Button>
            </div>
          </div>
        )}

        {/* Map Tab */}
        {activeTab === 'map' && (
          <div className="p-4 space-y-4">
            <Card className="bg-white/20 backdrop-blur-md border-white/30 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Navigation className="h-5 w-5" />
                  Interactive Map
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-green-900/30 h-64 rounded-lg flex items-center justify-center border border-white/20">
                  <div className="text-center text-white">
                    <Map className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>Interactive map would be displayed here</p>
                    <p className="text-sm text-white/70 mt-1">Showing your location and nearby points of interest</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2">
                    <Switch 
                      checked={locationSharing} 
                      onCheckedChange={setLocationSharing}
                      className="data-[state=checked]:bg-green-500"
                    />
                    <span className="text-white text-sm">Share Location</span>
                  </div>
                  
                  <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Contacts Tab */}
        {activeTab === 'contacts' && (
          <div className="p-4 space-y-4">
            <div className="text-center mb-4">
              <h2 className="text-xl font-bold text-white">Emergency Contacts</h2>
              <p className="text-white/70">Tap to call instantly</p>
            </div>
            
            {emergencyContacts.map((contact, index) => (
              <Card key={index} className="bg-white/20 backdrop-blur-md border-white/30 shadow-xl">
                <CardContent className="p-4">
                  <button className="w-full flex items-center justify-between hover:bg-white/10 rounded-lg p-2 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{contact.icon}</div>
                      <div className="text-left">
                        <p className="text-white font-medium">{contact.name}</p>
                        <p className="text-white/70 text-sm">{contact.number}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant="outline"
                        className={`${
                          contact.type === 'primary' || contact.type === 'police' ? 'bg-red-500/20 text-red-300 border-red-500/30' :
                          contact.type === 'medical' || contact.type === 'fire' ? 'bg-orange-500/20 text-orange-300 border-orange-500/30' :
                          'bg-blue-500/20 text-blue-300 border-blue-500/30'
                        }`}
                      >
                        {contact.type}
                      </Badge>
                      <Phone className="h-5 w-5 text-green-400" />
                    </div>
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="p-4 space-y-4">
            <Card className="bg-white/20 backdrop-blur-md border-white/30 shadow-xl">
              <CardContent className="p-4">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="/placeholder-avatar.jpg" />
                    <AvatarFallback className="bg-blue-500 text-white">JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-white font-semibold text-lg">John Doe</h3>
                    <p className="text-white/70">Tourist ID: TR-2024-001</p>
                    <Badge className="mt-1 bg-green-500/20 text-green-300 border-green-500/30">
                      Verified Traveler
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-white/70">Safety Score</span>
                    <span className="text-white font-medium">{safetyScore}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Trips Completed</span>
                    <span className="text-white font-medium">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Member Since</span>
                    <span className="text-white font-medium">Jan 2024</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/20 backdrop-blur-md border-white/30 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white">Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white">Location Sharing</span>
                  <Switch 
                    checked={locationSharing} 
                    onCheckedChange={setLocationSharing}
                    className="data-[state=checked]:bg-green-500"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white">Emergency Notifications</span>
                  <Switch defaultChecked className="data-[state=checked]:bg-green-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white">Sound Alerts</span>
                  <Switch defaultChecked className="data-[state=checked]:bg-green-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white">Dark Mode</span>
                  <Switch 
                    checked={isDarkMode} 
                    onCheckedChange={onToggleDarkMode}
                    className="data-[state=checked]:bg-green-500"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-md border-t border-white/20 px-4 py-2">
        <div className="flex justify-around items-center">
          <NavButton icon={Home} label="Home" tabKey="home" />
          <NavButton icon={Map} label="Map" tabKey="map" />
          <NavButton icon={Phone} label="Contacts" tabKey="contacts" badge={3} />
          <NavButton icon={User} label="Profile" tabKey="profile" />
        </div>
      </div>
    </div>
  );
}