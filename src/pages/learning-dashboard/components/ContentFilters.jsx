import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContentFilters = ({ onFilterChange }) => {
  const [activeFilters, setActiveFilters] = useState({
    contentType: 'all',
    difficulty: 'all',
    duration: 'all'
  });

  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const filterOptions = {
    contentType: [
      { value: 'all', label: 'All Content', icon: 'Grid3X3' },
      { value: 'tutorials', label: 'Tutorials', icon: 'BookOpen' },
      { value: 'simulations', label: 'Simulations', icon: 'Zap' },
      { value: 'assessments', label: 'Assessments', icon: 'ClipboardCheck' },
      { value: 'projects', label: 'Projects', icon: 'FolderOpen' }
    ],
    difficulty: [
      { value: 'all', label: 'All Levels', icon: 'BarChart3' },
      { value: 'beginner', label: 'Beginner', icon: 'TrendingUp' },
      { value: 'intermediate', label: 'Intermediate', icon: 'TrendingUp' },
      { value: 'advanced', label: 'Advanced', icon: 'TrendingUp' }
    ],
    duration: [
      { value: 'all', label: 'Any Duration', icon: 'Clock' },
      { value: 'short', label: '< 30 min', icon: 'Clock' },
      { value: 'medium', label: '30-60 min', icon: 'Clock' },
      { value: 'long', label: '> 60 min', icon: 'Clock' }
    ]
  };

  const handleFilterChange = (category, value) => {
    const newFilters = {
      ...activeFilters,
      [category]: value
    };
    setActiveFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const resetFilters = () => {
    const resetFilters = {
      contentType: 'all',
      difficulty: 'all',
      duration: 'all'
    };
    setActiveFilters(resetFilters);
    onFilterChange?.(resetFilters);
  };

  const getActiveFilterCount = () => {
    return Object.values(activeFilters).filter(value => value !== 'all').length;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      {/* Mobile Filter Toggle */}
      <div className="md:hidden">
        <Button
          variant="outline"
          fullWidth
          iconName="Filter"
          iconPosition="left"
          onClick={() => setShowMobileFilters(!showMobileFilters)}
        >
          Filters {getActiveFilterCount() > 0 && `(${getActiveFilterCount()})`}
        </Button>
      </div>

      {/* Filter Content */}
      <div className={`${showMobileFilters ? 'block' : 'hidden'} md:block ${showMobileFilters ? 'mt-4' : ''}`}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          {/* Filter Categories */}
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
            {/* Content Type Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Content Type</label>
              <div className="flex flex-wrap gap-2">
                {filterOptions.contentType.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleFilterChange('contentType', option.value)}
                    className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-smooth ${
                      activeFilters.contentType === option.value
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                    }`}
                  >
                    <Icon name={option.icon} size={14} className="mr-1.5" />
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Difficulty</label>
              <div className="flex flex-wrap gap-2">
                {filterOptions.difficulty.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleFilterChange('difficulty', option.value)}
                    className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-smooth ${
                      activeFilters.difficulty === option.value
                        ? 'bg-secondary text-secondary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                    }`}
                  >
                    <Icon name={option.icon} size={14} className="mr-1.5" />
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Duration Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Duration</label>
              <div className="flex flex-wrap gap-2">
                {filterOptions.duration.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleFilterChange('duration', option.value)}
                    className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-smooth ${
                      activeFilters.duration === option.value
                        ? 'bg-accent text-accent-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                    }`}
                  >
                    <Icon name={option.icon} size={14} className="mr-1.5" />
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Reset Filters */}
          {getActiveFilterCount() > 0 && (
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              iconPosition="left"
              onClick={resetFilters}
            >
              Reset
            </Button>
          )}
        </div>

        {/* Active Filters Summary */}
        {getActiveFilterCount() > 0 && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Filter" size={16} />
              <span>Active filters:</span>
              <div className="flex flex-wrap gap-1">
                {Object.entries(activeFilters)
                  .filter(([_, value]) => value !== 'all')
                  .map(([category, value]) => (
                    <span key={category} className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary rounded text-xs">
                      {filterOptions[category].find(opt => opt.value === value)?.label}
                    </span>
                  ))
                }
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentFilters;