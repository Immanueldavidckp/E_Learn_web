import React from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const ProgressIndicator = ({ className = '' }) => {
  const location = useLocation();

  const progressData = {
    overall: {
      completed: 12,
      total: 18,
      percentage: 67,
      currentStreak: 5,
      totalHours: 24
    },
    modules: [
      {
        id: 'basics',
        name: 'Embedded Basics',
        completed: 8,
        total: 8,
        percentage: 100,
        status: 'completed'
      },
      {
        id: 'circuits',
        name: 'Circuit Design',
        completed: 4,
        total: 6,
        percentage: 67,
        status: 'in-progress'
      },
      {
        id: 'programming',
        name: 'Programming',
        completed: 0,
        total: 4,
        percentage: 0,
        status: 'locked'
      }
    ],
    currentLesson: {
      name: 'Digital Logic Gates',
      progress: 75,
      timeRemaining: '8 min'
    }
  };

  const getContextualProgress = () => {
    switch (location.pathname) {
      case '/interactive-lesson-viewer':
        return {
          type: 'lesson',
          title: 'Current Lesson Progress',
          data: progressData.currentLesson
        };
      case '/learning-dashboard':
        return {
          type: 'overall',
          title: 'Learning Progress',
          data: progressData.overall
        };
      default:
        return {
          type: 'compact',
          title: 'Progress',
          data: progressData.overall
        };
    }
  };

  const contextualProgress = getContextualProgress();

  if (contextualProgress.type === 'lesson') {
    return (
      <div className={`bg-card border border-border rounded-lg p-4 ${className}`}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-foreground">{contextualProgress.title}</h3>
          <span className="text-sm text-muted-foreground">
            {contextualProgress.data.timeRemaining} left
          </span>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground">{contextualProgress.data.name}</span>
            <span className="text-sm font-medium text-foreground">
              {contextualProgress.data.progress}%
            </span>
          </div>
          
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${contextualProgress.data.progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  if (contextualProgress.type === 'overall') {
    return (
      <div className={`space-y-6 ${className}`}>
        {/* Overall Progress */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Overall Progress</h3>
            <div className="flex items-center space-x-2">
              <Icon name="Flame" size={18} className="text-accent" />
              <span className="text-sm font-medium text-foreground">
                {progressData.overall.currentStreak} day streak
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">
                {progressData.overall.completed}
              </p>
              <p className="text-sm text-muted-foreground">Completed</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">
                {progressData.overall.total - progressData.overall.completed}
              </p>
              <p className="text-sm text-muted-foreground">Remaining</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-accent">
                {progressData.overall.totalHours}h
              </p>
              <p className="text-sm text-muted-foreground">Study Time</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">Course Completion</span>
              <span className="text-sm font-medium text-foreground">
                {progressData.overall.percentage}%
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-700"
                style={{ width: `${progressData.overall.percentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Module Progress */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Module Progress</h3>
          <div className="space-y-4">
            {progressData.modules.map((module) => (
              <div key={module.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon 
                      name={
                        module.status === 'completed' ? 'CheckCircle' :
                        module.status === 'in-progress' ? 'Clock' : 'Lock'
                      }
                      size={16}
                      className={
                        module.status === 'completed' ? 'text-success' :
                        module.status === 'in-progress' ? 'text-accent' : 'text-muted-foreground'
                      }
                    />
                    <span className="text-sm font-medium text-foreground">
                      {module.name}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {module.completed}/{module.total}
                  </span>
                </div>
                
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      module.status === 'completed' ? 'bg-success' :
                      module.status === 'in-progress' ? 'bg-primary' : 'bg-muted-foreground'
                    }`}
                    style={{ width: `${module.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Compact progress for sidebar
  return (
    <div className={`bg-card border border-border rounded-lg p-3 ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Progress
        </span>
        <span className="text-xs font-medium text-foreground">
          {progressData.overall.percentage}%
        </span>
      </div>
      
      <div className="w-full bg-muted rounded-full h-1.5">
        <div 
          className="bg-primary h-1.5 rounded-full transition-all duration-500"
          style={{ width: `${progressData.overall.percentage}%` }}
        ></div>
      </div>
      
      <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
        <span>{progressData.overall.completed}/{progressData.overall.total} lessons</span>
        <div className="flex items-center space-x-1">
          <Icon name="Flame" size={12} className="text-accent" />
          <span>{progressData.overall.currentStreak}</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;