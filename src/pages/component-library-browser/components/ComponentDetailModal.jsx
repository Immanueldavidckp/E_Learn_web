import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ComponentDetailModal = ({ component, isOpen, onClose, onAddToProject }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen || !component) return null;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    { id: 'pinout', label: 'Pinout', icon: 'Zap' },
    { id: 'code', label: 'Code Examples', icon: 'Code' },
    { id: 'tutorials', label: 'Tutorials', icon: 'BookOpen' }
  ];

  const codeExamples = [
    {
      title: 'Basic Setup',
      language: 'cpp',
      code: `#include <Wire.h>
#include "${component.name.replace(/\s+/g, '')}.h"

${component.name.replace(/\s+/g, '')} sensor;

void setup() {
  Serial.begin(9600);
  Wire.begin();
  
  if (!sensor.begin()) {
    Serial.println("Sensor not found!");
    while (1);
  }
  
  Serial.println("Sensor initialized successfully");
}

void loop() {
  float value = sensor.readValue();
  Serial.print("Reading: ");
  Serial.println(value);
  
  delay(1000);
}`
    },
    {
      title: 'Advanced Usage',
      language: 'cpp',
      code: `// Configure sensor settings
sensor.setResolution(12);
sensor.setRange(RANGE_HIGH);
sensor.enableInterrupt(true);

// Read with error handling
if (sensor.isReady()) {
  float reading = sensor.readValue();
  if (!isnan(reading)) {
    processReading(reading);
  }
}`
    }
  ];

  const relatedTutorials = [
    {
      title: `Getting Started with ${component.name}`,
      duration: '15 min',
      difficulty: 'Beginner',
      description: 'Learn the basics of connecting and programming this component'
    },
    {
      title: 'Advanced Applications',
      duration: '30 min',
      difficulty: 'Intermediate',
      description: 'Explore advanced features and real-world applications'
    },
    {
      title: 'Troubleshooting Guide',
      duration: '10 min',
      difficulty: 'All Levels',
      description: 'Common issues and solutions when working with this component'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-surface rounded-lg shadow-elevated w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-muted rounded-lg overflow-hidden">
              <Image
                src={component.image}
                alt={component.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">{component.name}</h2>
              <p className="text-sm text-muted-foreground">{component.manufacturer}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-muted transition-smooth"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium whitespace-nowrap transition-smooth ${
                  activeTab === tab.id
                    ? 'text-primary border-b-2 border-primary' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={tab.icon} size={16} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Description</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {component.description} This component offers excellent performance and reliability for embedded system applications. It features low power consumption, high accuracy, and easy integration with popular development platforms.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Specifications</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Operating Voltage:</span>
                      <span className="font-medium text-foreground">{component.voltage}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Interface:</span>
                      <span className="font-medium text-foreground">{component.interface}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Current Draw:</span>
                      <span className="font-medium text-foreground">2.5mA</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Operating Temp:</span>
                      <span className="font-medium text-foreground">-40°C to +85°C</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Package:</span>
                      <span className="font-medium text-foreground">DIP-8</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Compatibility</h3>
                  <div className="space-y-2">
                    {component.compatibility.map((platform, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Icon name="CheckCircle" size={16} className="text-success" />
                        <span className="text-foreground">{platform}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'pinout' && (
            <div className="space-y-6">
              <div className="bg-muted rounded-lg p-6 text-center">
                <Icon name="Zap" size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Pinout Diagram</h3>
                <p className="text-muted-foreground">
                  Interactive pinout diagram would be displayed here showing pin functions and connections.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Pin Descriptions</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">1</div>
                      <div>
                        <span className="font-medium text-foreground">VCC</span>
                        <p className="text-sm text-muted-foreground">Power Supply (3.3V - 5V)</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">2</div>
                      <div>
                        <span className="font-medium text-foreground">GND</span>
                        <p className="text-sm text-muted-foreground">Ground Connection</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">3</div>
                      <div>
                        <span className="font-medium text-foreground">SDA</span>
                        <p className="text-sm text-muted-foreground">I2C Data Line</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">4</div>
                      <div>
                        <span className="font-medium text-foreground">SCL</span>
                        <p className="text-sm text-muted-foreground">I2C Clock Line</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'code' && (
            <div className="space-y-6">
              {codeExamples.map((example, index) => (
                <div key={index} className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground">{example.title}</h3>
                  <div className="bg-muted rounded-lg p-4 overflow-x-auto">
                    <pre className="text-sm text-foreground font-mono">
                      <code>{example.code}</code>
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'tutorials' && (
            <div className="space-y-4">
              {relatedTutorials.map((tutorial, index) => (
                <div key={index} className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-smooth">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-2">{tutorial.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{tutorial.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Icon name="Clock" size={12} />
                          <span>{tutorial.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="BarChart" size={12} />
                          <span>{tutorial.difficulty}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Start Tutorial
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <div className="flex items-center space-x-4">
            <span className="text-lg font-semibold text-foreground">${component.price}</span>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <Icon name="Star" size={16} className="fill-current text-accent" />
              <span>{component.rating}</span>
            </div>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button 
              variant="default" 
              iconName="Plus"
              onClick={() => onAddToProject(component)}
            >
              Add to Project
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentDetailModal;