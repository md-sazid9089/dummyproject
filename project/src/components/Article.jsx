// Article component - Main page displaying the article about blockchain technology
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ReactionButtons from './ReactionButtons';
import Pagination from './Pagination';
import { Shield, Zap, Link as LinkIcon } from 'lucide-react';

function Article() {
  // State to manage which page of comments we're currently viewing
  const [currentPage, setCurrentPage] = useState(1);
  
  // Number of comments to display per page
  const commentsPerPage = 3;

  // Dummy data for comments - In a real app, this would come from an API
  const comments = [
    {
      id: 1,
      author: "Alex Chen",
      content: "This is such an informative article! I finally understand how blockchain works and its potential applications.",
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      author: "Sarah Williams",
      content: "Great explanation of decentralization and smart contracts. The security aspects are fascinating!",
      timestamp: "4 hours ago"
    },
    {
      id: 3,
      author: "Michael Rodriguez",
      content: "The section about cryptocurrency and mining was particularly eye-opening. Thank you for sharing!",
      timestamp: "6 hours ago"
    },
    {
      id: 4,
      author: "Jennifer Kim",
      content: "As a computer science teacher, I'll definitely be sharing this with my students.",
      timestamp: "8 hours ago"
    },
    {
      id: 5,
      author: "David Park",
      content: "The potential for blockchain in supply chain management is incredible. This technology will change everything.",
      timestamp: "10 hours ago"
    },
    {
      id: 6,
      author: "Lisa Thompson",
      content: "Excellent overview of both the benefits and challenges of blockchain technology.",
      timestamp: "12 hours ago"
    },
    {
      id: 7,
      author: "Robert Garcia",
      content: "I appreciate how you explained complex concepts in simple terms.",
      timestamp: "14 hours ago"
    },
    {
      id: 8,
      author: "Emma Johnson",
      content: "This article should be required reading for all technology students.",
      timestamp: "16 hours ago"
    },
    {
      id: 9,
      author: "James Wilson",
      content: "The future implications discussed at the end are thought-provoking. Blockchain will reshape many industries.",
      timestamp: "18 hours ago"
    },
    {
      id: 10,
      author: "Maria Lopez",
      content: "Looking forward to more articles on emerging technologies!",
      timestamp: "20 hours ago"
    }
  ];

  // Calculate pagination values
  const totalPages = Math.ceil(comments.length / commentsPerPage);
  const startIndex = (currentPage - 1) * commentsPerPage;
  const endIndex = startIndex + commentsPerPage;
  const currentComments = comments.slice(startIndex, endIndex);

  // Function to handle page changes from the pagination component
  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Smooth scroll to comments section when page changes
    document.getElementById('comments-section')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Article Header Section */}
      <header className="text-center mb-12">
        <div className="flex justify-center items-center gap-3 mb-4">
          <Shield className="w-8 h-8 text-blue-600" />
          <Zap className="w-8 h-8 text-purple-600" />
          <LinkIcon className="w-8 h-8 text-indigo-600" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Understanding Blockchain Technology
        </h1>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-gray-600">
          <span>By</span>
          {/* Link to author profile - uses React Router's Link component */}
          <Link 
            to="/author/Dr. Marcus Thompson"
            className="text-purple-600 hover:text-purple-800 font-semibold transition-colors duration-200 hover:underline"
          >
            Dr. Marcus Thompson
          </Link>
          <span className="hidden sm:inline">•</span>
          <span>Published on January 20, 2024</span>
        </div>
      </header>

      {/* Main Article Content */}
      <article className="prose prose-lg max-w-none mb-12">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <p className="text-gray-700 leading-relaxed mb-6 text-lg">
            Blockchain technology represents one of the most revolutionary innovations of the 21st century, 
            fundamentally changing how we think about data storage, security, and digital transactions. 
            At its core, blockchain is a distributed ledger technology that maintains a continuously 
            growing list of records, called blocks, which are linked and secured using cryptography. 
            Understanding blockchain is crucial for anyone looking to grasp the future of digital 
            finance, supply chain management, and decentralized applications.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            The key innovation of blockchain lies in its decentralized nature and immutable record-keeping. 
            Unlike traditional centralized databases controlled by a single entity, blockchain networks 
            are distributed across multiple nodes, making them highly resistant to tampering and single 
            points of failure. Each block contains a cryptographic hash of the previous block, creating 
            an unbreakable chain of data integrity. This revolutionary approach eliminates the need for 
            trusted intermediaries in many transactions, enabling peer-to-peer interactions with 
            unprecedented security and transparency.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            Smart contracts, one of blockchain's most powerful features, are self-executing contracts 
            with terms directly written into code. These automated agreements run on blockchain networks 
            and execute automatically when predetermined conditions are met, eliminating the need for 
            intermediaries and reducing costs. From cryptocurrency transactions to complex supply chain 
            management, smart contracts are enabling new business models and transforming traditional 
            industries by providing trustless, transparent, and efficient automated processes.
          </p>

          <p className="text-gray-700 leading-relaxed mb-8">
            The future of blockchain technology extends far beyond cryptocurrency, with applications 
            spanning healthcare, voting systems, intellectual property protection, and digital identity 
            verification. As the technology matures, we're seeing increased adoption by governments 
            and enterprises seeking to leverage blockchain's transparency, security, and efficiency. 
            However, challenges remain, including scalability issues, energy consumption concerns, 
            and regulatory uncertainty. The continued evolution of blockchain technology promises 
            to reshape our digital landscape and create new possibilities for secure, decentralized 
            applications that could transform how we interact with technology and each other.
          </p>

          {/* Article Reactions Section */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              What did you think of this article?
            </h3>
            <ReactionButtons />
          </div>
        </div>
      </article>

      {/* Comments Section */}
      <section id="comments-section" className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Comments ({comments.length})
        </h2>

        {/* Display current page of comments */}
        <div className="space-y-6 mb-8">
          {currentComments.map((comment) => (
            <div key={comment.id} className="border-b border-gray-100 pb-6 last:border-b-0">
              {/* Comment Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  {/* Comment author avatar placeholder */}
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {comment.author.charAt(0)}
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900">{comment.author}</h4>
                    <p className="text-sm text-gray-500">{comment.timestamp}</p>
                  </div>
                </div>
              </div>

              {/* Comment Content */}
              <p className="text-gray-700 mb-4 ml-13">{comment.content}</p>

              {/* Comment Reactions */}
              <div className="ml-13">
                <ReactionButtons size="small" />
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Component */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </section>
    </div>
  );
}

export default Article;