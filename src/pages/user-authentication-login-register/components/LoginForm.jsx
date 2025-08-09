import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { signIn, authError, clearError } = useAuth();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (authError) {
      clearError();
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    clearError();

    try {
      const result = await signIn(formData.email, formData.password);
      
      if (result?.success) {
        navigate('/learning-dashboard');
      } else {
        // Error is already set in AuthContext
        setErrors({ submit: result?.error || 'Login failed' });
      }
    } catch (error) {
      setErrors({ submit: 'Something went wrong. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!formData.email) {
      setErrors({ email: 'Please enter your email address first' });
      return;
    }

    try {
      const { resetPassword } = useAuth();
      const result = await resetPassword(formData.email);
      
      if (result?.success) {
        alert('Password reset email sent! Please check your inbox.');
      } else {
        alert('Failed to send reset email. Please try again.');
      }
    } catch (error) {
      alert('Failed to send reset email. Please try again.');
    }
  };

  const demoCredentials = {
    student: { email: 'student@embedsim.com', password: 'EmbedSim2024!' },
    admin: { email: 'admin@embedsim.com', password: 'EmbedSim2024!' }
  };

  const fillDemoCredentials = (role) => {
    setFormData(prev => ({
      ...prev,
      email: demoCredentials[role].email,
      password: demoCredentials[role].password
    }));
    clearError();
    setErrors({});
  };

  return (
    <>
      {/* Demo Credentials Helper */}
      <div className="mb-4 p-3 bg-muted/30 border border-border rounded-lg">
        <p className="text-sm text-muted-foreground mb-2">Quick Demo Login:</p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => fillDemoCredentials('student')}
            className="text-xs px-2 py-1 bg-primary/10 text-primary rounded hover:bg-primary/20 transition-smooth"
          >
            Student Account
          </button>
          <button
            type="button"
            onClick={() => fillDemoCredentials('admin')}
            className="text-xs px-2 py-1 bg-secondary/10 text-secondary rounded hover:bg-secondary/20 transition-smooth"
          >
            Admin Account
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleInputChange}
          error={errors.email}
          required
          className="mb-4"
        />

        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
            error={errors.password}
            required
            className="mb-4"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-smooth"
          >
            <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={18} />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <Checkbox
            label="Remember me"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleInputChange}
          />
          
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-sm text-primary hover:text-primary/80 transition-smooth"
          >
            Forgot password?
          </button>
        </div>

        {(errors.submit || authError) && (
          <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="text-sm text-destructive">{errors.submit || authError}</p>
          </div>
        )}

        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={isLoading}
          className="mt-6"
        >
          Sign In
        </Button>
      </form>
    </>
  );
};

export default LoginForm;