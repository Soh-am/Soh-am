import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Alert, AlertDescription } from './ui/alert';
import { 
  AlertTriangle, 
  Phone, 
  MapPin, 
  Clock, 
  Shield, 
  Share, 
  Volume2,
  ArrowLeft,
  Navigation,
  Zap,
  CheckCircle,
  Heart,
  Siren
} from 'lucide-react';

interface EmergencyResponseInterfaceProps {
  onBack?: () => void;
  isActive?: boolean;
}

export function EmergencyResponseInterface({ onBack, isActive = false }: EmergencyResponseInterfaceProps) {
  const [emergencyActive, setEmergencyActive] = useState(isActive);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [locationSharing, setLocationSharing] = useState(true);
  const [countdownTime, setCountdownTime] = useState(300); // 5 minutes in seconds
  const [isCountdownActive, setIsCountdownActive] = useState(false);

  // Countdown timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCountdownActive && countdownTime > 0) {
      interval = setInterval(() => {
        setCountdownTime(time => time - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCountdownActive, countdownTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const emergencyContacts = [
    { 
      id: 1,
      name: 'Emergency Police', 
      number: '100', 
      type: 'police',
      icon: Shield,
      description: 'Immediate police assistance'
    },
    { 
      id: 2,
      name: 'Medical Emergency', 
      number: '108', 
      type: 'medical',
      icon: Heart,
      description: 'Ambulance & medical help'
    },
    { 
      id: 3,
      name: 'Tourist Helpline', 
      number: '1363', 
      type: 'tourist',
      icon: Phone,
      description: 'Tourist safety support'
    },
    { 
      id: 4,
      name: 'Local Authority', 
      number: '112', 
      type: 'authority',
      icon: Siren,
      description: 'General emergency services'
    },
  ];

  const emergencyPhrases = {
    en: [
      { phrase: "HELP! Emergency!", pronunciation: "HELP! Emergency!" },
      { phrase: "Call the police!", pronunciation: "Call the police!" },
      { phrase: "I need medical help!", pronunciation: "I need medical help!" },
      { phrase: "Where is the hospital?", pronunciation: "Where is the hospital?" },
      { phrase: "I am lost!", pronunciation: "I am lost!" },
      { phrase: "Please help me!", pronunciation: "Please help me!" }
    ],
    hi: [
      { phrase: "मदद! आपातकाल!", pronunciation: "Madad! Aapatkal!" },
      { phrase: "पुलिस को बुलाओ!", pronunciation: "Police ko bulao!" },
      { phrase: "मुझे डॉक्टर की जरूरत है!", pronunciation: "Mujhe doctor ki zarurat hai!" },
      { phrase: "अस्पताल कहाँ है?", pronunciation: "Aspatal kahan hai?" },
      { phrase: "मैं खो गया हूँ!", pronunciation: "Main kho gaya hun!" },
      { phrase: "कृपया मेरी मदद करें!", pronunciation: "Krupaya meri madad karen!" }
    ],
    es: [
      { phrase: "¡AYUDA! ¡Emergencia!", pronunciation: "AH-yoo-dah! Eh-mer-HEN-see-ah!" },
      { phrase: "¡Llama a la policía!", pronunciation: "YAH-mah ah lah po-lee-SEE-ah!" },
      { phrase: "¡Necesito ayuda médica!", pronunciation: "Neh-seh-SEE-to ah-YOO-dah MEH-dee-kah!" },
      { phrase: "¿Dónde está el hospital?", pronunciation: "DON-deh es-TAH el os-pee-TAHL?" },
      { phrase: "¡Estoy perdido!", pronunciation: "Es-TOY per-DEE-do!" },
      { phrase: "¡Por favor ayúdeme!", pronunciation: "Por fah-VOR ah-YOO-deh-meh!" }
    ],
    fr: [
      { phrase: "AIDE! Urgence!", pronunciation: "EHD! Oor-ZHAHNCE!" },
      { phrase: "Appelez la police!", pronunciation: "Ah-play lah po-LEES!" },
      { phrase: "J'ai besoin d'aide médicale!", pronunciation: "Zhay beh-ZWAHN dehd may-dee-KAHL!" },
      { phrase: "Où est l'hôpital?", pronunciation: "Oo eh loh-pee-TAHL?" },
      { phrase: "Je suis perdu!", pronunciation: "Zhuh swee per-DOO!" },
      { phrase: "Aidez-moi s'il vous plaît!", pronunciation: "Eh-day-MWAH seel voo PLEH!" }
    ]
  };

  const handlePanicButton = () => {
    setEmergencyActive(true);
    setIsCountdownActive(true);
    setCountdownTime(300); // Reset to 5 minutes
    // In a real app, this would trigger emergency protocols
  };

  const handleCallEmergency = (contact: typeof emergencyContacts[0]) => {
    // In a real app, this would initiate a phone call
    console.log(`Calling ${contact.name} at ${contact.number}`);
  };

  const getCurrentLocation = () => {
    // Mock GPS coordinates - in real app would use geolocation API
    return {
      latitude: 28.6139,
      longitude: 77.2090,
      address: "Connaught Place, New Delhi, India",
      accuracy: "±5 meters"
    };
  };

  const location = getCurrentLocation();
  const currentPhrases = emergencyPhrases[selectedLanguage as keyof typeof emergencyPhrases] || emergencyPhrases.en;

  const speakPhrase = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = selectedLanguage === 'hi' ? 'hi-IN' : selectedLanguage === 'es' ? 'es-ES' : selectedLanguage === 'fr' ? 'fr-FR' : 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4">
      {/* High Contrast Emergency Header */}
      <div className="max-w-6xl mx-auto">
        {onBack && (
          <div className="mb-4">
            <Button 
              variant="outline" 
              onClick={onBack}
              className="bg-white text-black border-2 border-white hover:bg-red-600 hover:text-white font-bold text-lg"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Exit Emergency Mode
            </Button>
          </div>
        )}

        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <AlertTriangle className="w-16 h-16 text-red-500 animate-pulse mr-4" />
            <h1 className="text-6xl font-bold text-red-500 tracking-wide">
              EMERGENCY
            </h1>
            <AlertTriangle className="w-16 h-16 text-red-500 animate-pulse ml-4" />
          </div>
          <p className="text-2xl text-yellow-400 font-semibold">
            Emergency Response Interface
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column - Main Emergency Controls */}
          <div className="xl:col-span-2 space-y-8">
            {/* Large Panic Button */}
            <Card className="bg-red-900 border-4 border-red-500">
              <CardContent className="p-12 text-center">
                <Button
                  size="lg"
                  className={`w-64 h-64 rounded-full text-white font-bold text-3xl shadow-2xl ${
                    emergencyActive 
                      ? 'bg-red-700 animate-pulse border-8 border-yellow-400' 
                      : 'bg-red-600 hover:bg-red-500 hover:scale-110 transition-all duration-300'
                  }`}
                  onClick={handlePanicButton}
                  disabled={emergencyActive}
                >
                  <div className="flex flex-col items-center">
                    <AlertTriangle className="w-16 h-16 mb-4" />
                    <span>EMERGENCY</span>
                    <span className="text-xl">ALERT</span>
                  </div>
                </Button>
                
                {emergencyActive && (
                  <div className="mt-8 space-y-4">
                    <Alert className="bg-yellow-600 border-yellow-400 text-black">
                      <Zap className="h-6 w-6" />
                      <AlertDescription className="text-xl font-bold">
                        EMERGENCY ALERT SENT! Help is on the way.
                      </AlertDescription>
                    </Alert>
                    
                    {/* Response Team ETA Countdown */}
                    <div className="bg-green-800 p-6 rounded-lg border-4 border-green-400">
                      <div className="flex items-center justify-center space-x-4">
                        <Clock className="w-8 h-8 text-green-200" />
                        <div className="text-center">
                          <p className="text-2xl font-bold text-green-200">Response Team ETA</p>
                          <p className="text-6xl font-mono text-white">{formatTime(countdownTime)}</p>
                          <p className="text-lg text-green-200">Stay calm and safe</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {!emergencyActive && (
                  <p className="mt-6 text-xl text-red-200">
                    Press for immediate emergency assistance
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Emergency Contact Cards */}
            <Card className="bg-gray-900 border-4 border-blue-400">
              <CardHeader>
                <CardTitle className="text-3xl text-blue-400 flex items-center">
                  <Phone className="w-8 h-8 mr-3" />
                  EMERGENCY CONTACTS
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {emergencyContacts.map((contact) => (
                    <div key={contact.id} className="bg-blue-950 p-6 rounded-lg border-2 border-blue-300">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <contact.icon className="w-8 h-8 text-blue-300" />
                          <div>
                            <h3 className="text-xl font-bold text-white">{contact.name}</h3>
                            <p className="text-blue-200">{contact.description}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-3xl font-mono text-yellow-400 font-bold">
                          {contact.number}
                        </span>
                        <Button
                          size="lg"
                          onClick={() => handleCallEmergency(contact)}
                          className="bg-green-600 hover:bg-green-500 text-white font-bold text-lg px-8 py-4"
                        >
                          <Phone className="w-6 h-6 mr-2" />
                          CALL NOW
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Location & Language Support */}
          <div className="space-y-8">
            {/* GPS Location Display */}
            <Card className="bg-green-900 border-4 border-green-400">
              <CardHeader>
                <CardTitle className="text-2xl text-green-400 flex items-center">
                  <MapPin className="w-6 h-6 mr-2" />
                  YOUR LOCATION
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-green-950 p-4 rounded-lg">
                  <p className="text-lg font-bold text-white mb-2">{location.address}</p>
                  <div className="text-green-200 space-y-1">
                    <p>📍 Lat: {location.latitude}°</p>
                    <p>📍 Lng: {location.longitude}°</p>
                    <p>🎯 Accuracy: {location.accuracy}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between bg-blue-950 p-4 rounded-lg">
                  <div>
                    <Label htmlFor="location-sharing" className="text-lg text-blue-200">
                      Auto-Share Location
                    </Label>
                    <p className="text-sm text-blue-300">
                      Automatically share with emergency services
                    </p>
                  </div>
                  <Switch
                    id="location-sharing"
                    checked={locationSharing}
                    onCheckedChange={setLocationSharing}
                    className="scale-125"
                  />
                </div>
                
                {locationSharing && (
                  <Badge className="w-full justify-center bg-green-600 text-white text-lg py-2">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Location Sharing Active
                  </Badge>
                )}
                
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg py-4"
                  onClick={() => console.log('Sharing location manually')}
                >
                  <Share className="w-5 h-5 mr-2" />
                  SHARE LOCATION NOW
                </Button>
              </CardContent>
            </Card>

            {/* Multilingual Emergency Phrases */}
            <Card className="bg-purple-900 border-4 border-purple-400">
              <CardHeader>
                <CardTitle className="text-2xl text-purple-400 flex items-center">
                  <Volume2 className="w-6 h-6 mr-2" />
                  EMERGENCY PHRASES
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger className="bg-purple-950 border-2 border-purple-300 text-white text-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">🇺🇸 English</SelectItem>
                    <SelectItem value="hi">🇮🇳 हिंदी (Hindi)</SelectItem>
                    <SelectItem value="es">🇪🇸 Español</SelectItem>
                    <SelectItem value="fr">🇫🇷 Français</SelectItem>
                  </SelectContent>
                </Select>
                
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {currentPhrases.map((item, index) => (
                    <div key={index} className="bg-purple-950 p-4 rounded-lg border border-purple-300">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-white font-bold text-lg mb-1">{item.phrase}</p>
                          <p className="text-purple-200 text-sm">{item.pronunciation}</p>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => speakPhrase(item.phrase)}
                          className="bg-yellow-600 hover:bg-yellow-500 text-black font-bold ml-2"
                        >
                          <Volume2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Emergency Status */}
            {emergencyActive && (
              <Card className="bg-yellow-600 border-4 border-yellow-400 text-black">
                <CardContent className="p-6 text-center">
                  <AlertTriangle className="w-12 h-12 mx-auto mb-4 animate-bounce" />
                  <h3 className="text-2xl font-bold mb-2">EMERGENCY ACTIVE</h3>
                  <p className="text-lg">
                    Your emergency alert has been sent to local authorities.
                    Stay calm and safe. Help is on the way.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}