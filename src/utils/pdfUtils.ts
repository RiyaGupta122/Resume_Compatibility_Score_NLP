// Utility functions for PDF processing

/**
 * Extract text from a PDF file
 * Note: In a production app, this would use a proper PDF parsing library like pdf.js
 */
export const extractTextFromPdf = async (file: File): Promise<string> => {
  // In a real application, we would use PDF.js to extract text properly
  // For demo purposes, we're just simulating the extraction
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock extracted text for demonstration
      const mockText = `
        John Doe
        Software Engineer
        
        EXPERIENCE
        Senior Developer, ABC Tech
        Jan 2020 - Present
        Developed scalable web applications using React, Node.js, and Python.
        Led a team of 5 developers for project delivery.
        
        Junior Developer, XYZ Solutions
        Jun 2018 - Dec 2019
        Built and maintained RESTful APIs.
        Implemented CI/CD pipelines.
        
        EDUCATION
        BS Computer Science, State University
        2014 - 2018
        
        SKILLS
        JavaScript, TypeScript, React, Node.js, Python, Git, Docker, AWS, SQL, NoSQL
      `;
      
      resolve(mockText);
    }, 1500);
  });
};

/**
 * Parse raw text from a resume into structured data
 */
export const parseResumeText = async (text: string): Promise<{
  keywords: string[];
  skills: string[];
  experience: { title: string; company: string; dateRange: string; description: string }[];
  education: { institution: string; degree: string; dateRange: string }[];
}> => {
  // In a real app, this would use NLP to extract structured info
  // For this demo, we'll create sample data
  
  return {
    keywords: [
      'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 
      'Software Engineer', 'Web Development', 'APIs', 'CI/CD'
    ],
    skills: [
      'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 
      'Git', 'Docker', 'AWS', 'SQL', 'NoSQL'
    ],
    experience: [
      {
        title: 'Senior Developer',
        company: 'ABC Tech',
        dateRange: 'Jan 2020 - Present',
        description: 'Developed scalable web applications using React, Node.js, and Python. Led a team of 5 developers for project delivery.'
      },
      {
        title: 'Junior Developer',
        company: 'XYZ Solutions',
        dateRange: 'Jun 2018 - Dec 2019',
        description: 'Built and maintained RESTful APIs. Implemented CI/CD pipelines.'
      }
    ],
    education: [
      {
        institution: 'State University',
        degree: 'BS Computer Science',
        dateRange: '2014 - 2018'
      }
    ]
  };
};