import React, { useState, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Alert, AlertDescription } from './ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { 
  Upload, 
  Camera, 
  Shield, 
  CheckCircle, 
  Clock, 
  QrCode,
  User,
  FileText,
  MapPin,
  Phone,
  Calendar as CalendarIcon,
  AlertTriangle,
  Verified,
  Lock,
  Eye,
  RefreshCw,
  Download,
  ArrowLeft,
  Globe,
  CreditCard,
  Fingerprint,
  Zap
} from 'lucide-react';
// Mock date formatting function since date-fns might not be available
const format = (date: Date, formatStr: string) => {
  if (formatStr === 'PPP') {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }
  return date.toLocaleDateString();
};

interface DigitalIDRegistrationProps {
  onBack?: () => void;
  onComplete?: (data: any) => void;
}

export function DigitalIDRegistration({ onBack, onComplete }: DigitalIDRegistrationProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    dateOfBirth: undefined as Date | undefined,
    nationality: '',
    gender: '',
    
    // KYC Documents
    passportFile: null as File | null,
    aadhaarFile: null as File | null,
    profilePhoto: null as File | null,
    
    // Trip Details
    destination: '',
    arrivalDate: undefined as Date | undefined,
    departureDate: undefined as Date | undefined,
    accommodation: '',
    purpose: '',
    itinerary: '',
    
    // Emergency Contacts
    emergencyContacts: [
      { name: '', relation: '', phone: '', email: '', address: '' },
      { name: '', relation: '', phone: '', email: '', address: '' }
    ]
  });

  const [verificationStatus, setVerificationStatus] = useState({
    documents: 'pending',
    biometric: 'pending',
    blockchain: 'pending',
    qrCode: 'pending'
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [qrCodeData, setQrCodeData] = useState('');
  const [validityPeriod, setValidityPeriod] = useState(30); // days

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLVideoElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const steps = [
    { id: 1, title: 'Personal Info', icon: User },
    { id: 2, title: 'KYC Documents', icon: FileText },
    { id: 3, title: 'Trip Details', icon: MapPin },
    { id: 4, title: 'Emergency Contacts', icon: Phone },
    { id: 5, title: 'Verification', icon: Shield }
  ];

  const handleFileUpload = (field: string, file: File) => {
    setFormData(prev => ({ ...prev, [field]: file }));
    // Simulate upload progress
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (cameraRef.current) {
        cameraRef.current.srcObject = stream;
        setIsCameraActive(true);
      }
    } catch (error) {
      console.error('Camera access denied:', error);
    }
  }, []);

  const capturePhoto = useCallback(() => {
    if (cameraRef.current) {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = cameraRef.current.videoWidth;
      canvas.height = cameraRef.current.videoHeight;
      
      if (context) {
        context.drawImage(cameraRef.current, 0, 0);
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], 'profile-photo.jpg', { type: 'image/jpeg' });
            handleFileUpload('profilePhoto', file);
          }
        });
      }
      
      // Stop camera
      const stream = cameraRef.current.srcObject as MediaStream;
      stream?.getTracks().forEach(track => track.stop());
      setIsCameraActive(false);
    }
  }, []);

  const simulateVerification = () => {
    setIsProcessing(true);
    
    // Simulate verification process
    const verificationSteps = ['documents', 'biometric', 'blockchain', 'qrCode'];
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      if (currentIndex < verificationSteps.length) {
        setVerificationStatus(prev => ({
          ...prev,
          [verificationSteps[currentIndex]]: 'verified'
        }));
        currentIndex++;
      } else {
        clearInterval(interval);
        setIsProcessing(false);
        // Generate QR code data
        setQrCodeData(`TOURIST_ID_${Date.now()}`);
      }
    }, 1500);
  };

  const calculateCompletionPercentage = () => {
    const fields = [
      formData.firstName,
      formData.lastName,
      formData.dateOfBirth,
      formData.nationality,
      formData.passportFile,
      formData.profilePhoto,
      formData.destination,
      formData.arrivalDate,
      formData.emergencyContacts[0].name
    ];
    
    const completedFields = fields.filter(field => field).length;
    return Math.round((completedFields / fields.length) * 100);
  };

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
            placeholder="Enter your first name"
          />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
            placeholder="Enter your last name"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Date of Birth</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.dateOfBirth ? format(formData.dateOfBirth, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={formData.dateOfBirth}
                onSelect={(date) => setFormData(prev => ({ ...prev, dateOfBirth: date }))}
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div>
          <Label htmlFor="nationality">Nationality</Label>
          <Select onValueChange={(value) => setFormData(prev => ({ ...prev, nationality: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Select nationality" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="indian">Indian</SelectItem>
              <SelectItem value="us">United States</SelectItem>
              <SelectItem value="uk">United Kingdom</SelectItem>
              <SelectItem value="canada">Canada</SelectItem>
              <SelectItem value="australia">Australia</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="gender">Gender</Label>
        <Select onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}>
          <SelectTrigger>
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="other">Other</SelectItem>
            <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const renderKYCDocuments = () => (
    <div className="space-y-6">
      {/* Document Upload Areas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Passport Upload */}
        <Card className="border-2 border-dashed border-blue-300 hover:border-blue-500 transition-colors">
          <CardContent className="p-6 text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 bg-blue-100 rounded-full">
                <CreditCard className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-800">Passport</h3>
                <p className="text-sm text-muted-foreground">Upload clear image of passport</p>
              </div>
              {formData.passportFile ? (
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-green-600">{formData.passportFile.name}</span>
                </div>
              ) : (
                <Button 
                  variant="outline"
                  onClick={() => {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = 'image/*,.pdf';
                    input.onchange = (e) => {
                      const file = (e.target as HTMLInputElement).files?.[0];
                      if (file) handleFileUpload('passportFile', file);
                    };
                    input.click();
                  }}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Passport
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Aadhaar Upload */}
        <Card className="border-2 border-dashed border-orange-300 hover:border-orange-500 transition-colors">
          <CardContent className="p-6 text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 bg-orange-100 rounded-full">
                <Fingerprint className="w-8 h-8 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold text-orange-800">Aadhaar Card</h3>
                <p className="text-sm text-muted-foreground">Upload Aadhaar card (front & back)</p>
              </div>
              {formData.aadhaarFile ? (
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-green-600">{formData.aadhaarFile.name}</span>
                </div>
              ) : (
                <Button 
                  variant="outline"
                  onClick={() => {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = 'image/*,.pdf';
                    input.onchange = (e) => {
                      const file = (e.target as HTMLInputElement).files?.[0];
                      if (file) handleFileUpload('aadhaarFile', file);
                    };
                    input.click();
                  }}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Aadhaar
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Photo Capture Interface */}
      <Card className="border-2 border-green-300">
        <CardHeader>
          <CardTitle className="text-green-800 flex items-center">
            <Camera className="w-5 h-5 mr-2" />
            Profile Photo
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!isCameraActive ? (
            <div className="text-center space-y-4">
              {formData.profilePhoto ? (
                <div className="flex items-center justify-center space-x-4">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="text-green-600">Photo captured successfully</span>
                  <Button variant="outline" onClick={startCamera}>
                    <Camera className="w-4 h-4 mr-2" />
                    Retake Photo
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-muted-foreground">Take a clear photo for your digital ID</p>
                  <Button onClick={startCamera} className="bg-green-600 hover:bg-green-700">
                    <Camera className="w-4 h-4 mr-2" />
                    Start Camera
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <video 
                ref={cameraRef}
                autoPlay
                className="w-full max-w-md mx-auto rounded-lg"
              />
              <div className="flex justify-center space-x-4">
                <Button onClick={capturePhoto} className="bg-green-600 hover:bg-green-700">
                  <Camera className="w-4 h-4 mr-2" />
                  Capture Photo
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    const stream = cameraRef.current?.srcObject as MediaStream;
                    stream?.getTracks().forEach(track => track.stop());
                    setIsCameraActive(false);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Upload Progress */}
      {uploadProgress > 0 && uploadProgress < 100 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <RefreshCw className="w-5 h-5 animate-spin text-blue-600" />
              <div className="flex-1">
                <p className="text-sm font-medium">Uploading document...</p>
                <Progress value={uploadProgress} className="mt-2" />
              </div>
              <span className="text-sm text-muted-foreground">{uploadProgress}%</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderTripDetails = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="destination">Destination</Label>
          <Input
            id="destination"
            value={formData.destination}
            onChange={(e) => setFormData(prev => ({ ...prev, destination: e.target.value }))}
            placeholder="e.g., New Delhi, India"
          />
        </div>
        <div>
          <Label htmlFor="purpose">Purpose of Visit</Label>
          <Select onValueChange={(value) => setFormData(prev => ({ ...prev, purpose: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Select purpose" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tourism">Tourism</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="medical">Medical</SelectItem>
              <SelectItem value="education">Education</SelectItem>
              <SelectItem value="family">Family Visit</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Arrival Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.arrivalDate ? format(formData.arrivalDate, "PPP") : "Select arrival date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={formData.arrivalDate}
                onSelect={(date) => setFormData(prev => ({ ...prev, arrivalDate: date }))}
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div>
          <Label>Departure Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.departureDate ? format(formData.departureDate, "PPP") : "Select departure date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={formData.departureDate}
                onSelect={(date) => setFormData(prev => ({ ...prev, departureDate: date }))}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div>
        <Label htmlFor="accommodation">Accommodation Details</Label>
        <Input
          id="accommodation"
          value={formData.accommodation}
          onChange={(e) => setFormData(prev => ({ ...prev, accommodation: e.target.value }))}
          placeholder="Hotel name and address"
        />
      </div>

      <div>
        <Label htmlFor="itinerary">Travel Itinerary</Label>
        <Textarea
          id="itinerary"
          value={formData.itinerary}
          onChange={(e) => setFormData(prev => ({ ...prev, itinerary: e.target.value }))}
          placeholder="Brief description of planned activities and places to visit"
          rows={4}
        />
      </div>
    </div>
  );

  const renderEmergencyContacts = () => (
    <div className="space-y-6">
      {formData.emergencyContacts.map((contact, index) => (
        <Card key={index} className="border-2 border-red-200">
          <CardHeader>
            <CardTitle className="text-red-800 flex items-center">
              <Phone className="w-5 h-5 mr-2" />
              Emergency Contact {index + 1}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`contact-name-${index}`}>Full Name</Label>
                <Input
                  id={`contact-name-${index}`}
                  value={contact.name}
                  onChange={(e) => {
                    const newContacts = [...formData.emergencyContacts];
                    newContacts[index].name = e.target.value;
                    setFormData(prev => ({ ...prev, emergencyContacts: newContacts }));
                  }}
                  placeholder="Contact's full name"
                />
              </div>
              <div>
                <Label htmlFor={`contact-relation-${index}`}>Relationship</Label>
                <Select onValueChange={(value) => {
                  const newContacts = [...formData.emergencyContacts];
                  newContacts[index].relation = value;
                  setFormData(prev => ({ ...prev, emergencyContacts: newContacts }));
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="parent">Parent</SelectItem>
                    <SelectItem value="spouse">Spouse</SelectItem>
                    <SelectItem value="sibling">Sibling</SelectItem>
                    <SelectItem value="child">Child</SelectItem>
                    <SelectItem value="friend">Friend</SelectItem>
                    <SelectItem value="colleague">Colleague</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`contact-phone-${index}`}>Phone Number</Label>
                <Input
                  id={`contact-phone-${index}`}
                  value={contact.phone}
                  onChange={(e) => {
                    const newContacts = [...formData.emergencyContacts];
                    newContacts[index].phone = e.target.value;
                    setFormData(prev => ({ ...prev, emergencyContacts: newContacts }));
                  }}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <Label htmlFor={`contact-email-${index}`}>Email Address</Label>
                <Input
                  id={`contact-email-${index}`}
                  type="email"
                  value={contact.email}
                  onChange={(e) => {
                    const newContacts = [...formData.emergencyContacts];
                    newContacts[index].email = e.target.value;
                    setFormData(prev => ({ ...prev, emergencyContacts: newContacts }));
                  }}
                  placeholder="contact@example.com"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor={`contact-address-${index}`}>Address</Label>
              <Textarea
                id={`contact-address-${index}`}
                value={contact.address}
                onChange={(e) => {
                  const newContacts = [...formData.emergencyContacts];
                  newContacts[index].address = e.target.value;
                  setFormData(prev => ({ ...prev, emergencyContacts: newContacts }));
                }}
                placeholder="Full address including city, state, and country"
                rows={2}
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderVerification = () => (
    <div className="space-y-6">
      {/* Verification Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { key: 'documents', label: 'Document Verification', icon: FileText, color: 'blue' },
          { key: 'biometric', label: 'Biometric Verification', icon: Fingerprint, color: 'purple' },
          { key: 'blockchain', label: 'Blockchain Recording', icon: Lock, color: 'green' },
          { key: 'qrCode', label: 'QR Code Generation', icon: QrCode, color: 'orange' }
        ].map(({ key, label, icon: Icon, color }) => (
          <Card key={key} className={`border-2 ${
            verificationStatus[key as keyof typeof verificationStatus] === 'verified' 
              ? `border-${color}-300 bg-${color}-50` 
              : 'border-gray-300'
          }`}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${
                  verificationStatus[key as keyof typeof verificationStatus] === 'verified' 
                    ? `bg-${color}-100` 
                    : 'bg-gray-100'
                }`}>
                  <Icon className={`w-5 h-5 ${
                    verificationStatus[key as keyof typeof verificationStatus] === 'verified' 
                      ? `text-${color}-600` 
                      : 'text-gray-500'
                  }`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{label}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    {verificationStatus[key as keyof typeof verificationStatus] === 'pending' && (
                      <>
                        <Clock className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm text-yellow-600">Pending</span>
                      </>
                    )}
                    {verificationStatus[key as keyof typeof verificationStatus] === 'verified' && (
                      <>
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-green-600">Verified</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Security Badges */}
      <Card className="border-2 border-blue-300 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-blue-800 flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            Security & Trust Indicators
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="p-3 bg-green-100 rounded-full mx-auto w-fit mb-2">
                <Verified className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-sm font-medium text-green-800">Verified Identity</p>
            </div>
            <div className="text-center">
              <div className="p-3 bg-blue-100 rounded-full mx-auto w-fit mb-2">
                <Lock className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-sm font-medium text-blue-800">256-bit Encryption</p>
            </div>
            <div className="text-center">
              <div className="p-3 bg-purple-100 rounded-full mx-auto w-fit mb-2">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-sm font-medium text-purple-800">Blockchain Secured</p>
            </div>
            <div className="text-center">
              <div className="p-3 bg-orange-100 rounded-full mx-auto w-fit mb-2">
                <Globe className="w-6 h-6 text-orange-600" />
              </div>
              <p className="text-sm font-medium text-orange-800">Globally Recognized</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* QR Code Preview */}
      {qrCodeData && (
        <Card className="border-2 border-green-300 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center">
              <QrCode className="w-5 h-5 mr-2" />
              Digital ID QR Code
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="w-48 h-48 bg-white border-2 border-gray-300 rounded-lg mx-auto flex items-center justify-center">
              <div className="grid grid-cols-8 gap-1">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-2 h-2 ${Math.random() > 0.5 ? 'bg-black' : 'bg-white'}`}
                  />
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <p className="font-medium text-green-800">ID: {qrCodeData}</p>
              <Badge className="bg-green-600">
                <CheckCircle className="w-3 h-3 mr-1" />
                Active
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Validity Period */}
      <Card className="border-2 border-yellow-300 bg-yellow-50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Clock className="w-6 h-6 text-yellow-600" />
              <div>
                <h3 className="font-medium text-yellow-800">Validity Period</h3>
                <p className="text-sm text-yellow-600">Your digital ID will be valid for {validityPeriod} days</p>
              </div>
            </div>
            <Badge variant="outline" className="text-yellow-800 border-yellow-300">
              Expires: {format(new Date(Date.now() + validityPeriod * 24 * 60 * 60 * 1000), 'PPP')}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Verification Actions */}
      <div className="flex justify-center">
        {!isProcessing && !qrCodeData && (
          <Button 
            onClick={simulateVerification}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3"
            size="lg"
          >
            <Shield className="w-5 h-5 mr-2" />
            Start Verification Process
          </Button>
        )}
        
        {isProcessing && (
          <div className="flex items-center space-x-3">
            <RefreshCw className="w-5 h-5 animate-spin text-blue-600" />
            <span className="text-blue-600 font-medium">Processing verification...</span>
          </div>
        )}
        
        {qrCodeData && (
          <Button 
            onClick={() => onComplete?.(formData)}
            className="bg-green-600 hover:bg-green-700 text-white font-medium px-8 py-3"
            size="lg"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Digital ID
          </Button>
        )}
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1: return renderPersonalInfo();
      case 2: return renderKYCDocuments();
      case 3: return renderTripDetails();
      case 4: return renderEmergencyContacts();
      case 5: return renderVerification();
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          {onBack && (
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          )}
          <div className="text-center flex-1">
            <h1 className="text-3xl font-bold text-blue-900 mb-2">Digital ID Registration</h1>
            <p className="text-muted-foreground">Secure, verified, and blockchain-protected identity</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Progress</div>
            <div className="text-2xl font-bold text-blue-600">{calculateCompletionPercentage()}%</div>
          </div>
        </div>

        {/* Progress Steps */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep >= step.id 
                      ? 'bg-blue-600 border-blue-600 text-white' 
                      : 'border-gray-300 text-gray-500'
                  }`}>
                    {currentStep > step.id ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      React.createElement(step.icon, { className: "w-5 h-5" })
                    )}
                  </div>
                  <div className="ml-3 min-w-0">
                    <div className={`text-sm font-medium ${
                      currentStep >= step.id ? 'text-blue-600' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-12 h-px mx-4 ${
                      currentStep > step.id ? 'bg-blue-600' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              {React.createElement(steps[currentStep - 1].icon, { className: "w-6 h-6 mr-3 text-blue-600" })}
              {steps[currentStep - 1].title}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {renderStepContent()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          
          {currentStep < 5 ? (
            <Button 
              onClick={() => setCurrentStep(Math.min(5, currentStep + 1))}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Next
            </Button>
          ) : (
            <div className="flex items-center space-x-2">
              <Badge className="bg-green-100 text-green-800 border-green-300">
                <CheckCircle className="w-3 h-3 mr-1" />
                Registration Complete
              </Badge>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}