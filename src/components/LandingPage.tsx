import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import logoImage from 'figma:asset/d523c28324cd629ececcf264dd1b037642c2bd36.png';

import { 
  Users, 
  Shield, 
  Settings, 
  Home,
  AlertTriangle, 
  CreditCard,
  Building
} from 'lucide-react';

interface LandingPageProps {
  onRoleSelect: (role: 'tourist' | 'police' | 'admin' | 'emergency' | 'register' | 'agency') => void;
  userPreferences?: {
    reducedMotion: boolean;
    highContrast: boolean;
    largeText: boolean;
  };
  onUpdatePreference?: (key: 'reducedMotion' | 'highContrast' | 'largeText', value: boolean) => void;
}

export function LandingPage({ 
  onRoleSelect, 
  userPreferences = { reducedMotion: false, highContrast: false, largeText: false },
  onUpdatePreference 
}: LandingPageProps) {


  
  return (
    <div className="min-h-screen">
      {/* Minimal Dark Navigation Bar */}
      <nav className="w-full bg-gray-900/95 backdrop-blur-lg border-b border-gray-700/50 sticky top-0 z-50 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Brand - Left Side */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-14 h-14">
                <img 
                  src={logoImage} 
                  alt="Dhruvian Logo" 
                  className="w-12 h-12 object-contain rounded-[10px] mt-[0px] mr-[0px] mb-[0px] ml-[30px]"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white tracking-tight">Dhruvian</h1>
                <p className="text-xs text-gray-300">Smart Tourist Safety</p>
              </div>
            </div>

            {/* Emergency Button - Right Side */}
            <div className="flex items-center">
              <Button 
                onClick={() => onRoleSelect('emergency')}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold shadow-lg border border-red-500/30 px-4 py-2 rounded-md transition-all animate-pulse"
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">EMERGENCY</span>
                <span className="sm:hidden">SOS</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16 bg-black/40 backdrop-blur-lg rounded-3xl p-12 border border-white/10 shadow-2xl">
          <h2 className="text-5xl font-bold text-white drop-shadow-xl mb-6 tracking-tight">
            Smart Tourist Safety
            <span className="block text-blue-300 drop-shadow-lg">Monitoring System</span>
          </h2>
          <p className="text-xl text-white/90 drop-shadow-lg max-w-3xl mx-auto font-medium leading-relaxed">
            Advanced AI-powered safety monitoring and incident response system designed to protect tourists 
            and assist law enforcement with real-time analytics and emergency response capabilities.
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-300">24/7</div>
              <div className="text-sm text-white/80">Monitoring</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold text-green-300">95%</div>
              <div className="text-sm text-white/80">Response Rate</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold text-yellow-300">2min</div>
              <div className="text-sm text-white/80">Avg Response</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold text-red-300">12</div>
              <div className="text-sm text-white/80">Languages</div>
            </div>
          </div>
        </div>

        {/* Role Selection Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {/* Tourist Card */}
          <Card className={`group cursor-pointer transition-all duration-300 hover:shadow-2xl ${
            userPreferences.reducedMotion ? '' : 'hover:scale-105'
          } border-2 hover:border-blue-400 bg-black/60 backdrop-blur-lg text-white border-white/20`}>
            <CardHeader className="text-center">
              <div className={`w-20 h-20 mx-auto mb-4 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center group-hover:bg-blue-500 transition-colors ${
                userPreferences.reducedMotion ? '' : 'group-hover:animate-pulse'
              }`}>
                <Users className="w-10 h-10 text-blue-600 group-hover:text-white" />
              </div>
              <CardTitle className="text-2xl text-blue-300 font-bold">Tourist</CardTitle>
              <CardDescription className="text-lg text-white/85">
                Access your digital ID, safety monitoring, and emergency services
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <ul className="text-sm text-white/80 mb-6 space-y-2 font-medium">
                <li>• Digital ID & QR Code</li>
                <li>• Real-time Safety Score</li>
                <li>• Emergency Panic Button</li>
                <li>• Location Monitoring</li>
                <li>• Multi-language Support</li>
              </ul>
              <Button 
                onClick={() => onRoleSelect('tourist')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                size="lg"
              >
                Enter as Tourist
              </Button>
            </CardContent>
          </Card>

          {/* Digital ID Registration Card */}
          <Card className={`group cursor-pointer transition-all duration-300 hover:shadow-2xl ${
            userPreferences.reducedMotion ? '' : 'hover:scale-105'
          } border-2 hover:border-green-400 bg-black/60 backdrop-blur-lg text-white border-white/20`}>
            <CardHeader className="text-center">
              <div className={`w-20 h-20 mx-auto mb-4 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center group-hover:bg-green-500 transition-colors ${
                userPreferences.reducedMotion ? '' : 'group-hover:animate-pulse'
              }`}>
                <CreditCard className="w-10 h-10 text-green-600 group-hover:text-white" />
              </div>
              <CardTitle className="text-2xl text-[rgba(47,74,248,1)] font-bold">Register Digital ID</CardTitle>
              <CardDescription className="text-lg text-white/85">
                Create your secure, blockchain-verified digital tourist identity
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <ul className="text-sm text-white/80 mb-6 space-y-2 font-medium">
                <li>• KYC Document Upload</li>
                <li>• Biometric Verification</li>
                <li>• Blockchain Security</li>
                <li>• QR Code Generation</li>
                <li>• Emergency Contacts</li>
              </ul>
              <Button 
                onClick={() => onRoleSelect('register')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                size="lg"
              >
                Start Registration
              </Button>
            </CardContent>
          </Card>

          {/* Police Card */}
          <Card className={`group cursor-pointer transition-all duration-300 hover:shadow-2xl ${
            userPreferences.reducedMotion ? '' : 'hover:scale-105'
          } border-2 hover:border-red-400 bg-black/60 backdrop-blur-lg text-white border-white/20`}>
            <CardHeader className="text-center">
              <div className={`w-20 h-20 mx-auto mb-4 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center group-hover:bg-red-500 transition-colors ${
                userPreferences.reducedMotion ? '' : 'group-hover:animate-pulse'
              }`}>
                <Shield className="w-10 h-10 text-red-600 group-hover:text-white" />
              </div>
              <CardTitle className="text-2xl text-red-300 font-bold">Police/Authority</CardTitle>
              <CardDescription className="text-lg text-white/85">
                Monitor tourist safety and respond to incidents in real-time
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <ul className="text-sm text-white/80 mb-6 space-y-2 font-medium">
                <li>• Real-time Tourist Monitoring</li>
                <li>• Incident Response Dashboard</li>
                <li>• E-FIR Generation</li>
                <li>• Heat Map Visualization</li>
                <li>• Emergency Alert System</li>
              </ul>
              <Button 
                onClick={() => onRoleSelect('police')}
                className="w-full bg-red-600 hover:bg-red-700 text-white"
                size="lg"
              >
                Enter as Police
              </Button>
            </CardContent>
          </Card>

          {/* Agency Card */}
          <Card className={`group cursor-pointer transition-all duration-300 hover:shadow-2xl ${
            userPreferences.reducedMotion ? '' : 'hover:scale-105'
          } border-2 hover:border-purple-400 bg-black/60 backdrop-blur-lg text-white border-white/20`}>
            <CardHeader className="text-center">
              <div className={`w-20 h-20 mx-auto mb-4 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center group-hover:bg-purple-500 transition-colors ${
                userPreferences.reducedMotion ? '' : 'group-hover:animate-pulse'
              }`}>
                <Building className="w-10 h-10 text-purple-600 group-hover:text-white" />
              </div>
              <CardTitle className="text-2xl text-purple-300 font-bold">Agency</CardTitle>
              <CardDescription className="text-lg text-white/85">
                Manage travelers, safe routes, and targeted alert notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <ul className="text-sm text-white/80 mb-6 space-y-2 font-medium">
                <li>• Interactive Safe Route Maps</li>
                <li>• Traveler Profile Management</li>
                <li>• Real-time Alert System</li>
                <li>• Agency Group Monitoring</li>
                <li>• Risk Assessment Tools</li>
              </ul>
              <Button 
                onClick={() => onRoleSelect('agency')}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                size="lg"
              >
                Enter as Agency
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Additional Role - Admin */}
        <div className="flex justify-center mt-8">
          <Card className={`w-full max-w-md cursor-pointer transition-all duration-300 hover:shadow-2xl ${
            userPreferences.reducedMotion ? '' : 'hover:scale-105'
          } border-2 hover:border-orange-400 bg-black/60 backdrop-blur-lg text-white border-white/20 group`}>
            <CardHeader className="text-center">
              <div className={`w-20 h-20 mx-auto mb-4 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center group-hover:bg-orange-500 transition-colors ${
                userPreferences.reducedMotion ? '' : 'group-hover:animate-pulse'
              }`}>
                <Settings className="w-10 h-10 text-orange-600 group-hover:text-white" />
              </div>
              <CardTitle className="text-2xl text-orange-300 font-bold">Administrator</CardTitle>
              <CardDescription className="text-lg text-white/85">
                Manage system analytics, AI monitoring, and IoT devices
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <ul className="text-sm text-white/80 mb-6 space-y-2 font-medium">
                <li>• AI Anomaly Detection</li>
                <li>• IoT Device Management</li>
                <li>• System Analytics</li>
                <li>• Predictive Risk Assessment</li>
                <li>• Health Monitoring</li>
              </ul>
              <Button 
                onClick={() => onRoleSelect('admin')}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                size="lg"
              >
                Enter as Admin
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mt-20 text-center bg-black/40 backdrop-blur-lg rounded-3xl p-12 border border-white/10 shadow-2xl">
          <h3 className="text-3xl font-bold text-white drop-shadow-xl mb-8 tracking-tight">
            Key System Features
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-black/50 backdrop-blur-lg p-6 rounded-lg shadow-xl border border-white/10 hover:border-blue-400/50 transition-colors">
              <div className="w-12 h-12 bg-blue-500 rounded-lg mx-auto mb-4 flex items-center justify-center shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-bold mb-2 text-white">Real-time Monitoring</h4>
              <p className="text-sm text-white/80">24/7 tourist location and safety tracking with AI-powered insights</p>
            </div>
            <div className="bg-black/50 backdrop-blur-lg p-6 rounded-lg shadow-xl border border-white/10 hover:border-red-400/50 transition-colors">
              <div className="w-12 h-12 bg-red-500 rounded-lg mx-auto mb-4 flex items-center justify-center shadow-lg">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-bold mb-2 text-white">Emergency Response</h4>
              <p className="text-sm text-white/80">Instant alert system and coordinated emergency response</p>
            </div>
            <div className="bg-black/50 backdrop-blur-lg p-6 rounded-lg shadow-xl border border-white/10 hover:border-green-400/50 transition-colors">
              <div className="w-12 h-12 bg-green-500 rounded-lg mx-auto mb-4 flex items-center justify-center shadow-lg">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-bold mb-2 text-white">AI Analytics</h4>
              <p className="text-sm text-white/80">Predictive risk assessment and intelligent anomaly detection</p>
            </div>
            <div className="bg-black/50 backdrop-blur-lg p-6 rounded-lg shadow-xl border border-white/10 hover:border-orange-400/50 transition-colors">
              <div className="w-12 h-12 bg-orange-500 rounded-lg mx-auto mb-4 flex items-center justify-center shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-bold mb-2 text-white">Multi-stakeholder</h4>
              <p className="text-sm text-white/80">Unified platform connecting tourists, police, and administrators</p>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-16 text-center">
          <div className="bg-blue-600/20 backdrop-blur-sm rounded-lg p-6 border border-blue-400/30">
            <h4 className="text-lg font-semibold text-white mb-2">Need Help?</h4>
            <p className="text-white/80 text-sm mb-4">
              Press <kbd className="bg-white/20 px-2 py-1 rounded text-xs">ESC</kbd> to go back, 
              or look for the AI Assistant in any dashboard for help and guidance.
            </p>
            <div className="flex justify-center space-x-4 text-sm text-white/70">
              <span>🌍 Available in 12 languages</span>
              <span>♿ Accessibility features enabled</span>
              <span>📱 Mobile-optimized interface</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}