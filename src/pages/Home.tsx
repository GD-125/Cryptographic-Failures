import React from 'react';
import { Link } from 'react-router-dom';
import { Play, BookOpen, Shield, TrendingUp, AlertTriangle, Lock } from 'lucide-react';
import Hero from '../components/Hero';
import IntroSection from '../components/IntroSection';

const Home: React.FC = () => {
  const statistics = [
    {
      title: "Companies Affected",
      value: "83%",
      description: "of organizations experienced cryptographic failures in 2024",
      icon: <TrendingUp className="h-8 w-8 text-red-500" />
    },
    {
      title: "Security Incidents",
      value: "65%",
      description: "of data breaches involved cryptographic vulnerabilities",
      icon: <AlertTriangle className="h-8 w-8 text-yellow-500" />
    },
    {
      title: "Risk Factor",
      value: "High",
      description: "OWASP Top 10 #2 most critical web application security risk",
      icon: <Lock className="h-8 w-8 text-blue-500" />
    }
  ];

  const scrollToPractice = () => {
    const practiceSection = document.getElementById('practice');
    if (practiceSection) {
      practiceSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Hero />
      <IntroSection />
      
      {/* Statistics Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Impact of Cryptographic Failures
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {statistics.map((stat, index) => (
              <div 
                key={index}
                className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-sm"
              >
                <div className="flex items-center justify-center mb-4">
                  {stat.icon}
                </div>
                <h3 className="text-xl font-bold text-center text-gray-900 dark:text-white mb-2">
                  {stat.title}
                </h3>
                <div className="text-3xl font-bold text-center text-blue-600 dark:text-blue-400 mb-2">
                  {stat.value}
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-center">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <Link 
              to="/vulnerabilities" 
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
            >
              <Shield className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Learn Vulnerabilities
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Understand common cryptographic vulnerabilities and their impact on security.
              </p>
            </Link>

            <button 
              onClick={scrollToPractice}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 text-left"
            >
              <Play className="h-12 w-12 text-green-600 dark:text-green-400 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Practice Exercises
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get hands-on experience with interactive exercises and real-world scenarios.
              </p>
            </button>

            <Link 
              to="/resources" 
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
            >
              <BookOpen className="h-12 w-12 text-purple-600 dark:text-purple-400 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Resources
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Access curated learning materials and tools for cryptographic security.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Understanding Cryptographic Failures
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                className="w-full h-[400px] rounded-xl shadow-lg"
                src="https://www.youtube.com/embed/sdflvRyqmV8"
                title="Understanding Cryptographic Failures"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <p className="mt-4 text-center text-gray-600 dark:text-gray-300">
              Learn about common cryptographic failures and their impact on application security
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;