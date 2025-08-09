import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const FloatingActionButton = ({ onBookmark, onNotes, onShare, isBookmarked = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const actions = [
    {
      id: 'bookmark',
      icon: isBookmarked ? 'Bookmark' : 'BookmarkPlus',
      label: isBookmarked ? 'Bookmarked' : 'Bookmark',
      onClick: onBookmark,
      color: isBookmarked ? 'text-accent' : 'text-muted-foreground'
    },
    {
      id: 'notes',
      icon: 'FileText',
      label: 'Notes',
      onClick: onNotes,
      color: 'text-muted-foreground'
    },
    {
      id: 'share',
      icon: 'Share2',
      label: 'Share',
      onClick: onShare,
      color: 'text-muted-foreground'
    }
  ];

  return (
    <div className="fixed bottom-20 right-4 z-50 md:hidden">
      {/* Action Buttons */}
      <div className={`space-y-2 mb-2 transition-all duration-300 ${
        isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}>
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={() => {
              action.onClick();
              setIsExpanded(false);
            }}
            className="flex items-center space-x-2 bg-surface border border-border rounded-full px-4 py-2 shadow-elevated hover:shadow-lg transition-all"
          >
            <Icon name={action.icon} size={18} className={action.color} />
            <span className="text-sm font-medium text-foreground">{action.label}</span>
          </button>
        ))}
      </div>

      {/* Main FAB */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-elevated hover:shadow-lg transition-all duration-300 flex items-center justify-center ${
          isExpanded ? 'rotate-45' : 'rotate-0'
        }`}
      >
        <Icon name="Plus" size={24} />
      </button>
    </div>
  );
};

export default FloatingActionButton;