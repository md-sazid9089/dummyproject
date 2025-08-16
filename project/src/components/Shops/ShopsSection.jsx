import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Clock, Star, Phone, Mail, Tag, Eye, Heart, X } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { CardSkeleton } from '../UI/SkeletonLoader';
import LoadingSpinner from '../UI/LoadingSpinner';

const ShopsSection = () => {
  const { state, dispatch } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [selectedShop, setSelectedShop] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState(new Set());
  const [sortBy, setSortBy] = useState('rating');

  const categories = [
    { id: 'all', label: 'All Categories', icon: '🏪' },
    { id: 'restaurants', label: 'Restaurants', icon: '🍽️' },
    { id: 'shopping', label: 'Shopping', icon: '🛍️' },
    { id: 'services', label: 'Services', icon: '🔧' },
    { id: 'healthcare', label: 'Healthcare', icon: '🏥' },
    { id: 'entertainment', label: 'Entertainment', icon: '🎭' },
    { id: 'fitness', label: 'Fitness', icon: '💪' },
    { id: 'beauty', label: 'Beauty', icon: '💄' },
    { id: 'automotive', label: 'Automotive', icon: '🚗' },
  ];

  // Mock data for demonstration
  const mockShops = [
    {
      id: '1',
      name: "Harun Bhat Ghor",
      category: 'restaurants',
      subcategory: 'Italian',
      address: '123 Main Street, Downtown',
      distance: '0.3 miles',
      rating: 4.8,
      reviews: 127,
      priceRange: '$$',
      images: [
        'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg',
        'https://images.pexels.com/photos/776538/pexels-photo-776538.jpeg'
      ],
      description: 'Family-owned Italian restaurant serving authentic dishes with fresh ingredients since 1985.',
      hours: {
        'Monday': '11:00 AM - 10:00 PM',
        'Tuesday': '11:00 AM - 10:00 PM',
        'Wednesday': '11:00 AM - 10:00 PM',
        'Thursday': '11:00 AM - 10:00 PM',
        'Friday': '11:00 AM - 11:00 PM',
        'Saturday': '11:00 AM - 11:00 PM',
        'Sunday': '12:00 PM - 9:00 PM'
      },
      contact: {
        phone: '+1 (555) 123-4567',
        email: 'info@tonysitalian.com',
        website: 'www.tonysitalian.com'
      },
      features: ['Outdoor Seating', 'Takeout', 'Delivery', 'Wine Bar'],
      deals: ['20% off lunch specials Mon-Fri', 'Happy Hour 4-6 PM'],
      isOpen: true
    },
    {
      id: '2',
      name: 'Sazid Fitness Center',
      category: 'fitness',
      subcategory: 'Gym',
      address: '456 Oak Avenue, Midtown',
      distance: '0.7 miles',
      rating: 4.5,
      reviews: 89,
      priceRange: '$$$',
      images: [
        'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg',
        'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg'
      ],
      description: 'State-of-the-art fitness facility with personal trainers and group classes.',
      hours: {
        'Monday': '5:00 AM - 11:00 PM',
        'Tuesday': '5:00 AM - 11:00 PM',
        'Wednesday': '5:00 AM - 11:00 PM',
        'Thursday': '5:00 AM - 11:00 PM',
        'Friday': '5:00 AM - 10:00 PM',
        'Saturday': '6:00 AM - 8:00 PM',
        'Sunday': '7:00 AM - 8:00 PM'
      },
      contact: {
        phone: '+1 (555) 987-6543',
        email: 'info@urbanfitness.com'
      },
      features: ['Personal Training', 'Group Classes', 'Pool', 'Sauna'],
      deals: ['First month free for new members', '50% off personal training packages'],
      isOpen: true
    },
    {
      id: '3',
      name: "Ifan's Beauty Salon",
      category: 'beauty',
      subcategory: 'Hair & Nails',
      address: '789 Fashion District, Downtown',
      distance: '0.5 miles',
      rating: 4.9,
      reviews: 203,
      priceRange: '$$',
      images: [
        'https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg',
        'https://images.pexels.com/photos/3065171/pexels-photo-3065171.jpeg'
      ],
      description: 'Full-service beauty salon offering hair styling, coloring, and nail services.',
      hours: {
        'Monday': 'Closed',
        'Tuesday': '9:00 AM - 7:00 PM',
        'Wednesday': '9:00 AM - 7:00 PM',
        'Thursday': '9:00 AM - 8:00 PM',
        'Friday': '9:00 AM - 8:00 PM',
        'Saturday': '8:00 AM - 6:00 PM',
        'Sunday': '10:00 AM - 5:00 PM'
      },
      contact: {
        phone: '+1 (555) 246-8135',
        email: 'appointments@bellasbeauty.com'
      },
      features: ['Hair Styling', 'Coloring', 'Manicure', 'Pedicure'],
      deals: ['Student discount 15%', 'Package deals available'],
      isOpen: false
    },
    {
      id: '4',
      name: 'Walton Electronics',
      category: 'shopping',
      subcategory: 'Electronics',
      address: '321 Tech Boulevard, Uptown',
      distance: '1.2 miles',
      rating: 4.3,
      reviews: 156,
      priceRange: '$$$',
      images: [
        'https://images.pexels.com/photos/325153/pexels-photo-325153.jpeg',
        'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg'
      ],
      description: 'Electronics store with latest gadgets, computers, and accessories.',
      hours: {
        'Monday': '10:00 AM - 9:00 PM',
        'Tuesday': '10:00 AM - 9:00 PM',
        'Wednesday': '10:00 AM - 9:00 PM',
        'Thursday': '10:00 AM - 9:00 PM',
        'Friday': '10:00 AM - 9:00 PM',
        'Saturday': '10:00 AM - 9:00 PM',
        'Sunday': '11:00 AM - 7:00 PM'
      },
      contact: {
        phone: '+1 (555) 369-2580',
        email: 'info@techmart.com',
        website: 'www.techmart.com'
      },
      features: ['Tech Support', 'Warranty Service', 'Price Matching'],
      deals: ['Back to school sale 25% off laptops', 'Extended warranty deals'],
      isOpen: true
    }
  ];

  useEffect(() => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    // Simulate API call
    setTimeout(() => {
      dispatch({ type: 'SET_SHOPS', payload: mockShops });
      dispatch({ type: 'SET_LOADING', payload: false });
    }, 1000);
  }, [state.currentCity, dispatch]);

  const filteredShops = state.shops.filter((shop) => {
    const matchesSearch = shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shop.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shop.subcategory.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || shop.category === selectedCategory;
    const matchesPrice = priceFilter === 'all' || shop.priceRange === priceFilter;
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const sortedShops = [...filteredShops].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'distance':
        return parseFloat(a.distance) - parseFloat(b.distance);
      case 'reviews':
        return b.reviews - a.reviews;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const toggleFavorite = (shopId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(shopId)) {
      newFavorites.delete(shopId);
    } else {
      newFavorites.add(shopId);
    }
    setFavorites(newFavorites);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const renderPriceRange = (range) => {
    return Array.from({ length: 4 }).map((_, index) => (
      <span
        key={index}
        className={`${
          index < range.length ? 'text-green-600' : 'text-gray-300'
        }`}
      >
        $
      </span>
    ));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Shop Locator - {state.currentCity}
        </h1>
        <p className="text-gray-600">
          Discover local businesses, read reviews, and find the best deals in your area
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4 mb-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search businesses, services, products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="rating">Sort by Rating</option>
            <option value="distance">Sort by Distance</option>
            <option value="reviews">Sort by Reviews</option>
            <option value="name">Sort by Name</option>
          </select>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </button>
        </div>

        {/* Category Filters */}
        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2 mb-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex flex-col items-center p-3 rounded-lg border transition-colors ${
                selectedCategory === category.id
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <span className="text-2xl mb-1">{category.icon}</span>
              <span className="text-xs font-medium text-center">{category.label}</span>
            </button>
          ))}
        </div>

        {showFilters && (
          <div className="pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </label>
                <select
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="all">All Prices</option>
                  <option value="$">$ - Budget</option>
                  <option value="$$">$$ - Moderate</option>
                  <option value="$$$">$$$ - Expensive</option>
                  <option value="$$$$">$$$$ - Very Expensive</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Open Now
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm text-gray-700">Open now</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm text-gray-700">Open 24 hours</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Features
                </label>
                <div className="space-y-2">
                  {['Delivery', 'Takeout', 'Parking', 'WiFi'].map((feature) => (
                    <label key={feature} className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Map Integration Placeholder */}
      <div className="bg-gray-100 rounded-lg p-8 text-center mb-8 border-2 border-dashed border-gray-300">
        <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Interactive Business Map</h3>
        <p className="text-gray-600">
          Map integration would show business locations with reviews and quick info
        </p>
      </div>

      {/* Shops Grid */}
      {state.loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedShops.map((shop) => (
            <div
              key={shop.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer"
              onClick={() => setSelectedShop(shop)}
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={shop.images[0]}
                  alt={shop.name}
                  className="w-full h-48 object-cover"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(shop.id);
                  }}
                  className={`absolute top-3 right-3 p-2 rounded-full ${
                    favorites.has(shop.id)
                      ? 'bg-red-500 text-white'
                      : 'bg-white text-gray-600'
                  } hover:scale-105 transition-transform`}
                >
                  <Heart className={`h-4 w-4 ${favorites.has(shop.id) ? 'fill-current' : ''}`} />
                </button>
                
                {/* Status Badge */}
                <div className={`absolute bottom-3 left-3 px-2 py-1 rounded-lg text-xs font-medium ${
                  shop.isOpen 
                    ? 'bg-green-600 text-white' 
                    : 'bg-red-600 text-white'
                }`}>
                  {shop.isOpen ? 'Open Now' : 'Closed'}
                </div>

                {/* Deals Badge */}
                {shop.deals.length > 0 && (
                  <div className="absolute top-3 left-3 bg-orange-600 text-white px-2 py-1 rounded-lg text-xs font-medium flex items-center">
                    <Tag className="h-3 w-3 mr-1" />
                    {shop.deals.length} Deal{shop.deals.length > 1 ? 's' : ''}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                    {shop.name}
                  </h3>
                  <div className="flex items-center">
                    {renderPriceRange(shop.priceRange)}
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-2">{shop.subcategory}</p>

                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{shop.address}</span>
                </div>

                <div className="flex items-center text-gray-600 mb-3">
                  <span className="text-sm">{shop.distance} away</span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    {renderStars(shop.rating)}
                    <span className="ml-2 text-sm text-gray-600">
                      {shop.rating} ({shop.reviews} reviews)
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {shop.features.slice(0, 3).map((feature) => (
                    <span
                      key={feature}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                  {shop.features.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      +{shop.features.length - 3} more
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                      <Phone className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                      <Mail className="h-4 w-4" />
                    </button>
                    {shop.contact.website && (
                      <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    <Clock className="h-3 w-3 inline mr-1" />
                    {shop.isOpen ? 'Open' : 'Closed'}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {sortedShops.length === 0 && !state.loading && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No businesses found</h3>
          <p className="text-gray-600">
            Try adjusting your search criteria or filters
          </p>
        </div>
      )}

      {/* Shop Detail Modal */}
      {selectedShop && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {selectedShop.name}
                  </h2>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{selectedShop.address}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedShop(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Image Gallery */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {selectedShop.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${selectedShop.name} ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">About</h3>
                  <p className="text-gray-700 mb-6">{selectedShop.description}</p>

                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Features</h3>
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {selectedShop.features.map((feature) => (
                      <div key={feature} className="flex items-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {selectedShop.deals.length > 0 && (
                    <>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Current Deals</h3>
                      <div className="space-y-2 mb-6">
                        {selectedShop.deals.map((deal, index) => (
                          <div key={index} className="flex items-center p-3 bg-orange-50 border border-orange-200 rounded-lg">
                            <Tag className="h-4 w-4 text-orange-600 mr-2" />
                            <span className="text-orange-800">{deal}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Hours</h3>
                  <div className="space-y-2">
                    {Object.entries(selectedShop.hours).map(([day, hours]) => (
                      <div key={day} className="flex justify-between">
                        <span className="font-medium text-gray-900">{day}:</span>
                        <span className="text-gray-700">{hours}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      {renderStars(selectedShop.rating)}
                      <span className="ml-2 text-lg font-semibold text-gray-900">
                        {selectedShop.rating}
                      </span>
                      <span className="ml-1 text-sm text-gray-600">
                        ({selectedShop.reviews} reviews)
                      </span>
                    </div>

                    <div className="flex items-center mb-4">
                      <span className="text-gray-600 mr-2">Price Range:</span>
                      {renderPriceRange(selectedShop.priceRange)}
                    </div>

                    <div className={`flex items-center mb-6 ${
                      selectedShop.isOpen ? 'text-green-600' : 'text-red-600'
                    }`}>
                      <Clock className="h-4 w-4 mr-2" />
                      <span className="font-medium">
                        {selectedShop.isOpen ? 'Open Now' : 'Closed'}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <button className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        <Phone className="h-4 w-4 mr-2" />
                        Call Now
                      </button>
                      <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                        <Mail className="h-4 w-4 mr-2" />
                        Send Message
                      </button>
                      {selectedShop.contact.website && (
                        <button className="w-full flex items-center justify-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                          <Eye className="h-4 w-4 mr-2" />
                          Visit Website
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopsSection;