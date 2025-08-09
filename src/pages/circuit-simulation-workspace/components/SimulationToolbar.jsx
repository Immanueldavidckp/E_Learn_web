import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SimulationToolbar = ({ 
  isSimulationRunning, 
  onSimulationToggle, 
  onReset, 
  onSave, 
  onLoad,
  simulationSpeed,
  onSpeedChange 
}) => {
  const [showSpeedControl, setShowSpeedControl] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const speedOptions = [
    { value: 0.25, label: '0.25x' },
    { value: 0.5, label: '0.5x' },
    { value: 1, label: '1x' },
    { value: 2, label: '2x' },
    { value: 4, label: '4x' }
  ];

  const handleShare = (type) => {
    setShowShareMenu(false);
    console.log(`Sharing via ${type}`);
  };

  return (
    <div className="bg-card border-b border-border px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Left Section - Simulation Controls */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Button
              variant={isSimulationRunning ? "destructive" : "default"}
              size="sm"
              iconName={isSimulationRunning ? "Square" : "Play"}
              iconPosition="left"
              onClick={onSimulationToggle}
            >
              {isSimulationRunning ? 'Stop' : 'Run'}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              iconName="RotateCcw"
              iconPosition="left"
              onClick={onReset}
              disabled={isSimulationRunning}
            >
              Reset
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              iconName="SkipForward"
              onClick={() => console.log('Step simulation')}
              disabled={isSimulationRunning}
              title="Step Forward"
            >
              Step
            </Button>
          </div>

          {/* Speed Control */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              iconName="Gauge"
              iconPosition="left"
              onClick={() => setShowSpeedControl(!showSpeedControl)}
            >
              {simulationSpeed}x
            </Button>
            
            {showSpeedControl && (
              <div className="absolute top-full left-0 mt-2 bg-popover border border-border rounded-lg shadow-elevated z-50 min-w-32">
                <div className="p-2">
                  <div className="text-xs font-medium text-muted-foreground mb-2 px-2">Speed</div>
                  {speedOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        onSpeedChange && onSpeedChange(option.value);
                        setShowSpeedControl(false);
                      }}
                      className={`w-full text-left px-2 py-1.5 text-sm rounded hover:bg-muted transition-smooth ${
                        simulationSpeed === option.value ? 'bg-primary/10 text-primary' : 'text-foreground'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Simulation Status */}
          <div className="flex items-center space-x-2 px-3 py-1.5 bg-background border border-border rounded-lg">
            <div className={`w-2 h-2 rounded-full ${
              isSimulationRunning ? 'bg-success animate-pulse' : 'bg-muted-foreground'
            }`}></div>
            <span className="text-sm text-muted-foreground">
              {isSimulationRunning ? 'Running' : 'Stopped'}
            </span>
          </div>
        </div>

        {/* Center Section - Project Info */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="text-center">
            <h2 className="text-lg font-semibold text-foreground">LED Blink Circuit</h2>
            <p className="text-xs text-muted-foreground">Last saved: 2 minutes ago</p>
          </div>
        </div>

        {/* Right Section - File Operations */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            iconName="FolderOpen"
            onClick={onLoad}
            title="Open Project"
          />
          
          <Button
            variant="ghost"
            size="sm"
            iconName="Save"
            onClick={onSave}
            title="Save Project"
          />
          
          <Button
            variant="ghost"
            size="sm"
            iconName="Download"
            onClick={() => console.log('Export project')}
            title="Export Project"
          />
          
          {/* Share Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              iconName="Share"
              onClick={() => setShowShareMenu(!showShareMenu)}
              title="Share Project"
            />
            
            {showShareMenu && (
              <div className="absolute top-full right-0 mt-2 bg-popover border border-border rounded-lg shadow-elevated z-50 min-w-48">
                <div className="p-2">
                  <div className="text-xs font-medium text-muted-foreground mb-2 px-2">Share Options</div>
                  <button
                    onClick={() => handleShare('link')}
                    className="w-full text-left px-2 py-2 text-sm rounded hover:bg-muted transition-smooth flex items-center space-x-2"
                  >
                    <Icon name="Link" size={14} />
                    <span>Copy Link</span>
                  </button>
                  <button
                    onClick={() => handleShare('embed')}
                    className="w-full text-left px-2 py-2 text-sm rounded hover:bg-muted transition-smooth flex items-center space-x-2"
                  >
                    <Icon name="Code" size={14} />
                    <span>Embed Code</span>
                  </button>
                  <button
                    onClick={() => handleShare('export')}
                    className="w-full text-left px-2 py-2 text-sm rounded hover:bg-muted transition-smooth flex items-center space-x-2"
                  >
                    <Icon name="FileImage" size={14} />
                    <span>Export Image</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="w-px h-6 bg-border mx-2"></div>
          
          <Button
            variant="ghost"
            size="sm"
            iconName="Settings"
            onClick={() => console.log('Open settings')}
            title="Simulation Settings"
          />
          
          <Button
            variant="ghost"
            size="sm"
            iconName="HelpCircle"
            onClick={() => console.log('Open help')}
            title="Help"
          />
        </div>
      </div>

      {/* Progress Bar for Long Simulations */}
      {isSimulationRunning && (
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span>Simulation Progress</span>
            <span>Running for 00:45</span>
          </div>
          <div className="w-full bg-muted rounded-full h-1">
            <div className="bg-primary h-1 rounded-full transition-all duration-1000 w-3/4"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimulationToolbar;