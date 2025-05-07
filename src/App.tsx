import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ResumeAnalyzer from './components/analyzer/ResumeAnalyzer';

function App() {
  return (
    <ThemeProvider>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <ResumeAnalyzer />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;