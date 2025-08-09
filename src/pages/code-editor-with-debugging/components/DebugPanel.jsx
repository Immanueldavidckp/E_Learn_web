import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const DebugPanel = ({ isCollapsed, onToggleCollapse, compilationResults }) => {
  const [activeTab, setActiveTab] = useState('console');
  const [isDebugging, setIsDebugging] = useState(false);

  // Use compilationResults to dynamically show console output and output files
  const consoleOutput = compilationResults && compilationResults.stderr
    ? [
        { id: 1, type: 'error', message: compilationResults.stderr, timestamp: new Date().toLocaleTimeString() }
      ]
    : compilationResults && compilationResults.success
    ? [
        { id: 1, type: 'success', message: 'Build successful', timestamp: new Date().toLocaleTimeString() }
      ]
    : [
        { id: 1, type: 'info', message: 'No compilation run yet', timestamp: new Date().toLocaleTimeString() }
      ];

  const outputFiles = compilationResults && compilationResults.outputFiles
    ? Object.entries(compilationResults.outputFiles).map(([fileName, base64Content], index) => ({
        id: index,
        fileName,
        base64Content
      }))
    : [];

  const variables = [
    { name: 'counter', value: '42', type: 'int', scope: 'main' },
    { name: 'led_state', value: 'true', type: 'bool', scope: 'global' },
    { name: 'sensor_reading', value: '1023', type: 'uint16_t', scope: 'main' },
    { name: 'button_pressed', value: 'false', type: 'bool', scope: 'interrupt' }
  ];

  const callStack = [
    { function: 'main()', line: 15, file: 'main.c' },
    { function: 'toggle_led()', line: 42, file: 'main.c' },
    { function: 'setup_gpio()', line: 28, file: 'main.c' }
  ];

  const breakpoints = [
    { id: 1, file: 'main.c', line: 15, enabled: true, condition: '' },
    { id: 2, file: 'main.c', line: 28, enabled: true, condition: 'counter > 10' },
    { id: 3, file: 'utils.c', line: 8, enabled: false, condition: '' }
  ];

  const tabs = [
    { id: 'console', label: 'Console', icon: 'Terminal' },
    { id: 'variables', label: 'Variables', icon: 'Variable' },
    { id: 'callstack', label: 'Call Stack', icon: 'List' },
    { id: 'breakpoints', label: 'Breakpoints', icon: 'Circle' },
    { id: 'outputFiles', label: 'Output Files', icon: 'File' }
  ];

  const getMessageIcon = (type) => {
    switch (type) {
      case 'error': return 'XCircle';
      case 'warning': return 'AlertTriangle';
      case 'success': return 'CheckCircle';
      case 'output': return 'MessageSquare';
      default: return 'Info';
    }
  };

  const getMessageColor = (type) => {
    switch (type) {
      case 'error': return 'text-destructive';
      case 'warning': return 'text-warning';
      case 'success': return 'text-success';
      case 'output': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  const renderConsoleTab = () => (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-2 font-mono text-sm whitespace-pre-wrap">
        {consoleOutput.map((log) => (
          <div key={log.id} className="flex items-start space-x-2">
            <span className="text-xs text-muted-foreground w-16 flex-shrink-0">
              {log.timestamp}
            </span>
            <Icon 
              name={getMessageIcon(log.type)} 
              size={14} 
              className={`mt-0.5 flex-shrink-0 ${getMessageColor(log.type)}`}
            />
            <span className={`flex-1 ${getMessageColor(log.type)}`}>
              {log.message}
            </span>
          </div>
        ))}
      </div>
      <div className="border-t border-border p-2">
        <div className="flex items-center space-x-2">
          <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
          <input
            type="text"
            placeholder="Enter command..."
            className="flex-1 bg-transparent text-sm outline-none text-foreground"
          />
        </div>
      </div>
    </div>
  );

  const renderOutputFilesTab = () => (
    <div className="h-full overflow-y-auto p-4 space-y-2 font-mono text-sm">
      {outputFiles.length === 0 ? (
        <p className="text-muted-foreground">No output files generated.</p>
      ) : (
        outputFiles.map((file) => (
          <div key={file.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
            <span>{file.fileName}</span>
            <a
              href={`data:application/octet-stream;base64,${file.base64Content}`}
              download={file.fileName}
              className="text-primary hover:underline"
            >
              Download
            </a>
          </div>
        ))
      )}
    </div>
  );

  const renderVariablesTab = () => (
    <div className="h-full overflow-y-auto">
      <div className="p-4 space-y-3">
        {variables.map((variable, index) => (
          <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
            <div className="flex items-center space-x-3">
              <Icon name="Variable" size={16} className="text-primary" />
              <div>
                <span className="font-medium text-foreground">{variable.name}</span>
                <span className="text-xs text-muted-foreground ml-2">({variable.type})</span>
              </div>
            </div>
            <div className="text-right">
              <div className="font-mono text-sm text-foreground">{variable.value}</div>
              <div className="text-xs text-muted-foreground">{variable.scope}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCallStackTab = () => (
    <div className="h-full overflow-y-auto">
      <div className="p-4 space-y-2">
        {callStack.map((frame, index) => (
          <div key={index} className="flex items-center space-x-3 p-2 rounded-lg bg-muted/30 hover:bg-muted/50 cursor-pointer transition-smooth">
            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-xs font-medium text-primary">{index + 1}</span>
            </div>
            <div className="flex-1">
              <div className="font-medium text-foreground">{frame.function}</div>
              <div className="text-xs text-muted-foreground">
                {frame.file}:{frame.line}
              </div>
            </div>
            <Icon name="ExternalLink" size={14} className="text-muted-foreground" />
          </div>
        ))}
      </div>
    </div>
  );

  const renderBreakpointsTab = () => (
    <div className="h-full overflow-y-auto">
      <div className="p-4 space-y-3">
        {breakpoints.map((bp) => (
          <div key={bp.id} className="flex items-center space-x-3 p-2 rounded-lg bg-muted/30">
            <button
              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                bp.enabled 
                  ? 'bg-destructive border-destructive' :'border-muted-foreground'
              }`}
            >
              {bp.enabled && <div className="w-2 h-2 bg-white rounded-full"></div>}
            </button>
            <div className="flex-1">
              <div className="font-medium text-foreground">
                {bp.file}:{bp.line}
              </div>
              {bp.condition && (
                <div className="text-xs text-muted-foreground font-mono">
                  Condition: {bp.condition}
                </div>
              )}
            </div>
            <button className="p-1 rounded hover:bg-muted transition-smooth">
              <Icon name="X" size={14} className="text-muted-foreground" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  if (isCollapsed) {
    return (
      <div className="h-8 bg-card border-t border-border flex items-center justify-between px-4">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <span>Console: {consoleOutput.length} messages</span>
          <span>Variables: {variables.length} watched</span>
          <span>Breakpoints: {breakpoints.filter(bp => bp.enabled).length} active</span>
        </div>
        <button
          onClick={onToggleCollapse}
          className="p-1 rounded hover:bg-muted transition-smooth"
        >
          <Icon name="ChevronUp" size={16} className="text-muted-foreground" />
        </button>
      </div>
    );
  }

  return (
    <div className="h-80 bg-card border-t border-border flex flex-col">
      {/* Panel Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border">
        <div className="flex items-center space-x-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-smooth ${
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={tab.icon} size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsDebugging(!isDebugging)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-smooth ${
              isDebugging
                ? 'bg-destructive text-destructive-foreground'
                : 'bg-success text-success-foreground'
            }`}
          >
            <Icon 
              name={isDebugging ? 'Square' : 'Play'} 
              size={14} 
              className="mr-1"
            />
            {isDebugging ? 'Stop' : 'Debug'}
          </button>
          
          <button
            onClick={onToggleCollapse}
            className="p-1 rounded hover:bg-muted transition-smooth"
          >
            <Icon name="ChevronDown" size={16} className="text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Panel Content */}
      <div className="flex-1">
        {activeTab === 'console' && renderConsoleTab()}
        {activeTab === 'variables' && renderVariablesTab()}
        {activeTab === 'callstack' && renderCallStackTab()}
        {activeTab === 'breakpoints' && renderBreakpointsTab()}
        {activeTab === 'outputFiles' && renderOutputFilesTab()}
      </div>
    </div>
  );
};

export default DebugPanel;
