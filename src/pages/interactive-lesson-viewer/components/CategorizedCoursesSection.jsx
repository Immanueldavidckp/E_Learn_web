import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CategorizedCoursesSection = () => {
  const navigate = useNavigate();

  // Courses categorized as per user request
  const categorizedCourses = {
    Basic: [
      {
        id: 'basic-electronics',
        title: 'Basic Electronics',
        description: 'Learn the fundamentals of electronics including components, circuits, and measurements.',
        difficulty: 'Beginner',
        type: 'Interactive Lesson',
        duration: '40 min',
        thumbnail: '/assets/images/no_image.png',
      },
      {
        id: 'c-program',
        title: 'C Programming',
        description: 'Introduction to C programming language for embedded systems.',
        difficulty: 'Beginner',
        type: 'Interactive Lesson',
        duration: '50 min',
        thumbnail: '/assets/images/no_image.png',
      },
      {
        id: 'microcontroller',
        title: 'Microcontroller Basics',
        description: 'Understand microcontroller architecture and programming basics.',
        difficulty: 'Beginner',
        type: 'Interactive Lesson',
        duration: '45 min',
        thumbnail: '/assets/images/no_image.png',
      },
      {
        id: 'microprocessor',
        title: 'Microprocessor Fundamentals',
        description: 'Learn about microprocessor design and operation.',
        difficulty: 'Beginner',
        type: 'Interactive Lesson',
        duration: '45 min',
        thumbnail: '/assets/images/no_image.png',
      },
    ],
    Intermediate: [
      {
        id: '8015-embedded',
        title: 'Embedded Programming 8015',
        description: 'Programming embedded systems using 8015 microcontroller.',
        difficulty: 'Intermediate',
        type: 'Code Editor',
        duration: '60 min',
        thumbnail: '/assets/images/no_image.png',
      },
      {
        id: 'pic-microcontroller',
        title: 'PIC Microcontroller',
        description: 'Learn programming and interfacing of PIC microcontrollers.',
        difficulty: 'Intermediate',
        type: 'Interactive Lesson',
        duration: '60 min',
        thumbnail: '/assets/images/no_image.png',
      },
      {
        id: 'arm-cortex-m3',
        title: 'ARM Cortex-M3',
        description: 'Embedded programming with ARM Cortex-M3 microcontroller.',
        difficulty: 'Intermediate',
        type: 'Interactive Lesson',
        duration: '70 min',
        thumbnail: '/assets/images/no_image.png',
      },
      {
        id: 'arm-cortex-m4',
        title: 'ARM Cortex-M4',
        description: 'Advanced embedded programming with ARM Cortex-M4 microcontroller.',
        difficulty: 'Intermediate',
        type: 'Interactive Lesson',
        duration: '70 min',
        thumbnail: '/assets/images/no_image.png',
      },
      {
        id: 'stm32f44re',
        title: 'STM32F44RE',
        description: 'Embedded programming with STM32F44RE microcontroller.',
        difficulty: 'Intermediate',
        type: 'Interactive Lesson',
        duration: '75 min',
        thumbnail: '/assets/images/no_image.png',
      },
    ],
    Advanced: [
      {
        id: 'aar64',
        title: 'AArch64 Architecture',
        description: 'Learn the ARM 64-bit architecture and programming.',
        difficulty: 'Advanced',
        type: 'Interactive Lesson',
        duration: '80 min',
        thumbnail: '/assets/images/no_image.png',
      },
      {
        id: 'rtos',
        title: 'Real-Time Operating Systems (RTOS)',
        description: 'Understand RTOS concepts and implementation for embedded systems.',
        difficulty: 'Advanced',
        type: 'Interactive Lesson',
        duration: '90 min',
        thumbnail: '/assets/images/no_image.png',
      },
      {
        id: 'linux-embedded',
        title: 'Embedded Linux',
        description: 'Learn Linux for embedded systems development.',
        difficulty: 'Advanced',
        type: 'Interactive Lesson',
        duration: '90 min',
        thumbnail: '/assets/images/no_image.png',
      },
    ],
  };

  const handleStartLesson = (course) => {
    switch (course.type) {
      case 'Interactive Lesson':
        navigate(`/interactive-lesson-viewer/${course.id}`);
        break;
      case 'Circuit Simulation':
        navigate('/circuit-simulation-workspace');
        break;
      case 'Code Editor':
        navigate('/code-editor-with-debugging');
        break;
      default:
        navigate(`/interactive-lesson-viewer/${course.id}`);
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

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-8">
      <h2 className="text-xl font-semibold text-foreground mb-6">All Courses</h2>
      {Object.entries(categorizedCourses).map(([category, courses]) => (
        <div key={category} className="mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-4">{category}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div key={course.id} className="bg-surface border border-border rounded-lg overflow-hidden hover:shadow-elevated transition-smooth">
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(course.difficulty)}`}>
                      {course.difficulty}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h4 className="font-semibold text-foreground mb-2">{course.title}</h4>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{course.description}</p>
                  <Button
                    variant="default"
                    size="sm"
                    fullWidth
                    iconName="Play"
                    iconPosition="left"
                    onClick={() => navigate(`/interactive-lesson-viewer/${course.id}`)}
                  >
                    Preview Course
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategorizedCoursesSection;
