import { Resume, JobDescription, AnalysisResult } from '../types';

/**
 * Analyze the compatibility between a resume and job description
 * Note: In a production app, this would use proper NLP techniques
 */
export const analyzeCompatibility = async (
  resume: Resume,
  jobDescription: JobDescription
): Promise<AnalysisResult> => {
  // Simulate an API call / processing time
  return new Promise((resolve) => {
    setTimeout(() => {
      // Calculate keyword match
      const keywordMatches = resume.keywords.filter((keyword) =>
        jobDescription.text.toLowerCase().includes(keyword.toLowerCase())
      );
      
      const keywordScore = Math.min(
        100,
        (keywordMatches.length / Math.max(1, jobDescription.keywords.length)) * 100
      );
      
      // Mock scores for other categories
      const skillsScore = 75;
      const experienceScore = 85;
      const educationScore = 90;
      
      // Calculate overall score (weighted average)
      const overallScore = (
        skillsScore * 0.4 +
        experienceScore * 0.3 +
        keywordScore * 0.2 +
        educationScore * 0.1
      );
      
      // Generate mock skill comparisons
      const skillsComparison = [
        { name: 'JavaScript', resumeScore: 90, jobRequirement: 85 },
        { name: 'React', resumeScore: 80, jobRequirement: 90 },
        { name: 'Node.js', resumeScore: 75, jobRequirement: 70 },
        { name: 'Python', resumeScore: 65, jobRequirement: 40 },
        { name: 'TypeScript', resumeScore: 70, jobRequirement: 80 },
        { name: 'SQL', resumeScore: 60, jobRequirement: 65 },
        { name: 'Docker', resumeScore: 50, jobRequirement: 75 },
        { name: 'AWS', resumeScore: 40, jobRequirement: 60 }
      ];
      
      // Generate mock missing skills
      const missingSkills = [
        { name: 'Kubernetes', importance: 'medium' as const },
        { name: 'GraphQL', importance: 'low' as const },
        { name: 'CI/CD', importance: 'high' as const }
      ];
      
      // Generate mock insights
      const insights = [
        {
          type: 'strength' as const,
          title: 'Strong JavaScript Fundamentals',
          description: 'Your JavaScript expertise aligns well with this role\'s requirements.'
        },
        {
          type: 'weakness' as const,
          title: 'Limited DevOps Experience',
          description: 'The role emphasizes Docker and Kubernetes skills that appear to be less developed in your resume.'
        },
        {
          type: 'improvement' as const,
          title: 'Highlight Project Management',
          description: 'You mentioned team leadership, but could emphasize project management skills more explicitly.'
        },
        {
          type: 'strength' as const,
          title: 'Relevant Work History',
          description: 'Your experience at ABC Tech closely matches the job requirements.'
        }
      ];
      
      // Generate mock improvement suggestions
      const improvements = [
        {
          section: 'Skills Section',
          description: 'Add missing keywords that are important for this role.',
          example: 'Add "CI/CD", "Kubernetes", and "GraphQL" to your skills section.'
        },
        {
          section: 'Experience Description',
          description: 'Quantify achievements in your current role.',
          example: 'Instead of "Led a team of developers", try "Led a team of 5 developers, increasing project delivery speed by 30% and reducing bugs by 25%".'
        },
        {
          section: 'Resume Summary',
          description: 'Add a targeted summary aligned with this specific job.',
          example: 'Passionate Full Stack Developer with 5 years of experience building scalable web applications using React, Node.js and cloud technologies. Proven track record of leading development teams and implementing CI/CD pipelines.'
        }
      ];
      
      // Construct result object
      const result: AnalysisResult = {
        overallScore,
        categoryScores: {
          skills: skillsScore,
          experience: experienceScore,
          education: educationScore,
          keywords: keywordScore
        },
        skillsComparison,
        missingSkills,
        insights,
        improvements
      };
      
      resolve(result);
    }, 2000);
  });
};