import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PropertiesPanel = ({ selectedComponent, isCollapsed, onToggleCollapse, isSimulationRunning }) => {
  const [activeTab, setActiveTab] = useState('properties');
  const [oscilloscopeData, setOscilloscopeData] = useState([]);
  const [logicAnalyzerData, setLogicAnalyzerData] = useState([]);

  // Mock component properties
  const componentProperties = selectedComponent ? {
    resistor: [
      { name: 'Resistance', value: '1000', unit: 'Ω', type: 'number' },
      { name: 'Tolerance', value: '5', unit: '%', type: 'number' },
      { name: 'Power Rating', value: '0.25', unit: 'W', type: 'number' }
    ],
    led: [
      { name: 'Forward Voltage', value: '2.1', unit: 'V', type: 'number' },
      { name: 'Forward Current', value: '20', unit: 'mA', type: 'number' },
      { name: 'Color', value: 'Red', unit: '', type: 'select', options: ['Red', 'Green', 'Blue', 'Yellow'] }
    ],
    arduino_uno: [
      { name: 'Clock Speed', value: '16', unit: 'MHz', type: 'number' },
      { name: 'Flash Memory', value: '32', unit: 'KB', type: 'number' },
      { name: 'SRAM', value: '2', unit: 'KB', type: 'number' },
      { name: 'EEPROM', value: '1', unit: 'KB', type: 'number' }
    ]
  }[selectedComponent?.type] || [] : [];

  // Mock oscilloscope data
  React.useEffect(() => {
    if (isSimulationRunning) {
      const interval = setInterval(() => {
        const time = Date.now();
        const newData = Array.from({ length: 100 }, (_, i) => ({
          time: time + i * 10,
          voltage: 2.5 + 2 * Math.sin((time + i * 10) / 1000) + 0.5 * Math.random()
        }));
        setOscilloscopeData(newData);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isSimulationRunning]);

  const tabs = [
    { id: 'properties', name: 'Properties', icon: 'Settings' },
    { id: 'oscilloscope', name: 'Oscilloscope', icon: 'Activity' },
    { id: 'logic', name: 'Logic Analyzer', icon: 'BarChart3' },
    { id: 'measurements', name: 'Measurements', icon: 'Ruler' }
  ];

  if (isCollapsed) {
    return (
      <div className="w-12 bg-card border-l border-border h-full flex flex-col">
        <button
          onClick={onToggleCollapse}
          className="p-3 hover:bg-muted transition-smooth border-b border-border"
          title="Expand Properties Panel"
        >
          <Icon name="ChevronLeft" size={18} />
        </button>
        <div className="flex-1 flex flex-col items-center py-4 space-y-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                onToggleCollapse();
              }}
              className={`p-2 rounded-lg transition-smooth ${
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
              title={tab.name}
            >
              <Icon name={tab.icon} size={16} />
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 bg-card border-l border-border h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-foreground">Tools & Properties</h2>
          <button
            onClick={onToggleCollapse}
            className="p-1 hover:bg-muted rounded transition-smooth"
            title="Collapse Properties Panel"
          >
            <Icon name="ChevronRight" size={16} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <div className="flex overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium whitespace-nowrap transition-smooth ${
                activeTab === tab.id
                  ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={tab.icon} size={14} />
              <span className="hidden lg:inline">{tab.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'properties' && (
          <div className="p-4">
            {selectedComponent ? (
              <div className="space-y-4">
                <div className="bg-background border border-border rounded-lg p-3">
                  <h3 className="font-medium text-foreground mb-2">Component Info</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Type:</span>
                      <span className="text-foreground capitalize">{selectedComponent.type.replace('_', ' ')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Name:</span>
                      <span className="text-foreground">{selectedComponent.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">ID:</span>
                      <span className="text-foreground font-mono">{selectedComponent.id}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-medium text-foreground">Properties</h3>
                  {componentProperties.map((prop, index) => (
                    <div key={index}>
                      <Input
                        label={prop.name}
                        type={prop.type === 'number' ? 'number' : 'text'}
                        value={prop.value}
                        onChange={() => {}}
                        className="mb-2"
                      />
                      {prop.unit && (
                        <span className="text-xs text-muted-foreground ml-2">{prop.unit}</span>
                      )}
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-border">
                  <Button variant="outline" size="sm" className="w-full">
                    <Icon name="Copy" size={14} className="mr-2" />
                    Duplicate Component
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Icon name="MousePointer" size={32} className="mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">Select a component to view properties</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'oscilloscope' && (
          <div className="p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-foreground">Oscilloscope</h3>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Icon name="Play" size={14} />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Icon name="Square" size={14} />
                  </Button>
                </div>
              </div>

              {/* Oscilloscope Display */}
              <div className="bg-black border border-border rounded-lg p-4 h-48 relative">
                <div className="w-full h-full relative">
                  {/* Grid */}
                  <svg className="absolute inset-0 w-full h-full">
                    <defs>
                      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#22c55e" strokeWidth="0.5" opacity="0.3"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>
                  
                  {/* Waveform */}
                  {isSimulationRunning && oscilloscopeData.length > 0 && (
                    <svg className="absolute inset-0 w-full h-full">
                      <polyline
                        fill="none"
                        stroke="#22c55e"
                        strokeWidth="2"
                        points={oscilloscopeData.map((point, i) => 
                          `${(i / oscilloscopeData.length) * 100}%,${50 - (point.voltage / 5) * 40}%`
                        ).join(' ')}
                      />
                    </svg>
                  )}
                  
                  {!isSimulationRunning && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-green-500 text-sm">Start simulation to view waveform</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Controls */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Input
                    label="Time/Div"
                    type="text"
                    value="1ms"
                    onChange={() => {}}
                    className="text-sm"
                  />
                </div>
                <div>
                  <Input
                    label="Voltage/Div"
                    type="text"
                    value="1V"
                    onChange={() => {}}
                    className="text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'logic' && (
          <div className="p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-foreground">Logic Analyzer</h3>
                <Button variant="outline" size="sm">
                  <Icon name="Settings" size={14} />
                </Button>
              </div>

              {/* Logic Analyzer Display */}
              <div className="bg-black border border-border rounded-lg p-4 h-32">
                <div className="space-y-2">
                  {['CH1', 'CH2', 'CH3', 'CH4'].map((channel, index) => (
                    <div key={channel} className="flex items-center space-x-2">
                      <span className="text-green-500 text-xs w-8">{channel}</span>
                      <div className="flex-1 h-4 bg-gray-900 rounded relative">
                        {isSimulationRunning && (
                          <div 
                            className="h-full bg-green-500 transition-all duration-1000"
                            style={{ 
                              width: `${Math.random() * 100}%`,
                              animation: `pulse 2s infinite ${index * 0.5}s`
                            }}
                          ></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-xs text-muted-foreground">
                <p>Sampling Rate: 1 MSa/s</p>
                <p>Buffer Depth: 1K samples</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'measurements' && (
          <div className="p-4">
            <div className="space-y-4">
              <h3 className="font-medium text-foreground">Measurements</h3>
              
              <div className="space-y-3">
                {[
                  { label: 'Voltage (V1)', value: '3.3V', color: 'text-green-600' },
                  { label: 'Current (I1)', value: '15.2mA', color: 'text-blue-600' },
                  { label: 'Power (P1)', value: '50.16mW', color: 'text-orange-600' },
                  { label: 'Frequency', value: '1.0kHz', color: 'text-purple-600' },
                  { label: 'Duty Cycle', value: '50%', color: 'text-teal-600' }
                ].map((measurement, index) => (
                  <div key={index} className="bg-background border border-border rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">{measurement.label}</span>
                      <span className={`text-sm font-mono font-medium ${measurement.color}`}>
                        {isSimulationRunning ? measurement.value : '--'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-border">
                <Button variant="outline" size="sm" className="w-full">
                  <Icon name="Download" size={14} className="mr-2" />
                  Export Data
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertiesPanel;