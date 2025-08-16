import React, { useState } from 'react';
import { MapPin, Menu, X, User, Bell } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import ProfileSettings from '../ProfileSettings';

const Header = ({ currentSection, onSectionChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showProfileSettings, setShowProfileSettings] = useState(false);
  const { state, dispatch } = useApp();

  const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia'];

  const handleCityChange = (city) => {
    dispatch({ type: 'SET_CITY', payload: city });
  };

  const navigationItems = [
    { id: 'housing', label: 'Housing', icon: '🏠' },
    { id: 'navigator', label: 'Street Navigator', icon: '🗺️' },
    { id: 'shops', label: 'Shop Locator', icon: '🏪' },
    { id: 'subscription', label: 'Subscription', icon: '💎' },
  ];

  return (
    <header className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-2 rounded-lg">
              <MapPin className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Bachelors Solution</h1>
              <p className="text-xs text-gray-500">Navigate with confidence</p>
            </div>
          </div>

          {/* City Selector */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <select
                value={state.currentCity}
                onChange={(e) => handleCityChange(e.target.value)}
                className="appearance-none bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              >
                {cities.map((city) => (
                  <option key={city} value={city}>
                    📍 {city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  currentSection === item.id
                    ? 'bg-blue-100 text-blue-700 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-3">
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Bell className="h-5 w-5" />
            </button>
            
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <User className="h-5 w-5 text-gray-600" />
                {state.user && (
                  <span className="hidden sm:block text-sm font-medium text-gray-700">
                    {state.user.name}
                  </span>
                )}
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">
                      {state.user?.name || 'Guest User'}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">
                      {state.user?.subscriptionTier || 'Free'} Plan
                    </p>
                  </div>
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setShowProfileSettings(true)}
                  >
                    Profile Settings
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Subscription
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                    Sign Out
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onSectionChange(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`flex items-center px-4 py-3 rounded-lg text-left transition-colors ${
                    currentSection === item.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </button>
              ))}
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <select
                  value={state.currentCity}
                  onChange={(e) => handleCityChange(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm"
                >
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      📍 {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Profile Settings Modal */}
        {showProfileSettings && (
          <ProfileSettings
            user={state.user}
            onClose={() => setShowProfileSettings(false)}
            onSave={(updated) => {
              dispatch({ type: 'UPDATE_USER', payload: updated });
              setShowProfileSettings(false);
            }}
          />
        )}
      </div>
    </header>
  );
};

export default Header;