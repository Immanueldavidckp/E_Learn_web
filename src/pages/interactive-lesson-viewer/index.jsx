import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import supabase from '../../lib/supabase';

// UI Components
import NavigationSidebar from '../../components/ui/NavigationSidebar';
import WorkspaceToolbar from '../../components/ui/WorkspaceToolbar';
import UserProfileDropdown from '../../components/ui/UserProfileDropdown';
import ProgressIndicator from '../../components/ui/ProgressIndicator';

// Lesson-Specific Components
import LessonHeader from './components/LessonHeader';
import TableOfContents from './components/TableOfContents';
import LessonContent from './components/LessonContent';
import LessonNavigation from './components/LessonNavigation';
import FloatingActionButton from './components/FloatingActionButton';
import NotesPanel from './components/NotesPanel';
import CategorizedCoursesSection from "./components/CategorizedCoursesSection";
import CoursePreview from "./components/CoursePreview";
import CProgram from './components/c_program';
import Basic_electronics from './components/basic-electronics';

const courseData = {
  'basic-electronics': {
    lessonData: {
      moduleNumber: 1,
      lessonNumber: 1,
      title: "Basic Electronics",
      description: "Learn the fundamentals of electronics including components, circuits, and measurements.",
      progress: 10,
      totalLessons: 5,
      currentLesson: 1,
      thumbnail: '/assets/images/no_image.png',
    },
    tableOfContents: [
      {
        id: 'intro',
        title: 'Introduction to Electronics',
        completed: true,
        hasInteractive: false,
        subsections: [
          { id: 'components', title: 'Electronic Components', completed: true },
          { id: 'circuits', title: 'Basic Circuits', completed: true }
        ]
      },
      {
        id: 'measurements',
        title: 'Measurements',
        completed: false,
        hasInteractive: true,
        subsections: [
          { id: 'voltage', title: 'Voltage Measurement', completed: false },
          { id: 'current', title: 'Current Measurement', completed: false }
        ]
      }
    ],
    lessonContent: [
      { type: 'heading', level: 2, content: 'Introduction to Electronics' },
      { type: 'text', content: 'This course covers the basics of electronic components and circuits.' }
    ]
  },
  'c-program': {
    lessonData: {
      moduleNumber: 1,
      lessonNumber: 2,
      title: "C Programming",
      description: "Introduction to C programming language for embedded systems.",
      progress: 20,
      totalLessons: 5,
      currentLesson: 2,
      thumbnail: '/assets/images/no_image.png',
    },
    tableOfContents: [
      {
        id: 'intro',
        title: 'Introduction to C',
        completed: true,
        hasInteractive: false,
        subsections: [
          { id: 'syntax', title: 'C Syntax', completed: true },
          { id: 'variables', title: 'Variables', completed: true }
        ]
      }
    ],
    lessonContent: [
      { type: 'heading', level: 2, content: 'Introduction to C Programming' },
      { type: 'text', content: 'This course introduces the C programming language basics.' }
    ]
  },
  'microcontroller': {
    lessonData: {
      moduleNumber: 1,
      lessonNumber: 3,
      title: "Microcontroller Basics",
      description: "Understand microcontroller architecture and programming basics.",
      progress: 0,
      totalLessons: 5,
      currentLesson: 1,
      thumbnail: '/assets/images/no_image.png',
    },
    tableOfContents: [
      {
        id: 'intro',
        title: 'Microcontroller Introduction',
        completed: false,
        hasInteractive: false,
        subsections: []
      }
    ],
    lessonContent: [
      { type: 'heading', level: 2, content: 'Microcontroller Basics' },
      { type: 'text', content: 'This course covers the basics of microcontroller architecture and programming.' }
    ]
  }
};

