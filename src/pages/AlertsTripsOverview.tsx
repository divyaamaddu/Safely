import React, { useState } from 'react';
import { Logo } from '../components/Logo';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { ArrowLeft, Search, Bell, MapPin, FileText } from 'lucide-react';
import { mockAlerts, mockTrips, mockReports } from '../utils/mockData';
import { formatDistanceToNow } from '../utils/dateUtils';

interface AlertsTripsOverviewProps {
  onNavigate: (page: string, data?: any) => void;
}

export const AlertsTripsOverview: React.FC<AlertsTripsOverviewProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'emergency':
        return 'bg-red-500';
      case 'warning':
        return 'bg-yellow-500';
      default:
        return 'bg-orange-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'completed':
        return 'bg-gray-500';
      default:
        return 'bg-blue-500';
    }
  };

  const filteredAlerts = mockAlerts.filter(alert =>
    alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    alert.touristName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTrips = mockTrips.filter(trip =>
    trip.touristName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trip.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trip.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredReports = mockReports.filter(report =>
    report.touristName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] overflow-hidden">
      {/* Header */}
      <header className="bg-white/5 backdrop-blur-md border-b border-white/10 p-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10"
            onClick={() => onNavigate('dashboard')}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <Logo />
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto p-6">
        {/* Search and Filter */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search by name, ID, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-gray-500"
            />
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="alerts" className="w-full">
          <TabsList className="bg-white/5 border border-white/10 mb-6">
            <TabsTrigger value="alerts" className="data-[state=active]:bg-[#16365D]">
              <Bell className="w-4 h-4 mr-2" />
              Alerts
            </TabsTrigger>
            <TabsTrigger value="trips" className="data-[state=active]:bg-[#16365D]">
              <MapPin className="w-4 h-4 mr-2" />
              Trips
            </TabsTrigger>
            <TabsTrigger value="reports" className="data-[state=active]:bg-[#16365D]">
              <FileText className="w-4 h-4 mr-2" />
              Reports
            </TabsTrigger>
          </TabsList>

          {/* Alerts Tab */}
          <TabsContent value="alerts">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAlerts.map(alert => (
                <Card
                  key={alert.id}
                  className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
                  onClick={() => onNavigate('alert-detail', alert)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <img
                        src={alert.profilePic}
                        alt={alert.touristName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white mb-1">{alert.title}</h3>
                        <p className="text-gray-400 text-sm">{alert.touristName}</p>
                      </div>
                      <Badge className={`${getSeverityColor(alert.severity)} text-white border-0`}>
                        {alert.severity}
                      </Badge>
                    </div>
                    <p className="text-gray-300 text-sm mb-3 line-clamp-2">{alert.description}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}</span>
                      <Badge variant="outline" className="border-white/20 text-gray-400">
                        {alert.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Trips Tab */}
          <TabsContent value="trips">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTrips.map(trip => (
                <Card
                  key={trip.id}
                  className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
                  onClick={() => onNavigate('trip-detail', trip)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-white mb-1">{trip.city}</h3>
                        <p className="text-gray-400 text-sm">{trip.touristName}</p>
                      </div>
                      <Badge className={`${getStatusColor(trip.status)} text-white border-0`}>
                        {trip.status}
                      </Badge>
                    </div>
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Trip ID:</span>
                        <span className="text-white">{trip.id}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Tourist ID:</span>
                        <span className="text-white">{trip.touristId}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Duration:</span>
                        <span className="text-white">
                          {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="pt-3 border-t border-white/10">
                      <p className="text-xs text-gray-400">
                        {trip.visitedPlaces.length} places visited
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredReports.map(report => (
                <Card
                  key={report.id}
                  className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
                  onClick={() => onNavigate('trip-detail', mockTrips.find(t => t.id === report.tripId))}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-white mb-1">Report {report.id}</h3>
                        <p className="text-gray-400 text-sm">{report.touristName}</p>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm mb-3">{report.summary}</p>
                    <div className="space-y-2 mb-3">
                      {report.zones.map((zone, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${
                            zone.type === 'danger' ? 'bg-red-500' :
                            zone.type === 'moderate' ? 'bg-yellow-500' :
                            zone.type === 'restricted' ? 'bg-black' :
                            'bg-orange-500'
                          }`}></div>
                          <span className="text-sm text-gray-300">{zone.name}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500">
                      {formatDistanceToNow(new Date(report.timestamp), { addSuffix: true })}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
