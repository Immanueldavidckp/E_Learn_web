import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const QuickAccessTiles = () => {
  const navigate = useNavigate();

  const quickAccessItems = [
    {
      id: 'circuit-simulator',
      title: 'Circuit Simulator',
      description: 'Design and test circuits virtually',
      icon: 'Zap',
      color: 'bg-primary text-primary-foreground',
      route: '/circuit-simulation-workspace',
      stats: '15 circuits saved'
    },
    {
      id: 'code-editor',
      title: 'Code Editor',
      description: 'Write and debug embedded code',
      icon: 'Code',
      color: 'bg-secondary text-secondary-foreground',
      route: '/code-editor-with-debugging',
      stats: '8 projects active'
    },
    {
      id: 'component-library',
      title: 'Component Library',
      description: 'Browse electronic components',
      icon: 'Package',
      color: 'bg-accent text-accent-foreground',
      route: '/component-library-browser',
      stats: '200+ components'
    },
    {
      id: 'interactive-lessons',
      title: 'Interactive Lessons',
      description: 'Learn with guided tutorials',
      icon: 'BookOpen',
      color: 'bg-success text-success-foreground',
      route: '/interactive-lesson-viewer',
      stats: '12 lessons completed'
    }
  ];

  const handleTileClick = (route) => {
    navigate(route);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Quick Access</h2>
        <Icon name="Grid3X3" size={20} className="text-muted-foreground" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickAccessItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleTileClick(item.route)}
            className="group relative p-6 rounded-lg border border-border bg-surface hover:shadow-elevated transition-smooth text-left"
          >
            {/* Icon */}
            <div className={`w-12 h-12 rounded-lg ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <Icon name={item.icon} size={24} />
            </div>

            {/* Content */}
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <Icon name="Activity" size={12} />
                <span>{item.stats}</span>
              </div>
            </div>

            {/* Hover Arrow */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <Icon name="ArrowUpRight" size={16} className="text-muted-foreground" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickAccessTiles;