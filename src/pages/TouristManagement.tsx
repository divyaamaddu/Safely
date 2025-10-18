import React, { useState } from 'react';
import { Logo } from '../components/Logo';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { ScrollArea } from '../components/ui/scroll-area';
import { Badge } from '../components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { ArrowLeft, Search, Filter } from 'lucide-react';
import { mockTourists } from '../utils/mockData';

interface TouristManagementProps {
  onNavigate: (page: string, data?: any) => void;
}

export const TouristManagement: React.FC<TouristManagementProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');

  const filteredTourists = mockTourists.filter(tourist => {
    const matchesSearch =
      tourist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tourist.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || tourist.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
          <h1 className="text-white">Tourist Management</h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto p-6 max-w-4xl">
        {/* Search and Filter */}
        <div className="mb-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search by name or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-gray-500"
            />
          </div>

          <div className="flex items-center gap-3">
            <Filter className="text-gray-400 w-5 h-5" />
            <Select value={statusFilter} onValueChange={(value: any) => setStatusFilter(value)}>
              <SelectTrigger className="w-48 bg-white/5 border-white/20 text-white">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tourists</SelectItem>
                <SelectItem value="active">Active Only</SelectItem>
                <SelectItem value="inactive">Inactive Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Tourist List */}
        <div className="bg-white/5 backdrop-blur-md rounded-lg border border-white/10 overflow-hidden">
          <div className="p-4 border-b border-white/10">
            <h2 className="text-white">
              Tourists ({filteredTourists.length})
            </h2>
          </div>

          <ScrollArea className="h-[calc(100vh-280px)]">
            <div className="divide-y divide-white/10">
              {filteredTourists.length === 0 ? (
                <div className="text-center text-gray-400 py-12">
                  No tourists found
                </div>
              ) : (
                filteredTourists.map(tourist => (
                  <div
                    key={tourist.id}
                    onClick={() => onNavigate('tourist-profile', tourist)}
                    className="p-4 hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={tourist.profilePic}
                        alt={tourist.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white mb-1">{tourist.name}</h3>
                        <p className="text-gray-400 text-sm">{tourist.id}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right mr-4">
                          <p className="text-gray-400 text-xs">Location</p>
                          <p className="text-gray-300 text-sm">
                            {tourist.location.lat.toFixed(2)}, {tourist.location.lng.toFixed(2)}
                          </p>
                        </div>
                        <Badge
                          className={`${
                            tourist.status === 'active'
                              ? 'bg-green-500'
                              : 'bg-gray-500'
                          } text-white border-0`}
                        >
                          {tourist.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};
