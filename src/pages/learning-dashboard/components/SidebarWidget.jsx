import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SidebarWidget = () => {
  const navigate = useNavigate();

  const upcomingAssignments = [
    {
      id: 1,
      title: "Arduino LED Matrix Project",
      dueDate: "2025-07-30",
      priority: "high",
      type: "Project",
      progress: 25
    },
    {
      id: 2,
      title: "Sensor Calibration Quiz",
      dueDate: "2025-08-02",
      priority: "medium",
      type: "Assessment",
      progress: 0
    },
    {
      id: 3,
      title: "PWM Control Circuit",
      dueDate: "2025-08-05",
      priority: "low",
      type: "Simulation",
      progress: 60
    }
  ];

  const communityActivity = [
    {
      id: 1,
      user: "Sarah Chen",
      action: "shared a circuit design",
      title: "Temperature Monitor System",
      time: "2 hours ago",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg"
    },
    {
      id: 2,
      user: "Mike Rodriguez",
      action: "completed lesson",
      title: "Interrupt Handling Basics",
      time: "4 hours ago",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg"
    },
    {
      id: 3,
      user: "Emma Wilson",
      action: "asked a question in",
      title: "C++ Programming Forum",
      time: "6 hours ago",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg"
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-error bg-error/10';
      case 'medium':
        return 'text-accent bg-accent/10';
      case 'low':
        return 'text-success bg-success/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Project':
        return 'FolderOpen';
      case 'Assessment':
        return 'ClipboardCheck';
      case 'Simulation':
        return 'Zap';
      default:
        return 'FileText';
    }
  };

  const formatDueDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = date - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    if (diffDays > 1) return `Due in ${diffDays} days`;
    return 'Overdue';
  };

  return (
    <div className="space-y-6">
      {/* Upcoming Assignments */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground">Upcoming</h3>
          <Button variant="ghost" size="sm" iconName="Calendar">
            View All
          </Button>
        </div>

        <div className="space-y-3">
          {upcomingAssignments.map((assignment) => (
            <div key={assignment.id} className="p-3 bg-surface border border-border rounded-lg">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={getTypeIcon(assignment.type)} size={16} className="text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium ${getPriorityColor(assignment.priority)}`}>
                      {assignment.priority}
                    </span>
                    <span className="text-xs text-muted-foreground">{assignment.type}</span>
                  </div>
                  <h4 className="text-sm font-medium text-foreground mb-1 truncate">
                    {assignment.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mb-2">
                    {formatDueDate(assignment.dueDate)}
                  </p>
                  {assignment.progress > 0 && (
                    <div className="w-full bg-muted rounded-full h-1">
                      <div 
                        className="bg-primary h-1 rounded-full transition-all duration-300"
                        style={{ width: `${assignment.progress}%` }}
                      ></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Community Activity */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground">Community</h3>
          <Button variant="ghost" size="sm" iconName="Users">
            Join
          </Button>
        </div>

        <div className="space-y-3">
          {communityActivity.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <img
                src={activity.avatar}
                alt={activity.user}
                className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                onError={(e) => {
                  e.target.src = '/assets/images/no_image.png';
                }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">
                  <span className="font-medium">{activity.user}</span>
                  <span className="text-muted-foreground"> {activity.action} </span>
                  <span className="font-medium">{activity.title}</span>
                </p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>

        <Button variant="outline" size="sm" fullWidth className="mt-4" iconName="MessageCircle">
          View Forum
        </Button>
      </div>

      {/* Study Streak */}
      <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-border rounded-lg p-4">
        <div className="text-center">
          <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-3">
            <Icon name="Flame" size={24} className="text-accent-foreground" />
          </div>
          <h3 className="font-semibold text-foreground mb-1">5 Day Streak!</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Keep learning to maintain your streak
          </p>
          <Button variant="default" size="sm" fullWidth>
            Continue Learning
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SidebarWidget;