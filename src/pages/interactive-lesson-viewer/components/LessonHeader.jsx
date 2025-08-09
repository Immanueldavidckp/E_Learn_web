import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LessonHeader = ({ lesson, onBookmark, onNotes, isBookmarked = false }) => {
  return (
    <div className="bg-surface border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-1">
            <span>Module {lesson.moduleNumber}</span>
            <Icon name="ChevronRight" size={16} />
            <span>Lesson {lesson.lessonNumber}</span>
          </div>
          <h1 className="text-xl font-semibold text-foreground">{lesson.title}</h1>
          <p className="text-sm text-muted-foreground mt-1">{lesson.description}</p>
        </div>
        
        <div className="flex items-center space-x-2 ml-6">
          <Button
            variant="ghost"
            size="sm"
            iconName="FileText"
            onClick={onNotes}
            className="hidden md:flex"
          >
            Notes
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName={isBookmarked ? "Bookmark" : "BookmarkPlus"}
            onClick={onBookmark}
            className={isBookmarked ? "text-accent" : ""}
          >
            {isBookmarked ? "Bookmarked" : "Bookmark"}
          </Button>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
          <span>Lesson Progress</span>
          <span>{lesson.progress}% Complete</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-500"
            style={{ width: `${lesson.progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default LessonHeader;