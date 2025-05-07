# ResuMatch - Resume Compatibility Analyzer

ResuMatch is a modern web application that uses Natural Language Processing (NLP) to analyze the compatibility between resumes and job descriptions. It provides detailed insights, skill matching analysis, and actionable recommendations to help job seekers optimize their applications.

![ResuMatch Screenshot](https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg)

## Features

- 📄 PDF Resume Upload & Parsing
- 💼 Job Description Analysis
- 🎯 Compatibility Scoring
- 📊 Interactive Data Visualizations
- 🔍 Keyword Matching & Extraction
- 💡 Smart Recommendations
- 🌓 Dark Mode Support
- 📱 Responsive Design

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Chart.js
- PDF.js
- Lucide Icons

## Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/resumatch.git
```

2. Install dependencies:
```bash
cd resumatch
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Usage

1. **Upload Resume**: Click the upload area or drag and drop your PDF resume
2. **Enter Job Description**: Paste the job description and provide basic details
3. **View Analysis**: Get detailed compatibility scores, matching skills, and suggestions

## Project Structure

```
src/
├── components/
│   ├── analyzer/     # Core analysis components
│   ├── layout/       # Layout components
│   └── ui/           # Reusable UI components
├── contexts/         # React contexts
├── types/           # TypeScript type definitions
└── utils/           # Utility functions
```

## Key Features

### Resume Analysis
- PDF text extraction
- Keyword identification
- Skills extraction
- Experience parsing

### Job Description Processing
- Key requirements extraction
- Required skills identification
- Seniority level detection
- Technology stack analysis

### Compatibility Scoring
- Overall match percentage
- Category-wise scoring
- Skills gap analysis
- Missing requirements identification

### Visualization
- Interactive charts
- Skills radar
- Compatibility breakdown
- Missing skills highlight

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [PDF.js](https://mozilla.github.io/pdf.js/) for PDF parsing
- [Chart.js](https://www.chartjs.org/) for data visualization
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Lucide](https://lucide.dev/) for icons

## Contact

Your Name - [@yourusername](https://twitter.com/yourusername)

Project Link: [https://github.com/yourusername/resumatch](https://github.com/yourusername/resumatch)