import React, { useState } from 'react';
import { Toaster } from './components/ui/sonner';
import { SignIn } from './pages/SignIn';
import { Dashboard } from './pages/Dashboard';
import { AlertsTripsOverview } from './pages/AlertsTripsOverview';
import { TripDetails } from './pages/TripDetails';
import { AlertCategories } from './pages/AlertCategories';
import { AlertDetail } from './pages/AlertDetail';
import { TouristManagement } from './pages/TouristManagement';
import { TouristProfile } from './pages/TouristProfile';

type PageType =
  | 'signin'
  | 'dashboard'
  | 'alerts-trips'
  | 'trip-detail'
  | 'alert-categories'
  | 'alert-detail'
  | 'tourist-management'
  | 'tourist-profile';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('signin');
  const [pageData, setPageData] = useState<any>(null);

  const handleNavigate = (page: string, data?: any) => {
    setCurrentPage(page as PageType);
    setPageData(data || null);
    window.scrollTo(0, 0);
  };

  const handleSignIn = () => {
    setCurrentPage('dashboard');
  };

  return (
    <div className="min-h-screen no-resize-white-space prevent-gaps">
      {currentPage === 'signin' && <SignIn onSignIn={handleSignIn} />}
      {currentPage === 'dashboard' && <Dashboard onNavigate={handleNavigate} />}
      {currentPage === 'alerts-trips' && <AlertsTripsOverview onNavigate={handleNavigate} />}
      {currentPage === 'trip-detail' && pageData && <TripDetails trip={pageData} onNavigate={handleNavigate} />}
      {currentPage === 'alert-categories' && <AlertCategories onNavigate={handleNavigate} />}
      {currentPage === 'alert-detail' && pageData && <AlertDetail alert={pageData} onNavigate={handleNavigate} />}
      {currentPage === 'tourist-management' && <TouristManagement onNavigate={handleNavigate} />}
      {currentPage === 'tourist-profile' && pageData && <TouristProfile tourist={pageData} onNavigate={handleNavigate} />}
      <Toaster />
    </div>
  );
}
