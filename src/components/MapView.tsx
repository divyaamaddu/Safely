import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon, Polyline, useMap } from 'react-leaflet';
import { Icon, LatLngExpression } from 'leaflet';
import { MapPin, Navigation } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix default markers
delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

interface MapViewProps {
  center?: { lat: number; lng: number };
  markers?: Array<{
    position: { lat: number; lng: number };
    status?: 'emergency' | 'warning' | 'safe' | 'inactive';
    label?: string;
  }>;
  zones?: Array<{
    type: 'safe' | 'danger' | 'moderate' | 'restricted';
    coordinates: { lat: number; lng: number }[];
  }>;
  route?: { lat: number; lng: number }[];
  className?: string;
}

// Custom marker icons
const createCustomIcon = (color: string) => {
  return new Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(`
      <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
        <path fill="${color}" stroke="#fff" stroke-width="2" d="M12.5 0C5.6 0 0 5.6 0 12.5c0 12.5 12.5 28.5 12.5 28.5s12.5-16 12.5-28.5C25 5.6 19.4 0 12.5 0z"/>
        <circle fill="#fff" cx="12.5" cy="12.5" r="6"/>
      </svg>
    `)}`,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -41],
  });
};

const getMarkerIcon = (status?: string) => {
  switch (status) {
    case 'emergency':
      return createCustomIcon('#ef4444');
    case 'warning':
      return createCustomIcon('#eab308');
    case 'safe':
      return createCustomIcon('#22c55e');
    case 'inactive':
      return createCustomIcon('#6b7280');
    default:
      return createCustomIcon('#3b82f6');
  }
};

const getZoneColor = (type: string) => {
  switch (type) {
    case 'safe':
      return '#22c55e';
    case 'danger':
      return '#ef4444';
    case 'moderate':
      return '#eab308';
    case 'congested':
      return '#f97316';
    case 'restricted':
      return '#000000';
    default:
      return '#3b82f6';
  }
};

// Component to handle map updates
const MapUpdater: React.FC<{ center: { lat: number; lng: number } }> = ({ center }) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView([center.lat, center.lng], map.getZoom());
  }, [center, map]);
  
  return null;
};

export const MapView: React.FC<MapViewProps> = ({
  center = { lat: 28.6139, lng: 77.2090 },
  markers = [],
  zones = [],
  route = [],
  className = ''
}) => {
  return (
    <div className={`w-full h-full rounded-lg overflow-hidden ${className}`}>
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        className="rounded-lg"
      >
        <MapUpdater center={center} />
        
        {/* High contrast tile layer for better visibility */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          subdomains="abcd"
          maxZoom={20}
        />
        
        {/* Safety Zones */}
        {zones.map((zone, index) => (
          <Polygon
            key={`zone-${index}`}
            positions={zone.coordinates.map(coord => [coord.lat, coord.lng] as LatLngExpression)}
            pathOptions={{
              color: getZoneColor(zone.type),
              fillColor: getZoneColor(zone.type),
              fillOpacity: zone.type === 'danger' ? 0.3 : zone.type === 'moderate' ? 0.25 : 0.2,
              weight: zone.type === 'danger' ? 3 : 2,
              opacity: 0.8,
              dashArray: zone.type === 'danger' ? '5, 5' : 'none',
            }}
          >
            <Popup>
              <div className="text-sm min-w-[220px]">
                <div className="font-bold text-lg mb-2 text-gray-800">
                  {zone.name || 'Safety Zone'}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Risk Level:</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      zone.type === 'safe' ? 'bg-green-100 text-green-800' :
                      zone.type === 'danger' ? 'bg-red-100 text-red-800' :
                      zone.type === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                      zone.type === 'congested' ? 'bg-orange-100 text-orange-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {zone.type.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-xs text-gray-600 space-y-1">
                    {zone.type === 'safe' ? (
                      <div>✅ Safe Area - Monitored & Secure</div>
                    ) : zone.type === 'danger' ? (
                      <div>⚠️ High Risk - Avoid if possible</div>
                    ) : zone.type === 'moderate' ? (
                      <div>⚡ Moderate Risk - Stay Alert</div>
                    ) : zone.type === 'congested' ? (
                      <div>🚶 Congested Area - Watch belongings</div>
                    ) : (
                      <div>🚫 Restricted Area</div>
                    )}
                    <div className="text-gray-500">
                      📍 {zone.coordinates.length} boundary points
                    </div>
                  </div>
                </div>
              </div>
            </Popup>
          </Polygon>
        ))}
        
        {/* Route */}
        {route.length > 1 && (
          <Polyline
            positions={route.map(point => [point.lat, point.lng] as LatLngExpression)}
            pathOptions={{
              color: '#1d4ed8',
              weight: 5,
              opacity: 0.9,
              dashArray: '15, 10',
              lineCap: 'round',
              lineJoin: 'round'
            }}
          >
            <Popup>
              <div className="text-sm">
                <strong>Tourist Route</strong><br />
                {route.length} waypoints<br />
                <span className="text-blue-600">Click markers for details</span>
              </div>
            </Popup>
          </Polyline>
        )}
        
        {/* Markers */}
        {markers.map((marker, index) => (
          <Marker
            key={`marker-${index}`}
            position={[marker.position.lat, marker.position.lng]}
            icon={getMarkerIcon(marker.status)}
          >
            <Popup>
              <div className="text-sm min-w-[200px]">
                <div className="font-bold text-lg mb-2 text-gray-800">
                  {marker.label || 'Location'}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Status:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      marker.status === 'emergency' ? 'bg-red-100 text-red-800' :
                      marker.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                      marker.status === 'safe' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {marker.status || 'Unknown'}
                    </span>
                  </div>
                  <div className="text-xs text-gray-600">
                    📍 {marker.position.lat.toFixed(4)}, {marker.position.lng.toFixed(4)}
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
