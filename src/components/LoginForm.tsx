import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { useAuth } from './AuthContext';
import { Loader2, Eye, EyeOff } from 'lucide-react';

export function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('sarah.johnson@techcorp.com');
  const [password, setPassword] = useState('SecurePass123!');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { signIn, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await signIn(email, password);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign in failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <span className="font-bold text-xl text-gray-900">Brutalism</span>
          </div>
          <div>
            <CardTitle className="text-xl">Welcome back</CardTitle>
            <p className="text-sm text-gray-600 mt-2">Sign in to access your marketing dashboard</p>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="space-y-2">
              <Label htmlFor="email" className="font-medium">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-describedby={error ? "error-message" : undefined}
                className="h-11"
                autoComplete="email"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="font-medium">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11 pr-12"
                  autoComplete="current-password"
                  aria-describedby={error ? "error-message" : undefined}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-9 w-9 hover:bg-gray-100"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </Button>
              </div>
            </div>

            {error && (
              <div 
                id="error-message"
                className="text-red-700 text-sm bg-red-50 border border-red-200 p-3 rounded-md"
                role="alert"
                aria-live="polite"
              >
                {error}
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 h-11 font-medium"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </Button>
          </form>
          
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs font-medium text-blue-800 mb-2">Demo Account</p>
            <div className="text-xs text-blue-700 space-y-1">
              <p><strong>Email:</strong> sarah.johnson@techcorp.com</p>
              <p><strong>Password:</strong> SecurePass123!</p>
            </div>
            <p className="text-xs text-blue-600 mt-2">
              Credentials are pre-filled for easy access
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}