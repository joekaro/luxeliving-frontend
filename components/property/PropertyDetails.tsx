// app/properties/[id]/page.tsx - ENHANCED VERSION
'use client'

import { useState } from 'react'
import { 
  MapPin, Bed, Bath, Square, Car, Calendar, 
  Heart, Share2, Phone, Mail, User, Check,
  Wifi, Tv, Coffee, Wind, Shield, Zap
} from 'lucide-react'

export default function PropertyDetailPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [isFavorite, setIsFavorite] = useState(false)

  const property = {
    id: 1,
    title: 'Modern Luxury Villa with Ocean View',
    address: '123 Palm Street, Miami Beach, FL 33139',
    price: 2500000,
    description: 'This stunning modern villa offers panoramic ocean views, smart home technology, and luxurious finishes throughout. Features include floor-to-ceiling windows, infinity pool, gourmet kitchen with premium appliances, and a private beach access.',
    bedrooms: 5,
    bathrooms: 4,
    sqft: 3500,
    garage: 2,
    yearBuilt: 2022,
    type: 'Villa',
    features: ['Ocean View', 'Smart Home', 'Infinity Pool', 'Private Beach Access', 'Wine Cellar', 'Home Theater'],
    amenities: ['Swimming Pool', 'Gym', 'Spa', 'Security System', 'Garage', 'Garden'],
    agent: {
      name: 'Sarah Johnson',
      phone: '(123) 456-7890',
      email: 'sarah@luxeliving.com',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b786d4d0?w=400'
    }
  }

  const calculateMortgage = () => {
    const loanAmount = property.price * 0.8 // 20% down payment
    const interestRate = 6.5
    const loanTerm = 30
    const monthlyRate = interestRate / 100 / 12
    const months = loanTerm * 12
    const monthly = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                   (Math.pow(1 + monthlyRate, months) - 1)
    return monthly.toFixed(2)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-600">
          <a href="/" className="hover:text-blue-600">Home</a> / 
          <a href="/properties" className="hover:text-blue-600"> Properties</a> / 
          <span className="text-gray-800"> {property.title}</span>
        </div>

        {/* Property Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{property.title}</h1>
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin size={18} className="mr-2" />
                <span>{property.address}</span>
              </div>
            </div>
            <div className="text-2xl md:text-3xl font-bold text-blue-600 mt-4 lg:mt-0">
              ${property.price.toLocaleString()}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                isFavorite 
                  ? 'bg-red-50 text-red-600 border border-red-200' 
                  : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
              }`}
            >
              <Heart size={20} className={isFavorite ? 'fill-red-600' : ''} />
              <span>{isFavorite ? 'Saved' : 'Save Property'}</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-50 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
              <Share2 size={20} />
              <span>Share</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Phone size={20} />
              <span>Schedule Tour</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="bg-white rounded-xl shadow-lg p-4 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 h-64 md:h-96 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg"></div>
                <div className="grid grid-rows-2 gap-4">
                  <div className="bg-gradient-to-r from-gray-300 to-gray-400 rounded-lg"></div>
                  <div className="bg-gradient-to-r from-gray-400 to-gray-500 rounded-lg"></div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
              <div className="border-b">
                <div className="flex overflow-x-auto">
                  <button
                    className={`px-6 py-4 font-medium ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                    onClick={() => setActiveTab('overview')}
                  >
                    Overview
                  </button>
                  <button
                    className={`px-6 py-4 font-medium ${activeTab === 'features' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                    onClick={() => setActiveTab('features')}
                  >
                    Features
                  </button>
                  <button
                    className={`px-6 py-4 font-medium ${activeTab === 'calculator' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                    onClick={() => setActiveTab('calculator')}
                  >
                    Mortgage Calculator
                  </button>
                </div>
              </div>

              <div className="p-6">
                {activeTab === 'overview' && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Property Description</h3>
                    <p className="text-gray-700 mb-6">{property.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 border rounded-lg">
                        <Bed size={24} className="text-blue-600 mx-auto mb-2" />
                        <div className="text-lg font-bold text-gray-800">{property.bedrooms}</div>
                        <div className="text-gray-600">Bedrooms</div>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <Bath size={24} className="text-blue-600 mx-auto mb-2" />
                        <div className="text-lg font-bold text-gray-800">{property.bathrooms}</div>
                        <div className="text-gray-600">Bathrooms</div>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <Square size={24} className="text-blue-600 mx-auto mb-2" />
                        <div className="text-lg font-bold text-gray-800">{property.sqft.toLocaleString()}</div>
                        <div className="text-gray-600">Square Feet</div>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <Car size={24} className="text-blue-600 mx-auto mb-2" />
                        <div className="text-lg font-bold text-gray-800">{property.garage}</div>
                        <div className="text-gray-600">Garage</div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'features' && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Property Features & Amenities</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-gray-700 mb-3">Key Features</h4>
                        <ul className="space-y-2">
                          {property.features.map((feature, index) => (
                            <li key={index} className="flex items-center">
                              <Check size={16} className="text-green-500 mr-2" />
                              <span className="text-gray-700">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-700 mb-3">Amenities</h4>
                        <ul className="space-y-2">
                          {property.amenities.map((amenity, index) => (
                            <li key={index} className="flex items-center">
                              <Check size={16} className="text-green-500 mr-2" />
                              <span className="text-gray-700">{amenity}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'calculator' && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Mortgage Calculator</h3>
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg">
                      <div className="mb-6">
                        <label className="block text-gray-700 mb-2">Down Payment (20%)</label>
                        <div className="text-2xl font-bold text-blue-600">
                          ${(property.price * 0.2).toLocaleString()}
                        </div>
                      </div>
                      <div className="mb-6">
                        <label className="block text-gray-700 mb-2">Loan Amount</label>
                        <div className="text-2xl font-bold text-gray-800">
                          ${(property.price * 0.8).toLocaleString()}
                        </div>
                      </div>
                      <div className="mb-6">
                        <label className="block text-gray-700 mb-2">Estimated Monthly Payment</label>
                        <div className="text-3xl font-bold text-green-600">
                          ${calculateMortgage()}
                        </div>
                        <p className="text-gray-600 text-sm mt-2">Based on 6.5% interest rate for 30 years</p>
                      </div>
                      <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Get Pre-Approved
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Agent Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Contact Agent</h3>
              
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-full bg-cover bg-center mr-4" 
                     style={{backgroundImage: `url(${property.agent.image})`}}></div>
                <div>
                  <h4 className="font-bold text-gray-800">{property.agent.name}</h4>
                  <p className="text-blue-600 font-medium">Licensed Agent</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <a href={`tel:${property.agent.phone}`} className="flex items-center text-gray-700 hover:text-blue-600">
                  <Phone size={18} className="mr-3 text-blue-600" />
                  <span>{property.agent.phone}</span>
                </a>
                <a href={`mailto:${property.agent.email}`} className="flex items-center text-gray-700 hover:text-blue-600">
                  <Mail size={18} className="mr-3 text-blue-600" />
                  <span>{property.agent.email}</span>
                </a>
              </div>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  placeholder="Your Message"
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-bold">
                  Send Message
                </button>
              </div>
            </div>

            {/* Schedule Tour */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center mb-4">
                <Calendar size={24} className="mr-3" />
                <h3 className="text-xl font-bold">Schedule a Tour</h3>
              </div>
              <p className="mb-6 text-blue-100">Book a private viewing of this property</p>
              <button className="w-full py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 font-bold">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}