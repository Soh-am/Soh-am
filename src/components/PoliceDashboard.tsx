import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import logoImage from 'figma:asset/d523c28324cd629ececcf264dd1b037642c2bd36.png';
import { 
  ArrowLeft, 
  Shield, 
  MapPin, 
  AlertTriangle, 
  Search,
  Users,
  Clock,
  FileText,
  Radio,
  Eye,
  TrendingUp,
  Navigation,
  Zap,
  CheckCircle,
  XCircle,
  AlertCircle,
  QrCode,
  Scan,
  UserCheck,
  Camera,
  KeyRound
} from 'lucide-react';

interface PoliceDashboardProps {
  onBack: () => void;
  onOpenMap?: () => void;
  onOpenAnalytics?: () => void;
}

interface VerificationResult {
  digitalId: string;
  name: string;
  nationality: string;
  agency: string;
  status: 'valid' | 'invalid' | 'expired' | 'suspicious';
  photo?: string;
  issuedDate: string;
  expiryDate: string;
  currentLocation: string;
  riskLevel: 'low' | 'medium' | 'high';
  emergencyContact: string;
  lastVerified: string;
}

export function PoliceDashboard({ onBack, onOpenMap, onOpenAnalytics }: PoliceDashboardProps) {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [verificationInput, setVerificationInput] = useState('');
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [showVerificationDialog, setShowVerificationDialog] = useState(false);

  const statistics = [
    { title: 'Total Tourists', value: '1,247', change: '+12%', icon: Users, color: 'blue' },
    { title: 'Active Alerts', value: '23', change: '-8%', icon: AlertTriangle, color: 'red' },
    { title: 'Safe Zones', value: '45', change: '+2', icon: Shield, color: 'green' },
    { title: 'Response Time', value: '3.2min', change: '-15%', icon: Clock, color: 'orange' },
  ];

  const activeIncidents = [
    {
      id: 'INC-001',
      type: 'emergency',
      location: 'Connaught Place',
      tourist: 'John Anderson (TID-001234)',
      time: '2 minutes ago',
      severity: 'high',
      status: 'active',
      description: 'Tourist panic button activated'
    },
    {
      id: 'INC-002',
      type: 'suspicious',
      location: 'India Gate',
      tourist: 'Maria Garcia (TID-005678)',
      time: '15 minutes ago',
      severity: 'medium',
      status: 'investigating',
      description: 'Suspicious activity detected via AI'
    },
    {
      id: 'INC-003',
      type: 'medical',
      location: 'Red Fort',
      tourist: 'David Kim (TID-009876)',
      time: '35 minutes ago',
      severity: 'high',
      status: 'responded',
      description: 'Medical emergency - heart rate anomaly'
    },
    {
      id: 'INC-004',
      type: 'lost',
      location: 'Chandni Chowk',
      tourist: 'Sarah Johnson (TID-003456)',
      time: '1 hour ago',
      severity: 'low',
      status: 'resolved',
      description: 'Tourist reported lost - now located'
    },
  ];

  const touristLocations = [
    { id: 'TID-001234', name: 'John Anderson', location: 'Connaught Place', status: 'emergency', lat: 28.6315, lng: 77.2167 },
    { id: 'TID-005678', name: 'Maria Garcia', location: 'India Gate', status: 'caution', lat: 28.6129, lng: 77.2295 },
    { id: 'TID-009876', name: 'David Kim', location: 'Red Fort', status: 'safe', lat: 28.6562, lng: 77.2410 },
    { id: 'TID-003456', name: 'Sarah Johnson', location: 'Chandni Chowk', status: 'safe', lat: 28.6506, lng: 77.2334 },
    { id: 'TID-007890', name: 'Ahmed Hassan', location: 'Lotus Temple', status: 'safe', lat: 28.5535, lng: 77.2588 },
  ];

  // Mock verification function
  const handleVerification = (input: string) => {
    // Simulate verification process
    setTimeout(() => {
      if (input.includes('GA-UK-001-2024') || input.includes('TID-001234')) {
        setVerificationResult({
          digitalId: 'GA-UK-001-2024',
          name: 'Emma Wilson',
          nationality: 'United Kingdom',
          agency: 'Global Adventures Ltd',
          status: 'valid',
          issuedDate: '2024-01-15',
          expiryDate: '2024-12-31',
          currentLocation: 'Agra, Uttar Pradesh',
          riskLevel: 'low',
          emergencyContact: '+44-7911-123456',
          lastVerified: '2 minutes ago'
        });
      } else if (input.includes('ST-US-002-2024')) {
        setVerificationResult({
          digitalId: 'ST-US-002-2024',
          name: 'James Smith',
          nationality: 'United States',
          agency: 'Sunrise Travel Co',
          status: 'suspicious',
          issuedDate: '2024-02-10',
          expiryDate: '2024-12-31',
          currentLocation: 'Delhi NCR',
          riskLevel: 'high',
          emergencyContact: '+1-555-987-6543',
          lastVerified: '15 minutes ago'
        });
      } else {
        setVerificationResult({
          digitalId: input,
          name: 'Unknown Tourist',
          nationality: 'Unknown',
          agency: 'Unknown',
          status: 'invalid',
          issuedDate: 'N/A',
          expiryDate: 'N/A',
          currentLocation: 'Unknown',
          riskLevel: 'high',
          emergencyContact: 'N/A',
          lastVerified: 'Never'
        });
      }
      setIsScanning(false);
    }, 2000);
  };

  const handleScanQR = () => {
    setIsScanning(true);
    setVerificationResult(null);
    // Simulate QR code scanning
    setTimeout(() => {
      handleVerification('GA-UK-001-2024');
    }, 3000);
  };

  const handleManualVerification = () => {
    if (verificationInput.trim()) {
      setIsScanning(true);
      setVerificationResult(null);
      handleVerification(verificationInput);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-orange-500';
      case 'low': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-red-300 bg-red-900/30 border-red-500/30';
      case 'investigating': return 'text-orange-300 bg-orange-900/30 border-orange-500/30';
      case 'responded': return 'text-blue-300 bg-blue-900/30 border-blue-500/30';
      case 'resolved': return 'text-green-300 bg-green-900/30 border-green-500/30';
      default: return 'text-gray-300 bg-gray-900/30 border-gray-500/30';
    }
  };

  const getTouristStatusColor = (status: string) => {
    switch (status) {
      case 'emergency': return 'text-red-400';
      case 'caution': return 'text-orange-400';
      case 'safe': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getVerificationStatusColor = (status: string) => {
    switch (status) {
      case 'valid': return 'text-green-400 bg-green-900/30 border-green-500/30';
      case 'invalid': return 'text-red-400 bg-red-900/30 border-red-500/30';
      case 'expired': return 'text-orange-400 bg-orange-900/30 border-orange-500/30';
      case 'suspicious': return 'text-red-400 bg-red-900/50 border-red-500/50 animate-pulse';
      default: return 'text-gray-400 bg-gray-900/30 border-gray-500/30';
    }
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
                <div className="w-10 h-10 flex items-center justify-center">
                  <img 
                    src={logoImage} 
                    alt="Dhruvian Logo" 
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Police Operations</h1>
                  <p className="text-sm text-gray-400">Real-time Tourist Safety Monitoring</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Dialog open={showVerificationDialog} onOpenChange={setShowVerificationDialog}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-green-500/30 text-green-300 hover:bg-green-500/20"
                  >
                    <UserCheck className="w-4 h-4 mr-2" />
                    Verify Tourist ID
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-900 border-gray-600 text-white max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-green-300">Police Verification System</DialogTitle>
                    <DialogDescription className="text-gray-400">
                      Scan QR code or enter Digital ID for instant tourist verification
                    </DialogDescription>
                  </DialogHeader>
                  
                  <Tabs defaultValue="scan" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 bg-gray-800">
                      <TabsTrigger value="scan" className="data-[state=active]:bg-blue-600">
                        QR Scan
                      </TabsTrigger>
                      <TabsTrigger value="manual" className="data-[state=active]:bg-green-600">
                        Manual Entry
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="scan" className="space-y-4">
                      <div className="text-center py-8">
                        <div className="w-32 h-32 mx-auto mb-4 bg-gray-800 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-600">
                          {isScanning ? (
                            <div className="animate-spin">
                              <Scan className="w-16 h-16 text-blue-400" />
                            </div>
                          ) : (
                            <QrCode className="w-16 h-16 text-gray-400" />
                          )}
                        </div>
                        <p className="text-gray-400 mb-4">
                          {isScanning ? 'Scanning QR Code...' : 'Position QR code in the scanner'}
                        </p>
                        <Button 
                          onClick={handleScanQR}
                          disabled={isScanning}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <Camera className="w-4 h-4 mr-2" />
                          {isScanning ? 'Scanning...' : 'Start QR Scan'}
                        </Button>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="manual" className="space-y-4">
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-gray-300 mb-2 block">
                            Enter Digital ID or Tourist ID
                          </label>
                          <Input
                            placeholder="e.g., GA-UK-001-2024 or TID-001234"
                            value={verificationInput}
                            onChange={(e) => setVerificationInput(e.target.value)}
                            className="bg-gray-800 border-gray-600 text-white"
                          />
                        </div>
                        <Button 
                          onClick={handleManualVerification}
                          disabled={isScanning || !verificationInput.trim()}
                          className="w-full bg-green-600 hover:bg-green-700"
                        >
                          <KeyRound className="w-4 h-4 mr-2" />
                          {isScanning ? 'Verifying...' : 'Verify ID'}
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>

                  {/* Verification Result */}
                  {verificationResult && (
                    <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-600">
                      <div className="flex items-start justify-between mb-4">
                        <h4 className="font-semibold text-white">Verification Result</h4>
                        <Badge className={getVerificationStatusColor(verificationResult.status)}>
                          {verificationResult.status.toUpperCase()}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div>
                            <p className="text-xs text-gray-400">Digital ID</p>
                            <p className="text-sm font-mono text-blue-300">{verificationResult.digitalId}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400">Name</p>
                            <p className="text-sm text-white">{verificationResult.name}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400">Nationality</p>
                            <p className="text-sm text-white">{verificationResult.nationality}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400">Agency</p>
                            <p className="text-sm text-white">{verificationResult.agency}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400">Risk Level</p>
                            <Badge className={
                              verificationResult.riskLevel === 'high' ? 'border-red-500/30 text-red-300' :
                              verificationResult.riskLevel === 'medium' ? 'border-yellow-500/30 text-yellow-300' :
                              'border-green-500/30 text-green-300'
                            }>
                              {verificationResult.riskLevel.toUpperCase()}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <p className="text-xs text-gray-400">Current Location</p>
                            <p className="text-sm text-white">{verificationResult.currentLocation}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400">Issued Date</p>
                            <p className="text-sm text-white">{verificationResult.issuedDate}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400">Expiry Date</p>
                            <p className="text-sm text-white">{verificationResult.expiryDate}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400">Emergency Contact</p>
                            <p className="text-sm text-white">{verificationResult.emergencyContact}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400">Last Verified</p>
                            <p className="text-sm text-white">{verificationResult.lastVerified}</p>
                          </div>
                        </div>
                      </div>

                      {verificationResult.status === 'suspicious' && (
                        <div className="mt-4 p-3 bg-red-900/30 border border-red-500/30 rounded-lg">
                          <div className="flex items-center space-x-2 text-red-300">
                            <AlertTriangle className="w-4 h-4" />
                            <span className="font-semibold">SECURITY ALERT</span>
                          </div>
                          <p className="text-sm text-red-200 mt-1">
                            This tourist has been flagged for suspicious activity. Enhanced monitoring is recommended.
                          </p>
                        </div>
                      )}

                      <div className="flex space-x-2 mt-4">
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          <Eye className="w-4 h-4 mr-2" />
                          View Full Profile
                        </Button>
                        <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                          <MapPin className="w-4 h-4 mr-2" />
                          Track Location
                        </Button>
                      </div>
                    </div>
                  )}
                </DialogContent>
              </Dialog>

              <Button
                variant="outline"
                size="sm"
                className="border-blue-500/30 text-blue-300 hover:bg-blue-500/20"
              >
                <FileText className="w-4 h-4 mr-2" />
                E-FIR
              </Button>
              <Button
                onClick={onOpenMap}
                variant="outline"
                size="sm"
                className="border-blue-500/30 text-blue-300 hover:bg-blue-500/20"
              >
                <MapPin className="w-4 h-4 mr-2" />
                Map
              </Button>
              <Button
                onClick={onOpenAnalytics}
                variant="outline"
                size="sm"
                className="border-green-500/30 text-green-300 hover:bg-green-500/20"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Analytics
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {statistics.map((stat, index) => (
            <Card key={index} className="bg-black/60 backdrop-blur-lg border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">{stat.title}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                      {stat.change} from last week
                    </p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-${stat.color}-900/30`}>
                    <stat.icon className={`w-6 h-6 text-${stat.color}-400`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Main Map Area */}
          <div className="xl:col-span-2">
            <Card className="h-[600px] bg-black/60 backdrop-blur-lg border-white/10">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2 text-white">
                    <MapPin className="w-5 h-5" />
                    <span>Real-time Tourist Map</span>
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" className="border-gray-600 text-gray-300">
                      <Eye className="w-4 h-4 mr-1" />
                      Heat Map
                    </Button>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-32 bg-gray-800 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-600">
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="emergency">Emergency</SelectItem>
                        <SelectItem value="caution">Caution</SelectItem>
                        <SelectItem value="safe">Safe</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {/* Simulated Map View */}
                <div className="w-full h-[480px] bg-gray-800/50 rounded-lg relative overflow-hidden border border-gray-600">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800">
                    {/* Map Grid Pattern */}
                    <div className="absolute inset-0 opacity-20">
                      {Array.from({ length: 20 }).map((_, i) => (
                        <div key={i} className="border-b border-gray-600 h-6" />
                      ))}
                      {Array.from({ length: 30 }).map((_, i) => (
                        <div key={i} className="border-r border-gray-600 w-8 h-full absolute" style={{ left: `${i * 8}px` }} />
                      ))}
                    </div>
                    
                    {/* Tourist Markers */}
                    {touristLocations.map((tourist, index) => (
                      <div
                        key={tourist.id}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                        style={{
                          left: `${20 + (index * 15)}%`,
                          top: `${30 + (index * 12)}%`,
                        }}
                      >
                        <div className={`w-4 h-4 rounded-full border-2 border-white ${
                          tourist.status === 'emergency' ? 'bg-red-500 animate-pulse' :
                          tourist.status === 'caution' ? 'bg-orange-500' : 'bg-green-500'
                        }`} />
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                            {tourist.name}
                            <br />
                            {tourist.location}
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {/* Legend */}
                    <div className="absolute bottom-4 left-4 bg-gray-900/90 p-3 rounded-lg shadow-lg border border-gray-600">
                      <p className="text-sm font-semibold mb-2 text-white">Tourist Status</p>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <span className="text-xs text-gray-300">Emergency</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                          <span className="text-xs text-gray-300">Caution</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-xs text-gray-300">Safe</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar - Incidents & Tools */}
          <div className="space-y-6">
            {/* Search & Filters */}
            <Card className="bg-black/60 backdrop-blur-lg border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Quick Search</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search Tourist ID or Name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-gray-800 border-gray-600 text-white"
                  />
                </div>
                <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                  <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    <SelectItem value="all">All Incidents</SelectItem>
                    <SelectItem value="active">Active Only</SelectItem>
                    <SelectItem value="high">High Priority</SelectItem>
                    <SelectItem value="emergency">Emergency</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Active Incidents */}
            <Card className="bg-black/60 backdrop-blur-lg border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white">
                  <AlertTriangle className="w-5 h-5" />
                  <span>Active Incidents</span>
                  <Badge variant="destructive" className="ml-auto">
                    {activeIncidents.filter(i => i.status === 'active').length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 max-h-96 overflow-y-auto">
                {activeIncidents.map((incident) => (
                  <div key={incident.id} className="p-3 border border-gray-600 rounded-lg space-y-2 bg-gray-800/30">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${getSeverityColor(incident.severity)}`} />
                        <span className="font-semibold text-sm text-white">{incident.id}</span>
                        <Badge variant="outline" className={getStatusColor(incident.status)}>
                          {incident.status}
                        </Badge>
                      </div>
                      <span className="text-xs text-gray-400">{incident.time}</span>
                    </div>
                    <p className="text-sm font-medium text-white">{incident.tourist}</p>
                    <p className="text-sm text-gray-300">{incident.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1 text-xs text-gray-400">
                        <MapPin className="w-3 h-3" />
                        <span>{incident.location}</span>
                      </div>
                      <div className="flex space-x-1">
                        <Button size="sm" variant="outline" className="h-6 text-xs border-gray-600 text-gray-300">
                          View
                        </Button>
                        <Button size="sm" variant="outline" className="h-6 text-xs border-blue-600 text-blue-300">
                          Respond
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-black/60 backdrop-blur-lg border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-red-600 hover:bg-red-700">
                  <Zap className="w-4 h-4 mr-2" />
                  Emergency Broadcast
                </Button>
                <Button className="w-full justify-start" variant="outline" className="border-gray-600 text-gray-300">
                  <Navigation className="w-4 h-4 mr-2" />
                  Update Safe Zones
                </Button>
                <Button className="w-full justify-start" variant="outline" className="border-gray-600 text-gray-300">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
                <Button className="w-full justify-start" variant="outline" className="border-gray-600 text-gray-300">
                  <FileText className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PoliceDashboard;