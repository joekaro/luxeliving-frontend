// app/saved/page.tsx - UPDATED VERSION
'use client'

import { useAuth } from '@/components/providers/AuthProvider'
import PropertyCard from '@/components/property/PropertyCard'
import { Heart, Filter, Share2, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const savedProperties = [
  {
    id: '1',
    title: 'Modern Luxury Villa',
    address: 'Miami Beach, FL',
    location: 'Miami Beach, FL',
    price: 2500000,
    images: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop'],
    bedrooms: 5,
    bathrooms: 4,
    sqft: 3500,
    propertyType: 'VILLA',
    savedDate: 'Today',
    isSaved: true,
  },
  {
    id: '2',
    title: 'Downtown Penthouse',
    address: 'New York, NY',
    location: 'New York, NY',
    price: 1850000,
    images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop'],
    bedrooms: 3,
    bathrooms: 3,
    sqft: 2800,
    propertyType: 'APARTMENT',
    savedDate: 'Yesterday',
    isSaved: true,
  },
  {
    id: '3',
    title: 'Lakeside Retreat',
    address: 'Lake Tahoe, CA',
    location: 'Lake Tahoe, CA',
    price: 3200000,
    images: ['https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&h=600&fit=crop'],
    bedrooms: 6,
    bathrooms: 5,
    sqft: 4200,
    propertyType: 'VILLA',
    savedDate: '3 days ago',
    isSaved: true,
  },
]

export default function SavedPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [selectedProperties, setSelectedProperties] = useState<string[]>([])

  useEffect(() => {
    if (!user) {
      router.push('/')
    }
  }, [user, router])

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  const handleSelectAll = () => {
    if (selectedProperties.length === savedProperties.length) {
      setSelectedProperties([])
    } else {
      setSelectedProperties(savedProperties.map(p => p.id))
    }
  }

  const handleRemoveSelected = () => {
    // In real app, this would remove from database
    alert(`Removing ${selectedProperties.length} properties from saved list`)
    setSelectedProperties([])
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Saved Properties</h1>
            <p className="text-gray-600">Your personal collection of favorite properties</p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span className="text-gray-700">
              {savedProperties.length} properties saved
            </span>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Share2 size={20} />
            </button>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedProperties.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-blue-700 font-medium">
                  {selectedProperties.length} properties selected
                </span>
                <button
                  onClick={handleRemoveSelected}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  <Trash2 size={18} />
                  <span>Remove Selected</span>
                </button>
              </div>
              <button
                onClick={() => setSelectedProperties([])}
                className="text-blue-600 hover:text-blue-700"
              >
                Clear Selection
              </button>
            </div>
          </div>
        )}

        {/* Properties Grid */}
        {savedProperties.length > 0 ? (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedProperties.length === savedProperties.length}
                    onChange={handleSelectAll}
                    className="mr-2"
                  />
                  <span className="text-gray-700">Select All</span>
                </label>
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Filter size={18} />
                  <span>Filter</span>
                </button>
              </div>
              
              <select className="p-2 border border-gray-300 rounded-lg">
                <option>Sort by: Recently Saved</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedProperties.map((property) => (
                <div key={property.id} className="relative">
                  <input
                    type="checkbox"
                    checked={selectedProperties.includes(property.id)}
                    onChange={() => {
                      setSelectedProperties(prev =>
                        prev.includes(property.id)
                          ? prev.filter(id => id !== property.id)
                          : [...prev, property.id]
                      )
                    }}
                    className="absolute top-4 left-4 z-20 w-5 h-5"
                  />
                  <PropertyCard 
                    property={{
                      id: property.id,
                      title: property.title,
                      address: property.address,
                      location: property.location,
                      price: property.price,
                      images: property.images,
                      bedrooms: property.bedrooms,
                      bathrooms: property.bathrooms,
                      sqft: property.sqft,
                      propertyType: property.propertyType,
                      isSaved: property.isSaved
                    }} 
                  />
                  <div className="absolute top-4 right-4 z-20 bg-white/90 px-3 py-1 rounded-full text-sm">
                    Saved {property.savedDate}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <Heart size={64} className="text-gray-300 mx-auto mb-6" />
            <h3 className="text-xl font-bold text-gray-800 mb-4">No Saved Properties Yet</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Start browsing properties and save your favorites to view them later.
            </p>
            <button 
              onClick={() => router.push('/properties')}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              Browse Properties
            </button>
          </div>
        )}
      </div>
    </div>
  )
}