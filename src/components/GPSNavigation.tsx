import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Button } from "./ui/button";
import { toast } from "sonner";

// Fix marker icons (Leaflet + Vite)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL("leaflet/dist/images/marker-icon-2x.png", import.meta.url).href,
  iconUrl: new URL("leaflet/dist/images/marker-icon.png", import.meta.url).href,
  shadowUrl: new URL("leaflet/dist/images/marker-shadow.png", import.meta.url).href,
});

interface GPSNavigationProps {
  onBack: () => void;
  name?: string;
}

export const GPSNavigation: React.FC<GPSNavigationProps> = ({ onBack, name = "tourist-001" }) => {
  const [position, setPosition] = useState<[number, number] | null>(null);

  const fetchCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);

        // Send to backend
        fetch("http://localhost:8000/update-location", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, lat: latitude, lon: longitude, battery: 100 }),
        })
          .then((res) => res.json())
          .then(() => toast.success("Location updated"))
          .catch(() => toast.error("Failed to send location"));
      },
      (err) => toast.error("Error getting location: " + err.message)
    );
  };

  useEffect(() => {
    fetchCurrentLocation();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="p-4 flex justify-between items-center bg-gray-800 text-white">
        <Button onClick={onBack}>Back</Button>
        <h2>GPS Navigation</h2>
        <Button onClick={fetchCurrentLocation}>Current Location</Button>
      </div>

      {position ? (
        <MapContainer center={position} zoom={16} className="flex-1">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={position}>
            <Popup>Your Current Location</Popup>
          </Marker>
        </MapContainer>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <p>Loading map...</p>
        </div>
      )}
    </div>
  );
};
