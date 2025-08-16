import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Heart, Star, Phone, Mail, Camera, Eye, X } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { CardSkeleton } from '../UI/SkeletonLoader';
import LoadingSpinner from '../UI/LoadingSpinner';

const HousingSection = () => {
  const { state, dispatch } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 });
  const [roomFilter, setRoomFilter] = useState('all');
  const [selectedListing, setSelectedListing] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState(new Set());

  // Mock data for demonstration
  const mockListings = [
    {
      id: '1',
      title: 'Lulu Maklul',
      price: 2500,
      location: 'Mogbazar',
      rooms: 2,
      bathrooms: 2,
      area: 100,
      images: [
        'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
        'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg'
      ],
      description: 'Beautiful modern apartment with Hatirjheel views, updated kitchen, and luxury amenities.',
      landlord: {
        name: 'Syed MOhammed Sazid Ullah',
        phone: '01645016880',
        email: 'sazid.cse.20230104062@aust.edu',
        rating: 4.8
      },
      rating: 4.7,
      reviews: 23,
      features: ['No Air Conditioning', 'Gym', 'no Parking', 'smoke free'],
      isVirtualTourAvailable: true
    },
    {
      id: '2',
      title: 'Abrar Heights',
      price: 1800,
      location: 'MOdhubagh',
      rooms: 1,
      bathrooms: 1,
      area: 300,
      images: [
        'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg',
        'https://images.pexels.com/photos/2635038/pexels-photo-2635038.jpeg'
      ],
      description: 'Charming single with exposed brick walls and great natural light.',
      landlord: {
        name: 'abrar chy',
        phone: '01521783219',
        email: 'abrar@gmail.com',
        rating: 4.5
      },
      rating: 4.4,
      reviews: 18,
      features: ['top Floor', 'Laundry', 'Near station',],
      isVirtualTourAvailable: false
    },
    {
      id: '3',
      title: 'Baper Hotel',
      price: 4800,
      location: 'Bashundhara R/A',
      rooms: 3,
      bathrooms: 3,
      area: 1200,
      images: [
        'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
        'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg'
      ],
      description: 'Stunning apartment with panoramic city views and premium finishes.',
      landlord: {
        name: 'sheikh kamal',
        phone: '01712345678',
        email: 'sheikh@gmail.com',
        rating: 4.9
      },
      rating: 4.9,
      reviews: 31,
      features: ['Rooftop Access', 'Gym', 'Pool', 'Parking'],
      isVirtualTourAvailable: true
    }
  ];

  useEffect(() => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    // Simulate API call
    setTimeout(() => {
      dispatch({ type: 'SET_LISTINGS', payload: mockListings });
      dispatch({ type: 'SET_LOADING', payload: false });
    }, 1000);
  }, [state.currentCity, dispatch]);

  const filteredListings = state.listings.filter((listing) => {
    const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = listing.price >= priceRange.min && listing.price <= priceRange.max;
    const matchesRooms = roomFilter === 'all' || listing.rooms.toString() === roomFilter;
    
    return matchesSearch && matchesPrice && matchesRooms;
  });

  const toggleFavorite = (listingId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(listingId)) {
      newFavorites.delete(listingId);
    } else {
      newFavorites.add(listingId);
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Housing in {state.currentCity}
        </h1>
        <p className="text-gray-600">
          Find your perfect home with our comprehensive rental listings
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search by location, property name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Price Range */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600 whitespace-nowrap">Price:</span>
            <input
              type="number"
              placeholder="Min"
              value={priceRange.min || ''}
              onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
              className="w-20 px-2 py-2 border border-gray-300 rounded-lg text-sm"
            />
            <span className="text-gray-400">-</span>
            <input
              type="number"
              placeholder="Max"
              value={priceRange.max || ''}
              onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
              className="w-20 px-2 py-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>

          {/* Room Filter */}
          <select
            value={roomFilter}
            onChange={(e) => setRoomFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Rooms</option>
            <option value="1">1 Room</option>
            <option value="2">2 Rooms</option>
            <option value="3">3+ Rooms</option>
          </select>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Type
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option>All Types</option>
                  <option>Apartment</option>
                  <option>House</option>
                  <option>Studio</option>
                  <option>Loft</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amenities
                </label>
                <div className="space-y-2">
                  {['Parking', 'Gym', 'Pool', 'Pet Friendly'].map((amenity) => (
                    <label key={amenity} className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm text-gray-700">{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort By
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest First</option>
                  <option>Rating</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Map Integration */}
      <div className="bg-gray-100 rounded-lg p-8 text-center mb-8 border-2 border-dashed border-gray-300">
        <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Interactive Map</h3>
        <div className="flex justify-center">
          <iframe
            title="Google Map"
            style={{ width: '100%', height: '400px', border: 0, borderRadius: '0.5rem' }}
            className="w-full h-96 rounded-lg"
            frameBorder="0"
            scrolling="no"
            marginHeight="0"
            marginWidth="0"
            id="gmap_canvas"
            src="https://maps.google.com/maps?width=520&amp;height=400&amp;hl=en&amp;q=%20Dhaka+()&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            allowFullScreen
          ></iframe>
        </div>
        <script type="text/javascript" src="https://embedmaps.com/google-maps-authorization/script.js?id=e476137f15bae7fb01b043f1869526dbbe60cb0a"></script>
      </div>

      {/* Listings Grid */}
      {state.loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <div
              key={listing.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer"
              onClick={() => setSelectedListing(listing)}
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={listing.images[0]}
                  alt={listing.title}
                  className="w-full h-48 object-cover"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(listing.id);
                  }}
                  className={`absolute top-3 right-3 p-2 rounded-full ${
                    favorites.has(listing.id)
                      ? 'bg-red-500 text-white'
                      : 'bg-white text-gray-600'
                  } hover:scale-105 transition-transform`}
                >
                  <Heart className={`h-4 w-4 ${favorites.has(listing.id) ? 'fill-current' : ''}`} />
                </button>
                {listing.isVirtualTourAvailable && (
                  <div className="absolute bottom-3 left-3 bg-blue-600 text-white px-2 py-1 rounded-lg text-xs font-medium flex items-center">
                    <Eye className="h-3 w-3 mr-1" />
                    Virtual Tour
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                    {listing.title}
                  </h3>
                  <span className="text-xl font-bold text-blue-600">
                    Tk {listing.price.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{listing.location}</span>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                  <span>{listing.rooms} rooms</span>
                  <span>{listing.bathrooms} baths</span>
                  <span>{listing.area} sq ft</span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    {renderStars(listing.rating)}
                    <span className="ml-2 text-sm text-gray-600">
                      {listing.rating} ({listing.reviews} reviews)
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {listing.features.slice(0, 3).map((feature) => (
                    <span
                      key={feature}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                  {listing.features.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      +{listing.features.length - 3} more
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-600">
                    <div className="w-6 h-6 bg-gray-300 rounded-full mr-2"></div>
                    <span>{listing.landlord.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                      <Phone className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                      <Mail className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredListings.length === 0 && !state.loading && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No listings found</h3>
          <p className="text-gray-600">
            Try adjusting your search criteria or filters
          </p>
        </div>
      )}

      {/* Listing Detail Modal */}
      {selectedListing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {selectedListing.title}
                  </h2>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{selectedListing.location}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedListing(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Image Gallery */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {selectedListing.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${selectedListing.title} ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Description</h3>
                  <p className="text-gray-700 mb-6">{selectedListing.description}</p>

                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Features</h3>
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {selectedListing.features.map((feature) => (
                      <div key={feature} className="flex items-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="text-2xl font-bold text-blue-600 mb-4">
                      Tk {selectedListing.price.toLocaleString()}/month
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Rooms:</span>
                        <span className="font-medium">{selectedListing.rooms}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Bathrooms:</span>
                        <span className="font-medium">{selectedListing.bathrooms}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Area:</span>
                        <span className="font-medium">{selectedListing.area} sq ft</span>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6 mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Landlord</h4>
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {selectedListing.landlord.name}
                          </div>
                          <div className="flex items-center">
                            {renderStars(selectedListing.landlord.rating)}
                            <span className="ml-1 text-sm text-gray-600">
                              {selectedListing.landlord.rating}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <button className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          <Phone className="h-4 w-4 mr-2" />
                          Call Now
                        </button>
                        <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                          <Mail className="h-4 w-4 mr-2" />
                          Send Message
                        </button>
                      </div>
                    </div>

                    {selectedListing.isVirtualTourAvailable && (
                      <button className="w-full flex items-center justify-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                        <Eye className="h-4 w-4 mr-2" />
                        Virtual Tour
                      </button>
                    )}
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

export default HousingSection;