import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RecommendedContentSection = () => {
  const navigate = useNavigate();

  const recommendedContent = [
    {
      id: 1,
      title: "Microcontroller Fundamentals",
      description: "Learn the basics of microcontroller architecture and programming concepts essential for embedded systems.",
      type: "Interactive Lesson",
      difficulty: "Beginner",
      duration: "45 min",
      thumbnail: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=200&fit=crop",
      tags: ["Arduino", "Basics", "Hardware"],
      rating: 4.8,
      enrolledCount: 1250
    },
    {
      id: 2,
      title: "PWM Signal Generation",
      description: "Master pulse-width modulation techniques for controlling motors, LEDs, and other actuators in embedded projects.",
      type: "Circuit Simulation",
      difficulty: "Intermediate",
      duration: "30 min",
      thumbnail: "https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?w=400&h=200&fit=crop",
      tags: ["PWM", "Signals", "Control"],
      rating: 4.6,
      enrolledCount: 890
    },
    {
      id: 3,
      title: "Interrupt Handling in C",
      description: "Understand interrupt mechanisms and implement efficient interrupt service routines for real-time applications.",
      type: "Code Editor",
      difficulty: "Advanced",
      duration: "60 min",
      thumbnail: "https://images.pixabay.com/photo/2015/05/31/15/14/woman-792162_1280.jpg?w=400&h=200&fit=crop",
      tags: ["C Programming", "Interrupts", "Real-time"],
      rating: 4.9,
      enrolledCount: 567
    },
    {
      id: 4,
      title: "Sensor Integration Workshop",
      description: "Hands-on experience with various sensors including temperature, humidity, and motion detection modules.",
      type: "Interactive Lesson",
      difficulty: "Intermediate",
      duration: "90 min",
      thumbnail: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=200&fit=crop",
      tags: ["Sensors", "Integration", "IoT"],
      rating: 4.7,
      enrolledCount: 1100
    }
  ];

  const handleStartLesson = (content) => {
    switch (content.type) {
      case 'Interactive Lesson': navigate('/interactive-lesson-viewer');
        break;
      case 'Circuit Simulation': navigate('/circuit-simulation-workspace');
        break;
      case 'Code Editor': navigate('/code-editor-with-debugging');
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

  const getTypeIcon = (type) => {
    switch (type) {
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

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Recommended for You</h2>
          <p className="text-sm text-muted-foreground mt-1">Based on your learning progress and interests</p>
        </div>
        <Button variant="ghost" size="sm" iconName="ArrowRight" iconPosition="right">
          View All
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recommendedContent.map((content) => (
          <div key={content.id} className="bg-surface border border-border rounded-lg overflow-hidden hover:shadow-elevated transition-smooth">
            {/* Thumbnail */}
            <div className="relative h-40 overflow-hidden">
              <Image
                src={content.thumbnail}
                alt={content.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(content.difficulty)}`}>
                  {content.difficulty}
                </span>
              </div>
              <div className="absolute top-3 right-3">
                <div className="w-8 h-8 bg-surface/90 rounded-full flex items-center justify-center">
                  <Icon name={getTypeIcon(content.type)} size={16} className="text-foreground" />
                </div>
              </div>
              <div className="absolute bottom-3 left-3 right-3">
                <div className="flex items-center space-x-2 text-white">
                  <Icon name="Clock" size={14} />
                  <span className="text-xs font-medium">{content.duration}</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-xs text-muted-foreground">{content.type}</span>
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={12} className="text-accent fill-current" />
                  <span className="text-xs font-medium text-foreground">{content.rating}</span>
                </div>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">{content.enrolledCount} enrolled</span>
              </div>
              
              <h3 className="font-semibold text-foreground mb-2">{content.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{content.description}</p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {content.tags.map((tag, index) => (
                  <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-muted text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>

              <Button 
                variant="default" 
                size="sm" 
                fullWidth
                iconName="Play"
                iconPosition="left"
                onClick={() => navigate(`/interactive-lesson-viewer/${content.id}`)}
              >
                Preview Course
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedContentSection;