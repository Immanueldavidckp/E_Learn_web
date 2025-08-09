import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '../../contexts/AuthContext';
import NavigationSidebar from '../../components/ui/NavigationSidebar';
import UserProfileDropdown from '../../components/ui/UserProfileDropdown';
import Icon from '../../components/AppIcon';
import Input from '../../components/ui/Input';
import ProgressOverviewCard from './components/ProgressOverviewCard';
import ContinueLearningSection from './components/ContinueLearningSection';
import RecommendedContentSection from './components/RecommendedContentSection';
import QuickAccessTiles from './components/QuickAccessTiles';
import SidebarWidget from './components/SidebarWidget';
import ContentFilters from './components/ContentFilters';

const LearningDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    contentType: 'all',
    difficulty: 'all',
    duration: 'all'
  });
  
  const { user, userProfile, loading: authLoading } = useAuth();

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const SkeletonCard = ({ className = '' }) => (
    <div className={`bg-card border border-border rounded-lg p-6 animate-pulse ${className}`}>
      <div className="space-y-4">
        <div className="h-4 bg-muted rounded w-3/4"></div>
        <div className="h-4 bg-muted rounded w-1/2"></div>
        <div className="h-32 bg-muted rounded"></div>
        <div className="h-4 bg-muted rounded w-2/3"></div>
      </div>
    </div>
  );

  // Show loading while auth or data is loading
  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Helmet>
          <title>Learning Dashboard - EmbedSim Learning Platform</title>
          <meta name="description" content="Track your progress and continue learning embedded systems with interactive lessons and simulations." />
        </Helmet>

        <NavigationSidebar />
        
        <div className="ml-0 md:ml-16 lg:ml-60 pb-16 md:pb-0">
          {/* Header */}
          <header className="bg-surface border-b border-border px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 flex-1">
                <h1 className="text-2xl font-semibold text-foreground">Learning Dashboard</h1>
              </div>
              <UserProfileDropdown />
            </div>
          </header>

          {/* Loading Content */}
          <main className="p-6">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3 space-y-6">
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                </div>
                <div className="space-y-6">
                  <SkeletonCard />
                  <SkeletonCard />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // Get user display name from auth context
  const displayName = userProfile?.full_name?.split(' ')[0] || 
                    userProfile?.username || 
                    user?.email?.split('@')[0] || 
                    'there';

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Learning Dashboard - EmbedSim Learning Platform</title>
        <meta name="description" content="Track your progress and continue learning embedded systems with interactive lessons and simulations." />
        <meta name="keywords" content="embedded systems, learning dashboard, progress tracking, circuit simulation, programming" />
      </Helmet>

      <NavigationSidebar />
      
      <div className="ml-0 md:ml-16 lg:ml-60 pb-16 md:pb-0">
        {/* Header */}
        <header className="bg-surface border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 flex-1">
              <h1 className="text-2xl font-semibold text-foreground">Learning Dashboard</h1>
              
              {/* Search Bar */}
              <div className="hidden md:block flex-1 max-w-md">
                <div className="relative">
                  <Icon 
                    name="Search" 
                    size={18} 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
                  />
                  <Input
                    type="search"
                    placeholder="Search lessons, simulations, projects..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth">
                <Icon name="Bell" size={20} />
              </button>
              <UserProfileDropdown />
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden mt-4">
            <div className="relative">
              <Icon 
                name="Search" 
                size={18} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
              />
              <Input
                type="search"
                placeholder="Search lessons, simulations..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-10"
              />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Message */}
            <div className="mb-8">
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-border rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-foreground mb-2">
                      Welcome back, {displayName}! 👋
                    </h2>
                    <p className="text-muted-foreground">
                      You're making great progress. Ready to continue your embedded systems journey?
                    </p>
                  </div>
                  <div className="hidden md:block">
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                      <Icon name="Rocket" size={32} className="text-primary" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Filters */}
            <ContentFilters onFilterChange={handleFilterChange} />

            {/* Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Main Content Area */}
              <div className="lg:col-span-3 space-y-8">
                {/* Progress Overview */}
                <ProgressOverviewCard />

                {/* Quick Access Tiles */}
                <QuickAccessTiles />

                {/* Continue Learning */}
                <ContinueLearningSection />

                {/* Recommended Content */}
                <RecommendedContentSection />
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <SidebarWidget />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LearningDashboard;