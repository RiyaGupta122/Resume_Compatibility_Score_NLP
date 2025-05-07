import React, { useState } from 'react';
import ResumeUpload from './ResumeUpload';
import JobDescriptionInput from './JobDescriptionInput';
import AnalysisResults from './AnalysisResults';
import LoadingState from '../ui/LoadingState';
import { Resume, JobDescription, AnalysisResult } from '../../types';
import { analyzeCompatibility } from '../../utils/nlpUtils';

const ResumeAnalyzer: React.FC = () => {
  const [resume, setResume] = useState<Resume | null>(null);
  const [jobDescription, setJobDescription] = useState<JobDescription | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  const handleResumeUpload = (uploadedResume: Resume) => {
    setResume(uploadedResume);
    setActiveStep(2);
    // Reset analysis if a new resume is uploaded
    setAnalysisResult(null);
  };

  const handleJobDescriptionSubmit = (submittedJobDescription: JobDescription) => {
    setJobDescription(submittedJobDescription);
    // If we have both resume and job description, proceed to analysis
    if (resume) {
      performAnalysis(resume, submittedJobDescription);
    }
  };

  const performAnalysis = async (resume: Resume, jobDesc: JobDescription) => {
    setIsAnalyzing(true);
    try {
      // In a real application, this would be a more complex NLP process
      // For demo purposes, we'll use a simulated analysis
      const result = await analyzeCompatibility(resume, jobDesc);
      setAnalysisResult(result);
      setActiveStep(3);
    } catch (error) {
      console.error('Analysis error:', error);
      // Handle error state
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetAnalysis = () => {
    setResume(null);
    setJobDescription(null);
    setAnalysisResult(null);
    setActiveStep(1);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Resume Compatibility Analysis
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Upload your resume and provide a job description to see how well they match.
        </p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center">
          <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
            activeStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
          }`}>
            1
          </div>
          <div className={`flex-1 h-1 mx-2 ${
            activeStep >= 2 ? 'bg-blue-600' : 'bg-gray-200'
          }`}></div>
          <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
            activeStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
          }`}>
            2
          </div>
          <div className={`flex-1 h-1 mx-2 ${
            activeStep >= 3 ? 'bg-blue-600' : 'bg-gray-200'
          }`}></div>
          <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
            activeStep >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
          }`}>
            3
          </div>
        </div>
        <div className="flex justify-between mt-2 text-sm">
          <span className={activeStep >= 1 ? 'text-blue-600 font-medium' : 'text-gray-500'}>Upload Resume</span>
          <span className={activeStep >= 2 ? 'text-blue-600 font-medium' : 'text-gray-500'}>Job Description</span>
          <span className={activeStep >= 3 ? 'text-blue-600 font-medium' : 'text-gray-500'}>View Results</span>
        </div>
      </div>

      {isAnalyzing ? (
        <LoadingState message="Analyzing your resume compatibility..." />
      ) : (
        <>
          {activeStep === 1 && (
            <ResumeUpload onUpload={handleResumeUpload} />
          )}
          
          {activeStep === 2 && (
            <JobDescriptionInput 
              onSubmit={handleJobDescriptionSubmit} 
              resumeKeywords={resume?.keywords || []}
            />
          )}
          
          {activeStep === 3 && analysisResult && (
            <AnalysisResults 
              result={analysisResult} 
              onReset={resetAnalysis} 
            />
          )}
        </>
      )}
    </div>
  );
};

export default ResumeAnalyzer;