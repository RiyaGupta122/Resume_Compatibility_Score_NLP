import React, { useState } from 'react';
import { Briefcase, ArrowRight, Tag } from 'lucide-react';
import { JobDescription } from '../../types';

interface JobDescriptionInputProps {
  onSubmit: (jobDescription: JobDescription) => void;
  resumeKeywords: string[];
}

const JobDescriptionInput: React.FC<JobDescriptionInputProps> = ({ 
  onSubmit,
  resumeKeywords 
}) => {
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!text.trim()) {
      setIsValid(false);
      setErrorMessage('Job description is required');
      return;
    }
    
    if (!title.trim()) {
      setIsValid(false);
      setErrorMessage('Job title is required');
      return;
    }
    
    // Extract keywords from the job description
    // In a real app, this would use NLP techniques
    const extractedKeywords = extractKeywords(text);
    
    onSubmit({
      title,
      company,
      text,
      keywords: extractedKeywords
    });
  };
  
  // Simple keyword extraction (would be more sophisticated in a real app)
  const extractKeywords = (text: string): string[] => {
    const words = text.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 3)
      .filter(word => !commonWords.includes(word));
    
    // Return unique words
    return Array.from(new Set(words));
  };
  
  // Some common words to filter out in this simple example
  const commonWords = [
    'and', 'the', 'for', 'with', 'from', 'that', 'this', 
    'have', 'will', 'about', 'what', 'your', 'their', 'they'
  ];
  
  // Check if resume has matching keywords
  const matchingKeywords = resumeKeywords.filter(keyword => 
    text.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-300">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        Enter Job Description
      </h3>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Job Title
          </label>
          <input
            id="jobTitle"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            placeholder="e.g. Senior Software Engineer"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Company (Optional)
          </label>
          <input
            id="company"
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            placeholder="e.g. Acme Inc."
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Job Description
          </label>
          <textarea
            id="jobDescription"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setIsValid(true);
              setErrorMessage('');
            }}
            rows={8}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white ${
              !isValid ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder="Paste the full job description here..."
            required
          ></textarea>
          
          {!isValid && (
            <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
          )}
        </div>
        
        {text && resumeKeywords.length > 0 && (
          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md">
            <div className="flex items-center text-blue-700 dark:text-blue-300 text-sm font-medium mb-2">
              <Tag className="h-4 w-4 mr-1" />
              <span>Keyword Match Preview</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              {matchingKeywords.length} of {resumeKeywords.length} keywords from your resume match this job description.
            </p>
            <div className="flex flex-wrap gap-2">
              {resumeKeywords.slice(0, 8).map((keyword, index) => {
                const isMatch = text.toLowerCase().includes(keyword.toLowerCase());
                return (
                  <span 
                    key={index}
                    className={`text-xs px-2 py-1 rounded-full ${
                      isMatch 
                        ? 'bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-300' 
                        : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                    }`}
                  >
                    {keyword}
                  </span>
                );
              })}
              {resumeKeywords.length > 8 && (
                <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                  +{resumeKeywords.length - 8} more
                </span>
              )}
            </div>
          </div>
        )}
        
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center transition-colors duration-200"
          >
            Analyze Compatibility
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      </form>
      
      <div className="mt-6">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">What we'll analyze:</h4>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
          <li className="flex items-center text-gray-600 dark:text-gray-400">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
            Skill and keyword matches
          </li>
          <li className="flex items-center text-gray-600 dark:text-gray-400">
            <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
            Experience relevance
          </li>
          <li className="flex items-center text-gray-600 dark:text-gray-400">
            <div className="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
            Qualification alignment
          </li>
          <li className="flex items-center text-gray-600 dark:text-gray-400">
            <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
            Missing requirements
          </li>
        </ul>
      </div>
    </div>
  );
};

export default JobDescriptionInput;