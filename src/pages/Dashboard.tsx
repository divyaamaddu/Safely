import React, { useState } from 'react';
import { Logo } from '../components/Logo';
import { MapView } from '../components/MapView';
import { Button } from '../components/ui/button';
import { ScrollArea } from '../components/ui/scroll-area';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Search, Bell, Users, AlertTriangle, MapPin, Clock, TrendingUp, Shield } from 'lucide-react';
import { mockAlerts, mockTourists, mockTrips, mockReports, safetyZones } from '../utils/mockData';
import { formatDistanceToNow } from '../utils/dateUtils';

interface DashboardProps {
  onNavigate: (page: string, data?: any) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const [alerts] = useState(mockAlerts.filter(a => a.status === 'active' || a.status === 'pending'));
  const [activeTrips] = useState(mockTrips.filter(t => t.status === 'active'));
  const [recentReports] = useState(mockReports.slice(0, 3));

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'emergency':
        return 'bg-red-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'moderate':
        return 'bg-orange-500';
      default:
        return 'bg-blue-500';
    }
  };

  const markers = mockTourists.map(tourist => {
    const alert = alerts.find(a => a.touristId === tourist.id);
    return {
      position: tourist.location,
      status: alert ? alert.severity : (tourist.status === 'active' ? 'safe' : 'inactive'),
      label: tourist.name
    };
  });

  // Statistics calculations
  const stats = {
    totalTourists: mockTourists.length,
    activeTourists: mockTourists.filter(t => t.status === 'active').length,
    activeAlerts: alerts.length,
    emergencyAlerts: alerts.filter(a => a.severity === 'emergency').length,
    activeTrips: activeTrips.length,
    avgSafetyRating: (mockTourists.reduce((sum, t) => sum + t.safetyRating, 0) / mockTourists.length).toFixed(1)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] flex flex-col">
      {/* Header */}
      <header className="bg-white/5 backdrop-blur-md border-b border-white/10 p-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
            >
              <Bell className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
              onClick={() => onNavigate('tourist-management')}
            >
              <Search className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <div className="flex-1 flex flex-col">
        {/* Top Section - Map and Alerts */}
        <div className="flex flex-col lg:flex-row min-h-[60vh]">
        {/* Map Section */}
          <div className="flex-1 p-4 min-h-0">
          <div className="h-full">
            <MapView
              markers={markers}
                zones={safetyZones}
              className="h-full"
            />
          </div>
        </div>

        {/* Alerts Panel */}
          <div className="lg:w-96 bg-white/5 backdrop-blur-md border-l border-white/10 flex flex-col h-[60vh]">
          {/* Panel Header */}
            <div className="p-4 border-b border-white/10 flex-shrink-0">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white">Active Alerts</h2>
              <Button
                variant="default"
                size="sm"
                className="bg-[#16365D] hover:bg-[#1a4170] text-white border-0"
                onClick={() => onNavigate('alert-categories')}
              >
                Details
              </Button>
            </div>
          </div>

          {/* Alerts List */}
            <ScrollArea className="flex-1 h-[calc(60vh-140px)]">
              <div className="p-4 space-y-3 pb-2">
              {alerts.length === 0 ? (
                <div className="text-center text-gray-400 py-8">
                  No active alerts
                </div>
              ) : (
                  alerts.slice(0, 4).map(alert => (
                  <div
                    key={alert.id}
                    onClick={() => onNavigate('alert-detail', alert)}
                    className="bg-white/5 backdrop-blur-md rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={alert.profilePic}
                        alt={alert.touristName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className="text-white text-sm truncate">{alert.title}</h3>
                          <Badge className={`${getSeverityColor(alert.severity)} text-white border-0 shrink-0`}>
                            {alert.severity}
                          </Badge>
                        </div>
                        <p className="text-gray-400 text-xs mb-2">{alert.touristName}</p>
                        <p className="text-gray-300 text-sm mb-2 line-clamp-2">{alert.description}</p>
                        <p className="text-gray-500 text-xs">
                          {formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
                
                {/* Show remaining alerts count if more than 4 */}
                {alerts.length > 4 && (
                  <div className="text-center py-4">
                    <div className="bg-white/5 backdrop-blur-md rounded-lg p-3 border border-white/10">
                      <p className="text-gray-300 text-sm">
                        +{alerts.length - 4} more alerts
                      </p>
                      <p className="text-gray-500 text-xs mt-1">
                        Scroll down or click "View All" to see all alerts
                      </p>
                    </div>
                  </div>
                )}
            </div>
          </ScrollArea>

          {/* View All Button */}
            <div className="p-4 border-t border-white/10 flex-shrink-0">
            <Button
              onClick={() => onNavigate('alerts-trips')}
              className="w-full bg-[#16365D] hover:bg-[#1a4170] text-white"
            >
                View All {alerts.length} Alerts & Trips
              </Button>
            </div>
          </div>
        </div>

        {/* Safety Zone Legend */}
        <div className="bg-white/5 backdrop-blur-md border-t border-white/10 p-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Safety Zone Legend
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded border-2 border-white"></div>
                <span className="text-sm text-white">Safe Areas</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-500 rounded border-2 border-white"></div>
                <span className="text-sm text-white">Moderate Risk</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded border-2 border-white"></div>
                <span className="text-sm text-white">High Risk</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-orange-500 rounded border-2 border-white"></div>
                <span className="text-sm text-white">Congested</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="text-center py-2">
          <div className="inline-flex items-center gap-2 text-gray-400 text-sm">
            <div className="w-6 h-6 border-2 border-gray-400 rounded-full flex items-center justify-center">
              <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></div>
            </div>
            <span>Scroll down to see more</span>
          </div>
        </div>

        {/* Bottom Section - Statistics and Additional Info */}
        <div className="bg-white/5 backdrop-blur-md border-t border-white/10 p-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {/* Quick Stats Cards */}
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Users className="w-8 h-8 text-blue-400" />
                  <div>
                    <p className="text-2xl font-bold text-white">{stats.totalTourists}</p>
                    <p className="text-xs text-gray-400">Total Tourists</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-8 h-8 text-green-400" />
                  <div>
                    <p className="text-2xl font-bold text-white">{stats.activeTourists}</p>
                    <p className="text-xs text-gray-400">Active</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-8 h-8 text-yellow-400" />
                  <div>
                    <p className="text-2xl font-bold text-white">{stats.activeAlerts}</p>
                    <p className="text-xs text-gray-400">Active Alerts</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-8 h-8 text-red-400" />
                  <div>
                    <p className="text-2xl font-bold text-white">{stats.emergencyAlerts}</p>
                    <p className="text-xs text-gray-400">Emergency</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <MapPin className="w-8 h-8 text-purple-400" />
                  <div>
                    <p className="text-2xl font-bold text-white">{stats.activeTrips}</p>
                    <p className="text-xs text-gray-400">Active Trips</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Shield className="w-8 h-8 text-emerald-400" />
                  <div>
                    <p className="text-2xl font-bold text-white">{stats.avgSafetyRating}</p>
                    <p className="text-xs text-gray-400">Avg Safety</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Options Row */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Recent Trips */}
            <Card className="bg-white/5 border-white/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-sm flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Recent Trips
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  {activeTrips.slice(0, 3).map(trip => (
                    <div key={trip.id} className="flex items-center justify-between text-xs">
                      <span className="text-gray-300 truncate">{trip.touristName}</span>
                      <Badge variant="outline" className="text-gray-400 border-gray-600">
                        {trip.city}
                      </Badge>
                    </div>
                  ))}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full mt-2 text-gray-400 hover:text-white"
                  onClick={() => onNavigate('alerts-trips')}
                >
                  View All Trips
                </Button>
              </CardContent>
            </Card>

            {/* Safety Reports */}
            <Card className="bg-white/5 border-white/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-sm flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Recent Reports
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  {recentReports.map(report => (
                    <div key={report.id} className="text-xs">
                      <p className="text-gray-300 truncate">{report.touristName}</p>
                      <p className="text-gray-500 text-xs">
                        {formatDistanceToNow(new Date(report.timestamp), { addSuffix: true })}
                      </p>
                    </div>
                  ))}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full mt-2 text-gray-400 hover:text-white"
                  onClick={() => onNavigate('alerts-trips')}
                >
                  View All Reports
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white/5 border-white/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-sm">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-gray-600 text-gray-300 hover:bg-white/10"
                  onClick={() => onNavigate('tourist-management')}
                >
                  Manage Tourists
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-gray-600 text-gray-300 hover:bg-white/10"
                  onClick={() => onNavigate('alert-categories')}
                >
                  Alert Categories
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-gray-600 text-gray-300 hover:bg-white/10"
                  onClick={() => onNavigate('alerts-trips')}
                >
                  View All Data
            </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
