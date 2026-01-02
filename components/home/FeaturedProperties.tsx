// components/home/FeaturedProperties.tsx - UPDATED FOR REAL API
'use client'

import { useEffect, useState } from 'react'
import PropertyCard from '../property/PropertyCard'
import Link from 'next/link'
import { api, Property } from '@/lib/api'

export default function FeaturedProperties() {
  const [properties, setProperties] = useState<Property[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    fetchFeaturedProperties()
  }, [])

  const fetchFeaturedProperties = async () => {
    try {
      setIsLoading(true)
      const response = await api.getFeaturedProperties()
      
      if (response.success && response.data) {
        setProperties(response.data)
      } else {
        setError('Failed to load featured properties')
        // Fallback to mock data if API fails
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

  const getMockProperties = (): any[] => {
    return [
      {
        id: '1',
        title: 'Modern Luxury Villa',
        address: 'Miami Beach, FL',
        location: 'Miami Beach, FL',
        price: 2500000,
        images: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811'],
        bedrooms: 5,
        bathrooms: 4,
        sqft: 3500,
        propertyType: 'VILLA',
        isFeatured: true,
      },
      {
        id: '2',
        title: 'Downtown Penthouse',
        address: 'New York, NY',
        location: 'New York, NY',
        price: 1850000,
        images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00'],
        bedrooms: 3,
        bathrooms: 3,
        sqft: 2800,
        propertyType: 'APARTMENT',
        isFeatured: true,
      },
      {
        id: '3',
        title: 'Lakeside Retreat',
        address: 'Lake Tahoe, CA',
        location: 'Lake Tahoe, CA',
        price: 3200000,
        images: ['https://images.unsplash.com/photo-1518780664697-55e3ad937233'],
        bedrooms: 6,
        bathrooms: 5,
        sqft: 4200,
        propertyType: 'VILLA',
        isFeatured: true,
      },
    ]
  }

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Featured Properties</h2>
            <p className="text-gray-600">Loading properties...</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-200 rounded-xl h-96 animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Featured Properties</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium properties from our database
          </p>
          {error && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 text-yellow-700 rounded-lg max-w-md mx-auto">
              {error}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

        <div className="text-center mt-12">
          <Link href="/properties">
            <button className="px-8 py-3 bg-white border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 font-medium transition-colors">
              View All Properties
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}