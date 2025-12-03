import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix pour les icônes Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Icône personnalisée pour les administrations
const createCustomIcon = (type, color = '#26aa7e') => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        background: ${color};
        width: 32px;
        height: 32px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 3px solid white;
        box-shadow: 0 4px 6px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          transform: rotate(45deg);
          color: white;
          font-size: 16px;
          font-weight: bold;
        ">📍</div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });
};

// Icône pour la position de l'utilisateur
const userIcon = L.divIcon({
  className: 'user-marker',
  html: `
    <div style="
      background: #3b82f6;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
    "></div>
    <style>
      @keyframes pulse {
        0%, 100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); }
        50% { box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); }
      }
      .user-marker > div {
        animation: pulse 2s infinite;
      }
    </style>
  `,
  iconSize: [20, 20],
  iconAnchor: [10, 10]
});

// Composant pour ajuster la carte
function MapController({ center, zoom }) {
  const map = useMap();
  
  useEffect(() => {
    if (center) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);
  
  return null;
}

export default function MapView({ 
  administrations = [], 
  userLocation = null, 
  onMarkerClick,
  selectedAdmin = null,
  route = null 
}) {
  const center = userLocation || [-4.2634, 15.2429]; // Brazzaville par défaut
  const zoom = userLocation ? 13 : 12;

  const getTypeColor = (type) => {
    const colors = {
      mairie: '#26aa7e',
      commissariat: '#3b82f6',
      prefecture: '#8b5cf6',
      cnss: '#f59e0b',
      tribunal: '#ef4444',
      autre: '#6c757d'
    };
    return colors[type] || colors.autre;
  };

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl">
      <MapContainer
        center={center}
        zoom={zoom}
        className="w-full h-full"
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapController 
          center={selectedAdmin ? [selectedAdmin.latitude, selectedAdmin.longitude] : center} 
          zoom={zoom} 
        />

        {/* Marker pour la position de l'utilisateur */}
        {userLocation && (
          <Marker position={userLocation} icon={userIcon}>
            <Popup>
              <div className="text-center p-2">
                <p className="font-semibold">Votre position</p>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Markers pour les administrations */}
        {administrations.map((admin) => (
          <Marker
            key={admin.id}
            position={[admin.latitude, admin.longitude]}
            icon={createCustomIcon(admin.type, getTypeColor(admin.type))}
            eventHandlers={{
              click: () => onMarkerClick && onMarkerClick(admin)
            }}
          >
            <Popup>
              <div className="p-2 min-w-[200px]">
                <h3 className="font-bold text-lg mb-2 text-[#26aa7e]">{admin.name}</h3>
                <p className="text-sm text-[#6c757d] mb-1">
                  <strong>Type:</strong> {admin.type}
                </p>
                <p className="text-sm text-[#6c757d] mb-2">
                  <strong>Quartier:</strong> {admin.quartier}
                </p>
                {admin.distance && (
                  <p className="text-sm font-semibold text-[#ffc107]">
                    📍 {(admin.distance / 1000).toFixed(1)} km
                  </p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Tracer l'itinéraire si disponible */}
        {route && route.coordinates && (
          <Polyline
            positions={route.coordinates}
            color="#26aa7e"
            weight={5}
            opacity={0.8}
          />
        )}
      </MapContainer>
    </div>
  );
}