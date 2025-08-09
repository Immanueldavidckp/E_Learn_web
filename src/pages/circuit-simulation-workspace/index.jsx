import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import NavigationSidebar from '../../components/ui/NavigationSidebar';
import UserProfileDropdown from '../../components/ui/UserProfileDropdown';
import ComponentLibrary from './components/ComponentLibrary';
import SimulationCanvas from './components/SimulationCanvas';
import PropertiesPanel from './components/PropertiesPanel';
import SimulationToolbar from './components/SimulationToolbar';
import Icon from '../../components/AppIcon';

const CircuitSimulationWorkspace = () => {
  const [isSimulationRunning, setIsSimulationRunning] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [simulationSpeed, setSimulationSpeed] = useState(1);
  const [isComponentLibraryCollapsed, setIsComponentLibraryCollapsed] = useState(false);
  const [isPropertiesPanelCollapsed, setIsPropertiesPanelCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState('canvas');

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // Auto-collapse panels on smaller screens
      if (window.innerWidth < 1024) {
        setIsComponentLibraryCollapsed(true);
        setIsPropertiesPanelCollapsed(true);
      } else {
        setIsComponentLibraryCollapsed(false);
        setIsPropertiesPanelCollapsed(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSimulationToggle = () => {
    setIsSimulationRunning(!isSimulationRunning);
  };

  const handleReset = () => {
    setIsSimulationRunning(false);
    setSelectedComponent(null);
  };

  const handleSave = () => {
    console.log('Saving project...');
  };

  const handleLoad = () => {
    console.log('Loading project...');
  };

  const handleComponentDrop = (component, position) => {
    console.log('Component dropped:', component, 'at position:', position);
  };

  const handleComponentSelect = (component) => {
    setSelectedComponent(component);
  };

  const handleComponentDrag = (component) => {
    console.log('Component being dragged:', component);
  };

  // Mobile tab navigation
  const mobileTabItems = [
    { id: 'components', label: 'Components', icon: 'Package' },
    { id: 'canvas', label: 'Canvas', icon: 'Grid3x3' },
    { id: 'tools', label: 'Tools', icon: 'Settings' }
  ];

  if (isMobile) {
    return (
      <div className="min-h-screen bg-background">
        <Helmet>
          <title>Circuit Simulation Workspace - EmbedSim Learning Platform</title>
          <meta name="description" content="Design, build, and test embedded circuits virtually with our interactive simulation workspace" />
        </Helmet>

        {/* Mobile Header */}
        <div className="bg-card border-b border-border px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Cpu" size={20} color="white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-foreground">Circuit Simulator</h1>
                <p className="text-xs text-muted-foreground">LED Blink Circuit</p>
              </div>
            </div>
            <UserProfileDropdown />
          </div>
        </div>

        {/* Mobile Content */}
        <div className="h-[calc(100vh-140px)] overflow-hidden">
          {activeTab === 'components' && (
            <ComponentLibrary
              onComponentDrag={handleComponentDrag}
              isCollapsed={false}
              onToggleCollapse={() => {}}
            />
          )}
          
          {activeTab === 'canvas' && (
            <div className="h-full flex flex-col">
              <SimulationToolbar
                isSimulationRunning={isSimulationRunning}
                onSimulationToggle={handleSimulationToggle}
                onReset={handleReset}
                onSave={handleSave}
                onLoad={handleLoad}
                simulationSpeed={simulationSpeed}
                onSpeedChange={setSimulationSpeed}
              />
              <SimulationCanvas
                isSimulationRunning={isSimulationRunning}
                onComponentDrop={handleComponentDrop}
                selectedComponent={selectedComponent}
                onComponentSelect={handleComponentSelect}
                zoomLevel={zoomLevel}
                onZoomChange={setZoomLevel}
              />
            </div>
          )}
          
          {activeTab === 'tools' && (
            <PropertiesPanel
              selectedComponent={selectedComponent}
              isCollapsed={false}
              onToggleCollapse={() => {}}
              isSimulationRunning={isSimulationRunning}
            />
          )}
        </div>

        {/* Mobile Tab Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
          <div className="flex justify-around items-center h-16 px-2">
            {mobileTabItems.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center justify-center p-2 rounded-lg transition-smooth ${
                  activeTab === tab.id
                    ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={tab.icon} size={20} />
                <span className="text-xs mt-1 font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      <Helmet>
        <title>Circuit Simulation Workspace - EmbedSim Learning Platform</title>
        <meta name="description" content="Design, build, and test embedded circuits virtually with our interactive simulation workspace" />
      </Helmet>

      {/* Navigation Sidebar */}
      <NavigationSidebar />

      {/* Main Content */}
      <div className={`flex-1 flex flex-col ${isMobile ? '' : 'ml-16 lg:ml-60'}`}>
        {/* Top Header */}
        <div className="bg-card border-b border-border px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-foreground">Circuit Simulation Workspace</h1>
              <div className="flex items-center space-x-2 px-3 py-1.5 bg-background border border-border rounded-lg">
                <div className={`w-2 h-2 rounded-full ${
                  isSimulationRunning ? 'bg-success animate-pulse' : 'bg-muted-foreground'
                }`}></div>
                <span className="text-sm text-muted-foreground">
                  {isSimulationRunning ? 'Simulation Active' : 'Ready'}
                </span>
              </div>
            </div>
            <UserProfileDropdown />
          </div>
        </div>

        {/* Simulation Toolbar */}
        <SimulationToolbar
          isSimulationRunning={isSimulationRunning}
          onSimulationToggle={handleSimulationToggle}
          onReset={handleReset}
          onSave={handleSave}
          onLoad={handleLoad}
          simulationSpeed={simulationSpeed}
          onSpeedChange={setSimulationSpeed}
        />

        {/* Workspace Layout */}
        <div className="flex-1 flex overflow-hidden">
          {/* Component Library */}
          <ComponentLibrary
            onComponentDrag={handleComponentDrag}
            isCollapsed={isComponentLibraryCollapsed}
            onToggleCollapse={() => setIsComponentLibraryCollapsed(!isComponentLibraryCollapsed)}
          />

          {/* Main Canvas Area */}
          <SimulationCanvas
            isSimulationRunning={isSimulationRunning}
            onComponentDrop={handleComponentDrop}
            selectedComponent={selectedComponent}
            onComponentSelect={handleComponentSelect}
            zoomLevel={zoomLevel}
            onZoomChange={setZoomLevel}
          />

          {/* Properties Panel */}
          <PropertiesPanel
            selectedComponent={selectedComponent}
            isCollapsed={isPropertiesPanelCollapsed}
            onToggleCollapse={() => setIsPropertiesPanelCollapsed(!isPropertiesPanelCollapsed)}
            isSimulationRunning={isSimulationRunning}
          />
        </div>
      </div>

      {/* Keyboard Shortcuts Help */}
      <div className="fixed bottom-4 left-4 bg-card border border-border rounded-lg p-3 shadow-elevated hidden lg:block">
        <div className="text-xs text-muted-foreground space-y-1">
          <div><kbd className="px-1 py-0.5 bg-muted rounded text-xs">Space</kbd> Run/Stop</div>
          <div><kbd className="px-1 py-0.5 bg-muted rounded text-xs">R</kbd> Reset</div>
          <div><kbd className="px-1 py-0.5 bg-muted rounded text-xs">Ctrl+S</kbd> Save</div>
          <div><kbd className="px-1 py-0.5 bg-muted rounded text-xs">Del</kbd> Delete</div>
        </div>
      </div>
    </div>
  );
};

export default CircuitSimulationWorkspace;