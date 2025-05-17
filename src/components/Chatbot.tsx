import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, SendHorizontal, X } from 'lucide-react';
import DOMPurify from 'dompurify';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface QuickQuestion {
  id: string;
  question: string;
  answer: string;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([{
    id: '1',
    text: 'Hi there! I\'m your Cryptographic Security Assistant. Here are some questions you can ask me:',
    sender: 'bot',
    timestamp: new Date()
  }]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [showQuickQuestions, setShowQuickQuestions] = useState<boolean>(true);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const quickQuestions: QuickQuestion[] = [
    {
      id: '1',
      question: 'What is symmetric encryption?',
      answer: 'Symmetric encryption uses the same key for both encryption and decryption. Common algorithms include AES-256. While fast and efficient, the main challenge is securely sharing the key between parties.'
    },
    {
      id: '2',
      question: 'How does public key infrastructure (PKI) work?',
      answer: 'PKI uses a pair of keys: public for encryption and private for decryption. It\'s the foundation of secure communication on the internet, used in SSL/TLS certificates and digital signatures.'
    },
    {
      id: '3',
      question: 'What are common password hashing mistakes?',
      answer: 'Common mistakes include: using weak algorithms like MD5/SHA1, not using salt, using predictable salt, insufficient iterations for key derivation, and implementing custom hashing algorithms instead of proven ones like bcrypt or Argon2.'
    },
    {
      id: '4',
      question: 'How to prevent key exposure in source code?',
      answer: 'Never hardcode keys in source code. Use environment variables, secure key management services, or dedicated key vaults. Implement proper access controls and key rotation policies.'
    },
    {
      id: '5',
      question: 'What is perfect forward secrecy?',
      answer: 'Perfect Forward Secrecy (PFS) ensures that if a long-term key is compromised, past communications remain secure. It generates unique session keys for each communication session.'
    },
    {
      id: '6',
      question: 'How to secure API endpoints?',
      answer: 'Use HTTPS, implement proper authentication, validate JWT tokens, rate limiting, and input validation. Never expose sensitive data in URLs or logs. Use secure headers and implement CORS properly.'
    },
    {
      id: '7',
      question: 'What are recent cryptographic attacks?',
      answer: 'Recent attacks include quantum computing threats to RSA/ECC, side-channel attacks on implementations, padding oracle attacks, and timing attacks. Stay updated with NIST guidelines for post-quantum cryptography.'
    },
    {
      id: '8',
      question: 'Best practices for key management?',
      answer: 'Use hardware security modules (HSM) when possible, implement key rotation, separate keys by environment, use strong random number generators for key generation, and maintain detailed key inventories.'
    }
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen && showQuickQuestions) {
      const quickQuestionsList = quickQuestions.map(q => q.question).join('\n• ');
      setMessages(prev => [...prev, {
        id: crypto.randomUUID(),
        text: `• ${quickQuestionsList}`,
        sender: 'bot',
        timestamp: new Date()
      }]);
    }
  }, [isOpen]);

  const sanitizeInput = (input: string): string => {
    return DOMPurify.sanitize(input, { ALLOWED_TAGS: [] });
  };

  const handleQuickQuestionClick = (question: string, answer: string) => {
    const userMessage: Message = {
      id: crypto.randomUUID(),
      text: question,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setShowQuickQuestions(false);
    setIsTyping(true);
    
    setTimeout(() => {
      const botMessage: Message = {
        id: crypto.randomUUID(),
        text: answer,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSendMessage = () => {
    if (message.trim() === '') return;
    
    const sanitizedMessage = sanitizeInput(message);
    setShowQuickQuestions(false);
    
    const userMessage: Message = {
      id: crypto.randomUUID(),
      text: sanitizedMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsTyping(true);
    
    setTimeout(() => {
      const botResponse = generateBotResponse(sanitizedMessage);
      const botMessage: Message = {
        id: crypto.randomUUID(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const generateBotResponse = (userMessage: string): string => {
    const normalizedMessage = userMessage.toLowerCase();
    
    // Check for quick questions first
    const quickQuestion = quickQuestions.find(q => 
      q.question.toLowerCase() === normalizedMessage ||
      normalizedMessage.includes(q.question.toLowerCase())
    );
    
    if (quickQuestion) {
      return quickQuestion.answer;
    }
    
    if (normalizedMessage.match(/^(hi|hello|hey|howdy|greetings)/)) {
      return "Hello! I'm here to help you understand cryptographic failures. Would you like to know about specific vulnerabilities or best practices?";
    }
    
    if (normalizedMessage.match(/(thank you|thanks|thx|ty)/)) {
      return "You're welcome! If you have any more questions about cryptographic security, feel free to ask.";
    }
    
    if (normalizedMessage.match(/(bye|goodbye|see you|farewell)/)) {
      return "Goodbye! Feel free to return if you have more questions about cryptographic security.";
    }
    
    if (normalizedMessage.includes("hash") || normalizedMessage.includes("hashing")) {
      return "Hashing is a one-way function that converts data of any size to a fixed-size output. In security, we use it for password storage, data integrity verification, and digital signatures. Always use modern algorithms like SHA-256, SHA-3, or specialized password hashing functions like bcrypt, Argon2, or PBKDF2.";
    }
    
    if (normalizedMessage.includes("ssl") || normalizedMessage.includes("tls")) {
      return "SSL (Secure Sockets Layer) and its successor TLS (Transport Layer Security) are cryptographic protocols designed to provide secure communication over a network. They're commonly used for HTTPS connections. Always use TLS 1.2 or later, as older versions have security vulnerabilities. Also ensure proper certificate validation to prevent man-in-the-middle attacks.";
    }
    
    if (normalizedMessage.includes("encryption")) {
      return "Encryption transforms data to make it unreadable without a decryption key. For symmetric encryption (same key for encryption and decryption), use AES-256. For asymmetric encryption (public/private key pairs), use RSA-2048 or better, or modern elliptic curve cryptography (ECC). Always follow standard protocols and don't implement your own crypto algorithms.";
    }
    
    if (normalizedMessage.includes("owasp") || normalizedMessage.includes("top 10")) {
      return "The OWASP Top 10 is a standard awareness document about the most critical web application security risks. 'Cryptographic Failures' is #2 on the 2021 list, reflecting the serious impact of using broken or risky cryptographic algorithms, using default or weak keys, or not enforcing encryption. This includes sensitive data exposure through weak protocols or algorithms.";
    }
    
    if (normalizedMessage.includes("key management") || normalizedMessage.includes("key storage")) {
      return "Key management is crucial for cryptographic security. Never hardcode keys in source code. Use secure key management systems, environment variables with proper access controls, or secure vaults. Implement key rotation policies, separate keys by environment, and follow the principle of least privilege for key access.";
    }
    
    return "I understand you're asking about cryptographic security. While I aim to provide accurate information, I recommend checking our resources section for detailed, up-to-date guidance. Would you like to know about specific cryptographic vulnerabilities, secure implementations, or best practices?";
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 z-50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
        aria-label="Open chat"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
      
      <div 
        className={`fixed bottom-6 right-6 mb-16 w-80 sm:w-96 bg-white dark:bg-gray-800 rounded-xl shadow-xl z-40 transition-all duration-300 transform ${
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-blue-600 text-white p-4 rounded-t-xl flex justify-between items-center">
          <div className="flex items-center">
            <MessageCircle className="h-5 w-5 mr-2" />
            <h3 className="font-medium">Crypto Security Assistant</h3>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-white hover:text-gray-200 focus:outline-none"
            aria-label="Close chat"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="h-80 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-700">
          {messages.map(msg => (
            <div 
              key={msg.id} 
              className={`mb-4 ${msg.sender === 'user' ? 'text-right' : ''}`}
            >
              <div 
                className={`inline-block max-w-[80%] p-3 rounded-lg ${
                  msg.sender === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : 'bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white rounded-tl-none'
                }`}
              >
                {msg.text.split('\n').map((line, i) => (
                  <p key={i} className="mb-1 last:mb-0">
                    {line}
                  </p>
                ))}
              </div>
              <div className={`text-xs text-gray-500 dark:text-gray-400 mt-1 ${
                msg.sender === 'user' ? 'text-right' : ''
              }`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          ))}
          {showQuickQuestions && (
            <div className="mt-4 space-y-2">
              {quickQuestions.map(q => (
                <button
                  key={q.id}
                  onClick={() => handleQuickQuestionClick(q.question, q.answer)}
                  className="w-full text-left p-2 rounded bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors duration-200 text-sm"
                >
                  {q.question}
                </button>
              ))}
            </div>
          )}
          {isTyping && (
            <div className="mb-4">
              <div className="inline-block bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white p-3 rounded-lg rounded-tl-none max-w-[80%]">
                <div className="flex space-x-1">
                  <div className="bg-gray-500 dark:bg-gray-400 rounded-full h-2 w-2 animate-bounce"></div>
                  <div className="bg-gray-500 dark:bg-gray-400 rounded-full h-2 w-2 animate-bounce animation-delay-200"></div>
                  <div className="bg-gray-500 dark:bg-gray-400 rounded-full h-2 w-2 animate-bounce animation-delay-400"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="p-3 border-t border-gray-200 dark:border-gray-600 flex items-center">
          <input
            ref={inputRef}
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            maxLength={500}
            className="flex-1 border border-gray-300 dark:border-gray-600 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
          />
          <button
            onClick={handleSendMessage}
            disabled={message.trim() === ''}
            className={`ml-2 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              message.trim() === '' 
                ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
            aria-label="Send message"
          >
            <SendHorizontal className="h-5 w-5" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Chatbot;