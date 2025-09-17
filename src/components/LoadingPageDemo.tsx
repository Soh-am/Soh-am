import React, { useState } from 'react';
import { LoadingPage } from './LoadingPage';
import { Button } from './ui/button';
import { RotateCcw, Shield } from 'lucide-react';

export function LoadingPageDemo() {
  const [showLoading, setShowLoading] = useState(false);
  const [loadingVariant, setLoadingVariant] = useState<'default' | 'quick' | 'custom'>('default');

  const handleShowLoading = (variant: 'default' | 'quick' | 'custom') => {
    setLoadingVariant(variant);
    setShowLoading(true);
  };

  const getLoadingProps = () => {
    switch (loadingVariant) {
      case 'quick':
        return {
          duration: 2000,
          loadingText: "Quick security check..."
        };
      case 'custom':
        return {
          duration: 4000,
          loadingText: "Comprehensive safety scan..."
        };
      default:
        return {
          duration: 3000,
          loadingText: "Securing your journey..."
        };
    }
  };

  if (showLoading) {
    return (
      <LoadingPage 
        {...getLoadingProps()}
        onComplete={() => setShowLoading(false)}
      />
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-blue-900 to-green-800">
      <div className="max-w-md w-full space-y-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
        <div className="text-center space-y-4">
          <div className="p-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 w-fit mx-auto">
            <Shield size={40} className="text-white" />
          </div>
          
          <h1 className="text-3xl text-white">
            Loading Page Demo
          </h1>
          
          <p className="text-white/80">
            Try different loading animations for the Tourist Safety System
          </p>
        </div>

        <div className="space-y-4">
          <Button
            onClick={() => handleShowLoading('default')}
            className="w-full bg-blue-600/80 hover:bg-blue-600 text-white border border-blue-400/50 backdrop-blur-sm"
            size="lg"
          >
            Default Loading (3s)
          </Button>
          
          <Button
            onClick={() => handleShowLoading('quick')}
            className="w-full bg-green-600/80 hover:bg-green-600 text-white border border-green-400/50 backdrop-blur-sm"
            size="lg"
          >
            Quick Loading (2s)
          </Button>
          
          <Button
            onClick={() => handleShowLoading('custom')}
            className="w-full bg-orange-600/80 hover:bg-orange-600 text-white border border-orange-400/50 backdrop-blur-sm"
            size="lg"
          >
            Extended Loading (4s)
          </Button>
        </div>

        <div className="p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg">
          <h3 className="text-white mb-2">Features:</h3>
          <ul className="text-white/80 text-sm space-y-1">
            <li>• Animated shield icons</li>
            <li>• Rotating safety symbols</li>
            <li>• Progress indicators</li>
            <li>• Travel-themed elements</li>
            <li>• Smooth animations</li>
            <li>• Professional aesthetic</li>
          </ul>
        </div>
      </div>
    </div>
  );
}