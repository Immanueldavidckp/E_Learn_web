import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';


const FilterSidebar = ({ isOpen, onClose, filters, onFilterChange }) => {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    voltage: true,
    interface: true,
    manufacturer: true,
    difficulty: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const filterSections = [
    {
      id: 'category',
      title: 'Category',
      options: [
        { id: 'microcontrollers', label: 'Microcontrollers', count: 24 },
        { id: 'sensors', label: 'Sensors', count: 156 },
        { id: 'actuators', label: 'Actuators', count: 89 },
        { id: 'communication', label: 'Communication', count: 67 },
        { id: 'power', label: 'Power Management', count: 45 },
        { id: 'displays', label: 'Displays', count: 32 },
        { id: 'memory', label: 'Memory', count: 28 },
        { id: 'passive', label: 'Passive Components', count: 234 }
      ]
    },
    {
      id: 'voltage',
      title: 'Operating Voltage',
      options: [
        { id: '3.3v', label: '3.3V', count: 145 },
        { id: '5v', label: '5V', count: 198 },
        { id: '12v', label: '12V', count: 67 },
        { id: '24v', label: '24V', count: 23 },
        { id: 'variable', label: 'Variable', count: 89 }
      ]
    },
    {
      id: 'interface',
      title: 'Interface Type',
      options: [
        { id: 'i2c', label: 'I2C', count: 89 },
        { id: 'spi', label: 'SPI', count: 76 },
        { id: 'uart', label: 'UART', count: 54 },
        { id: 'analog', label: 'Analog', count: 123 },
        { id: 'digital', label: 'Digital GPIO', count: 167 },
        { id: 'pwm', label: 'PWM', count: 45 }
      ]
    },
    {
      id: 'manufacturer',
      title: 'Manufacturer',
      options: [
        { id: 'arduino', label: 'Arduino', count: 34 },
        { id: 'adafruit', label: 'Adafruit', count: 89 },
        { id: 'sparkfun', label: 'SparkFun', count: 67 },
        { id: 'ti', label: 'Texas Instruments', count: 123 },
        { id: 'microchip', label: 'Microchip', count: 98 },
        { id: 'espressif', label: 'Espressif', count: 23 }
      ]
    },
    {
      id: 'difficulty',
      title: 'Difficulty Level',
      options: [
        { id: 'beginner', label: 'Beginner', count: 234 },
        { id: 'intermediate', label: 'Intermediate', count: 156 },
        { id: 'advanced', label: 'Advanced', count: 89 }
      ]
    }
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed lg:sticky top-0 left-0 h-full lg:h-auto w-80 bg-surface border-r border-border z-50 transform transition-transform lg:transform-none ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border lg:hidden">
            <h2 className="text-lg font-semibold text-foreground">Filters</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-muted transition-smooth"
            >
              <Icon name="X" size={20} />
            </button>
          </div>

          {/* Filter Content */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-6">
              {filterSections.map((section) => (
                <div key={section.id} className="space-y-3">
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="flex items-center justify-between w-full text-left"
                  >
                    <h3 className="font-medium text-foreground">{section.title}</h3>
                    <Icon 
                      name={expandedSections[section.id] ? 'ChevronUp' : 'ChevronDown'} 
                      size={16} 
                      className="text-muted-foreground"
                    />
                  </button>

                  {expandedSections[section.id] && (
                    <div className="space-y-2 pl-2">
                      {section.options.map((option) => (
                        <div key={option.id} className="flex items-center justify-between">
                          <Checkbox
                            label={option.label}
                            checked={filters[section.id]?.includes(option.id) || false}
                            onChange={(e) => onFilterChange(section.id, option.id, e.target.checked)}
                            className="flex-1"
                          />
                          <span className="text-xs text-muted-foreground ml-2">
                            {option.count}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-4 border-t border-border">
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onFilterChange('clear')}
                className="flex-1"
              >
                Clear All
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={onClose}
                className="flex-1 lg:hidden"
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;