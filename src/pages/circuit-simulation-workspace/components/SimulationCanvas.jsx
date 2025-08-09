import React, { useRef, useEffect, useState } from 'react';
import Icon from '../../../components/AppIcon';

const SimulationCanvas = ({ 
  isSimulationRunning, 
  onComponentDrop, 
  selectedComponent, 
  onComponentSelect,
  zoomLevel,
  onZoomChange 
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [canvasOffset, setCanvasOffset] = useState({ x: 0, y: 0 });
  const [placedComponents, setPlacedComponents] = useState([]);
  const [connections, setConnections] = useState([]);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStart, setConnectionStart] = useState(null);

  // Mock placed components for demonstration
  useEffect(() => {
    setPlacedComponents([
      {
        id: 'comp1',
        type: 'resistor',
        name: 'R1',
        x: 200,
        y: 150,
        width: 60,
        height: 20,
        value: '1kΩ',
        pins: [
          { id: 'pin1', x: 0, y: 10, type: 'input' },
          { id: 'pin2', x: 60, y: 10, type: 'output' }
        ]
      },
      {
        id: 'comp2',
        type: 'led',
        name: 'LED1',
        x: 350,
        y: 140,
        width: 40,
        height: 40,
        value: 'Red LED',
        pins: [
          { id: 'anode', x: 0, y: 20, type: 'input' },
          { id: 'cathode', x: 40, y: 20, type: 'output' }
        ]
      },
      {
        id: 'comp3',
        type: 'arduino_uno',
        name: 'Arduino',
        x: 100,
        y: 250,
        width: 120,
        height: 80,
        value: 'Arduino Uno',
        pins: [
          { id: 'pin13', x: 120, y: 20, type: 'digital' },
          { id: 'gnd', x: 120, y: 40, type: 'ground' },
          { id: 'vin', x: 120, y: 60, type: 'power' }
        ]
      }
    ]);

    setConnections([
      {
        id: 'conn1',
        from: { componentId: 'comp3', pinId: 'pin13' },
        to: { componentId: 'comp1', pinId: 'pin1' },
        color: '#22c55e'
      },
      {
        id: 'conn2',
        from: { componentId: 'comp1', pinId: 'pin2' },
        to: { componentId: 'comp2', pinId: 'anode' },
        color: '#22c55e'
      }
    ]);
  }, []);

  // Canvas drawing logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    // Set canvas size
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    
    // Clear canvas
    ctx.fillStyle = '#fafbfc';
    ctx.fillRect(0, 0, rect.width, rect.height);
    
    // Draw grid
    drawGrid(ctx, rect.width, rect.height);
    
    // Draw connections
    connections.forEach(connection => {
      drawConnection(ctx, connection);
    });
    
    // Draw components
    placedComponents.forEach(component => {
      drawComponent(ctx, component);
    });
    
    // Highlight selected component
    if (selectedComponent) {
      const comp = placedComponents.find(c => c.id === selectedComponent.id);
      if (comp) {
        ctx.strokeStyle = '#1e40af';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.strokeRect(comp.x - 5, comp.y - 5, comp.width + 10, comp.height + 10);
        ctx.setLineDash([]);
      }
    }
  }, [placedComponents, connections, selectedComponent, zoomLevel, canvasOffset]);

  const drawGrid = (ctx, width, height) => {
    const gridSize = 20;
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 0.5;
    
    for (let x = 0; x <= width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    
    for (let y = 0; y <= height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  };

  const drawComponent = (ctx, component) => {
    ctx.save();
    
    // Component background
    ctx.fillStyle = component.type === 'arduino_uno' ? '#0066cc' : '#ffffff';
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 2;
    ctx.fillRect(component.x, component.y, component.width, component.height);
    ctx.strokeRect(component.x, component.y, component.width, component.height);
    
    // Component label
    ctx.fillStyle = component.type === 'arduino_uno' ? '#ffffff' : '#374151';
    ctx.font = '12px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(
      component.name, 
      component.x + component.width / 2, 
      component.y + component.height / 2 + 4
    );
    
    // Draw pins
    component.pins.forEach(pin => {
      const pinX = component.x + pin.x;
      const pinY = component.y + pin.y;
      
      ctx.fillStyle = pin.type === 'power' ? '#dc2626' : 
                     pin.type === 'ground' ? '#000000' : '#6b7280';
      ctx.beginPath();
      ctx.arc(pinX, pinY, 3, 0, 2 * Math.PI);
      ctx.fill();
      
      // Voltage indicator for simulation
      if (isSimulationRunning && pin.type !== 'ground') {
        ctx.fillStyle = '#22c55e';
        ctx.beginPath();
        ctx.arc(pinX, pinY, 5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.globalAlpha = 0.3;
        ctx.beginPath();
        ctx.arc(pinX, pinY, 8, 0, 2 * Math.PI);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    });
    
    ctx.restore();
  };

  const drawConnection = (ctx, connection) => {
    const fromComp = placedComponents.find(c => c.id === connection.from.componentId);
    const toComp = placedComponents.find(c => c.id === connection.to.componentId);
    
    if (!fromComp || !toComp) return;
    
    const fromPin = fromComp.pins.find(p => p.id === connection.from.pinId);
    const toPin = toComp.pins.find(p => p.id === connection.to.pinId);
    
    if (!fromPin || !toPin) return;
    
    const startX = fromComp.x + fromPin.x;
    const startY = fromComp.y + fromPin.y;
    const endX = toComp.x + toPin.x;
    const endY = toComp.y + toPin.y;
    
    ctx.strokeStyle = connection.color;
    ctx.lineWidth = isSimulationRunning ? 3 : 2;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    
    // Draw curved connection
    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2;
    ctx.quadraticCurveTo(midX, startY, midX, midY);
    ctx.quadraticCurveTo(midX, endY, endX, endY);
    ctx.stroke();
    
    // Animate current flow during simulation
    if (isSimulationRunning) {
      const time = Date.now() / 1000;
      const flowPos = (Math.sin(time * 3) + 1) / 2;
      const flowX = startX + (endX - startX) * flowPos;
      const flowY = startY + (endY - startY) * flowPos;
      
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(flowX, flowY, 4, 0, 2 * Math.PI);
      ctx.fill();
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const rect = canvasRef.current.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    
    try {
      const componentData = JSON.parse(e.dataTransfer.getData('application/json'));
      onComponentDrop && onComponentDrop(componentData, { x, y });
    } catch (error) {
      console.error('Error dropping component:', error);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleCanvasClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    
    // Check if clicked on a component
    const clickedComponent = placedComponents.find(comp => 
      x >= comp.x && x <= comp.x + comp.width &&
      y >= comp.y && y <= comp.y + comp.height
    );
    
    onComponentSelect && onComponentSelect(clickedComponent);
  };

  const handleMouseDown = (e) => {
    if (e.button === 1 || (e.button === 0 && e.ctrlKey)) { // Middle mouse or Ctrl+click for panning
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;
      setCanvasOffset(prev => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY
      }));
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="flex-1 relative bg-background overflow-hidden">
      {/* Canvas Container */}
      <div 
        ref={containerRef}
        className="w-full h-full relative"
        style={{ cursor: isDragging ? 'grabbing' : 'default' }}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={handleCanvasClick}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        />
      </div>

      {/* Canvas Controls */}
      <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
        <button
          onClick={() => onZoomChange && onZoomChange(Math.min(zoomLevel + 0.1, 2))}
          className="w-10 h-10 bg-card border border-border rounded-lg flex items-center justify-center hover:bg-muted transition-smooth shadow-soft"
          title="Zoom In"
        >
          <Icon name="ZoomIn" size={16} />
        </button>
        <button
          onClick={() => onZoomChange && onZoomChange(Math.max(zoomLevel - 0.1, 0.5))}
          className="w-10 h-10 bg-card border border-border rounded-lg flex items-center justify-center hover:bg-muted transition-smooth shadow-soft"
          title="Zoom Out"
        >
          <Icon name="ZoomOut" size={16} />
        </button>
        <button
          onClick={() => onZoomChange && onZoomChange(1)}
          className="w-10 h-10 bg-card border border-border rounded-lg flex items-center justify-center hover:bg-muted transition-smooth shadow-soft"
          title="Reset Zoom"
        >
          <Icon name="Maximize" size={16} />
        </button>
      </div>

      {/* Simulation Status */}
      {isSimulationRunning && (
        <div className="absolute top-4 left-4 bg-card border border-border rounded-lg px-3 py-2 shadow-soft">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-foreground">Simulation Running</span>
          </div>
        </div>
      )}

      {/* Grid Toggle */}
      <div className="absolute top-4 right-4">
        <button className="w-10 h-10 bg-card border border-border rounded-lg flex items-center justify-center hover:bg-muted transition-smooth shadow-soft">
          <Icon name="Grid3x3" size={16} />
        </button>
      </div>
    </div>
  );
};

export default SimulationCanvas;