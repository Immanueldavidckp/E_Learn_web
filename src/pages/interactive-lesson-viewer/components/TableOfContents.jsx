import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const TableOfContents = ({ sections, currentSection, onSectionClick, className = '' }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`bg-surface border-r border-border ${className}`}>
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-foreground">Table of Contents</h3>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded hover:bg-muted transition-smooth md:hidden"
          >
            <Icon name={isCollapsed ? "ChevronDown" : "ChevronUp"} size={16} />
          </button>
        </div>
      </div>
      
      <div className={`${isCollapsed ? 'hidden md:block' : 'block'}`}>
        <nav className="p-4 space-y-2">
          {sections.map((section, index) => (
            <div key={section.id}>
              <button
                onClick={() => onSectionClick(section.id)}
                className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-smooth ${
                  currentSection === section.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-medium text-muted-foreground">
                    {index + 1}
                  </span>
                  <span className="text-sm font-medium">{section.title}</span>
                </div>
                <div className="flex items-center space-x-1">
                  {section.completed && (
                    <Icon name="CheckCircle" size={14} className="text-success" />
                  )}
                  {section.hasInteractive && (
                    <Icon name="Zap" size={14} className="text-accent" />
                  )}
                </div>
              </button>
              
              {section.subsections && section.subsections.length > 0 && (
                <div className="ml-6 mt-1 space-y-1">
                  {section.subsections.map((subsection) => (
                    <button
                      key={subsection.id}
                      onClick={() => onSectionClick(subsection.id)}
                      className={`w-full flex items-center justify-between p-1.5 rounded text-left transition-smooth ${
                        currentSection === subsection.id
                          ? 'bg-primary/20 text-primary' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                    >
                      <span className="text-xs">{subsection.title}</span>
                      {subsection.completed && (
                        <Icon name="Check" size={12} className="text-success" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default TableOfContents;