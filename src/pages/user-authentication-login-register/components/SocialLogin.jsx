import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SocialLogin = () => {
  const [loadingProvider, setLoadingProvider] = useState(null);
  const navigate = useNavigate();

  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: 'Chrome',
      color: 'text-red-600',
      bgColor: 'hover:bg-red-50'
    },
    {
      id: 'github',
      name: 'GitHub',
      icon: 'Github',
      color: 'text-gray-800',
      bgColor: 'hover:bg-gray-50'
    }
  ];

  const handleSocialLogin = (provider) => {
    setLoadingProvider(provider.id);
    
    // Simulate OAuth flow
    setTimeout(() => {
      navigate('/learning-dashboard');
    }, 1500);
  };

  return (
    <div className="space-y-4">
      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-surface text-muted-foreground">Or continue with</span>
        </div>
      </div>

      {/* Social Login Buttons */}
      <div className="grid grid-cols-2 gap-3">
        {socialProviders.map((provider) => (
          <Button
            key={provider.id}
            variant="outline"
            size="default"
            onClick={() => handleSocialLogin(provider)}
            loading={loadingProvider === provider.id}
            disabled={loadingProvider && loadingProvider !== provider.id}
            className={`${provider.bgColor} border-border`}
          >
            <div className="flex items-center justify-center space-x-2">
              <Icon 
                name={provider.icon} 
                size={18} 
                className={provider.color}
              />
              <span className="text-sm font-medium">{provider.name}</span>
            </div>
          </Button>
        ))}
      </div>

      {/* Additional Info */}
      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default SocialLogin;