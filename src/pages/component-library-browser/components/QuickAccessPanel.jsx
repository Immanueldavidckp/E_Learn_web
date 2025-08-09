import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const QuickAccessPanel = ({ favorites, recentlyViewed, onComponentSelect }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      {/* Favorites */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground flex items-center space-x-2">
            <Icon name="Heart" size={18} className="text-accent" />
            <span>Favorites</span>
          </h3>
          <span className="text-sm text-muted-foreground">{favorites.length} items</span>
        </div>
        
        {favorites.length > 0 ? (
          <div className="space-y-2">
            {favorites.slice(0, 3).map((component) => (
              <button
                key={component.id}
                onClick={() => onComponentSelect(component)}
                className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-muted transition-smooth text-left"
              >
                <div className="w-10 h-10 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={component.image}
                    alt={component.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">{component.name}</p>
                  <p className="text-sm text-muted-foreground">${component.price}</p>
                </div>
                <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
              </button>
            ))}
            {favorites.length > 3 && (
              <button className="w-full text-sm text-primary hover:text-primary/80 transition-smooth text-center py-2">
                View all {favorites.length} favorites
              </button>
            )}
          </div>
        ) : (
          <div className="text-center py-6">
            <Icon name="Heart" size={32} className="mx-auto text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">No favorites yet</p>
            <p className="text-xs text-muted-foreground mt-1">
              Click the heart icon on components to save them here
            </p>
          </div>
        )}
      </div>

      {/* Recently Viewed */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground flex items-center space-x-2">
            <Icon name="Clock" size={18} className="text-muted-foreground" />
            <span>Recently Viewed</span>
          </h3>
          <span className="text-sm text-muted-foreground">{recentlyViewed.length} items</span>
        </div>
        
        {recentlyViewed.length > 0 ? (
          <div className="space-y-2">
            {recentlyViewed.slice(0, 3).map((component) => (
              <button
                key={component.id}
                onClick={() => onComponentSelect(component)}
                className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-muted transition-smooth text-left"
              >
                <div className="w-10 h-10 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={component.image}
                    alt={component.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">{component.name}</p>
                  <p className="text-sm text-muted-foreground">{component.category}</p>
                </div>
                <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
              </button>
            ))}
            {recentlyViewed.length > 3 && (
              <button className="w-full text-sm text-primary hover:text-primary/80 transition-smooth text-center py-2">
                View all recent items
              </button>
            )}
          </div>
        ) : (
          <div className="text-center py-6">
            <Icon name="Clock" size={32} className="mx-auto text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">No recent items</p>
            <p className="text-xs text-muted-foreground mt-1">
              Components you view will appear here
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickAccessPanel;