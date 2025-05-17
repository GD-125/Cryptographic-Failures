import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Vulnerabilities from './pages/Vulnerabilities';
import Practice from './pages/Practice';
import Resources from './pages/Resources';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen transition-colors duration-300 bg-gray-50 dark:bg-gray-900">
          <Navbar />
          <main className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/vulnerabilities" element={<Vulnerabilities />} />
              <Route path="/practice" element={<Practice />} />
              <Route path="/resources" element={<Resources />} />
            </Routes>
          </main>
          <Chatbot />
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App