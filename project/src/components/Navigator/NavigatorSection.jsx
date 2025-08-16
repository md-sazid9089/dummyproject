import React, { useState, useEffect } from 'react';
import { Navigation, MapPin, Clock, Shield, Bus, Car, Bike } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import LoadingSpinner from '../UI/LoadingSpinner';

const NavigatorSection = () => {
  const { state } = useApp();
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [selectedTransport, setSelectedTransport] = useState('walking');
  const [routes, setRoutes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);

  const transportOptions = [
    { id: 'walking', label: 'Walking', icon: '🚶', color: 'text-green-600' },
    { id: 'driving', label: 'Driving', icon: Car, color: 'text-blue-600' },
    { id: 'transit', label: 'Public Transit', icon: Bus, color: 'text-purple-600' },
    { id: 'cycling', label: 'Cycling', icon: Bike, color: 'text-orange-600' },
  ];

  // Mock landmarks data
  const landmarks = [
    'Central Park', 'Times Square', 'Brooklyn Bridge', 'Statue of Liberty',
    'Empire State Building', 'High Line', 'One World Trade Center', 'Museum of Natural History'
  ];

  // Mock popular routes
  const popularRoutes = [
    { from: 'Central Park', to: 'Times Square', count: 1245 },
    { from: 'Brooklyn Bridge', to: 'Wall Street', count: 987 },
    { from: 'High Line', to: 'Chelsea Market', count: 756 },
  ];

  const handleSearch = async () => {
    if (!fromLocation || !toLocation) return;

    setIsLoading(true);
    
    // Mock API call
    setTimeout(() => {
      const mockRoutes = [
        {
          id: '1',
          name: 'Fastest Route',
          from: fromLocation,
          to: toLocation,
          duration: 25,
          distance: '2.3 miles',
          type: selectedTransport,
          steps: [
            'Head north on Broadway',
            'Turn right on 42nd Street',
            'Continue for 0.5 miles',
            'Turn left on 7th Avenue',
            'Destination will be on your right'
          ],
          safetyRating: 4.5,
          landmarks: ['Times Square', 'Bryant Park']
        },
        {
          id: '2',
          name: 'Scenic Route',
          from: fromLocation,
          to: toLocation,
          duration: 35,
          distance: '2.8 miles',
          type: selectedTransport,
          steps: [
            'Head east on 14th Street',
            'Turn north on Park Avenue',
            'Continue through Union Square',
            'Turn right on 23rd Street',
            'Destination ahead'
          ],
          safetyRating: 4.8,
          landmarks: ['Union Square', 'Flatiron Building', 'Madison Square Park']
        }
      ];
      
      setRoutes(mockRoutes);
      setSelectedRoute(mockRoutes[0]);
      setIsLoading(false);
    }, 1000);
  };

  const renderSafetyRating = (rating) => {
    const shields = Array.from({ length: 5 }).map((_, index) => (
      <Shield
        key={index}
        className={`h-4 w-4 ${
          index < Math.floor(rating) ? 'text-green-500 fill-current' : 'text-gray-300'
        }`}
      />
    ));
    return shields;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Street Navigator - {state.currentCity}
        </h1>
        <p className="text-gray-600">
          Get turn-by-turn directions and discover the best routes in your city
        </p>
      </div>

      {/* Navigation Form */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Enter starting location"
                value={fromLocation}
                onChange={(e) => setFromLocation(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Enter destination"
                value={toLocation}
                onChange={(e) => setToLocation(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Transport Options */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Transportation</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {transportOptions.map((option) => {
              const IconComponent = typeof option.icon === 'string' ? null : option.icon;
              return (
                <button
                  key={option.id}
                  onClick={() => setSelectedTransport(option.id)}
                  className={`flex items-center justify-center px-4 py-3 rounded-lg border transition-colors ${
                    selectedTransport === option.id
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {IconComponent ? (
                    <IconComponent className={`h-5 w-5 mr-2 ${option.color}`} />
                  ) : (
                    <span className="mr-2 text-lg">{option.icon}</span>
                  )}
                  <span className="text-sm font-medium">{option.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={handleSearch}
          disabled={!fromLocation || !toLocation || isLoading}
          className="w-full md:w-auto flex items-center justify-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <LoadingSpinner size="sm" color="text-white" />
          ) : (
            <>
              <Navigation className="h-4 w-4 mr-2" />
              Get Directions
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Routes List */}
        <div className="lg:col-span-1">
          {routes.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Routes</h3>
              <div className="space-y-4">
                {routes.map((route) => (
                  <div
                    key={route.id}
                    onClick={() => setSelectedRoute(route)}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedRoute?.id === route.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{route.name}</h4>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-gray-400 mr-1" />
                        <span className="text-sm text-gray-600">{route.duration} min</span>
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-600 mb-2">
                      Distance: {route.distance}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-sm text-gray-600 mr-2">Safety:</span>
                        {renderSafetyRating(route.safetyRating)}
                      </div>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                        {route.landmarks.length} landmarks
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Popular Routes */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Routes</h3>
            <div className="space-y-3">
              {popularRoutes.map((route, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900 text-sm">
                      {route.from} → {route.to}
                    </div>
                    <div className="text-xs text-gray-600">
                      {route.count.toLocaleString()} users
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setFromLocation(route.from);
                      setToLocation(route.to);
                    }}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Use Route
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Map and Route Details */}
        <div className="lg:col-span-2">
          {/* Map Placeholder */}
          <div className="bg-gray-100 rounded-lg p-8 text-center mb-6 border-2 border-dashed border-gray-300 h-64">
            <Navigation className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Interactive Map</h3>
            <p className="text-gray-600">
              Real-time navigation map with turn-by-turn directions would be displayed here
            </p>
          </div>

          {/* Route Details */}
          {selectedRoute && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  {selectedRoute.name}
                </h3>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-1" />
                    {selectedRoute.duration} min
                  </div>
                  <div className="text-sm text-gray-600">
                    {selectedRoute.distance}
                  </div>
                </div>
              </div>

              {/* Safety Rating */}
              <div className="flex items-center mb-6">
                <span className="text-sm font-medium text-gray-700 mr-3">Safety Rating:</span>
                {renderSafetyRating(selectedRoute.safetyRating)}
                <span className="ml-2 text-sm text-gray-600">
                  {selectedRoute.safetyRating}/5.0
                </span>
              </div>

              {/* Turn-by-turn Directions */}
              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Turn-by-turn Directions</h4>
                <div className="space-y-3">
                  {selectedRoute.steps.map((step, index) => (
                    <div key={index} className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3">
                        {index + 1}
                      </div>
                      <div className="flex-1 pt-1">
                        <p className="text-gray-700">{step}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Landmarks */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">Landmarks Along the Route</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedRoute.landmarks.map((landmark) => (
                    <span
                      key={landmark}
                      className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-medium"
                    >
                      {landmark}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Access Landmarks */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Popular Landmarks</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {landmarks.map((landmark) => (
            <button
              key={landmark}
              onClick={() => setToLocation(landmark)}
              className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow text-left"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg mb-3 flex items-center justify-center">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-medium text-gray-900 text-sm">{landmark}</h4>
              <p className="text-xs text-gray-600 mt-1">Tap to set as destination</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavigatorSection;