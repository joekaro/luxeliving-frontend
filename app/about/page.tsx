// app/about/page.tsx - UPDATED WITH IMAGES
import { Award, Users, Home, Shield } from 'lucide-react'

export default function AboutPage() {
  const stats = [
    { value: '25+', label: 'Years Experience' },
    { value: '500+', label: 'Properties Sold' },
    { value: '98%', label: 'Client Satisfaction' },
    { value: '50+', label: 'Expert Agents' },
  ]

  const values = [
    {
      icon: <Shield size={32} />,
      title: 'Integrity',
      description: 'We believe in transparent, honest communication in every transaction.'
    },
    {
      icon: <Users size={32} />,
      title: 'Client Focus',
      description: 'Your goals are our priority. We provide personalized service for every client.'
    },
    {
      icon: <Award size={32} />,
      title: 'Excellence',
      description: 'We strive for perfection in every detail of our service.'
    },
    {
      icon: <Home size={32} />,
      title: 'Expertise',
      description: 'Deep market knowledge and years of experience guide our advice.'
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900/80 to-purple-900/80 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">About LuxeLiving Realty</h1>
          <p className="text-gray-200 text-center max-w-3xl mx-auto text-lg">
            For over 25 years, we've been connecting discerning clients with exceptional properties, 
            providing unparalleled service in luxury real estate.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Company Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Founded in 1999 by real estate visionary John Anderson, LuxeLiving Realty began with a simple mission: 
                to provide exceptional service in the luxury property market.
              </p>
              <p>
                What started as a boutique agency has grown into one of the most respected names in luxury real estate, 
                known for our integrity, market expertise, and unwavering commitment to our clients.
              </p>
              <p>
                Today, we continue to build on our legacy, combining traditional values with modern technology 
                to serve a new generation of homeowners and investors.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 h-64 md:h-80 rounded-2xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop"
                alt="Our Team"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg w-3/4">
              <div className="text-2xl font-bold text-blue-600">25 Years</div>
              <div className="text-gray-700">of excellence in luxury real estate</div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
              <div className="text-gray-700">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-6 mx-auto">
                  <div className="text-white">{value.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">{value.title}</h3>
                <p className="text-gray-600 text-center">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Find Your Dream Home?</h3>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Contact us today for a personalized consultation with one of our expert agents.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 font-bold">
              Contact Us
            </button>
            <button className="px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-white/10 font-bold">
              Meet Our Team
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}