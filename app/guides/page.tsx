export default function GuidesPage() {
  const guides = [
    { title: 'Buying Your First Home', category: 'Buying' },
    { title: 'Selling Strategies', category: 'Selling' },
    { title: 'Investment Guide', category: 'Investing' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Real Estate Guides</h1>
        <p className="text-gray-600 mb-12">Comprehensive guides for all your real estate needs</p>
        
        <div className="space-y-6">
          {guides.map((guide, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex justify-between items-center">
                <div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                    {guide.category}
                  </span>
                  <h3 className="text-xl font-bold text-gray-800 mt-3">{guide.title}</h3>
                </div>
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Read Guide
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}