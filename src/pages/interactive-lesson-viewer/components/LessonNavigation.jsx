import React from 'react';

import Button from '../../../components/ui/Button';

const LessonNavigation = ({ 
  currentLesson, 
  totalLessons, 
  onPrevious, 
  onNext, 
  onMarkComplete,
  isCompleted = false,
  canGoNext = true,
  canGoPrevious = true
}) => {
  return (
    <div className="bg-surface border-t border-border px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Previous Button */}
        <Button
          variant="outline"
          iconName="ChevronLeft"
          iconPosition="left"
          onClick={onPrevious}
          disabled={!canGoPrevious}
          className="min-w-[120px]"
        >
          Previous
        </Button>

        {/* Progress Indicator */}
        <div className="flex items-center space-x-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Lesson {currentLesson} of {totalLessons}
            </p>
            <div className="flex items-center space-x-1 mt-1">
              {Array.from({ length: totalLessons }, (_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index < currentLesson
                      ? 'bg-success'
                      : index === currentLesson - 1
                      ? 'bg-primary' :'bg-muted'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Mark Complete Button */}
          <Button
            variant={isCompleted ? "success" : "secondary"}
            iconName={isCompleted ? "CheckCircle" : "Check"}
            iconPosition="left"
            onClick={onMarkComplete}
            disabled={isCompleted}
          >
            {isCompleted ? "Completed" : "Mark Complete"}
          </Button>
        </div>

        {/* Next Button */}
        <Button
          variant="default"
          iconName="ChevronRight"
          iconPosition="right"
          onClick={onNext}
          disabled={!canGoNext}
          className="min-w-[120px]"
        >
          Next
        </Button>
      </div>

      {/* Mobile Progress Bar */}
      <div className="mt-4 md:hidden">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
          <span>Progress</span>
          <span>{Math.round((currentLesson / totalLessons) * 100)}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-500"
            style={{ width: `${(currentLesson / totalLessons) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default LessonNavigation;