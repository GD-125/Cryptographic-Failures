import React, { useState } from 'react';
import { Terminal, Play, CheckCircle2, XCircle, RefreshCw, BookOpen } from 'lucide-react';

interface Exercise {
  id: number;
  title: string;
  description: string;
  scenario: string;
  vulnerableCode: string;
  hint: string;
  solution: string;
  explanation: string;
}

const PracticeSection: React.FC = () => {
  const [activeExercise, setActiveExercise] = useState<number>(1);
  const [userCode, setUserCode] = useState<string>('');
  const [result, setResult] = useState<{status: 'idle' | 'success' | 'error', message: string}>({
    status: 'idle',
    message: ''
  });
  const [showSolution, setShowSolution] = useState<boolean>(false);
  
  const exercises: Exercise[] = [
    {
      id: 1,
      title: "Fix Weak Password Hashing",
      description: "Improve the password hashing implementation to use a more secure algorithm with proper salting.",
      scenario: "You're reviewing code for a user authentication system and discover the passwords are being hashed with MD5, a cryptographically broken algorithm.",
      vulnerableCode: `function hashPassword(password) {
  const crypto = require('crypto');
  return crypto.createHash('md5').update(password).digest('hex');
}

function verifyPassword(password, hashedPassword) {
  const hashedInput = hashPassword(password);
  return hashedInput === hashedPassword;
}`,
      hint: "Use a modern password hashing function like bcrypt, Argon2, or PBKDF2 with salt.",
      solution: `function hashPassword(password) {
  const crypto = require('crypto');
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return \`\${salt}:\${hash}\`;
}

function verifyPassword(password, storedHash) {
  const crypto = require('crypto');
  const [salt, hash] = storedHash.split(':');
  const hashedInput = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return hashedInput === hash;
}`,
      explanation: "The improved code uses PBKDF2 with SHA-512, a much stronger algorithm than MD5. It also implements salt generation and storage, which prevents rainbow table attacks and ensures that even identical passwords will have different hashes."
    },
    {
      id: 2,
      title: "Secure API Key Storage",
      description: "Fix the insecure storage of API keys in the application code.",
      scenario: "You're reviewing a web application that accesses a third-party API. The API keys are directly embedded in the JavaScript code.",
      vulnerableCode: `// API client configuration
const apiClient = {
  baseUrl: 'https://api.example.com/v1',
  apiKey: 'sk_live_abcdef123456789', // Production API key
  secretKey: '9876543210abcdef',      // Production secret key
  
  fetchData: async function() {
    const response = await fetch(\`\${this.baseUrl}/data\`, {
      headers: {
        'Authorization': \`Bearer \${this.apiKey}\`,
        'X-Secret-Key': this.secretKey
      }
    });
    return response.json();
  }
};`,
      hint: "Move sensitive credentials to environment variables and backend services.",
      solution: `// API client configuration
const apiClient = {
  baseUrl: 'https://api.example.com/v1',
  
  fetchData: async function() {
    // Make request to your backend proxy instead of directly to the API
    const response = await fetch('/api/proxy/data');
    return response.json();
  }
};

// On the server side (not accessible to clients):
// require('dotenv').config();
// const API_KEY = process.env.API_KEY;
// const SECRET_KEY = process.env.SECRET_KEY;

// app.get('/api/proxy/data', async (req, res) => {
//   const response = await fetch('https://api.example.com/v1/data', {
//     headers: {
//       'Authorization': \`Bearer \${API_KEY}\`,
//       'X-Secret-Key': SECRET_KEY
//     }
//   });
//   const data = await response.json();
//   res.json(data);
// });`,
      explanation: "The improved solution moves API keys out of client-side code entirely. Instead, requests go through a backend proxy where credentials are securely stored in environment variables. This prevents exposure of sensitive credentials in browser code."
    },
    {
      id: 3,
      title: "Fix Insecure Random Token Generation",
      description: "Implement secure random token generation for password reset functionality.",
      scenario: "You're evaluating a password reset feature that generates tokens using predictable methods.",
      vulnerableCode: `function generateResetToken(userId) {
  // Generate a token based on timestamp and user ID
  const timestamp = Date.now();
  const token = \`\${userId}-\${timestamp}-\${Math.floor(Math.random() * 10000)}\`;
  return token;
}

function verifyResetToken(token, userId) {
  // Extract parts from the token
  const [tokenUserId, timestamp, randomPart] = token.split('-');
  
  // Verify the token belongs to the user and is not expired (24h validity)
  const isValid = (
    tokenUserId === userId.toString() && 
    Date.now() - parseInt(timestamp) < 24 * 60 * 60 * 1000
  );
  
  return isValid;
}`,
      hint: "Use cryptographically secure random values and implement proper token expiration checks.",
      solution: `function generateResetToken(userId) {
  const crypto = require('crypto');
  
  // Generate a cryptographically secure random token
  const tokenBuffer = crypto.randomBytes(32);
  const token = tokenBuffer.toString('hex');
  
  // In a real application, you would store:
  // 1. The token (hashed, not plaintext)
  // 2. The associated user ID
  // 3. Expiration timestamp
  // in your database
  
  // Example storage object
  const tokenData = {
    userId: userId,
    tokenHash: crypto.createHash('sha256').update(token).digest('hex'),
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours from now
  };
  
  // saveTokenToDatabase(tokenData);
  
  return token;
}

function verifyResetToken(token, userId) {
  const crypto = require('crypto');
  
  // Hash the provided token for comparison
  const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
  
  // In a real application, you would:
  // 1. Retrieve the token data from the database by user ID
  // 2. Compare the token hash
  // 3. Check expiration
  
  // Example retrieval and verification (pseudocode)
  // const tokenData = getTokenFromDatabase(userId);
  // if (!tokenData) return false;
  
  // const isValid = (
  //   tokenData.tokenHash === tokenHash &&
  //   new Date() < new Date(tokenData.expiresAt)
  // );
  
  // If valid, invalidate the token to prevent reuse
  // if (isValid) {
  //   deleteTokenFromDatabase(userId);
  // }
  
  // For demonstration, we'll return true
  return true;
}`,
      explanation: "The secure implementation uses cryptographically strong random values from crypto.randomBytes() instead of predictable values. It also includes proper token storage guidance (storing only hashed tokens), expiration tracking, and single-use enforcement by invalidating tokens after use."
    }
  ];

  const checkSolution = (exerciseId: number) => {
    const exercise = exercises.find(ex => ex.id === exerciseId);
    if (!exercise) return;

    // This is a simplified check. In a real application, you would use a more sophisticated
    // approach to verify the correctness of the user's solution.
    if (userCode.includes('pbkdf2') && exerciseId === 1) {
      setResult({
        status: 'success', 
        message: 'Great job! You\'ve implemented a secure password hashing function with salt.'
      });
    } else if (userCode.includes('process.env') && !userCode.includes('apiKey: ') && exerciseId === 2) {
      setResult({
        status: 'success', 
        message: 'Well done! You\'ve properly removed hard-coded API keys from client-side code.'
      });
    } else if (userCode.includes('crypto.randomBytes') && exerciseId === 3) {
      setResult({
        status: 'success', 
        message: 'Excellent! You\'ve implemented cryptographically secure random token generation.'
      });
    } else {
      setResult({
        status: 'error', 
        message: 'Your solution doesn\'t meet the security requirements. Try again or check the hint.'
      });
    }
  };

  const resetExercise = (exerciseId: number) => {
    const exercise = exercises.find(ex => ex.id === exerciseId);
    if (!exercise) return;
    
    setUserCode(exercise.vulnerableCode);
    setResult({status: 'idle', message: ''});
    setShowSolution(false);
  };

  React.useEffect(() => {
    // Initialize with the first exercise's code
    resetExercise(activeExercise);
  }, [activeExercise]);

  return (
    <section id="practice" className="py-16 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-sm my-8 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Practice Fixing Cryptographic Vulnerabilities
          </h2>
          <div className="mt-2 h-1 w-20 bg-blue-600 dark:bg-blue-400 mx-auto rounded"></div>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Put your knowledge into practice by identifying and fixing common cryptographic vulnerabilities in these interactive exercises.
          </p>
        </div>

        <div className="mt-8 grid md:grid-cols-4 gap-6">
          {/* Exercise Selection */}
          <div className="md:col-span-1">
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm p-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Exercises</h3>
              <div className="space-y-2">
                {exercises.map(exercise => (
                  <button
                    key={exercise.id}
                    onClick={() => setActiveExercise(exercise.id)}
                    className={`w-full text-left px-4 py-2 rounded-md transition-colors duration-200 ${
                      activeExercise === exercise.id 
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                  >
                    {exercise.title}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Exercise Content */}
          <div className="md:col-span-3">
            {exercises.map(exercise => (
              <div key={exercise.id} className={activeExercise === exercise.id ? 'block' : 'hidden'}>
                <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm p-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{exercise.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{exercise.description}</p>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6">
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2 flex items-center">
                      <BookOpen className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                      Scenario
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300">{exercise.scenario}</p>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center">
                        <Terminal className="h-5 w-5 mr-2 text-gray-600 dark:text-gray-400" />
                        Code Editor
                      </label>
                      <button 
                        onClick={() => resetExercise(exercise.id)}
                        className="text-sm text-gray-600 dark:text-gray-400 flex items-center hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        <RefreshCw className="h-4 w-4 mr-1" />
                        Reset
                      </button>
                    </div>
                    <div className="relative">
                      <textarea
                        value={userCode}
                        onChange={(e) => setUserCode(e.target.value)}
                        className="w-full h-64 font-mono text-sm p-4 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      ></textarea>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-3 mb-6">
                    <button
                      onClick={() => checkSolution(exercise.id)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center shadow-sm"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Run and Check
                    </button>
                    
                    <button
                      onClick={() => setShowSolution(!showSolution)}
                      className="px-4 py-2 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200 font-medium rounded-lg transition-colors duration-200"
                    >
                      {showSolution ? 'Hide Solution' : 'Show Solution'}
                    </button>
                  </div>
                  
                  {/* Result Message */}
                  {result.status !== 'idle' && (
                    <div className={`p-4 rounded-lg mb-6 ${
                      result.status === 'success' 
                        ? 'bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500' 
                        : 'bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500'
                    }`}>
                      <div className="flex items-start">
                        {result.status === 'success' 
                          ? <CheckCircle2 className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
                          : <XCircle className="h-6 w-6 text-red-500 mr-2 flex-shrink-0" />
                        }
                        <p className="text-gray-700 dark:text-gray-300">{result.message}</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Hint */}
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg mb-6">
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Hint</h4>
                    <p className="text-gray-700 dark:text-gray-300">{exercise.hint}</p>
                  </div>
                  
                  {/* Solution */}
                  {showSolution && (
                    <div className="mt-6">
                      <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Solution</h4>
                      <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm text-gray-800 dark:text-gray-200">
                        <code>{exercise.solution}</code>
                      </pre>
                      <div className="mt-4 bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                        <h5 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Explanation</h5>
                        <p className="text-gray-700 dark:text-gray-300">{exercise.explanation}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PracticeSection;