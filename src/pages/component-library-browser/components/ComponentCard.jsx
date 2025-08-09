import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ComponentCard = ({ component, onViewDetails, onAddToFavorites, onAddToProject }) => {
  const getDifficultyColor = (level) => {
    switch (level) {
      case 'beginner':
        return 'text-success bg-success/10';
      case 'intermediate':
        return 'text-warning bg-warning/10';
      case 'advanced':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getCompatibilityIcon = (platform) => {
    switch (platform.toLowerCase()) {
      case 'arduino':
        return 'Cpu';
      case 'raspberry pi':
        return 'Monitor';
      case 'esp32':
        return 'Wifi';
      default:
        return 'Microchip';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-elevated transition-smooth group">
      {/* Component Image */}
      <div className="relative mb-4">
        <div className="aspect-square bg-muted rounded-lg overflow-hidden">
          <Image
            src={component.image}
            alt={component.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
          />
        </div>
        
        {/* Favorite Button */}
        <button
          onClick={() => onAddToFavorites(component.id)}
          className={`absolute top-2 right-2 p-2 rounded-full transition-smooth ${
            component.isFavorite
              ? 'bg-accent text-accent-foreground'
              : 'bg-surface/80 text-muted-foreground hover:bg-surface hover:text-foreground'
          }`}
        >
          <Icon 
            name={component.isFavorite ? 'Heart' : 'Heart'} 
            size={16}
            className={component.isFavorite ? 'fill-current' : ''}
          />
        </button>

        {/* New Badge */}
        {component.isNew && (
          <div className="absolute top-2 left-2 px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
            New
          </div>
        )}
      </div>

      {/* Component Info */}
      <div className="space-y-3">
        <div>
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-smooth">
            {component.name}
          </h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {component.description}
          </p>
        </div>

        {/* Specifications */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Voltage:</span>
            <span className="font-medium text-foreground">{component.voltage}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Interface:</span>
            <span className="font-medium text-foreground">{component.interface}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Price:</span>
            <span className="font-medium text-foreground">${component.price}</span>
          </div>
        </div>

        {/* Compatibility Tags */}
        <div className="flex flex-wrap gap-1">
          {component.compatibility.map((platform, index) => (
            <div
              key={index}
              className="flex items-center space-x-1 px-2 py-1 bg-muted rounded-full text-xs"
            >
              <Icon 
                name={getCompatibilityIcon(platform)} 
                size={12} 
                className="text-muted-foreground"
              />
              <span className="text-muted-foreground">{platform}</span>
            </div>
          ))}
        </div>

        {/* Difficulty Level */}
        <div className="flex items-center justify-between">
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(component.difficulty)}`}>
            {component.difficulty.charAt(0).toUpperCase() + component.difficulty.slice(1)}
          </div>
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <Icon name="Star" size={12} className="fill-current text-accent" />
            <span>{component.rating}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(component)}
            className="flex-1"
          >
            View Details
          </Button>
          <Button
            variant="default"
            size="sm"
            iconName="Plus"
            onClick={() => onAddToProject(component)}
            className="flex-1"
          >
            Add to Project
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ComponentCard;