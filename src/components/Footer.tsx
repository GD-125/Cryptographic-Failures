import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <ShieldAlert className="h-8 w-8 text-blue-400 mr-2" />
              <span className="text-xl font-bold">CryptoGuard</span>
            </div>
            <p className="text-gray-400 text-sm">
              A comprehensive educational platform for understanding and preventing cryptographic failures in modern applications.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/vulnerabilities" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Vulnerabilities
                </Link>
              </li>
              <li>
                <Link to="/practice" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Practice
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Solutions */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Solutions</h3>
            <ul className="space-y-2">
              <li>
                <Link to="https://phishing-edu.vercel.app/" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Phishing Simulator
                </Link>
              </li>
              <li>
                <Link to="https://network-monitoring-system-intern.vercel.app/" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Network Monitoring System
                </Link>
              </li>
              <li>
                <Link to="https://edu-keylogger.vercel.app/" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Keylogger
                </Link>
              </li>
              <li>
                <Link to="/resources#students" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Ransomware
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-gray-400 mb-2">Have questions or feedback?</p>
            <a 
              href="mailto:devqueens@gmail.com" 
              className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
            >
              devqueens@gmail.com
            </a>
            <div className="mt-4 flex space-x-4">
              <a 
                href="https://github.com/cryptoguard" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="https://twitter.com/cryptoguard" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="Telegram"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="https://linkedin.com/company/devqueens" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="mailto:devqueens@gmail.com" 
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-800 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 DevQueens. Designed and Developed by{' '}
            <a 
              href="https://devqueens.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-400 hover:text-blue-300 transition-colors duration-200 font-medium"
            >
              DevQueens
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
