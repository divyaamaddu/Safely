import React, { useState } from 'react';
import { Logo } from '../components/Logo';
import { MapView } from '../components/MapView';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ArrowLeft, CheckCircle, FileText, MapPin, Clock, User } from 'lucide-react';
import { Alert } from '../utils/mockData';
import { formatDistanceToNow } from '../utils/dateUtils';
import { toast } from 'sonner@2.0.3';

interface AlertDetailProps {
  alert: Alert;
  onNavigate: (page: string, data?: any) => void;
}

export const AlertDetail: React.FC<AlertDetailProps> = ({ alert, onNavigate }) => {
  const [status, setStatus] = useState(alert.status);

  const handleResolve = () => {
    setStatus('resolved');
    toast.success('Alert marked as resolved');
  };

  const handleNote = () => {
    toast.success('Note added to alert');
  };

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
          <h1 className="text-white">Alert Details</h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto p-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Side - Alert Information */}
          <div className="space-y-6">
            {/* Alert Card */}
            <div className="bg-white/5 backdrop-blur-md rounded-lg p-6 border border-white/10">
              <div className="flex items-start gap-4 mb-6">
                <img
                  src={alert.profilePic}
                  alt={alert.touristName}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h2 className="text-white">{alert.title}</h2>
                    <Badge className={`${getSeverityColor(alert.severity)} text-white border-0`}>
                      {alert.severity}
                    </Badge>
                  </div>
                  <p className="text-gray-400">{alert.touristName}</p>
                  <p className="text-gray-500 text-sm mt-1">{alert.touristId}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-300">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-400">Timestamp</p>
                    <p>{new Date(alert.timestamp).toLocaleString()}</p>
                    <p className="text-sm text-gray-500">
                      {formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-gray-300">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-400">Location</p>
                    <p>Latitude: {alert.location.lat.toFixed(6)}</p>
                    <p>Longitude: {alert.location.lng.toFixed(6)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-gray-300">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-400">Status</p>
                    <Badge variant="outline" className="border-white/20 text-gray-300 mt-1">
                      {status}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white/5 backdrop-blur-md rounded-lg p-6 border border-white/10">
              <h3 className="text-white mb-3">Description</h3>
              <p className="text-gray-300">{alert.description}</p>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                onClick={handleResolve}
                disabled={status === 'resolved'}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Mark as Resolved
              </Button>
              <Button
                onClick={handleNote}
                className="flex-1 bg-[#16365D] hover:bg-[#1a4170] text-white"
              >
                <FileText className="w-4 h-4 mr-2" />
                Add Note
              </Button>
            </div>
          </div>

          {/* Right Side - Map */}
          <div className="bg-white/5 backdrop-blur-md rounded-lg p-6 border border-white/10">
            <h3 className="text-white mb-4">Alert Location</h3>
            <div className="h-[500px]">
              <MapView
                center={alert.location}
                markers={[
                  {
                    position: alert.location,
                    status: alert.severity,
                    label: alert.title
                  }
                ]}
                className="h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