const InteractiveLessonViewer = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [started, setStarted] = useState(false);

  // Reset started state when courseId changes to show CoursePreview for new course
  React.useEffect(() => {
    console.log('CourseId changed:', courseId);
    setStarted(false);
  }, [courseId]);
  
  React.useEffect(() => {
    console.log('Started state:', started);
  }, [started]);
  const [enrolling, setEnrolling] = useState(false);
  const [enrollSuccess, setEnrollSuccess] = useState(null);
  const [enrollError, setEnrollError] = useState(null);
  const [enrolled, setEnrolled] = useState(false);
  const [loadingEnrollment, setLoadingEnrollment] = useState(true);

  const course = courseData[courseId];

  useEffect(() => {
    const checkEnrollment = async () => {
      if (!user) {
        setEnrolled(false);
        setLoadingEnrollment(false);
        return;
      }
      const { data, error } = await supabase
        .from('user_course_enrollments')
        .select('*')
        .eq('user_id', user.id)
        .eq('course_id', courseId)
        .single();
      if (error || !data) {
        setEnrolled(false);
      } else {
        setEnrolled(true);
      }
      setLoadingEnrollment(false);
    };
    checkEnrollment();
  }, [user, courseId]);

  const handleEnroll = async () => {
    if (!user) {
      navigate('/user-authentication-login-register');
      return;
    }
    setEnrolling(true);
    setEnrollError(null);
    setEnrollSuccess(null);
    try {
      const { error } = await supabase
        .from('user_course_enrollments')
        .insert([{ user_id: user.id, course_id: courseId }]);
      if (error) {
        setEnrollError(error.message);
      } else {
        setEnrollSuccess('Successfully enrolled in the course!');
        setEnrolled(true);
        setStarted(true);
      }
    } catch (err) {
      setEnrollError('Failed to enroll. Please try again.');
    } finally {
      setEnrolling(false);
    }
  };

  if (loadingEnrollment) {
    return <div>Loading...</div>;
  }

  if (!user || !enrolled) {
    if (courseId) {
      // Show course preview even if not logged in or enrolled
      if (!started) {
        return (
          <div className="min-h-screen bg-background">
            <NavigationSidebar />
            <header className="bg-surface border-b border-border px-6 py-4 ml-0 md:ml-16 lg:ml-60">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-foreground">Learn</h1>
                <UserProfileDropdown />
              </div>
            </header>
            <main className="workspace ml-0 md:ml-16 lg:ml-60" style={{ flex: 1, padding: '1rem' }}>
              <CoursePreview
                course={course}
                onStart={() => setStarted(true)}
                enrolled={enrolled}
                enrolling={enrolling}
                handleEnroll={handleEnroll}
                enrollSuccess={enrollSuccess}
                enrollError={enrollError}
                user={user}
                navigate={navigate}
              />
            </main>
          </div>
        );
      }
      // If started but not enrolled, show enrollment prompt
      return (
        <div className="min-h-screen bg-background">
          <NavigationSidebar />
          <header className="bg-surface border-b border-border px-6 py-4 ml-0 md:ml-16 lg:ml-60">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold text-foreground">Learn</h1>
              <UserProfileDropdown />
            </div>
          </header>
          <main className="workspace ml-0 md:ml-16 lg:ml-60" style={{ flex: 1, padding: '1rem' }}>
            <div className="p-4 text-center text-red-600">
              You must enroll in this course to access the content.
            </div>
            <div className="mt-4">
              <button
                onClick={handleEnroll}
                disabled={enrolling}
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
              >
                {enrolling ? 'Enrolling...' : 'Free Enroll'}
              </button>
              {enrollSuccess && <p className="text-green-600 mt-2">{enrollSuccess}</p>}
              {enrollError && <p className="text-red-600 mt-2">{enrollError}</p>}
            </div>
          </main>
        </div>
      );
    }
    // If no courseId, show all courses
    return (
      <div className="min-h-screen bg-background">
        <NavigationSidebar />
        <header className="bg-surface border-b border-border px-6 py-4 ml-0 md:ml-16 lg:ml-60">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-foreground">Learn</h1>
            <UserProfileDropdown />
          </div>
        </header>
        <main className="workspace ml-0 md:ml-16 lg:ml-60" style={{ flex: 1, padding: '1rem' }}>
          <CategorizedCoursesSection />
        </main>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <h2 className="text-2xl font-semibold text-red-600">Course not found</h2>
        <button
          onClick={() => navigate('/')}
          className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Go to Home
        </button>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="min-h-screen bg-background">
        <NavigationSidebar />
        <header className="bg-surface border-b border-border px-6 py-4 ml-0 md:ml-16 lg:ml-60">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-foreground">Learn</h1>
            <UserProfileDropdown />
          </div>
        </header>
        <main className="workspace ml-0 md:ml-16 lg:ml-60" style={{ flex: 1, padding: '1rem' }}>
          <CoursePreview
            course={course}
            onStart={() => setStarted(true)}
            enrolled={enrolled}
            enrolling={enrolling}
            handleEnroll={handleEnroll}
            enrollSuccess={enrollSuccess}
            enrollError={enrollError}
            user={user}
            navigate={navigate}
          />
        </main>
      </div>
    );
  }

  if (courseId === 'c-program') {
    return <CProgram />;
  }

  if (courseId === 'basic-electronics') {
    return <Basic_electronics />;
  }

  return (
    <div className="min-h-screen bg-background">
      <NavigationSidebar />
      <header className="bg-surface border-b border-border px-6 py-4 ml-0 md:ml-16 lg:ml-60">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-foreground">Learn</h1>
          <UserProfileDropdown />
        </div>
      </header>
      <main className="workspace ml-0 md:ml-16 lg:ml-60" style={{ flex: 1, padding: '1rem' }}>
        <WorkspaceToolbar />
        <LessonHeader lesson={course.lessonData} />
        <TableOfContents contents={course.tableOfContents} />
        <LessonContent content={course.lessonContent} />
        <LessonNavigation
          currentLesson={course.lessonData.currentLesson}
          totalLessons={course.lessonData.totalLessons}
        />
        <NotesPanel />
        <FloatingActionButton />
        <ProgressIndicator progress={course.lessonData.progress} />
      </main>
    </div>
  );
};

export default InteractiveLessonViewer;
