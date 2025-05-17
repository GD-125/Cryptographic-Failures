import React from 'react';
import { ShieldAlert, Key, LockKeyhole } from 'lucide-react';

const IntroSection: React.FC = () => {
  return (
    <section id="intro" className="py-16 bg-white dark:bg-gray-800 rounded-xl shadow-sm my-8 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            What are Cryptographic Failures?
          </h2>
          <div className="mt-2 h-1 w-20 bg-blue-600 dark:bg-blue-400 mx-auto rounded"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
            Cryptographic failures are among the most critical security vulnerabilities in modern applications. 
            They occur when cryptographic mechanisms are improperly implemented, outdated, or simply neglected, 
            leaving sensitive data exposed to unauthorized access.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg transition-transform duration-300 hover:scale-105">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                  <ShieldAlert className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center mb-2">Common Vulnerability</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Ranked #2 in the OWASP Top 10 cryptographic failures are widespread and often lead to severe data breaches.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg transition-transform duration-300 hover:scale-105">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                  <Key className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center mb-2">High Impact</h3>
              <p className="text-gray-700 dark:text-gray-300">
                These vulnerabilities can expose sensitive data like credentials, health information, and personal details.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg transition-transform duration-300 hover:scale-105">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                  <LockKeyhole className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center mb-2">Preventable</h3>
              <p className="text-gray-700 dark:text-gray-300">
                With proper knowledge and implementation, most cryptographic failures can be prevented through secure coding practices.
              </p>
            </div>
          </div>

          <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border-l-4 border-blue-600 dark:border-blue-400">
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Why Learn About Cryptographic Failures?</h4>
            <p className="text-gray-700 dark:text-gray-300">
              Understanding cryptographic failures is essential for anyone involved in developing, testing, or managing 
              applications that handle sensitive data. By learning to identify and mitigate these vulnerabilities, you can 
              significantly improve the security posture of your applications and protect your users' data.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;