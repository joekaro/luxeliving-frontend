// app/agents/page.tsx - UPDATED VERSION
export default function AgentsPage() {
  const agents = [
    { 
      name: 'Sarah Johnson', 
      role: 'Senior Agent', 
      experience: '15 years',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b786d4d0?w=400&h=400&fit=crop'
    },
    { 
      name: 'Michael Chen', 
      role: 'Luxury Specialist', 
      experience: '12 years',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'
    },
    { 
      name: 'Emma Rodriguez', 
      role: 'Property Manager', 
      experience: '10 years',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop'
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 text-center">Our Expert Agents</h1>
        <p className="text-gray-600 mb-12 text-center max-w-2xl mx-auto">
          Meet our team of dedicated real estate professionals with years of experience in luxury properties.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {agents.map((agent, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-64 relative overflow-hidden">
                <img 
                  src={agent.image} 
                  alt={agent.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-1">{agent.name}</h3>
                <p className="text-blue-600 font-medium mb-2">{agent.role}</p>
                <p className="text-gray-600 mb-4">Experience: {agent.experience}</p>
                <div className="flex space-x-3">
                  <button className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Contact
                  </button>
                  <button className="flex-1 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                    View Listings
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}