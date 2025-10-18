import React, { useState } from 'react';
import { Logo } from '../components/Logo';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { ScrollArea } from '../components/ui/scroll-area';
import { ArrowLeft, MapPin, FileText } from 'lucide-react';
import { Tourist, mockTrips, mockReports } from '../utils/mockData';

interface TouristProfileProps {
  tourist: Tourist;
  onNavigate: (page: string, data?: any) => void;
}

export const TouristProfile: React.FC<TouristProfileProps> = ({ tourist, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'trips' | 'reports'>('trips');

  const touristTrips = mockTrips.filter(trip => trip.touristId === tourist.id);
  const activeTrips = touristTrips.filter(trip => trip.status === 'active');
  const completedTrips = touristTrips.filter(trip => trip.status === 'completed');
  const touristReports = mockReports.filter(report => report.touristId === tourist.id);

  const getZoneColor = (type: string) => {
    switch (type) {
      case 'danger':
        return 'bg-red-500';
      case 'moderate':
        return 'bg-yellow-500';
      case 'restricted':
        return 'bg-black';
      case 'congested':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] overflow-hidden">
      {/* Header */}
      <header className="bg-white/5 backdrop-blur-md border-b border-white/10 p-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10"
            onClick={() => onNavigate('tourist-management')}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <Logo />
          <h1 className="text-white">Tourist Profile</h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto p-6 max-w-6xl">
        {/* Profile Header */}
        <div className="bg-white/5 backdrop-blur-md rounded-lg p-6 border border-white/10 mb-6">
          <div className="flex items-start gap-6">
            <img
              src={tourist.profilePic}
              alt={tourist.name}
              className="w-24 h-24 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h2 className="text-white mb-1">{tourist.name}</h2>
                  <p className="text-gray-400">{tourist.id}</p>
                </div>
                <Badge
                  className={`${
                    tourist.status === 'active' ? 'bg-green-500' : 'bg-gray-500'
                  } text-white border-0`}
                >
                  {tourist.status}
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-gray-400 text-sm">Total Trips</p>
                  <p className="text-white text-2xl">{touristTrips.length}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-gray-400 text-sm">Active Trips</p>
                  <p className="text-white text-2xl">{activeTrips.length}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-gray-400 text-sm">Reports</p>
                  <p className="text-white text-2xl">{touristReports.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white/5 backdrop-blur-md rounded-lg border border-white/10 overflow-hidden">
          <div className="flex border-b border-white/10">
            <button
              onClick={() => setActiveTab('trips')}
              className={`flex-1 flex items-center justify-center gap-2 p-4 transition-colors ${
                activeTab === 'trips'
                  ? 'bg-[#16365D] text-white'
                  : 'text-gray-400 hover:bg-white/5'
              }`}
            >
              <MapPin className="w-5 h-5" />
              Trips
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`flex-1 flex items-center justify-center gap-2 p-4 transition-colors ${
                activeTab === 'reports'
                  ? 'bg-[#16365D] text-white'
                  : 'text-gray-400 hover:bg-white/5'
              }`}
            >
              <FileText className="w-5 h-5" />
              Reports
            </button>
          </div>

          <ScrollArea className="h-[calc(100vh-420px)]">
            <div className="p-6">
              {/* Trips Tab */}
              {activeTab === 'trips' && (
                <div className="space-y-6">
                  {/* Active Trips */}
                  {activeTrips.length > 0 && (
                    <div>
                      <h3 className="text-white mb-3">Active Trips</h3>
                      <div className="space-y-3">
                        {activeTrips.map(trip => (
                          <Card
                            key={trip.id}
                            className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
                            onClick={() => onNavigate('trip-detail', trip)}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h4 className="text-white mb-1">{trip.city}</h4>
                                  <p className="text-gray-400 text-sm">{trip.id}</p>
                                </div>
                                <Badge className="bg-green-500 text-white border-0">
                                  Active
                                </Badge>
                              </div>
                              <div className="text-sm text-gray-300">
                                {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Completed Trips */}
                  {completedTrips.length > 0 && (
                    <div>
                      <h3 className="text-white mb-3">Completed Trips</h3>
                      <div className="space-y-3">
                        {completedTrips.map(trip => (
                          <Card
                            key={trip.id}
                            className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
                            onClick={() => onNavigate('trip-detail', trip)}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h4 className="text-white mb-1">{trip.city}</h4>
                                  <p className="text-gray-400 text-sm">{trip.id}</p>
                                </div>
                                <Badge className="bg-gray-500 text-white border-0">
                                  Completed
                                </Badge>
                              </div>
                              <div className="text-sm text-gray-300">
                                {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}

                  {touristTrips.length === 0 && (
                    <div className="text-center text-gray-400 py-12">
                      No trips found
                    </div>
                  )}
                </div>
              )}

              {/* Reports Tab */}
              {activeTab === 'reports' && (
                <div>
                  {touristReports.length === 0 ? (
                    <div className="text-center text-gray-400 py-12">
                      No reports found
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {touristReports.map(report => (
                        <Card
                          key={report.id}
                          className="bg-white/5 backdrop-blur-md border-white/10"
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h4 className="text-white mb-1">Report {report.id}</h4>
                                <p className="text-gray-400 text-sm">Trip: {report.tripId}</p>
                              </div>
                            </div>
                            <p className="text-gray-300 text-sm mb-4">{report.summary}</p>
                            <div>
                              <h5 className="text-white text-sm mb-2">Zones Encountered:</h5>
                              <div className="space-y-2">
                                {report.zones.map((zone, index) => (
                                  <div key={index} className="flex items-center gap-3 text-sm">
                                    <div className={`w-3 h-3 rounded-full ${getZoneColor(zone.type)}`}></div>
                                    <span className="text-gray-300 flex-1">{zone.name}</span>
                                    <span className="text-gray-500 text-xs">
                                      {new Date(zone.timestamp).toLocaleDateString()}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};
