import React, { useState } from 'react';
import { 
  Bar, Doughnut, Radar, Chart as ChartJS,
  CategoryScale, LinearScale, BarElement, 
  ArcElement, RadialLinearScale, PointElement, 
  LineElement, Tooltip, Legend 
} from 'chart.js';
import { Bar as BarChart, Doughnut as DoughnutChart, Radar as RadarChart } from 'react-chartjs-2';
import { Download, RefreshCw as Refresh, Award, ArrowUp, AlertTriangle, Info } from 'lucide-react';
import { AnalysisResult } from '../../types';

// Register ChartJS components
ChartJS.register(
  CategoryScale, LinearScale, BarElement, 
  ArcElement, RadialLinearScale, PointElement, 
  LineElement, Tooltip, Legend
);

interface AnalysisResultsProps {
  result: AnalysisResult;
  onReset: () => void;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ result, onReset }) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Format percentage for display
  const formatPercentage = (value: number): string => {
    return `${Math.round(value)}%`;
  };
  
  // Dashboard sections
  const renderOverview = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 h-full">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Compatibility Score
          </h3>
          
          <div className="flex items-center justify-center mb-6">
            <div className="relative w-48 h-48">
              <DoughnutChart 
                data={{
                  datasets: [{
                    data: [result.overallScore, 100 - result.overallScore],
                    backgroundColor: [
                      result.overallScore >= 70 ? '#10B981' : result.overallScore >= 40 ? '#F59E0B' : '#EF4444',
                      '#E5E7EB'
                    ],
                    borderWidth: 0,
                    cutout: '80%'
                  }]
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false
                    },
                    tooltip: {
                      enabled: false
                    }
                  }
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-4xl font-bold text-gray-800 dark:text-white">
                  {formatPercentage(result.overallScore)}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">Match</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(result.categoryScores).map(([category, score]) => (
              <div key={category} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1 capitalize">
                  {category}
                </p>
                <div className="flex items-center">
                  <div className="flex-grow h-2 bg-gray-200 dark:bg-gray-600 rounded-full mr-2">
                    <div 
                      className={`h-2 rounded-full ${
                        score >= 70 ? 'bg-green-500' : score >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${score}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    {formatPercentage(score)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Key Insights
        </h3>
        
        <div className="space-y-4">
          {result.insights.map((insight, index) => (
            <div key={index} className="flex">
              <div className="flex-shrink-0 mr-3">
                {insight.type === 'strength' ? (
                  <Award className="h-5 w-5 text-green-500" />
                ) : insight.type === 'improvement' ? (
                  <ArrowUp className="h-5 w-5 text-blue-500" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  {insight.title}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {insight.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Quick Actions
          </h4>
          <div className="flex space-x-2">
            <button className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center">
              <Download className="h-4 w-4 mr-1" />
              Download Report
            </button>
            <button 
              onClick={onReset}
              className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center"
            >
              <Refresh className="h-4 w-4 mr-1" />
              New Analysis
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  
  const renderSkillMatch = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Skills Comparison
        </h3>
        <div className="h-80">
          <BarChart
            data={{
              labels: result.skillsComparison.map(skill => skill.name),
              datasets: [
                {
                  label: 'Your Proficiency',
                  data: result.skillsComparison.map(skill => skill.resumeScore),
                  backgroundColor: '#3B82F6',
                  borderRadius: 4
                },
                {
                  label: 'Job Requirement',
                  data: result.skillsComparison.map(skill => skill.jobRequirement),
                  backgroundColor: '#6366F1',
                  borderRadius: 4
                }
              ]
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                x: {
                  grid: {
                    display: false
                  }
                },
                y: {
                  beginAtZero: true,
                  max: 100
                }
              }
            }}
          />
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Skills Radar
        </h3>
        <div className="h-64">
          <RadarChart
            data={{
              labels: result.skillsComparison.slice(0, 6).map(skill => skill.name),
              datasets: [
                {
                  label: 'Your Skills',
                  data: result.skillsComparison.slice(0, 6).map(skill => skill.resumeScore),
                  backgroundColor: 'rgba(79, 70, 229, 0.2)',
                  borderColor: 'rgba(79, 70, 229, 1)',
                  borderWidth: 2,
                },
                {
                  label: 'Job Requirements',
                  data: result.skillsComparison.slice(0, 6).map(skill => skill.jobRequirement),
                  backgroundColor: 'rgba(59, 130, 246, 0.2)',
                  borderColor: 'rgba(59, 130, 246, 1)',
                  borderWidth: 2,
                }
              ]
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                r: {
                  angleLines: {
                    display: true
                  },
                  suggestedMin: 0,
                  suggestedMax: 100
                }
              }
            }}
          />
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 lg:col-span-3">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Missing Skills
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {result.missingSkills.map((skill, index) => (
            <div key={index} className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/50 rounded-lg p-3">
              <div className="flex items-center text-red-600 dark:text-red-400 font-medium mb-1">
                <AlertTriangle className="h-4 w-4 mr-1" />
                {skill.name}
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {skill.importance === 'high' 
                  ? 'Critical requirement mentioned multiple times'
                  : skill.importance === 'medium'
                  ? 'Important skill mentioned in requirements'
                  : 'Mentioned as a preferred skill'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
  const renderImprovements = () => (
    <div className="grid grid-cols-1 gap-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Suggested Resume Improvements
        </h3>
        
        <div className="space-y-6">
          {result.improvements.map((improvement, index) => (
            <div key={index} className="border-l-4 border-blue-500 pl-4">
              <h4 className="text-md font-medium text-gray-800 dark:text-white mb-2">
                {improvement.section}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                {improvement.description}
              </p>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-md p-3">
                <div className="flex items-center mb-2">
                  <Info className="h-4 w-4 text-blue-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    Example
                  </span>
                </div>
                <pre className="text-xs text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
                  {improvement.example}
                </pre>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
  return (
    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 transition-all duration-300">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          Analysis Results
        </h2>
        
        <div className="flex space-x-2">
          <button 
            className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center"
          >
            <Download className="h-4 w-4 mr-1" />
            Export
          </button>
          <button 
            onClick={onReset}
            className="px-3 py-1.5 text-sm bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center"
          >
            <Refresh className="h-4 w-4 mr-1" />
            New Analysis
          </button>
        </div>
      </div>
      
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
        <button
          className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
            activeTab === 'overview'
              ? 'border-blue-500 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
            activeTab === 'skills'
              ? 'border-blue-500 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('skills')}
        >
          Skills Match
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
            activeTab === 'improvements'
              ? 'border-blue-500 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('improvements')}
        >
          Improvements
        </button>
      </div>
      
      <div className="min-h-[600px]">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'skills' && renderSkillMatch()}
        {activeTab === 'improvements' && renderImprovements()}
      </div>
    </div>
  );
};

export default AnalysisResults;