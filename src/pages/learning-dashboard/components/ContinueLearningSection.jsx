import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import { useAuth } from '../../../contexts/AuthContext';
import supabase from '../../../lib/supabase';

const ContinueLearningSection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      if (!user) {
        setEnrolledCourses([]);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('user_course_enrollments')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching enrolled courses:', error);
        setEnrolledCourses([]);
      } else {
        setEnrolledCourses(data);
      }
      setLoading(false);
    };

    fetchEnrolledCourses();
  }, [user]);

  const handleContinueLesson = (course) => {
    switch (course.course_name) {
      case 'Interactive Lesson':
        navigate('/interactive-lesson-viewer');
        break;
      case 'Circuit Simulation':
        navigate('/circuit-simulation-workspace');
        break;
      case 'Code Editor':
        navigate('/code-editor-with-debugging');
        break;
      case 'C Programming':
        navigate('/interactive-lesson-viewer/c-program');
        break;
      default:
        navigate('/interactive-lesson-viewer');
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner':
        return 'text-success bg-success/10';
      case 'Intermediate':
        return 'text-accent bg-accent/10';
      case 'Advanced':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getTypeIcon = (courseName) => {
    switch (courseName) {
      case 'Interactive Lesson':
        return 'BookOpen';
      case 'Circuit Simulation':
        return 'Zap';
      case 'Code Editor':
        return 'Code';
      default:
        return 'Play';
    }
  };

  if (loading) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <p>Loading your courses...</p>
      </div>
    );
  }

  if (enrolledCourses.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-6 text-center text-muted-foreground">
        <h2 className="text-xl font-semibold mb-4">Continue Learning</h2>
        <p>You have not started any courses yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Continue Learning</h2>
        <Button variant="ghost" size="sm" iconName="ArrowRight" iconPosition="right">
          View All
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {enrolledCourses.map((course) => (
          <div key={course.id} className="bg-surface border border-border rounded-lg overflow-hidden hover:shadow-elevated transition-smooth">
            {/* Thumbnail */}
            <div className="relative h-32 overflow-hidden">
              <Image
                src="/assets/images/no_image.png"
                alt={course.course_name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(course.difficulty || 'Beginner')}`}>
                  {course.difficulty || 'Beginner'}
                </span>
              </div>
              <div className="absolute top-2 right-2">
                <div className="w-8 h-8 bg-surface/90 rounded-full flex items-center justify-center">
                  <Icon name={getTypeIcon(course.course_name)} size={16} className="text-foreground" />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-xs text-muted-foreground">{course.course_name}</span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">{course.duration || 'N/A'}</span>
              </div>
              
              <h3 className="font-medium text-foreground mb-3 line-clamp-2">{course.course_name}</h3>
              
              {/* Progress Bar */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Progress</span>
                  <span className="text-xs font-medium text-foreground">{course.progress || 0}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-1.5">
                  <div 
                    className="bg-primary h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${course.progress || 0}%` }}
                  ></div>
                </div>
              </div>

              <Button 
                variant="default" 
                size="sm" 
                fullWidth
                iconName="Play"
                iconPosition="left"
                onClick={() => handleContinueLesson(course)}
              >
                Continue
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContinueLearningSection;
