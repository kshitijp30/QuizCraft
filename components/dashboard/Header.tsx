import React, { useState } from 'react';
import { AuthState } from '../../App';
import { Icon } from '../ui/Icon';
import { useTheme } from '../../context/ThemeContext';

interface HeaderProps {
    setAuthState: (state: AuthState) => void;
}

const Header: React.FC<HeaderProps> = ({ setAuthState }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    localStorage.removeItem('quizcraft_session');
    setAuthState(AuthState.Landing);
  };

  return (
    <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-800 h-20">
      <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Welcome, Educator!</h1>
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Toggle theme"
        >
          <Icon name={theme === 'light' ? 'moon' : 'sun'} className="w-6 h-6" />
        </button>
        
        {/* Profile Dropdown */}
        <div className="relative">
          <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="rounded-full w-9 h-9 bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
             <img src="https://picsum.photos/100/100" alt="User" className="w-full h-full object-cover"/>
          </button>
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 border border-gray-200 dark:border-gray-700 z-20">
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Profile</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Settings</a>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;