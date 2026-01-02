// app/properties/page.tsx - UPDATED FOR REAL API
'use client'

import { useState, useEffect } from 'react'
import PropertyCard from '@/components/property/PropertyCard'
import SearchBar from '@/components/home/SearchBar'
import { api, Property } from '@/lib/api'

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 5000000,
    bedrooms: 0,
    propertyType: '',
    location: ''
  })
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchProperties()
  }, [filters, page])

  const fetchProperties = async () => {
    try {
      setIsLoading(true)
      const response = await api.getProperties({
        page,
        limit: 9,
        minPrice: filters.minPrice || undefined,
        maxPrice: filters.maxPrice || undefined,
        bedrooms: filters.bedrooms || undefined,
        propertyType: filters.propertyType || undefined,
        location: filters.location || undefined
      })
      
      if (response.success && response.data) {
        setProperties(response.data.properties || response.data)
        setTotalPages(response.data.totalPages || 1)
      } else {
        setError('Failed to load properties')
        setProperties(getMockProperties())
      }
    } catch (error) {
      console.error('Error fetching properties:', error)
      setError('Network error. Using sample data.')
      setProperties(getMockProperties())
    } finally {
      setIsLoading(false)
    }
  }

  const getMockProperties = (): Property[] => {
    return [
      {
        id: '1',
        title: 'Modern Luxury Villa',
        description: 'Luxury villa with ocean view',
        price: 2500000,
        location: 'Miami Beach, FL',
        address: '123 Palm Street, Miami Beach',
        bedrooms: 5,
        bathrooms: 4,
        sqft: 3500,
        propertyType: 'VILLA',
        status: 'AVAILABLE',
        images: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811'],
        isFeatured: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      // Add more mock properties as needed
    ]
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-900/80 to-purple-900/80 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">Browse Properties</h1>
          <p className="text-gray-200 text-center max-w-2xl mx-auto">
            Discover our curated collection of luxury homes, apartments, and estates from our database
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
     n
        
        {error && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 text-yellow-700 rounded-lg">
            {error}
          </div>
        )}
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {isLoading ? 'Loading...' : `${properties.length} Properties Found`}
            </h2>
            <p className="text-gray-600">Showing all available listings</p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <select 
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => setFilters({...filters, propertyType: e.target.value})}
            >
              <option value="">All Types</option>
              <option value="HOUSE">House</option>
              <option value="APARTMENT">Apartment</option>
              <option value="VILLA">Villa</option>
              <option value="CONDO">Condo</option>
            </select>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-gray-200 rounded-xl h-80 animate-pulse"></div>
            ))}
          </div>
        ) : properties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {properties.map((property) => (
              <PropertyCard 
                key={property.id} 
                property={{
                  id: property.id,
                  title: property.title,
                  address: property.address || property.location,
                  location: property.location,
                  price: property.price,
                  images: property.images,
                  bedrooms: property.bedrooms,
                  bathrooms: property.bathrooms,
                  sqft: property.sqft,
                  propertyType: property.propertyType,
                }} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No properties found matching your criteria</p>
            <button 
              onClick={() => setFilters({
                minPrice: 0,
                maxPrice: 5000000,
                bedrooms: 0,
                propertyType: '',
                location: ''
              })}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12">
            <nav className="flex items-center space-x-2">
              <button 
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 disabled:opacity-50"
              >
                Previous
              </button>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + 1
                return (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`px-4 py-2 rounded-lg ${
                      page === pageNum 
                        ? 'bg-blue-600 text-white' 
                        : 'border border-gray-300 hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              })}
              
              <button 
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 disabled:opacity-50"
              >
                Next
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  )
}