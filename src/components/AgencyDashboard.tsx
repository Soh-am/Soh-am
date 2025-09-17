import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  ArrowLeft, 
  MapPin, 
  Users, 
  AlertTriangle, 
  Shield, 
  Route,
  Bell,
  Search,
  Filter,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  Navigation
} from 'lucide-react';

interface AgencyDashboardProps {
  onBack: () => void;
  onOpenMap: () => void;
  onOpenAnalytics: () => void;
}

interface TravelerProfile {
  id: string;
  name: string;
  nationality: string;
  agency: string;
  status: 'active' | 'inactive' | 'alert';
  location: string;
  lastSeen: string;
  digitalId: string;
  avatar?: string;
  riskLevel: 'low' | 'medium' | 'high';
}

interface SafeRoute {
  id: string;
  name: string;
  from: string;
  to: string;
  distance: string;
  duration: string;
  safetyRating: number;
  alerts: number;
}

interface AlertNotification {
  id: string;
  type: 'warning' | 'danger' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: string;
  travelerIds: string[];
  isRead: boolean;
  priority: 'low' | 'medium' | 'high';
}

export function AgencyDashboard({ onBack, onOpenMap, onOpenAnalytics }: AgencyDashboardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAgency, setSelectedAgency] = useState<string>('all');
  const [selectedRoute, setSelectedRoute] = useState<string>('');
  const [alerts, setAlerts] = useState<AlertNotification[]>([]);

  // Mock data for traveler profiles
  const [travelers] = useState<TravelerProfile[]>([
    {
      id: 'T001',
      name: 'Emma Wilson',
      nationality: 'United Kingdom',
      agency: 'Global Adventures Ltd',
      status: 'active',
      location: 'Agra, Uttar Pradesh',
      lastSeen: '2 minutes ago',
      digitalId: 'GA-UK-001-2024',
      riskLevel: 'low'
    },
    {
      id: 'T002',
      name: 'James Smith',
      nationality: 'United States',
      agency: 'Sunrise Travel Co',
      status: 'alert',
      location: 'Delhi NCR',
      lastSeen: '15 minutes ago',
      digitalId: 'ST-US-002-2024',
      riskLevel: 'high'
    },
    {
      id: 'T003',
      name: 'Maria Rodriguez',
      nationality: 'Spain',
      agency: 'European Tours',
      status: 'active',
      location: 'Jaipur, Rajasthan',
      lastSeen: '5 minutes ago',
      digitalId: 'ET-ES-003-2024',
      riskLevel: 'medium'
    },
    {
      id: 'T004',
      name: 'Chen Wei',
      nationality: 'China',
      agency: 'Asia Pacific Travel',
      status: 'inactive',
      location: 'Mumbai, Maharashtra',
      lastSeen: '2 hours ago',
      digitalId: 'AP-CN-004-2024',
      riskLevel: 'low'
    }
  ]);

  // Mock data for safe routes
  const [safeRoutes] = useState<SafeRoute[]>([
    {
      id: 'R001',
      name: 'Golden Triangle Classic',
      from: 'Delhi',
      to: 'Agra via Jaipur',
      distance: '560 km',
      duration: '3 days',
      safetyRating: 9.2,
      alerts: 0
    },
    {
      id: 'R002',
      name: 'Rajasthan Heritage Trail',
      from: 'Jaipur',
      to: 'Jodhpur via Pushkar',
      distance: '280 km',
      duration: '2 days',
      safetyRating: 8.7,
      alerts: 1
    },
    {
      id: 'R003',
      name: 'Mumbai to Goa Coastal',
      from: 'Mumbai',
      to: 'Goa',
      distance: '460 km',
      duration: '1 day',
      safetyRating: 8.9,
      alerts: 0
    }
  ]);

  // Initialize alerts
  useEffect(() => {
    setAlerts([
      {
        id: 'A001',
        type: 'warning',
        title: 'Weather Alert',
        message: 'Heavy rainfall expected in Jaipur region. Travelers advised to stay indoors.',
        timestamp: '10 minutes ago',
        travelerIds: ['T003'],
        isRead: false,
        priority: 'medium'
      },
      {
        id: 'A002',
        type: 'danger',
        title: 'Security Incident',
        message: 'Tourist reported suspicious activity near Red Fort, Delhi. Enhanced monitoring activated.',
        timestamp: '25 minutes ago',
        travelerIds: ['T002'],
        isRead: false,
        priority: 'high'
      },
      {
        id: 'A003',
        type: 'info',
        title: 'Route Update',
        message: 'New safe route added: Agra to Fatehpur Sikri with enhanced security coverage.',
        timestamp: '1 hour ago',
        travelerIds: [],
        isRead: true,
        priority: 'low'
      },
      {
        id: 'A004',
        type: 'success',
        title: 'Emergency Response',
        message: 'Tourist emergency successfully resolved in Mumbai. All safety protocols followed.',
        timestamp: '2 hours ago',
        travelerIds: ['T004'],
        isRead: true,
        priority: 'medium'
      }
    ]);
  }, []);

  const filteredTravelers = travelers.filter(traveler => {
    const matchesSearch = traveler.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         traveler.digitalId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         traveler.agency.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAgency = selectedAgency === 'all' || traveler.agency === selectedAgency;
    return matchesSearch && matchesAgency;
  });

  const agencies = Array.from(new Set(travelers.map(t => t.agency)));
  const unreadAlerts = alerts.filter(alert => !alert.isRead).length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'inactive': return 'bg-gray-500';
      case 'alert': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'high': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
      case 'danger': return <XCircle className="w-4 h-4 text-red-400" />;
      case 'info': return <Eye className="w-4 h-4 text-blue-400" />;
      case 'success': return <CheckCircle className="w-4 h-4 text-green-400" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const markAlertAsRead = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, isRead: true } : alert
    ));
  };

  return (
    <div className="min-h-screen bg-black/40 backdrop-blur-lg text-white">
      {/* Header */}
      <div className="bg-gray-900/95 backdrop-blur-lg border-b border-gray-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="text-gray-300 hover:text-white hover:bg-gray-800"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Agency Dashboard</h1>
                  <p className="text-sm text-gray-400">Travel Agency Management & Monitoring</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                onClick={onOpenMap}
                variant="outline"
                size="sm"
                className="border-blue-500/30 text-blue-300 hover:bg-blue-500/20"
              >
                <MapPin className="w-4 h-4 mr-2" />
                Open Map
              </Button>
              <Button
                onClick={onOpenAnalytics}
                variant="outline"
                size="sm"
                className="border-green-500/30 text-green-300 hover:bg-green-500/20"
              >
                Analytics
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-black/60 backdrop-blur-lg border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Active Travelers</p>
                  <p className="text-2xl font-bold text-green-400">{travelers.filter(t => t.status === 'active').length}</p>
                </div>
                <Users className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/60 backdrop-blur-lg border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Safe Routes</p>
                  <p className="text-2xl font-bold text-blue-400">{safeRoutes.length}</p>
                </div>
                <Route className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/60 backdrop-blur-lg border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Active Alerts</p>
                  <p className="text-2xl font-bold text-red-400">{unreadAlerts}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/60 backdrop-blur-lg border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Agencies</p>
                  <p className="text-2xl font-bold text-purple-400">{agencies.length}</p>
                </div>
                <Shield className="w-8 h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="travelers" className="space-y-6">
          <TabsList className="grid grid-cols-3 w-full max-w-md bg-black/60 backdrop-blur-lg border-white/10">
            <TabsTrigger value="travelers" className="data-[state=active]:bg-purple-600">
              Travelers
            </TabsTrigger>
            <TabsTrigger value="routes" className="data-[state=active]:bg-blue-600">
              Safe Routes
            </TabsTrigger>
            <TabsTrigger value="alerts" className="data-[state=active]:bg-red-600">
              Alerts ({unreadAlerts})
            </TabsTrigger>
          </TabsList>

          {/* Travelers Tab */}
          <TabsContent value="travelers" className="space-y-6">
            {/* Filters */}
            <Card className="bg-black/60 backdrop-blur-lg border-white/10">
              <CardHeader>
                <CardTitle className="text-purple-300">Traveler Profiles</CardTitle>
                <CardDescription className="text-gray-400">
                  Monitor and manage travelers grouped by their assigned agencies
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Search by name, Digital ID, or agency..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-gray-800/50 border-gray-600 text-white"
                      icon={<Search className="w-4 h-4" />}
                    />
                  </div>
                  <Select value={selectedAgency} onValueChange={setSelectedAgency}>
                    <SelectTrigger className="md:w-64 bg-gray-800/50 border-gray-600 text-white">
                      <SelectValue placeholder="Filter by agency" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      <SelectItem value="all">All Agencies</SelectItem>
                      {agencies.map(agency => (
                        <SelectItem key={agency} value={agency}>{agency}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredTravelers.map((traveler) => (
                    <Card key={traveler.id} className="bg-gray-800/50 border-gray-600 hover:border-purple-500/50 transition-colors">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={traveler.avatar} />
                              <AvatarFallback className="bg-purple-600 text-white">
                                {traveler.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-semibold text-white">{traveler.name}</h4>
                              <p className="text-sm text-gray-400">{traveler.nationality}</p>
                            </div>
                          </div>
                          <div className={`w-3 h-3 rounded-full ${getStatusColor(traveler.status)}`} />
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Agency:</span>
                            <span className="text-white">{traveler.agency}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Digital ID:</span>
                            <span className="text-blue-300 font-mono">{traveler.digitalId}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Location:</span>
                            <span className="text-white">{traveler.location}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Last Seen:</span>
                            <span className="text-gray-300">{traveler.lastSeen}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Risk Level:</span>
                            <span className={getRiskColor(traveler.riskLevel)}>
                              {traveler.riskLevel.toUpperCase()}
                            </span>
                          </div>
                        </div>

                        <div className="mt-3 pt-3 border-t border-gray-600">
                          <Button variant="outline" size="sm" className="w-full border-purple-500/30 text-purple-300 hover:bg-purple-500/20">
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Safe Routes Tab */}
          <TabsContent value="routes" className="space-y-6">
            <Card className="bg-black/60 backdrop-blur-lg border-white/10">
              <CardHeader>
                <CardTitle className="text-blue-300">Interactive Safe Travel Routes</CardTitle>
                <CardDescription className="text-gray-400">
                  Pre-verified safe routes with real-time monitoring and updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {safeRoutes.map((route) => (
                    <Card key={route.id} className="bg-gray-800/50 border-gray-600 hover:border-blue-500/50 transition-colors">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-2">{route.name}</h4>
                            <div className="flex items-center space-x-2 text-sm text-gray-400">
                              <Navigation className="w-4 h-4" />
                              <span>{route.from} → {route.to}</span>
                            </div>
                          </div>
                          <Badge 
                            variant="outline" 
                            className={`${route.alerts > 0 ? 'border-red-500/30 text-red-300' : 'border-green-500/30 text-green-300'}`}
                          >
                            {route.alerts} alerts
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-400">Distance</p>
                            <p className="text-white font-semibold">{route.distance}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400">Duration</p>
                            <p className="text-white font-semibold">{route.duration}</p>
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-400">Safety Rating</span>
                            <span className="text-green-400 font-semibold">{route.safetyRating}/10</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-green-600 to-green-400 h-2 rounded-full"
                              style={{ width: `${route.safetyRating * 10}%` }}
                            />
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1 border-blue-500/30 text-blue-300 hover:bg-blue-500/20"
                            onClick={() => {
                              setSelectedRoute(route.id);
                              onOpenMap();
                            }}
                          >
                            <MapPin className="w-4 h-4 mr-2" />
                            View on Map
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="border-gray-500/30 text-gray-300 hover:bg-gray-500/20"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Alerts Tab */}
          <TabsContent value="alerts" className="space-y-6">
            <Card className="bg-black/60 backdrop-blur-lg border-white/10">
              <CardHeader>
                <CardTitle className="text-red-300">Real-time Targeted Alert Notifications</CardTitle>
                <CardDescription className="text-gray-400">
                  Monitor and respond to security alerts, weather warnings, and emergency notifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {alerts.map((alert) => (
                    <Card 
                      key={alert.id} 
                      className={`border-gray-600 cursor-pointer transition-all ${
                        alert.isRead ? 'bg-gray-800/30' : 'bg-gray-800/70 border-l-4 border-l-red-500'
                      }`}
                      onClick={() => markAlertAsRead(alert.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0 mt-1">
                            {getAlertIcon(alert.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className={`font-semibold ${alert.isRead ? 'text-gray-300' : 'text-white'}`}>
                                {alert.title}
                              </h4>
                              <div className="flex items-center space-x-2">
                                <Badge 
                                  variant="outline" 
                                  className={`${
                                    alert.priority === 'high' ? 'border-red-500/30 text-red-300' :
                                    alert.priority === 'medium' ? 'border-yellow-500/30 text-yellow-300' :
                                    'border-gray-500/30 text-gray-300'
                                  }`}
                                >
                                  {alert.priority}
                                </Badge>
                                <div className="flex items-center text-sm text-gray-400">
                                  <Clock className="w-4 h-4 mr-1" />
                                  {alert.timestamp}
                                </div>
                              </div>
                            </div>
                            <p className={`text-sm mb-2 ${alert.isRead ? 'text-gray-400' : 'text-gray-300'}`}>
                              {alert.message}
                            </p>
                            {alert.travelerIds.length > 0 && (
                              <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-400">Affects travelers:</span>
                                <div className="flex space-x-1">
                                  {alert.travelerIds.map(travelerId => {
                                    const traveler = travelers.find(t => t.id === travelerId);
                                    return traveler ? (
                                      <Badge key={travelerId} variant="outline" className="text-xs border-purple-500/30 text-purple-300">
                                        {traveler.name}
                                      </Badge>
                                    ) : null;
                                  })}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default AgencyDashboard;