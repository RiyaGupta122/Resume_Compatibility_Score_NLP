import React from 'react';
import { FileText, Briefcase, BarChart } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const Header: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header className="bg-white shadow-sm dark:bg-gray-800 transition-colors duration-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">
              ResuMatch
            </h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">
              <FileText className="h-4 w-4" />
              <span>Resume</span>
            </a>
            <a href="#" className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">
              <Briefcase className="h-4 w-4" />
              <span>Jobs</span>
            </a>
            <a href="#" className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">
              <BarChart className="h-4 w-4" />
              <span>Analytics</span>
            </a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? (
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;