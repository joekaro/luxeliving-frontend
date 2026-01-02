// components/home/SearchBar.tsx - UPDATED VERSION
'use client'

import { Search, Filter, X } from 'lucide-react'
import { useState } from 'react'

interface SearchFilters {
  location?: string
  propertyType?: string
  minPrice?: number
  maxPrice?: number
  bedrooms?: number
  bathrooms?: number
}

interface SearchBarProps {
  onSearch?: (filters: SearchFilters) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [search, setSearch] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<SearchFilters>({
    location: '',
    propertyType: '',
    minPrice: undefined,
    maxPrice: undefined,
    bedrooms: undefined,
    bathrooms: undefined,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const searchFilters: SearchFilters = {
      location: search || undefined,
      ...filters
    }
    
    if (onSearch) {
      onSearch(searchFilters)
    } else {
      // Default behavior if no onSearch prop provided
      console.log('Searching with filters:', searchFilters)
      // Handle search logic
    }
  }

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    
    // Optionally trigger search immediately on filter change
    // if (onSearch) {
    //   onSearch(newFilters)
    // }
  }

  const clearFilters = () => {
    setSearch('')
    setFilters({
      location: '',
      propertyType: '',
      minPrice: undefined,
      maxPrice: undefined,
      bedrooms: undefined,
      bathrooms: undefined,
    })
    
    if (onSearch) {
      onSearch({})
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 mb-8">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row items-center gap-4">
          {/* Search Input */}
          <div className="flex-grow relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by location, city, or ZIP code..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Filter Toggle */}
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Filter size={20} className="text-gray-600" />
            <span className="text-gray-700 font-medium">Filters</span>
            {Object.values(filters).some(value => value !== undefined && value !== '') && (
              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
            )}
          </button>

          {/* Search Button */}
          <button
            type="submit"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Search
          </button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-700">Advanced Filters</h3>
              <button
                type="button"
                onClick={clearFilters}
                className="flex items-center text-sm text-gray-600 hover:text-gray-800"
              >
                <X size={16} className="mr-1" />
                Clear All
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Property Type</label>
                <select 
                  value={filters.propertyType || ''}
                  onChange={(e) => handleFilterChange('propertyType', e.target.value || undefined)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                >
                  <option value="">Any Type</option>
                  <option value="HOUSE">House</option>
                  <option value="APARTMENT">Apartment</option>
                  <option value="VILLA">Villa</option>
                  <option value="CONDO">Condo</option>
                  <option value="TOWNHOUSE">Townhouse</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Price Range</label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.minPrice || ''}
                    onChange={(e) => handleFilterChange('minPrice', e.target.value ? parseInt(e.target.value) : undefined)}
                    className="w-1/2 p-3 border border-gray-300 rounded-lg"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.maxPrice || ''}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value ? parseInt(e.target.value) : undefined)}
                    className="w-1/2 p-3 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Bedrooms</label>
                <select 
                  value={filters.bedrooms || ''}
                  onChange={(e) => handleFilterChange('bedrooms', e.target.value ? parseInt(e.target.value) : undefined)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                >
                  <option value="">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                  <option value="5">5+</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Bathrooms</label>
                <select 
                  value={filters.bathrooms || ''}
                  onChange={(e) => handleFilterChange('bathrooms', e.target.value ? parseInt(e.target.value) : undefined)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                >
                  <option value="">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                </select>
              </div>
            </div>
            
            {/* Active Filters */}
            {Object.entries(filters).some(([key, value]) => value !== undefined && value !== '') && (
              <div className="mt-4 pt-4 border-t">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Active Filters:</h4>
                <div className="flex flex-wrap gap-2">
                  {filters.propertyType && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                      Type: {filters.propertyType}
                      <button 
                        onClick={() => handleFilterChange('propertyType', undefined)}
                        className="ml-2 text-blue-700 hover:text-blue-900"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {(filters.minPrice || filters.maxPrice) && (
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                      Price: ${filters.minPrice || '0'} - ${filters.maxPrice || 'Any'}
                      <button 
                        onClick={() => {
                          handleFilterChange('minPrice', undefined)
                          handleFilterChange('maxPrice', undefined)
                        }}
                        className="ml-2 text-green-700 hover:text-green-900"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {filters.bedrooms && (
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                      Bedrooms: {filters.bedrooms}+
                      <button 
                        onClick={() => handleFilterChange('bedrooms', undefined)}
                        className="ml-2 text-purple-700 hover:text-purple-900"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {filters.bathrooms && (
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                      Bathrooms: {filters.bathrooms}+
                      <button 
                        onClick={() => handleFilterChange('bathrooms', undefined)}
                        className="ml-2 text-yellow-700 hover:text-yellow-900"
                      >
                        ×
                      </button>
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </form>
    </div>
  )
}