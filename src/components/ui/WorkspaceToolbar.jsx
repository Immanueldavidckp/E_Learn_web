import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const WorkspaceToolbar = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [isCompiling, setIsCompiling] = useState(false);
  const location = useLocation();

  const getToolbarConfig = () => {
    switch (location.pathname) {
      case '/circuit-simulation-workspace':
        return {
          title: 'Circuit Simulator',
          actions: [
            {
              id: 'run',
              label: 'Run Simulation',
              icon: 'Play',
              variant: 'default',
              onClick: () => {
                setIsRunning(!isRunning);
              },
              loading: isRunning,
              disabled: false
            },
            {
              id: 'stop',
              label: 'Stop',
              icon: 'Square',
              variant: 'outline',
              onClick: () => setIsRunning(false),
              disabled: !isRunning
            },
            {
              id: 'reset',
              label: 'Reset',
              icon: 'RotateCcw',
              variant: 'outline',
              onClick: () => {
                setIsRunning(false);
              }
            },
            {
              id: 'save',
              label: 'Save Circuit',
              icon: 'Save',
              variant: 'ghost',
              onClick: () => console.log('Save circuit')
            }
          ],
          secondaryActions: [
            {
              id: 'zoom-in',
              icon: 'ZoomIn',
              onClick: () => console.log('Zoom in')
            },
            {
              id: 'zoom-out',
              icon: 'ZoomOut',
              onClick: () => console.log('Zoom out')
            },
            {
              id: 'fit-screen',
              icon: 'Maximize',
              onClick: () => console.log('Fit to screen')
            }
          ]
        };

      case '/code-editor-with-debugging':
        return {
          title: 'Code Editor',
          actions: [
            {
              id: 'compile',
              label: 'Compile',
              icon: 'Hammer',
              variant: 'default',
              onClick: () => {
                setIsCompiling(true);
                setTimeout(() => setIsCompiling(false), 2000);
              },
              loading: isCompiling
            },
            {
              id: 'debug',
              label: 'Debug',
              icon: 'Bug',
              variant: 'outline',
              onClick: () => console.log('Start debugging'),
              disabled: isCompiling
            },
            {
              id: 'upload',
              label: 'Upload',
              icon: 'Upload',
              variant: 'secondary',
              onClick: () => console.log('Upload to device')
            },
            {
              id: 'save',
              label: 'Save',
              icon: 'Save',
              variant: 'ghost',
              onClick: () => console.log('Save code')
            }
          ],
          secondaryActions: [
            {
              id: 'format',
              icon: 'AlignLeft',
              onClick: () => console.log('Format code')
            },
            {
              id: 'find',
              icon: 'Search',
              onClick: () => console.log('Find and replace')
            },
            {
              id: 'terminal',
              icon: 'Terminal',
              onClick: () => console.log('Toggle terminal')
            }
          ]
        };

      case '/interactive-lesson-viewer':
        return {
          title: 'Interactive Lesson',
          actions: [
            {
              id: 'previous',
              label: 'Previous',
              icon: 'ChevronLeft',
              variant: 'outline',
              onClick: () => console.log('Previous lesson')
            },
            {
              id: 'next',
              label: 'Next',
              icon: 'ChevronRight',
              variant: 'default',
              onClick: () => console.log('Next lesson')
            },
            {
              id: 'bookmark',
              label: 'Bookmark',
              icon: 'Bookmark',
              variant: 'ghost',
              onClick: () => console.log('Bookmark lesson')
            }
          ],
          secondaryActions: [
            {
              id: 'notes',
              icon: 'FileText',
              onClick: () => console.log('Take notes')
            },
            {
              id: 'fullscreen',
              icon: 'Maximize',
              onClick: () => console.log('Toggle fullscreen')
            }
          ]
        };

      default:
        return null;
    }
  };

  const config = getToolbarConfig();

  if (!config) return null;

  return (
    <div className="bg-surface border-b border-border px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Title and Primary Actions */}
        <div className="flex items-center space-x-6">
          <h2 className="text-lg font-semibold text-foreground">{config.title}</h2>
          
          <div className="flex items-center space-x-2">
            {config.actions.map((action) => (
              <Button
                key={action.id}
                variant={action.variant}
                size="sm"
                iconName={action.icon}
                iconPosition="left"
                onClick={action.onClick}
                disabled={action.disabled}
                loading={action.loading}
                className="text-sm"
              >
                {action.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Secondary Actions */}
        <div className="flex items-center space-x-1">
          {config.secondaryActions.map((action) => (
            <button
              key={action.id}
              onClick={action.onClick}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
              title={action.label || action.id}
            >
              <Icon name={action.icon} size={18} />
            </button>
          ))}
        </div>
      </div>

      {/* Status Bar for Code Editor */}
      {location.pathname === '/code-editor-with-debugging' && (
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border text-sm text-muted-foreground">
          <div className="flex items-center space-x-4">
            <span>Line 1, Column 1</span>
            <span>UTF-8</span>
            <span>C++</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <Icon name="CheckCircle" size={16} className="mr-1 text-success" />
              Ready
            </span>
          </div>
        </div>
      )}

      {/* Progress Bar for Simulation */}
      {location.pathname === '/circuit-simulation-workspace' && isRunning && (
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span>Simulation Running...</span>
            <span>2.5s</span>
          </div>
          <div className="w-full bg-muted rounded-full h-1">
            <div className="bg-primary h-1 rounded-full transition-all duration-1000 w-3/4"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkspaceToolbar;