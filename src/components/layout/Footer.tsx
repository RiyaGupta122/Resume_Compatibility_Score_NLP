import React from 'react';
import { Github, Twitter, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white shadow-sm dark:bg-gray-800 mt-auto transition-colors duration-200">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} ResuMatch. All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <a
              href="#"
              className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;