import React from 'react';
import Icon from '../../../components/AppIcon';

const AuthHeader = () => {
  return (
    <div className="bg-surface border-b border-border">
      <div className="max-w-md mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Cpu" size={20} color="white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">EmbedSim</h1>
              <p className="text-xs text-muted-foreground">Learning Platform</p>
            </div>
          </div>

          {/* Language Selector */}
          <button className="flex items-center space-x-1 px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth">
            <Icon name="Globe" size={16} />
            <span>EN</span>
            <Icon name="ChevronDown" size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthHeader;