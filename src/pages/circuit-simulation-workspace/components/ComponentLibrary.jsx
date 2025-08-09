import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ComponentLibrary = ({ onComponentDrag, isCollapsed, onToggleCollapse }) => {
  const [activeCategory, setActiveCategory] = useState('basic');
  const [searchTerm, setSearchTerm] = useState('');

  const componentCategories = [
    {
      id: 'basic',
      name: 'Basic Components',
      icon: 'Zap',
      components: [
        { id: 'resistor', name: 'Resistor', icon: 'Minus', description: 'Passive component that resists current flow' },
        { id: 'capacitor', name: 'Capacitor', icon: 'Battery', description: 'Stores electrical energy' },
        { id: 'inductor', name: 'Inductor', icon: 'Coil', description: 'Stores energy in magnetic field' },
        { id: 'diode', name: 'Diode', icon: 'Triangle', description: 'Allows current in one direction' },
        { id: 'led', name: 'LED', icon: 'Lightbulb', description: 'Light emitting diode' },
        { id: 'switch', name: 'Switch', icon: 'ToggleLeft', description: 'Controls circuit connection' }
      ]
    },
    {
      id: 'active',
      name: 'Active Components',
      icon: 'Cpu',
      components: [
        { id: 'transistor', name: 'Transistor', icon: 'Triangle', description: 'Amplifies or switches signals' },
        { id: 'opamp', name: 'Op-Amp', icon: 'Triangle', description: 'Operational amplifier' },
        { id: 'mosfet', name: 'MOSFET', icon: 'Square', description: 'Metal-oxide semiconductor transistor' },
        { id: 'bjt', name: 'BJT', icon: 'Circle', description: 'Bipolar junction transistor' }
      ]
    },
    {
      id: 'digital',
      name: 'Digital Logic',
      icon: 'Binary',
      components: [
        { id: 'and_gate', name: 'AND Gate', icon: 'Square', description: 'Logical AND operation' },
        { id: 'or_gate', name: 'OR Gate', icon: 'Square', description: 'Logical OR operation' },
        { id: 'not_gate', name: 'NOT Gate', icon: 'Square', description: 'Logical NOT operation' },
        { id: 'nand_gate', name: 'NAND Gate', icon: 'Square', description: 'Logical NAND operation' },
        { id: 'nor_gate', name: 'NOR Gate', icon: 'Square', description: 'Logical NOR operation' },
        { id: 'xor_gate', name: 'XOR Gate', icon: 'Square', description: 'Logical XOR operation' }
      ]
    },
    {
      id: 'microcontroller',
      name: 'Microcontrollers',
      icon: 'Microchip',
      components: [
        { id: 'arduino_uno', name: 'Arduino Uno', icon: 'Cpu', description: 'Popular development board' },
        { id: 'esp32', name: 'ESP32', icon: 'Wifi', description: 'WiFi/Bluetooth microcontroller' },
        { id: 'pic16f', name: 'PIC16F', icon: 'Microchip', description: 'PIC microcontroller family' },
        { id: 'stm32', name: 'STM32', icon: 'Cpu', description: 'ARM Cortex-M microcontroller' }
      ]
    },
    {
      id: 'sensors',
      name: 'Sensors',
      icon: 'Radar',
      components: [
        { id: 'temperature', name: 'Temperature', icon: 'Thermometer', description: 'Temperature sensor' },
        { id: 'humidity', name: 'Humidity', icon: 'Droplets', description: 'Humidity sensor' },
        { id: 'pressure', name: 'Pressure', icon: 'Gauge', description: 'Pressure sensor' },
        { id: 'accelerometer', name: 'Accelerometer', icon: 'Move', description: 'Motion sensor' },
        { id: 'gyroscope', name: 'Gyroscope', icon: 'RotateCw', description: 'Angular velocity sensor' },
        { id: 'ultrasonic', name: 'Ultrasonic', icon: 'Radio', description: 'Distance sensor' }
      ]
    },
    {
      id: 'actuators',
      name: 'Actuators',
      icon: 'Settings',
      components: [
        { id: 'servo_motor', name: 'Servo Motor', icon: 'RotateCw', description: 'Precise position control' },
        { id: 'dc_motor', name: 'DC Motor', icon: 'Fan', description: 'Direct current motor' },
        { id: 'stepper_motor', name: 'Stepper Motor', icon: 'Settings', description: 'Step-by-step rotation' },
        { id: 'buzzer', name: 'Buzzer', icon: 'Volume2', description: 'Audio output device' },
        { id: 'relay', name: 'Relay', icon: 'ToggleLeft', description: 'Electromagnetic switch' }
      ]
    }
  ];

  const filteredComponents = componentCategories.find(cat => cat.id === activeCategory)?.components.filter(comp =>
    comp.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const handleDragStart = (e, component) => {
    e.dataTransfer.setData('application/json', JSON.stringify(component));
    onComponentDrag && onComponentDrag(component);
  };

  if (isCollapsed) {
    return (
      <div className="w-12 bg-card border-r border-border h-full flex flex-col">
        <button
          onClick={onToggleCollapse}
          className="p-3 hover:bg-muted transition-smooth border-b border-border"
          title="Expand Component Library"
        >
          <Icon name="ChevronRight" size={18} />
        </button>
        <div className="flex-1 flex flex-col items-center py-4 space-y-4">
          {componentCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setActiveCategory(category.id);
                onToggleCollapse();
              }}
              className={`p-2 rounded-lg transition-smooth ${
                activeCategory === category.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
              title={category.name}
            >
              <Icon name={category.icon} size={16} />
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-64 bg-card border-r border-border h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-foreground">Components</h2>
          <button
            onClick={onToggleCollapse}
            className="p-1 hover:bg-muted rounded transition-smooth"
            title="Collapse Component Library"
          >
            <Icon name="ChevronLeft" size={16} />
          </button>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search components..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="border-b border-border">
          <div className="flex overflow-x-auto scrollbar-hide">
            {componentCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium whitespace-nowrap transition-smooth ${
                  activeCategory === category.id
                    ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={category.icon} size={14} />
                <span className="hidden lg:inline">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Component List */}
        <div className="flex-1 overflow-y-auto p-2">
          <div className="space-y-1">
            {filteredComponents.map((component) => (
              <div
                key={component.id}
                draggable
                onDragStart={(e) => handleDragStart(e, component)}
                className="p-3 bg-background border border-border rounded-lg cursor-grab hover:bg-muted hover:border-primary/50 transition-smooth group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center group-hover:bg-primary/10 transition-smooth">
                    <Icon name={component.icon} size={16} className="text-muted-foreground group-hover:text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-foreground truncate">{component.name}</h4>
                    <p className="text-xs text-muted-foreground line-clamp-2">{component.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredComponents.length === 0 && (
            <div className="text-center py-8">
              <Icon name="Search" size={32} className="mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">No components found</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-3 border-t border-border">
        <div className="grid grid-cols-2 gap-2">
          <button className="flex items-center justify-center space-x-1 px-2 py-1.5 text-xs bg-background border border-border rounded hover:bg-muted transition-smooth">
            <Icon name="Download" size={12} />
            <span>Import</span>
          </button>
          <button className="flex items-center justify-center space-x-1 px-2 py-1.5 text-xs bg-background border border-border rounded hover:bg-muted transition-smooth">
            <Icon name="Plus" size={12} />
            <span>Custom</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComponentLibrary;