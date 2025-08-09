import React, { useState, useEffect } from 'react';
import NavigationSidebar from '../../components/ui/NavigationSidebar';
import WorkspaceToolbar from '../../components/ui/WorkspaceToolbar';
import UserProfileDropdown from '../../components/ui/UserProfileDropdown';
import ProgressIndicator from '../../components/ui/ProgressIndicator';
import SearchBar from './components/SearchBar';
import CategoryChips from './components/CategoryChips';
import ComponentCard from './components/ComponentCard';
import FilterSidebar from './components/FilterSidebar';
import ComponentDetailModal from './components/ComponentDetailModal';
import QuickAccessPanel from './components/QuickAccessPanel';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ComponentLibraryBrowser = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [sortBy, setSortBy] = useState('name');
  const [filters, setFilters] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  // Mock data for components
  const mockComponents = [
    {
      id: 1,
      name: "Arduino Uno R3",
      description: "Microcontroller board based on the ATmega328P with 14 digital I/O pins and 6 analog inputs",
      category: "microcontrollers",
      image: "https://images.unsplash.com/photo-1553406830-ef2513450d76?w=400&h=300&fit=crop",
      voltage: "5V",
      interface: "USB, Digital, Analog",
      price: "24.95",
      manufacturer: "Arduino",
      compatibility: ["Arduino IDE", "PlatformIO", "CircuitPython"],
      difficulty: "beginner",
      rating: 4.8,
      isNew: false,
      isFavorite: false
    },
    {
      id: 2,
      name: "DHT22 Temperature Sensor",
      description: "Digital temperature and humidity sensor with high accuracy and long-term stability",
      category: "sensors",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop",
      voltage: "3.3V - 5V",
      interface: "Digital",
      price: "9.95",
      manufacturer: "Adafruit",
      compatibility: ["Arduino", "Raspberry Pi", "ESP32"],
      difficulty: "beginner",
      rating: 4.6,
      isNew: true,
      isFavorite: true
    },
    {
      id: 3,
      name: "Servo Motor SG90",
      description: "Micro servo motor with precise position control for robotics and automation projects",
      category: "actuators",
      image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop",
      voltage: "4.8V - 6V",
      interface: "PWM",
      price: "5.99",
      manufacturer: "TowerPro",
      compatibility: ["Arduino", "Raspberry Pi", "Micro:bit"],
      difficulty: "beginner",
      rating: 4.4,
      isNew: false,
      isFavorite: false
    },
    {
      id: 4,
      name: "ESP32 DevKit",
      description: "WiFi and Bluetooth enabled microcontroller with dual-core processor and rich peripherals",
      category: "communication",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      voltage: "3.3V",
      interface: "WiFi, Bluetooth, I2C, SPI",
      price: "12.99",
      manufacturer: "Espressif",
      compatibility: ["Arduino IDE", "ESP-IDF", "MicroPython"],
      difficulty: "intermediate",
      rating: 4.7,
      isNew: true,
      isFavorite: true
    },
    {
      id: 5,
      name: "OLED Display 128x64",
      description: "High contrast OLED display with I2C interface for clear text and graphics display",
      category: "displays",
      image: "https://images.unsplash.com/photo-1551808525-51a94da548ce?w=400&h=300&fit=crop",
      voltage: "3.3V - 5V",
      interface: "I2C",
      price: "8.50",
      manufacturer: "Adafruit",
      compatibility: ["Arduino", "Raspberry Pi", "ESP32"],
      difficulty: "intermediate",
      rating: 4.5,
      isNew: false,
      isFavorite: false
    },
    {
      id: 6,
      name: "Ultrasonic Sensor HC-SR04",
      description: "Non-contact distance measurement sensor with 2cm to 400cm detection range",
      category: "sensors",
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&h=300&fit=crop",
      voltage: "5V",
      interface: "Digital",
      price: "3.99",
      manufacturer: "Generic",
      compatibility: ["Arduino", "Raspberry Pi", "Micro:bit"],
      difficulty: "beginner",
      rating: 4.3,
      isNew: false,
      isFavorite: false
    },
    {
      id: 7,
      name: "L298N Motor Driver",
      description: "Dual H-bridge motor driver for controlling DC motors and stepper motors up to 2A",
      category: "actuators",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop",
      voltage: "5V - 35V",
      interface: "Digital",
      price: "6.75",
      manufacturer: "STMicroelectronics",
      compatibility: ["Arduino", "Raspberry Pi", "ESP32"],
      difficulty: "intermediate",
      rating: 4.6,
      isNew: false,
      isFavorite: true
    },
    {
      id: 8,
      name: "Breadboard 830 Points",
      description: "Solderless breadboard for prototyping electronic circuits with 830 tie points",
      category: "passive",
      image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop",
      voltage: "N/A",
      interface: "Mechanical",
      price: "4.25",
      manufacturer: "Generic",
      compatibility: ["Universal"],
      difficulty: "beginner",
      rating: 4.2,
      isNew: false,
      isFavorite: false
    }
  ];

  const categories = [
    { id: 'all', name: 'All Components', count: mockComponents.length },
    { id: 'microcontrollers', name: 'Microcontrollers', count: mockComponents.filter(c => c.category === 'microcontrollers').length },
    { id: 'sensors', name: 'Sensors', count: mockComponents.filter(c => c.category === 'sensors').length },
    { id: 'actuators', name: 'Actuators', count: mockComponents.filter(c => c.category === 'actuators').length },
    { id: 'communication', name: 'Communication', count: mockComponents.filter(c => c.category === 'communication').length },
    { id: 'displays', name: 'Displays', count: mockComponents.filter(c => c.category === 'displays').length },
    { id: 'passive', name: 'Passive', count: mockComponents.filter(c => c.category === 'passive').length }
  ];

  // Initialize favorites and recently viewed from localStorage
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('componentFavorites') || '[]');
    const savedRecent = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
    setFavorites(savedFavorites);
    setRecentlyViewed(savedRecent);
  }, []);

  // Filter and sort components
  const filteredComponents = mockComponents.filter(component => {
    // Search filter
    if (searchQuery && !component.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !component.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Category filter
    if (selectedCategory !== 'all' && component.category !== selectedCategory) {
      return false;
    }

    return true;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'price':
        return parseFloat(a.price) - parseFloat(b.price);
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleFilterChange = (section, optionId, checked) => {
    if (section === 'clear') {
      setFilters({});
      return;
    }

    setFilters(prev => ({
      ...prev,
      [section]: checked
        ? [...(prev[section] || []), optionId]
        : (prev[section] || []).filter(id => id !== optionId)
    }));
  };

  const handleViewDetails = (component) => {
    setSelectedComponent(component);
    setIsDetailModalOpen(true);
    
    // Add to recently viewed
    const updatedRecent = [component, ...recentlyViewed.filter(c => c.id !== component.id)].slice(0, 10);
    setRecentlyViewed(updatedRecent);
    localStorage.setItem('recentlyViewed', JSON.stringify(updatedRecent));
  };

  const handleAddToFavorites = (componentId) => {
    const component = mockComponents.find(c => c.id === componentId);
    if (!component) return;

    const isFavorite = favorites.some(f => f.id === componentId);
    let updatedFavorites;

    if (isFavorite) {
      updatedFavorites = favorites.filter(f => f.id !== componentId);
    } else {
      updatedFavorites = [...favorites, component];
    }

    setFavorites(updatedFavorites);
    localStorage.setItem('componentFavorites', JSON.stringify(updatedFavorites));

    // Update component favorite status
    component.isFavorite = !isFavorite;
  };

  const handleAddToProject = (component) => {
    console.log('Adding component to project:', component.name);
    // This would integrate with the circuit simulation workspace
    alert(`${component.name} added to your current project!`);
  };

  const handleComponentSelect = (component) => {
    handleViewDetails(component);
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationSidebar />
      
      <div className="lg:ml-60 pb-16 lg:pb-0">
        <WorkspaceToolbar />
        
        <div className="flex">
          {/* Filter Sidebar */}
          <FilterSidebar
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            filters={filters}
            onFilterChange={handleFilterChange}
          />

          {/* Main Content */}
          <div className="flex-1 p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Component Library</h1>
                <p className="text-muted-foreground mt-1">
                  Discover and explore embedded system components for your projects
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <ProgressIndicator className="hidden lg:block" />
                <UserProfileDropdown />
              </div>
            </div>

            {/* Search Bar */}
            <SearchBar
              onSearch={handleSearch}
              searchQuery={searchQuery}
              onClearSearch={handleClearSearch}
            />

            {/* Category Chips */}
            <CategoryChips
              categories={categories}
              selectedCategory={selectedCategory}
              onCategorySelect={handleCategorySelect}
            />

            {/* Quick Access Panel */}
            <QuickAccessPanel
              favorites={favorites}
              recentlyViewed={recentlyViewed}
              onComponentSelect={handleComponentSelect}
            />

            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="SlidersHorizontal"
                  onClick={() => setIsFilterOpen(true)}
                  className="lg:hidden"
                >
                  Filters
                </Button>
                
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-1 border border-border rounded-lg bg-input text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="name">Name</option>
                    <option value="price">Price</option>
                    <option value="rating">Rating</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">
                  {filteredComponents.length} components
                </span>
                
                <div className="flex items-center border border-border rounded-lg">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-l-lg transition-smooth ${
                      viewMode === 'grid' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon name="Grid3X3" size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-r-lg transition-smooth ${
                      viewMode === 'list' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon name="List" size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Components Grid */}
            {filteredComponents.length > 0 ? (
              <div className={`grid gap-6 ${
                viewMode === 'grid' ?'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' :'grid-cols-1'
              }`}>
                {filteredComponents.map((component) => (
                  <ComponentCard
                    key={component.id}
                    component={{
                      ...component,
                      isFavorite: favorites.some(f => f.id === component.id)
                    }}
                    onViewDetails={handleViewDetails}
                    onAddToFavorites={handleAddToFavorites}
                    onAddToProject={handleAddToProject}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No components found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search terms or filters to find what you're looking for.
                </p>
                <Button variant="outline" onClick={handleClearSearch}>
                  Clear Search
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Component Detail Modal */}
      <ComponentDetailModal
        component={selectedComponent}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onAddToProject={handleAddToProject}
      />
    </div>
  );
};

export default ComponentLibraryBrowser;