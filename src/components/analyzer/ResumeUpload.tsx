import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, X, Check } from 'lucide-react';
import { extractTextFromPdf, parseResumeText } from '../../utils/pdfUtils';
import { Resume } from '../../types';

interface ResumeUploadProps {
  onUpload: (resume: Resume) => void;
}

const ResumeUpload: React.FC<ResumeUploadProps> = ({ onUpload }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    // Reset states
    setUploadError(null);
    setIsUploading(true);
    setUploadedFile(file);
    
    try {
      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          const newProgress = prev + 10;
          return newProgress > 90 ? 90 : newProgress;
        });
      }, 200);

      // Extract text from PDF
      const text = await extractTextFromPdf(file);
      if (!text) {
        throw new Error('Could not extract text from the PDF.');
      }

      // Parse resume text to extract structured data
      const resumeData = await parseResumeText(text);
      
      // Complete progress
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      // Pass the resume data to parent component
      onUpload({
        file,
        filename: file.name,
        text,
        ...resumeData
      });
    } catch (error) {
      console.error('PDF processing error:', error);
      setUploadError('Failed to process the resume. Please try another file.');
    } finally {
      setIsUploading(false);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
    },
    maxFiles: 1,
    multiple: false,
  });

  const handleReset = () => {
    setUploadedFile(null);
    setUploadProgress(0);
    setUploadError(null);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-300">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        Upload Your Resume
      </h3>
      
      {!uploadedFile ? (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive
              ? 'border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/20'
              : 'border-gray-300 hover:border-blue-400 dark:border-gray-600 dark:hover:border-blue-500'
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="w-12 h-12 mx-auto text-blue-500 dark:text-blue-400 mb-4" />
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            {isDragActive
              ? 'Drop your resume here...'
              : 'Drag and drop your resume here, or click to select'}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Supports PDF format only
          </p>
        </div>
      ) : (
        <div className="border rounded-lg p-6">
          <div className="flex items-center mb-4">
            <div className="flex-shrink-0 mr-3">
              <FileText className="w-8 h-8 text-blue-500" />
            </div>
            <div className="flex-grow">
              <p className="font-medium text-gray-800 dark:text-white truncate">
                {uploadedFile.name}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {(uploadedFile.size / 1024).toFixed(1)} KB
              </p>
            </div>
            <button 
              onClick={handleReset}
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Remove file"
            >
              <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
          
          {isUploading ? (
            <div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-2">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Analyzing resume...
              </p>
            </div>
          ) : uploadError ? (
            <div className="text-red-500 text-sm flex items-center">
              <X className="w-4 h-4 mr-1" />
              {uploadError}
            </div>
          ) : uploadProgress === 100 ? (
            <div className="text-green-500 text-sm flex items-center">
              <Check className="w-4 h-4 mr-1" />
              Resume processed successfully!
            </div>
          ) : null}
        </div>
      )}

      {uploadError && (
        <p className="mt-4 text-sm text-red-500">
          {uploadError}
        </p>
      )}

      <div className="mt-6">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tips for better results:</h4>
        <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-400 space-y-1">
          <li>Use a well-formatted, ATS-friendly resume</li>
          <li>Ensure your PDF is text-based, not scanned images</li>
          <li>Include relevant skills, experiences, and keywords</li>
          <li>Quantify your achievements where possible</li>
        </ul>
      </div>
    </div>
  );
};

export default ResumeUpload;