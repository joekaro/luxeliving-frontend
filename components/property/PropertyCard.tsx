// components/property/PropertyCard.tsx - UPDATED FOR REAL API
'use client'

import { Heart, MapPin, Bed, Bath, Square } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/components/providers/AuthProvider'
import { api } from '@/lib/api'

interface PropertyCardProps {
  property: {
    id: string
    title: string
    address: string
    location: string
    price: number
    images: string[]
    bedrooms: number
    bathrooms: number
    sqft: number
    propertyType: string
    isSaved?: boolean
  }
  onSaveToggle?: (propertyId: string, isSaved: boolean) => void
}

export default function PropertyCard({ property, onSaveToggle }: PropertyCardProps) {
  const [isSaved, setIsSaved] = useState(property.isSaved || false)
  const [isSaving, setIsSaving] = useState(false)
  const { user } = useAuth()

  const handleSaveToggle = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!user) {
      alert('Please login to save properties')
      return
    }

    setIsSaving(true)
    try {
      if (isSaved) {
        await api.unsaveProperty(user.id, property.id)
        setIsSaved(false)
        onSaveToggle?.(property.id, false)
      } else {
        await api.saveProperty(user.id, property.id)
        setIsSaved(true)
        onSaveToggle?.(property.id, true)
      }
    } catch (error) {
      console.error('Error saving property:', error)
      alert('Failed to save property')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Link href={`/properties/${property.id}`}>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer">
        {/* Image Container */}
        <div className="relative h-64 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
          
          {/* Favorite Button */}
          <button
            onClick={handleSaveToggle}
            disabled={isSaving}
            className="absolute top-4 right-4 z-20 p-2 bg-white/90 rounded-full hover:bg-white transition-colors disabled:opacity-50"
          >
            <Heart 
              size={20} 
              className={isSaved ? 'fill-red-500 text-red-500' : 'text-gray-600'} 
            />
          </button>
          
          {/* Property Type Badge */}
          <div className="absolute top-4 left-4 z-20">
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              {property.propertyType}
            </span>
          </div>
          
          {/* Image */}
          <div 
            className="w-full h-full bg-cover bg-center transition-transform duration-500 hover:scale-110"
            style={{ 
              backgroundImage: property.images && property.images.length > 0 
                ? `url(${property.images[0]})` 
                : 'linear-gradient(to right, #3b82f6, #8b5cf6)' 
            }}
          />
        </div>
        
        {/* Property Info */}
        <div className="p-6">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-1 line-clamp-1">{property.title}</h3>
              <div className="flex items-center text-gray-600">
                <MapPin size={16} className="mr-1 flex-shrink-0" />
                <span className="text-sm line-clamp-1">{property.address || property.location}</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-blue-600">
              ${property.price.toLocaleString()}
            </div>
          </div>
          
          {/* Property Features */}
          <div className="flex justify-between border-t border-gray-100 pt-4 mt-4">
            <div className="flex items-center space-x-1">
              <Bed size={18} className="text-gray-500" />
              <span className="text-gray-700 font-medium">{property.bedrooms}</span>
              <span className="text-gray-500 text-sm ml-1">Beds</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <Bath size={18} className="text-gray-500" />
              <span className="text-gray-700 font-medium">{property.bathrooms}</span>
              <span className="text-gray-500 text-sm ml-1">Baths</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <Square size={18} className="text-gray-500" />
              <span className="text-gray-700 font-medium">{property.sqft.toLocaleString()}</span>
              <span className="text-gray-500 text-sm ml-1">sqft</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}