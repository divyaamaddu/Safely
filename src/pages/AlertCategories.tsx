import React, { useState } from 'react';
import { Logo } from '../components/Logo';
import { Button } from '../components/ui/button';
import { ScrollArea } from '../components/ui/scroll-area';
import { Badge } from '../components/ui/badge';
import { ArrowLeft, Circle, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { mockAlerts } from '../utils/mockData';
import { formatDistanceToNow } from '../utils/dateUtils';

interface AlertCategoriesProps {
  onNavigate: (page: string, data?: any) => void;
}

export const AlertCategories: React.FC<AlertCategoriesProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<'active' | 'inactive' | 'pending' | 'resolved'>('active');

  const categories = [
    { id: 'active' as const, label: 'Active', icon: Circle, color: 'text-green-500', count: mockAlerts.filter(a => a.status === 'active').length },
    { id: 'inactive' as const, label: 'Inactive', icon: XCircle, color: 'text-gray-400', count: mockAlerts.filter(a => a.status === 'inactive').length },
    { id: 'pending' as const, label: 'Pending', icon: Clock, color: 'text-yellow-500', count: mockAlerts.filter(a => a.status === 'pending').length },
    { id: 'resolved' as const, label: 'Resolved', icon: CheckCircle2, color: 'text-blue-500', count: mockAlerts.filter(a => a.status === 'resolved').length }
  ];

  const filteredAlerts = mockAlerts.filter(alert => alert.status === selectedCategory);

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
          <h1 className="text-white">Alert Categories</h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row h-[calc(100vh-73px)]">
        {/* Left Side - Categories */}
        <div className="lg:w-80 bg-white/5 backdrop-blur-md border-r border-white/10 p-4">
          <h2 className="text-white mb-4">Categories</h2>
          <div className="space-y-2">
            {categories.map(category => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full flex items-center justify-between p-4 rounded-lg transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-[#16365D] text-white'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${selectedCategory === category.id ? 'text-white' : category.color}`} />
                    <span>{category.label}</span>
                  </div>
                  <Badge className={`${
                    selectedCategory === category.id
                      ? 'bg-white/20 text-white'
                      : 'bg-white/10 text-gray-400'
                  } border-0`}>
                    {category.count}
                  </Badge>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side - Alert List */}
        <div className="flex-1 flex flex-col">
          <div className="p-4 bg-white/5 backdrop-blur-md border-b border-white/10">
            <h2 className="text-white">
              {categories.find(c => c.id === selectedCategory)?.label} Alerts
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              {filteredAlerts.length} alert{filteredAlerts.length !== 1 ? 's' : ''}
            </p>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-4">
              {filteredAlerts.length === 0 ? (
                <div className="text-center text-gray-400 py-12">
                  No {selectedCategory} alerts
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filteredAlerts.map(alert => (
                    <div
                      key={alert.id}
                      onClick={() => onNavigate('alert-detail', alert)}
                      className="bg-white/5 backdrop-blur-md rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
                    >
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
                        <Badge className={`${getSeverityColor(alert.severity)} text-white border-0 shrink-0`}>
                          {alert.severity}
                        </Badge>
                      </div>
                      <p className="text-gray-300 text-sm mb-3 line-clamp-2">{alert.description}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-gray-500 text-xs">
                          {formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}
                        </p>
                        <p className="text-gray-500 text-xs">
                          {alert.location.lat.toFixed(4)}, {alert.location.lng.toFixed(4)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};
