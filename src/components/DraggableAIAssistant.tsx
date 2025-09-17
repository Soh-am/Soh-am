import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { 
  Bot, 
  X, 
  MessageCircle, 
  HelpCircle, 
  Shield, 
  MapPin, 
  AlertTriangle, 
  Users, 
  BarChart3,
  Smartphone,
  ChevronRight,
  Lightbulb,
  Navigation,
  ArrowLeft,
  Move
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type UserRole = 'tourist' | 'police' | 'admin' | 'emergency' | 'register' | 'map' | 'analytics' | 'mobile' | null;

interface DraggableAIAssistantProps {
  currentRole: UserRole;
  onBack?: () => void;
}

interface HelpContent {
  title: string;
  description: string;
  tips: string[];
  quickActions: Array<{
    label: string;
    icon: React.ReactNode;
    description: string;
  }>;
}

interface Position {
  x: number;
  y: number;
}

const getHelpContent = (role: UserRole): HelpContent => {
  switch (role) {
    case null:
      return {
        title: "Welcome to Tourist Safety System",
        description: "Your comprehensive safety monitoring platform for secure travel experiences.",
        tips: [
          "Select your role to access specialized dashboard features",
          "Emergency button is always available for instant help",
          "All data is encrypted and securely stored",
          "System works offline in emergency situations"
        ],
        quickActions: [
          { label: "Tourist Dashboard", icon: <Users className="w-4 h-4" />, description: "Access safety features, emergency contacts, and location tracking" },
          { label: "Police Operations", icon: <Shield className="w-4 h-4" />, description: "Monitor incidents, respond to emergencies, and coordinate resources" },
          { label: "Admin Control", icon: <BarChart3 className="w-4 h-4" />, description: "System management, analytics, and user administration" }
        ]
      };
    
    case 'tourist':
      return {
        title: "Tourist Safety Dashboard",
        description: "Your personal safety companion with real-time monitoring and emergency features.",
        tips: [
          "Keep location services enabled for emergency response",
          "Register your digital ID for faster emergency identification",
          "Use the panic button for immediate assistance",
          "Check safety zones on the interactive map before traveling"
        ],
        quickActions: [
          { label: "Emergency Help", icon: <AlertTriangle className="w-4 h-4" />, description: "Instant access to emergency services and panic button" },
          { label: "Digital ID", icon: <Users className="w-4 h-4" />, description: "Register and manage your digital identification" },
          { label: "Safety Map", icon: <MapPin className="w-4 h-4" />, description: "View safe zones, incidents, and real-time locations" }
        ]
      };
    
    case 'police':
      return {
        title: "Police Operations Center",
        description: "Monitor incidents, coordinate responses, and ensure public safety across the region.",
        tips: [
          "Monitor real-time incident feeds for immediate response",
          "Use AI anomaly detection to identify potential threats",
          "Coordinate with other agencies through the communication hub",
          "Track response times and optimize patrol routes"
        ],
        quickActions: [
          { label: "Incident Monitor", icon: <AlertTriangle className="w-4 h-4" />, description: "Real-time incident tracking and response coordination" },
          { label: "Live Map", icon: <MapPin className="w-4 h-4" />, description: "Officer locations, patrol routes, and incident zones" },
          { label: "Analytics", icon: <BarChart3 className="w-4 h-4" />, description: "Crime statistics and response performance metrics" }
        ]
      };
    
    case 'admin':
      return {
        title: "System Administration",
        description: "Comprehensive control over the tourist safety monitoring ecosystem.",
        tips: [
          "Monitor system health and performance metrics",
          "Manage user permissions and access controls",
          "Configure AI detection algorithms and thresholds",
          "Generate compliance reports for regulatory requirements"
        ],
        quickActions: [
          { label: "User Management", icon: <Users className="w-4 h-4" />, description: "Control user access, roles, and permissions" },
          { label: "System Analytics", icon: <BarChart3 className="w-4 h-4" />, description: "Performance metrics and system health monitoring" },
          { label: "IoT Devices", icon: <Shield className="w-4 h-4" />, description: "Manage cameras, sensors, and monitoring equipment" }
        ]
      };
    
    case 'emergency':
      return {
        title: "Emergency Response Mode",
        description: "Critical emergency interface for immediate assistance and response coordination.",
        tips: [
          "Your location is being shared with emergency services",
          "Stay calm and follow the on-screen instructions",
          "Keep your device charged and accessible",
          "Provide accurate information to responders"
        ],
        quickActions: [
          { label: "Contact Help", icon: <AlertTriangle className="w-4 h-4" />, description: "Direct communication with emergency responders" },
          { label: "Share Location", icon: <MapPin className="w-4 h-4" />, description: "Continuous location sharing for faster response" },
          { label: "Medical Info", icon: <Users className="w-4 h-4" />, description: "Share critical medical information with responders" }
        ]
      };
    
    case 'map':
      return {
        title: "Interactive Safety Map",
        description: "Real-time geographical view of safety zones, incidents, and monitoring points.",
        tips: [
          "Use layers to filter different types of information",
          "Click on markers for detailed incident information",
          "Enable location sharing for personalized safety recommendations",
          "Report new incidents directly from the map interface"
        ],
        quickActions: [
          { label: "Safety Zones", icon: <Shield className="w-4 h-4" />, description: "View and navigate to designated safe areas" },
          { label: "Live Tracking", icon: <Navigation className="w-4 h-4" />, description: "Real-time location monitoring and updates" },
          { label: "Report Incident", icon: <AlertTriangle className="w-4 h-4" />, description: "Submit new safety incidents or concerns" }
        ]
      };
    
    default:
      return {
        title: "AI Assistant Ready",
        description: "I'm here to help you navigate and use the safety monitoring system effectively.",
        tips: [
          "Ask me questions about any feature or function",
          "I can guide you through emergency procedures",
          "Get help with registration and setup processes",
          "Learn about safety best practices for travelers"
        ],
        quickActions: [
          { label: "Getting Started", icon: <Lightbulb className="w-4 h-4" />, description: "Basic introduction to system features" },
          { label: "Emergency Guide", icon: <AlertTriangle className="w-4 h-4" />, description: "What to do in emergency situations" },
          { label: "FAQ", icon: <HelpCircle className="w-4 h-4" />, description: "Frequently asked questions and answers" }
        ]
      };
  }
};

export function DraggableAIAssistant({ currentRole, onBack }: DraggableAIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });
  const [messages, setMessages] = useState<Array<{ type: 'user' | 'ai'; content: string; timestamp: Date }>>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const helpContent = getHelpContent(currentRole);

  // Initialize position from localStorage or set to bottom-right
  useEffect(() => {
    const savedPosition = localStorage.getItem('ai-assistant-position');
    if (savedPosition) {
      try {
        setPosition(JSON.parse(savedPosition));
      } catch {
        // Default to bottom-right corner
        setPosition({ x: window.innerWidth - 400, y: window.innerHeight - 600 });
      }
    } else {
      setPosition({ x: window.innerWidth - 400, y: window.innerHeight - 600 });
    }
  }, []);

  // Save position to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('ai-assistant-position', JSON.stringify(position));
  }, [position]);

  // Snap to corners function
  const snapToCorner = (currentPosition: Position) => {
    const { innerWidth: windowWidth, innerHeight: windowHeight } = window;
    const threshold = 100; // Distance from edge to snap
    const containerWidth = isOpen ? 400 : 60;
    const containerHeight = isOpen ? 600 : 60;

    let newX = currentPosition.x;
    let newY = currentPosition.y;

    // Snap to left or right edge
    if (currentPosition.x < threshold) {
      newX = 20; // Left edge with padding
    } else if (currentPosition.x > windowWidth - containerWidth - threshold) {
      newX = windowWidth - containerWidth - 20; // Right edge with padding
    }

    // Snap to top or bottom edge
    if (currentPosition.y < threshold) {
      newY = 20; // Top edge with padding
    } else if (currentPosition.y > windowHeight - containerHeight - threshold) {
      newY = windowHeight - containerHeight - 20; // Bottom edge with padding
    }

    return { x: newX, y: newY };
  };

  // Handle mouse down on the draggable element
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  // Handle mouse move for dragging
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const newPosition = {
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        };
        
        // Constrain to window bounds
        const constrainedPosition = {
          x: Math.max(0, Math.min(newPosition.x, window.innerWidth - (isOpen ? 400 : 60))),
          y: Math.max(0, Math.min(newPosition.y, window.innerHeight - (isOpen ? 600 : 60)))
        };
        
        setPosition(constrainedPosition);
      }
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        // Snap to corner when drag ends
        setPosition(currentPos => snapToCorner(currentPos));
      }
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, isOpen]);

  // Auto-show help for new users or role changes
  useEffect(() => {
    if (currentRole && !isOpen) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        addAIMessage(`Welcome to the ${helpContent.title}! I'm here to help you get started.`);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentRole]);

  const addAIMessage = (content: string) => {
    setMessages(prev => [...prev, {
      type: 'ai',
      content,
      timestamp: new Date()
    }]);
  };

  const addUserMessage = (content: string) => {
    setMessages(prev => [...prev, {
      type: 'user',
      content,
      timestamp: new Date()
    }]);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsMinimized(false);
    setMessages([]);
    setInputMessage('');
    setIsTyping(false);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    addUserMessage(inputMessage);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I understand you're looking for help with that feature. Let me guide you through the process step by step.",
        "That's a great question! Based on your current dashboard, here's what I recommend...",
        "For safety and security, I suggest following these best practices...",
        "I can help you navigate to the right section. Would you like me to provide specific instructions?",
        "That feature is designed to enhance your safety. Here's how to use it effectively..."
      ];
      addAIMessage(responses[Math.floor(Math.random() * responses.length)]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickAction = (action: string) => {
    addUserMessage(`Help me with: ${action}`);
    setIsTyping(true);
    setTimeout(() => {
      addAIMessage(`I'll help you with ${action}. Here are the key steps and features you should know about...`);
      setIsTyping(false);
    }, 1000);
  };

  if (!isOpen) {
    return (
      <motion.div
        ref={containerRef}
        style={{
          position: 'fixed',
          left: position.x,
          top: position.y,
          zIndex: 50,
          cursor: isDragging ? 'grabbing' : 'grab'
        }}
        onMouseDown={handleMouseDown}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileDrag={{ scale: 1.1 }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-14 h-14 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 shadow-xl border-2 border-blue-400/30 relative"
        >
          <Bot className="w-6 h-6 text-white" />
          {isDragging && (
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
              <Move className="w-2 h-2 text-white" />
            </div>
          )}
        </Button>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-16 right-0 bg-blue-600 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap pointer-events-none"
        >
          AI Assistant
          <div className="absolute top-full right-2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-blue-600"></div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={containerRef}
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        zIndex: 50
      }}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
    >
      <Card className="w-96 h-[32rem] bg-gradient-to-br from-gray-900/95 to-blue-900/95 backdrop-blur-lg border-2 border-blue-400/30 shadow-2xl">
        
        {/* Header with drag handle */}
        <div 
          className="flex items-center justify-between p-4 border-b border-blue-200/30 cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <Bot className="w-6 h-6 text-blue-400" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h3 className="font-semibold text-white">AI Assistant</h3>
              <p className="text-xs text-gray-300">Drag to move • Always ready to help</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {onBack && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="h-8 w-8 p-0 text-gray-300 hover:text-white hover:bg-blue-800/50"
                title="Back to Dashboard"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="h-8 w-8 p-0 text-gray-300 hover:text-white hover:bg-blue-800/50"
              title="Minimize"
            >
              <MessageCircle className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="h-8 w-8 p-0 text-gray-300 hover:text-white hover:bg-red-800/50"
              title="Close Assistant"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {!isMinimized && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="flex flex-col h-full"
            >
              {/* Help Content */}
              <div className="p-4 border-b border-blue-200/30">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    {currentRole || 'Welcome'}
                  </Badge>
                </div>
                <h4 className="font-semibold text-white mb-1">{helpContent.title}</h4>
                <p className="text-sm text-gray-300 mb-3">{helpContent.description}</p>
                
                {/* Quick Actions */}
                <div className="space-y-2">
                  <p className="text-xs font-medium text-white">Quick Actions:</p>
                  {helpContent.quickActions.slice(0, 2).map((action, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickAction(action.label)}
                      className="w-full flex items-center gap-2 p-2 rounded-md bg-blue-900/30 hover:bg-blue-800/50 transition-colors text-left"
                    >
                      {action.icon}
                      <div className="flex-1">
                        <div className="text-sm font-medium text-white">{action.label}</div>
                        <div className="text-xs text-gray-300">{action.description}</div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-3">
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] p-3 rounded-lg ${
                        message.type === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-800 text-gray-100 border border-gray-600'
                      }`}>
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                  
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="bg-gray-800 border border-gray-600 p-3 rounded-lg">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </ScrollArea>

              {/* Chat Input */}
              <div className="p-4 border-t border-blue-200/30">
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask me anything about the system..."
                    className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isTyping}
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Send
                  </Button>
                </div>
                
                {/* Close Assistant Button */}
                <div className="flex justify-center">
                  <Button
                    onClick={handleClose}
                    variant="outline"
                    size="sm"
                    className="text-xs text-gray-300 border-gray-600 hover:bg-red-900/50 hover:text-red-400 hover:border-red-500"
                  >
                    <X className="w-3 h-3 mr-1" />
                    Close Assistant
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}