import React from 'react';
import { Shield, AlertTriangle, Lock } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToPractice = () => {
    const practiceSection = document.getElementById('practice');
    if (practiceSection) {
      practiceSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 md:py-20 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="lg:w-1/2">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
              Understanding <span className="text-blue-600 dark:text-blue-400">Cryptographic Failures</span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 dark:text-gray-300">
              Learn how to identify, prevent, and fix cryptographic vulnerabilities through interactive examples and hands-on practice.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button 
                onClick={scrollToPractice}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg"
              >
                Start Practice
              </button>
              <a 
                href="#intro" 
                className="px-8 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium rounded-lg transition-colors duration-300"
              >
                Learn More
              </a>
            </div>
          </div>
          <div className="hidden lg:block lg:w-5/12 mt-12 lg:mt-0">
            <div className="relative h-80 w-full">
              <div className="absolute top-0 left-0 bg-blue-100 dark:bg-blue-900/30 rounded-full h-56 w-56 flex items-center justify-center animate-pulse-slow">
                <Shield className="h-24 w-24 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="absolute top-20 right-0 bg-red-100 dark:bg-red-900/30 rounded-full h-48 w-48 flex items-center justify-center animate-pulse-slow animation-delay-1000">
                <AlertTriangle className="h-20 w-20 text-red-600 dark:text-red-400" />
              </div>
              <div className="absolute bottom-0 left-20 bg-green-100 dark:bg-green-900/30 rounded-full h-40 w-40 flex items-center justify-center animate-pulse-slow animation-delay-2000">
                <Lock className="h-16 w-16 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;