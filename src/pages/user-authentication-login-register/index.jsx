import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import AuthHeader from './components/AuthHeader';
import AuthTabs from './components/AuthTabs';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import SocialLogin from './components/SocialLogin';
import AuthBackground from './components/AuthBackground';

const UserAuthenticationPage = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      <Helmet>
        <title>{activeTab === 'login' ? 'Sign In' : 'Create Account'} - EmbedSim Learning Platform</title>
        <meta 
          name="description" 
          content="Access your EmbedSim learning dashboard or create a new account to start your embedded systems journey with interactive simulations and hands-on projects." 
        />
      </Helmet>

      <div className="min-h-screen bg-background relative overflow-hidden">
        {/* Background Elements */}
        <AuthBackground />

        {/* Main Content */}
        <div className="relative z-10 min-h-screen flex flex-col">
          {/* Header */}
          <AuthHeader />

          {/* Main Authentication Area */}
          <div className="flex-1 flex items-center justify-center px-4 py-8">
            <div className={`w-full max-w-md transition-all duration-500 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              {/* Auth Card */}
              <div className="bg-card border border-border rounded-xl shadow-elevated p-8">
                {/* Welcome Message */}
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    {activeTab === 'login' ? 'Welcome Back!' : 'Join EmbedSim'}
                  </h2>
                  <p className="text-muted-foreground">
                    {activeTab === 'login' ?'Continue your embedded systems learning journey' :'Start your journey into embedded systems development'
                    }
                  </p>
                </div>

                {/* Tab Navigation */}
                <AuthTabs activeTab={activeTab} onTabChange={setActiveTab} />

                {/* Form Content */}
                <div className="space-y-6">
                  {activeTab === 'login' ? <LoginForm /> : <RegisterForm />}
                  
                  {/* Social Login */}
                  <SocialLogin />
                </div>

                {/* Footer Links */}
                <div className="mt-8 pt-6 border-t border-border text-center">
                  <p className="text-sm text-muted-foreground">
                    {activeTab === 'login' ? "Don't have an account? " : "Already have an account? "}
                    <button
                      onClick={() => setActiveTab(activeTab === 'login' ? 'register' : 'login')}
                      className="text-primary hover:text-primary/80 font-medium transition-smooth"
                    >
                      {activeTab === 'login' ? 'Create one here' : 'Sign in instead'}
                    </button>
                  </p>
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-6 text-center">
                <p className="text-xs text-muted-foreground">
                  Secure authentication powered by industry-standard encryption
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="py-4 text-center border-t border-border bg-surface/50">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} EmbedSim Learning Platform. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserAuthenticationPage;