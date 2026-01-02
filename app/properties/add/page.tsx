// app/properties/add/page.tsx - PROPERTY ADD FORM
'use client'

import { useState } from 'react'
import { useAuth } from '@/components/providers/AuthProvider'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Upload, X } from 'lucide-react'
import { api } from '@/lib/api'

export default function AddPropertyPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    address: '',
    bedrooms: '',
    bathrooms: '',
    sqft: '',
    propertyType: 'HOUSE',
    status: 'AVAILABLE',
    yearBuilt: '',
    garage: '',
    features: [] as string[],
    amenities: [] as string[],
    images: [] as string[],
    isFeatured: false
  })
  
  const [newFeature, setNewFeature] = useState('')
  const [newAmenity, setNewAmenity] = useState('')
  const [newImage, setNewImage] = useState('')

  if (!user || (user.role !== 'AGENT' && user.role !== 'ADMIN')) {
    router.push('/')
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!user) {
      setError('You must be logged in to add properties')
      return
    }

    try {
      setIsSubmitting(true)
      
      const propertyData = {
        ...formData,
        price: parseFloat(formData.price),
        bedrooms: parseInt(formData.bedrooms),
        bathrooms: parseInt(formData.bathrooms),
        sqft: parseInt(formData.sqft),
        yearBuilt: formData.yearBuilt ? parseInt(formData.yearBuilt) : undefined,
        garage: formData.garage ? parseInt(formData.garage) : undefined,
        agentId: user.id
      }

      const response = await api.createProperty(propertyData)
      
      if (response.success && response.data) {
        alert('Property added successfully!')
        router.push(`/properties/${response.data.id}`)
      } else {
        setError(response.message || 'Failed to add property')
      }
    } catch (error) {
      console.error('Error adding property:', error)
      setError('Failed to add property. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const addFeature = () => {
    if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
      setFormData({...formData, features: [...formData.features, newFeature.trim()]})
      setNewFeature('')
    }
  }

  const removeFeature = (feature: string) => {
    setFormData({...formData, features: formData.features.filter(f => f !== feature)})
  }

  const addAmenity = () => {
    if (newAmenity.trim() && !formData.amenities.includes(newAmenity.trim())) {
      setFormData({...formData, amenities: [...formData.amenities, newAmenity.trim()]})
      setNewAmenity('')
    }
  }

  const removeAmenity = (amenity: string) => {
    setFormData({...formData, amenities: formData.amenities.filter(a => a !== amenity)})
  }

  const addImage = () => {
    if (newImage.trim() && !formData.images.includes(newImage.trim())) {
      setFormData({...formData, images: [...formData.images, newImage.trim()]})
      setNewImage('')
    }
  }

  const removeImage = (image: string) => {
    setFormData({...formData, images: formData.images.filter(img => img !== image)})
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Add New Property</h1>
            <p className="text-gray-600">List a new property for sale or rent</p>
          </div>
          <button
            onClick={() => router.back()}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <ArrowLeft size={18} />
            <span>Back</span>
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6">
          <div className="space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Property Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="Modern Luxury Villa"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Price ($) *</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="2500000"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Location *</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="Miami Beach, FL"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Address</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="123 Palm Street"
                  />
                </div>
              </div>
            </div>

            {/* Property Details */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Property Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Bedrooms *</label>
                  <input
                    type="number"
                    value={formData.bedrooms}
                    onChange={(e) => setFormData({...formData, bedrooms: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="4"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Bathrooms *</label>
                  <input
                    type="number"
                    value={formData.bathrooms}
                    onChange={(e) => setFormData({...formData, bathrooms: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="3"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Square Feet *</label>
                  <input
                    type="number"
                    value={formData.sqft}
                    onChange={(e) => setFormData({...formData, sqft: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="3500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Property Type *</label>
                  <select
                    value={formData.propertyType}
                    onChange={(e) => setFormData({...formData, propertyType: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  >
                    <option value="HOUSE">House</option>
                    <option value="APARTMENT">Apartment</option>
                    <option value="VILLA">Villa</option>
                    <option value="CONDO">Condo</option>
                    <option value="TOWNHOUSE">Townhouse</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <label className="block text-gray-700 mb-2">Year Built</label>
                  <input
                    type="number"
                    value={formData.yearBuilt}
                    onChange={(e) => setFormData({...formData, yearBuilt: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="2020"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Garage</label>
                  <input
                    type="number"
                    value={formData.garage}
                    onChange={(e) => setFormData({...formData, garage: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="2"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Status *</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  >
                    <option value="AVAILABLE">Available</option>
                    <option value="SOLD">Sold</option>
                    <option value="PENDING">Pending</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Description *</h3>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg h-40"
                placeholder="Describe the property in detail..."
                required
              />
            </div>

            {/* Features */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Features</h3>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  className="flex-grow p-3 border border-gray-300 rounded-lg"
                  placeholder="Add a feature (e.g., Ocean View, Pool)"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                />
                <button
                  type="button"
                  onClick={addFeature}
                  className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                    {feature}
                    <button
                      type="button"
                      onClick={() => removeFeature(feature)}
                      className="ml-2 text-blue-700 hover:text-blue-900"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Amenities</h3>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={newAmenity}
                  onChange={(e) => setNewAmenity(e.target.value)}
                  className="flex-grow p-3 border border-gray-300 rounded-lg"
                  placeholder="Add an amenity (e.g., Gym, Pool, Security)"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAmenity())}
                />
                <button
                  type="button"
                  onClick={addAmenity}
                  className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center bg-green-100 text-green-700 px-3 py-1 rounded-full">
                    {amenity}
                    <button
                      type="button"
                      onClick={() => removeAmenity(amenity)}
                      className="ml-2 text-green-700 hover:text-green-900"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Images */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Property Images</h3>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  className="flex-grow p-3 border border-gray-300 rounded-lg"
                  placeholder="Image URL"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addImage())}
                />
                <button
                  type="button"
                  onClick={addImage}
                  className="px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  <Upload size={18} />
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image}
                      alt={`Property ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(image)}
                      className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-between pt-6 border-t">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({...formData, isFeatured: e.target.checked})}
                  className="mr-2"
                />
                <span className="text-gray-700">Feature this property</span>
              </label>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-8 py-3 rounded-lg font-bold ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isSubmitting ? 'Adding Property...' : 'Add Property'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}