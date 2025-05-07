// Resume types
export interface Resume {
  file: File;
  filename: string;
  text: string;
  keywords: string[];
  skills: string[];
  experience: ResumeExperience[];
  education: ResumeEducation[];
  contact?: ResumeContact;
}

export interface ResumeExperience {
  title: string;
  company: string;
  dateRange: string;
  description: string;
}

export interface ResumeEducation {
  institution: string;
  degree: string;
  dateRange: string;
}

export interface ResumeContact {
  name: string;
  email: string;
  phone?: string;
  location?: string;
}

// Job Description types
export interface JobDescription {
  title: string;
  company: string;
  text: string;
  keywords: string[];
}

// Analysis Result types
export interface AnalysisResult {
  overallScore: number;
  categoryScores: {
    skills: number;
    experience: number;
    education: number;
    keywords: number;
  };
  skillsComparison: SkillComparison[];
  missingSkills: MissingSkill[];
  insights: Insight[];
  improvements: Improvement[];
}

export interface SkillComparison {
  name: string;
  resumeScore: number;
  jobRequirement: number;
}

export interface MissingSkill {
  name: string;
  importance: 'high' | 'medium' | 'low';
}

export interface Insight {
  type: 'strength' | 'weakness' | 'improvement';
  title: string;
  description: string;
}

export interface Improvement {
  section: string;
  description: string;
  example: string;
}