import React from 'react';
import Icon from '../../../components/AppIcon';

const AuthBackground = () => {
  return (
    <div className="hidden lg:block fixed inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute top-40 right-32 w-24 h-24 bg-secondary/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-32 left-32 w-40 h-40 bg-accent/10 rounded-full blur-3xl"></div>
      
      {/* Circuit Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="circuit" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="currentColor" />
              <circle cx="18" cy="18" r="1" fill="currentColor" />
              <path d="M2,2 L18,2 L18,18 L2,18 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </div>

      {/* Floating Icons */}
      <div className="absolute top-1/4 left-1/4 animate-pulse">
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="Cpu" size={24} className="text-primary/30" />
        </div>
      </div>
      
      <div className="absolute top-1/3 right-1/4 animate-pulse delay-1000">
        <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
          <Icon name="Zap" size={20} className="text-secondary/30" />
        </div>
      </div>
      
      <div className="absolute bottom-1/3 left-1/3 animate-pulse delay-2000">
        <div className="w-14 h-14 bg-accent/10 rounded-lg flex items-center justify-center">
          <Icon name="Code" size={28} className="text-accent/30" />
        </div>
      </div>
    </div>
  );
};

export default AuthBackground;