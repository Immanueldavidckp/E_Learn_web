import React from 'react';
import Icon from '../../../components/AppIcon';

const CategoryChips = ({ categories, selectedCategory, onCategorySelect }) => {
  const categoryIcons = {
    'all': 'Grid3X3',
    'microcontrollers': 'Cpu',
    'sensors': 'Thermometer',
    'actuators': 'Zap',
    'communication': 'Wifi',
    'power': 'Battery',
    'displays': 'Monitor',
    'memory': 'HardDrive',
    'passive': 'Circle'
  };

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-2 md:gap-3">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategorySelect(category.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-smooth ${
              selectedCategory === category.id
                ? 'bg-primary text-primary-foreground shadow-soft'
                : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
            }`}
          >
            <Icon 
              name={categoryIcons[category.id] || 'Package'} 
              size={16} 
            />
            <span>{category.name}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              selectedCategory === category.id
                ? 'bg-primary-foreground/20 text-primary-foreground'
                : 'bg-foreground/10 text-muted-foreground'
            }`}>
              {category.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryChips;