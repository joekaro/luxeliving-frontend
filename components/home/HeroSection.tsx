'use client'

import { Search } from 'lucide-react'
import { useState } from 'react'

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle search logic
    console.log('Searching for:', searchQuery)
  }

  return (
    <section className="relative min-h-[600px] flex items-center">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/80">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1613490493576-7fde63acd811')] bg-cover bg-center opacity-30" />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Find Your <span className="text-blue-300">Dream Home</span> Today
          </h1>
          
          <p className="text-xl text-gray-200 mb-10">
            Discover luxury properties curated for the discerning buyer. 
            Experience real estate reimagined.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="bg-white rounded-xl p-2 shadow-2xl">
            <div className="flex flex-col md:flex-row items-center">
              <div className="flex-grow flex items-center px-4 py-3">
                <Search className="text-gray-400 mr-3" size={20} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by location, property type, or keyword..."
                  className="w-full text-gray-700 placeholder-gray-500 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-medium w-full md:w-auto"
              >
                Search Properties
              </button>
            </div>
          </form>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mt-12">
            <div className="text-white">
              <div className="text-3xl font-bold">500+</div>
              <div className="text-gray-300">Properties</div>
            </div>
            <div className="text-white">
              <div className="text-3xl font-bold">98%</div>
              <div className="text-gray-300">Satisfaction</div>
            </div>
            <div className="text-white">
              <div className="text-3xl font-bold">50+</div>
              <div className="text-gray-300">Expert Agents</div>
            </div>
            <div className="text-white">
              <div className="text-3xl font-bold">25</div>
              <div className="text-gray-300">Years Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}