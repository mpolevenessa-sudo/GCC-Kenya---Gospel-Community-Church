
import React, { useState } from 'react';
import MobileHeader from './components/layout/MobileHeader';
import BottomNav from './components/layout/BottomNav';
import HomeScreen from './screens/HomeScreen';
import DiscoverScreen from './screens/DiscoverScreen';
import BibleScreen from './screens/BibleScreen';
import PlansScreen from './screens/PlansScreen';
import ProfileScreen from './screens/ProfileScreen';

/**
 * Main Application Component
 * Handles the high-level tab state and screen rendering for a mobile app experience.
 */
const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');

  // Helper to determine the page title based on active tab
  const getHeaderTitle = () => {
    switch (activeTab) {
      case 'home': return 'GCC Kenya';
      case 'bible': return 'The Word';
      case 'discover': return 'Discover';
      case 'plans': return 'My Plans';
      case 'profile': return 'My Profile';
      default: return 'GCC Kenya';
    }
  };

  // Render the appropriate screen component
  const renderScreen = () => {
    switch (activeTab) {
      case 'home': return <HomeScreen />;
      case 'bible': return <BibleScreen />;
      case 'discover': return <DiscoverScreen />;
      case 'plans': return <PlansScreen />;
      case 'profile': return <ProfileScreen />;
      default: return <HomeScreen />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-primary-100">
      {/* Top Mobile-style Header */}
      <MobileHeader title={getHeaderTitle()} />

      {/* Main Content Area */}
      <main className="flex-1 overflow-x-hidden">
        {renderScreen()}
      </main>

      {/* Bottom Mobile-style Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default App;
