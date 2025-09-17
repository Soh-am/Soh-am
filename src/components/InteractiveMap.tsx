import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { 
  ArrowLeft, 
  Search, 
  ZoomIn, 
  ZoomOut, 
  Layers, 
  MapPin, 
  Shield, 
  Heart, 
  AlertTriangle,
  Users,
  Navigation,
  Eye,
  EyeOff,
  Plus,
  Minus
} from 'lucide-react';

interface TouristLocation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  status: 'safe' | 'warning' | 'danger' | 'emergency';
  lastUpdate: string;
  group?: string;
}

interface MapLocation {
  id: string;
  name: string;
  type: 'police' | 'hospital' | 'landmark';
  lat: number;
  lng: number;
  description?: string;
}

interface GeofenceZone {
  id: string;
  name: string;
  type: 'safe' | 'restricted' | 'emergency';
  coordinates: [number, number][];
  radius?: number;
}

interface InteractiveMapProps {
  onBack?: () => void;
  isDarkMode?: boolean;
  userRole?: 'tourist' | 'police' | 'admin';
}

export function InteractiveMap({ onBack, isDarkMode = false, userRole = 'tourist' }: InteractiveMapProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLayers, setSelectedLayers] = useState({
    tourists: true,
    police: true,
    hospitals: true,
    geofences: true,
    restricted: true
  });
  const [mapCenter, setMapCenter] = useState<[number, number]>([28.6139, 77.2090]); // Delhi coordinates
  const [zoomLevel, setZoomLevel] = useState(12);
  const [selectedTourist, setSelectedTourist] = useState<TouristLocation | null>(null);
  const [hoveredMarker, setHoveredMarker] = useState<string | null>(null);

  // Mock data for tourists
  const touristLocations: TouristLocation[] = useMemo(() => [
    { id: '1', name: 'John Doe', lat: 28.6129, lng: 77.2295, status: 'safe', lastUpdate: '2 mins ago', group: 'Family Tour' },
    { id: '2', name: 'Sarah Smith', lat: 28.6169, lng: 77.2090, status: 'safe', lastUpdate: '5 mins ago', group: 'Solo Traveler' },
    { id: '3', name: 'Mike Johnson', lat: 28.6200, lng: 77.2100, status: 'warning', lastUpdate: '1 min ago', group: 'Business Trip' },
    { id: '4', name: 'Lisa Brown', lat: 28.6180, lng: 77.2150, status: 'danger', lastUpdate: '3 mins ago', group: 'Adventure Group' },
    { id: '5', name: 'David Wilson', lat: 28.6220, lng: 77.2080, status: 'emergency', lastUpdate: 'Just now', group: 'Emergency' },
    { id: '6', name: 'Emma Davis', lat: 28.6150, lng: 77.2120, status: 'safe', lastUpdate: '4 mins ago', group: 'Family Tour' },
    { id: '7', name: 'James Taylor', lat: 28.6190, lng: 77.2070, status: 'warning', lastUpdate: '2 mins ago', group: 'Solo Traveler' },
    { id: '8', name: 'Sophie Anderson', lat: 28.6160, lng: 77.2180, status: 'safe', lastUpdate: '6 mins ago', group: 'Student Exchange' },
  ], []);

  // Mock data for map locations
  const mapLocations: MapLocation[] = [
    { id: 'p1', name: 'Central Police Station', type: 'police', lat: 28.6139, lng: 77.2090, description: '24/7 Emergency Response' },
    { id: 'p2', name: 'Tourist Police Unit', type: 'police', lat: 28.6200, lng: 77.2150, description: 'Specialized Tourist Support' },
    { id: 'h1', name: 'All India Institute of Medical Sciences', type: 'hospital', lat: 28.6169, lng: 77.2080, description: 'Level 1 Trauma Center' },
    { id: 'h2', name: 'Safdarjung Hospital', type: 'hospital', lat: 28.5706, lng: 77.2094, description: 'Emergency Care Available' },
    { id: 'l1', name: 'India Gate', type: 'landmark', lat: 28.6129, lng: 77.2295, description: 'Popular Tourist Destination' },
  ];

  // Mock geofence zones
  const geofenceZones: GeofenceZone[] = [
    {
      id: 'g1',
      name: 'Safe Tourist Zone',
      type: 'safe',
      coordinates: [
        [28.6100, 77.2050],
        [28.6250, 77.2050],
        [28.6250, 77.2200],
        [28.6100, 77.2200],
      ]
    },
    {
      id: 'g2',
      name: 'Restricted Area',
      type: 'restricted',
      coordinates: [
        [28.6180, 77.2180],
        [28.6220, 77.2180],
        [28.6220, 77.2220],
        [28.6180, 77.2220],
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe': return '#38a169'; // safety green
      case 'warning': return '#ed8936'; // warning orange
      case 'danger': return '#c53030'; // emergency red
      case 'emergency': return '#c53030'; // emergency red
      default: return '#1a365d'; // deep blue
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'safe': return '✓';
      case 'warning': return '!';
      case 'danger': return '⚠';
      case 'emergency': return '🚨';
      default: return '?';
    }
  };

  // Convert lat/lng to pixel coordinates for our custom map
  const latLngToPixel = (lat: number, lng: number) => {
    const mapBounds = {
      minLat: 28.5500,
      maxLat: 28.6500,
      minLng: 77.1800,
      maxLng: 77.2400
    };
    
    const mapWidth = 800;
    const mapHeight = 600;
    
    const x = ((lng - mapBounds.minLng) / (mapBounds.maxLng - mapBounds.minLng)) * mapWidth;
    const y = ((mapBounds.maxLat - lat) / (mapBounds.maxLat - mapBounds.minLat)) * mapHeight;
    
    return { x: Math.max(0, Math.min(mapWidth, x)), y: Math.max(0, Math.min(mapHeight, y)) };
  };

  // Cluster nearby tourists
  const clusteredTourists = useMemo(() => {
    const clusters: { [key: string]: TouristLocation[] } = {};
    const visited = new Set<string>();
    
    touristLocations.forEach(tourist => {
      if (visited.has(tourist.id)) return;
      
      const cluster = [tourist];
      visited.add(tourist.id);
      
      touristLocations.forEach(other => {
        if (visited.has(other.id)) return;
        
        const distance = Math.sqrt(
          Math.pow(tourist.lat - other.lat, 2) + Math.pow(tourist.lng - other.lng, 2)
        );
        
        if (distance < 0.005) { // Cluster if within ~500m
          cluster.push(other);
          visited.add(other.id);
        }
      });
      
      const clusterKey = `${tourist.lat.toFixed(4)}_${tourist.lng.toFixed(4)}`;
      clusters[clusterKey] = cluster;
    });
    
    return clusters;
  }, [touristLocations]);

  const filteredTourists = touristLocations.filter(tourist =>
    tourist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tourist.group?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLayerToggle = (layer: keyof typeof selectedLayers) => {
    setSelectedLayers(prev => ({ ...prev, [layer]: !prev[layer] }));
  };

  const handleTouristClick = (tourist: TouristLocation) => {
    setSelectedTourist(tourist);
    setMapCenter([tourist.lat, tourist.lng]);
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 1, 18));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 1, 1));
  };

  return (
    <div className="h-screen w-full flex flex-col bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-card border-b border-border">
        <div className="flex items-center gap-4">
          {onBack && (
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          )}
          <h1 className="text-xl font-semibold">Interactive Safety Map</h1>
          <Badge variant="outline" className="text-xs">
            {filteredTourists.length} Tourists Tracked
          </Badge>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tourists or groups..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Layers and Legend */}
        <div className="w-80 bg-card border-r border-border flex flex-col">
          {/* Layer Controls */}
          <Card className="m-4 mb-2">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Layers className="h-4 w-4" />
                Map Layers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-500" />
                  <span>Tourists</span>
                </div>
                <Switch
                  checked={selectedLayers.tourists}
                  onCheckedChange={() => handleLayerToggle('tourists')}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <span>Police Stations</span>
                </div>
                <Switch
                  checked={selectedLayers.police}
                  onCheckedChange={() => handleLayerToggle('police')}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-red-500" />
                  <span>Hospitals</span>
                </div>
                <Switch
                  checked={selectedLayers.hospitals}
                  onCheckedChange={() => handleLayerToggle('hospitals')}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-green-500" />
                  <span>Safe Zones</span>
                </div>
                <Switch
                  checked={selectedLayers.geofences}
                  onCheckedChange={() => handleLayerToggle('geofences')}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <EyeOff className="h-4 w-4 text-red-600" />
                  <span>Restricted Areas</span>
                </div>
                <Switch
                  checked={selectedLayers.restricted}
                  onCheckedChange={() => handleLayerToggle('restricted')}
                />
              </div>
            </CardContent>
          </Card>

          {/* Legend */}
          <Card className="m-4 mt-2 mb-2">
            <CardHeader className="pb-3">
              <CardTitle>Status Legend</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-[#38a169] border-2 border-white"></div>
                <span className="text-sm">Safe</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-[#ed8936] border-2 border-white"></div>
                <span className="text-sm">Warning</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-[#c53030] border-2 border-white"></div>
                <span className="text-sm">Danger</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-[#c53030] border-2 border-white animate-pulse"></div>
                <span className="text-sm">Emergency</span>
              </div>
            </CardContent>
          </Card>

          {/* Tourist List */}
          <Card className="m-4 mt-2 flex-1 flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle>Active Tourists</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-auto space-y-2">
              {filteredTourists.map((tourist) => (
                <div
                  key={tourist.id}
                  className="p-3 border border-border rounded-lg cursor-pointer hover:bg-accent transition-colors"
                  onClick={() => handleTouristClick(tourist)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full border border-white"
                        style={{ backgroundColor: getStatusColor(tourist.status) }}
                      ></div>
                      <span className="font-medium text-sm">{tourist.name}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {tourist.status}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {tourist.group} • {tourist.lastUpdate}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Map Container */}
        <div className="flex-1 relative">
          {/* Custom Map SVG */}
          <div className="h-full w-full relative overflow-hidden bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-800 dark:to-gray-900">
            <svg 
              width="100%" 
              height="100%" 
              viewBox="0 0 800 600" 
              className="absolute inset-0"
              style={{ background: isDarkMode ? '#1f2937' : '#f8fafc' }}
            >
              {/* Grid lines for map feel */}
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path 
                    d="M 40 0 L 0 0 0 40" 
                    fill="none" 
                    stroke={isDarkMode ? '#374151' : '#e2e8f0'} 
                    strokeWidth="1"
                    opacity="0.3"
                  />
                </pattern>
              </defs>
              <rect width="800" height="600" fill="url(#grid)" />

              {/* Safe Zones */}
              {selectedLayers.geofences && geofenceZones
                .filter(zone => zone.type === 'safe')
                .map(zone => {
                  const points = zone.coordinates.map(coord => {
                    const pixel = latLngToPixel(coord[0], coord[1]);
                    return `${pixel.x},${pixel.y}`;
                  }).join(' ');
                  
                  return (
                    <polygon
                      key={zone.id}
                      points={points}
                      fill="#38a169"
                      fillOpacity="0.1"
                      stroke="#38a169"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                    />
                  );
                })}

              {/* Restricted Areas */}
              {selectedLayers.restricted && geofenceZones
                .filter(zone => zone.type === 'restricted')
                .map(zone => {
                  const points = zone.coordinates.map(coord => {
                    const pixel = latLngToPixel(coord[0], coord[1]);
                    return `${pixel.x},${pixel.y}`;
                  }).join(' ');
                  
                  return (
                    <polygon
                      key={zone.id}
                      points={points}
                      fill="#c53030"
                      fillOpacity="0.2"
                      stroke="#c53030"
                      strokeWidth="2"
                      strokeDasharray="3,3"
                    />
                  );
                })}

              {/* Police Station Markers */}
              {selectedLayers.police && mapLocations
                .filter(loc => loc.type === 'police')
                .map(location => {
                  const pixel = latLngToPixel(location.lat, location.lng);
                  return (
                    <g key={location.id}>
                      <circle
                        cx={pixel.x}
                        cy={pixel.y}
                        r="12"
                        fill="#1a365d"
                        stroke="white"
                        strokeWidth="3"
                      />
                      <text
                        x={pixel.x}
                        y={pixel.y + 4}
                        textAnchor="middle"
                        fill="white"
                        fontSize="10"
                        fontWeight="bold"
                      >
                        🚔
                      </text>
                    </g>
                  );
                })}

              {/* Hospital Markers */}
              {selectedLayers.hospitals && mapLocations
                .filter(loc => loc.type === 'hospital')
                .map(location => {
                  const pixel = latLngToPixel(location.lat, location.lng);
                  return (
                    <g key={location.id}>
                      <circle
                        cx={pixel.x}
                        cy={pixel.y}
                        r="12"
                        fill="#c53030"
                        stroke="white"
                        strokeWidth="3"
                      />
                      <text
                        x={pixel.x}
                        y={pixel.y + 4}
                        textAnchor="middle"
                        fill="white"
                        fontSize="10"
                        fontWeight="bold"
                      >
                        🏥
                      </text>
                    </g>
                  );
                })}

              {/* Tourist Markers */}
              {selectedLayers.tourists && Object.entries(clusteredTourists).map(([key, cluster]) => {
                const representative = cluster[0];
                const isCluster = cluster.length > 1;
                const pixel = latLngToPixel(representative.lat, representative.lng);
                
                return (
                  <g 
                    key={key}
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredMarker(key)}
                    onMouseLeave={() => setHoveredMarker(null)}
                    onClick={() => handleTouristClick(representative)}
                  >
                    <circle
                      cx={pixel.x}
                      cy={pixel.y}
                      r={isCluster ? "16" : "12"}
                      fill={getStatusColor(representative.status)}
                      stroke="white"
                      strokeWidth="3"
                      className={representative.status === 'emergency' ? 'animate-pulse' : ''}
                    />
                    <text
                      x={pixel.x}
                      y={pixel.y + 4}
                      textAnchor="middle"
                      fill="white"
                      fontSize={isCluster ? "12" : "10"}
                      fontWeight="bold"
                    >
                      {isCluster ? cluster.length : getStatusIcon(representative.status)}
                    </text>
                    
                    {/* Tooltip */}
                    {hoveredMarker === key && (
                      <g>
                        <rect
                          x={pixel.x + 20}
                          y={pixel.y - 40}
                          width="160"
                          height={isCluster ? "80" : "60"}
                          fill={isDarkMode ? '#1f2937' : 'white'}
                          stroke={isDarkMode ? '#374151' : '#e2e8f0'}
                          strokeWidth="1"
                          rx="4"
                        />
                        <text
                          x={pixel.x + 25}
                          y={pixel.y - 25}
                          fill={isDarkMode ? 'white' : 'black'}
                          fontSize="12"
                          fontWeight="bold"
                        >
                          {isCluster ? `Cluster (${cluster.length})` : representative.name}
                        </text>
                        <text
                          x={pixel.x + 25}
                          y={pixel.y - 10}
                          fill={isDarkMode ? '#9ca3af' : '#6b7280'}
                          fontSize="10"
                        >
                          {isCluster ? 'Multiple tourists' : representative.group}
                        </text>
                        <text
                          x={pixel.x + 25}
                          y={pixel.y + 5}
                          fill={getStatusColor(representative.status)}
                          fontSize="10"
                          fontWeight="bold"
                        >
                          Status: {representative.status}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Map Controls Overlay */}
          <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
            <Button
              size="sm"
              variant="outline"
              className="bg-background/90 backdrop-blur-sm"
              onClick={handleZoomIn}
            >
              <Plus className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="bg-background/90 backdrop-blur-sm"
              onClick={handleZoomOut}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="bg-background/90 backdrop-blur-sm"
              onClick={() => {
                setMapCenter([28.6139, 77.2090]);
                setZoomLevel(12);
              }}
            >
              <Navigation className="h-4 w-4" />
            </Button>
          </div>

          {/* Status Bar */}
          <div className="absolute bottom-4 left-4 right-4 z-10">
            <Card className="bg-background/90 backdrop-blur-sm">
              <CardContent className="p-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-[#38a169] rounded-full"></div>
                      <span>{touristLocations.filter(t => t.status === 'safe').length} Safe</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-[#ed8936] rounded-full"></div>
                      <span>{touristLocations.filter(t => t.status === 'warning').length} Warning</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-[#c53030] rounded-full"></div>
                      <span>{touristLocations.filter(t => t.status === 'danger').length} Danger</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-[#c53030] rounded-full animate-pulse"></div>
                      <span>{touristLocations.filter(t => t.status === 'emergency').length} Emergency</span>
                    </div>
                  </div>
                  <div className="text-muted-foreground">
                    Zoom: {zoomLevel} | Center: {mapCenter[0].toFixed(4)}, {mapCenter[1].toFixed(4)}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}