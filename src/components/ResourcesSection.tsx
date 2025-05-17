import React from 'react';
import { BookOpen, FileText, Link2, Video } from 'lucide-react';

interface Resource {
  id: number;
  title: string;
  description: string;
  url: string;
  type: 'article' | 'guide' | 'tool' | 'video';
  level: 'beginner' | 'intermediate' | 'advanced';
}

const ResourcesSection: React.FC = () => {
  const resources: Resource[] = [
    {
      id: 1,
      title: "OWASP Cryptographic Failures",
      description: "The official OWASP explanation of cryptographic failures as part of the OWASP Top 10.",
      url: "https://owasp.org/Top10/A02_2021-Cryptographic_Failures/",
      type: "article",
      level: "beginner"
    },
    {
      id: 2,
      title: "Mozilla SSL Configuration Generator",
      description: "A tool to help configure SSL/TLS settings for web servers with modern and secure defaults.",
      url: "https://ssl-config.mozilla.org/",
      type: "tool",
      level: "intermediate"
    },
    {
      id: 3,
      title: "Cryptographic Right Answers",
      description: "A guide to making the right choices when implementing cryptography in your applications.",
      url: "https://latacora.micro.blog/2018/04/03/cryptographic-right-answers.html",
      type: "article",
      level: "intermediate"
    },
    {
      id: 4,
      title: "NIST Cryptographic Standards and Guidelines",
      description: "Official standards and guidelines for cryptographic implementations from the National Institute of Standards and Technology.",
      url: "https://csrc.nist.gov/Projects/Cryptographic-Standards-and-Guidelines",
      type: "guide",
      level: "advanced"
    },
    {
      id: 5,
      title: "The Illustrated TLS Connection",
      description: "Every byte of a TLS connection explained and illustrated.",
      url: "https://tls.ulfheim.net/",
      type: "article",
      level: "intermediate"
    },
    {
      id: 6,
      title: "Practical Cryptography for Developers",
      description: "A modern practical book about cryptography for developers with code examples and explanations.",
      url: "https://cryptobook.nakov.com/",
      type: "guide",
      level: "intermediate"
    },
    {
      id: 7,
      title: "Understanding Hash Functions and Password Hashing",
      description: "A video explanation of how hash functions work and best practices for password hashing.",
      url: "https://www.youtube.com/watch?v=yoMELSa994s",
      type: "video",
      level: "beginner"
    },
    {
      id: 8,
      title: "Secure Coding Guidelines for Cryptography",
      description: "Comprehensive guidelines for implementing cryptography securely in your applications.",
      url: "https://wiki.sei.cmu.edu/confluence/display/java/MSC61-J.+Do+not+use+insecure+or+weak+cryptographic+algorithms",
      type: "guide",
      level: "advanced"
    }
  ];

  // Group resources by type
  const resourcesByType = resources.reduce((acc, resource) => {
    if (!acc[resource.type]) {
      acc[resource.type] = [];
    }
    acc[resource.type].push(resource);
    return acc;
  }, {} as Record<string, Resource[]>);

  const getIconForType = (type: string) => {
    switch (type) {
      case 'article':
        return <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />;
      case 'guide':
        return <BookOpen className="h-5 w-5 text-purple-600 dark:text-purple-400" />;
      case 'tool':
        return <Link2 className="h-5 w-5 text-green-600 dark:text-green-400" />;
      case 'video':
        return <Video className="h-5 w-5 text-red-600 dark:text-red-400" />;
      default:
        return <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />;
    }
  };

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'beginner':
        return <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs px-2 py-1 rounded-full">Beginner</span>;
      case 'intermediate':
        return <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs px-2 py-1 rounded-full">Intermediate</span>;
      case 'advanced':
        return <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-xs px-2 py-1 rounded-full">Advanced</span>;
      default:
        return null;
    }
  };

  return (
    <section id="resources" className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Resources for Further Learning
          </h2>
          <div className="mt-2 h-1 w-20 bg-blue-600 dark:bg-blue-400 mx-auto rounded"></div>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Expand your knowledge on cryptographic security with these carefully selected resources.
          </p>
        </div>

        <div className="mt-8 space-y-10">
          {Object.entries(resourcesByType).map(([type, typeResources]) => (
            <div key={type}>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 capitalize">
                {type === 'article' ? 'Articles' : type === 'guide' ? 'Guides' : type === 'tool' ? 'Tools' : 'Videos'}
              </h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {typeResources.map(resource => (
                  <a 
                    key={resource.id}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 transition-transform duration-300 hover:scale-105 hover:shadow-md border border-gray-100 dark:border-gray-700"
                  >
                    <div className="flex items-start mb-4">
                      <div className="mr-3 bg-gray-100 dark:bg-gray-700 rounded-full p-2">
                        {getIconForType(resource.type)}
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{resource.title}</h4>
                        <div className="mt-1">
                          {getLevelBadge(resource.level)}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{resource.description}</p>
                    <div className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                      Read more →
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg text-center">
          <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Want more resources?</h4>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            These resources are just the beginning. Continuous learning is vital in the ever-evolving field of cryptography and security.
          </p>
          <a 
            href="https://github.com/topics/cryptography"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm"
          >
            Explore GitHub Cryptography Projects
          </a>
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;