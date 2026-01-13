// TEMPORARY PASSWORD PROTECTION - Remove this component and its import from MainLayout.astro when ready for public access
// To remove: 1) Delete this file, 2) Remove PasswordProtection import and <PasswordProtection client:load /> from MainLayout.astro

import { useState, useEffect } from 'react';

const PASSWORD = 'mportugal2024';
const STORAGE_KEY = 'mportugal_auth';
const AUTH_DURATION = 60 * 60 * 1000;

interface AuthData {
  timestamp: number;
  token: string;
}

export default function PasswordProtection() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [clickCount, setClickCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const authData: AuthData = JSON.parse(stored);
          const now = Date.now();
          if (now - authData.timestamp < AUTH_DURATION) {
            setIsAuthenticated(true);
            return;
          } else {
            localStorage.removeItem(STORAGE_KEY);
          }
        }
      } catch (e) {
        localStorage.removeItem(STORAGE_KEY);
      }
      setIsAuthenticated(false);
    };

    checkAuth();
  }, []);

  const handleIconClick = () => {
    const now = Date.now();
    if (now - lastClickTime > 2000) {
      setClickCount(1);
    } else {
      setClickCount(prev => prev + 1);
    }
    setLastClickTime(now);

    if (clickCount + 1 >= 3) {
      setShowPasswordField(true);
      setClickCount(0);
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password === PASSWORD) {
      const authData: AuthData = {
        timestamp: Date.now(),
        token: btoa(`${PASSWORD}_${Date.now()}`)
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(authData));
      setIsAuthenticated(true);
      setShowPasswordField(false);
      setPassword('');
    } else {
      setError('Incorrect password');
      setPassword('');
    }
  };

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-white">
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center px-4 max-w-2xl">
          <div className="mb-8">
            <div className="inline-block p-4 bg-gray-200 rounded-full mb-6">
              <svg 
                className="w-16 h-16 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Work in Progress
            </h1>
            <p className="text-xl text-gray-600">
              This site is currently under development and not publicly available.
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={handleIconClick}
        className="absolute bottom-6 right-6 p-3 bg-gray-200 hover:bg-gray-300 rounded-full transition-colors shadow-lg"
        aria-label="Access"
      >
        <svg 
          className="w-6 h-6 text-gray-600" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
          />
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" 
          />
        </svg>
      </button>

      {showPasswordField && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Enter Password
            </h2>
            <form onSubmit={handlePasswordSubmit}>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 mb-4"
                placeholder="Password"
                autoFocus
              />
              {error && (
                <p className="text-red-600 text-sm mb-4">{error}</p>
              )}
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordField(false);
                    setPassword('');
                    setError('');
                    setClickCount(0);
                  }}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

