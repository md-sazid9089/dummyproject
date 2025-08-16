import React, { useState, useEffect } from 'react';
import { AppProvider } from './contexts/AppContext';
import Header from './components/Layout/Header';
import HousingSection from './components/Housing/HousingSection';
import NavigatorSection from './components/Navigator/NavigatorSection';
import ShopsSection from './components/Shops/ShopsSection';
import SubscriptionSection from './components/Subscription/SubscriptionSection';
import AuthModal from './components/Auth/AuthModal';
import Toast from './components/UI/Toast';

function App() {
  const [currentSection, setCurrentSection] = useState('housing');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  // Welcome toast on first load
  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      setTimeout(() => {
          addToast('Welcome to Bachelor Solution! Explore housing, navigation, and local businesses.', 'info');
        localStorage.setItem('hasVisited', 'true');
      }, 1000);
    }
  }, []);

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'housing':
        return <HousingSection />;
      case 'navigator':
        return <NavigatorSection />;
      case 'shops':
        return <ShopsSection />;
      case 'subscription':
        return <SubscriptionSection />;
      default:
        return <HousingSection />;
    }
  };

  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-50">
        <Header 
          currentSection={currentSection} 
          onSectionChange={setCurrentSection}
        />
        
        <main className="pb-8">
          {renderCurrentSection()}
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-2 rounded-lg">
                    <span className="text-white font-bold text-xl">🏙️</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Bachelor Solution</h3>
                    <p className="text-sm text-gray-500">Navigate with confidence</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-6">
                  Your comprehensive platform for navigating city life. Find housing, explore neighborhoods, 
                  discover local businesses, and make the most of your urban experience.
                </p>
                <div className="flex space-x-4">
                  <button className="text-gray-400 hover:text-blue-600 transition-colors">
                    <span className="sr-only">Facebook</span>
                    📘
                  </button>
                  <button className="text-gray-400 hover:text-blue-600 transition-colors">
                    <span className="sr-only">Twitter</span>
                    🐦
                  </button>
                  <button className="text-gray-400 hover:text-blue-600 transition-colors">
                    <span className="sr-only">Instagram</span>
                    📷
                  </button>
                  <button className="text-gray-400 hover:text-blue-600 transition-colors">
                    <span className="sr-only">LinkedIn</span>
                    💼
                  </button>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Services</h4>
                <ul className="space-y-2">
                  <li><button onClick={() => setCurrentSection('housing')} className="text-gray-600 hover:text-blue-600 transition-colors">Housing Search</button></li>
                  <li><button onClick={() => setCurrentSection('navigator')} className="text-gray-600 hover:text-blue-600 transition-colors">Street Navigation</button></li>
                  <li><button onClick={() => setCurrentSection('shops')} className="text-gray-600 hover:text-blue-600 transition-colors">Business Directory</button></li>
                  <li><button onClick={() => setCurrentSection('subscription')} className="text-gray-600 hover:text-blue-600 transition-colors">Premium Plans</button></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Help Center</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Contact Us</a></li>
                  <li><button onClick={() => setShowAuthModal(true)} className="text-gray-600 hover:text-blue-600 transition-colors">Sign In</button></li>
                  <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Privacy Policy</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-200 mt-8 pt-8 text-center">
              <p className="text-gray-600">
                © 2025 Bachelor Solution. All rights reserved. Made with ❤️ for urban explorers.
              </p>
            </div>
          </div>
        </footer>

        {/* Auth Modal */}
        <AuthModal 
          isOpen={showAuthModal} 
          onClose={() => setShowAuthModal(false)} 
        />

        {/* Toast Notifications */}
        <div className="fixed top-4 right-4 z-50 space-y-2">
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              message={toast.message}
              type={toast.type}
              onClose={() => removeToast(toast.id)}
            />
          ))}
        </div>
      </div>
    </AppProvider>
  );
}

export default App;