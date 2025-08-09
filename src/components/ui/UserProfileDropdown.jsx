import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Icon from '../AppIcon';
import Button from './Button';

const UserProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { user, userProfile, signOut, loading } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      const result = await signOut();
      if (result?.success) {
        navigate('/user-authentication-login-register');
      }
    } catch (error) {
      console.log('Logout error:', error);
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  // Show loading state while auth is initializing
  if (loading) {
    return (
      <div className="w-8 h-8 bg-muted animate-pulse rounded-full"></div>
    );
  }

  // Show login button if no user
  if (!user) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => navigate('/user-authentication-login-register')}
      >
        Sign In
      </Button>
    );
  }

  const displayName = userProfile?.full_name || userProfile?.username || user?.email?.split('@')[0] || 'User';
  const avatarUrl = userProfile?.avatar_url;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted transition-smooth focus:outline-none focus:ring-2 focus:ring-primary/50"
      >
        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={displayName}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-sm font-medium text-primary">
              {displayName?.charAt(0)?.toUpperCase()}
            </span>
          )}
        </div>
        
        {/* Name and Icon */}
        <div className="hidden md:flex items-center space-x-1">
          <span className="text-sm font-medium text-foreground">{displayName}</span>
          <Icon
            name="ChevronDown"
            size={16}
            className={`text-muted-foreground transition-transform ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-card border border-border rounded-lg shadow-elevated z-50">
          {/* User Info Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={displayName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-base font-medium text-primary">
                    {displayName?.charAt(0)?.toUpperCase()}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {displayName}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {user?.email}
                </p>
                {userProfile?.role && (
                  <p className="text-xs text-primary capitalize">
                    {userProfile.role}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <button
              onClick={() => {
                setIsOpen(false);
                // Add profile page navigation when available
                alert('Profile settings coming soon!');
              }}
              className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-foreground hover:bg-muted transition-smooth"
            >
              <Icon name="User" size={16} className="text-muted-foreground" />
              <span>Profile Settings</span>
            </button>

            <button
              onClick={() => {
                setIsOpen(false);
                navigate('/learning-dashboard');
              }}
              className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-foreground hover:bg-muted transition-smooth"
            >
              <Icon name="BookOpen" size={16} className="text-muted-foreground" />
              <span>Learning Dashboard</span>
            </button>

            <button
              onClick={() => {
                setIsOpen(false);
                alert('Settings coming soon!');
              }}
              className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-foreground hover:bg-muted transition-smooth"
            >
              <Icon name="Settings" size={16} className="text-muted-foreground" />
              <span>Settings</span>
            </button>
          </div>

          {/* Sign Out */}
          <div className="border-t border-border py-2">
            <button
              onClick={handleSignOut}
              disabled={isLoading}
              className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-smooth disabled:opacity-50"
            >
              <Icon 
                name={isLoading ? "Loader2" : "LogOut"} 
                size={16} 
                className={`${isLoading ? "animate-spin" : ""}`}
              />
              <span>{isLoading ? 'Signing out...' : 'Sign Out'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileDropdown;