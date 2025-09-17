import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import logoImage from 'figma:asset/d523c28324cd629ececcf264dd1b037642c2bd36.png';
import { 
  ArrowLeft, 
  Settings, 
  Brain, 
  Cpu, 
  Wifi, 
  Battery,
  Heart,
  Thermometer,
  Activity,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  XCircle,
  BarChart3,
  PieChart,
  LineChart,
  Zap,
  Calendar,
  Clock,
  MapPin
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart as RechartsPieChart, 
  Pie,
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  RadialBarChart,
  RadialBar
} from 'recharts';

interface AdminDashboardProps {
  onBack: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenMap?: () => void;
  onOpenAnalytics?: () => void;
}

export function AdminDashboard({ onBack, isDarkMode, onToggleDarkMode, onOpenMap, onOpenAnalytics }: AdminDashboardProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');

  // AI Anomaly Detection Data
  const anomalyData = [
    { time: '00:00', anomalies: 2, confidence: 85 },
    { time: '04:00', anomalies: 1, confidence: 92 },
    { time: '08:00', anomalies: 5, confidence: 78 },
    { time: '12:00', anomalies: 8, confidence: 65 },
    { time: '16:00', anomalies: 12, confidence: 58 },
    { time: '20:00', anomalies: 6, confidence: 82 },
  ];

  const riskAssessmentData = [
    { name: 'Low Risk', value: 65, color: '#38a169' },
    { name: 'Medium Risk', value: 25, color: '#ed8936' },
    { name: 'High Risk', value: 10, color: '#c53030' },
  ];

  const deviceStatusData = [
    { category: 'Wearables', online: 156, offline: 12, battery: 89 },
    { category: 'Mobile Apps', online: 1247, offline: 23, battery: 94 },
    { category: 'Panic Buttons', online: 89, offline: 3, battery: 76 },
    { category: 'IoT Sensors', online: 234, offline: 8, battery: 82 },
  ];

  const healthMetrics = [
    { time: '00:00', heartRate: 72, temperature: 98.6, activity: 20 },
    { time: '04:00', heartRate: 68, temperature: 98.2, activity: 5 },
    { time: '08:00', heartRate: 78, temperature: 98.8, activity: 45 },
    { time: '12:00', heartRate: 85, temperature: 99.1, activity: 80 },
    { time: '16:00', heartRate: 88, temperature: 99.2, activity: 95 },
    { time: '20:00', heartRate: 82, temperature: 98.9, activity: 60 },
  ];

  const predictiveAlerts = [
    {
      id: 1,
      type: 'crowd_density',
      location: 'Connaught Place',
      prediction: 'High crowd density expected in 2 hours',
      confidence: 89,
      severity: 'medium',
      action: 'Deploy additional monitoring'
    },
    {
      id: 2,
      type: 'weather_risk',
      location: 'India Gate',
      prediction: 'Weather conditions may affect tourist safety',
      confidence: 76,
      severity: 'low',
      action: 'Issue weather advisory'
    },
    {
      id: 3,
      type: 'behavior_anomaly',
      location: 'Red Fort',
      prediction: 'Unusual movement pattern detected',
      confidence: 94,
      severity: 'high',
      action: 'Immediate investigation required'
    },
  ];

  const systemMetrics = [
    { name: 'AI Processing', value: 92, status: 'optimal' },
    { name: 'Database Performance', value: 87, status: 'good' },
    { name: 'API Response Time', value: 95, status: 'optimal' },
    { name: 'Device Connectivity', value: 78, status: 'warning' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'warning': return 'text-orange-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'low': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-border p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center space-x-3">
              <img 
                src={logoImage} 
                alt="Dhruvian Logo" 
                className="w-8 h-8 object-contain"
              />
              <div>
                <h1 className="text-xl font-bold">Admin Dashboard</h1>
                <p className="text-sm text-muted-foreground">AI Analytics & System Management</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Maintenance
            </Button>
            <Button variant="outline" size="sm">
              <BarChart3 className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Button 
              onClick={onOpenMap}
              className="bg-[#1a365d] hover:bg-[#2d3748] text-white"
              size="sm"
            >
              <MapPin className="w-4 h-4 mr-2" />
              Interactive Map
            </Button>
            <Button 
              onClick={onOpenAnalytics}
              className="bg-[#4682B4] hover:bg-[#6B8E23] text-white"
              size="sm"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Analytics
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <Tabs defaultValue="ai-analytics" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="ai-analytics">AI Analytics</TabsTrigger>
            <TabsTrigger value="iot-devices">IoT Devices</TabsTrigger>
            <TabsTrigger value="health-monitoring">Health Monitor</TabsTrigger>
            <TabsTrigger value="system-status">System Status</TabsTrigger>
          </TabsList>

          {/* AI Analytics Tab */}
          <TabsContent value="ai-analytics" className="space-y-6">
            {/* AI Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Anomalies Detected</p>
                      <p className="text-2xl font-bold">34</p>
                      <p className="text-sm text-green-600">-12% from yesterday</p>
                    </div>
                    <Brain className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Prediction Accuracy</p>
                      <p className="text-2xl font-bold">94.2%</p>
                      <p className="text-sm text-green-600">+2.1% this week</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Processing Speed</p>
                      <p className="text-2xl font-bold">2.3ms</p>
                      <p className="text-sm text-red-600">+0.2ms response time</p>
                    </div>
                    <Zap className="w-8 h-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">False Positives</p>
                      <p className="text-2xl font-bold">5.8%</p>
                      <p className="text-sm text-green-600">-1.2% improvement</p>
                    </div>
                    <AlertTriangle className="w-8 h-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Anomaly Detection Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="w-5 h-5" />
                    <span>AI Anomaly Detection</span>
                  </CardTitle>
                  <CardDescription>Real-time anomaly detection patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={anomalyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="anomalies" stroke="#c53030" fill="#c53030" fillOpacity={0.3} />
                      <Area type="monotone" dataKey="confidence" stroke="#38a169" fill="#38a169" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Risk Assessment */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <PieChart className="w-5 h-5" />
                    <span>Risk Assessment Distribution</span>
                  </CardTitle>
                  <CardDescription>Current risk levels across monitored areas</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={riskAssessmentData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        dataKey="value"
                      >
                        {riskAssessmentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                  <div className="flex justify-center space-x-4 mt-4">
                    {riskAssessmentData.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-sm">{item.name}: {item.value}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Predictive Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="w-5 h-5" />
                  <span>Predictive Risk Alerts</span>
                </CardTitle>
                <CardDescription>AI-generated predictions and recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {predictiveAlerts.map((alert) => (
                    <div key={alert.id} className="p-4 border border-border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Badge className={getSeverityColor(alert.severity)}>
                            {alert.severity.toUpperCase()}
                          </Badge>
                          <span className="font-semibold">{alert.location}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{alert.confidence}% confidence</span>
                      </div>
                      <p className="text-sm mb-2">{alert.prediction}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Recommended: {alert.action}</span>
                        <div className="space-x-2">
                          <Button size="sm" variant="outline">Dismiss</Button>
                          <Button size="sm">Take Action</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* IoT Devices Tab */}
          <TabsContent value="iot-devices" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {deviceStatusData.map((device, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{device.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Online</span>
                        <span className="text-green-600 font-semibold">{device.online}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Offline</span>
                        <span className="text-red-600 font-semibold">{device.offline}</span>
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-muted-foreground">Avg Battery</span>
                          <span className="font-semibold">{device.battery}%</span>
                        </div>
                        <Progress value={device.battery} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Device Management Table */}
            <Card>
              <CardHeader>
                <CardTitle>Device Status Overview</CardTitle>
                <CardDescription>Real-time status of all connected IoT devices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { id: 'DEV-001', type: 'Panic Button', location: 'Zone A', status: 'online', battery: 89, lastSeen: '2 min ago' },
                    { id: 'DEV-002', type: 'Health Monitor', location: 'Zone B', status: 'online', battery: 76, lastSeen: '1 min ago' },
                    { id: 'DEV-003', type: 'GPS Tracker', location: 'Zone C', status: 'offline', battery: 23, lastSeen: '1 hour ago' },
                    { id: 'DEV-004', type: 'Environmental Sensor', location: 'Zone D', status: 'online', battery: 94, lastSeen: '30 sec ago' },
                  ].map((device) => (
                    <div key={device.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${device.status === 'online' ? 'bg-green-500' : 'bg-red-500'}`} />
                        <div>
                          <p className="font-semibold">{device.id}</p>
                          <p className="text-sm text-muted-foreground">{device.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm">{device.location}</p>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Battery className="w-3 h-3" />
                          <span>{device.battery}%</span>
                          <Clock className="w-3 h-3" />
                          <span>{device.lastSeen}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Health Monitoring Tab */}
          <TabsContent value="health-monitoring" className="space-y-6">
            {/* Health Metrics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Heart className="w-5 h-5 text-red-600" />
                    <span>Average Heart Rate</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-600 mb-2">78 BPM</div>
                    <Badge variant="outline" className="bg-green-100 text-green-800">
                      Normal Range
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Thermometer className="w-5 h-5 text-blue-600" />
                    <span>Average Temperature</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">98.7°F</div>
                    <Badge variant="outline" className="bg-green-100 text-green-800">
                      Normal Range
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="w-5 h-5 text-green-600" />
                    <span>Activity Level</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">65%</div>
                    <Badge variant="outline" className="bg-blue-100 text-blue-800">
                      Moderate Activity
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Health Trends Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Health Metrics Trends</CardTitle>
                <CardDescription>24-hour health monitoring data from all connected devices</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={healthMetrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="heartRate" stroke="#c53030" strokeWidth={2} name="Heart Rate" />
                    <Line type="monotone" dataKey="temperature" stroke="#3182ce" strokeWidth={2} name="Temperature" />
                    <Line type="monotone" dataKey="activity" stroke="#38a169" strokeWidth={2} name="Activity Level" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* System Status Tab */}
          <TabsContent value="system-status" className="space-y-6">
            {/* System Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {systemMetrics.map((metric, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{metric.name}</span>
                        <span className={`text-sm font-semibold ${getStatusColor(metric.status)}`}>
                          {metric.status.toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-2xl font-bold">{metric.value}%</span>
                          {metric.status === 'optimal' ? (
                            <CheckCircle className="w-6 h-6 text-green-600" />
                          ) : metric.status === 'warning' ? (
                            <AlertTriangle className="w-6 h-6 text-orange-600" />
                          ) : (
                            <XCircle className="w-6 h-6 text-red-600" />
                          )}
                        </div>
                        <Progress value={metric.value} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* System Health */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Server Performance</CardTitle>
                  <CardDescription>Real-time server metrics and performance indicators</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>CPU Usage</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={45} className="w-24 h-2" />
                        <span className="text-sm">45%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Memory Usage</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={67} className="w-24 h-2" />
                        <span className="text-sm">67%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Network I/O</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={23} className="w-24 h-2" />
                        <span className="text-sm">23%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Disk Usage</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={78} className="w-24 h-2" />
                        <span className="text-sm">78%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Logs</CardTitle>
                  <CardDescription>Recent system events and alerts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {[
                      { time: '14:32', level: 'info', message: 'AI model training completed successfully' },
                      { time: '14:28', level: 'warning', message: 'High memory usage detected on server-02' },
                      { time: '14:25', level: 'error', message: 'Failed to connect to IoT device DEV-003' },
                      { time: '14:20', level: 'info', message: 'Database backup completed' },
                      { time: '14:15', level: 'warning', message: 'Anomaly detection threshold exceeded' },
                    ].map((log, index) => (
                      <div key={index} className="flex items-start space-x-3 p-2 rounded text-sm">
                        <span className="text-muted-foreground min-w-12">{log.time}</span>
                        <Badge 
                          variant={log.level === 'error' ? 'destructive' : log.level === 'warning' ? 'secondary' : 'outline'}
                          className="min-w-16 justify-center"
                        >
                          {log.level}
                        </Badge>
                        <span className="flex-1">{log.message}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}