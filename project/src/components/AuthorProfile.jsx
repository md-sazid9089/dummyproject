// AuthorProfile component - Displays detailed information about the blockchain article author
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Award } from 'lucide-react';

function AuthorProfile() {
  // useParams hook extracts the authorName from the URL
  // For example, if URL is "/author/Dr. Marcus Thompson", authorName will be "Dr. Marcus Thompson"
  const { authorName } = useParams();

  // In a real application, you would fetch author data from an API
  // For this demo, we'll use static data
  const authorData = {
    name: authorName,
    image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400",
    bio: "Dr. Marcus Thompson is a leading blockchain researcher and cryptocurrency expert with over 12 years of experience in distributed systems and cryptography. He holds a Ph.D. in Computer Science from MIT and has published numerous research papers on blockchain scalability, smart contracts, and decentralized finance (DeFi).",
    location: "Boston, Massachusetts",
    expertise: ["Blockchain Technology", "Cryptocurrency", "Smart Contracts", "Distributed Systems", "Cryptography"],
    education: "Ph.D. Computer Science, MIT",
    achievements: [
      "Published 60+ research papers on blockchain and distributed systems",
      "Recipient of the IEEE Blockchain Innovation Award 2023",
      "Technical advisor for multiple Fortune 500 companies on blockchain adoption",
      "Keynote speaker at 30+ international blockchain conferences",
      "Co-founder of the Blockchain Research Institute"
    ],
    joinDate: "March 2019"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Navigation Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto p-6">
          <Link 
            to="/"
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 transition-colors duration-200 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Article
          </Link>
        </div>
      </div>

      {/* Author Profile Content */}
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-8 text-white">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Author Image */}
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg flex-shrink-0">
                <img 
                  src={authorData.image}
                  alt={`${authorData.name} profile picture`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Author Basic Info */}
              <div className="text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  {authorData.name}
                </h1>
                <p className="text-xl opacity-90 mb-4">
                  Blockchain Researcher & Cryptocurrency Expert
                </p>
                
                <div className="flex flex-col sm:flex-row items-center gap-4 text-sm opacity-80">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{authorData.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>Joined {authorData.joinDate}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-8 space-y-8">
            {/* Bio Section */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {authorData.bio}
              </p>
            </section>

            {/* Expertise Section */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Areas of Expertise</h2>
              <div className="flex flex-wrap gap-2">
                {authorData.expertise.map((skill, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            {/* Education Section */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Education</h2>
              <div className="flex items-center gap-2 text-gray-700">
                <Award className="w-5 h-5 text-purple-600" />
                <span className="text-lg">{authorData.education}</span>
              </div>
            </section>

            {/* Achievements Section */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Achievements</h2>
              <ul className="space-y-3">
                {authorData.achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{achievement}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>

        {/* Back to Article Button */}
        <div className="mt-8 text-center">
          <Link 
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to Article
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AuthorProfile;