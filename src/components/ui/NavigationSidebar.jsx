import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const NavigationSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'LayoutDashboard',
      path: '/learning-dashboard',
      description: 'Progress tracking and content discovery'
    },
    {
      id: 'learn',
      label: 'Learn',
      icon: 'BookOpen',
      path: '/interactive-lesson-viewer',
      description: 'Interactive lessons and tutorials'
    },
    {
      id: 'simulate',
      label: 'Simulate',
      icon: 'Zap',
      path: '/circuit-simulation-workspace',
      description: 'Circuit simulation workspace'
    },
    {
      id: 'code',
      label: 'Code',
      icon: 'Code',
      path: '/code-editor-with-debugging',
      description: 'Integrated development environment'
    },
    {
      id: 'components',
      label: 'Components',
      icon: 'Package',
      path: '/component-library-browser',
      description: 'Embedded system parts library'
    }
  ];

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (window.innerWidth >= 1024) {
        setIsCollapsed(false);
      } else if (window.innerWidth >= 768) {
        setIsCollapsed(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  if (isMobile) {
    return (
      <nav className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border z-50">
        <div className="flex justify-around items-center h-16 px-2">
          {navigationItems.slice(0, 4).map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.path)}
              className={`flex flex-col items-center justify-center p-2 rounded-lg transition-smooth ${
                isActive(item.path)
                  ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={item.icon} size={20} />
              <span className="text-xs mt-1 font-medium">{item.label}</span>
            </button>
          ))}
          <button
            onClick={() => handleNavigation('/component-library-browser')}
            className={`flex flex-col items-center justify-center p-2 rounded-lg transition-smooth ${
              isActive('/component-library-browser')
                ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            <Icon name="MoreHorizontal" size={20} />
            <span className="text-xs mt-1 font-medium">More</span>
          </button>
        </div>
      </nav>
    );
  }

  return (
    <aside className={`fixed left-0 top-0 h-full bg-surface border-r border-border z-40 transition-content ${
      isCollapsed ? 'w-16' : 'w-60'
    }`}>
      <div className="flex flex-col h-full">
        {/* Logo Section */}
        <div className="flex items-center h-16 px-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Cpu" size={20} color="white" />
            </div>
            {!isCollapsed && (
              <div>
                <h1 className="text-lg font-semibold text-foreground">EmbedSim</h1>
                <p className="text-xs text-muted-foreground">Learning Platform</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-6">
          <div className="space-y-2">
            {/* Learning Section */}
            {!isCollapsed && (
              <div className="px-2 mb-4">
                <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Learning
                </h3>
              </div>
            )}
            
            {navigationItems.slice(0, 2).map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.path)}
                className={`w-full flex items-center px-3 py-2.5 rounded-lg transition-smooth group ${
                  isActive(item.path)
                    ? 'bg-primary text-primary-foreground shadow-soft'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
                title={isCollapsed ? item.description : ''}
              >
                <Icon 
                  name={item.icon} 
                  size={20} 
                  className={`${isCollapsed ? 'mx-auto' : 'mr-3'}`}
                />
                {!isCollapsed && (
                  <span className="font-medium">{item.label}</span>
                )}
              </button>
            ))}

            {/* Workspace Section */}
            {!isCollapsed && (
              <div className="px-2 mt-8 mb-4">
                <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Workspace
                </h3>
              </div>
            )}
            
            {navigationItems.slice(2).map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.path)}
                className={`w-full flex items-center px-3 py-2.5 rounded-lg transition-smooth group ${
                  isActive(item.path)
                    ? 'bg-primary text-primary-foreground shadow-soft'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
                title={isCollapsed ? item.description : ''}
              >
                <Icon 
                  name={item.icon} 
                  size={20} 
                  className={`${isCollapsed ? 'mx-auto' : 'mr-3'}`}
                />
                {!isCollapsed && (
                  <span className="font-medium">{item.label}</span>
                )}
              </button>
            ))}
          </div>
        </nav>

        {/* Collapse Toggle */}
        {!isMobile && (
          <div className="p-4 border-t border-border">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="w-full flex items-center justify-center p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
              title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <Icon 
                name={isCollapsed ? 'ChevronRight' : 'ChevronLeft'} 
                size={20} 
              />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default NavigationSidebar;