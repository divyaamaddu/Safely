import React, { useState } from 'react';
import { Logo } from '../components/Logo';
import { MapView } from '../components/MapView';
import { Button } from '../components/ui/button';
import { ScrollArea } from '../components/ui/scroll-area';
import { Badge } from '../components/ui/badge';
import { ArrowLeft, MapPin, Hotel, Utensils, Church, Landmark, Navigation2 } from 'lucide-react';
import { Trip } from '../utils/mockData';

interface TripDetailsProps {
  trip: Trip;
  onNavigate: (page: string, data?: any) => void;
}

export const TripDetails: React.FC<TripDetailsProps> = ({ trip, onNavigate }) => {
  const [viewMode, setViewMode] = useState<'live' | 'route'>(
    trip.status === 'active' ? 'live' : 'route'
  );

  const getPlaceIcon = (type: string) => {
    switch (type) {
      case 'hotel':
        return <Hotel className="w-5 h-5" />;
      case 'restaurant':
        return <Utensils className="w-5 h-5" />;
      case 'temple':
        return <Church className="w-5 h-5" />;
      case 'tourist_spot':
        return <Landmark className="w-5 h-5" />;
      default:
        return <MapPin className="w-5 h-5" />;
    }
  };

  const markers = trip.visitedPlaces.map(place => ({
    position: place.location,
    status: 'safe' as const,
    label: place.name
  }));

  const zones = [
    {
      type: 'safe' as const,
      coordinates: [
        { lat: trip.route[0].lat, lng: trip.route[0].lng },
        { lat: trip.route[0].lat + 0.05, lng: trip.route[0].lng + 0.05 },
        { lat: trip.route[0].lat, lng: trip.route[0].lng + 0.05 }
      ]
    },
    {
      type: 'moderate' as const,
      coordinates: [
        { lat: trip.route[0].lat + 0.1, lng: trip.route[0].lng + 0.1 },
        { lat: trip.route[0].lat + 0.15, lng: trip.route[0].lng + 0.15 },
        { lat: trip.route[0].lat + 0.1, lng: trip.route[0].lng + 0.15 }
      ]
    }
  ];

  return (
    <div className="h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] overflow-hidden">
      {/* Header */}
      <header className="bg-white/5 backdrop-blur-md border-b border-white/10 p-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10"
            onClick={() => onNavigate('alerts-trips')}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <Logo />
          <div className="flex-1">
            <h1 className="text-white">Trip Details</h1>
            <p className="text-gray-400 text-sm">{trip.id}</p>
          </div>
          <Badge className={`${trip.status === 'active' ? 'bg-green-500' : 'bg-gray-500'} text-white border-0`}>
            {trip.status}
          </Badge>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row h-[calc(100vh-89px)]">
        {/* Left Side - Places List */}
        <div className="lg:w-96 bg-white/5 backdrop-blur-md border-r border-white/10 flex flex-col">
          <div className="p-4 border-b border-white/10">
            <h2 className="text-white mb-2">Trip Information</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Tourist:</span>
                <span className="text-white">{trip.touristName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">City:</span>
                <span className="text-white">{trip.city}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Start:</span>
                <span className="text-white">{new Date(trip.startDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">End:</span>
                <span className="text-white">{new Date(trip.endDate).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div className="p-4 border-b border-white/10">
            <h3 className="text-white mb-3">Visited Places</h3>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-4 space-y-3">
              {trip.visitedPlaces.map((place, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-md rounded-lg p-3 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="text-[#16365D] bg-white/10 p-2 rounded-lg">
                      {getPlaceIcon(place.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white text-sm mb-1">{place.name}</h4>
                      <p className="text-gray-400 text-xs capitalize">{place.type.replace('_', ' ')}</p>
                      <p className="text-gray-500 text-xs mt-1">
                        {place.location.lat.toFixed(4)}, {place.location.lng.toFixed(4)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Right Side - Map */}
        <div className="flex-1 flex flex-col">
          {/* Map Controls */}
          <div className="p-4 bg-white/5 backdrop-blur-md border-b border-white/10">
            <div className="flex gap-2">
              {trip.status === 'active' && (
                <Button
                  onClick={() => setViewMode('live')}
                  className={`${
                    viewMode === 'live'
                      ? 'bg-[#16365D] text-white'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <Navigation2 className="w-4 h-4 mr-2" />
                  View Live Location
                </Button>
              )}
              <Button
                onClick={() => setViewMode('route')}
                className={`${
                  viewMode === 'route'
                    ? 'bg-[#16365D] text-white'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                <MapPin className="w-4 h-4 mr-2" />
                View Route
              </Button>
            </div>
          </div>

          {/* Map View */}
          <div className="flex-1 p-4">
            <MapView
              center={trip.route[0]}
              markers={markers}
              zones={zones}
              route={viewMode === 'route' ? trip.route : []}
              className="h-full"
            />
          </div>

          {/* Zone Legend */}
          <div className="p-4 bg-white/5 backdrop-blur-md border-t border-white/10">
            <h3 className="text-white mb-3 text-sm">Zone Legend</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-gray-300 text-xs">Safe Zone</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span className="text-gray-300 text-xs">Moderate Zone</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-gray-300 text-xs">Danger Zone</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-black"></div>
                <span className="text-gray-300 text-xs">Restricted Zone</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
