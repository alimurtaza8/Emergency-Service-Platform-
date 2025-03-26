'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in Leaflet with Next.js
const iconPerson = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
});

const iconTechnician = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
  iconRetinaUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
});

// Component to recenter map when props change
function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  
  return null;
}

interface MapComponentProps {
  center: [number, number];
  address?: string;
  showRoute?: boolean;
  technicianLocation?: [number, number];
}

const MapComponent: React.FC<MapComponentProps> = ({ 
  center, 
  address, 
  showRoute = false,
  technicianLocation
}) => {
  // Generate a fake route path between technician and user
  const getRoutePath = (): [number, number][] => {
    if (!technicianLocation) return [];

    // Generate a path with some points between technician and user for a nice curved route
    const latlngs: [number, number][] = [];
    
    // Add technician location
    latlngs.push(technicianLocation);
    
    // Add some intermediate points to make a nice curve
    const latDiff = center[0] - technicianLocation[0];
    const lngDiff = center[1] - technicianLocation[1];
    
    // Add 3 intermediate points
    for (let i = 1; i < 4; i++) {
      const ratio = i / 4;
      // Add some randomness to make it look like a real route
      const randomLat = (Math.random() - 0.5) * 0.001;
      const randomLng = (Math.random() - 0.5) * 0.001;
      
      latlngs.push([
        technicianLocation[0] + latDiff * ratio + randomLat,
        technicianLocation[1] + lngDiff * ratio + randomLng
      ]);
    }
    
    // Add user location
    latlngs.push(center);
    
    return latlngs;
  };
  
  const routePath = showRoute && technicianLocation ? getRoutePath() : [];

  // Make sure we have a valid zoom level
  const defaultZoom = 13;

  return (
    <MapContainer 
      center={center} 
      zoom={defaultZoom} 
      style={{ height: '100%', width: '100%' }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      <Marker position={center} icon={iconPerson}>
        <Popup>
          Your Location
          {address && <div><small>{address}</small></div>}
        </Popup>
      </Marker>
      
      {showRoute && technicianLocation && (
        <>
          <Marker position={technicianLocation} icon={iconTechnician}>
            <Popup>
              Technician Location
              <div><small>On the way to you</small></div>
            </Popup>
          </Marker>
          
          <Polyline 
            positions={routePath}
            color="blue"
            weight={4}
            opacity={0.7}
            dashArray="10, 10"
          />
        </>
      )}
      
      <MapUpdater center={center} />
    </MapContainer>
  );
};

export default MapComponent; 