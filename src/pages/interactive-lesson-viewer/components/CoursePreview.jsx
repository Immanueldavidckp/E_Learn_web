import React, { useState } from 'react';

const CoursePreview = ({ course, onStart, enrolled, enrolling, handleEnroll, enrollSuccess, enrollError, user, navigate }) => {
  const [activeTab, setActiveTab] = useState('whatYouWillLearn');

  const whatYouWillLearn = [
    'Understand the basics of ARM emulation and program structure',
    'The fundamentals of register, stack, and memory addressing modes',
    'The concepts of arithmetic and logical operators',
    'The main concept of branches, loops, and subroutine branches',
    'The ways to interact with simple hardware devices',
  ];

  const courseContent = [
    'Introduction to Electronics',
    'Electronic Components',
    'Basic Circuits',
    'Measurements',
    'Voltage Measurement',
    'Current Measurement',
  ];

  const instructor = {
    name: 'Immanuel David',
    description: 'Working professional in automobile industry',
  };

  const handleEnrollClick = () => {
    if (!user) {
      navigate('/user-authentication-login-register');
      return;
    }
    handleEnroll();
  };

  if (!course || !course.lessonData) {
    return (
      <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto', color: 'red' }}>
        <h2>Course data is not available.</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ display: 'flex', gap: '2rem', marginBottom: '1rem' }}>
        <div style={{ flex: '1 1 40%' }}>
          <img
            src={course.lessonData.thumbnail || '/assets/images/no_image.png'}
            alt={course.lessonData.title}
            style={{ width: '100%', borderRadius: '8px' }}
          />
        </div>
        <div style={{ flex: '1 1 60%' }}>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            {course.lessonData.title}
          </h1>
          <p style={{ marginBottom: '1rem', color: '#555' }}>{course.lessonData.description}</p>
          {!enrolled && (
            <button
              onClick={handleEnrollClick}
              disabled={enrolling}
              style={{
                backgroundColor: '#7c3aed',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '6px',
                fontWeight: 'bold',
                fontSize: '1rem',
                cursor: 'pointer',
                border: 'none',
                marginBottom: '1rem',
                width: '100%',
              }}
            >
              {enrolling ? 'Enrolling...' : 'Free Enroll'}
            </button>
          )}
          {enrollSuccess && <p style={{ color: 'green', marginTop: '0.5rem' }}>{enrollSuccess}</p>}
          {enrollError && <p style={{ color: 'red', marginTop: '0.5rem' }}>{enrollError}</p>}
          <div style={{ borderBottom: '1px solid #ddd', marginBottom: '1rem' }}>
            <nav style={{ display: 'flex', gap: '1rem', fontWeight: 'bold', color: '#444' }}>
              <div
                onClick={() => setActiveTab('whatYouWillLearn')}
                style={{
                  borderBottom: activeTab === 'whatYouWillLearn' ? '2px solid #7c3aed' : 'none',
                  paddingBottom: '0.5rem',
                  cursor: 'pointer',
                }}
              >
                What you'll learn
              </div>
              <div
                onClick={() => setActiveTab('courseContent')}
                style={{
                  borderBottom: activeTab === 'courseContent' ? '2px solid #7c3aed' : 'none',
                  paddingBottom: '0.5rem',
                  cursor: 'pointer',
                }}
              >
                Course content
              </div>
              <div
                onClick={() => setActiveTab('reviews')}
                style={{
                  borderBottom: activeTab === 'reviews' ? '2px solid #7c3aed' : 'none',
                  paddingBottom: '0.5rem',
                  cursor: 'pointer',
                  color: '#aaa',
                  pointerEvents: 'none', // disable clicks for now
                }}
              >
                Reviews
              </div>
              <div
                onClick={() => setActiveTab('instructors')}
                style={{
                  borderBottom: activeTab === 'instructors' ? '2px solid #7c3aed' : 'none',
                  paddingBottom: '0.5rem',
                  cursor: 'pointer',
                }}
              >
                Instructors
              </div>
            </nav>
          </div>
          <div style={{ color: '#555' }}>
            {activeTab === 'whatYouWillLearn' && (
              <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                {whatYouWillLearn.map((item, index) => (
                  <li key={index} style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="green"
                      style={{ width: '20px', height: '20px', marginRight: '0.5rem' }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            )}
            {activeTab === 'courseContent' && (
              <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                {courseContent.map((item, index) => (
                  <li key={index} style={{ marginBottom: '0.5rem' }}>
                    {item}
                  </li>
                ))}
              </ul>
            )}
            {activeTab === 'instructors' && (
              <div>
                <h3>{instructor.name}</h3>
                <p>{instructor.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePreview;

