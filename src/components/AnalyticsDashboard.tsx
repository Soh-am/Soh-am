import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, RadialBarChart,
  RadialBar, Legend, Area, AreaChart, ScatterChart, Scatter
} from 'recharts';
import { 
  ArrowLeft, AlertTriangle, Shield, Users, MapPin, TrendingUp, 
  Activity, Clock, Target, Zap, Eye, Brain, Wifi, Signal,
  Moon, Sun, RefreshCw, Download, Filter, Calendar
} from 'lucide-react';

interface AnalyticsDashboardProps {
  onBack: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

// Mock data for charts
const locationTrackingData = [
  { time: '00:00', safeZone: 85, cautionZone: 12, dangerZone: 3, totalTourists: 245 },
  { time: '04:00', safeZone: 92, cautionZone: 6, dangerZone: 2, totalTourists: 198 },
  { time: '08:00', safeZone: 78, cautionZone: 18, dangerZone: 4, totalTourists: 567 },
  { time: '12:00', safeZone: 65, cautionZone: 28, dangerZone: 7, totalTourists: 892 },
  { time: '16:00', safeZone: 72, cautionZone: 22, dangerZone: 6, totalTourists: 756 },
  { time: '20:00', safeZone: 88, cautionZone: 10, dangerZone: 2, totalTourists: 423 },
];

const incidentTypesData = [
  { type: 'Lost/Missing', count: 23, severity: 'medium', trend: '+12%' },
  { type: 'Medical Emergency', count: 8, severity: 'high', trend: '-5%' },
  { type: 'Vehicle Breakdown', count: 15, severity: 'low', trend: '+8%' },
  { type: 'Wildlife Encounter', count: 4, severity: 'high', trend: '-15%' },
  { type: 'Weather Alert', count: 31, severity: 'medium', trend: '+25%' },
  { type: 'Restricted Area', count: 12, severity: 'medium', trend: '+3%' },
];

const riskScoreData = [
  { name: 'Overall Risk', value: 72, fill: '#ed8936' },
  { name: 'Weather Risk', value: 85, fill: '#c53030' },
  { name: 'Terrain Risk', value: 45, fill: '#38a169' },
  { name: 'Wildlife Risk', value: 62, fill: '#ed8936' },
];

const anomalyDetectionData = [
  { time: '06:00', normal: 95, suspicious: 3, anomaly: 2, confidence: 0.98 },
  { time: '09:00', normal: 78, suspicious: 18, anomaly: 4, confidence: 0.87 },
  { time: '12:00', normal: 65, suspicious: 25, anomaly: 10, confidence: 0.72 },
  { time: '15:00', normal: 82, suspicious: 12, anomaly: 6, confidence: 0.89 },
  { time: '18:00', normal: 91, suspicious: 7, anomaly: 2, confidence: 0.95 },
  { time: '21:00', normal: 97, suspicious: 2, anomaly: 1, confidence: 0.99 },
];

const heatMapData = [
  { area: 'Kaziranga NP', risk: 85, incidents: 12, tourists: 450, lat: 26.5, lng: 93.17 },
  { area: 'Shillong Hills', risk: 45, incidents: 3, tourists: 280, lat: 25.57, lng: 91.88 },
  { area: 'Tawang Valley', risk: 72, incidents: 8, tourists: 156, lat: 27.59, lng: 91.87 },
  { area: 'Majuli Island', risk: 38, incidents: 2, tourists: 195, lat: 27.01, lng: 94.20 },
  { area: 'Cherrapunji', risk: 68, incidents: 6, tourists: 320, lat: 25.30, lng: 91.70 },
  { area: 'Mawlynnong', risk: 25, incidents: 1, tourists: 89, lat: 25.31, lng: 91.88 },
];

const COLORS = {
  safe: '#38a169',
  caution: '#ed8936', 
  danger: '#c53030',
  primary: '#1a365d',
  accent: '#4682B4',
};

export function AnalyticsDashboard({ onBack, isDarkMode, onToggleDarkMode }: AnalyticsDashboardProps) {
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  const [selectedMetric, setSelectedMetric] = useState('all');

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg">
          <p className="text-card-foreground font-medium">{`Time: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.dataKey}: ${entry.value}${entry.dataKey.includes('Zone') ? '%' : ''}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const GaugeChart = ({ data, title }: { data: any, title: string }) => (
    <ResponsiveContainer width="100%" height={200}>
      <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="90%" barSize={10} data={[data]}>
        <RadialBar dataKey="value" cornerRadius={30} fill={data.fill} />
        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="fill-foreground font-semibold text-lg">
          {`${data.value}%`}
        </text>
      </RadialBarChart>
    </ResponsiveContainer>
  );

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-green-900/20 relative"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1589379387915-4fe084825024?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc3NhbSUyMHRlYSUyMGdhcmRlbnMlMjBoaWxscyUyMG1pc3R5fGVufDF8fHx8MTc1Nzc0ODUyNHww&ixlib=rb-4.1.0&q=80&w=1080')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Header */}
      <div className="bg-white/10 dark:bg-black/20 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/20">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div className="text-white">
                <h1 className="text-xl font-semibold">Analytics Dashboard</h1>
                <p className="text-sm text-white/80">AI-Powered Anomaly Detection & Risk Analysis</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
                <SelectTrigger className="w-32 bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1h">Last Hour</SelectItem>
                  <SelectItem value="24h">Last 24h</SelectItem>
                  <SelectItem value="7d">Last 7 Days</SelectItem>
                  <SelectItem value="30d">Last 30 Days</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <RefreshCw className="h-4 w-4" />
              </Button>
              
              <Button variant="ghost" size="sm" onClick={onToggleDarkMode} className="text-white hover:bg-white/20">
                {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Key Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="bg-white/20 dark:bg-black/30 backdrop-blur-md border-white/30 shadow-xl">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/80">Active Tourists</p>
                  <p className="text-2xl font-semibold text-white">1,247</p>
                  <Badge variant="secondary" className="mt-1 bg-green-500/20 text-green-300 border-green-500/30">
                    +12% from yesterday
                  </Badge>
                </div>
                <Users className="h-8 w-8 text-blue-300" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/20 dark:bg-black/30 backdrop-blur-md border-white/30 shadow-xl">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/80">AI Confidence</p>
                  <p className="text-2xl font-semibold text-white">94.2%</p>
                  <Badge variant="secondary" className="mt-1 bg-blue-500/20 text-blue-300 border-blue-500/30">
                    High Accuracy
                  </Badge>
                </div>
                <Brain className="h-8 w-8 text-purple-300" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/20 dark:bg-black/30 backdrop-blur-md border-white/30 shadow-xl">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/80">Active Alerts</p>
                  <p className="text-2xl font-semibold text-white">8</p>
                  <Badge variant="secondary" className="mt-1 bg-orange-500/20 text-orange-300 border-orange-500/30">
                    3 High Priority
                  </Badge>
                </div>
                <AlertTriangle className="h-8 w-8 text-orange-300" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/20 dark:bg-black/30 backdrop-blur-md border-white/30 shadow-xl">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/80">Response Time</p>
                  <p className="text-2xl font-semibold text-white">2.3m</p>
                  <Badge variant="secondary" className="mt-1 bg-green-500/20 text-green-300 border-green-500/30">
                    -18% Improved
                  </Badge>
                </div>
                <Zap className="h-8 w-8 text-green-300" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="tracking" className="space-y-6">
          <TabsList className="bg-white/20 backdrop-blur-md border-white/30">
            <TabsTrigger value="tracking" className="data-[state=active]:bg-white/30">Location Tracking</TabsTrigger>
            <TabsTrigger value="incidents" className="data-[state=active]:bg-white/30">Incident Analysis</TabsTrigger>
            <TabsTrigger value="risk" className="data-[state=active]:bg-white/30">Risk Assessment</TabsTrigger>
            <TabsTrigger value="anomaly" className="data-[state=active]:bg-white/30">AI Anomaly Detection</TabsTrigger>
          </TabsList>

          {/* Location Tracking Tab */}
          <TabsContent value="tracking" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/20 dark:bg-black/30 backdrop-blur-md border-white/30 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Tourist Distribution by Zone
                  </CardTitle>
                  <CardDescription className="text-white/70">
                    Real-time tracking of tourist locations across safety zones
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={locationTrackingData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="time" stroke="rgba(255,255,255,0.7)" />
                      <YAxis stroke="rgba(255,255,255,0.7)" />
                      <Tooltip content={<CustomTooltip />} />
                      <Area type="monotone" dataKey="safeZone" stackId="1" stroke={COLORS.safe} fill={COLORS.safe} fillOpacity={0.8} />
                      <Area type="monotone" dataKey="cautionZone" stackId="1" stroke={COLORS.caution} fill={COLORS.caution} fillOpacity={0.8} />
                      <Area type="monotone" dataKey="dangerZone" stackId="1" stroke={COLORS.danger} fill={COLORS.danger} fillOpacity={0.8} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-white/20 dark:bg-black/30 backdrop-blur-md border-white/30 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Tourist Traffic Patterns
                  </CardTitle>
                  <CardDescription className="text-white/70">
                    Total tourist movement throughout the day
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={locationTrackingData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="time" stroke="rgba(255,255,255,0.7)" />
                      <YAxis stroke="rgba(255,255,255,0.7)" />
                      <Tooltip content={<CustomTooltip />} />
                      <Line type="monotone" dataKey="totalTourists" stroke="#4682B4" strokeWidth={3} dot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Incidents Tab */}
          <TabsContent value="incidents" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 bg-white/20 dark:bg-black/30 backdrop-blur-md border-white/30 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Incident Types Analysis
                  </CardTitle>
                  <CardDescription className="text-white/70">
                    Breakdown of reported incidents by category
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={incidentTypesData} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis type="number" stroke="rgba(255,255,255,0.7)" />
                      <YAxis dataKey="type" type="category" stroke="rgba(255,255,255,0.7)" width={120} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="count" fill="#4682B4" radius={[0, 8, 8, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-white/20 dark:bg-black/30 backdrop-blur-md border-white/30 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-white">Incident Trends</CardTitle>
                  <CardDescription className="text-white/70">
                    Weekly comparison
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {incidentTypesData.map((incident, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-white/90">{incident.type}</span>
                        <Badge 
                          variant={incident.severity === 'high' ? 'destructive' : incident.severity === 'medium' ? 'secondary' : 'outline'}
                          className={`${
                            incident.severity === 'high' ? 'bg-red-500/20 text-red-300 border-red-500/30' :
                            incident.severity === 'medium' ? 'bg-orange-500/20 text-orange-300 border-orange-500/30' :
                            'bg-green-500/20 text-green-300 border-green-500/30'
                          }`}
                        >
                          {incident.trend}
                        </Badge>
                      </div>
                      <Progress 
                        value={(incident.count / Math.max(...incidentTypesData.map(i => i.count))) * 100} 
                        className="h-2 bg-white/20"
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Risk Assessment Tab */}
          <TabsContent value="risk" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
              {riskScoreData.map((risk, index) => (
                <Card key={index} className="bg-white/20 dark:bg-black/30 backdrop-blur-md border-white/30 shadow-xl">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-white text-center text-lg">{risk.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <GaugeChart data={risk} title={risk.name} />
                    <div className="mt-4 text-center">
                      <Badge 
                        variant="secondary"
                        className={`${
                          risk.value >= 80 ? 'bg-red-500/20 text-red-300 border-red-500/30' :
                          risk.value >= 60 ? 'bg-orange-500/20 text-orange-300 border-orange-500/30' :
                          'bg-green-500/20 text-green-300 border-green-500/30'
                        }`}
                      >
                        {risk.value >= 80 ? 'High Risk' : risk.value >= 60 ? 'Medium Risk' : 'Low Risk'}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-white/20 dark:bg-black/30 backdrop-blur-md border-white/30 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  High-Risk Areas Heat Map
                </CardTitle>
                <CardDescription className="text-white/70">
                  Tourist destinations ranked by risk level and incident frequency
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {heatMapData.map((area, index) => (
                    <Card key={index} className="bg-white/10 border-white/20">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-white font-medium">{area.area}</h4>
                          <Badge 
                            variant="secondary"
                            className={`${
                              area.risk >= 70 ? 'bg-red-500/20 text-red-300 border-red-500/30' :
                              area.risk >= 50 ? 'bg-orange-500/20 text-orange-300 border-orange-500/30' :
                              'bg-green-500/20 text-green-300 border-green-500/30'
                            }`}
                          >
                            {area.risk}% Risk
                          </Badge>
                        </div>
                        <div className="space-y-2 text-sm text-white/70">
                          <div className="flex justify-between">
                            <span>Incidents:</span>
                            <span className="text-white">{area.incidents}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Tourists:</span>
                            <span className="text-white">{area.tourists}</span>
                          </div>
                        </div>
                        <Progress value={area.risk} className="mt-3 h-2 bg-white/20" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Anomaly Detection Tab */}
          <TabsContent value="anomaly" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/20 dark:bg-black/30 backdrop-blur-md border-white/30 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    AI Anomaly Detection Patterns
                  </CardTitle>
                  <CardDescription className="text-white/70">
                    Machine learning analysis of tourist behavior anomalies
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={anomalyDetectionData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="time" stroke="rgba(255,255,255,0.7)" />
                      <YAxis stroke="rgba(255,255,255,0.7)" />
                      <Tooltip content={<CustomTooltip />} />
                      <Area type="monotone" dataKey="normal" stackId="1" stroke="#38a169" fill="#38a169" fillOpacity={0.8} />
                      <Area type="monotone" dataKey="suspicious" stackId="1" stroke="#ed8936" fill="#ed8936" fillOpacity={0.8} />
                      <Area type="monotone" dataKey="anomaly" stackId="1" stroke="#c53030" fill="#c53030" fillOpacity={0.8} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-white/20 dark:bg-black/30 backdrop-blur-md border-white/30 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    AI Model Confidence
                  </CardTitle>
                  <CardDescription className="text-white/70">
                    Real-time confidence scores for anomaly detection
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={anomalyDetectionData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="time" stroke="rgba(255,255,255,0.7)" />
                      <YAxis domain={[0, 1]} stroke="rgba(255,255,255,0.7)" />
                      <Tooltip 
                        content={({ active, payload, label }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-card/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg">
                                <p className="text-card-foreground font-medium">{`Time: ${label}`}</p>
                                <p className="text-sm text-blue-400">
                                  {`Confidence: ${(payload[0].value * 100).toFixed(1)}%`}
                                </p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Line type="monotone" dataKey="confidence" stroke="#4682B4" strokeWidth={3} dot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white/20 dark:bg-black/30 backdrop-blur-md border-white/30 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Wifi className="h-5 w-5" />
                  Real-Time Anomaly Alerts
                </CardTitle>
                <CardDescription className="text-white/70">
                  Live feed of AI-detected anomalies requiring attention
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { time: '14:23', type: 'Movement Pattern', location: 'Kaziranga NP - Sector 4', severity: 'high', description: 'Tourist group deviating from marked trail' },
                    { time: '14:18', type: 'Communication Gap', location: 'Shillong Hills', severity: 'medium', description: 'No check-in for 2+ hours from registered tourist' },
                    { time: '14:12', type: 'Cluster Formation', location: 'Cherrapunji Falls', severity: 'low', description: 'Unusual tourist gathering detected' },
                    { time: '14:05', type: 'Speed Anomaly', location: 'Tawang Road', severity: 'medium', description: 'Vehicle moving at concerning speed on mountain road' },
                  ].map((alert, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-white/10 rounded-lg border border-white/20">
                      <div className={`w-3 h-3 rounded-full mt-1 ${
                        alert.severity === 'high' ? 'bg-red-400' :
                        alert.severity === 'medium' ? 'bg-orange-400' :
                        'bg-green-400'
                      }`} />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="text-white font-medium">{alert.type}</h4>
                          <span className="text-xs text-white/60">{alert.time}</span>
                        </div>
                        <p className="text-sm text-white/80 mb-1">{alert.description}</p>
                        <p className="text-xs text-white/60">{alert.location}</p>
                      </div>
                      <Badge 
                        variant="secondary"
                        className={`${
                          alert.severity === 'high' ? 'bg-red-500/20 text-red-300 border-red-500/30' :
                          alert.severity === 'medium' ? 'bg-orange-500/20 text-orange-300 border-orange-500/30' :
                          'bg-green-500/20 text-green-300 border-green-500/30'
                        }`}
                      >
                        {alert.severity}
                      </Badge>
                    </div>
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