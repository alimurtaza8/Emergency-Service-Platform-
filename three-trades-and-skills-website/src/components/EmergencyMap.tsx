// 'use client';

// import { useEffect } from 'react';
// // @ts-ignore - We'll need the @types/leaflet and @types/react-leaflet dependencies installed
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// // @ts-ignore
// import 'leaflet/dist/leaflet.css';
// // @ts-ignore
// import L from 'leaflet';

// interface EmergencyMapProps {
//   position: [number, number];
//   popupText?: string;
// }

// export default function EmergencyMap({ position, popupText }: EmergencyMapProps) {
//   // Fix Leaflet default icon issue
//   useEffect(() => {
//     // Fix the default icon issue
//     delete (L.Icon.Default.prototype as any)._getIconUrl;
    
//     L.Icon.Default.mergeOptions({
//       iconUrl: '/marker-icon.png',
//       iconRetinaUrl: '/marker-icon-2x.png',
//       shadowUrl: '/marker-shadow.png',
//     });
//   }, []);

//   return (
//     <MapContainer 
//       center={position} 
//       zoom={13} 
//       style={{ height: '100%', width: '100%' }}
//       scrollWheelZoom={false}
//     >
//       <TileLayer
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />
//       <Marker position={position}>
//         {popupText && (
//           <Popup>
//             {popupText}
//           </Popup>
//         )}
//       </Marker>
//     </MapContainer>
//   );
// } 