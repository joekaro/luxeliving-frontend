// app/properties/[id]/page.tsx - CONNECTED TO DATABASE
'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { 
  MapPin, Bed, Bath, Square, Car, Calendar, 
  Heart, Share2, Phone, Mail, User, Check,
  ArrowLeft, DollarSign, Home as HomeIcon, Edit, Trash2
} from 'lucide-react'
import { api, Property } from '@/lib/api'
import { useAuth } from '@/components/providers/AuthProvider'
import Link from 'next/link'

export default function PropertyDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const propertyId = params.id as string
  
  const [property, setProperty] = useState<Property | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [isSaved, setIsSaved] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    if (propertyId) {
      fetchProperty()
    }
  }, [propertyId])

  const fetchProperty = async () => {
    try {
      setIsLoading(true)
      const response = await api.getProperty(propertyId)
      
      if (response.success && response.data) {
        setProperty(response.data)
        // Check if property is saved by current user
        if (user) {
          const savedResponse = await api.getSavedProperties(user.id)
          if (savedResponse.success && savedResponse.data) {
            const isPropertySaved = savedResponse.data.some(p => p.id === propertyId)
            setIsSaved(isPropertySaved)
          }
        }
      } else {
        setError(response.message || 'Failed to load property')
      }
    } catch (error) {
      console.error('Error fetching property:', error)
      setError('Failed to load property details')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveProperty = async () => {
    if (!user) {
      alert('Please login to save properties')
      return
    }

    try {
      if (isSaved) {
        await api.unsaveProperty(user.id, propertyId)
        setIsSaved(false)
      } else {
        await api.saveProperty(user.id, propertyId)
        setIsSaved(true)
      }
    } catch (error) {
      console.error('Error saving property:', error)
      alert('Failed to save property')
    }
  }

  const handleDeleteProperty = async () => {
    if (!confirm('Are you sure you want to delete this property?')) return
    
    try {
      const response = await api.deleteProperty(propertyId)
      if (response.success) {
        alert('Property deleted successfully')
        router.push('/properties')
      } else {
        alert(response.message || 'Failed to delete property')
      }
    } catch (error) {
      console.error('Error deleting property:', error)
      alert('Failed to delete property')
    }
  }

  const calculateMortgage = (price: number, downPaymentPercent = 20, interestRate = 6.5, years = 30) => {
    const downPayment = price * (downPaymentPercent / 100)
    const loanAmount = price - downPayment
    const monthlyRate = interestRate / 100 / 12
    const months = years * 12
    const monthly = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                   (Math.pow(1 + monthlyRate, months) - 1)
    return {
      downPayment,
      loanAmount,
      monthlyPayment: monthly
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading property details...</p>
        </div>
      </div>
    )
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-2">Error Loading Property</h2>
            <p>{error || 'Property not found'}</p>
            <button 
              onClick={() => router.push('/properties')}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Back to Properties
            </button>
          </div>
        </div>
      </div>
    )
  }

  const mortgage = calculateMortgage(property.price)
  const isOwner = user && (user.id === property.agentId || user.role === 'ADMIN')

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb & Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4 md:mb-0">
            <Link href="/" className="hover:text-blue-600 flex items-center">
              <HomeIcon size={14} className="mr-1" />
              Home
            </Link>
            <span>/</span>
            <Link href="/properties" className="hover:text-blue-600">Properties</Link>
            <span>/</span>
            <span className="text-gray-800 truncate max-w-xs">{property.title}</span>
          </div>
          
          <div className="flex items-center space-x-3">
            {isOwner && (
              <>
                <Link 
                  href={`/properties/${property.id}/edit`}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Edit size={18} />
                  <span>Edit</span>
                </Link>
                <button
                  onClick={handleDeleteProperty}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  <Trash2 size={18} />
                  <span>Delete</span>
                </button>
              </>
            )}
            <button
              onClick={() => router.back()}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <ArrowLeft size={18} />
              <span>Back</span>
            </button>
          </div>
        </div>

        {/* Property Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
            <div className="flex-1">
              <div className="flex items-center flex-wrap gap-2 mb-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  property.status === 'AVAILABLE' ? 'bg-green-100 text-green-700' :
                  property.status === 'SOLD' ? 'bg-red-100 text-red-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {property.status}
                </span>
                {property.isFeatured && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    Featured
                  </span>
                )}
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                  {property.propertyType}
                </span>
              </div>
              
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{property.title}</h1>
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin size={18} className="mr-2 flex-shrink-0" />
                <span>{property.address || property.location}</span>
              </div>
            </div>
            <div className="text-2xl md:text-3xl font-bold text-blue-600 mt-4 lg:mt-0">
              ${property.price.toLocaleString()}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mt-6">
            <button
              onClick={handleSaveProperty}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                isSaved 
                  ? 'bg-red-50 text-red-600 border border-red-200' 
                  : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
              }`}
            >
              <Heart size={20} className={isSaved ? 'fill-red-600' : ''} />
              <span>{isSaved ? 'Saved' : 'Save Property'}</span>
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
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
              {property.images && property.images.length > 0 ? (
                <>
                  <div className="relative h-64 md:h-96">
                    <div 
                      className="w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${property.images[selectedImage]})` }}
                    />
                    <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                      {selectedImage + 1} / {property.images.length}
                    </div>
                    {property.images.length > 1 && (
                      <>
                        <button 
                          onClick={() => setSelectedImage(prev => prev > 0 ? prev - 1 : property.images.length - 1)}
                          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
                        >
                          ←
                        </button>
                        <button 
                          onClick={() => setSelectedImage(prev => prev < property.images.length - 1 ? prev + 1 : 0)}
                          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
                        >
                          →
                        </button>
                      </>
                    )}
                  </div>
                  {property.images.length > 1 && (
                    <div className="grid grid-cols-4 gap-2 p-4">
                      {property.images.map((img, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImage(index)}
                          className={`h-20 rounded-lg overflow-hidden ${selectedImage === index ? 'ring-2 ring-blue-500' : ''}`}
                        >
                          <div 
                            className="w-full h-full bg-cover bg-center"
                            style={{ backgroundImage: `url(${img})` }}
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="h-64 md:h-96 bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                  <span className="text-white text-lg">No images available</span>
                </div>
              )}
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
              <div className="border-b overflow-x-auto">
                <div className="flex min-w-max">
                  {['Overview', 'Features', 'Mortgage Calculator', 'Location'].map((tab) => (
                    <button
                      key={tab}
                      className={`px-6 py-4 font-medium whitespace-nowrap ${activeTab === tab.toLowerCase() ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                      onClick={() => setActiveTab(tab.toLowerCase())}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6">
                {activeTab === 'overview' && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Property Description</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed whitespace-pre-line">
                      {property.description}
                    </p>
                    
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
                        <div className="text-lg font-bold text-gray-800">{property.garage || 'N/A'}</div>
                        <div className="text-gray-600">Garage</div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'features' && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-6">Property Features & Amenities</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-gray-700 mb-4 text-lg">Features</h4>
                        <ul className="space-y-3">
                          {property.features && property.features.length > 0 ? (
                            property.features.map((feature, index) => (
                              <li key={index} className="flex items-center">
                                <Check size={18} className="text-green-500 mr-3 flex-shrink-0" />
                                <span className="text-gray-700">{feature}</span>
                              </li>
                            ))
                          ) : (
                            <li className="text-gray-500">No features listed</li>
                          )}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-700 mb-4 text-lg">Amenities</h4>
                        <ul className="space-y-3">
                          {property.amenities && property.amenities.length > 0 ? (
                            property.amenities.map((amenity, index) => (
                              <li key={index} className="flex items-center">
                                <Check size={18} className="text-green-500 mr-3 flex-shrink-0" />
                                <span className="text-gray-700">{amenity}</span>
                              </li>
                            ))
                          ) : (
                            <li className="text-gray-500">No amenities listed</li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'mortgage calculator' && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-6">Mortgage Calculator</h3>
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div>
                          <label className="block text-gray-700 mb-2">Property Price</label>
                          <div className="text-2xl font-bold text-blue-600">
                            ${property.price.toLocaleString()}
                          </div>
                        </div>
                        <div>
                          <label className="block text-gray-700 mb-2">Down Payment (20%)</label>
                          <div className="text-2xl font-bold text-blue-600">
                            ${mortgage.downPayment.toLocaleString()}
                          </div>
                        </div>
                        <div>
                          <label className="block text-gray-700 mb-2">Loan Amount</label>
                          <div className="text-2xl font-bold text-gray-800">
                            ${mortgage.loanAmount.toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <div className="mb-6">
                        <label className="block text-gray-700 mb-2">Estimated Monthly Payment</label>
                        <div className="text-3xl font-bold text-green-600">
                          ${mortgage.monthlyPayment.toFixed(2)}
                        </div>
                        <p className="text-gray-600 text-sm mt-2">Based on 6.5% interest rate for 30 years</p>
                      </div>
                      <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-bold">
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
              
              {property.agent ? (
                <>
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-4">
                      <span className="text-white text-xl font-bold">
                        {property.agent.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">{property.agent.name}</h4>
                      <p className="text-blue-600 font-medium">Licensed Agent</p>
                      {property.agent.role === 'ADMIN' && (
                        <p className="text-sm text-gray-600">Admin</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <a href={`tel:${property.agent.phone}`} className="flex items-center text-gray-700 hover:text-blue-600">
                      <Phone size={18} className="mr-3 text-blue-600 flex-shrink-0" />
                      <span>{property.agent.phone || 'Phone not available'}</span>
                    </a>
                    <a href={`mailto:${property.agent.email}`} className="flex items-center text-gray-700 hover:text-blue-600">
                      <Mail size={18} className="mr-3 text-blue-600 flex-shrink-0" />
                      <span className="break-all">{property.agent.email}</span>
                    </a>
                  </div>
                </>
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-600">Agent information not available</p>
                </div>
              )}

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

            {/* Property Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Property Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Property ID</span>
                  <span className="font-medium">{property.id.substring(0, 8)}...</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Listed On</span>
                  <span className="font-medium">
                    {new Date(property.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Updated</span>
                  <span className="font-medium">
                    {new Date(property.updatedAt).toLocaleDateString()}
                  </span>
                </div>
                {property.yearBuilt && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Year Built</span>
                    <span className="font-medium">{property.yearBuilt}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}